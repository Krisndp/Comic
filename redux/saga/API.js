import axios from 'axios';
import * as rssParser from 'react-native-rss-parser';
import cheerio from 'cheerio-without-node-native';
var DomParser = require('react-native-html-parser').DOMParser;
//const newsUrl = 'https://vietnamnet.vn/rss/phap-luat.rss';

function* getNewsFromAPI(linkNewsTopic) {
    //alert(JSON.stringify(linkNewsTopic))
    //console.log(linkNewsTopic)
    // const response = yield  getData = (urlABC) => {
    const response = yield axios({
        method: 'get',
        url: linkNewsTopic
    })
        .then(res => {
            //console.log("res.data");
            //const data = res.data;
            const $ = cheerio.load(res.data);
           // console.log('as')
            $('.images-home').remove();
            let html = $(".list-content").html();
            let doc = new DomParser().parseFromString(html, 'text/html');
            // console.log(doc.childNodes)
            let element = doc.childNodes;
            // })
            // .then(element => {
            var arr = [];
            //console.log(element.length);
            for (var i = 0; i < element.length; i++) {
                //console.log(element[i])
                let valueElement = element[i].childNodes;
                let links = "https://vietnamnet.vn" + valueElement[0].attributes[0].value;
                let title = valueElement[0].attributes[1].value;
                let cm = valueElement[1].childNodes[1].childNodes[0].childNodes[0].data;
                let publishe = valueElement[1].childNodes[1].childNodes[2].childNodes[0].data;
                let illustration = valueElement[0].childNodes[0].attributes[0].value;
                let subtitle = valueElement[1].childNodes[2].childNodes[0].data;
                let obj = { title, links, subtitle, illustration, publishe, cm };
                //console.log(obj)
                arr.push(obj);
            }
            //console.log(arr)
            return arr
        })
        .catch(err => console.log('err'))

    return response
}


export const API = {
    getNewsFromAPI
}