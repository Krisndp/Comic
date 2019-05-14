import {
    GET_DATA_OF_COMIC,
    GET_DATA_OF_COMIC_FAIL,
    GET_DATA_OF_COMIC_SUCCESS,
    GET_DATA_OF_COMIC_EMPTY,

    GET_DETAIL_OF_COMIC,
    GET_DETAIL_OF_COMIC_FAIL,
    GET_DETAIL_OF_COMIC_SUCCESS,
    GET_DETAIL_OF_COMIC_EMPTY,

    GET_CHAPTER_OF_COMIC_EMPTY,
    GET_CHAPTER_OF_COMIC,
    GET_CHAPTER_OF_COMIC_FAIL,
    GET_CHAPTER_OF_COMIC_SUCCESS,

    SEARCH
} from './actionType';

export function get_data_of_comic_action(linkComic) {
    return { type: GET_DATA_OF_COMIC, linkComic }
}

export function get_data_of_comic_fail_action() {
    return { type: GET_DATA_OF_COMIC_FAIL, error }
}

export function get_data_of_comic_action_empty() {
    return { type: GET_DATA_OF_COMIC_EMPTY }
}

export function get_data_of_comic_success_action() {
    return { type: GET_DATA_OF_COMIC_SUCCESS, receivedDataOfComic }
}
//
export function get_detail_of_comic(linkDetailComic) {
    return { type: GET_DETAIL_OF_COMIC, linkDetailComic }
}

export function get_detail_of_comic_empty() {
    return { type: GET_DETAIL_OF_COMIC_EMPTY }
}

export function get_detail_of_comic_fail() {
    return { type: GET_DETAIL_OF_COMIC_FAIL }
}

export function get_detail_of_comic_success() {
    return { type: GET_DETAIL_OF_COMIC_SUCCESS, receivedDetailOfComic }
}
//

export function get_chapter_of_comic_empty() {
    return { type: GET_CHAPTER_OF_COMIC_EMPTY,  }
}

export function get_chapter_of_comic(linkChapterComic) {
    return { type: GET_CHAPTER_OF_COMIC, linkChapterComic }
}

export function get_chapter_of_comic_fail() {
    return { type: GET_CHAPTER_OF_COMIC_FAIL }
}

export function get_chapter_of_comic_success() {
    return { type: GET_CHAPTER_OF_COMIC_SUCCESS, receivedChapterOfComic }
}
//
export function search(ItemSearch) {
    return { type: SEARCH, ItemSearch }
}