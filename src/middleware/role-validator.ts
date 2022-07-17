import boom from "@hapi/boom";
import { NextFunction, Request, Response } from "express";

function requireLevel(requireLevel: Number) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const { role } = <any>req.user;
            if(role.authorization_level >= requireLevel) {
                next();
            } else {
                throw boom.unauthorized();
            }
        } catch (error) {
            next(error);
        }
    }
}

export default requireLevel;