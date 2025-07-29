const mongoose = require('mongoose')
mongoose.connect(`${process.env.MONGO_URI}`)
    .then(() => {
        console.log(`connected to DB `)
    })
    .catch((error) => {
        console.log(error.message)
    })


