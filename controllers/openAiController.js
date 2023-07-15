const { badResponse, errorRespose } = require('../utils/badResponseStatus')
const { generatePlacesPrompt, generateItineraryPromt } = require('../openAi/prompts');
const { getChatCompletionData } = require('../openAi/openAiApi');
const { gpt_turbo_model } = require('../openAi/constants');
const { authHeaders } = require('../configs/openai');
const { default: axios } = require('axios');

const getPlaces = async (req, res) => {
    const { country, state, days } = req.body;
    if (!country || !state || !days) return badResponse(res, false, "Country, state and days all of 3 should passed with the req body!")

    const prompt = generatePlacesPrompt(days, country, state)

    const exampleMessage = [
        {
            role: 'system',
            content: 'Act as a travel places data generator',
        },
        {
            role: 'user',
            content: prompt,
        }
    ]

    try {

        async function ChatCompletion() {
            const { choices, error } = await getChatCompletionData(exampleMessage, gpt_turbo_model)

            
            if (error && error.response && error.response.status && error.response.status === 503) ChatCompletion()

            else if (error) {
                return errorRespose(res, false, error)
            }
            // console.log("------------------", error.response.status, error);

            else {
                try {
                    const { data } = JSON.parse(choices[0].message.content)
                    res.status(200).json({ status: true, data, message: "Here are all places" })
                } catch (error) {
                    return errorRespose(res, false, error)
                }
            }

        }

        ChatCompletion()

    } catch (error) {
        return errorRespose(res, false, error)
    }

}

const getItinerary = async (req, res) => {
    const { country, state, startDate, endDate, days, place } = req.body;
    if (!startDate || !endDate || !country || !state || !place) return badResponse(res, false, "Country, state, startDate, endDate and place all of 3 should passed with the req body!")

    const prompt = generateItineraryPromt(startDate, endDate, days, country, state, place)

    const exampleMessage = [
        {
            role: 'system',
            content: 'Act as a travel itinerary detail generator',
        },
        {
            role: 'user',
            content: prompt,
        }
    ]

    try {

        async function ChatCompletion() {
            const { choices, error } = await getChatCompletionData(exampleMessage, gpt_turbo_model)

            // console.log("-------------", error.response.data);
            
            if (error && error.response && error.response.status && error.response.status === 503) ChatCompletion()
            // console.log("------------------", error.response.status, error);
            
            else if (error) {
                return errorRespose(res, false, error)
            }

            else {
                try {
                    // console.log(choices);

                    const parsedData = JSON.parse(choices[0].message?.content)

                    // console.log(parsedData);
                    let data;

                    if (!Array.isArray(parsedData)) {
                        let { itinerary } = parsedData;
                        data = itinerary
                    }
                    else data = parsedData

                    // console.log(data);

                    res.status(200).json({ status: true, data, message: "Here are all places" })
                } catch (error) {
                    return errorRespose(res, false, error)
                }
            }

        }

        ChatCompletion()

    } catch (error) {
        return errorRespose(res, false, error)
    }

}

module.exports = { getPlaces, getItinerary }