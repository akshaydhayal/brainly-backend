import { NextFunction, Request,Response } from "express";
import jwt from "jsonwebtoken";

export function userAuth(req:Request,res:Response,next:NextFunction){
    const token=req.headers.token;
    if(!token || typeof token!='string'){
        return res.status(401).json({message:"Invalid JWT Token"});
    }
    if(!process.env.JWT_PASSWORD){
        return res.status(401).json({message:"No JWT_SECRTE KEY"});
    }
    const decodedToken=jwt.verify(token,process.env.JWT_PASSWORD);
    if(decodedToken && typeof decodedToken!='string'){
        req.headers.userId=decodedToken?.id;
        // req.userId=decodedToken.id;
        next();
    }else{
        return res.status(401).json({message:"userAuth Failed!!"});
    }
}