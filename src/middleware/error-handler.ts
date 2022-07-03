import { ReqError } from "../interfaces/handlers";
import { NextFunction, Request, Response } from "express";



function errorHandlerLog(err: ReqError, req: Request, res: Response, next: NextFunction) {
    console.log(err);
    next(err);
}

function ormErrorHandler(err: ReqError, req: Request, res: Response, next: NextFunction) {
    if(err.isBoom) {
        const { output } = err;
        res.status(output.statusCode).json(output.payload);
    }
    next(err);
}

function fatalErrorHandler(err: ReqError, req: Request, res: Response, next: NextFunction) {
    const STATUS_CODE = 500;

    res.status(STATUS_CODE).json({
        statusCode: STATUS_CODE,
        error: {
            name: err.name,
            message: err.message
        }
    });
    next(err);
}

export { 
    errorHandlerLog,
    ormErrorHandler,
    fatalErrorHandler
}