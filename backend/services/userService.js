const dbService = require('./dbService.js');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
    logIn,
    signUp,
    getById
};


async function logIn(currUser) {
    const collection = await dbService.getCollection('user');
    try {
        const user = await collection.find({ $and: [{ username: currUser.username }, { password: currUser.password }] }).toArray();
        if (user.length > 0) {
            return user
        } else throw new Error('ERROR: cannot login');
    } catch (err) {
        console.log(`ERROR: cannot login`);
        return Promise.reject('cant login')
    }
}

async function signUp(newUser) {
    const collection = await dbService.getCollection('user');
    try {
        await collection.insertOne(newUser);
        return newUser;
    } catch (err) {
        console.log(`ERROR: cannot insert user`);
        throw err;
    }
}

async function getById(userId) {
    const collection = await dbService.getCollection('user');
    try {
        return await collection.findOne({"_id": ObjectId(userId)});
    } catch (err) {
        console.log(`ERROR: cannot find chats of User ${userId}`);
        throw err;
    }
}