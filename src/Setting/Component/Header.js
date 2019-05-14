import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import styles from '../styles/stylesHeader';

class Header extends React.Component {

    componentWillMount = () => {
    }

    render() {
        //alert(JSON.stringify(itemChoose));
        const colorT = this.props.light ? 'white' : 'black';
        const tintColorT = this.props.light ? 'white' : 'black';
        return (
            <View style={styles.header}>
                <View style={styles.view1}>
                    <TouchableOpacity onPress={this.props.drawer} style={styles.view1}>
                        <Image source={require('../../../Icon/menu.png')} style={[styles.image, { tintColor: tintColorT }]} />
                    </TouchableOpacity>
                </View>
                <View style={styles.view1}>
                    <TouchableOpacity onPress={this.props.setting} style={styles.view1}>
                        <Image source={require('../../../Icon/settings.png')} style={[styles.image, { tintColor: tintColorT }]} />
                    </TouchableOpacity>
                </View>

                <View style={styles.view2}>
                    <Text style={[styles.text, { color: colorT }]}>{this.props.nameTopic}</Text>
                </View>
                <View style={styles.view1}>
                    <TouchableOpacity onPress={this.props.search} style={styles.view1}>
                        <Image source={require('../../../Icon/search1.png')} style={[styles.image, { tintColor: tintColorT }]} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
function mapSTP(state) {
    //alert(JSON.stringify(state.categoriesNewsReducer))
    return {
        nameTopic: state.categoriesNewsReducer.choosedTopic[0].nameTopic,
        light: state.changeLightReducer.light,
    }
}
export default connect(mapSTP)(Header)
