import {StatusCodes } from 'http-status-codes';

import User from '../models/User.js';
import {BadRequestError, UnauthenticatedError} from '../errors/index.js';


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
    }, location: user.location, token})
}

const login = async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        throw new BadRequestError('Kindly provide email and password to login')
    }
    const user = await User.findOne({email}).select('+password');

    if (!user) {
        throw new UnauthenticatedError('Invalid credentials')
    }
    const isPasswordCorrect = await user.comparePassword(password);
    
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid credentials')
    }

    const token = user.createJWT();
    user.password = undefined;
    res.status(StatusCodes.CREATED).json({user, token, location: user.location});
}

const updateUser = (req, res) => {
    res.send('updateUser user')
}

export {register, login, updateUser}