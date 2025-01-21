import { Request, Response } from "express";
import {z} from "zod";
import { ContentModel, UserModel } from "../models/db";

const contentBodySchema=z.object({
    title:z.string().min(5).max(200),
    type: z.enum(["tweet","youtube","document","link"]),
    link:z.string().url(),
    tags:z.array(z.string())
})

export async function addContent(req:Request,res:Response){
    try{
        const parsedResponse=contentBodySchema.safeParse(req.body);
        if(!parsedResponse.success){
            return res.status(403).json({msg:parsedResponse.error});
        }
        const {title,type,link,tags}=parsedResponse.data;
        const userId=req.headers.userId;
        const user=await UserModel.findById(userId);
        if(!user){
            return res.status(404).json({msg:"User not found"});
        }
        // user.contents.push()
        const content=new ContentModel({title,type,link,tags});
        await content.save();
        user.contents.push(content._id);
        await user.save();

        res.status(201).json({msg:"Content created!!"});
    }catch(e){
        res.status(501).json({msg:"Internal server error!!"});
    }
}

export const deleteContent=async(req:Request,res:Response)=>{
    try{
        const contentId=req.params.contentId;
        const content=await ContentModel.findById(contentId);
        if(!content){
            return res.status(404).json({msg:"Content not found!!"});
        }
        const userId=req.headers.userId;
        const user=await UserModel.findById(userId);
        if(!user){
            return res.status(404).json({msg:"User not found!!"});
        }
        //@ts-ignore
        const contentExist=user.contents.find(c=>c==contentId);
        if(!contentExist){
            return res.status(404).json({msg:"Yu are not authorised to delete this content"});
        }
        await ContentModel.deleteOne({_id:contentId});
        //@ts-ignore
        const updatedContents=user.contents.filter(c=>c._id!=contentId);
        //@ts-ignore
        user.contents=updatedContents;
        await user.save();
        res.status(200).json({msg:"Content deleted!!"});
    }catch(e){
        res.status(501).json({msg:"Internal server error!!"});
    }
}