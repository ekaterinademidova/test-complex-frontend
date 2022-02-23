import React, {useState, useEffect} from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";

import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import Home from "./views/Home";
import Profile from "./views/Profile";
import ExternalApi from "./views/ExternalApi";
import { useAuth0 } from "@auth0/auth0-react";
import history from "./utils/history";

import Chapter from './views/Chapter';
import Topic from './views/Topic';
import Test from './views/Test';
import Result from "./views/Result";

// styles
import './css/reset.css';
import "./App.css";

import axios from 'axios';


// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
initFontAwesome();

const App = () => {
  const { isLoading, error } = useAuth0();
  //Хранить в localstorage
  //так же хранить выбранную тему
  let [selectedChapter, setSelectedChapter] = useState(1);
  const [topics, setTopics] = useState(
    {
      loading: false,
      topicsList: [],
    }
  );

  useEffect(() => {
    setTopics({loading: true})
    const apiUrl1 = 'http://localhost:4000/topics?chapterId=' + selectedChapter;
    axios.get(apiUrl1)
      .then(res => {
        console.log(res);
        const allTopics = res.data;
        setTopics({
          loading: false,
          topicsList: allTopics
        });
      })
      .catch(err => {
        console.log(err);
      });
  }, [selectedChapter]);

  console.log('app file ' + selectedChapter);

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }


  return (
    <Router history={history}>
      <NavBar setSelectedChapter={setSelectedChapter}/> 
        <Switch>
          {/* <Route path="/" exact component={Home} />
          <Route path="/profile" component={Profile} />
          <Route path="/external-api" component={ExternalApi} /> */}
          <Route path="/" exact render={()=><Home/>} />
          <Route path="/profile" render={()=><Profile/>} />

          {/* <Route path='/chapter' component={Chapter}/> */}
          <Route path='/chapter/topics' render={()=><Chapter topics={topics} setTopics={setTopics}/>} />

          {/* <Route path='/topic' component={Topic}/>
          <Route path='/test' component={Test}/>
          <Route path='/result' component={Result}/> */}
          <Route path='/topic' render={()=><Topic/>}/>
          <Route path='/test' render={()=><Test/>}/>
          <Route path='/result' render={()=><Result/>}/>
        </Switch>
    </Router>
  );
};

export default App;
