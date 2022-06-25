import express, { Express, Request, Response } from "express";
import config from "./src/config/config";
import router from "./src/routes";

const app: Express = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

router(app);


app.listen(config.port, () => {
    console.log(`Server running, port: ${config.port}`);
});