const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    backgroundColor: {
        type: String,
        required: true
    },
    invited: {
        type: Array,
        required: true
    },
    msgs: {
        type: Array,
        required: true
    },
    usersInRoom: {
        type: Array,
        required: true
    },
    owner: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Chat', chatSchema);