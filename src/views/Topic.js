import React, {useState, useEffect} from 'react';

import Loading from "../components/Loading";
import { withAuthenticationRequired } from "@auth0/auth0-react";

import '../css/Topic.css';
import axios from 'axios';


export const Topic = () => {

  //надо получить id выбранного топика
  const topic = {
    id: 1,
    title: "1.1.1 Основные понятия"
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
            <img className="ts__start-img" src="https://testometrika.com/upload/uf/2c8/2c8852a200c89cf9789a5c35d73f4c2e.svg" itemProp="image" />

            <h1 className="ts__h1" itemProp="headline">{topic.title}</h1>
                                                              
            <div className="ts__btn-bar">
              <a href="/test" className="js__ts-start ts__btn-to-test button-dark button-global button-start"><span>Начать тест</span></a>         
            </div>
                      

                      
            <div className="ts__description" itemProp="description">
              <iframe className="topic-lab" src="https://drive.google.com/viewerng/viewer?embedded=true&url=https://ggaekappbucket.s3.amazonaws.com/media/ПО-41/.docx" ></iframe>    
            </div>
          </div>
        </form>
      </article>
    </div>
  );
}

export default withAuthenticationRequired(Topic, {
  onRedirecting: () => <Loading />,
});