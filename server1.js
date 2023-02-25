import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import 'express-async-errors';

import connectDB from './db/connect.js';

import authRouter from './routes/authRoutes.js';
import jobRouter from './routes/jobRoutes.js';

import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

dotenv.config()

const app = express();

app.use(express.json())
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', jobRouter);
app.get('/', (req, res) => {
    res.json({msg: "Welcome!"});
})

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);





const PORT = process.env.PORT || 4000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(PORT, () => console.log(`started server ${PORT}`))
    } catch (error) {
        console.log(error);
        process.once('SIGUSR2', function () {
            process.kill(process.pid, 'SIGUSR2');
          });
          
          process.on('SIGINT', function () {
            // this is only called on ctrl+c, not restart
            process.kill(process.pid, 'SIGINT');
          });
    }
}



start();
console.log('Server running');