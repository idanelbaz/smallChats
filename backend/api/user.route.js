const userService = require('../services/userService.js');
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

//login

router.post('/',async (req, res) => {
    const user = req.body;
    try {
        const currUser = await userService.logIn(user);
        req.session.loggedinUser = currUser[0];
        await res.json(currUser[0]);
    } catch(err) {
        console.log('cant login in route');
        res.status(401).send();
    }
});

//signup

router.post('/signup', async (req, res) => {
    const user = req.body;
    try {
        const userWithId = await userService.signUp(user);
        req.session.loggedinUser = userWithId;
        await res.json(userWithId)
    } catch {
        res.status(401).send('Not Authorized')
    }
});

// get user by id

router.get('/:id', async (req, res) => {
    const userId = req.params.id;
    const user = await userService.getById(userId);
    try {
        await res.json(user)
    } catch {
        res.status(404).send('UNKNOWN item')
    }
});


//logout

router.post('/logout', (req, res) => {
    req.session.destroy();
    res.end()
});