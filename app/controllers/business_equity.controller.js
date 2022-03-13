const Business_Equity= require('../models/business_equity.model');
const Status_Business_Equity= require('../models/status_business_equity.model');
const User= require('../models/user.model');

exports.viewClosed = async (req, res) => {
    
    try{
        const obj= await Business_Equity.find({"user_id": req.decoded_token.userId,"isClosed": true});

        return res.status(200).json({
            "status": "true",
            "message": "List of all closed applications are here",
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


exports.viewClosedDetailedView = async (req, res) => {
    
    try{
        const obj= await Status_Business_Equity.find({"business_equity_id": req.params.application_id});
        
        let array=[];
        for(var i=0;i<obj.length;i++){
            let user= await User.findById(obj[i].investor_id);
            let a={
                "investor_name": user.name,
                "investor_email": user.email,
                "investor_phone_no": user.phone_no,
                "accepted": obj[i].accepted,
                "rejected": obj[i].rejected,
                "amount": obj[i].amount,
                "equity_demand_percentage": obj[i].equity_demand_percentage,
            }
            array.push(a);
        }

        return res.status(200).json({
            "status": "true",
            "message": "Detailed view of closed application",
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


exports.openClosedApplication = async (req, res) => {
    
    try{
        const obj= await Business_Equity.findById(req.params.application_id);
        obj.isClosed=false;
        obj.save();

        return res.status(200).json({
            "status": "true",
            "message": "Closed application reopen successfully",
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


exports.viewOpen = async (req, res) => {
    
    try{
        const obj= await Business_Equity.find({"user_id": req.decoded_token.userId,"isClosed": false});

        return res.status(200).json({
            "status": "true",
            "message": "List of all open applications are here",
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


exports.viewOpenDetailedView = async (req, res) => {
    
    try{
        const obj= await Status_Business_Equity.find({"business_equity_id": req.params.application_id});
        
        let array=[];
        for(var i=0;i<obj.length;i++){
            let user= await User.findById(obj[i].investor_id);
            let a={
                "investor_id": user._id,
                "investor_name": user.name,
                "investor_email": user.email,
                "investor_phone_no": user.phone_no,
                "accepted": obj[i].accepted,
                "rejected": obj[i].rejected,
                "amount": obj[i].amount,
                "equity_demand_percentage": obj[i].equity_demand_percentage,
                "last_countered_user_type": obj[i].last_countered_user_type
            }
            array.push(a);
        }

        return res.status(200).json({
            "status": "true",
            "message": "Detailed view of open application",
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


exports.acceptOffer = async (req, res) => {
    
    try{
        const obj= await Status_Business_Equity.findOne({"investor_id": req.params.investor_id,"business_equity_id": req.params.application_id});
        
        obj.accepted=true;
        obj.rejected=false;
        obj.save();

        return res.status(200).json({
            "status": "true",
            "message": "Offer accepted successfully",
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


exports.rejectOffer = async (req, res) => {
    
    try{
        const obj= await Status_Business_Equity.findOne({"investor_id": req.params.investor_id,"business_equity_id": req.params.application_id});
        obj.accepted=false;
        obj.rejected=true;
        obj.save();

        return res.status(200).json({
            "status": "true",
            "message": "Offer rejected successfully",
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

exports.counterOffer = async (req, res) => {
    
    const _b= req.body;

    if(!_b.amount || !_b.equity_demand_percentage){
        return res.status(200).json({
            "status": "false",
            "message": "Plz enter counter offer details"
        });
    }

    try{
        const obj= await Status_Business_Equity.findOne({"investor_id": req.params.investor_id,"business_equity_id": req.params.application_id});
        obj.accepted=false;
        obj.rejected=false;
        obj.amount=_b.amount;
        obj.equity_demand_percentage=_b.equity_demand_percentage;
        obj.last_countered_user_type="Borrower";
        obj.save();

        return res.status(200).json({
            "status": "true",
            "message": "Offer countered successfully",
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


exports.closedOpen = async (req, res) => {
    
    try{
        const obj= await Business_Equity.findById(req.params.application_id);
        const a= await Status_Business_Equity.find({"business_equity_id": obj._id});

        var f=0;

        for(var i=0;i<a.length;i++){
            if(a[i].accepted==false && a[i].rejected==false){
                f=1;
                break;
            }
        }

        if(f==1){
            return res.status(200).json({
                "status": "false",
                "message": "Can't close the application, you need to either accept or reject the applications"
            });
        }
         
        obj.isClosed=true;
        obj.save();

        return res.status(200).json({
            "status": "true",
            "message": "Application closed successfully",
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


exports.create = async (req, res) => {
    
    const _b=req.body;

    if(!_b.name_of_startup || !_b.when_founded || !_b.aim_of_business || !_b.future_expectation || !_b.how_revenue_generates || !_b.why_need_funding || !_b.total_revenue_till_date || !_b.last_month_revenue || !_b.net_profit_rate || !_b.amount || !_b.equity_demand_percentage){
        return res.status(200).json({
            "status": "false",
            "message": "All fields are required"
        });
    }

    try{
        
        const obj={
            "user_id": req.decoded_token.userId,
            "name_of_startup": _b.name_of_startup,
            "when_founded": Number(_b.when_founded),
            "aim_of_business": _b.aim_of_business,
            "future_expectation": _b.future_expectation,
            "how_revenue_generates": _b.how_revenue_generates,
            "why_need_funding": _b.why_need_funding,
            "total_revenue_till_date": Number(_b.total_revenue_till_date),
            "last_month_revenue": Number(_b.last_month_revenue),
            "net_profit_rate": Number(_b.net_profit_rate),
            "amount": Number(_b.amount),
            "equity_demand_percentage": Number(_b.equity_demand_percentage),
            "isClosed": "false"
        }

        const new_obj= await Business_Equity.create(obj);

        return res.status(200).json({
            "status": "true",
            "message": "Application is created successfully",
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