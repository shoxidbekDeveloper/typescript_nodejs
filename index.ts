import express, { Application } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import UserRouter from './routes/user'

// for env file
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/public', express.static('public'))
app.use("/api/user", UserRouter)

mongoose.connect(process.env.MONGO_URI!).then(() => {
    console.log('connected Db');
    app.listen(PORT, () => console.log(`Run server on port:${PORT}`))

}).catch((error) => {
    console.log(error?.message);

})




