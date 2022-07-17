import dotenv from "dotenv";

dotenv.config();

const data = {
    port: process.env.PORT,
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbName: process.env.DB_NAME,
    dbUser: process.env.DB_USER,
    dbPass: process.env.DB_PASS,
    jwtSecret: process.env.JWT_SECRET,
    roles: {
        ADMIN: 10,
        EMPLOYEE: 5,
        CUSTOMER: 1,
    }
};

export default  data;