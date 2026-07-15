import asyncHandler from "express-async-handler";

import History from "../models/History.js";
import FoodAnalysis from "../models/FoodAnalysis.js";


// @desc    Get all food analysis history
// @route   GET /api/history
// @access  Private

export const getHistory = asyncHandler(async(req,res)=>{


    const history =
        await History.find({
            user:req.user._id
        })
        .populate(
            "analysis"
        )
        .sort({
            createdAt:-1
        });



    res.status(200).json({

        success:true,

        count:history.length,

        history

    });


});




// @desc    Get single analysis details
// @route   GET /api/history/:id
// @access  Private

export const getSingleHistory =
asyncHandler(async(req,res)=>{


    const analysis =
        await FoodAnalysis.findOne({

            _id:req.params.id,

            user:req.user._id

        });



    if(!analysis){

        res.status(404);

        throw new Error(
            "Analysis not found"
        );

    }



    res.status(200).json({

        success:true,

        analysis

    });



});




// @desc    Delete history item
// @route   DELETE /api/history/:id
// @access  Private

export const deleteHistory =
asyncHandler(async(req,res)=>{


    const history =
        await History.findOne({

            _id:req.params.id,

            user:req.user._id

        });



    if(!history){

        res.status(404);

        throw new Error(
            "History not found"
        );

    }



    await FoodAnalysis.findByIdAndDelete(
        history.analysis
    );


    await history.deleteOne();



    res.status(200).json({

        success:true,

        message:
        "History deleted successfully"

    });


});