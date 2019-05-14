import { Dimensions, StyleSheet, Platform } from 'react-native';
const { width, height } = Dimensions.get('window');
const HEADER_MAX_HEIGHT = height * 0.6;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 85;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: null,
        resizeMode: 'cover',
        flex: 6,
        width: width,
        height: height * 0.6,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        borderRadius: 60
    },
    content: {
        flex: 1,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        overflow: 'hidden',
        height: HEADER_MAX_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: null,
        height: HEADER_MAX_HEIGHT,
        resizeMode: 'cover',
    },
    bar: {
        backgroundColor: 'transparent',
        marginTop: Platform.OS === 'ios' ? 28 : 8,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        padding: 10
    },
    title: {
        backgroundColor: 'transparent',
        color: '#A4A4A4',
        fontSize: 22,
        margin: 5
    },
    image: {
        width: 25,
        height: 25,
        tintColor: '#A4A4A4',
        marginRight: 10
    },
    viewHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    backToHome: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 5
    },
    titleView: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewIcon: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    },
    ViewOneIcon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    Footer: { 
        height: 40, 
        width,
        flexDirection: 'row'
        // justifyContent:'center',
        // alignItems:'center',
        // backgroundColor:'grey'
    }
})

export default styles;