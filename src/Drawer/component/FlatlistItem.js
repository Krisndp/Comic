import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
const { width, height } = Dimensions.get('window');

class FlatlistItem extends React.Component {

    choosed = () => {
        const tintColorI = this.props.light ? 'white' : 'black';
        return (
            <View style={styles.choosedView}>
                <Image
                    style={[styles.image,{tintColor: tintColorI}]} source={require('../../../Icon/check.png')} />
            </View>
        )
    }
    render() {
        const item = this.props.item;
        const colorText = this.props.light ? 'white' : 'black';
        return (
            <View style={[styles.container, { borderLeftColor: item.color }]}>
                <TouchableOpacity onPress={this.props.onPress} style={styles.touchView}>
                    <Text style={[styles.text, { color: colorText, }]}>{item.nameTopic}</Text>
                </TouchableOpacity>
                {item.onClick ? this.choosed() : <View style={{ flex: 1 }} />}
            </View>
        )
    }
}
function mapSTP(state) {
    return {
        light: state.changeLightReducer.light
    }
}
export default connect(mapSTP)(FlatlistItem)

const styles = StyleSheet.create({
    container: {
        margin: 10,
        flexDirection: 'row',
        borderLeftWidth: 3,
    },
    touchView: {
        flex: 9,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    choosedView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 20,
        height: 20
    },
    text: {
        margin: 10,
        fontSize: width / 25
    }
})