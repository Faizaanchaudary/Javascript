const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URL ='mongodb://localhost:27017';

app.get("/", (req,res) => {
    res.send("hi , i am live");
});


const start = async () => {
    try {
        await mongoose.connect(MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('connected to mongoose db');



        app.listen(PORT, () => {
           console.log( `${PORT} Yes i am connected`);
        });
    } catch (error) {
        console.log('error connecting to mongo db',error);
    }
};

start();