const express = require('express');
const fs = require('fs');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../api/models/user');
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');
module.exports = router;


const privateKey = fs.readFileSync('./private.key' , 'utf8');





//signup

router.post('/signup', async (req, res) => {
    const user = req.body;
    const isUserExisted = await User.findOne({email: user.email}).exec();
    if (isUserExisted) {
        res.status(409).send('user already existed');
    } else {
        const token = jwt.sign({currUser: user.email, isAdmin: user.isAdmin},
            privateKey, {algorithm: 'RS256'},
            {expiresIn: '24h'}
        );
        const newUser = new User({
            _id: new mongoose.Types.ObjectId(),
            email: user.email,
            password: encrypte(user.password),
            userChats: user.userChats,
            isAdmin: user.isAdmin
        });
        try {
            await newUser.save();
            const userToReturn = new User({
                _id: newUser._id,
                email: newUser.email,
                userChats: user.userChats,
                token: token,
                isAdmin: newUser.isAdmin
            });
            req.session.loggedinUser = userToReturn;
            await res.status(200).json(userToReturn);
        } catch (err) {
            console.log(err);
            res.status(401).send('unAuthorized');
        }
    }
});

//login

router.post('/', async (req, res) => {
    const user = req.body;
    try {
        const currUser = await User.findOne({email: user.email}).exec();
        if (currUser) {
            const isUserPassword = decrypte(user.password, currUser.password);
            if (isUserPassword) {
                const token = jwt.sign({currUser: currUser.email,_id:currUser._id, isAdmin:currUser.isAdmin},
                    privateKey, {algorithm: 'RS256'},
                    {expiresIn: '24h'}
                );
                const userToReturn = new User({
                    _id: currUser._id,
                    email: currUser.email,
                    userChats: currUser.userChats,
                    token: token,
                    isAdmin: currUser.isAdmin
                });
                req.session.loggedinUser = userToReturn;
                await res.status(200).json(userToReturn);
            } else {
                res.status(404).json('No valid entry found with the provided emali or password');
            }
        } else {
            res.status(404).json('No valid entry found with the provided email or password');
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

function encrypte(password) {
    return CryptoJS.AES.encrypt(password, 'secret key 123').toString();
}

function decrypte(userPassword, encryptedPassword) {
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, 'secret key 123');
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return userPassword === decryptedData
}

