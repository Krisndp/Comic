import React from 'react';
import { View, Image, ImageBackground, Text, Alert, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import HTMLView from 'react-native-htmlview';
import { get_info_news } from '../../../redux/action/actionCreator'
import styles from '../styles';

class Item extends React.Component {

    componentWillMount = () => {
        this.props.get_info_news(this.props.item.links, this.props.light)
    }

    styleForHTML = () => {
        if (this.props.light == false && this.props.fontsizeBig == false) {
            return htmlstylesFF
        } else if (this.props.light == true && this.props.fontsizeBig == false) {
            return htmlstylesTF
        }
        else if (this.props.light == false && this.props.fontsizeBig == true) {
            return htmlstylesFT
        }
        else if (this.props.light == true && this.props.fontsizeBig == true) {
            return htmlstylesTT
        }
    }

    render() {
        const item = this.props.item;
        const colorT = this.props.light ? 'white' : 'black';
        const cm = item.cm == null ? "VietNamNet" : item.cm;
        const stylesHTML = this.styleForHTML();
        return (
            <View style={styles.container}>
                <View style={styles.viewTotal}>
                    <View style={styles.view1}>
                        <Image source={require('../../../Icon/triangle.png')} style={[styles.icon]} />
                    </View>
                    <View style={styles.view2}>
                        <Text style={{ color: '#00BFFF' }}>{cm}</Text>
                    </View>
                    <View style={styles.view3}>
                        <Text style={{ color: '#848484' }}>{item.publishe}</Text>
                    </View>
                </View>
                <View style={styles.view4}>
                    <Text onPress={this.props.onPress} style={[styles.title, { color: colorT }]}>{item.title}</Text>
                </View>
                <View style={styles.view5} activeOpacity={1}>
                    <HTMLView
                        value={`${this.props.info.HtmlData}`}
                        stylesheet={stylesHTML}
                        //stylesheet = {textFontSize}
                        textComponentProps={{ color: 'red' }} />
                </View>
            </View>
        )
    }
}
function mapSTP(state) {
    return {
        fontsizeBig: state.changeFontSizeReducer.fontsizeBig,
        light: state.changeLightReducer.light,
        info: state.infoNewsReducer,
    }
}

export default connect(mapSTP, { get_info_news })(Item)

const htmlstylesFF = StyleSheet.create({
    p: {
        color: 'black',
        fontSize: 15
    }
})

const htmlstylesTF = StyleSheet.create({
    p: {
        color: 'white',
        fontSize: 15
    }
})

const htmlstylesFT = StyleSheet.create({
    p: {
        color: 'black',
        fontSize: 18
    }
})

const htmlstylesTT = StyleSheet.create({
    p: {
        color: 'white',
        fontSize: 18
    }
})
