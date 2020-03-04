const socketIO = require('socket.io');
const mongoose = require('mongoose');
const Chat = require('../api/models/chat');
const User = require('../api/models/user');


let io;
let activeUsersCount = 0;


function setup(http) {
    io = socketIO(http);
    io.on('connection', function (socket) {
        console.log('a user connected');
        activeUsersCount++;

        socket.on('disconnect', () => {
            console.log('user disconnected');
            activeUsersCount--;
        });

        socket.on('logout from room', async (roomId, user) => {
            socket.leave(roomId);
            const updatedRoom = await removeUserFromRoom(roomId, user._id);
            socket.to(roomId).emit('user left', updatedRoom);
        });

        socket.on('user join room', async (roomId, user) => {
            const updatedRoom = await addUsersToRoom(roomId, user);
            socket.join(roomId);
            io.in(roomId).emit('user joined', updatedRoom);
        });

        socket.on('chat msg', async (msg, user, roomId) => {
            const updatedRoom = await saveMsgs(roomId, msg);
            io.in(roomId).emit('got msg', updatedRoom)
        });
    });
}

async function addUsersToRoom(roomId, user) {
    try {
        await Chat.updateOne({_id: roomId}, {$push: {usersInRoom: {_id: user._id, email: user.email}}}).exec();
        const chat = await Chat.findById(roomId).exec();
        if (chat) {
            return chat;
        } else {
            return null;
        }
    } catch (err) {
        console.log(err)
    }
}

async function removeUserFromRoom(roomId, userId) {
    try {
        await Chat.updateOne({_id: roomId}, {$pull: {usersInRoom: {_id: userId}}}).exec();
        const chat = await Chat.findById(roomId).exec();
        if (chat) {
            return chat;
        } else {
            return null;
        }
    } catch (err) {
        console.log(err)
    }
}

async function saveMsgs(roomId, msg) {
    try {
        await Chat.updateOne({_id: roomId}, {$push: {msgs: msg}}).exec();
        const chat = await Chat.findById(roomId).exec();
        if (chat) {
            return chat;
        } else {
            return null;
        }
    } catch (err) {
        console.log(err)
    }
}


module.exports = {
    setup
};