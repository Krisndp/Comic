import axios from 'axios';
import cheerio from 'cheerio-without-node-native';

function* getChapterFromLink(linkChapterComic) {
    //console.log(linkChapterComic.linkChapterComic)
    const response = yield axios({
        method: 'get',
        url: linkChapterComic.linkChapterComic
    })
        .then(res => {
            //console.log('res')
            const data = res.data;
            const $ = cheerio.load(data);
            $(".hidden-xs.text-center.ads-middle.ads-holder").remove();
            const htmlChapterScreen = ("<div>" + $(".chapter-c").html() + "</div>");
            const textChapter = $(".chapter-c").text()
            // console.log(htmlChapterScreen)
            const Obj = {htmlChapterScreen, textChapter}
            return Obj
        })
        .catch(err => console.log('err'))
    return response
}

export const API = {
    getChapterFromLink
}