import React from 'react';
import { View, Text, TouchableOpacity, FlatList, ToastAndroid } from 'react-native';
import { querryAllSaved, deleteAllSaved } from '../../realmDB/SavedSchema';
import {updateWatchedNews, querryAll, insertRecentlyRead} from '../../realmDB/allShema'
import { connect } from 'react-redux';
import { getDataSavedFromRealm, getDataFromRealm } from '../../redux/action/actionCreator';
import Header from './Header';
import Item from './Item';

class Saved extends React.Component {

    componentWillMount = () => {
        querryAllSaved().then(allNewsList => {
            const NewsSort = allNewsList.sort(function (a, b) { return b.published - a.published });
            this.props.getDataSavedFromRealm(NewsSort)
        })
    }

    deleteAllDataFromRealm = () => {
        deleteAllSaved()
            .then(querryAllSaved().then(allNewsList => {
                const NewsSort = allNewsList.sort(function (a, b) { return b.published - a.published });
                this.props.getDataSavedFromRealm(NewsSort);
                ToastAndroid.showWithGravity(
                    'Đã xóa',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                );
            }))
            .catch(e => console.log(e))
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

    render() {
        const light = this.props.light;
        const backgroundColor = light ? "#444444" : 'white';
        return (
            <View style={{ flex: 1, backgroundColor }}>
                <Header backToSetting={() => this.props.navigation.navigate('Home')} delete={() => this.deleteAllDataFromRealm()} />
                <View style={{ flex: 12 }}>
                    <FlatList
                        data={this.props.RealmDataSaved}
                        renderItem={({ item }) => <Item item={item} goToDetail={() => {this.props.navigation.navigate('Detail',{item, toDetail: 'a'}), this.addToRealm(item)}} />}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            </View>
        )
    }
}

function MapSTP(state) {
    return {
        RealmDataRecently: state.RealmDataRecently,
        RealmDataSaved: state.RealmDataSaved,
        light: state.changeLightReducer.light,
    }
}
export default connect(MapSTP, { getDataSavedFromRealm, getDataFromRealm })(Saved)