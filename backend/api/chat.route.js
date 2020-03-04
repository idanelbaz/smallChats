const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Chat = require('../api/models/chat');
const middleware = require('../middleware');
module.exports = router;


//get all chats
router.get('/',middleware.checkToken,async (req, res) => {
    try {
        const chats = await Chat.find().exec();
        await res.status(200).json(chats)
    } catch {
        res.status(500).send('Unable to load items');
    }
});


// get chat by id

router.get('/:id', async (req, res) => {
    const chatId = req.params.id;
    try {
        const chat = await Chat.findById(chatId).exec();
        if (chat) {
            await res.status(200).json(chat);
        } else {
            res.status(404).json('No valid entry found with the provided Id');
        }
    } catch (err) {
        res.status(500).json(err);
    }
});


// chat Add

router.post('/addChat',middleware.checkToken,async (req, res) => {
    //req.decoded  - can identify if user is admin or not and do actions for it.
    const chat = req.body.chat;
    const newChat = new Chat({
        _id: new mongoose.Types.ObjectId(),
        title: chat.title,
        backgroundColor: chat.backgroundColor,
        invited: chat.invited,
        msgs: chat.msgs,
        usersInRoom: chat.usersInRoom,
        owner: chat.owner
    });
    try {
        await newChat.save();
        await res.status(200).json(newChat);
    } catch (err) {
        console.log(err);
        res.status(401).send('unAuthorized');
    }
});


