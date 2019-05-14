import axios from 'axios';
import cheerio from 'cheerio-without-node-native';

function* getDetailFromLink(linkDetailComic) {
    //console.log(linkDetailComic.linkDetailComic)
    const response = yield axios({
        method: 'get',
        url: linkDetailComic.linkDetailComic
    })
        .then(res => {
            //console.log('res')
            const data = res.data;
            const $ = cheerio.load(data);
            $('.showmore').remove();
            const htmlDetailScreen = ($(".col-xs-12.col-sm-8.col-md-8.desc").html());
            const textDetail = ($(".col-xs-12.col-sm-8.col-md-8.desc").text());
            const imageBig = $(".book").html();
            const detailInfo = { htmlDetailScreen, imageBig, textDetail };
            console.log(detailInfo)
            return detailInfo
        })
        .catch(err => console.log('err'))
    return response
}

export const API = {
    getDetailFromLink
}