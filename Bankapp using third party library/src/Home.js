import React from 'react';
import swal from 'sweetalert';
import Bank from './Bank';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
const depositSchema = Yup.object().shape({
  dpUsername:Yup.string()
  .min(2,'Too short!')
  .max(50,'Too long!')
  .required('required'),
  dpAmount:Yup.string()
  .min(2,'Too short!')
  .max(50,'Too long!')
  .required('required')
});
const withdrawSchema = Yup.object().shape({
  wdUsername:Yup.string()
  .min(2,'Too short!')
  .max(50,'Too long!')
  .required('required'),
  wdAmount:Yup.string()
  .min(2,'Too short!')
  .max(50,'Too long!')
  .required('required'),
 
});
class Home extends React.Component {
 state={
   balance:""
 }
  onDeposit = (values) => {

    let uname = values.dpUsername;
    let amt = Number(values.dpAmount);
    Bank.deposit(uname,amt)
    
    .then(response=>{
    this.setState({ balance:response.data.balance});
      swal("Deposit successful!","Amount credited", "success");
      
    })
     .catch(err=>{
      swal("Deposit failed!", "You achieved invalid data!", "error"); 
     })
  
   // let data = Bank.getAccountDetails()
   // if (uname in data) {
   //   data[uname]["balance"] += amt;
   //   let bal = data[uname]["balance"];
   //   this.setState({ balance: bal });

    //  data[uname]["history"].push({
     //   typeOfTransaction: "Credit",
     //   amount: amt

     // })
     // Bank.saveData();
     // alert("Deposit Successful");
   // }
   // else {
   //   swal("invalid user")
   // }

  }
  onWithdraw = (values) => {
    
    let uname = values.wdUsername;
    let amt = Number(values.wdAmount);
   Bank.withdraw(uname,amt)
   .then(response=>{
   this.setState({ balance:response.data.balance});
    swal("Withdraw successful!","Amount Debited", "success");
    
  })
   .catch(err=>{
    swal("Withdraw failed!", "You achieved invalid data!", "error"); 
   })

   // let data = Bank.getAccountDetails()
   // if (uname in data) {
   //   let bal = data[uname]["balance"]

    //  if (amt > bal) {
    //    swal("insufficient balance");
    //  }
     // else {
     //   data[uname]["balance"] -= amt;
     //   let bal = data[uname]["balance"];
     //   this.setState({ balance: bal })
     //   data[uname]["history"].push({
     //     typeOfTransaction: "Debit",
     //     amount: amt

      //  })
      //  Bank.saveData();
      //  alert("Withdraw successful");
     // }
   // }
   // else {
   //   swal("invalid user")
   // }
  }


  render() {
    return (
      <div className="container">
       Balance:{this.state.balance}
        <Link to='/history'>History</Link>
       
        <div className="row">
          <div className="col-6">
            <div className="jumbotron">
              
              <Formik
                initialValues={{
                  dpUsername: "",
                  dpAmount: ""
                 
                }}
                validationSchema={depositSchema}
                onSubmit={this.onDeposit}
                
              > 
               {({errors,touched})=>(<Form>
                <h3>Deposit</h3>


                <div className="form-group">
                  <label for="exampleInputUsername1">Username</label>
                  <Field name="dpUsername"  />
                  {errors.dpUsername?<div>{errors.dpUsername}</div>:null}
                </div>
                <div className="form-group">
                  <label for="exampleInputPassword1">Amount</label>
                 <Field name="dpAmount"/>
                 {errors.dpAmount?<div>{errors.dpAmount}</div>:null}
                </div>

                <button type="submit" className="btn btn-primary" >ok</button>
               </Form>)
  }
              </Formik>

            </div>
          </div>
          <div className="col-6">
            <div className="jumbotron">
            <Formik
                initialValues={{
                  wdUsername: "",
                  wdAmount: ""
                 
                }}
                validationSchema={withdrawSchema}
                onSubmit={this.onWithdraw}
                
              > 
               {({errors,touched})=>(<Form> 
                <h3>Withdrawal</h3>


                <div className="form-group">
                  <label for="exampleInputUsername1">Username</label>
                  <Field name="wdUsername" />
                  {errors.wdUsername?<div>{errors.wdUsername}</div>:null}

                </div>
                <div className="form-group">
                  <label for="exampleInputPassword1">Amount</label>
                  <Field name="wdAmount" />
                  {errors.wdAmount?<div>{errors.wdAmount}</div>:null}
                </div>

                <button type="submit" className="btn btn-primary">ok</button>
                </Form>)
  }
              </Formik>

            </div>
          </div>

        </div>
      </div>




    );
  }
}

export default Home;