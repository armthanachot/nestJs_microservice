import * as joi from "joi"

const CREATE_USER = joi.object({
    fname: joi.string().required(),
    lname: joi.string().required(),
    username: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required()
}
)

export {
    CREATE_USER
}