import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import styles from '../styles/StylesHeader';

class HeaderScreen extends React.Component {

    render() {
        const light = this.props.light;
        const colorText = light ? 'white' : 'black';
        const colorIcon = light ? 'white' : 'black';
        const borderBottomColorView = light ? 'white' : 'black';
        const item = this.props.item;
        return (
            <View style={[styles.container,{borderBottomColor: borderBottomColorView, borderBottomWidth:1}]}>
                <TouchableOpacity onPress = {this.props.goToAllComic} style={styles.touchView}>
                    <Image source={require('../../../Icon/Back.png')} style={[styles.image,{tintColor:colorIcon}]} />
                </TouchableOpacity>
                <View style={styles.viewHeader}>
                    <Text numberOfLines={1} style={[styles.text,{color:colorText}]}>{item.title}</Text>
                </View>
                <TouchableOpacity style={styles.touchView}>
             </TouchableOpacity>
            </View>
        )
    }
}

function mapPTS(state) {
    return { 
        light: state.changeLightReducer.light,
    }
}

export default connect(mapPTS)(HeaderScreen)