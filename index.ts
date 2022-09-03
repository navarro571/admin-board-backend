import express, { Express, Request, Response } from "express";
import config from "./src/config/config";
import { errorHandlerLog, fatalErrorHandler, ormErrorHandler } from "./src/middleware/error-handler";
import router from "./src/routes";
import cors from "cors";
import "./src/utils/auth/strategies";
const app: Express = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000"
}));
app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

router(app);

app.use(errorHandlerLog);
app.use(ormErrorHandler);
app.use(fatalErrorHandler);

app.listen(config.port, () => {
    console.log(`Server running, port: ${config.port}`);
});