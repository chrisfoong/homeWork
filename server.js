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
        new_book.createdAt = new Date();
        new_book.updatedAt = new Date()
        bookDatabase.push(new_book);
        return res.status(200).json('{Status: Done!}');
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
        let id = req.params.id;
        let indexBook = bookDatabase.findIndex(books => books.id === id);


        delete bookDatabase[indexBook];
        //bookDatabase[indexBook] = [indexBook].splice(indexBook);

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