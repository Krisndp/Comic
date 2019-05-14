import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');


const styless = StyleSheet.create({
    changeNumberView: { 
        width, 
        paddingVertical: 10, 
        justifyContent: 'center', 
        alignItems: 'center', 
        flexDirection: 'row' 
    },
    changeNumberTouch: { 
        height: height / 13 - 20, 
        backgroundColor: 'green', 
        justifyContent: 'center', 
        borderRadius: 10 
    },
    inputView:{ 
        height: height / 13 - 20, 
        width: width / 5, 
        fontSize: 16, 
        color: 'black', 
        borderRadius: 10, 
        borderColor: 'black', 
        borderWidth: 1, 
        marginHorizontal: 10 
    },
    text: { 
        color: 'white', 
        fontSize: 15, 
        marginHorizontal: 10 
    },
    
})

export default styless;