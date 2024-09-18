const mongoose =  require('mongoose');

// Book mongodb structure
const bookSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true, unique: true },
    isbn: { type: String, required: true }, // book isbn id
}, {
    timestamps: true,
});


module.exports = mongoose.model('book',bookSchema);