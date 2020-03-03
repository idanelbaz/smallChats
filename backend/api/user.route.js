const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../api/models/user');
module.exports = router;


//signup

router.post('/signup', async (req, res) => {
    const user = req.body;
    const newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        username: user.username,
        password: user.password,
        userChats: user.userChats
    });
    try {
        await newUser.save();
        req.session.loggedinUser = newUser;
        await res.status(200).json(newUser);
    } catch (err) {
        console.log(err);
        res.status(401).send('unAuthorized');
    }
});

//login

router.post('/', async (req, res) => {
    const user = req.body;
    try {
        const currUser = await User.findOne({username: user.username, password: user.password}).exec();
        if (currUser) {
            req.session.loggedinUser = currUser;
            await res.status(200).json(currUser);
        } else {
            res.status(404).json('No valid entry found with the provided username or password');
        }
    } catch (err) {
        console.log('cant login in route', err);
        res.status(401).send();
    }
});

// get user by id

router.get('/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId).exec();
        if (user) {
            await res.status(200).json(user);
        } else {
            res.status(404).json('No valid entry found with the provided Id');
        }
    } catch (err) {
        res.status(500).json(err);
    }
});


//logout

router.post('/logout', (req, res) => {
    req.session.destroy();
    res.end()
});