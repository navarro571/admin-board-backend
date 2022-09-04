import joi from "joi";

const name = joi.string().min(1);
const lastname = joi.string().min(1);
const email = joi.string().min(1);
const password = joi.string().min(1);
const role = joi.number();

const createUser = joi.object({
    name: name.required(),
    lastname: lastname.required(),
    email: email.required(),
    password: password.required(),
    role: role
});

const updateUser = joi.object({
    name,
    lastname,
    email,
    role
});

export {
    createUser,
    updateUser
}