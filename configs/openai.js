const { Configuration } = require('openai')

require('dotenv').config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const authHeaders = () => {
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    }
}

module.exports = { configuration, authHeaders }