import React from 'react';
import {withRouter} from 'react-router';
import Bank from './Bank';
class TransactionHistory extends React.Component{
  
   state={
       history:[]
   }
   componentDidMount(){
    Bank.history()
    .then(response=>{
  this.setState({history:response.data.history})
    })
      }
    render(){
         return(
            <div>
                <h1>Transaction history</h1>
            <table class="table">
                <thead>
                <tr>
                    <th>Type of Transaction</th>
                    <th>Amount</th>
                </tr>
                </thead>
                <tbody>
                {
                    this.state.history.length==0?
                    <tr><td>No Data</td></tr>:null
                }
                {
                   this.state.history.map(h=><tr>
                        <td>{h.typeOfTransaction}</td>
                        <td>{h.amount}</td>
                    </tr>)
                }
               </tbody>
            </table>
            </div>
        )
        
    }
   
  }  

export default withRouter(TransactionHistory);