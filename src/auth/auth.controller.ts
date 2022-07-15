import { AuthenService } from './auth.service'
import { Middleware } from './auth.middleware'
import express from 'express'

export class AuthenController {
    constructor(private readonly authoriService: AuthenService, private readonly middleware: Middleware) { }
    createRouter() {
        const AutheriRouter = express.Router();
        AutheriRouter.post('/create', (req, res) => {
            this.authoriService.createUser(req.body, res)
        })
        AutheriRouter.post('/login', (req, res) => {
            this.authoriService.loginUser(req.body, res)
        })
        AutheriRouter.post('/checkrefresh', this.middleware.authenMiddleware, (req, res) => {
            this.authoriService.createAccessToken(req, res)
        })
        return AutheriRouter;
    }
}

