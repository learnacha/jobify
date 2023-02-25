import {StatusCodes } from 'http-status-codes';

import User from '../models/User.js';
import {BadRequestError} from '../errors/index.js';


const register = async (req, res, next) => {
    console.log(req.body)
    const {name, email, password} = req.body;

    if (!name || !email || !password) {
        throw new BadRequestError('All fields name/email/password are mandatory')
    }
    const userAlreadyExists = await User.findOne({email});

    if (userAlreadyExists) {
        throw new BadRequestError('Email already exists, try with new email id');
    }

    const user = await User.create({name, email, password});
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({user: {
        email: user.email,
        name: user.name,
        lastName: user.lastName,
        location: user.location,
    }, token})
}

const login = (req, res) => {
    res.send('login user')
}

const updateUser = (req, res) => {
    res.send('updateUser user')
}

export {register, login, updateUser}