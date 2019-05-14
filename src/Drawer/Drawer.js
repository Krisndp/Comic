import React from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import FlatlistItem from './component/FlatlistItem';
import { change_choose_topic, get_all_news, getDataFavoriteFromRealm, change_choose_topic_before } from '../../redux/action/actionCreator';
class Drawer extends React.Component {

    getAllFavoriteNews = () => {
        const RealmDataFavorite = this.props.RealmDataFavorite;
        const AllFavoriteNews = RealmDataFavorite.map(e => { return e.links + 1 + '/' });
        //console.log(AllFavoriteNews)
        this.props.get_all_news(AllFavoriteNews);
    }

    onPress = async (id) => {
        //await this.props.change_choose_topic_before();
        await this.props.change_choose_topic(id);
        if (id == 0) {
            await this.getAllFavoriteNews()
        } else {
            await this.props.get_all_news([this.props.categoriesNewsReducer.choosedTopic[0].link + 1 + '/']);
        }
        this.props.navigation.closeDrawer();
    }

    render() {
        const allTopic = this.props.categoriesNewsReducer.allTopic;
        const backgroundColor = this.props.light ? '#444444' : 'white';
        const Comic = {
            nameTopic: "TRUYỆN FULL",
            color: "pink",
            onClick: false
        };
        return (
            <View style={{ paddingTop: 10, backgroundColor, flex: 1 }}>
                <FlatlistItem onPress={() => {this.props.navigation.navigate('AllComic'), this.props.navigation.closeDrawer()}} item={Comic} />
                <FlatList
                    data={allTopic}
                    renderItem={({ item, index }) => <FlatlistItem onPress={() => this.onPress(item.id)} item={item} />}
                    keyExtractor={(item, index) => index}
                />

            </View>
        )
    }
}
function mapSTP(state) {
    return {
        categoriesNewsReducer: state.categoriesNewsReducer,
        light: state.changeLightReducer.light,
        RealmDataFavorite: state.RealmDataFavorite,
    }
}
export default connect(mapSTP, { change_choose_topic, get_all_news, getDataFavoriteFromRealm, change_choose_topic_before })(Drawer)