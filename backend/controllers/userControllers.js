import asyncHandler from "../Middleware/asyncHandler.js";
import User from "../models/UserModel.js"
import bcrypt from 'bcrypt'
import generateToken from "../utils/generateToken.js";

// @desc Authenticate user and get token
// @route GET /api/users/login
// @access public


const Authuser = asyncHandler(async(request,response) => {
    const {email,password} = request.body
    const user = await User.findOne({email : email})
    const result = await bcrypt.compare(password,user.password)
    if(user && result){
        
        generateToken(response,user._id)

        response.json({
            _id : user._id,
            name : user.name,
            isAdmin : user.isAdmin,
        })
    }else{
        response.status(401)
        throw new Error('Invalid email or password')
    }

    
})


// @desc new user registration
// @route POST /api/users/
// @access public

const Registeruser = asyncHandler(async(request,response) => {
    const {name,email,password} = request.body
    console.log(request.body)
    const userExists = await User.findOne({email :email})

    if(userExists){
        response.status(400)
        throw new Error('user already exists')
    }

    const user = await User.create({
        name:name,
        email: email,
        password: bcrypt.hashSync(password,10)
        })

    if(user){
        generateToken(response,user._id)

        response.status(201).json({
            _id: user._id,
            name: user.name,
            email:user.email,
            isAdmin: user.isAdmin
        })
    }else{
        response.status(401)
        throw new Error('Invalid email or password')
    }


   
})


// @desc logging out user and clearing cookie
// @route POST /api/users/logout
// @access private

const Logoutuser = asyncHandler(async(request,response) => {
    response.cookie('jwt','',{
        httpOnly:true,
        expires: new Date(0)
    })

    response.status(200).json({message : "logged out succesfully"})
    // response.send('logout user')
})


// @desc user profile
// @route GET /api/users/profile
// @access private

const GetuserProfile = asyncHandler(async(request,response) => {
    const user = await User.findById(request.user._id)
    if(user){
        response.status(201).json({
            _id: user._id,
            name: user.name,
            email:user.email,
            isAdmin: user.isAdmin
    
        })
    }else{
        response.status(401)
        throw new Error('User not found')
    }

    
})


// @desc Authenticate user and get token
// @route PUT /api/users/profile
// @access private

const UpdateuserProfile = asyncHandler(async(request,response) => {
    // profile would be updated with JWT tokens not using /:id
    const user = await User.findById(request.user._id)

    if(user){
        user.name = request.body.name || user.name
        user.email = request.body.email || user.name

        if(request.body.password){
            user.password = bcrypt.hashSync(request.body.password,10)
        }

        const updatedUser = await user.save()

        response.status(201).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email:updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })
    }else{
        response.status(401)
        throw new Error('User not found')
    }
})


// @desc show all users to admin
// @route GET /api/users
// @access private/Admin

const getUsers = asyncHandler(async(request,response) => {
    response.send('All users by admin')
})


// @desc delete a user
// @route DELETE /api/users/:id
// @access private/Admin

const DeleteUser = asyncHandler(async(request,response) => {
    response.send('delete user by admin')
})


// @desc get a user by admin
// @route GET /api/users/:id
// @access private/Admin

const ShowUser = asyncHandler(async(request,response) => {
    response.send('get a specific user by admin')
})


// @desc update a user by admin
// @route PUT /api/users/:id
// @access private/Admin

const Updateuser = asyncHandler(async(request,response) => {
    response.send('update user by admin')
})


export {

    Authuser,
    Registeruser,
    Logoutuser,
    GetuserProfile,
    UpdateuserProfile,
    getUsers,
    DeleteUser,
    ShowUser,
    Updateuser
}
