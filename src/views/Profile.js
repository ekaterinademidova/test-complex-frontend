import React, {useEffect, useState} from "react";
// import { Container, Row, Col } from "reactstrap";

// import Highlight from "../components/Highlight";
import Loading from "../components/Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

import '../css/Profile.css';

export const ProfileComponent = () => {
  const { user } = useAuth0();

  console.log(user);

  let [selectedTab, setSelectedTab] = useState('topics');
  const showTab = (val) => {
    setSelectedTab(val);
  };

  let [selectedFilter, setSelectedFilter] = useState('done');
  const showFilter = (val) => {
    setSelectedFilter(val);
  };

  let [result, setResult] = useState(null);

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

  return (
    <div id="content" className="profile-page">

      <section className="profile__general-info">
        <div className="profile__generel-info__photo-block">
          <div className="profile__general-info__photo">
          <img
            src={user.picture}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture"
          />
          </div>
          <input type="file" name="PERSONAL_PHOTO" className="profile__general-info__file " accept="image/jpeg,image/png,image/webp" capture="" />
        </div>
        <div className="profile__general-info__name">{user.email}</div>
      </section> 


      <div id="profile-tabs" className="profile__tabs">
        <nav className="profile__tabs__nav">
          <ul>
            <li className={selectedTab == 'topics' ? "tab-current" : ""} 
              onClick={() => showTab('topics')}
            >
              <a className="profile__tabs__nav-item">Мои темы</a>
            </li>
            <li className={selectedTab == 'statistics' ? "tab-current" : ""}
              onClick={() => showTab('statistics')}
            >
              <a className="profile__tabs__nav-item">Статистика</a>
            </li>
          </ul>
        </nav>
        <div className="profile__tabs__content">
          { selectedTab != 'statistics' ? (
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
                    Неоконченные<span className="test-list__test__time-load"></span>
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
              { result ? (
                <>cards</>
              ) : (
                <div className="test-list__wrap test-attemp__list">
                  <div className="test-attemp__empty active ">Пусто</div>
                </div>
              )}
            </section>
          ) : 
            <>Статистика</>
          }
          
        </div>
      </div>
    </div>
  );
};

export default withAuthenticationRequired(ProfileComponent, {
  onRedirecting: () => <Loading />,
});
