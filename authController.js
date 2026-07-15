import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";

import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";


// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {

    const {
        name,
        email,
        password
    } = req.body;


    const userExists = await User.findOne({ email });


    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }


    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(
        password,
        salt
    );


    const user = await User.create({

        name,

        email,

        password: hashedPassword

    });


    if (user) {

        res.status(201).json({

            success: true,

            message: "Registration successful",

            user: {

                id: user._id,

                name: user.name,

                email: user.email

            },

            token: generateToken(user._id)

        });

    }

    else {

        res.status(400);

        throw new Error("Invalid user data");

    }

});



// @desc    Login user
// @route   POST /api/auth/login
// @access  Public

export const loginUser = asyncHandler(async (req, res) => {


    const {
        email,
        password
    } = req.body;



    const user = await User.findOne({
        email
    });



    if (
        user &&
        await bcrypt.compare(
            password,
            user.password
        )
    ) {


        res.status(200).json({

            success: true,

            message: "Login successful",

            user: {

                id: user._id,

                name: user.name,

                email: user.email,

                profileImage: user.profileImage

            },


            token: generateToken(user._id)

        });


    }

    else {

        res.status(401);

        throw new Error(
            "Invalid email or password"
        );

    }


});



// @desc    Get logged-in user profile
// @route   GET /api/auth/profile
// @access  Private

export const getProfile = asyncHandler(async (req, res) => {


    const user = await User.findById(
        req.user._id
    ).select("-password");


    if(user){

        res.status(200).json({

            success:true,

            user

        });

    }

    else{

        res.status(404);

        throw new Error(
            "User not found"
        );

    }


});



// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private

export const updateProfile = asyncHandler(async(req,res)=>{


    const user = await User.findById(
        req.user._id
    );


    if(user){


        user.name =
            req.body.name || user.name;


        user.age =
            req.body.age || user.age;


        user.gender =
            req.body.gender || user.gender;


        user.height =
            req.body.height || user.height;


        user.weight =
            req.body.weight || user.weight;


        user.activityLevel =
            req.body.activityLevel ||
            user.activityLevel;


        user.goal =
            req.body.goal ||
            user.goal;



        const updatedUser =
            await user.save();



        res.status(200).json({

            success:true,

            message:"Profile updated",

            user:{

                id:updatedUser._id,

                name:updatedUser.name,

                email:updatedUser.email,

                age:updatedUser.age,

                gender:updatedUser.gender,

                height:updatedUser.height,

                weight:updatedUser.weight,

                goal:updatedUser.goal

            }

        });


    }

    else{

        res.status(404);

        throw new Error(
            "User not found"
        );

    }


});



// @desc Change Password
// @route PUT /api/auth/change-password
// @access Private

export const changePassword = asyncHandler(
async(req,res)=>{


    const {
        oldPassword,
        newPassword
    } = req.body;



    const user =
        await User.findById(
            req.user._id
        );



    const isMatch =
        await bcrypt.compare(
            oldPassword,
            user.password
        );



    if(!isMatch){

        res.status(400);

        throw new Error(
            "Old password incorrect"
        );

    }



    const salt =
        await bcrypt.genSalt(10);


    user.password =
        await bcrypt.hash(
            newPassword,
            salt
        );



    await user.save();



    res.status(200).json({

        success:true,

        message:
        "Password changed successfully"

    });


});



// @desc Logout user
// @route POST /api/auth/logout
// @access Private

export const logoutUser =
asyncHandler(async(req,res)=>{


    res.status(200).json({

        success:true,

        message:
        "Logged out successfully"

    });


});