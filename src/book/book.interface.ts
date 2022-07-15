import { Basic, BasicInfo } from "../common/basic.interface";

export interface CreateBook {
    ID: number,
    Name: string,
    CategoryID: number,
    AuthorID: number,
}

export interface Book extends Basic, BasicInfo { } 