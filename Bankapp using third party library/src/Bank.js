import axios from 'axios';
const baseUrl="http://localhost:4000";
let data={
    test1:{username:"test1",password:"test1",accno:1001,balance:5000,history:[]},
    test2:{username:"test2",password:"test2",accno:1002,balance:8000,history:[]},
    test3:{username:"test3",password:"test3",accno:1003,balance:7000,history:[]},
    test4:{username:"test4",password:"test4",accno:1004,balance:4000,history:[]}

}
    let newData = localStorage.getItem('data');
    if (newData) {
      data = JSON.parse(newData);
      
    } 
      class Bank{
   
      static currentUser="";
     
      static saveData(){
        localStorage.setItem("data",JSON.stringify(data));
      } 
        
      
      static getAccountDetails(){
        return data;
      }
      static setcurrentUser(uname){
        localStorage.setItem("currentUser",uname);
        
      }
      static getcurrentUser(){
       return localStorage.getItem("currentUser");
        
      }
      
     static addUser(username,password,accno){
        data[username]={username,password,accno,history:[],balance:0};
        Bank.saveData();
     }
     static deleteUser(username){
      return axios.delete(baseUrl+"/users/"+username,{withCredentials:true});
     }
     static getHistory(){
       return data[Bank.getcurrentUser()].history;
     }
    static login(username,password){
       return axios.post(baseUrl+"/users/login",{
        username,
        password
       },{withCredentials:true});
    } 
    static registration(username,password,confirmPassword,accno){
      return axios.post(baseUrl+"/users/register",{
      username,
      password,
      confirmPassword,
      accno
      });
   }    
   static deposit(dpUsername,dpAmount){
    return axios.post(baseUrl+"/users/deposit",{
    dpUsername,
    dpAmount
    },{withCredentials:true});
 }    
 static withdraw(wdUsername,wdAmount){
  return axios.post(baseUrl+"/users/withdraw",{
  wdUsername,
  wdAmount
  },{withCredentials:true});
}    
static history(){
  return axios.get(baseUrl+"/users/transaction-history",
  {withCredentials:true});
} 
static getUsers(){
  return axios.get(baseUrl+"/users",{withCredentials:true});
}   
}
export default Bank;