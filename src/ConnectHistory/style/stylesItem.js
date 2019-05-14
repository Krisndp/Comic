import {StyleSheet, Dimensions} from 'react-native';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        marginBottom: 5,
        width,
        height: height / 4.8,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ViewTitle: {
        flex: 1,
    },
    TextTitle: {
        color: 'black',
        fontSize: width / 22,
        fontWeight: 'bold'
    },
    VNtext: {
        fontSize: width / 30,
        color: '#848484' 
    },
    ViewDes: {
        flex: 2,
        flexDirection: 'row'
    },
    image: {
        width: width * 0.2,
        height: width * 0.2
    },
    ViewImage: {
        flex: 2,
        justifyContent: 'center'
    },
    ViewDescription: {
        flex: 7,
        justifyContent: 'center',
        alignItems: 'center'
    },
    TextDes: {
        color: 'black',
        fontSize: width / 26
    }
})

export default styles;