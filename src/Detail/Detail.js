import React from 'react';
import { View, Text, Image, Dimensions, Animated, Platform, RefreshControl, TouchableOpacity, Share, Modal, Linking, Clipboard, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';
import Item from './Component/Item';
import styles from './StyleDetail';
import { insertNewsToSaved, querryAllSaved, deleteNewsSaved } from '../../realmDB/SavedSchema';
import { getDataSavedFromRealm } from '../../redux/action/actionCreator';
import ModalView from '../Modal/Modal';
import Tts from 'react-native-tts';
const { width, height } = Dimensions.get('window');
const HEADER_MAX_HEIGHT = height * 0.6;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 50;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollY: new Animated.Value(0),
            refreshing: false,
            iconSaved: "",
            modalVisible: false,
            isSpeake: false
        };
    }

    componentWillMount = () => {
        const item = this.props.navigation.getParam('item');
        querryAllSaved().then(NewsSaved => {
            const NewsSort = NewsSaved.sort(function (a, b) { return b.published - a.published });
            this.props.getDataSavedFromRealm(NewsSort)
        })
        const RealmDataSaved = this.props.RealmDataSaved;
        for (var i of RealmDataSaved) {
            if (item.links == i.links) {
                var alived = true;
                console.log(alived)
                this.setState({ iconSaved: require('../../Icon/saved.png') })
            }
        }
        if (alived == null) {
            this.setState({ iconSaved: require('../../Icon/save.png') })
        }
        //this.getInfoNews(this.props.navigation.navigate('item').links)
    }

    insertNewsToRealmSaved = (item) => {
        const RealmDataSaved = this.props.RealmDataSaved;
        for (var i of RealmDataSaved) {
            if (item.links == i.links) {
                console.log('1')
                var alived = true;
                console.log('2')
                this.setState({ iconSaved: require('../../Icon/save.png') })
                if (this.props.navigation.getParam('toDetail') == 'a') {
                    console.log('a')
                } else {
                    deleteNewsSaved(i.id)
                        .then(querryAllSaved().then(NewsSaved => {
                            const NewsSort = NewsSaved.sort(function (a, b) { return b.published - a.published });
                            this.props.getDataSavedFromRealm(NewsSort)
                        })).catch(e => console.log(e))
                }
                break;
            }
        }
        if (alived == null) {
            const NewsSavedCurently = {
                id: Math.floor(Date.now() / 1000),
                title: item.title,
                illustration: item.illustration,
                links: item.links,
                subtitle: item.subtitle,
                published: new Date(),
                cm: item.cm
            }
            this.setState({ iconSaved: require('../../Icon/saved.png') })
            insertNewsToSaved(NewsSavedCurently)
                .then(querryAllSaved().then(NewsSaved => {
                    const NewsSort = NewsSaved.sort(function (a, b) { return b.published - a.published });
                    this.props.getDataSavedFromRealm(NewsSort)
                }))
                .catch(e => alert(e))
        }
    }

    speak = async () => {
        Tts.setDefaultLanguage('vi-VN');
        //Tts.setDefaultVoice('vi-VN-SMTf00');
        // //Tts.voices().then(voices => alert(JSON.stringify(voices)));
        // alert(this.props.info.TextData)
        const isSpeake = this.state.isSpeake;
        if (isSpeake == false) {
            //Tts.speak('Hello, How are you. Tôi không biết.')
            this.setState({ isSpeake: !isSpeake });
            await Tts.speak(this.props.info.TextData)
            
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
    render() {
        const scrollY = Animated.add(
            this.state.scrollY,
            Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0,
        );
        const headerTranslate = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, -HEADER_SCROLL_DISTANCE],
            extrapolate: 'clamp',
        });
        const imageOpacity = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [1, 1, 0],
            extrapolate: 'clamp',
        });
        const imageTranslate = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 100],
            extrapolate: 'clamp',
        });
        const titleOpacity = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 1, 1],
            extrapolate: 'clamp',
        });
        const titleScale = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 1, 1],
            extrapolate: 'clamp',
        });
        const titleTranslate = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 0, -8],
            extrapolate: 'clamp',
        });
        const item = this.props.navigation.getParam('item');
        const backgroundColor = this.props.light ? "#444444" : 'white';
        const backgroundColorHeader = this.props.light ? 'white' : "#444444";
        const colorT = this.props.light ? 'black' : 'white';
        const tintColorT = this.props.light ? 'black' : 'white';
        return (
            <View style={{ flex: 1 }}>
                <View style={[styles.container, { backgroundColor }]}>

                    <Animated.ScrollView
                        style={[styles.container]}
                        scrollEventThrottle={1}
                        contentInset={{ top: HEADER_MAX_HEIGHT, }}
                        contentOffset={{ y: -HEADER_MAX_HEIGHT, }}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
                            { useNativeDriver: true },
                        )}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                progressViewOffset={HEADER_MAX_HEIGHT}
                                onRefresh={() => {
                                    this.setState({ refreshing: true });
                                    setTimeout(() => this.setState({ refreshing: false }), 500);
                                }}
                            />
                        }
                    >
                        <Item item={item} />
                    </Animated.ScrollView>
                    <Animated.View
                        pointerEvents="none"
                        style={[
                            styles.header,
                            { transform: [{ translateY: headerTranslate }] },
                            { backgroundColor: backgroundColorHeader }
                        ]}>
                        <Animated.Image
                            style={[
                                styles.backgroundImage,
                                {
                                    opacity: imageOpacity,
                                    transform: [{ translateY: imageTranslate }],
                                },
                            ]}
                            source={{ uri: item.illustration }}>
                        </Animated.Image>
                    </Animated.View>
                    <Animated.View
                        style={[
                            styles.bar,
                            {
                                transform: [
                                    { scale: titleScale },
                                    { translateX: titleTranslate },
                                ],
                                opacity: titleOpacity,
                            },
                        ]}
                    >
                        <View style={styles.viewHeader}>

                            <View style={styles.titleView}>
                                <Text numberOfLines={1} style={[styles.title, { color: colorT }]}>{item.title}</Text>
                            </View>

                        </View>
                    </Animated.View>

                </View >
                <View style={[styles.Footer, { backgroundColor: backgroundColorHeader }]}>
                    <TouchableOpacity onPress={() => this.props.navigation.pop()} style={styles.backToHome}>
                        <Image source={require('../../Icon/Back.png')} style={[styles.image, { tintColor: tintColorT }]} />
                    </TouchableOpacity>
                    <View style={styles.titleView}>

                    </View>
                    <TouchableOpacity onPress={() => this.onShare(item)} style={styles.ViewOneIcon}>
                        <Image source={require('../../Icon/share.png')} style={[styles.image, { tintColor: tintColorT }]} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.speak()} style={styles.ViewOneIcon}>
                        <Image source={require('../../Icon/speaker.png')} style={[styles.image, { tintColor: tintColorT }]} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.insertNewsToRealmSaved(item)} style={styles.ViewOneIcon}>
                        <Image source={this.state.iconSaved} style={[styles.image, { tintColor: tintColorT }]} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ modalVisible: true })} style={styles.ViewOneIcon}>
                        <Image source={require('../../Icon/dot.png')} style={[styles.image, { tintColor: tintColorT }]} />
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
    return {
        light: state.changeLightReducer.light,
        RealmDataSaved: state.RealmDataSaved,
        info: state.infoNewsReducer,
    }
}

export default connect(mapSTP, { getDataSavedFromRealm })(Detail)

