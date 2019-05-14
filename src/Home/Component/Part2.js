import React from 'react';
import { View, Text, Dimensions, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
const { width, height } = Dimensions.get('window');

class Part2 extends React.Component {

    render() {
        const colorText = this.props.light ? 'white' : 'black';
        const tintColorImage = this.props.light ? 'white' : 'black';
        return (
            <TouchableOpacity style={[styles.container]} onPress={this.props.onPress} >
                <View style={styles.component1}>
                    <View style={styles.component12}>
                        <Image style={[styles.image, { tintColor: tintColorImage }]} source={ this.props.icon } />
                    </View>
                    <View style={styles.component11}>
                        <Text style={[styles.text, { color: colorText }]}>{this.props.title}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}
function mapSTP(state) {
    return {
        categoriesReducer: state.categoriesReducer,
        light: state.changeLightReducer.light
    }
}


export default connect(mapSTP)(Part2);

const styles = StyleSheet.create({
    container: {
        height: 0.15 * width,
        justifyContent: 'center',
        flexDirection: 'column',
        //alignItems:'center',
        marginTop: 5,
    },
    text: {
        fontSize: 18
    },
    component1: {
        flex: 1,
        flexDirection: 'row'
    },
    image: {
        width: 30,
        height: 30,
    },
    component11: {
        flex: 5,
        justifyContent: 'center'
    },
    component12: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})