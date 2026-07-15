import asyncHandler from "express-async-handler";

import FoodAnalysis from "../models/FoodAnalysis.js";


// @desc    Get dashboard analytics
// @route   GET /api/dashboard
// @access  Private

export const getDashboardData = asyncHandler(async(req,res)=>{


    const userId = req.user._id;



    const totalFoods =
        await FoodAnalysis.countDocuments({

            user:userId

        });



    const nutritionSummary =
        await FoodAnalysis.aggregate([

            {
                $match:{

                    user:userId

                }

            },


            {

                $group:{

                    _id:null,


                    totalCalories:{

                        $sum:"$calories"

                    },


                    totalProtein:{

                        $sum:"$protein"

                    },


                    totalCarbs:{

                        $sum:"$carbohydrates"

                    },


                    totalFat:{

                        $sum:"$fat"

                    },


                    totalFiber:{

                        $sum:"$fiber"

                    }

                }

            }

        ]);



    const weeklyData =
        await FoodAnalysis.aggregate([


            {

                $match:{

                    user:userId,


                    createdAt:{

                        $gte:

                        new Date(
                            Date.now()
                            -
                            7*24*60*60*1000
                        )

                    }

                }

            },


            {

                $group:{


                    _id:{

                        day:{

                            $dayOfWeek:
                            "$createdAt"

                        }

                    },


                    calories:{

                        $sum:
                        "$calories"

                    },


                    protein:{

                        $sum:
                        "$protein"

                    }

                }

            },


            {

                $sort:{

                    "_id.day":1

                }

            }


        ]);



    const recentFoods =
        await FoodAnalysis.find({

            user:userId

        })

        .sort({

            createdAt:-1

        })

        .limit(5);



    res.status(200).json({

        success:true,


        dashboard:{


            totalFoods,


            nutrition:

            nutritionSummary[0]
            ||
            {

                totalCalories:0,

                totalProtein:0,

                totalCarbs:0,

                totalFat:0,

                totalFiber:0

            },


            weeklyData,


            recentFoods


        }

    });



});