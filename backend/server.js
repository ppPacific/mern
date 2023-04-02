
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const sheetRoutes = require('./routes/sheets')
const userRoutes = require('./routes/user')

const app = express();

//middleware, next to pass to next middleware
app.use(express.json())
app.use((req, res, next) =>{
    console.log(req.path, req.method);
    next()
})

//routes
app.use('/api/sheets',sheetRoutes)
app.use('/api/user',userRoutes)
// app.get('/', (req, res) =>{
//     res.json({mssg:'Welcome to the app!'})
// })

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{ //only listen to port after connected to db
        app.listen(process.env.PORT, ()=>{
            console.log(`connected to db & listening on PORT ${process.env.PORT}`)
        })
    })
.catch((err)=>{
    console.log(err)
})

// app.listen(process.env.PORT, ()=>{
//     console.log(`listening on PORT ${process.env.PORT}`)
// })

