import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    header: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 10,
        justifyContent:'center',
        alignItems:'center'
    },
    view1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    view2: {
        flex: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 20,
        height: 20,
        tintColor: 'black'
    },
    text: {
        color: 'black',
        fontSize: 20
    }
})    

export default styles;