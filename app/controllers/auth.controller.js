const bcrypt = require('bcryptjs');
const jwtService = require('../services/jwt.service');
const User= require('../models/user.model');

exports.register = async (req, res) => {
    
    if(!req.body.name || !req.body.email || !req.body.type || !req.body.pin || !req.body.phone_no){
        return res.status(200).json({
            "status": "false",
            "message": "All fields are required"
        });
    }

    if(req.body.phone_no.length!=10){
        return res.status(200).json({
            "status": "false",
            "message": "Incorrect input, Phone no must be of 10 digits"
        });
    }

    if(req.body.pin.length!=7){
        return res.status(200).json({
            "status": "false",
            "message": "Incorrect input, Pin must be of 7 digits"
        });
    }

    try{
        const found= await User.findOne({"email": req.body.email});
        if(found){
            return res.status(200).json({
                "status": "false",
                "message": "User already registered",
            });
        }
        const hashedPassword = await bcrypt.hash(req.body.pin,7);
        const obj ={
            "name": req.body.name,
            "email": req.body.email,
            "phone_no": Number(req.body.phone_no),
            "pin": hashedPassword,
            "type": req.body.type
        }
        const new_user= await User.create(obj);
        return res.status(200).json({
            "status": "true",
            "message": "User registered successfully, plz login",
            "data": new_user
        });
    }
    catch(err){
        return res.status(400).json({
            "status": "false",
            "message": "Oops!!, Some error occurred",
            "error": err
        });
    }

}


exports.login = async (req, res) => {
    
    try{
        const found= await User.findOne({"email": req.body.email});
        if(!found){
            return res.status(200).json({
                "status": "false",
                "message": "No user found, plz register first",
            });
        }

        const isSamePin = await bcrypt.compare(req.body.pin,found.pin);

        if(!isSamePin){
            return res.status(200).json({
                "status": "false",
                "message": "Pin does not match",
            });
        }

        const payload={userId: found._id}
        const token=jwtService.encode(payload);

        return res.status(200).json({
            "status": "true",
            "message": "User logged in successfully",
            "auth-token": token,
            "user_type": found.type
        });

    }
    catch(err){
        return res.status(400).json({
            "status": "false",
            "message": "Oops!!, Some error occurred",
            "error": err
        });
    }

}