import { CategoryService } from "./category.service";
import express from 'express'
import { Middleware } from "../auth/auth.middleware";

export class CategoryController {
    constructor(private readonly categoryService: CategoryService, private readonly middleware: Middleware) { }
    createRouter() {
        const categoryRouter = express.Router()
        categoryRouter.post('/create', this.middleware.authenMiddleware, this.middleware.authorizedAllRole, (req, res) => {
            this.categoryService.createCategory(req.body, res);
        });
        categoryRouter.put('/update/:id', this.middleware.authenMiddleware, this.middleware.authorizedManagerRole, (req, res) => {
            this.categoryService.updateCategory(+req.params.id, req.body, res);
        });
        categoryRouter.delete('/delete/:id', this.middleware.authenMiddleware, this.middleware.authorizedAdminRole, (req, res) => {
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