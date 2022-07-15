import { Basic, BasicInfo } from "../common/basic.interface";

export interface CreateCategory {
    ID: number,
    Name: string,
}

export interface Category extends Basic, BasicInfo { }
