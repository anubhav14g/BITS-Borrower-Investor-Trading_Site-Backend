const Business_Equity= require('../models/business_equity.model');
const Status_Business_Equity= require('../models/status_business_equity.model');
const User= require('../models/user.model');

exports.viewBusinessEquityApplications = async (req, res) => {
    
    try{
        const obj= await Business_Equity.find({"isClosed": false})

        let array=[];

        for(var i=0;i<obj.length;i++){
            const p=await Status_Business_Equity.findOne({"investor_id": req.decoded_token.userId, "business_equity_id": obj[i]._id})
            if(p){
                if(p.accepted==true || p.rejected==true){
                    continue;
                }
                else{
                    const user=await User.findById(obj[i].user_id);
                    const obj2={
                        "name": user.name,
                        "email": user.email,
                        "phone_no": user.phone_no,
                        "ask_amount": p.amount,
                        "equity_demand_percentage": p.equity_demand_percentage 
                    }
                    array.push(obj2);
                }
            }
            else{
                const user=await User.findById(obj[i].user_id);
                const obj2={
                    "name": user.name,
                    "email": user.email,
                    "phone_no": user.phone_no,
                    "ask_amount": obj[i].amount,
                    "equity_demand_percentage": obj[i].equity_demand_percentage 
                }
                array.push(obj2);
            }
        }
        
        return res.status(200).json({
            "status": "true",
            "message": "List of all business equity applications are here",
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



exports.viewDetailedBusinessEquityApplication = async (req, res) => {
    
    try{
        const obj= await Business_Equity.findById(req.params.application_id)

        return res.status(200).json({
            "status": "true",
            "message": "Detailed view of business equity application is here",
            "data": obj
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


exports.acceptBusinessEquityApplication = async (req, res) => {
    
    try{
        const obj= await Status_Business_Equity.findOne({"investor_id": req.decoded_token.userId,"business_equity_id": req.params.application_id})

        if(obj){
            obj.accepted=true;
            obj.rejected=false;
            obj.save();
            return res.status(200).json({
                "status": "true",
                "message": "Offer accepted successfully",
                "data": obj
            });
        }

        const q= await Business_Equity.findById(req.params.application_id);

        const p={
            "investor_id": req.decoded_token.userId,
            "business_equity_id": req.params.application_id,
            "accepted": "true",
            "rejected": "false",
            "amount": q.amount,
            "equity_demand_percentage": q.equity_demand_percentage
        }

        const new_obj= await Status_Business_Equity.create(p)

        return res.status(200).json({
            "status": "true",
            "message": "Offer accepted successfully",
            "data": new_obj
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



exports.rejectBusinessEquityApplication = async (req, res) => {
    
    try{
        const obj= await Status_Business_Equity.findOne({"investor_id": req.decoded_token.userId,"business_equity_id": req.params.application_id})

        if(obj){
            obj.accepted=false;
            obj.rejected=true;
            obj.save();
            return res.status(200).json({
                "status": "true",
                "message": "Offer rejected successfully",
                "data": obj
            });
        }

        const q= await Business_Equity.findById(req.params.application_id);

        const p={
            "investor_id": req.decoded_token.userId,
            "business_equity_id": req.params.application_id,
            "accepted": "false",
            "rejected": "true",
            "amount": q.amount,
            "equity_demand_percentage": q.equity_demand_percentage
        }

        const new_obj= await Status_Business_Equity.create(p)

        return res.status(200).json({
            "status": "true",
            "message": "Offer rejected successfully",
            "data": new_obj
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


exports.counterBusinessEquityApplication = async (req, res) => {
    
    const _b= req.body;

    if(!_b.amount || !_b.equity_demand_percentage){
        return res.status(200).json({
            "status": "false",
            "message": "Plz enter counter offer details"
        });
    }
    
    try{
        const obj= await Status_Business_Equity.findOne({"investor_id": req.decoded_token.userId,"business_equity_id": req.params.application_id})

        if(obj){
            obj.accepted=false;
            obj.rejected=false;
            obj.amount=req.body.amount;
            obj.equity_demand_percentage=req.body.equity_demand_percentage;
            obj.save();
            return res.status(200).json({
                "status": "true",
                "message": "Offer countered successfully",
                "data": obj
            });
        }

        const p={
            "investor_id": req.decoded_token.userId,
            "business_equity_id": req.params.application_id,
            "accepted": "false",
            "rejected": "false",
            "amount": req.body.amount,
            "equity_demand_percentage": req.body.equity_demand_percentage
        }

        const new_obj= await Status_Business_Equity.create(p)

        return res.status(200).json({
            "status": "true",
            "message": "Offer countered successfully",
            "data": new_obj
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
