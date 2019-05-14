import React from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, FlatList, Keyboard, ActivityIndicator, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Item from '../Component/Item';
import styles from '../../Search/style/stylesSearch';
import Page from '../../Page/Page';
import { search } from '../../../redux/action/actionComic/actionCreator';
const { width, height } = Dimensions.get('window')


class SearchComic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            isloading: true,
        }
    }
    componentWillMount = async () => {

    }

    Search = async () => {
        let text = this.state.text.toLowerCase();
        await this.setState({ isloading: true })
        let list = this.props.getDataOfComicReducer;
        //alert(text)
        if (text != '') {
            let filterSearch = list.filter((data) => {
                return data.title.toLowerCase().match(text) || data.tg.toLowerCase().match(text);
            })
            //console.log(filterSearch);
            await this.props.search(filterSearch)

        } else {
            let filterSearch = [];
            await this.props.search(filterSearch)
        }
        this.setState({ isloading: false })
    }

    renderItem = (item) => {
        if (item != []) {
            return <Item item={item} goToDetail={() => this.props.navigation.push("DetailComic", { item })} />
        } else {
        }
    }

    listEmpty = () => {
        if (this.state.text != 0 && this.state.isloading == false) {
            return <Page />
        } else {
            return null
        }
    }

    render() {
        const light = this.props.light;
        const colorText = light ? 'white' : 'black';
        const backgroundColor = light ? "#444444" : 'white';
        const tintIconColor = light ? 'white' : 'black';
        const borderColorT = light ? 'white' : 'black';
        const placeholderColor = light ? 'white' : 'black';
        const data = this.props.SearchComicReducer;
        return (
            <View style={[styles.container, { backgroundColor, width }]}>
                <View style={styles.viewHeader}>
                    <View style={[styles.viewSearch, { borderColor: borderColorT }]}>
                        <TextInput
                            value={this.state.text}
                            placeholder={`Tìm kiếm`}
                            onChangeText={(text) => this.setState({ text })}
                            placeholderTextColor={placeholderColor}
                            style={[styles.textInput, { color: colorText }]}
                            onSubmitEditing={() => this.Search()}
                        />
                        <TouchableOpacity onPress={() => { this.Search(), Keyboard.dismiss() }} style={{ paddingHorizontal: 5 }}>
                            <Image
                                source={require('../../../Icon/search.png')}
                                style={[styles.image, { tintColor: tintIconColor }]} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('AllComic')}
                        style={styles.viewHuy}>
                        <Text style={styles.text}>Hủy</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 11 }}>
                    <FlatList
                        data={data}
                        renderItem={({ item, index }) => <Item item={item} goToDetailComic={() => this.props.navigation.push("DetailComic", { item })} />}
                        keyExtractor={(item, index) => `asdasd${index}`}
                        ListEmptyComponent={() => this.listEmpty()}
                    />
                </View>
            </View>
        )
    }
}
function MapSTP(state) {
    //alert(state.SearchComicReducer)
    return {
        getDataOfComicReducer: state.getDataOfComicReducer,
        light: state.changeLightReducer.light,
        SearchComicReducer: state.SearchComicReducer,
    }
}
export default connect(MapSTP, { search })(SearchComic)