import asyncHandler from "express-async-handler";
import cloudinary from "../config/cloudinary.js";

import FoodAnalysis from "../models/FoodAnalysis.js";
import History from "../models/History.js";

import analyzeFoodImage from "../services/aiService.js";


// @desc    Analyze food image
// @route   POST /api/food/analyze
// @access  Private

export const analyzeFood = asyncHandler(async (req, res) => {


    if(!req.file){

        res.status(400);

        throw new Error(
            "Please upload food image"
        );

    }



    // Convert image to Base64

    const imageBase64 =
        req.file.buffer.toString(
            "base64"
        );



    // Upload image to Cloudinary

    const uploadResult =
        await new Promise(
            (resolve, reject)=>{


                cloudinary.uploader
                .upload_stream(

                    {
                        folder:
                        "nutriscan-food"
                    },

                    (error,result)=>{


                        if(error){

                            reject(error);

                        }

                        else{

                            resolve(result);

                        }


                    }

                )
                .end(req.file.buffer);


            }
        );



    // AI Food Analysis

    const aiResult =
        await analyzeFoodImage(
            imageBase64
        );



    let nutritionData;


    try{

        nutritionData =
            JSON.parse(
                aiResult
            );

    }

    catch(error){


        nutritionData = {

            foodName:
            "Unknown Food",

            calories:0,

            protein:0,

            carbohydrates:0,

            fat:0,

            fiber:0,

            aiResponse:
            aiResult

        };


    }




    const foodAnalysis =
        await FoodAnalysis.create({


            user:
            req.user._id,


            foodName:
            nutritionData.foodName,


            imageUrl:
            uploadResult.secure_url,


            calories:
            nutritionData.calories,


            protein:
            nutritionData.protein,


            carbohydrates:
            nutritionData.carbohydrates,


            fat:
            nutritionData.fat,


            fiber:
            nutritionData.fiber,


            sugar:
            nutritionData.sugar,


            confidence:
            nutritionData.confidence,


            aiResponse:
            nutritionData

        });



    await History.create({

        user:
        req.user._id,


        analysis:
        foodAnalysis._id

    });



    res.status(201).json({

        success:true,


        message:
        "Food analysis completed",


        result:
        foodAnalysis

    });



});