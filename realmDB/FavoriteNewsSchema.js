import Realm from 'realm';
export const FAVORITE_NEWS = "favorite_news";

export const FavoriteNews = {
    name: FAVORITE_NEWS,
    primaryKey: 'id',
    properties: {
        id: 'int',
        nameTopic: 'string',
        links: 'string',
    }
}

const databaseOptions = {
    path: 'FavoriteNews.realm',
    schema: [FavoriteNews],
    schemaVersion: 0
};

export const querryAllFavorite = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        const NewsInFavorite = realm.objects(FAVORITE_NEWS);
        const NewsInFavoriteArray = Array.from(NewsInFavorite)
        resolve(NewsInFavoriteArray)
    }).catch(e => reject(e))
})

export const insertNewsToFavorite = (NewsFavorite) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(FAVORITE_NEWS, NewsFavorite);
            resolve(NewsFavorite)
        })
    }).catch(err => reject(err))
})

export const deleteAllFavorite = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let deletingAll = realm.objects(FAVORITE_NEWS);
            realm.delete(deletingAll);
            resolve();
        })
    }).catch(e => reject(e))
})

export const deleteNewsFavorite = (NewsId) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let deleteNewsCurently = realm.objectForPrimaryKey(FAVORITE_NEWS, NewsId);
            realm.delete(deleteNewsCurently);
            resolve();
        })
    }).catch(e => reject(e))
})
export default new Realm(databaseOptions);