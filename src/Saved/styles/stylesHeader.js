import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        margin: 5,
        borderBottomColor: 'black',
        borderBottomWidth: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 0
    },
    back: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        flex: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    deleteAll: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 20,
        height: 20
    },
    textHeader: {
        color: 'black',
        fontSize: width / 20
    }
})

export default styles;