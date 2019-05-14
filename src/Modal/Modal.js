import React, { Component } from 'react';
import { Text, View, Dimensions, TouchableOpacity } from 'react-native';
const { width, height } = Dimensions.get('window');
import Part4 from '../Home/Component/Part4';
import Part2 from '../Home/Component/Part2';
import { connect } from 'react-redux';
import { change_fontsize } from '../../redux/action/actionCreator'

class ModalView extends Component {

  render() {
    const backgroundColor = this.props.light ? 'grey' : 'white';
    const borderColorT = this.props.light ? 'white' : 'black';
    return (
      <View style={{ backgroundColor, marginTop: height * 0.58, marginLeft: width / 3.2, borderColor: borderColorT, borderWidth: 1, width: width / 1.5, height: height * 0.35, borderRadius: 20, padding: 10 }}>

        <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: borderColorT }}>
          <TouchableOpacity
            onPress={() => this.props.change_fontsize(false)}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRightColor: borderColorT, borderRightWidth: 1 }}>
            <Text style={{ fontSize: 16, color: borderColorT }}>A</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.change_fontsize(true)}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: borderColorT }}>A</Text>
          </TouchableOpacity>
        </View>
        <Part4 />
        <Part2 onPress={ this.props.openByBrowser }
          title={"Mở trong trình duyệt"}
          icon={require('../../Icon/clock.png')}
        />
        <Part2 onPress={ this.props.copyLink }
          title={"Copy link bài viết"}
          icon={require('../../Icon/clock.png')}
        />
        <View style={{ marginLeft: width / 4, marginTop: 10 }}>
          <Text onPress={this.props.offModal} style={{ color: 'red', fontSize: 16, fontWeight: 'bold' }}>XONG</Text>
        </View>
      </View>
    );
  }
}

function mapSTP(state) {
  return { light: state.changeLightReducer.light }
}

export default connect(mapSTP, { change_fontsize })(ModalView);
