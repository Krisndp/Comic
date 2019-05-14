import React from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
const { width, height } = Dimensions.get('window');

class Item extends React.Component {

    Prepare = (item) => {
        const RealmDataFavorite = this.props.RealmDataFavorite;
        for (var i of RealmDataFavorite) {
            if (i.id == item.id) {
                var alived = true;
                return true
            }
        }
        if (alived == null) {
            return false
        }
    }
    render() {
        const colorT = this.props.light ? 'white' : 'black'
        const item = this.props.item;
        const colorText = this.Prepare(item) ? 'red' : colorT;
        return (
            <TouchableOpacity
                onPress={this.props.toggleFavorite}
                style={style.back}>
                <Text style={[style.text, { color: colorText }]}>{item.nameTopic}</Text>
            </TouchableOpacity>
        )
    }
}
function MapSTP(state) {
    return {
        light: state.changeLightReducer.light,
        RealmDataFavorite: state.RealmDataFavorite,
    }
}
export default connect(MapSTP)(Item)

const style = StyleSheet.create({
    back: {
        height: width / 6,
        justifyContent: 'center',
        alignItems: 'center',
        width
    },
    text: {
        fontSize: width / 20,
        fontWeight: '600'
    }
})