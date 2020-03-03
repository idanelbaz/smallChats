const socketIO = require('socket.io');
const chatService = require('../services/chatService');


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
        // socket.on('user typing', ({user}) => {
        //     socket.broadcast.emit('user isTyping', `${user} is typing...`)
        // });

        // socket.on('test users chat', members => {
        //     if (members[0] === null || members[1] === null) return;
        //     members.sort((a, b) => a.userName > b.userName ? 1 : -1)
        //     socket.join(members[0]._id + members[1]._id)
        //         // console.log('JOINING',members[0]._id + members[1]._id)
        // })
    });
}

async function addUsersToRoom(roomId, user) {
    try {
        await chatService.addUserToRoom(roomId, user);
        return await chatService.getById(roomId);
    } catch (err) {
        console.log(err)
    }
}

async function removeUserFromRoom(roomId, userId) {
    try {
        await chatService.removeUserFromRoom(roomId, userId);
        return await chatService.getById(roomId);
    } catch (err) {
        console.log(err)
    }
}

async function saveMsgs(roomId, msg) {
    try {
        await chatService.addMsgToRoom(roomId, msg);
        return await chatService.getById(roomId);
    } catch (err) {
        console.log(err)
    }
}


module.exports = {
    setup
};