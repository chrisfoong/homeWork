    const express =  require('express')
    const { v4: uuidv4 } = require('uuid');
    const mongoose = require('mongoose');
    const bookModel = require("./models/book.model");
    require('dotenv').config()

    const app = express()
    const port = process.env.PORT || 3000

    //database MongoDB
    try {
        await mongoose.connect(`mongodb://localhost:${port}/bookDatabase`, {
            useNewUrlParser: true
        });
    } catch (err) {
        console.error("Connect to mongodb server failed:", err);
        process.exit(1);
    }

    app.use(express.json());

    //send nude
    app.post('/books/', async (req, res) => {
        const bookData = new bookModel(req.body);
        await bookData.validate();

        const bookDocument = await bookModel.create(bookData);
        res.send(bookDocument);
    })

    //update nude
    app.put('/books/', (req, res) => {
        const updateBook = req.body;
        let indexBook = bookDatabase.findIndex(books => books.id === updateBook.id);

        bookDatabase[indexBook] = updateBook;


        return res.status(200).json('{Status: Updated!}');
    })

    //delete nude
    app.delete('/books/:bookId', (req, res) => {
        const id = parseInt(req.params.bookId)
        const index = bookDatabase.findIndex(books => books.id === id);
        bookDatabase.splice(index, 1);

        return  res.status(200).json('{Status: Deleted!}');
    })

    app.get('/books/', (req, res) => {
        console.log(bookDatabase);
        return res.json(bookDatabase)
    })

    // Create CRUD
    app.get('/books/:bookId', (req, res) => {
        const bookId = parseInt(req.params.bookId)

        const book = bookDatabase.filter((book) => book.id === bookId);

        console.log(book);

        if (book.length === 0) {
            return res.sendStatus(404)
        }
        return res.json(book[0])
    })


    app.listen(port, () => {
        console.log(`listen webserver at http://localhost:${port}`)
    })