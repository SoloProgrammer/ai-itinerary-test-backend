const { configuration, authHeaders } = require("../configs/openai");
const { OpenAIApi } = require('openai')
const axios = require('axios')

const getChatCompletionData = async (messages, model) => {
    try {
        // const openai = new OpenAIApi(configuration);

        // const completion = await openai.createChatCompletion({ model, messages });

        // console.log("----",completion);

        // return { choices: completion.data.choices, error: false };

        const { data: completion } = await axios.post("https://api.openai.com/v1/chat/completions",
            {
                model,
                max_tokens: 2048,
                temperature: 0.7,
                messages,
            },
            {
                headers: authHeaders()
            });

        return { choices: completion.choices, error: false }


    } catch (error) {
        return { error }
    }
}

module.exports = { getChatCompletionData }