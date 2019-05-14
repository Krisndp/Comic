import Realm from 'realm';
export const SEARCH = "Search";

export const SearchNews = {
    name: SEARCH,
    primaryKey: 'id',
    properties: {
        id: 'int',
        text: 'string',
        time: 'date'
    }
}

const databaseOptions = {
    path: 'SearchRealm.realm',
    schema: [SearchNews],
    schemaVersion: 0
};

export const updateWordSearch = (WordSearch) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let updateWordSearch = realm.objectForPrimaryKey(SEARCH, WordSearch.id);
            updateWordSearch.time = WordSearch.time
            resolve()
        })
    }).catch(e => reject(e))
})

export const querryAllSearched = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        const NewsInSearch = realm.objects(SEARCH);
        const NewsInSearchArray = Array.from(NewsInSearch)
        resolve(NewsInSearchArray)
    }).catch(e => reject(e))
})

export const insertWordToSearch = (WordSearch) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(SEARCH, WordSearch);
            resolve(WordSearch)
            //console.log(recentlyRead)
        })
    }).catch(err => reject(err))
})

export const deleteAllSearch = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let deletingAll = realm.objects(SEARCH);
            realm.delete(deletingAll);
            resolve();
        })
    }).catch(e => reject(e))
})

export default new Realm(databaseOptions);