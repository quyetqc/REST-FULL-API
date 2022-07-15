import { Request, Response } from "express-serve-static-core";
import Jwt from "jsonwebtoken";
import { DBAPI } from "../../db";

export class Middleware extends DBAPI {
    constructor() {
        super();
    }

    async authenMiddleware(req: Request, res: Response, next: any) {
        try {
            const accessTokenHeader = req.headers.accesstoken as string;
            const secretkey = process.env.SECRETKEY || '';
            const verifyToken: any = Jwt.verify(accessTokenHeader, secretkey);
            const role = verifyToken.role;
            req.body = { role };
            next()
        }
        catch (error) {
            res.status(401).send({ status: 401, message: 'Khong tim thay accessToken' });
        }
    }
    authorizedAllRole(req: Request, res: Response, next: any) {

        if (req.body.role <= 3)
            next()
        else {
            return res.send("ban khong co quyen truy cap tinh nang nay")
        }
    }
    authorizedManagerRole(req: Request, res: Response, next: any) {

        if (req.body.role === 2 || req.body.role === 3)
            next()
        else {
            return res.send("ban khong co quyen truy cap tinh nang nay")
        }
    }
    authorizedAdminRole(req: Request, res: Response, next: any) {

        if (req.body.role === 3)
            next()
        else {
            return res.send("ban khong co quyen truy cap tinh nang nay")
        }
    }
}