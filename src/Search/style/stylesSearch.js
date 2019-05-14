import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    viewHeader: {
        width,
        height: width / 7,
        flexDirection: 'row'
    },
    viewSearch: {
        flex: 6,
        borderRadius: 20,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        margin: 10
    },
    textInput: {
        paddingLeft: 20,
        paddingVertical: 0,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 16,
        marginHorizontal: 10,
        flex: 1,
    },
    viewHuy: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 25,
        height: 25
    },
    text: {
        color: '#00BFFF',
        fontSize: width / 22
    },
    viewWordedSearch:{
        width: width - 20,
        flexWrap: 'wrap',
        marginHorizontal:10,
        flexDirection:'row'
    },
    viewFlatList: { 
        width, 
        //height: height - width / 7, 
        justifyContent: 'center', 
        alignItems: 'center' 
    }
})

export default styles;