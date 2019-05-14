import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import styles from './style/stylesItem';
class Item extends React.Component {

    render() {
        const item = this.props.item;
        const light = this.props.light;
        const colorText = light ? 'white' : 'black';
        const backgroundColor = light ? "#444444" : 'white';
        return (
            <TouchableOpacity onPress={this.props.goToDetail} style={[styles.container, { backgroundColor }]}>
                <View style={styles.ViewTitle}>
                    <Text numberOfLines={2} style={[styles.TextTitle, { color: colorText }]}>{item.title}</Text>
                    <Text style={styles.VNtext}>VietNamNet</Text>
                </View>
                <View style={styles.ViewDes}>
                    <View style={styles.ViewImage}>
                        <Image style={[styles.image]} source={{ uri: item.illustration }} />
                    </View>
                    <View style={styles.ViewDescription}>
                        <Text numberOfLines={4} style={[styles.TextDes, { color: colorText }]}>{item.subtitle}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

function MapSTP(state) {
    return {
        light: state.changeLightReducer.light
    }
}

export default connect(MapSTP)(Item)

