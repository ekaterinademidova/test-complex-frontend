import React, {useState, useEffect} from 'react';
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import TopicCard from "../components/TopicCard";
// import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

import axios from 'axios';

import '../css/Chapter.css';


export const Chapter = () => {
  // const { user } = useAuth0();
  const params = useParams();

  let [selectedChapter, setSelectedChapter] = useState(params.id);

  const [topics, setTopics] = useState([]);
  let [filterTopics, setFilterTopics] = useState([]);
  let [isLoading, setIsLoading] = useState(true);
  let [statusLoading, setStatusLoading] = useState('Загрузка...');
  let [searchText, setSearchText] = useState('');

  useEffect(() => {
    setIsLoading(true);
    const apiUrl = 'http://localhost:4000/topics?chapterId=' + selectedChapter;
    axios.get(apiUrl)
      .then(res => {
        const allTopics = res.data;
        setTopics(allTopics);
        setFilterTopics(allTopics);
      })
      .catch(err => {
        console.log(err);
      });
  }, [selectedChapter]);

  useEffect(() => {
    setSelectedChapter(params.id)
  }, [params.id]);

  let [selectedFilter, setSelectedFilter] = useState('done');

  const showFilter = (val) => {
    setSelectedFilter(val);
  };

  const showDone = () => {
    showFilter('done');
    //done topics
  };

  const showUndone = () => {
    showFilter('undone');
    //undone topics
  };

  const showAll = () => {
    showFilter('all');
    //all topics
  };

  const search = (name) => {
    setIsLoading(true);
    if (name != '') {
      let array = topics.filter(topic=> topic.title.includes(name));
      setFilterTopics(array);
    } else {
      setFilterTopics(topics);
      setTimeout(setIsLoading(false), 3000);
    }
  };

  const clickEnter = (key) => {
    if (key === 'Enter') {
      search(searchText);
    }
  };

  useEffect(() => {
    if (topics.length) {
      if (filterTopics.length) {
        setStatusLoading('Загрузка...')
        setIsLoading(false);
      } else {
        setStatusLoading('Записи не найдены.')
      }
    }
  }, [topics, filterTopics]);

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
        <input className="search" 
              placeholder="Поиск..." 
              value={searchText}
              onChange={event => setSearchText(event.target.value)}
              onKeyUp={(e) => clickEnter(e.key)}
              type="text" 
              name="q" 
              size="40" m
              maxLength="50" 
              autoComplete="off" />
        <span className="search__submit" onClick={() => search(searchText)}></span>
      </div>
      <section id="my-tests">
        <div className="profile__tabs__content__filter">
          <div className="filter-column">
            <a className={selectedFilter == 'done' ? "test-list__test-active" : ""} 
              onClick={showDone}
            >
              Пройденные<span className="test-list__test__ok"></span>
            </a>
          </div>
          <div className="filter-column">
            <a className={selectedFilter == 'undone' ? "test-list__test-active" : ""}
              onClick={showUndone}
            >
              Непройденные<span className="test-list__test__time-load"></span>
            </a>
          </div>
          <div className="filter-column">
            <a className={selectedFilter == 'all' ? "test-list__test-active" : ""}
              onClick={showAll}
            >
              Все
            </a>
          </div>
        </div>
        {/* { result ? ( */}
          <div className="ts-category__container">
            <div className="test-list__wrap row">
              { !isLoading ? 
                (
                  filterTopics.map((topic) => <Link to={"/topic/" + topic.id} key={"topic_" + topic.id}>
                                                      <TopicCard topic={topic} />
                                                    </Link>)
                ) : 
                (
                  <>{statusLoading}</>
                )
              }
            </div>
          </div>
        {/* ) : (
          <div className="test-list__wrap test-attemp__list">
            <div className="test-attemp__empty active ">Пусто</div>
          </div>
        )} */}
      </section>
    </div>
	</div>
  );
}

export default Chapter;
// export default withAuthenticationRequired(Chapter, {
//   onRedirecting: () => <Loading />,
// });