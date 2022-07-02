import { Pool, QueryResult } from "pg";
import config from "../config/config";
import GetUsers from "../interfaces/database/users";
import { ServiceResponse } from "../interfaces/services";
import RoleData from "../interfaces/services/role";

class RoleService {
    pool: Pool;
    constructor() {
        this.pool = new Pool({
            user: config.dbUser,
            host: config.dbHost,
            database: config.dbName,
            password: config.dbPass,
            port: +(<string>config.dbPort),
        });
    }

    async get(): Promise<QueryResult<any>> {
        const client = await this.pool.connect()
        try {
            const res = await client.query('SELECT * FROM roles');
            return res;
        } catch (e) {
            throw e;
        } finally {
            client.release();
        }
    }

    async find(id: Number): Promise<QueryResult<any>> {
        const client = await this.pool.connect()
        try {
            const res = await client.query('SELECT * FROM roles WHERE id = $1', [id]);
            return res;
        } catch (e) {
            throw e;
        } finally {
            client.release();
        }
    }
    
    async create(data: RoleData): Promise<ServiceResponse> {
        const client = await this.pool.connect()
        try {
            const res = await client.query(`INSERT INTO "roles" ("name") 
            VALUES ($1)
            RETURNING id;`, [ data.name]);
            return  {
                id: res.rows[0],
                success: true,
            };
        } catch (e) {
            throw e;
        } finally {
            client.release();
        }
    }

    async update(data: RoleData): Promise<QueryResult<any>> {
        const client = await this.pool.connect()
        try {
            const res = await client.query(`UPDATE roles
            SET name = $1
            WHERE id = $2;`, 
            [data.name, data.id]);
            return res;
        } catch (e) {
            throw e;
        } finally {
            client.release();
        }
    }
    
    async delete(id: Number): Promise<QueryResult<any>> {
        const client = await this.pool.connect()
        try {
            const res = await client.query(`DELETE FROM roles
            WHERE id = $1;`, 
            [id]);
            return res;
        } catch (e) {
            throw e;
        } finally {
            client.release();
        }
    }
}

export default RoleService;