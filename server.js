const express = require('express')
const {v4: uuidv4} = require('uuid');
const mongoose = require('mongoose');
const bookModel = require("./models/book.model");
const authorModel = require("./models/author.model");
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000;

//database MongoDB
const connectMongoDB = async () => {
    try {
        await mongoose.connect(`mongodb://localhost:27017/bookDatabase`);
        console.log("MongoDB is connected!");
    } catch (err) {
        console.error("Connect to mongodb server failed:", err);
        process.exit(1);
    }
}
connectMongoDB();

app.use(express.json());

//getTheWholeBook
app.get('/books/', (req, res) => {
    const bookData = new bookModel(req.body);
    console.log(bookData);
    return res.json(bookData);
})

//getSpecificBook
app.get('/books/:bookId', async (req, res) => {
    const bookId = parseInt(req.params.bookId);
    const bookData = new bookModel(req.body);
    await bookData.validate();

    const book = bookData.filter((book) => book.isbn === bookId);

    console.log(book);

    if (book.length === 0) {
        return res.sendStatus(404)
    }
    return res.json(book[0])
})

//getWholeAuthors
app.get('/authors/', async (req, res) => {
    const authorData = new authorModel(req.body);
    console.log(authorData);
    return res.json(authorData)

})

//getSpecificAuthors
app.get('/authors/:authorId', async (req, res) => {
    const authorId =  parseInt(req.params.authorId);
    const authorData = new authorModel(req.body);
    await authorData.validate();

    const author = authorData.filter((author) => author.id === authorId);
    console.log(author);

    if (author.length === 0) {
        return res.sendStatus(404)
    }
    return res.json(author[0])

})


//get_bookSchema EDIT
app.post('/books', async (req, res) => {
    const bookData = new bookModel(req.body);
    bookData.isbn = crypto.randomUUID();
    await bookData.validate();

    const bookDocument = await bookModel.create(bookData);
    res.send(bookDocument);
})

app.post('/authors', async (req, res) => {
    const authorData = new authorModel(req.body);
    await authorData.validate();

    const bookDocument = await authorModel.create(authorData);
    res.send(bookDocument);
})

//update nude
app.put('/books/:bookId', async (req, res) => {
    const bookId =  req.params.bookId;
    const updateResult = await bookModel.updateOne(
        { _id: bookId },
        req.body,
        { runValidators: true }
    );

    return res.status(200).json({
        message: "Update successfully",
        data: updateResult
    });
})

//delete nude
app.delete('/books/:bookId', async (req, res) => {
    const bookId = req.params.bookId;
    const index = await bookModel.deleteOne(
        { _id: bookId },
        req.body
    );

    return res.status(200).json({
        message: "Delete successfully",
        data: index
    });
})



app.listen(port, () => {
    console.log(`listen webserver at http://localhost:${port}`)
})