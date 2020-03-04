const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email',
            isAsync: false
        }
    },
    password: {
        type: String,
        required: true
    },
    userChats: {
        type: [],
        required: true
    },
    token: {
        type: String
    },
    isAdmin: Boolean
});


module.exports = mongoose.model('User', userSchema);