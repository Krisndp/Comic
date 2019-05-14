import React from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, FlatList, Keyboard, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { search } from '../../redux/action/actionCreator';
import Item from './Item';
import { updateWatchedNews, querryAll, insertRecentlyRead } from '../../realmDB/allShema';
import { querryAllSearched, deleteAllSearch, insertWordToSearch, updateWordSearch } from '../../realmDB/SearchSchema';
import { getDataSavedFromRealm, getDataFromRealm, getWordFromSearchRealm } from '../../redux/action/actionCreator';
import styles from './style/stylesSearch';
import Page from '../Page/Page';
import ItemSearched from './ItemSearched';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            isloading: true,
        }
    }
    componentWillMount = async () => {
        //this.Search();
        await querryAllSearched()
            .then(allWordSearch => {
                const allWord = allWordSearch.sort(function (a, b) { return b.time - a.time });
                const tenWord = allWord.slice(0, 10);
                this.props.getWordFromSearchRealm(tenWord)
            })
            .catch(e => console.log(e))
    }

    Search = async () => {
        let text = this.state.text.toLowerCase();
        //console.log(text);
        await this.setState({ isloading: true })
        let list = this.props.allNewsReducer;
        if (text != '') {
            let filterSearch = list.filter((data) => {
                return data.title.toLowerCase().match(text) || data.subtitle.toLowerCase().match(text);
            })
            //console.log(filterSearch);
            await this.props.search(filterSearch)
            if(this.props.SearchReducer != [] && this.props.SearchReducer != null){
                await this.addSearchToReam(this.state.text);
            }
        } else {
            let filterSearch = [];
            await this.props.search(filterSearch)
        }
        this.setState({ isloading: false })
    }
    addSearchToReam = async (text) => {
        const RealmDataSearched = this.props.RealmDataSearched;
        for (var i of RealmDataSearched) {
            if (text == i.text) {
                var alived = true;
                const WordUpdate = {
                    id: i.id,
                    time: new Date()
                };
                updateWordSearch(WordUpdate)
                    .then(querryAllSearched().then(allWordSearch => {
                        const allWord = allWordSearch.sort(function (a, b) { return b.time - a.time });
                        const tenWord = allWord.slice(0, 10);
                        this.props.getWordFromSearchRealm(tenWord)
                    })).catch(e => console.log(e))
                break;
            }
        }
        if (alived == null) {
            const wordSearchNow = {
                id: Math.floor(Date.now() / 1000),
                text: text,
                time: new Date(),
            }
            insertWordToSearch(wordSearchNow)
                .then(querryAllSearched().then(allWordSearch => {
                    const allWord = allWordSearch.sort(function (a, b) { return b.time - a.time });
                    const tenWord = allWord.slice(0, 10);
                    this.props.getWordFromSearchRealm(tenWord)
                })).catch(e => console.log(e))
        } else { }
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

    renderItem = (item) => {
        if (item != []) {
            return <Item item={item} goToDetail={() => { this.props.navigation.navigate('Detail', { item }), this.addToRealm(item) }} />
        } else {
            console.log('haha')
        }
    }

    onPress = async (e) => {
        await this.setState({text: e.text});
        this.Search()
    } 
    renderWordSearch = () => {
        const wordSearched = this.props.RealmDataSearched;
        const AllwordSearched = wordSearched.map(e => {return <ItemSearched item={e} onPress = {() => this.onPress(e)}/>});
        //return <ItemSearched item={item} />
        return AllwordSearched;
    }

    listEmpty = () => {
        if (this.state.text != 0 && this.state.isloading == false) {
            return <Page />
        } else {
            return null
        }
    }

    render() {
        const light = this.props.light;
        const colorText = light ? 'white' : 'black';
        const backgroundColor = light ? "#444444" : 'white';
        const tintIconColor = light ? 'white' : 'black';
        const borderColorT = light ? 'white' : 'black';
        const placeholderColor = light ? 'white' : 'black';
        const data = this.props.SearchReducer;
        return (
            <View style={[styles.container, { backgroundColor }]}>
                <View style={styles.viewHeader}>
                    <View style={[styles.viewSearch, { borderColor: borderColorT }]}>
                        <TextInput
                            value={this.state.text}
                            placeholder={`Tìm kiếm trong ${this.props.nameTopic}`}
                            onChangeText={(text) => this.setState({ text })}
                            placeholderTextColor={placeholderColor}
                            style={[styles.textInput, { color: colorText }]}
                            onSubmitEditing={() => this.Search()}
                        />
                        <TouchableOpacity onPress={() => { this.Search(), Keyboard.dismiss() }} style={{ paddingHorizontal: 5 }}>
                            <Image
                                source={require('../../Icon/search.png')}
                                style={[styles.image, { tintColor: tintIconColor }]} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Setting')}
                        style={styles.viewHuy}>
                        <Text style={styles.text}>Hủy</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.viewWordedSearch}>
                    {this.renderWordSearch()}
                </View>
                <View style={styles.viewFlatList}>
                    <FlatList
                        data={data}
                        renderItem={({ item, index }) => this.renderItem(item, data)}
                        keyExtractor={(item, index) => index}
                        ListEmptyComponent={() => this.listEmpty()}
                    />
                </View>
            </View>
        )
    }
}
function MapSTP(state) {
    console.log(state.RealmDataSearched)
    return {
        RealmDataSearched: state.RealmDataSearched,
        RealmDataRecently: state.RealmDataRecently,
        RealmDataSaved: state.RealmDataSaved,
        SearchReducer: state.SearchReducer,
        allNewsReducer: state.allNewsReducer,
        nameTopic: state.categoriesNewsReducer.choosedTopic[0].nameTopic,
        light: state.changeLightReducer.light
    }
}
export default connect(MapSTP, { getWordFromSearchRealm, search, getDataSavedFromRealm, getDataFromRealm })(Search)