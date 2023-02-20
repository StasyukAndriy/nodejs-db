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
app.use('/api',protect,router)
app.post('/user', createUser)
app.post('/login', loginUser)
app.listen(3000)
app.get("/", (req,res)=>{
    res.json({messege:'hello'})
});
app.use((err,req,res,next)=>{
    
    switch(err.type){
        case('input'):
            res.status(400)
            res.json({ message: "bad inpuit" });
            break;
        case('auth'):
            res.status(401);
            res.json({ message: "auth" });
            break;
        default:
            res.json({ message: "defAULT" });
           
    }
})
export default app;