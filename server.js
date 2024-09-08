    const express =  require('express')
    const { v4: uuidv4 } = require('uuid');
    require('dotenv').config()

    const app = express()
    const port = process.env.PORT || 3000

    // This is example structure of book
    const exampleBook = {
        id: 1,
        title: "book title",
        author: "book author",
        bookId: "book-uuid-1",
        createdAt: new Date(),
        updatedAt: new Date(),
    }

    // This is list act like database for collect are books
    const bookDatabase = [
        exampleBook
    ]

    app.use(express.json());

    //send nude
    app.post('/books/', (req, res) => {
        const new_book = req.body;
        new_book.id = bookDatabase.length + 1
        new_book.bookId = uuidv4();
        new_book.created_at = Date.now();
        new_book.updatedAt = Date.now();
        bookDatabase.push(new_book);
        return res.status(200).json('{Status: Done!}');
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