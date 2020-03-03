const dbService = require('./dbService.js');
const ObjectId = require('mongodb').ObjectId;


module.exports = {
    queryDefault,
    getById,
    removeUserFromRoom,
    add,
    addUserToRoom,
    addMsgToRoom,
    getAllUserChats
};

async function queryDefault() {
    const collection = await dbService.getCollection('chat');
    try {
        return await collection.find({"owner": "admin"}).toArray()
    } catch (err) {
        console.log('ERROR: cannot find Items');
        throw err;
    }
}

async function getById(roomId) {
    const collection = await dbService.getCollection('chat');
    const room_id = new ObjectId(roomId);
    try {
        return await collection.findOne({_id: room_id});
    } catch (err) {
        console.log(`ERROR: cannot find chats of User ${roomId}`);
        throw err;
    }
}


async function removeUserFromRoom(roomId, userId) {
    const collection = await dbService.getCollection('chat');
    const room_id = new ObjectId(roomId);
    try {
        await collection.updateOne({_id: room_id}, {$pull: {usersInRoom: {"_id": userId}}})
    } catch (err) {
        console.log(`ERROR: cannot remove user from room ${roomId}`);
        throw err;
    }
}


async function addUserToRoom(roomId, user) {
    const collection = await dbService.getCollection('chat');
    try {
        const room_id = new ObjectId(roomId);
        await collection.updateOne({_id: room_id}, {$push: {usersInRoom: user}});
    } catch (err) {
        console.log(`ERROR: cannot add user to room`);
        throw err;
    }
}

async function addMsgToRoom(roomId, msg) {
    const collection = await dbService.getCollection('chat');
    try {
        const room_id = new ObjectId(roomId);
        await collection.updateOne({_id: room_id}, {$push: {msgs: msg}});
    } catch (err) {
        console.log(`ERROR: cannot add msg to room`);
        throw err;
    }
}

async function getAllUserChats(userId) {
    const collection = await dbService.getCollection('chat');
    try {
        return await collection.find({"owner": userId}).toArray()
    } catch (err) {
        console.log(`ERROR: cannot add msg to room`);
        throw err;
    }
}

async function add(chat) {
    const collection = await dbService.getCollection('chat');
    try {
        await collection.insertOne(chat);
        return await collection.find({"owner": chat.owner}).toArray()
    } catch (err) {
        console.log(`ERROR: cannot insert chat`);
        throw err;
    }
}
