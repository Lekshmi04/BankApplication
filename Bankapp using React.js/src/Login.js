import React from 'react';
import swal from 'sweetalert';
import Bank from './Bank';
import { withRouter } from 'react-router';
import { Link} from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
const LoginSchema = Yup.object().shape({
  username:Yup.string()
  .min(2,'Too short!')
  .max(50,'Too long!')
  .required('required'),
  password:Yup.string()
  .min(2,'Too short!')
  .max(50,'Too long!')
  .required('required')
});
class Login extends React.Component {
 
   onSubmit = (values) => {
    
    let uname=values.username;
    let pwd=values.password;
    Bank.login(uname,pwd)
    .then(response=>{
      swal("Login success",response.data.message,"success");
      this.props.history.push("/home");
    }).catch(err=>{
      swal("Login failed","You provided invalid message","error");
    });
   }
 
    // let data=Bank.getAccountDetails()
    // if(uname in data){
    //    let password=data[uname]["password"];
    //    if(pwd===password){

    //      Bank.setcurrentUser(uname);
    //   swal("Login success!", "You achieved valid data!", "success");
    // this.props.history.push("./home");
    // }
    // else{
    //    swal("Login failed!", "You achieved invalid data!", "error");
    // }
    // }
    // else{
    //   swal("invalid user");
    // }

  
  render() {
    return (

      <div className="container" >
        <div className="row">
          <div className="col-4" ></div>
          <div className='col-4'>
          <Link to ='/register'><h1>REGISTER</h1></Link>
            <h5>WELCOME TO SBI BANK</h5>
            <div className="jumbotron" >
              <Formik
                initialValues={{
                  username: "",
                  password: ""
                }}
                validationSchema={LoginSchema}
                onSubmit={this.onSubmit}
                
              >
                {({errors,touched})=>(<Form>
                  <div className="form-group">
                    <label for="exampleInputUsername1" >Username</label>
                    <Field name="username" />
                  {errors.username?<div>{errors.username}</div>:null}
                  </div>
                  <div className="form-group">
                    <label for="exampleInputPassword1" >Password</label>
                    <Field name="password" type="password" />
                    {errors.password?<div>{errors.password}</div>:null} 
                  </div>

                  <button type="submit" >Submit</button>
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
export default withRouter(Login);