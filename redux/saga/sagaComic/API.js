import axios from 'axios';
import cheerio from 'cheerio-without-node-native';
var DomParser = require('react-native-html-parser').DOMParser;
//const newsUrl = 'https://vietnamnet.vn/rss/phap-luat.rss';

function* getDataOfComicSaga(linkComic) {
    //alert(JSON.stringify(linkNewsTopic))
    //console.log(linkNewsTopic)
    // const response = yield  getData = (urlABC) => {
    const response = yield axios({
        method: 'get',
        url: linkComic
    })
        .then(res => {
            //console.log("res.data");
            const data = res.data;
            const $ = cheerio.load(data);
            $('.title-list').remove();
            let html = $(".list-truyen").html();
            let doc = new DomParser().parseFromString(html, 'text/html');
            //console.log(doc.childNodes)
            let element = doc.childNodes;

            var arr = [];

            for (var i = 0; i < element.length; i++) {
                //console.log(element[i])
                let valueElement = element[i].childNodes;
                let image = valueElement[0].childNodes[0].childNodes[0].attributes[0].value;
                let links = valueElement[1].childNodes[0].childNodes[2].childNodes[0].attributes[0].value;
                let title = valueElement[1].childNodes[0].childNodes[2].childNodes[0].attributes[1].value;
                let chapter = valueElement[2].childNodes[0].childNodes[0].childNodes[1].data;

                let TGFix = valueElement[1].childNodes[0].childNodes;
                //console.log(TGFix.length)
                if (TGFix.length == 6) {
                    var tg = TGFix[5].childNodes[1].data;
                } else if (TGFix.length == 5) {
                    var tg = TGFix[4].childNodes[1].data;
                }
                let obj = { title, links, image, chapter, tg };
                // console.log(links)
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
    getDataOfComicSaga
}