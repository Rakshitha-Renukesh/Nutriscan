const processNutritionData = (data)=>{


    return {

        foodName:
        data.foodName || "Unknown",


        calories:
        data.calories || 0,


        protein:
        data.protein || 0,


        carbohydrates:
        data.carbohydrates || 0,


        fat:
        data.fat || 0,


        fiber:
        data.fiber || 0,


        sugar:
        data.sugar || 0,


        benefits:
        data.healthBenefits || []

    };


};



export default processNutritionData;