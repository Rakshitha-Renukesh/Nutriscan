import asyncHandler from "express-async-handler";

import User from "../models/User.js";


// @desc    Get user details
// @route   GET /api/user/profile
// @access  Private

export const getUserDetails = asyncHandler(async (req, res) => {

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



// @desc    Update user details
// @route   PUT /api/user/profile
// @access  Private

export const updateUserDetails = asyncHandler(async(req,res)=>{


    const user =
        await User.findById(
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


        user.profileImage =
            req.body.profileImage ||
            user.profileImage;



        const updatedUser =
            await user.save();



        res.status(200).json({

            success:true,

            message:
            "User updated successfully",


            user:{

                id:updatedUser._id,

                name:updatedUser.name,

                email:updatedUser.email,

                age:updatedUser.age,

                gender:updatedUser.gender,

                height:updatedUser.height,

                weight:updatedUser.weight,

                activityLevel:
                updatedUser.activityLevel,

                goal:
                updatedUser.goal,

                profileImage:
                updatedUser.profileImage

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



// @desc    Delete account
// @route   DELETE /api/user/delete
// @access  Private

export const deleteAccount =
asyncHandler(async(req,res)=>{


    const user =
        await User.findById(
            req.user._id
        );


    if(user){


        await user.deleteOne();



        res.status(200).json({

            success:true,

            message:
            "Account deleted successfully"

        });


    }

    else{


        res.status(404);

        throw new Error(
            "User not found"
        );

    }


});