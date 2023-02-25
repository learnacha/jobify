import mongoose, { mongo } from "mongoose";

mongoose.set('strictQuery', true);
const connectDB = (url) => {
    return mongoose.connect(url)
}

export default connectDB;