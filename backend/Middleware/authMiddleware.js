import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/UserModel.js";

// protect routes

const protect = asyncHandler(async(req,res,next) => {
    let token;
    token = req.cookies.jwt   //variable name of cookie was jwt

    if(token){
        try {
            const decode = jwt.verify(token,process.env.JWT_SECRET)
            req.user= await User.findById(decode.userId).select('-password')  //obejct without password field
            next()
        } catch (error) {
            res.status(401)
        throw new Error('Not authorised, token not same')
        }
    }else{
        res.status(401)
        throw new Error('Not authorised')
    }
})


// admin middleware

const admin = (request,response,next) => {
    if(request.user && request.user.isAdmin){
        next()
    }else{
        response.status(401)
        throw new Error("Not an Admin")
    }
}




export {protect,admin} 