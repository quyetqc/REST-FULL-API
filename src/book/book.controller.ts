import { BookService } from "./book.service";
import express from 'express';
import { Middleware } from "../auth/auth.middleware";

export class BookController {
    constructor(private readonly bookService: BookService, private readonly middleware: Middleware) { }
    createRouter() {
        const bookRouter = express.Router();
        bookRouter.post('/create', this.middleware.authenMiddleware, this.middleware.authorizedAllRole, (req, res) => {
            this.bookService.createBook(req.body, res);
        });
        bookRouter.put('/update/:id', this.middleware.authenMiddleware, this.middleware.authorizedManagerRole, (req, res) => {
            this.bookService.updateBook(+req.params.id, req.body, res);
        });
        bookRouter.delete('/delete/:id', this.middleware.authenMiddleware, this.middleware.authorizedAdminRole, (req, res) => {
            this.bookService.deleteBook(+req.params.id, res);
        });
        bookRouter.get('/book-by-author?', this.middleware.authenMiddleware, this.middleware.authorizedAllRole, (req, res) => {
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