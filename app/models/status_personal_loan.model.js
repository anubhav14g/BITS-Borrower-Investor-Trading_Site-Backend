const mongoose = require('mongoose');

const statusPersonalLoanSchema = new mongoose.Schema({
    investor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:  "User" 
    },
    personal_loan_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:  "Personal_Loan"
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

module.exports=mongoose.model("Status_Personal_Loan",statusPersonalLoanSchema);