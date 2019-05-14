import React from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { connect } from 'react-redux';
import Header from './Component/Header';
import { querryAllSaved } from '../../realmDB/SavedSchema';
import { querryAll, updateWatchedNews, insertRecentlyRead } from '../../realmDB/allShema';
import { get_all_news, get_info_news, getDataFromRealm, getDataSavedFromRealm, getDataFavoriteFromRealm, loadMore, addLoadMore } from '../../redux/action/actionCreator';
import { querryAllFavorite } from '../../realmDB/FavoriteNewsSchema';
import styles from './styles/stylesSetting';
const { width, height } = Dimensions.get('window');
var x = 2;
class Setting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillMount = async () => {
        await querryAllFavorite()
            .then(NewsFavorite => this.props.getDataFavoriteFromRealm(NewsFavorite))
            .catch(e => console.log(e));

        await this.setState({ isLoading: true });
        await this.getAllFavoriteNews();
        await this.setState({ isLoading: false });

        querryAll().then(allNewsList => {
            const NewsSort = allNewsList.sort(function (a, b) { return b.published - a.published });
            this.props.getDataFromRealm(NewsSort)
        });
        querryAllSaved().then(NewsSaved => {
            const NewsSort = NewsSaved.sort(function (a, b) { return b.published - a.published });
            this.props.getDataSavedFromRealm(NewsSort)
        })
        this.setState({ idCurrent: this.props.idNewsTopic })
        x = 2;
    }
    componentDidUpdate() {
        if (this.props.idNewsTopic != this.state.idCurrent) {
            this.refs.carousel.snapToItem(0, false, false);
        }
    }

    renderFooter = () => {
        const id = this.props.idNewsTopic;
        var ArrLink = [];
        if (id == 0) {
            for (var i = 1; i <= x; i++) {
                const RealmDataFavorite = this.props.RealmDataFavorite;
                const AllFavoriteNews = RealmDataFavorite.map(e => { return e.links + i + '/' });
                for (var j of AllFavoriteNews) {
                    ArrLink.push(j);
                }
            }
        } else {
            for (var i = 1; i <= x; i++) {
                var j = this.props.linkNewsTopic + i + '/';
                ArrLink.push(j);
            }
        }
        this.props.get_all_news(ArrLink);
        console.log(x);
        x++;
    };

    getAllFavoriteNews = async () => {
        this.setState({ isLoading: true });
        const RealmDataFavorite = this.props.RealmDataFavorite;
        const AllFavoriteNews = RealmDataFavorite.map(e => { return e.links + 1 + '/' });
        await this.props.get_all_news(AllFavoriteNews);
    }

    CarouselTouch = async (item) => {
        this.props.navigation.navigate('Detail', { item });
        this.addToRealm(item);
        //snapToItem={(0, animated = true, fireCallback = true)}
        //this.carousel.snapToItem(0);
    }

    addToRealm = async (item) => {
        const RealmDataRecently = this.props.RealmDataRecently;
        for (var i of RealmDataRecently) {
            if (item.links == i.links) {
                var alived = true;
                const NewsUpdate = {
                    id: i.id,
                    published: new Date()
                };
                updateWatchedNews(NewsUpdate)
                    .then(querryAll().then(allNewsList => {
                        const NewsSort = allNewsList.sort(function (a, b) { return b.published - a.published });
                        this.props.getDataFromRealm(NewsSort)
                    })).catch(e => console.log(e))
                break;
            }
        }
        if (alived == null) {
            const recentlyRead = {
                id: Math.floor(Date.now() / 1000),
                title: item.title,
                illustration: item.illustration,
                links: item.links,
                subtitle: item.subtitle,
                published: new Date(),
                cm: item.cm
            }
            insertRecentlyRead(recentlyRead)
                .then(querryAll().then(allNewsList => {
                    const NewsSort = allNewsList.sort(function (a, b) { return b.published - a.published });
                    this.props.getDataFromRealm(NewsSort)
                }))
                .catch(e => alert(e))
        } else { }
    }

    renderItem({ item }, parallaxProps) {
        if (this.state.isLoading == true) {

        } else {
            const colorT = this.props.light ? 'white' : 'black';
            return (
                <View style={[styles.carouselView]}>
                    <TouchableOpacity activeOpacity={1} onPress={() => this.CarouselTouch(item)} style={styles.carouselView}>
                        <Image
                            source={{ uri: item.illustration }}
                            containerStyle={styles.containerStyle}
                            style={styles.containerStyle}
                        />
                        <View style={styles.viewTotal}>
                            <View style={styles.view1}>
                                <Image source={require('../../Icon/triangle.png')} style={styles.icon} />
                            </View>
                            <View style={styles.view2}>
                                <Text numberOfLines={1} style={{ color: '#00BFFF' }}>{item.cm}</Text>
                            </View>
                            <View style={styles.view3}>
                                <Text style={{ color: "#848484" }}>{item.publishe}</Text>
                            </View>
                        </View>
                        <View style={styles.view4}>
                            <Text numberOfLines={2} style={[styles.title, { color: colorT }]}>{item.title}</Text>
                        </View>
                        <View style={styles.view5}>
                            <Text numberOfLines={4} style={[styles.text, { color: colorT }]}>{item.subtitle}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        }
    }

    loadMore = (index, data) => {
        if (index == data.length - 1) {
            this.renderFooter()
        }
    }

    header = () => {
        if (this.state.idCurrent != this.props.idNewsTopic) {
            if (this.props.idNewsTopic == 0) {
                x = 1;
            } else {
                x = 2
            }
            this.setState({ idCurrent: this.props.idNewsTopic })
        }
        //console.log('haha')
        return null
    }

    footer = () => {
        if (this.props.idNewsTopic == 0) {
            return null
        }
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }

    render() {
        const goHome = () => this.props.navigation.navigate('Home');
        const search = () => this.props.navigation.navigate('Search');
        const backgroundColor = this.props.light ? "#444444" : 'white';
        const toggleDrawer = () => this.props.navigation.toggleDrawer();
        const data = this.props.idNewsTopic == 0 ? this.props.allNewsReducer.sort(function (a, b) { return 0.5 - Math.random() }) : this.props.allNewsReducer;
        return (
            <View style={[styles.container, { backgroundColor }]}>
                <Header setting={goHome} drawer={toggleDrawer} search={search} />
                <View style={styles.main}>
                    <Carousel
                        activeSlideOffset={0}
                        ref={'carousel'}
                        onBeforeSnapToItem={(index) => { this.loadMore(index, data) }}
                        data={data}
                        renderItem={(item, index) => this.renderItem(item)}
                        keyExtractor={(item, index) => `aghsfahgf${index}`}
                        sliderWidth={width}
                        itemWidth={0.8 * width}
                        sliderHeight={0.7 * height}
                        itemHeight={0.6 * height}
                        layout={'default'}
                        hasParallaxImages={true}
                        ListHeaderComponent={() => this.header()}
                        ListFooterComponent={() => this.footer()}
                    // ListEmptyComponent={() => {
                    //     return <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    //         <ActivityIndicator size="large" color="#0000ff" />
                    //     </View>
                    // }}
                    />
                </View>
            </View>
        )
    }
}
function mapSTP(state) {
    //alert(state.allNewsReducer)
    return {
        RealmDataRecently: state.RealmDataRecently,
        linkNewsTopic: state.categoriesNewsReducer.choosedTopic[0].link,
        idNewsTopic: state.categoriesNewsReducer.choosedTopic[0].id,
        allNewsReducer: state.allNewsReducer,
        light: state.changeLightReducer.light,
        RealmDataSaved: state.RealmDataSaved,
        RealmDataFavorite: state.RealmDataFavorite,
    }
}

export default connect(mapSTP, { get_all_news, get_info_news, getDataFromRealm, getDataSavedFromRealm, getDataFavoriteFromRealm, loadMore, addLoadMore })(Setting)

