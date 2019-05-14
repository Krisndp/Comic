import React from 'react';
import { View, Text, Dimensions, StyleSheet, Image, Switch, TouchableOpacity } from 'react-native';
const { width, height } = Dimensions.get('window')
import { connect } from 'react-redux';
import Item4 from './Item4';
import { change_light } from '../../../redux/action/actionCreator';

class Part4 extends React.Component {
    constructor(props) {
        super(props);

    }
    right3 = () => {
        return (
            <View style={styles.component3}>
                <Switch
                    onValueChange={() => this.props.change_light()}
                    value={this.props.changeLightReducer.light}
                />
            </View>
        )
    }

    render() {
        const borderBottomColor = this.props.light ? 'white' : 'black';
        return (
            <View style={[styles.container, { borderBottomColor }]}>
                <Item4
                    title={'Chế độ ban đêm'}
                    icon={require('../../../Icon/sun.png')}
                    right={this.right3()}
                />
            </View>
        )
    }
}
function mapSTP(state) {
    return { changeLightReducer: state.changeLightReducer }
}

export default connect(mapSTP, { change_light })(Part4);

const styles = StyleSheet.create({
    container: {
        height: 0.15 * width,
        justifyContent: 'center',
        //alignItems:'center',
        marginTop: 5,
        flexDirection: 'column',
    },
    component3: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row'
    },
})