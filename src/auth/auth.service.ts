import { sign } from './auth.interface'
import { AuthenRepo } from './auth.repo'
import { Request, Response } from 'express'

export class AuthenService {
    constructor(private readonly authorized: AuthenRepo) { }
    async createUser(
        data: sign,
        res: Response,
    ) {
        try {
            const result = await this.authorized.sign(data);
            res.send(result);
        }
        catch (error) {
            throw (error)
        }
    }
    async loginUser(
        data: sign,
        res: Response,
    ) {
        try {
            const result = await this.authorized.login(data);
            res.send(result);
        }
        catch (error) {
            throw (error)
        }
    }
    async createAccessToken(
        req: Request,
        res: Response,
    ) {
        try {
            const result = await this.authorized.check_refreshToken(req);
            res.send(result);
        }
        catch (error) {
            throw (error)
        }
    }

}