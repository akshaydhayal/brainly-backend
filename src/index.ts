import express from "express";
import dotenv from "dotenv";
const app = express();
dotenv.config();

//routes
//api/v1/user/signup
//api/v1/user/signin
//api/v1/user/contents  all contents fetch

//api/v1/content  add
//api/v1/content  delete
//api/v1/share/brain/134256  share brains

app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`);
})