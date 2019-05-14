import React from 'react';
import { View, StyleSheet, Dimensions, ScrollView, ActivityIndicator, Text } from 'react-native';
import { connect } from 'react-redux';
import HTMLView from 'react-native-htmlview';
import { WebView } from 'react-native-webview';
import { get_detail_of_comic, get_detail_of_comic_empty } from '../../../redux/action/actionComic/actionCreator';
import HeaderDetail from './HeaderDetail'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Tts from 'react-native-tts';
import styles from '../../Detail/styles';
const { width, height } = Dimensions.get('window')


class DetailComic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSpeaking: false
        }
    }

    componentWillMount = () => {
        const item = this.props.navigation.getParam('item');
        this.props.get_detail_of_comic(item.links);
    }

    speech = () => {

        const isSpeaking = this.state.isSpeaking;
        if (isSpeaking == false) {
            Tts.speak(this.props.getDetailOfComicReducer.textDetail);
            this.setState({ isSpeaking: !isSpeaking })
            //alert('speak')
        } else {
            Tts.stop();
            this.setState({ isSpeaking: !isSpeaking })
            // /alert('stop')
        }

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
        const item = this.props.navigation.getParam('item');
        const light = this.props.light;
        const backgroundColor = light ? "#444444" : 'white';
        const stylesHTML = this.styleForHTML();
        return (
            <View style={{ flex: 1, backgroundColor }}>
                <HeaderDetail item={item} goToAllComic={() => { this.props.navigation.pop(), this.props.get_detail_of_comic_empty() }} />
                <ScrollView contentContainerStyle={{ backgroundColor }}>
                    {this.props.getDetailOfComicReducer.length == 0 && (
                        <ActivityIndicator size="large" color='#00BFFF' />
                    )}
                    {this.props.getDetailOfComicReducer.length != 0 && (
                        <View>
                            <View style={{ height: height / 1.8 }}>
                                <WebView
                                    source={{ html: `${this.props.getDetailOfComicReducer.imageBig}` }}
                                    style={styless.webView}
                                />
                            </View>
                            <View style={{ padding: 10, backgroundColor }}>
                                <HTMLView
                                    value={`${this.props.getDetailOfComicReducer.htmlDetailScreen}`}
                                    stylesheet={stylesHTML}
                                />

                            </View>
                            <TouchableOpacity
                                //onPress={() => this.speech()}
                                onPress={() => this.props.navigation.navigate('ChapterComic', { item })}
                                style={styless.touchView}>
                                <Text style={styless.text}>ĐỌC TRUYỆN</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </ScrollView>
            </View>
        )
    }
}

function mapPTS(state) {
    return {
        getDetailOfComicReducer: state.getDetailOfComicReducer,
        light: state.changeLightReducer.light,
        fontsizeBig: state.changeFontSizeReducer.fontsizeBig,
    }
}

export default connect(mapPTS, { get_detail_of_comic, get_detail_of_comic_empty })(DetailComic)

const htmlstylesFF = StyleSheet.create({
    div: {
        color: 'black',
        fontSize: 15
    }
})

const htmlstylesTF = StyleSheet.create({
    div: {
        color: 'white',
        fontSize: 15
    }
})

const htmlstylesFT = StyleSheet.create({
    div: {
        color: 'black',
        fontSize: 18
    }
})

const htmlstylesTT = StyleSheet.create({
    div: {
        color: 'white',
        fontSize: 18
    }
});

const styless = StyleSheet.create({
    webView: {
        marginLeft: 60,
        width: 3 * width,
        height: 3 * height
    },
    touchView: {
        marginBottom: 10,
        width: width / 3,
        height: width / 9,
        backgroundColor: '#00BFFF',
        marginLeft: width / 3,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: 'white',
        fontSize: 18,
        margin: 5
    }

})