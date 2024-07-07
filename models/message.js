const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const Schema = mongoose.Schema;


const MessageSchema = new Schema({
    title: {type: String, required: true, minLength: 1, maxLength: 50},
    content: {type: String, required: true, minLength: 1, maxLength: 300 },
    user: {type: String, required: true},
    date: {type: Date, required: true}
});

MessageSchema.virtual("date_formatted").get(function() {
    //use luxon to format date
    luxonDate = DateTime.fromJSDate(this.date);
    return luxonDate.toFormat('yyyy-MM-dd');
});

MessageSchema.virtual("url").get(function() {
    return `delete/${this._id}`;
});

module.exports = mongoose.model("Message", MessageSchema);