import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Image from './components/Image/Image';
import Search from './components/Search/Search';
import Liked from './components/User/Liked';
import Signup from './components/User/Signup';
import Login from './components/User/Login';
import Logout from './components/User/Logout';
import Profile from './components/User/Profile';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  useParams,
  withRouter 
} from "react-router-dom";

function App(){

  return (
    <div className="App">
      <Router forceRefresh={true}>
        <Navbar/>
            <Switch>
                <Route path="/search">
                  <Searching />
                </Route>
                <Route path='/liked' exact component={withRouter(Liked)}/>
                <Route path="/signup" exact component={withRouter(Signup)}/>
                <Route path="/login" exact component={withRouter(Login)} />
                <Route path="/logout" exact component={withRouter(Logout)} />
                <Route path="/profile" exact component={withRouter(Profile)} />
                <Route path="/" exact component={withRouter(Image)} />
            </Switch>
            
    </Router>
      </div>
  );
}

  function Searching() {
    let match = useRouteMatch();
  
    return (
      <div>
        <Switch>
          <Route path={`${match.path}/:searchText`}>
            <SearchDetail />
          </Route>
          <Route path={match.path}>
            <Search />
          </Route>
        </Switch>
      </div>
    );
  }
  
  function SearchDetail() {
    let { searchText } = useParams();
    return <Image query={searchText} searched={true} />;
  }
export default App;
