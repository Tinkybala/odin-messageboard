const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: {type: String, required: true, minLength: 1, maxLength: 25},
    last_name: {type: String, required: true, minLength: 1, maxLength: 25},
    username: {type: String, required: true, minLength: 1, maxLength: 25},
    password: {type: String, required: true, minLength: 1},
    status: {type: String, enum: ["VIP", "Standard"], default: "Standard"},
    is_admin: {type: Boolean, require: false, default: false}
})

module.exports = mongoose.model("User", UserSchema);