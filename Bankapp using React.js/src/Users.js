import React from 'react';
import {withRouter} from 'react-router';
import swal from 'sweetalert';
import Bank from './Bank';
class Users extends React.Component{
    state={
        users:[]
    }
    deleteUser=(username)=>{
        Bank.deleteUser(username)
        .then(data=>{
            swal("Success!","User deleted successfully","success");
            this.getUsers();
        })
        .catch(err=>{
            swal("Error!","An error has occured","error");
        });
    }
    getUsers=()=>{
        Bank.getUsers()
        .then(response=>{
            this.setState({
                users:response.data.users
            });
        });
    }   
       
    
    componentDidMount(){
      this.getUsers();
    }
        
    

    render(){
         return(
            <div>
                <h1>Users</h1>
            <table className="table">
                <thead>
                <tr>
                    <th>Username</th>
                    <th>Balance</th>
                </tr>
                </thead>
                <tbody>
                {
        this.state.users.map(user=><tr>
                        <td>{user.username}</td>
                        <td>{user.balance}</td>
                        <td onClick={()=>{this.deleteUser(user.username)}}>Delete</td>
                    </tr>)
                }
            </tbody>   
            </table>
            </div>
        )
        
    }
  }                                                                                                                                                                                                                                                                                                                                                                                                                                                 

export default withRouter(Users);
