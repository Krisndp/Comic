import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { connect } from 'react-redux';
class ItemSearched extends React.Component {

    render() {
        const item = this.props.item;
        const light = this.props.light;
        const colorText = light ? 'white' : 'black';
        const borderColorT = light ? "white" : 'black';
        return (
            <TouchableOpacity onPress = {this.props.onPress}  style={{ borderRadius: 10, borderColor: borderColorT, borderWidth:0.5, margin:5}}>
               <Text style = {{fontSize: 16, color:colorText, margin:5}}>{item.text}</Text>
            </TouchableOpacity>
        )
    }
}

function MapSTP(state) {
    return {
        light: state.changeLightReducer.light
    }
}

export default connect(MapSTP)(ItemSearched)

