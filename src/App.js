import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Image from './components/Image/Image';
import Search from './components/Search/Search';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  useParams
} from "react-router-dom";

function App(){

  return (
    <div className="App">
      <Router>
        <Navbar/>
            <Switch>
                <Route path="/search">
                    <Searching />
                </Route>
                <Route path="/">
                 <Image />
                </Route>
                <Route path="/signup">
                  <Image />
                </Route>
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
