import { CategoryService } from "./category.service";
import express from 'express'
import { Middleware } from "../authen/authen.middleware";

export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }
    createRouter() {
        const categoryRouter = express.Router()
        const middleware = Middleware.authenMiddleware;
        categoryRouter.post('/create', middleware, (req, res) => {
            this.categoryService.createCategory(req.body, res);
        });
        categoryRouter.put('/update/:id', middleware, (req, res) => {
            this.categoryService.updateCategory(+req.params.id, req.body, res);
        });
        categoryRouter.delete('/delete/:id', middleware, (req, res) => {
            this.categoryService.deleteCategory(+req.params.id, res);
        });
        categoryRouter.get('/:id', (req, res) => {
            this.categoryService.findOneCategory(+req.params.id, res);
        });
        categoryRouter.get('/', (req, res) => {
            this.categoryService.findAllCategory(res);
        });
        return categoryRouter;
    }
}