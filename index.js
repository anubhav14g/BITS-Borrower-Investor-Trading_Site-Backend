require('dotenv').config();
const PORT = process.env.PORT || 5000;

const express=require('express');
const app=express();

const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));

// MongoDB Service
const mongodbService = require('./app/services/mongodb.service');
mongodbService.connect(); // Connect to MongoDB


app.get('/',(req,res)=>{
	try{
        return res.status(200).json({
            "status": "true",
            "message": "Welcome to the Borrower & Investor Trading Site (BITS)",
        });
    }
    catch(err){
        return res.status(400).json({
            "status": "false",
            "message": "Oops!!, Some error occurred",
            "error": err
        });
    }
});


//Import Routes
app.use('/api',require('./app/routers/auth.router'),require('./app/routers/investor_tip.router'),require('./app/routers/business_equity.router'),require('./app/routers/investor.router'));


app.listen(`${PORT}`, function() {
	console.log(`Server started on port ${PORT}`);
});