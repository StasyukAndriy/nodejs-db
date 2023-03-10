import prisma from "../../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";
export const createUser = async (req,res,next)=>{
   try{
      const user = await prisma.user.create({
         data:{
            username: req.body.username,
            password: await hashPassword(req.body.password)
         }
       })
        const token = createJWT(user)
        res.json({token})
   } catch(e){
      e.type = 'input'
      next(e)
   }
   

}

export const loginUser = async (req,res) =>{
      const user = await prisma.user.findUnique({
         where: {
            username: req.body.username
         }
      })
      if(user){
         const isValidPassword = await comparePasswords(req.body.password, user.password)
         if(!isValidPassword){
            res.status(401);
            res.send("Not access");
         } else{
            const token = createJWT(user);
            res.json({ token });
         }
      } else{
            res.status(401);
            res.send("Not access");
      }
      

       

}