import express from "express";
import { addContent, deleteContent } from "../controllers/content.controller";
import { userAuth } from "../middleware/userAuth";

const router=express.Router();

//@ts-ignore
router.post("/add",userAuth, addContent);
//@ts-ignore
router.delete("/:contentId",userAuth,deleteContent);

export default router;