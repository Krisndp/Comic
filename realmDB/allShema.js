import Realm from 'realm';
export const RECENTLY_READ = "recently_read";

export const RecentlyReadSchema = {
    name: RECENTLY_READ,
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
    path: 'NewsApp1.realm',
    schema: [RecentlyReadSchema],
    schemaVersion: 0
};

export const querryAll = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        const allNewsList = realm.objects(RECENTLY_READ);
        const allNewsListArray = Array.from(allNewsList)
        //console.log(allNewsListArray);
        resolve(allNewsListArray)
    }).catch(e => reject(e))
})

export const insertRecentlyRead = (recentlyRead) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(RECENTLY_READ, recentlyRead);
            resolve(recentlyRead)
            //console.log(recentlyRead)
        })
    }).catch(err => reject(err))
})

export const deleteAll = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let deletingAll = realm.objects(RECENTLY_READ);
            realm.delete(deletingAll);
            resolve();
        })
    }).catch(e => reject(e))
})

export const updateWatchedNews = (NewsUpdate) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let updateNewsCurently = realm.objectForPrimaryKey(RECENTLY_READ, NewsUpdate.id);
            updateNewsCurently.published = NewsUpdate.published
            resolve()
        })
    }).catch(e => reject(e))
})

export const deleteNews = (NewsId) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let deleteNewsCurently = realm.objectForPrimaryKey(RECENTLY_READ, NewsId);
            realm.delete(deleteNewsCurently);
            resolve();
        })
    }).catch(e => reject(e))
})
export default new Realm(databaseOptions);