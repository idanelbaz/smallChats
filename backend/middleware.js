let jwt = require('jsonwebtoken');
const config = require('./config.js');



const checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }

    if (token) {
        jwt.verify(token, config.publicKey, (err, decoded) => {
            if (err) {
                return res.status(403).json('Not a valid token');
            } else {
                // add the decoded to the req , the decoded is the object i putted in the token on creation
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
};

module.exports = {
    checkToken
};
