const Joi = require('joi');

    const newUser = {
        username: Joi.string().min(3).required(),
        first_name: Joi.string().min(3).required(),
        last_name: Joi.string().min(3).required(),
        password: Joi.string().min(3).required(),
        gender: Joi.required(),
        status: Joi.required(),
    };

    const customSearchVal = {
        id: Joi.number().min(1).required(),
        name: Joi.string().allow(''),
        gender: Joi.string(),
    };
const updateUserVal = {
    username: Joi.string().min(3).required(),
    first_name: Joi.string().min(3).required(),
    last_name: Joi.string().min(3).required(),
    password: Joi.string().min(3).required(),
    gender: Joi.required(),
    status: Joi.required(),
    id: Joi.number()
};

module.exports = {newUser, customSearchVal, updateUserVal};
