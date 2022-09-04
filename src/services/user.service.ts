import { Pool, QueryResult } from "pg";
import config from "../config/config";
import bcrypt from "bcrypt";
import boom from "@hapi/boom";
import { ServiceResponse } from "../interfaces/services";
import UserData from "../interfaces/services/user";
import jwt from "jsonwebtoken";

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
    const client = await this.pool.connect();
    try {
      const res = await client.query("SELECT * FROM users");
      return res;
    } finally {
      client.release();
    }
  }

  async tryLogin(username: String, password: String) {
    const client = await this.pool.connect();
    try {
      const res = await client.query("SELECT * FROM users WHERE email = $1", [
        username,
      ]);
      if (res.rows.length) {
        const user = res.rows[0];
        const authorized = await bcrypt.compare(
          <string>password,
          user.password
        );
        if (!authorized) {
          throw boom.unauthorized();
        }
        const roleResponse = await client.query(
          "SELECT * FROM roles WHERE id = $1",
          [user.role]
        );
        const role = roleResponse.rows[0];
        delete role.id;
        return jwt.sign(
          {
            sub: user.id,
            role: role,
          },
          <string>config.jwtSecret,
          { expiresIn: "30min" }
        );
      } else {
        throw boom.unauthorized();
      }
    } finally {
      client.release();
    }
  }

  async find(id: Number): Promise<QueryResult<any>> {
    const client = await this.pool.connect();
    try {
      const res = await client.query("SELECT * FROM users WHERE id = $1", [id]);
      const user = res.rows[0];
      if (!user) {
        throw boom.notFound(`User with the id ${id} not found`);
      }
      const roleResponse = await client.query(
        "SELECT * FROM roles WHERE id = $1",
        [user.role]
      );
      const role = roleResponse.rows[0];
      delete role.id;
      user.role = role;
      return user;
    } finally {
      client.release();
    }
  }

  async create(data: UserData): Promise<ServiceResponse> {
    const client = await this.pool.connect();
    try {
      data.password = await bcrypt.hash(<string>data.password, 10);
      const res = await client.query(
        `INSERT INTO "users" ("name", "lastname", "email", "password", "role")
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id;`,
        [data.name, data.lastname, data.email, data.password, data.role || 1]
      );
      return {
        id: res.rows[0].id,
        success: true,
      };
    } finally {
      client.release();
    }
  }

  async update(data: UserData): Promise<QueryResult<any>> {
    const client = await this.pool.connect();
    try {
      const res = await client.query(
        `UPDATE users
            SET name = $1, lastname = $2, role = $3
            WHERE email = $4;`,
        [data.name, data.lastname, data.role, data.email]
      );
      return res;
    } finally {
      client.release();
    }
  }

  async delete(id: Number): Promise<any> {
    const client = await this.pool.connect();
    try {
      const res = await client.query(
        `DELETE FROM users
            WHERE id = $1;`,
        [id]
      );
      if (res.rowCount > 0) {
        return {
          user: id,
          removed: true,
        };
      } else {
        throw boom.notFound(`Role with the id ${id} not found`);
      }
    } finally {
      client.release();
    }
  }
}

export default UserService;
