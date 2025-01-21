import express from "express";
import { getAllContents, userSignin, userSignup } from "../controllers/user.controller";
import { userAuth } from "../middleware/userAuth";

const router=express.Router();

//@ts-ignore
router.post("/signup",userSignup);
//@ts-ignore
router.post("/signin",userSignin);
//@ts-ignore
router.get("/contents",userAuth,getAllContents)
export default router;