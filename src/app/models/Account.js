const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Account = new Schema({
    username: { type: String, trim: true, required: true, unique: true },
    password: { type: String, trim: true, required: true, minlength: 8 },
    name: { type: String },
    phone_number: { type: String },
    avatar: { type: String },
    role: { type: String, default: 'manager' }
},
    {
        timestamps: true
    }
)
module.exports = mongoose.model('Account', Account);