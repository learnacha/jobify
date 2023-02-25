import mongoose from "mongoose";
import validator from 'validator';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'Please provide username'],
        minlength: 3,
        maxlength: 20,
        trim: true
    },
    email: {
        type: String, 
        required: [true, 'Please provide email'],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide a valid email',
        },
        unique: true
    },
    password: {
        type: String, 
        required: [true, 'Please provide password'],
        minlength: 6,
    },
    lastName: {
        type: String, 
        maxlength: 20,
        trim: true,
        default: 'Acha'
    },
    location: {
        type: String, 
        maxlength: 40,
        trim: true,
        default: 'UAE'
    },
})

UserSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log(this.password)
})

UserSchema.methods.createJWT = function() {
    return jwt.sign({userId: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME
    })
}

export default mongoose.model('User', UserSchema);