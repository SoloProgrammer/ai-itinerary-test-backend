const express = require('express');
const app = express()
const cors = require('cors');

const openAiRoutes = require('./routes/openAiRoutes')

const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(cors())

app.use('/api/ai/', openAiRoutes)

app.get('/', (req, res) => {
    res.send(`Server is running on PORT ${PORT}..... <a href="http://localhost:3000">Click here</a> to visit FrontEnd`)
})

app.listen(PORT, (err) => {
    if (err) throw new Error("Some Error happens:", err.message)
    console.log("Server is running...")
})
