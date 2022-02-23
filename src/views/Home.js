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
          <Swiper style={{height: windowInnerHeight}}
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
            <SwiperSlide>
              <section id="promo__slide-0" 
                className="slider__content active" 
                style={{paddingTop: 80 + 'px'}}>
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
                      <h1 className="promo__h1">Take tests online for free on any devices</h1>
                      <ul className="promo__ul">
                          <li>Progress and decoding will stay with you.</li>
                          <li><a href="/">Projective</a> methods with automatic calculation of results</li>
                          <li>Online tests <a href="/">of programming</a></li>
                          <li>Educational tests will help in learning</li>
                      </ul>
                    </div>
                    <span className="slider__navigation navigation-animate"></span>
                  </div>
                </div>
              </section>
            </SwiperSlide>
            <SwiperSlide>
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
                      <h2 className="promo__h1">Get your progress</h2>
                      <ul className="promo__ul">
                          <li>Detailed information in  <a href="/">your profile</a></li>
                          <li><a href="/">Results archive</a> of all your tests</li>
                          <li><div className="promo__li-ico__pro">Pro</div> professional tests give an accurate result</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            </SwiperSlide>
            <SwiperSlide>
              <section 
                id="promo__slide-2" 
                className="slider__content" 
                style={{paddingTop: 80 + 'px'}}>
                <div className="fp-tableCell">
                  <div className="columns" style={{maxWidth: windowInnerWidth*0.6}}>
                    <div className="column column-left slider__desctiption"
                      style={{minWidth: windowInnerWidth*0.4}}>
                      Our resource contains all popular tests for creating Internet applications. <br/>
                      With the help of educational tests, you will be able to determine and improve your 
                      level of knowledge in the field of creating Internet applications. <br/>
                      The process of testing on a mobile device or computer is convenient and practical.
                    </div>
                    <div className="column"
                      style={{minWidth: windowInnerWidth*0.2}}>
                        <div className="test-number-wrap">
                          <div id="text-counter-animate" className="text-counter-animate">0</div>
                          <div className="text-counter__description">tests on the site</div>
                        </div>
                    </div>
                  </div>
                </div>
              </section>
            </SwiperSlide>
          </Swiper>
          

          

          
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
