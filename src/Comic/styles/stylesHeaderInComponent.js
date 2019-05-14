import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');


const styles = StyleSheet.create({
    container: {
        width: width,
        height: height / 12,
        flexDirection: 'row',
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
    touchView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewHeader: {
        flex: 6,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        marginLeft: 10,
        color: 'black',
        fontSize: 23,
        fontWeight: 'bold',
        fontStyle: 'italic'
    },
    image: {
        width: height / 14,
        height: height / 14,
        tintColor: 'black'
    },
    icon: {
        width: 30,
        height: 30,
    }

})

export default styles;