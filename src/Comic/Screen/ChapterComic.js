import React from 'react';
import {
    View, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity, TextInput, Text,
    Share, Modal, Linking, Clipboard, ToastAndroid, Image
} from 'react-native';
import styles from '..//../Detail/StyleDetail';
import ModalView from '../../Modal/Modal'
import { connect } from 'react-redux';
import HTMLView from 'react-native-htmlview';
import HeaderDetail from './HeaderDetail';
import { get_chapter_of_comic, get_chapter_of_comic_empty } from '../../../redux/action/actionComic/actionCreator';
import Tts from 'react-native-tts';
import styless from '../styles/StylesChapterComic';
var x = 2;

class ChapterComic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numberChap: "1",
            modalVisible: false,
            isSpeake: false,
        }
    }

    componentWillMount = () => {
        const item = this.props.navigation.getParam('item');
        this.props.get_chapter_of_comic(item.links + `chuong-${1}/`);
    }

    loadMore = async () => {
        this.setState({ isScroll: true });
        //this.endScroll()
    }

    speak = () => {
        Tts.setDefaultLanguage('vi-VN');
        // Tts.setDefaultVoice('vi-VN-SMTf00');
        // Tts.voices().then(voices => alert(JSON.stringify(voices)));
        const isSpeake = this.state.isSpeake;
        if (isSpeake == false) {
            Tts.speak(this.props.getChapterOfComicReducer.textChapter)
            this.setState({ isSpeake: !isSpeake });
            //alert('speak')
        } else {
            Tts.stop();
            this.setState({ isSpeake: !isSpeake });
            //alert('stop')
        }

    }

    onShare = async (item) => {
        try {
            const result = await Share.share({
                message: item.links,
                title: item.title,
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    endScroll = async () => {

        if (!this.state.isScroll) { return <ActivityIndicator size="large" color="#0000ff" /> }
        console.log(x)
    }

    openByBrowser = (item) => {
        this.setState({ modalVisible: false });
        Linking.openURL(item.links)
    }

    copyLink = (item) => {
        Clipboard.setString(item.links);
        this.setState({ modalVisible: false });
        ToastAndroid.showWithGravity(
            'Đã lưu',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
        );
    }

    down = async (item) => {
        const x = Number(this.state.numberChap);
        if (x == 1) {
            return null
        } else {
            await this.setState({ numberChap: `${x - 1}` });
            await this.props.get_chapter_of_comic_empty();
            await this.props.get_chapter_of_comic(item.links + `chuong-${this.state.numberChap}/`);
            this.refs.ViewReader.scrollTo({ x: 0, y: 0, animated: false, duration: 0 });
        }

    }

    up = async (item) => {
        const x = Number(this.state.numberChap);
        if (x == item.chapter) {
            return null
        } else {
            await this.setState({ numberChap: `${x + 1}` });
            await this.props.get_chapter_of_comic_empty();
            await this.props.get_chapter_of_comic(item.links + `chuong-${this.state.numberChap}/`);
            this.refs.ViewReader.scrollTo({ x: 0, y: 0, animated: false, duration: 0 });
        }
    }

    search = async (item) => {
        const numberChap = parseInt(this.state.numberChap);
        if (numberChap < 1 || numberChap > item.chapter) {
            alert('Chương không tồn tại');
        } else {
            await this.props.get_chapter_of_comic_empty();
            await this.props.get_chapter_of_comic(item.links + `chuong-${numberChap}/`);
            this.refs.ViewReader.scrollTo({ x: 0, y: 0, animated: false, duration: 0 });
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
        const backgroundColor = this.props.light ? "#444444" : 'white';
        const backgroundColorHeader = this.props.light ? 'white' : "#444444";
        const colorT = this.props.light ? 'black' : 'white';
        const tintColorT = this.props.light ? 'black' : 'white';
        const stylesHTML = this.styleForHTML();
        return (
            <View style={{ flex: 1, backgroundColor }}>
                <HeaderDetail item={item} goToAllComic={() => { this.props.navigation.pop(), this.props.get_chapter_of_comic_empty() }} />
                <View style={styless.changeNumberView}>
                    <TouchableOpacity onPress={() => this.down(item)} style={styless.changeNumberTouch} >
                        <Text style={styless.text}>Chương trước</Text>
                    </TouchableOpacity>
                    <TextInput
                        value={this.state.numberChap}
                        style={[styless.inputView, { borderColor: backgroundColorHeader, color: backgroundColorHeader }]}
                        onChangeText={(text) => this.setState({ numberChap: `${parseInt(text)}` })}
                        keyboardType={'numeric'}
                        placeholder={`${this.state.numberChap}`}
                        placeholderTextColor={`${backgroundColorHeader}`}
                        returnKeyType={'go'}
                        onSubmitEditing={() => this.search(item)}
                    />
                    <TouchableOpacity onPress={() => this.up(item)} style={styless.changeNumberTouch}>
                        <Text style={styless.text}>Chương sau</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView ref={'ViewReader'} onScroll={() => this.loadMore()} onMomentumScrollEnd={() => this.endScroll()}>
                    {this.props.getChapterOfComicReducer.length == 0 && (
                        <ActivityIndicator size="large" color='#00BFFF' />
                    )}
                    {this.props.getChapterOfComicReducer.length != 0 && (
                        <HTMLView
                            value={`${this.props.getChapterOfComicReducer.htmlChapterScreen}`}
                            stylesheet={stylesHTML}
                        />
                    )}
                </ScrollView>

                <View style={[styles.Footer, { backgroundColor: backgroundColorHeader }]}>
                    <TouchableOpacity  style={styles.backToHome}>
                        
                    </TouchableOpacity>
                    <View style={styles.titleView}>

                    </View>
                    <TouchableOpacity onPress={() => this.onShare(item)} style={styles.ViewOneIcon}>
                        <Image source={require('../../../Icon/share.png')} style={[styles.image, { tintColor: tintColorT }]} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.speak()} style={styles.ViewOneIcon}>
                        <Image source={require('../../../Icon/speaker.png')} style={[styles.image, { tintColor: tintColorT }]} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ modalVisible: true })} style={styles.ViewOneIcon}>
                        <Image source={require('../../../Icon/dot.png')} style={[styles.image, { tintColor: tintColorT }]} />
                    </TouchableOpacity>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                >
                    <ModalView
                        copyLink={() => this.copyLink(item)}
                        openByBrowser={() => this.openByBrowser(item)}
                        offModal={() => this.setState({ modalVisible: false })} />
                </Modal>
            </View>
        )
    }
}

function mapSTP(state) {
    //alert(state.getChapterOfComicReducer.textChapter)
    return {
        getChapterOfComicReducer: state.getChapterOfComicReducer,
        light: state.changeLightReducer.light,
        fontsizeBig: state.changeFontSizeReducer.fontsizeBig,
    }
}

export default connect(mapSTP, { get_chapter_of_comic, get_chapter_of_comic_empty })(ChapterComic)
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