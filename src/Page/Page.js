import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
// import axios from 'axios';
// import cheerio from 'react-native-cheerio';
// var DomParser = require('react-native-html-parser').DOMParser;
// var x = 1;

class Page extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         allDetail: []
    //     }
    // }

    // componentWillMount = () => {
    //     this.getData("https://vietnamnet.vn/vn/thoi-su/trang" + x + '/')
    //     .then(arr => this.setState({allDetail:arr} ));
    //     x++;
    //     // console.log(abc)
    //     //this.setState({ allDetail: this.getData("https://vietnamnet.vn/vn/thoi-su/chinh-tri/trang1/") })
    //     //await console.log(this.state.allDetail)
    // }

    // getData = (urlABC) => {
    //     const response = axios({
    //         method: 'get',
    //         url: urlABC 
    //     })
    //         .then(res => {
    //             //console.log("res.data");
    //             const data = res.data;
    //             const $ = cheerio.load(data);
    //             $('.images-home').remove();
    //             let html = $(".list-content").html();
    //             let doc = new DomParser().parseFromString(html, 'text/html');
    //             //console.log(doc.childNodes)
    //             let element = doc.childNodes;
    //         // })
    //         // .then(element => {
    //             var arr = [];
    //             //console.log(element.length);
    //             for (var i = 0; i < element.length; i++) {
    //                 //console.log(element[i])
    //                 let valueElement = element[i].childNodes;
    //                 let links = "https://vietnamnet.vn" + valueElement[0].attributes[0].value;
    //                 let title = valueElement[0].attributes[1].value;
    //                 let cm = valueElement[1].childNodes[1].childNodes[0].childNodes[0].data;
    //                 let publishe = valueElement[1].childNodes[1].childNodes[2].childNodes[0].data;
    //                 let illustration = valueElement[0].childNodes[0].attributes[0].value;
    //                 let subtitle = valueElement[1].childNodes[2].childNodes[0].data;
    //                 let obj = { title, links, subtitle, illustration, publishe, cm };
    //                 //console.log(obj)
    //                 arr.push(obj);
    //             }
    //             return arr
    //         })
    //         .catch(err => console.log('err'))

    //         return response
    // }

    // abc = async () => {
    //     let all = this.state.allDetail;
    //     //console.log(all)
    //     await this.getData(`https://vietnamnet.vn/vn/thoi-su/chinh-tri/trang` + x + '/')
    //     .then(arr => {
    //         this.setState({allDetail: all.concat(arr)})
    //     })
    //     x++;
    //     // let allDetail = all.concat(this.getData("https://vietnamnet.vn/vn/thoi-su/chinh-tri/trang2/"))
    //     console.log(this.state.allDetail)
    // }

    render() {
        const colorT = this.props.light ? 'white' : 'black'
        return (
            <View style={{ flex: 1, justifyContent:'center', marginTop: 20}}>
                <Text style={{ fontSize: 20, color: colorT }}>Không có dữ liệu</Text>
            </View>
        )
    }
}

function mapSTP(state) {

    return { light: state.changeLightReducer.light }
}
export default connect(mapSTP)(Page)