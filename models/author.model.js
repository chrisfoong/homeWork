const mongoose = require('mongoose');

//author mongodb structure
const authorSchema = new mongoose.Schema({
    first_name : { type: String, required: true },
    last_name : { type: String, required: true },
    address : { type: String, required: true },
    email : { type: String, required: true },
    id: { type: String, required: true }
}, {
    timestamps: true
});

module.exports =  mongoose.model('author',authorSchema);