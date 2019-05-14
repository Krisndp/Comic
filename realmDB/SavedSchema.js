import Realm from 'realm';
export const SAVED = "Saved";

export const SavedNews = {
    name: SAVED,
    primaryKey: 'id',
    properties: {
        id: 'int',
        title: 'string',
        links: 'string',
        subtitle: 'string',
        illustration: 'string',
        cm: 'string'
    }
}

const databaseOptions = {
    path: 'NewsAppSaved1.realm',
    schema: [SavedNews],
    schemaVersion: 0
};

export const querryAllSaved = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        const NewsInSaved = realm.objects(SAVED);
        const NewsInSavedArray = Array.from(NewsInSaved)
        //console.log(allNewsListArray);
        resolve(NewsInSavedArray)
    }).catch(e => reject(e))
})

export const insertNewsToSaved = (NewsSaved) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(SAVED, NewsSaved);
            resolve(NewsSaved)
            //console.log(recentlyRead)
        })
    }).catch(err => reject(err))
})

export const deleteAllSaved = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let deletingAll = realm.objects(SAVED);
            realm.delete(deletingAll);
            resolve();
        })
    }).catch(e => reject(e))
})

export const deleteNewsSaved = (NewsId) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let deleteNewsCurently = realm.objectForPrimaryKey(SAVED, NewsId);
            realm.delete(deleteNewsCurently);
            resolve();
        })
    }).catch(e => reject(e))
})
export default new Realm(databaseOptions);