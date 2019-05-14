import React from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
const { width, height } = Dimensions.get('window');
import styles from '../styles/stylesHeaderInComponent'

class Header extends React.Component {

    render() {
        const light = this.props.light;
        const colorText = light ? 'white' : 'black';
        const colorIcon = light ? 'white' : 'black';
        const borderBottomColorView = light ? 'white' : 'black';
        return (
            <View style={[styles.container, { borderBottomColor: borderBottomColorView }]}>
                <TouchableOpacity onPress={this.props.onPress} style={styles.touchView}>
                    <Image source={require('../../../Icon/Back.png')} style={[styles.icon, { tintColor: colorIcon }]} />
                </TouchableOpacity>
                <View style={styles.viewHeader}>
                    <Image source={require('../../../Icon/bookHeader.png')} style={[styles.image, { tintColor: colorIcon }]} />
                    <Text style={[styles.text, { color: colorText }]}>TRUYỆN FULL</Text>
                </View>
                <TouchableOpacity onPress = {this.props.gotoSearch} style={styles.touchView}>
                    <Image source={require('../../../Icon/search1.png')} style={[styles.icon, { tintColor: colorIcon }]} />
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

export default connect(mapPTS)(Header)