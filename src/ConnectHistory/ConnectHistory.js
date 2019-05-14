import React from 'react';
import { View, Text, TouchableOpacity, FlatList, ToastAndroid } from 'react-native';
import { querryAll, deleteAll } from '../../realmDB/allShema';
import { connect } from 'react-redux';
import { getDataFromRealm } from '../../redux/action/actionCreator';
import Header from './Header';
import Item from './Item';

class ConnectHistory extends React.Component {

    componentWillMount = () => {
        querryAll().then(allNewsList => {
            const NewsSort = allNewsList.sort(function (a, b) { return b.published - a.published });
            this.props.getDataFromRealm(NewsSort)
        })
    }

    deleteAllDataFromRealm = () => {
        deleteAll()
            .then(e => querryAll().then(allNewsList => {
                const NewsSort = allNewsList.sort(function (a, b) { return b.published - a.published });
                this.props.getDataFromRealm(NewsSort)
                ToastAndroid.showWithGravity(
                    'Đã xóa',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                );
            }))
            .catch(e => console.log(e))
    }

    render() {
        const light = this.props.light;
        const backgroundColor = light ? "#444444" : 'white';
        return (
            <View style={{ flex: 1, backgroundColor }}>
                <Header backToSetting={() => this.props.navigation.navigate('Home')} delete={() => this.deleteAllDataFromRealm()} />
                <View style={{ flex: 12 }}>
                    <FlatList
                        data={this.props.RealmDataRecently}
                        renderItem={({ item }) => <Item item={item} goToDetail={() => this.props.navigation.navigate('Detail', { item })} />}
                        keyExtractor={(item) => item.id}
                        ListHeaderComponent={console.log('head')}
                        ListFooterComponent={console.log('foot')}
                    />
                </View>
            </View>
        )
    }
}

function MapSTP(state) {
    console.log(state.RealmDataRecently)
    return {
        light: state.changeLightReducer.light,
        RealmDataRecently: state.RealmDataRecently,
    }
}
export default connect(MapSTP, { getDataFromRealm })(ConnectHistory)