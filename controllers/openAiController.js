const { badResponse, errorRespose } = require('../utils/badResponseStatus')
const { generatePlacesPrompt, generateItineraryPromt } = require('../openAi/prompts');
const { getChatCompletionData } = require('../openAi/openAiApi');
const { gpt_turbo_model, gpt_turbo_model_16k } = require('../openAi/models');

const getPlaces = async (req, res) => {
    const { country, state, days } = req.body;
    if (!country || !days) return badResponse(res, false, "Country, state and days all of 3 should passed with the req body!")

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
                    let { data } = JSON.parse(choices[0].message.content)

                    //  removing duplicate places names from the places Array/data
                    data = data.filter((item, i) => {
                        if ((i <= data.length - 1) && data.slice(i + 1).indexOf(item) < 0) return item
                    });

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
    if (!startDate || !endDate || !country || !place) return badResponse(res, false, "Country, startDate, endDate and place all of 3 should passed with the req body!")

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
            const { choices, error } = await getChatCompletionData(exampleMessage, gpt_turbo_model_16k)

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

                    res.status(200).json({ status: true, data, message: `Your itinerary is ready` })
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