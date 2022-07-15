import { BookService } from "./book.service";
import express from 'express';
import { Middleware } from "../authen/authen.middleware";

export class BookController {
    constructor(private readonly bookService: BookService) { }
    createRouter() {
        const bookRouter = express.Router();
        const middleware = Middleware.authenMiddleware;
        bookRouter.post('/create', middleware, (req, res) => {
            this.bookService.createBook(req.body, res);
        });
        bookRouter.put('/update/:id', middleware, (req, res) => {
            this.bookService.updateBook(+req.params.id, req.body, res);
        });
        bookRouter.delete('/delete/:id', middleware, (req, res) => {
            this.bookService.deleteBook(+req.params.id, res);
        });
        bookRouter.get('/book-by-author?', (req, res) => {
            const authorId = req.query.authorId ? +req.query.authorId : 0;
            this.bookService.findBookByAuthor(authorId, res);
        });
        bookRouter.get('/:id', (req, res) => {
            this.bookService.findOneBook(+req.params.id, res);
        });
        bookRouter.get('/', (req, res) => {
            this.bookService.findAllBook(res);
        });
        return bookRouter;
    }
}