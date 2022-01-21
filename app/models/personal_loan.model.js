const mongoose = require('mongoose');

const personalLoanSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:  "User" 
    },
    purpose:{
        type: String,
        required:true
    },
    how_loan_can_help_you:{
        type: String,
        required:true
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
    isClosed: {
        type: Boolean,
        default: false
    }
}
,
{
  timestamps: true
});

module.exports=mongoose.model("Personal_Loan",personalLoanSchema);