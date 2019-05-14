import React from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Image } from 'react-native';
const { width, height } = Dimensions.get('window')
import { connect } from 'react-redux';

class Part1 extends React.Component {

    render() {
        const borderBottomColor = this.props.light ? 'white' : 'black';
        const color = this.props.light ? 'white' : 'black';
        const tintColorImage = this.props.light ? 'white' : 'black';
        return (
            <View style={[styles.container, { borderBottomColor }]}>
                <TouchableOpacity onPress={this.props.onPress} style={styles.backToHome}>
                    <Image
                        source={require('../../../Icon/Back.png')}
                        style={[styles.icon, { tintColor: tintColorImage }]} />
                </TouchableOpacity>
                <View style={styles.Prefer}>
                    <Text style={[styles.text, { color }]}>CÀI ĐẶT</Text>
                </View>
            </View>
        )
    }
}
function mapSTP(state) {
    //alert(JSON.stringify(state.changeLightReducer))
    return { light: state.changeLightReducer.light }
}
export default connect(mapSTP)(Part1);

const styles = StyleSheet.create({
    container: {
        height: 0.1 * width,
        borderBottomWidth: 1,
        //justifyContent: 'center',

        alignItems: 'center',
        marginBottom: 10,
        flexDirection: 'row'
    },
    text: {
        fontSize: 25,
        fontWeight: '500'
    },
    backToHome: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginRight: 20
    },
    Prefer: {
        justifyContent: 'center',
        flex: 9
    },
    icon: {
        width: 20,
        height: 20
    }
})