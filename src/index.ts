import express from 'express';
import router from './router';
import morgan from 'morgan';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { protect } from './modules/auth';
import { createUser, loginUser } from './handlers/user';
dotenv.config()
const app = express();
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
// app.use('/', (req,res)=>{
//     res.write('hello')
//      res.end()
// })
app.use('/api',protect,router)
app.post('/user', createUser)
app.post('/login', loginUser)
app.listen(3000)