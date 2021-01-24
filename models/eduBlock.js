const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EduBlockSchema = new Schema({
    title: String,
    image: String,
    summary: String
}) 

module.exports = mongoose.model('EduBlock', EduBlockSchema);