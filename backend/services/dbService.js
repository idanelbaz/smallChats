const MongoClient = require('mongodb').MongoClient;

module.exports = {
    connect,
    getCollection
};


const url = 'mongodb+srv://idanel:saribeni12@cluster0-cquxv.mongodb.net/test?retryWrites=true&w=majority';


// Database Name
const dbName = 'newReactProjChats';

let dbConn = null;

async function connect() {
    if (dbConn) return dbConn;
    try {
        const client = await MongoClient.connect(url, {useNewUrlParser: true});
        const db = client.db(dbName);


        dbConn = db;
        return db;
    } catch (err) {
        console.log('Cannot Connect to DB', err);
        throw err;
    }
}

async function getCollection(collectionName) {
    const db = await connect();
    return db.collection(collectionName)
}