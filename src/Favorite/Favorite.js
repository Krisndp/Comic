import React from 'react';
import { View, Text, FlatList, Dimensions, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { getDataFavoriteFromRealm, get_all_news, change_choose_topic } from '../../redux/action/actionCreator';
import { querryAllFavorite, deleteAllFavorite, deleteNewsFavorite, insertNewsToFavorite } from '../../realmDB/FavoriteNewsSchema';
import { connect } from 'react-redux';
import Item from './Item';
const { width, height } = Dimensions.get('window');

class Favorite extends React.Component {

    componentWillMount = () => {
        querryAllFavorite()
            .then(NewsFavorite => this.props.getDataFavoriteFromRealm(NewsFavorite))
            .catch(e => console.log(e))
    }

    getAllFavoriteNewsAgain = async () => {
        await querryAllFavorite()
            .then(NewsFavorite => this.props.getDataFavoriteFromRealm(NewsFavorite))
            .catch(e => console.log(e));

        const RealmDataFavorite = this.props.RealmDataFavorite;
        const AllFavoriteNews = RealmDataFavorite.map(e => { return e.links });
        //console.log(AllFavoriteNews)
        this.props.get_all_news(AllFavoriteNews)
    }

    toggleFavorite = (item) => {
        const RealmDataFavorite = this.props.RealmDataFavorite;
        for (var i of RealmDataFavorite) {
            if (item.id == i.id) {
                var alived = true;
                deleteNewsFavorite(i.id)
                    .then(
                        querryAllFavorite()
                            .then(NewsFavorite => this.props.getDataFavoriteFromRealm(NewsFavorite))
                            .catch(e => console.log(e))
                    )
                    .catch(e => console.log(e))
                break;
            }
        }
        if (alived == null) {
            const NewsFavoriteCurently = {
                id: item.id,
                nameTopic: item.nameTopic,
                links: item.link,
            }
            insertNewsToFavorite(NewsFavoriteCurently)
                .then(
                    querryAllFavorite()
                        .then(NewsFavorite => this.props.getDataFavoriteFromRealm(NewsFavorite))
                        .catch(e => console.log(e))
                )
                .catch(e => alert(e))
        }
    }

    back = () => {
        this.getAllFavoriteNewsAgain();
        this.props.navigation.navigate("Home")
    }
    render() {
        const backgroundColor = this.props.light ? '#444444' : 'white';
        const borderBottomColorL = this.props.light ? 'white' : '#444444';
        const tintColorT = this.props.light ? 'white' : 'black';
        return (
            <View style = {{flex:1, backgroundColor}}>
                <View style={{ flex: 1, borderBottomColor: borderBottomColorL, borderBottomWidth: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginLeft: 10 }}>
                    <TouchableOpacity onPress={() => { this.back() }} style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                        <Image source={require('../../Icon/Back.png')} style={{ width: 20, height: 20, tintColor: tintColorT }} />
                    </TouchableOpacity>
                    <View style={{ justifyContent: 'center', flex: 9 }}>
                        <Text style={{ color: '#00BFFF', fontSize: width / 18, fontWeight: 'bold', marginLeft:20 }}>Chuyên mục quan tâm</Text>
                    </View>
                </View>
                <View style={{ flex: 12, alignItems:'center', justifyContent:'center', marginTop:20 }}>
                    <FlatList
                        data={this.props.allTopic.slice(1, 20)}
                        renderItem={({ item }) => <Item toggleFavorite={() => this.toggleFavorite(item)} item={item} />}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            </View>
        )
    }
}
function MapSTP(state) {
    return {
        light: state.changeLightReducer.light,
        categoriesNewsReducer: state.categoriesNewsReducer,
        RealmDataFavorite: state.RealmDataFavorite,
        allTopic: state.categoriesNewsReducer.allTopic
    }
}
export default connect(MapSTP, { getDataFavoriteFromRealm, get_all_news, change_choose_topic })(Favorite);