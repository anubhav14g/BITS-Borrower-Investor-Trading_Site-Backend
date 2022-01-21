const mongoose = require('mongoose');

const investorTipSchema = new mongoose.Schema({
    investor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:  "User" 
    },
    tip: {
        type: String,
        required: true
    },
    likes: {
        type: Array,
        default: []
    },
    dislikes: {
        type: Array,
        default: []
    },
    comments: {
        type: Array,
        default: []
    }
}
,
{
  timestamps: true
});

module.exports=mongoose.model("Investor_Tip",investorTipSchema);