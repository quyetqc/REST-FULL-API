import { DBAPI } from "../../db";

export class BookRepo extends DBAPI {
    async getBookByAuthor(authorId: number) {
        try {
            const connection = await this.createConnection()
            const query = `select book.Name as bookName, category.Name as categoryName, category.ID as categoryID from book 
                 inner join category On book.CategoryID = category.ID and book.AuthorID = ${authorId} order by book.CategoryID`
            const [row] = await connection.execute(query);
            const a: any = row;
            return a;
        } catch (error) {
            throw error
        }
        // let values = [];
        // let baseQuery = `INSERT INTO book (name, categoryID, authorID) VALUES `
        // for (let i = 0; i < 200000; i++) {
        //     let r = (Math.random() + 1).toString(36).substring(7);
        //     let a: any[] = [];
        //     a.push(`"${r}"`, Math.floor(Math.random() * 100) + 1, Math.floor(Math.random() * 100) + 1)
        //     values.push(`(${a.toString()})`)
        // }
        // await connection.execute(baseQuery + `${values.toString()}`)
        // return 1;
    }
}