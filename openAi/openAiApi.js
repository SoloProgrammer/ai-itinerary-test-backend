const { authHeaders } = require("../configs/openai");
const axios = require('axios')

const getChatCompletionData = async (messages, model) => {
    try {

        const { data: completion } = await axios.post("https://api.openai.com/v1/chat/completions",
            {
                model,
                temperature: 0.6,
                messages,
            },
            {
                headers: authHeaders()
            });

        // console.log("----",completion.choices);

        return { choices: completion.choices, error: false }

    } catch (error) {
        // console.log(error);
        return { error }
    }
}


module.exports = { getChatCompletionData }