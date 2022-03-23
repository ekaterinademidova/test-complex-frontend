import React, { useState, useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'

import "../css/Slider.css"; 
// import required modules
import { Mousewheel, Pagination } from "swiper";




import '../css/Home.css';

const Home = () => {
  const windowInnerWidth = window.innerWidth;
  const windowInnerHeight = window.innerHeight;

  // useEffect(() => {
  //   setWindowInnerWidth(window.innerWidth);
  // }, [windowInnerWidth]);

  // useEffect(() => {
  //   setWindowInnerHeight(window.innerHeight);
  // }, [windowInnerHeight]);

  return (
    <div className='home-page'>
      <div id="content">
        <div id="fullpage" className="fullpage-wrapper">
          {/* <Swiper style={{height: windowInnerHeight}}
            direction={"vertical"}
            slidesPerView={1}
            spaceBetween={30}
            mousewheel={true}
            pagination={{
              clickable: true,
            }}
            modules={[Mousewheel, Pagination]}
            className="mySwiper"
          >
            <SwiperSlide> */}
              <section id="promo__slide-0" 
                className="slider__content active" 
                style={{paddingTop: 80 + 'px', height: windowInnerHeight}} >
                <div className="fp-tableCell">
                  <div className="columns" style={{maxWidth: windowInnerWidth*0.8}}>
                    <div className="column column-left">
                      <img className="slider__img" 
                        src="https://en.testometrika.com/local/templates/main/img/1slide.gif" 
                        alt="Tests" 
                        style={{maxWidth: 85 + '%'}}
                        />
                    </div>
                    <div className="column">
                      <h1 className="promo__h1">Проходите тесты онлайн бесплатно на любых устройствах</h1>
                      <ul className="promo__ul">
                          <li>Прогресс и расшифровка останутся с Вами</li>
                          <li><a href="/">Проективные</a> методы с автоматическим подсчетом результатов</li>
                          <li>Онлайн-тесты <a href="/">по программированию</a></li>
                          <li>Образовательные тесты помогут в обучении</li>
                      </ul>
                    </div>
                    <span className="slider__navigation navigation-animate"></span>
                  </div>
                </div>
              </section>
            {/* </SwiperSlide>
            <SwiperSlide> */}
              <section id="promo__slide-1" 
                className="slider__content" 
                style={{paddingTop: 80 + 'px'}}>
                <div className="fp-tableCell">
                  <div className="columns" style={{maxWidth: windowInnerWidth*0.8}}>
                    <div className="column column-left">
                    <img className="slider__img" 
                        src="https://en.testometrika.com/local/templates/main/img/slide2.svg" 
                        alt="Your results" 
                        style={{minWidth: windowInnerWidth*0.3}}/>
                    </div>
                    <div className="column">
                      <h2 className="promo__h1">Получите свой прогресс</h2>
                      <ul className="promo__ul">
                          <li>Подробная информация в <a href="/">Вашем профиле</a></li>
                          <li><a href="/">Архив результатов</a> всех Ваших тестов </li>
                          <li><div className="promo__li-ico__pro">Pro</div> профессиональные тесты дают точный результат</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            {/* </SwiperSlide>
            <SwiperSlide> */}
              <section 
                id="promo__slide-2" 
                className="slider__content" 
                style={{paddingTop: 80 + 'px'}}>
                <div className="fp-tableCell">
                  <div className="columns" style={{maxWidth: windowInnerWidth*0.6}}>
                    <div className="column column-left slider__desctiption"
                      style={{minWidth: windowInnerWidth*0.4}}>
                      На нашем ресурсе собраны все популярные тесты для создания интернет-приложений. <br/>
                      С помощью обучающих тестов вы сможете определить и улучшить свои 
                      уровень знаний в области создания интернет-приложений.  <br/>
                      Процесс тестирования на мобильном устройстве или компьютере удобен и практичен. 
                    </div>
                    <div className="column"
                      style={{minWidth: windowInnerWidth*0.2}}>
                        <div className="test-number-wrap">
                          <div id="text-counter-animate" className="text-counter-animate">0</div>
                          <div className="text-counter__description">тестов на сайте</div>
                        </div>
                    </div>
                  </div>
                </div>
              </section>
            {/* </SwiperSlide>
          </Swiper> */}
          

          

          
        </div>
      </div>
      <div id="fp-nav" className="fp-show-active right">
        <ul>
          <li>
            <a href="#promo__slide-0" className="active"><span></span></a>
            <div className="fp-tooltip right">promo__slide-0</div>
          </li>
          <li>
            <a href="#promo__slide-1" className=""><span></span></a>
            <div className="fp-tooltip right">promo__slide-1</div>
          </li>
          <li>
            <a href="#promo__slide-2" className=""><span></span></a>
            <div className="fp-tooltip right">promo__slide-2</div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
