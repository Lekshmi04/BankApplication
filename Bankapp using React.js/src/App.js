import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Login'
import Home from './Home'
import Register from './Register'
import TransactionHistory from './TransactionHistory'
import Users from './Users'
import {
  BrowserRouter,
  Link,
  Switch,
  Route
} from 'react-router-dom';
class App extends React.Component {
  render() {
    return(
    <div className="App">
      <BrowserRouter>
    <div>
      <Link to='/users'>Users</Link>
      </div>
          <div>
            <Switch>
              <Route path='/' exact={true}>
                <Login />
              </Route>
              <Route path='/home'>
                <Home />
              </Route>
              <Route path='/register'>
                <Register />
              </Route>
              <Route path='/users'>
                <Users />
              </Route>
              <Route path='/history' exact={true}>
                <TransactionHistory />
              </Route>
            </Switch>
          </div>
        
      </BrowserRouter>
      </div>



    );
  }
}
export default App;
