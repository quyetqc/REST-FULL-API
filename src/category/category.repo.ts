import { DBAPI } from "../../db";

export class CategoryRepo extends DBAPI {
    async findAllCategoryByIds(Ids: number[]) {
        try {
            const connection = await this.createConnection();
            const query = `select * from category where Id in (${Ids.toString()})`;
            const [row] = await connection.execute(query);
            return row;
        }
        catch (error) {
            throw (error)
        }
    }
}
