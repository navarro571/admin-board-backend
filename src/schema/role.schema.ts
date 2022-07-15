import joi from "joi";

const name = joi.string().min(1);
const authorizationLevel = joi.number();

const createRole = joi.object({
    name: name.required(),
    authorizationLevel: authorizationLevel.required()
});

const updateRole = joi.object({
    name,
    authorizationLevel,
});

export {
    createRole,
    updateRole
}