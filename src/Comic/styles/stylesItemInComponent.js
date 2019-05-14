import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');


const styles = StyleSheet.create({
    container: {
        padding: 5,
        height: height / 8,
        marginBottom: 0,
        flexDirection: 'row',
        width: width - 10
    },
    viewImage: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewDes: {
        flex: 5,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingHorizontal: 5,
        justifyContent: 'center'
    },
    text: {
        fontSize: 17,
        fontWeight: '600',
        color: 'black'
    },
    viewTitle: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        width: (width - 10) * 2 / 7,
        height: height / 8 - 10
    },
    icon: {
        width: 20,
        height: 20,
    },
    viewTG: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    textTG: {
        fontSize: 15,
        fontStyle: 'italic',
        color: 'black'
    },
    chapter: {
        color: '#00BFFF',
        marginLeft: 20
    }

})

export default styles;