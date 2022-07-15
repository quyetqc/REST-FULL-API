import { AuthorService } from './author.service'
import express from 'express'
import { Middleware } from '../authen/authen.middleware';

export class AuthorController {
    constructor(private readonly authorService: AuthorService) { }
    createRouter() {
        const authorRouter = express.Router()
        const middleware = Middleware.authenMiddleware;
        authorRouter.post('/create', middleware, (req, res) => {
            this.authorService.createAuthor(req.body, res);
        })
        authorRouter.put('/update/:id', middleware, (req, res) => {
            this.authorService.updateAuthor(+req.params.id, req.body, res);
        })
        authorRouter.delete('/delete/:id', middleware, (req, res) => {
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