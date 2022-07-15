import { sign, token } from './authen.interface';
import { DBAPI } from '../../db';
import jwt, { Secret } from 'jsonwebtoken';
import * as dotenv from 'dotenv'
import { Request, Response } from 'express'
import bcrypt from 'bcrypt';

const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

dotenv.config();

export class AuthenRepo extends DBAPI {
    async check_user(
        data: sign,
    ): Promise<{ isSuccess: boolean, password: string }> {
        const connection = await this.createConnection()
        try {
            const query = `select userName, password from user`;
            const [row]: any = await connection.execute(query)
            const result: any = row;
            for (let i = 0; i < result.length; i++) {
                if (data.userName === result[i].userName) {
                    return { isSuccess: true, password: row[i].password }
                }
            }
            return { isSuccess: false, password: '' }
        }
        catch (error) {
            throw (error)
        }
    }
    async sign(
        data: sign
    ) {
        const connection = await this.createConnection()
        try {
            const check = await this.check_user(data);
            if (check.isSuccess == false) {
                const hashPassword = bcrypt.hashSync(data.password, saltRounds);
                const query = `insert into user (userName, password) values ('${data.userName}', '${hashPassword}')`;
                const [row] = await connection.execute(query);
                return { message: 'Tao user thanh cong' }
            }
            return { message: 'Ten dang nhap bi trung, vui long doi ten khac' }
        }
        catch (error) {
            throw (error)
        }
    }
    async login(
        data: sign
    ) {
        const connection = await this.createConnection()
        try {
            const check = await this.check_user(data);
            const isPasswordValid = bcrypt.compareSync(data.password, check.password);
            if (check.isSuccess == true) {
                if (!isPasswordValid) {
                    return { message: 'Mat khau khong dung' }
                }
                const payload = {
                    "userName": data.userName
                }
                const SECRETKEY = process.env.SECRETKEY || "";
                const REFRESHKEY = process.env.REFRESHKEY || "";
                const accesstoken = jwt.sign(payload, SECRETKEY, { expiresIn: "900s" })
                const refreshtoken = jwt.sign(payload, REFRESHKEY)
                const query = `insert into refreshtoken (userName, refreshToken) values ('${data.userName}','${refreshtoken}')`
                const [row] = await connection.execute(query)
                return { message: 'Dang nhap thanh cong', token: accesstoken, refresh: refreshtoken }
            }
            return { message: 'user khong ton tai' }
        }
        catch (error) {
            throw (error)
        }
    }
    async check_refreshToken(
        req: Request,
    ) {
        const connection = await this.createConnection()
        try {
            const refreshtoken = req.headers.refreshtoken;
            const query = `select username, refreshToken from refreshtoken`;
            const [row] = await connection.execute(query);
            const result: any = row;
            const SECRETKEY = process.env.SECRETKEY || "";
            for (let i = 0; i < result.length; i++) {
                if (result[i].refreshToken == refreshtoken) {
                    const data = {
                        "name": result[i].username,
                    }
                    const accessToken = jwt.sign(data, SECRETKEY, { expiresIn: '900s' });
                    return { message: 'refreshtoken hop le', accessToken };
                }
            }
            return { message: 'refreshtoken khong hop le' }
        }
        catch (error) {
            throw (error)
        }
    }
}
