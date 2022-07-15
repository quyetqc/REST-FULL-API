import { AuthenService } from './authen.service'
import { Middleware } from './authen.middleware'
import express from 'express'

export class AuthenController {
    constructor(private readonly authoriService: AuthenService) { }
    createRouter() {
        const AutheriRouter = express.Router();
        const middleware = Middleware.authenMiddleware;
        AutheriRouter.post('/create', (req, res) => {
            this.authoriService.createUser(req.body, res)
        })
        AutheriRouter.post('/login', (req, res) => {
            this.authoriService.loginUser(req.body, res)
        })
        AutheriRouter.post('/checkrefresh', middleware, (req, res) => {
            this.authoriService.createAccessToken(req, res)
        })
        return AutheriRouter;
    }
}