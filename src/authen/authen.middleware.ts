import { Request, Response } from "express-serve-static-core";
import Jwt from "jsonwebtoken";

export class Middleware {
    static authenMiddleware = (req: Request, res: Response, next: any) => {
        try {
            const accessTokenHeader = req.headers.accesstoken as string;
            if (!accessTokenHeader) return res.status(401).send({ status: 401, message: 'Khong tim thay accessToken' })
            const secretkey = process.env.SECRETKEY || '';
            const verifyToken = Jwt.verify(accessTokenHeader, secretkey)
            next();
        }
        catch (error) {
            res.status(401).send({ status: 401, message: 'Khong tim thay accessToken' });
        }
    }
}