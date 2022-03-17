const Investor_Tip= require('../models/investor_tip.model');
const User= require('../models/user.model');

exports.viewTip = async (req, res) => {
    
    try{
        const allTips= await Investor_Tip.find({});
        
        let array=[];
        for(var i=0;i<allTips.length;i++){
            let user= await User.findById(allTips[i].investor_id);
            let a={
                "tip_id": allTips[i]._id,
                "name": user.name,
                "email": user.email,
                "tip": allTips[i].tip,
                "total_likes": allTips[i].likes.length,
                "total_dislikes": allTips[i].dislikes.length,
            }
            array.push(a);
        }

        return res.status(200).json({
            "status": "true",
            "message": "List of all tips are here",
            "data": array
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


exports.createTip = async (req, res) => {
    
    if(!req.body.tip){
        return res.status(400).json({
            "status": "false",
            "message": "Plz enter tip"
        });
    }

    try{
        const obj={
            "investor_id": req.decoded_token.userId,
            "tip": req.body.tip
        }
        const new_investor_tip= await Investor_Tip.create(obj);
        return res.status(200).json({
            "status": "true",
            "message": "Tip created successfully",
            'data': new_investor_tip
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

exports.likeTip = async (req, res) => {
    
    try{
        const tip= await Investor_Tip.findById(req.params.tip_id)
        if(tip.likes.includes(req.decoded_token.userId)==true){
            return res.status(200).json({
                "status": "true",
                "message": "Already liked the tip",
            });
        }
        tip.likes.push(req.decoded_token.userId);
        tip.save();
        return res.status(200).json({
            "status": "true",
            "message": "Tip liked successfully",
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

exports.dislikeTip = async (req, res) => {
    
    try{
        const tip= await Investor_Tip.findById(req.params.tip_id)
        if(tip.dislikes.includes(req.decoded_token.userId)==true){
            return res.status(200).json({
                "status": "true",
                "message": "Already disliked the tip",
            });
        }
        tip.dislikes.push(req.decoded_token.userId);
        tip.save();
        return res.status(200).json({
            "status": "true",
            "message": "Tip disliked successfully",
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

exports.commentTip = async (req, res) => {
    
    if(!req.body.comment){
        return res.status(400).json({
            "status": "false",
            "message": "Plz enter comment"
        });
    }

    try{
        const tip= await Investor_Tip.findById(req.params.tip_id)
        const obj={
            "userId": req.decoded_token.userId,
            "comment": req.body.comment,
            "createdAt": new Date()
        }
        tip.comments.push(obj);
        tip.save();
        return res.status(200).json({
            "status": "true",
            "message": "Tip commented successfully",
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


exports.getAllComments = async (req, res) => {

    try{
        const tip= await Investor_Tip.findById(req.params.tip_id)
        
        tip.comments.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.createdAt) - new Date(a.createdAt);
        })

        return res.status(200).json({
            "status": "true",
            "message": "List of all comments of a tip are below",
            "data": tip.comments
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

