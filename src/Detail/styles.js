import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');


const styles = StyleSheet.create({
    container: {
        padding: 40,
        marginTop: 0.6 * height,
        paddingTop: 10
    },
    image: {
        width: width / 14,
        height: width / 14,
        tintColor: 'white',
        marginRight: 20
    },
    viewTotal: {
        flexDirection: 'row',
        marginTop: 10,
        flex: 1
    },
    icon: {
        width: 20,
        height: 20
    },
    view1: {
        flex: 1,
        justifyContent: 'center'
    },
    view2: {
        flex: 4,
        justifyContent: 'center'
    },
    view3: {
        flex: 5,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    view4: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    view5: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    text: {
        fontSize: 17,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold'
    },
})

export default styles;