import React from 'react';
import { View, Image, Text, TouchableOpacity, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import styles from '../styles/stylesItemInComponent'
const { width, height } = Dimensions.get('window')

class Item extends React.Component {

    render() {
        const item = this.props.item;
        const light = this.props.light;
        const colorText = light ? 'white' : 'black';
        const colorIcon = light ? 'white' : 'black';
        return (
            <TouchableOpacity onPress={this.props.goToDetailComic} style={[styles.container]}>
                <View style={[styles.viewImage]}>
                    <Image source={{ uri: item.image }} style={[styles.image]} />
                </View>
                <View style={[styles.viewDes]}>
                    <View style={[styles.viewTitle]}>
                        <Image source={require('../../../Icon/book.png')} style={[styles.icon, { tintColor: colorIcon }]} />
                        <View style={{ flexWrap: 'wrap', marginLeft: 5 }}>
                            <Text numberOfLines={2} style={[styles.text, { color: colorText }]}>{item.title}</Text>
                        </View>
                    </View>
                    <View style={[styles.viewTG]}>
                        <Image source={require('../../../Icon/pencil.png')} style={[styles.icon, { tintColor: colorIcon }]} />
                        <Text style={[styles.textTG, , { color: colorText }]}>{item.tg}</Text>
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={styles.chapter}>Chương {item.chapter}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

function mapPTS(state) {
    return {
        light: state.changeLightReducer.light,
    }
}

export default connect(mapPTS)(Item)