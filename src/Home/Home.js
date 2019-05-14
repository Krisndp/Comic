import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Part1 from './Component/Part1';
import Part2 from './Component/Part2';
import Part4 from './Component/Part4';
import { change_choose_topic, getDataFavoriteFromRealm } from '../../redux/action/actionCreator';
import { deleteAllFavorite, querryAllFavorite } from '../../realmDB/FavoriteNewsSchema';
import { deleteAllSaved } from '../../realmDB/SavedSchema';
import { deleteAllSearch } from '../../realmDB/SearchSchema';
import { deleteAll } from '../../realmDB/allShema';

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    deleteCache = () => {
        deleteAll();
        deleteAllFavorite()
            .then(querryAllFavorite()
                .then(NewsFavorite => this.props.getDataFavoriteFromRealm(NewsFavorite))
                .catch(e => console.log(e)));
        deleteAllSaved();
        deleteAllSearch();
        alert('Đã xóa')
    }

    render() {
        const backgroundColor = this.props.light ? "#444444" : 'white';
        const gotoSetting = () => this.props.navigation.push('Setting');
        const gotoConnectHistory = () => this.props.navigation.navigate('ConnectHistory');
        const gotoSaved = () => this.props.navigation.navigate('Saved');
        const gotoFavorite = () => this.props.navigation.navigate('Favorite');

        return (
            <View style={[styles.container, { backgroundColor: backgroundColor }]}>
                <View style={styles.component}>
                    <Part1 onPress={() => { gotoSetting(), this.props.change_choose_topic(0) }} />
                    <Part2 onPress={() => gotoConnectHistory()}
                        title={"Xem gần đây"}
                        icon={require('../../Icon/clock.png')}
                    />
                    <Part2 onPress={() => gotoSaved()}
                        title={"Đánh dấu"}
                        icon={require('../../Icon/Save1.png')}
                    />
                    <Part2 onPress={() => gotoFavorite()}
                        title={"Quản lý chuyên mục"}
                        icon={require('../../Icon/folder.png')}
                    />
                    <Part2 onPress={() => { this.deleteCache() }}
                        title={"Xóa catche"}
                        icon={require('../../Icon/delete.png')}
                    />
                    <Part4 />
                </View>
            </View>
        )
    }
}
function mapSTP(state) {
    return { light: state.changeLightReducer.light }
}
export default connect(mapSTP, { change_choose_topic, getDataFavoriteFromRealm })(Home)

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    component: {
        flex: 1,
        margin: 20,
        flexDirection: 'column'
    },


})