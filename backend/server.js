const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
require('dotenv').config()
require('./dbconfiguration/dbconfig')
const userrouter = require('./router/userrouter')



const corsOptions = {
    origin: [
        'http://localhost:3000', // स्थानीय विकास के लिए
        'https://e-nagarpalika-frontend.onrender.com' // आपके डिप्लॉयड फ्रंटएंड का URL
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // यदि आप कुकीज़ या ऑथराइजेशन हेडर भेज रहे हैं
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));


app.use('/user', userrouter)
app.listen(process.env.PORT, () => {
    console.log(`server is running on PORT ${process.env.PORT}`)
})