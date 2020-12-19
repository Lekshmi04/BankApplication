const {User} = require('../models/user');
let data = {
   
}
let currentUser;
function getUsers(){
    return User.find({}).select("username history balance")
    .then(users=>{
        if(users){
         return{
                statusCode:200,
                users:users
            }
        }
        }) 
}   
function addUser(username,password,accno){
   return User.findOne({
        username
    })
    .then(user=>{
        if(user){
            return{
                statusCode:400,
                message:"Account already exists"
            }
        }
        const newUser=new User({
            username,password,accno,history:[],balance:0
        });
        newUser.save();
        return{
            statusCode:200,
            message:"Account created sucessfully"
        }
    })
   // data[username]={username,password,accno,history:[],balance:0};
    
 }
 function login(username,password){
    return User.findOne({
        username,
        password
    })
    .then(user=>{
        if(user){
            return{
                statusCode:200,
                message:"Logged in successfully"
            }
        } 
        return{
            statusCode:400,
            message:"Invalid credentials"
        }
 })
}
function deposit(username,amount){
    return User.findOne({
        username
         
    })
    .then(user=>{
       if(user){
        user.balance+=amount;
         let bal=user.balance;
         user.history.push({
             typeOfTransaction:"credit",
             amount:amount
         });
         user.save();
         return {statusCode:200,balance:bal, message:"Deposit successfully"}
       }
       return{
          statusCode:400,
           message:"Invalid details"
       }
 })
}
function withdraw(username,amount){
    return User.findOne({
        username
    
    
    })
    .then(user=>{
       if(user){
        if (amount > user.balance) {
            return {statusCode:400,balance:user.balance, message:"Insufficient balance"}
       }
        user.balance-=amount;
         let bal=user.balance;
        
         user.history.push({
             typeOfTransaction:"debit",
             amount:amount
         });
         user.save();
         return {statusCode:200,balance:bal, message:"Withdraw successfully"}
       }
       return{
          statusCode:400,
           message:"Invalid details"
       }
 })
}
function history(username){
    return User.findOne({
        username
         
    })
    .then(user=>{
        
            return{
                statusCode:200,
                history:user.history 
            }
          
});
}
function deleteUser(username){
    return User.deleteOne({
        username
         
    })
    .then(user=>{
        
            return{
                statusCode:200,
                message:"User delete successfully" 
            }
          
});
}
 function setcurrentUser(username){
     currentUser=username;
 }
 function getCurrentUser(){
     return currentUser;
 }
   module.exports = {
       addUser ,
       getUsers,
       login,
       deposit,
       withdraw,
       history,
       deleteUser
    
      // setcurrentUser:setcurrentUser,
      // getCurrentUser:getCurrentUser,
}
    
