import React, {useState, useEffect} from 'react';

import Loading from "../components/Loading";
import Filters from "../components/Filters";
import TopicCard from "../components/TopicCard";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import axios from 'axios';

import '../css/Chapter.css';


export const Chapter = ({topics, setTopics}) => {

  return (
	<div className="tests-page">
    <div className="test-list__page">
      <div className="test-list__head-wrap">
        <div>
          <h1 className="test-list__page__h1">Темы</h1>
          <h2 className="test-list__page_description">по дисциплине "Программные средства создания Интернет-приложений"</h2>
        </div>
      </div>
      <div className="search__wrap">
        <input className="col-md-12 search" placeholder="Поиск..." id="title-search-input" type="text" name="q" size="40" maxLength="50" autoComplete="off" />
        <a href="" className="search__submit"></a>
      </div>
      <Filters topics={topics} setTopics={setTopics}/>
    </div>
				 
    <div className="ts-category__container">
      <div className="test-list__wrap row">
        { !topics.loading ? 
          (
            topics.topicsList.map((topic) => <TopicCard key={"topic_" + topic.id} 
                                                        id={topic.id} 
                                                        img={"https://testometrika.com/upload/uf/2c8/2c8852a200c89cf9789a5c35d73f4c2e.svg"} 
                                                        title={topic.title} 
                                                        link={"/"} />)
          ) : 
          (
            <>Загрузка...</>
          )
        }
      </div>
    </div>

	</div>
  );
}

// export default Dashboard;
export default withAuthenticationRequired(Chapter, {
  onRedirecting: () => <Loading />,
});