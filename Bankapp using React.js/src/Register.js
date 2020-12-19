import React from 'react';
import swal from 'sweetalert';
import Bank from './Bank';
import {withRouter} from 'react-router';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
const RegisterSchema = Yup.object().shape({
  username:Yup.string()
  .min(2,'Too short!')
  .max(50,'Too long!')
  .required('required'),
  password:Yup.string()
  .min(2,'Too short!')
  .max(50,'Too long!')
  .required('required'),
  accno:Yup.string()
  .min(2,'Too short!')
  .max(50,'Too long!')
  .required('required'),
  confirmPassword:Yup.string()
  .min(2,'Too short!')
  .max(50,'Too long!')
  .required('required')
});
class Register extends React.Component{
    
       onSubmit=(values)=>{ 
        
        let uname=values.username;
        let accno=values.accno;
      let pwd=values.password;
      let confirmPassword=values.confirmPassword;
      Bank.registration(uname,pwd,confirmPassword,accno)
      .then(response=>{
        swal("Registration success!",response.data.message,"success");
       this.props.history.push("/");
     })
      .catch(err=>{
       
        swal("Registeration failed!",err.response.data.message, "error"); 
      })
   
     //let data=Bank.getAccountDetails();
    // if(uname in data){
    //    swal("Registeration failed!", "user already exists!", "error"); 
     //    let password=data[uname]["password"];
    // }   
        
    // else if(pwd!==confirmPassword){
    //    swal("Registeration failed!", "password and confirm password does not match!", "error"); 
    // }
    // else {
    //     Bank.addUser(uname,pwd,accno);
    //    swal("Registeration success!", "You are registered successfully!", "success");
     //  this.props.history.push("/");
     //  }
       }
  render(){
     return(
        <div className="container" >
        <div className="row">
            <div className="col-4" ></div>
<div className='col-4'> 
  <h5>WELCOME TO SBI BANK</h5>
  <div className="jumbotron" >
  <Formik
                initialValues={{
                  username: "",
                  password: "",
                  accno:"",
                  confirmPassword:""
                }}
                validationSchema={RegisterSchema}
                onSubmit={this.onSubmit}
                
              > 
               {({errors,touched})=>(<Form>
    <div className="form-group">
      <label for="exampleInputUsername1" >Username</label>
      <Field name="username" />
      {errors.username?<div>{errors.username}</div>:null}
    </div>
    <div className="form-group">
      <label for="exampleInputPassword1" >Accno</label>
      <Field name="accno" type="text" />
      {errors.accno?<div>{errors.accno}</div>:null}
    </div>
    <div className="form-group">
      <label for="exampleInputUsername1" >Password</label>
      <Field name="password" type="password"/>
      {errors.password?<div>{errors.password}</div>:null}
    </div>
    <div className="form-group">
      <label for="exampleInputPassword1" > Confirm Password</label>
      <Field name="confirmPassword" type="password"  />
      {errors.confirmPassword?<div>{errors.confirmPassword}</div>:null}
    </div>
    <button type="submit" className="btn btn-primary"  >Submit</button>
    </Form>)
  }
    </Formik>
               
  </div>
  
  <div className="col-4"></div>
 </div> 
</div>
</div>
);
 }  
     
  }
export default withRouter(Register);