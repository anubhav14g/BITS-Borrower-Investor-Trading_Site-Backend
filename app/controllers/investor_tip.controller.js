const Investor_Tip= require('../models/investor_tip.model');


exports.viewTip = async (req, res) => {
    
    try{
        const allTips= await Investor_Tip.find({});
        return res.status(200).json({
            "status": "true",
            "message": "List of all tips are here",
            "data": allTips
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
    
    try{
        const tip= await Investor_Tip.findById(req.params.tip_id)
        const obj={
            "userId": req.decoded_token.userId,
            "comment": req.body.comment
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

