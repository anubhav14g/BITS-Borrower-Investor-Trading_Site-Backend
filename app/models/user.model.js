const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone_no: {
        type: Number,
        required:true,
        unique: true
    },
    pin: {
        type: String,
        required:true
    },
    is_email_verified: {
        type: Boolean,
        default: false
    },
    type: { // Borrower/Investor
        type: String,
        required:true
    },
}
,
{
  timestamps: true
});

module.exports=mongoose.model("User",userSchema);