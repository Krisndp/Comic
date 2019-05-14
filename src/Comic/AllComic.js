import React from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
const linkComic = "https://truyenfull.vn/danh-sach/truyen-hot/trang-";
import { get_data_of_comic_action } from '../../redux/action/actionComic/actionCreator';
import { connect } from 'react-redux';
import Item from './Component/Item';
import Header from './Component/Header';
x = 2;
class AllComic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isScroll: false
        }
    }

    componentWillMount = () => {
        this.props.get_data_of_comic_action([linkComic + 1 + '/'])
    }

    loadMore = async () => {
        if (!this.state.isScroll) { return null }
        const allLink = []
        for (var i = 1; i <= x; i++) {
            const linkOne = linkComic + i + '/';
            allLink.push(linkOne)
        }
        await this.props.get_data_of_comic_action(allLink);
        x++;
        console.log(x)
    }


    render() {
        const light = this.props.light;
        const backgroundColor = light ? "#444444" : 'white';
        return (
            <View style={{ flex: 1, backgroundColor }}>
                <Header onPress = {()=> this.props.navigation.pop() } gotoSearch = {() => this.props.navigation.navigate('SearchComic')} />
                <View style={{ flex: 11 }}>

                    <FlatList
                        data={this.props.getDataOfComicReducer}
                        renderItem={({ item, index }) => <Item item={item} goToDetailComic={() => this.props.navigation.push("DetailComic", { item })} />}
                        keyExtractor={(item, index) => `assd${index}`}
                        onScroll={() => this.setState({ isScroll: true })}
                        onEndReached={() => this.loadMore()}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={() => { return <ActivityIndicator size="large" color="#00BFFF" /> }}
                    />
                </View>
            </View>
        )
    }
}
function mapPTS(state) {
    //console.log(state.getDataOfComicReducer)
    return { 
        light: state.changeLightReducer.light,
        getDataOfComicReducer: state.getDataOfComicReducer 
    }
}

export default connect(mapPTS, { get_data_of_comic_action })(AllComic)