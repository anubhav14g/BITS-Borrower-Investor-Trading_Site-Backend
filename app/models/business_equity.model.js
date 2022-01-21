const mongoose = require('mongoose');

const businessEquitySchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:  "User" 
    },
    name_of_startup:{
        type: String,
        required:true
    },
    when_founded:{ // year
        type: Number,
        required:true
    },
    aim_of_business:{
        type: String,
        required:true
    },
    future_expectation:{
        type: String,
        required:true
    },
    how_revenue_generates:{ 
        type: String,
        required:true
    },
    why_need_funding:{ 
        type: String,
        required:true
    },
    total_revenue_till_date:{
        type: Number,
        required:true
    },
    last_month_revenue:{
        type: Number,
        required:true
    },
    net_profit_rate:{
        type: Number,
        required:true
    },
    amount:{
        type: Number,
        required:true
    },
    equity_demand_percentage:{
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

module.exports=mongoose.model("Business_Equity",businessEquitySchema);