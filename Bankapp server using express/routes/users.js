var express = require('express');
var router = express.Router();
var Bank=require('../services/bank');

function authMiddleware(req,res,next){
   if(req.session.currentUser){
    next();
  }
  else{
    res.status(401).send({message:"Please login"});
  }
   
}
/* GET users listing. */
router.get('/',function(req, res, ){
Bank.getUsers()
 .then(data=>{
  res.status(data.statusCode).send({message:data.message,users:data.users}) 
});
});
router.post('/register', function(req, res,) {

  let uname=req.body.username;
let pwd=req.body.password;
let accno=req.body.accno;
let confirmPassword=req.body.confirmPassword;

//let data=Bank.getUsers();
//if(uname in data){
//res.status(400).send({message:"Registration failed uname exists"}); 
//}   
if(pwd!==confirmPassword){
   res.status(400).send({message:"Registration failed"});
}
else{
Bank.addUser(uname,pwd,accno)
  .then(data=>{
  res.status(data.statusCode).send({message:data.message})
})
//this.props.history.push('/login');
}
})
router.post('/login',function(req,res){
   let uname=req.body.username;
   let pwd=req.body.password;
   Bank.login(uname,pwd)
   
   .then(data=>{
     if(data.statusCode==200){
       req.session.currentUser=uname;
     }
    
   res.status(data.statusCode).send({message:data.message})
 }) 
 // let data=Bank.getUsers()
 // if(uname in data){
   //   let password=data[uname]["password"];
  //    if(pwd===password){
   //     req.session.currentUser=uname;
           
   //    res.send({message:"Login success!"});
      
   //   }
   //   else{
    //     res.status(400).send({message:"Login failed!"});
    //  }
 // }
  //else{
  //    res.status(400).send({message:"invalid user"});
 // }
});
router.post('/deposit',authMiddleware,function(req,res){
   let uname = req.body.dpUsername;
   let amt = parseInt(req.body.dpAmount);
   Bank.deposit(uname,amt)
   .then(data=>{
    res.status(data.statusCode).send({message:data.message , balance:data.balance});
    })
  // let data = Bank.getUsers()
  // if (uname in data) {
   //  data[uname]["balance"] += amt;
   //  let bal = data[uname]["balance"];
   // data[uname]["history"].push({
   //    typeOfTransaction: "Credit",
   //    amount: amt

   //  })
     
   //  res.send({balance:bal,message:"Deposit Successful"});
  // }
  // else {
  //   res.status(400).send({message:"invalid user"})
  // }
});
router.post('/withdraw',authMiddleware,function(req,res){
   let uname = req.body.wdUsername;
   let amt = parseInt(req.body.wdAmount);
   if(uname!=req.session.currentUser){
        return res.status(400).send({message:"invalid user"});
      }
  Bank.withdraw(uname,amt)
  .then(data=>{
   res.status(data.statusCode).send({message:data.message , balance:data.balance});
   })
   //let data = Bank.getUsers()
    

  // if (uname in data) {
  //  if(uname!=req.session.currentUser){
  //    return res.send({message:"invalid username"});
   // }
   // data[uname]["balance"] -= amt;
  //  let bal = data[uname]["balance"];
  //   if (amt > bal) {
  //    return res.status(400).send({message:"insufficient balance"});
   //  }
   //  else {
      
   //    data[uname]["history"].push({
   //      typeOfTransaction: "Debit",
   //      amount: amt

    //   })
       
    //   res.send({balance:bal,message:"Withdraw successful"});
    //// }
  // }
  // else {
  //   res.status(400).send({message:"invalid user"})
 //  }
 
});
router.get('/transaction-history',authMiddleware,function(req,res){

let uname=req.session.currentUser;
Bank.history(uname)
.then(data=>{
  res.status(data.statusCode).send({history:data.history});
})
});
router.delete('/:id',authMiddleware,function(req,res){
  Bank.deleteUser(req.params.id)
.then(data=>{
  res.status(data.statusCode).send({message:data.message});
})
});



//if(uname in data){
//  return res.send({history:data[uname].history});
//}
//else{
//  res.status(400).send({message:"invalid user"});
//}
//});
 
module.exports= router;
