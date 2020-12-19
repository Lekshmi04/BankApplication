const mongoose = require('mongoose');


const User = mongoose.model('User',{
    username:String,
    password:String,
    accno:Number,
    balance:Number,
    history:[{
        typeOfTransaction:String,
        amount:Number
    }]
});
module.exports = {
    User
}