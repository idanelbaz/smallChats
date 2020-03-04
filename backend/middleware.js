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
                return res.json({
                    success: false,
                    message: 'Token is not valid'
                });
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

// the validation now is symmetric , if needed - asymmetric - need to have -
//// verify a token asymmetric
// var cert = fs.readFileSync('public.pem');  // get public key
// jwt.verify(token, cert, function(err, decoded) {
//   console.log(decoded.foo) // bar
// });