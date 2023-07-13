const { badResponse, errorRespose } = require('../utils/badResponseStatus')
const { generatePlacesPrompt } = require('../openAi/prompts');
const { getChatCompletionData } = require('../openAi/openAiApi');
const { gpt_turbo_model } = require('../openAi/constants');

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

            if (error && error.response.status === 503) ChatCompletion()
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

module.exports = { getPlaces }