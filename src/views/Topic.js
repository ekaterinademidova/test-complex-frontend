import React, {useState, useEffect} from 'react';
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";
// import { withAuthenticationRequired } from "@auth0/auth0-react";

import '../css/Topic.css';
import axios from 'axios';


export const Topic = () => {
  const params = useParams();
  let [selectedTopic, setSelectedTopic] = useState(params.id);
  let [topic, setTopic] = useState(null);
  let [isLoading, setIsLoading] = useState(true);
  let [testExists, setTestExists] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const apiUrl = 'http://localhost:4000/topics/' + selectedTopic;
    axios.get(apiUrl)
      .then(res => {
        console.log(res.data)
        const data = res.data;
        setTopic(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [selectedTopic]);

  useEffect(() => {
    setSelectedTopic(params.id)
  });

  useEffect(() => {
    if (topic != null) {
      if (topic.questionsCount > 0) setTestExists(true);
      setIsLoading(false);
    }
  }, [topic]);

  let [selectedTab, setSelectedTab] = useState('topics');
  const showTab = (val) => {
    setSelectedTab(val);
  };

  return (
    <div className='ts__container'>
      <a href="/topics/" className="ts__exit-btn" title="В список тестов"></a>
      <article className="ts__wrapper" itemScope="" itemType="https://schema.org/CreativeWork">
        <div className="ts__timer">
          <span id="hours"></span>:<span id="minutes"></span>:<span id="seconds"></span>
        </div>

        <form className="ts__form ts__section__business ts__class__">
          <div className="container ts__start-page-wrapper">
            {/* <img className="ts__start-img" src="https://testometrika.com/upload/uf/2c8/2c8852a200c89cf9789a5c35d73f4c2e.svg" itemProp="image" /> */}
          { isLoading === false ? (
            <>
              <h1 className="ts__h1" itemProp="headline">{topic.title}</h1>
              { testExists && (
                <div className="ts__btn-bar">
                  <Link to={"/test/" + topic.id}>
                    <span className="ts__btn-to-test button-dark button-global button-start"><span>Начать тест</span></span>    
                  </Link>     
                </div>
              )}                                                 
              <div id="profile-tabs" className="profile__tabs">
                <nav className="profile__tabs__nav">
                  <ul>
                    <li className={selectedTab == 'topics' ? "tab-current" : ""} 
                      onClick={() => showTab('topics')}
                    >
                      <a className="profile__tabs__nav-item">Лекция</a>
                    </li>
                    <li className={selectedTab == 'statistics' ? "tab-current" : ""}
                      onClick={() => showTab('statistics')}
                    >
                      <a className="profile__tabs__nav-item">Лаб. работа</a>
                    </li>
                  </ul>
                </nav>
              </div>          

                        
              <div className="ts__description" itemProp="description">
                <iframe className="topic-lab" src="https://drive.google.com/viewerng/viewer?embedded=true&url=https://ggaekappbucket.s3.amazonaws.com/media/ПО-41/.docx" ></iframe>    
              </div>
            </>
            ) : (
            <>Загрузка...</>
          )}
          </div>
        </form>
      </article>
    </div>
  );
}

export default Topic;
// export default withAuthenticationRequired(Topic, {
//   onRedirecting: () => <Loading />,
// });