const mongoose = require('mongoose');

const statusBusinessLoanSchema = new mongoose.Schema({
    investor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:  "User" 
    },
    business_loan_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:  "Business_Loan"
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
        required:true
    },
    rate_of_interest:{
        type: Number,
        required:true
    },
    duration:{ // years
        type: Number,
        required:true
    },
}
,
{
  timestamps: true
});

module.exports=mongoose.model("Status_Business_Loan",statusBusinessLoanSchema);