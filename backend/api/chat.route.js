const chatService = require('../services/chatService');
const express = require('express');
const router = express.Router();

module.exports = router;


// if need auth - use this
function requireAuth(req, res, next) {
    // const user = req.session.loggedinUser
    // if (!user) return res.status(401).send('Unauthenticated');
    next();
}

function requireAdmin(req, res, next) {
    // const user = req.session.loggedinUser
    // if (!user) return res.status(401).send('Unauthenticated');
    // if (user.isAdmin===false) return res.status(403).send('UnPrivileged');
    next();
}


//get all default chats List
router.get('/default', async (req, res) => {
    try {
        const chats = await chatService.queryDefault();
        await res.json(chats)
    } catch {
        res.status(404).send('Unable to load items')
    }
});


// get chat by id

router.get('/:id', async (req, res) => {
    const chatId = req.params.id;
    const chat = await chatService.getById(chatId);
    try {
        await res.json(chat)
    } catch {
        res.status(404).send('UNKNOWN item')
    }
});

router.get('/userchats/:id', async (req, res) => {
    const userId = req.params.id;
    const chats = await chatService.getAllUserChats(userId);
    try {
        await res.json(chats)
    } catch {
        res.status(404).send('UNKNOWN item')
    }
});


// chat Add

router.post('/addChat', requireAuth, async (req, res) => {
    const chat = req.body.chat;
    try {
        const userChats = await chatService.add(chat);
        await res.json(userChats);
    } catch {
        res.status(500).send('Could Not Add')
    }
});


