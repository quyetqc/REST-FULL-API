import express from 'express';
import * as dotenv from 'dotenv'
import * as bodyParser from "body-parser";

import { AuthorController } from './src/author/author.controller'
import { AuthorService } from './src/author/author.service'
import { AuthorRepo } from './src/author/author.repo'

import { BookController } from './src/book/book.controller'
import { BookService } from './src/book/book.service'
import { BookRepo } from './src/book/book.repo'

import { CategoryController } from './src/category/category.controller'
import { CategoryService } from './src/category/category.service'
import { CategoryRepo } from './src/category/category.repo'

import { AuthenController } from './src/auth/auth.controller'
import { AuthenService } from './src/auth/auth.service'
import { AuthenRepo } from './src/auth/auth.repo'

import { Middleware } from './src/auth/auth.middleware'

dotenv.config();
const app = express();

app.use(bodyParser.json());

const port = process.env.PORT || 3500;

const authorRepo = new AuthorRepo();
const authorService = new AuthorService(authorRepo);

const categoryRepo = new CategoryRepo();
const categoryService = new CategoryService(categoryRepo);

const bookRepo = new BookRepo();
const bookService = new BookService(bookRepo);

const authenRepo = new AuthenRepo();
const authenService = new AuthenService(authenRepo);

const middleware = new Middleware()

app.use('/author', new AuthorController(authorService, middleware).createRouter());
app.use('/book', new BookController(bookService, middleware).createRouter());
app.use('/category', new CategoryController(categoryService, middleware).createRouter());
app.use('/user', new AuthenController(authenService, middleware).createRouter());

app.listen(port, () => {
    console.log(`Nodejs sever started running on: ${port}`)
})
