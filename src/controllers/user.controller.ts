import express, { Request, Response } from "express";
import {z} from "zod";
import bcrypt from "bcrypt";
import { UserModel } from "../models/db";
import jwt from "jsonwebtoken";

const userBodySchema=z.object({
    name:z.string(),
    email:z.string().email(),
    password:z.string().min(5).max(50)
})

// export async function userSignup(req:Request,res:Response){
//     res.json({msg:"Hello user signup"});
// }
export async function userSignup(req:Request,res:Response){
    try{
        const parsedResponse=userBodySchema.safeParse(req.body);
        if(!parsedResponse.success){
            res.status(403).json({err:parsedResponse.error});
        }
        const {name,email,password}=req.body;
        const hashedPassword=await bcrypt.hash(password,10);
        const user=new UserModel({name,email,password:hashedPassword});
        await user.save();
        return res.status(201).json({msg:"User created"});
    }catch(e){
        return res.status(501).json({msg:"Internal Server error!!"});
    }
}

const userSigninSchema=z.object({
    email:z.string().email(),
    password:z.string().min(5).max(50)
});


export async function userSignin(req:Request,res:Response){
    try{
        const parsedResponse=userSigninSchema.safeParse(req.body);
        if(!parsedResponse.success){
            return res.status(403).json({msg:parsedResponse.error});
        }
        const {email,password}=req.body;
        const user=await UserModel.findOne({email});
        if(!user || !user.password || typeof user.password!='string'){
            return res.status(401).json({msg:"User doesn't exist!!"});
        }
        const isPasswordMatched=await bcrypt.compare(password,user.password);
        if(!isPasswordMatched){
            return res.status(403).json({msg:"Wrong Password entered!!"});
        }
        if(!process.env.JWT_PASSWORD){
            return res.status(401).json({msg:"JWT secret key not found!!"});
        }
        let token=jwt.sign({id:user._id},process.env.JWT_PASSWORD);
        res.status(200).json({msg:"User signin success!!",token});
    }catch(e){
        res.status(501).json({msg:"Internal Server error!!"});
    }
}
export const getAllContents=async(req:Request,res:Response)=>{
    try{
        const userId=req.headers.userId;
        const user=await UserModel.findById(userId);
        if(!user){
            return res.status(404).json({msg:"User not found"});
        }
        res.status(200).json({contents:user.contents});
    }catch(e){
        res.status(501).json({msg:"Internal Server error!!"});
    }
}