import { Pool, QueryResult } from "pg";
import config from "../config/config";
import GetUsers from "../interfaces/database/users";
import { ServiceResponse } from "../interfaces/services";
import UserData from "../interfaces/services/user";

class UserService {
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
            const res = await client.query('SELECT * FROM users');
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
            const res = await client.query('SELECT * FROM users WHERE id = $1', [id]);
            return res;
        } catch (e) {
            throw e;
        } finally {
            client.release();
        }
    }
    
    async create(data: UserData): Promise<ServiceResponse> {
        const client = await this.pool.connect()
        try {
            const res = await client.query(`INSERT INTO "users" ("name", "lastname", "email", "role") 
            VALUES ($1, $2, $3, $4)
            RETURNING id;`, [ data.name, data.lastname, data.email, data.role ]);
            return  {
                id: res.rows[0].id,
                success: true,
            };
        } catch (e) {
            throw e;
        } finally {
            client.release();
        }
    }

    async update(data: UserData): Promise<QueryResult<any>> {
        const client = await this.pool.connect()
        try {
            const res = await client.query(`UPDATE users
            SET name = $1, lastname = $2, role = $3
            WHERE email = $4;`, 
            [data.name, data.lastname, data.role, data.email]);
            return res;
        } catch (e) {
            throw e;
        } finally {
            client.release();
        }
    }
    
    async delete(id: Number): Promise<any> {
        const client = await this.pool.connect()
        try {
            await client.query(`DELETE FROM users
            WHERE id = $1;`, 
            [id]);
            return {
                user: id,
                removed: true
            };
        } catch (e) {
            throw e;
        } finally {
            client.release();
        }
    }
}

export default UserService;