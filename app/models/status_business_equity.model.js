const mongoose = require('mongoose');

const statusBusinessEquitySchema = new mongoose.Schema({
    investor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:  "User" 
    },
    business_equity_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:  "Business_Equity"
    },
    accepted: {
        type: Boolean,
        default:false
    },
    rejected: {
        type: Boolean,
        default:false
    },
    amount:{
        type: Number,
    },
    equity_demand_percentage:{
        type: Number,
    },
}
,
{
  timestamps: true
});

module.exports=mongoose.model("Status_Business_Equity",statusBusinessEquitySchema);