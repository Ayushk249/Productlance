import express from "express";
import { protect,admin } from "../Middleware/authMiddleware.js";
import {
     Authuser,
    Registeruser,
    Logoutuser,
    GetuserProfile,
    UpdateuserProfile,
    getUsers,
    DeleteUser,
    ShowUser,
    Updateuser
} from "../controllers/userControllers.js";

const router =express.Router()


// File would link with /api/products
router.route('/').post(Registeruser).get(protect,admin,getUsers)

router.post('/logout',Logoutuser)
router.post('/login',Authuser)

// profile has get and put
router.route('/profile').get(protect,GetuserProfile).put(protect,UpdateuserProfile)
router.route('/:id').delete(protect,admin,DeleteUser).get(protect,admin,ShowUser).put(protect,admin,Updateuser)




export default router