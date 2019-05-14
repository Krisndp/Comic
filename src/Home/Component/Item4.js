import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';

class Part4 extends React.Component {

    render() {
        const borderBottomColor = this.props.light ? 'white' : 'black';
        const colorText = this.props.light ? 'white' : 'black';
        return (
            <View style={[styles.container,{borderBottomColor}]}>
                <View style={styles.component1}>
                    <Image style={styles.image} source={ this.props.icon } />
                </View>
                <View style={styles.component2}>
                    <Text style={[styles.text,{color:colorText}]}>{this.props.title}</Text>
                </View>
                {this.props.right}
            </View>
        )
    }
}
function mapSTP(state) {
    return { light: state.changeLightReducer.light }
}

export default connect(mapSTP)(Part4);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    component1: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
    },
    image: {
        width: 30,
        height: 30,
        tintColor:'green'
    },
    component2: {
        flex: 4,
        justifyContent: 'center',
    },
    text: {
        fontSize: 18
    },
})