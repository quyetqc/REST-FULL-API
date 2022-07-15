import { AuthorService } from './author.service'
import express from 'express'
import { Middleware } from '../auth/auth.middleware';

export class AuthorController {
    constructor(private readonly authorService: AuthorService, private readonly middleware: Middleware) { }
    createRouter() {
        const authorRouter = express.Router()
        authorRouter.post('/create', this.middleware.authenMiddleware, this.middleware.authorizedAllRole, (req, res) => {
            this.authorService.createAuthor(req.body, res);
        })
        authorRouter.put('/update/:id', this.middleware.authenMiddleware, this.middleware.authorizedManagerRole, (req, res) => {
            this.authorService.updateAuthor(+req.params.id, req.body, res);
        })
        authorRouter.delete('/delete/:id', this.middleware.authenMiddleware, this.middleware.authorizedAdminRole, (req, res) => {
            this.authorService.deleteAuthor(+req.params.id, res);
        })
        authorRouter.get('/:id', (req, res) => {
            this.authorService.findOneAuthor(+req.params.id, res);
        })
        authorRouter.get('/', (req, res) => {
            this.authorService.findAllAuthor(res)
        })
        return authorRouter;
    }
}