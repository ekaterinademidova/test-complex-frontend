import React from "react";
import { Router, Route, Switch} from "react-router-dom";

import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import Home from "./views/Home";
import Profile from "./views/Profile";
import ExternalApi from "./views/ExternalApi";
// import { useAuth0 } from "@auth0/auth0-react";
import history from "./utils/history";

import Chapter from './views/Chapter';
import Topic from './views/Topic';
import Test from './views/Test';

// styles
import './css/reset.css';
import './App.css';


// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
import Management from "./views/Management";
initFontAwesome();

const App = () => {
  // const { isLoading, error } = useAuth0();

  return (
    <Router history={history}>
      <NavBar /> 
        <Switch>
          <Route path="/" exact render={()=><Home/>} />
          <Route path="/profile" render={()=><Profile/>} />
          <Route path='/chapter/:id' render={()=><Chapter />} />
          <Route path='/topic/:id' render={()=><Topic/>}/>
          <Route path='/test/:id' render={()=><Test/>}/>
          <Route path='/management' render={()=><Management />}/>
        </Switch>
    </Router>
  );
};

export default App;
