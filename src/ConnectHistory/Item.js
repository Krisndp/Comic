import React from 'react';
import { View, Text, Image, TouchableOpacity, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';
import Swipeout from 'react-native-swipeout';
import { deleteNews, querryAll } from '../../realmDB/allShema';
import { getDataFromRealm } from '../../redux/action/actionCreator';
import styles from './style/stylesItem';

class Item extends React.Component {

    deleteThisNews = (Newsid) => {
        deleteNews(Newsid)
            .then(querryAll().then(allNewsList => {
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
        const item = this.props.item;
        const light = this.props.light;
        const colorText = light ? 'white' : 'black';
        const backgroundColor = light ? "#444444" : 'white';
        return (
            <Swipeout backgroundColor={backgroundColor} autoClose={true} right={[{ text: 'Xóa', backgroundColor: 'red', onPress: () => this.deleteThisNews(item.id) }]}>
                <TouchableOpacity onPress={this.props.goToDetail} style={[styles.container,{backgroundColor}]}>
                    <View style={styles.ViewTitle}>
                        <Text numberOfLines={2} style={[styles.TextTitle,{color:colorText}]}>{item.title}</Text>
                        <Text style={styles.VNtext}>VietNamNet</Text>
                    </View>
                    <View style={styles.ViewDes}>
                        <View style={styles.ViewImage}>
                            <Image style={[styles.image]} source={{ uri: item.illustration }} />
                        </View>
                        <View style={styles.ViewDescription}>
                            <Text numberOfLines={4} style={[styles.TextDes,{color:colorText}]}>{item.subtitle}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </Swipeout>
        )
    }
}

function MapSTP(state) {
    return {
        RealmDataRecently: state.RealmDataRecently,
        light: state.changeLightReducer.light
    }
}
export default connect(MapSTP, { getDataFromRealm })(Item)

