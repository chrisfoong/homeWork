const mongoose =  require('mongoose');

// Book mongodb structure
const bookSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true, unique: true },
    isbn: { type: String, required: true }, // book isbn id
}, {
    timestamps: true,
});

const authorSchema = new mongoose.Schema({
    first_name : { type: String, required: true },
    last_name : { type: String, required: true },
    address : { type: String, required: true },
    email : { type: String, required: true },
}, {
    timestamps: true
});

export default mongoose.model(bookSchema, authorSchema);