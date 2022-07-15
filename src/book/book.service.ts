import { BookRepo } from "./book.repo";
import { Response } from 'express';
import { CreateBook } from "./book.interface";
import { CategoryService } from "../category/category.service";

export class BookService {

    constructor(private readonly bookRepo: BookRepo) { }
    async createBook(
        data: CreateBook,
        res: Response
    ) {
        try {
            const result = await this.bookRepo.create('book', data);
            res.send(result);
        }
        catch (error) {
            throw (error)
        }
    }
    async updateBook(
        id: number,
        data: CreateBook,
        res: Response,
    ) {
        try {
            const result = await this.bookRepo.update('book', data, id);
            res.send(result);
        }
        catch (error) {
            throw (error)
        }
    }
    async deleteBook(
        id: number,
        res: Response,
    ) {
        try {
            const result = await this.bookRepo.delete('book', id);
            res.send(result);
        }
        catch (error) {
            throw (error)
        }
    }
    async findOneBook(
        id: number,
        res: Response,
    ) {
        try {
            const result = await this.bookRepo.findOne('book', id);
            res.send(result);
        }
        catch (error) {
            throw (error);
        }
    }
    async findAllBook(
        res: Response,
    ) {
        try {
            const result = await this.bookRepo.findAll('book');
            res.send(result);
        }
        catch (error) {
            throw (error);
        }
    }

    async findBookByAuthor(
        authorId: number,
        res: Response
    ) {
        try {
            const result = await this.bookRepo.getBookByAuthor(authorId)
            const resultResponse = result.reduce(function (r: any, a: any) {
                r[a["categoryName"]] = r[a["categoryName"]] || [];
                r[a["categoryName"]].push(a);
                return r;
            }, Object.create(null));
            res.send(resultResponse)
            // res.send({})
        }
        catch (error) {
            throw (error)
        }
    }
}