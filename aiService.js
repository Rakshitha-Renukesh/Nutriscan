import { GoogleGenerativeAI } from "@google/generative-ai";



const genAI =
    new GoogleGenerativeAI(
        process.env.GEMINI_API_KEY
    );



const analyzeFoodImage = async(imageBase64)=>{


    try{


        const model =
            genAI.getGenerativeModel({

                model:
                "gemini-1.5-flash"

            });



        const prompt = `

        Analyze this food image.

        Identify:

        1. Food name

        2. Estimated quantity

        3. Calories

        4. Protein grams

        5. Carbohydrates grams

        6. Fat grams

        7. Fiber grams

        8. Health benefits

        Return only JSON format.

        `;



        const result =
            await model.generateContent([

                prompt,

                {

                    inlineData:{

                        data:imageBase64,

                        mimeType:
                        "image/jpeg"

                    }

                }

            ]);



        const response =
            result.response.text();



        return response;



    }

    catch(error){

        console.log(
            "AI Error:",
            error.message
        );


        throw new Error(
            "Food analysis failed"
        );

    }


};



export default analyzeFoodImage;