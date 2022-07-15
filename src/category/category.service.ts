import { CategoryRepo } from "./category.repo";
import { CreateCategory } from "./category.interface";
import { Request, Response } from 'express'

export class CategoryService {
    constructor(private readonly categoryRepo: CategoryRepo) { }
    async createCategory(
        data: CreateCategory,
        res: Response,
    ) {
        try {
            const result = await this.categoryRepo.create('category', data)
            res.send(result)
        }
        catch (error) {
            throw (error)
        }
    }
    async updateCategory(
        id: number,
        data: CreateCategory,
        res: Response,
    ) {
        try {
            const result = await this.categoryRepo.update('category', data, id)
            res.send(result)
        }
        catch (error) {
            throw (error)
        }
    }
    async deleteCategory(
        id: number,
        res: Response,
    ) {
        try {
            const result = await this.categoryRepo.delete('category', id)
            res.send(result)
        }
        catch (error) {
            throw (error)
        }
    }
    async findOneCategory(
        id: number,
        res: Response,
    ) {
        try {
            const result = await this.categoryRepo.findOne('category', id)
            res.send(result)
        }
        catch (error) {
            throw (error)
        }
    }
    async findAllCategory(
        res: Response,
    ) {
        try {
            const result = await this.categoryRepo.findAll('category')
            res.send(result)
        }
        catch (error) {
            throw (error)
        }
    }
}