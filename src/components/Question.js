import React, { useState, useEffect } from "react";
import Answer from './Answer';
import axios from 'axios';


const Question = ({question, number, setNumber, amount}) => {

  const [answers, setAnswers] = useState(
    {
      loading: false,
      answersList: [],
    }
  );

  useEffect(() => {
    setAnswers({loading: true})
    const apiUrl1 = 'http://localhost:4000/answers?questionId=' + question.id;
    axios.get(apiUrl1)
      .then(res => {
        console.log(res);
        const allAnswers = res.data;
        setAnswers({
          loading: false,
          answersList: allAnswers
        });
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  shuffle(answers);

  const nextQuestion = (e) => {
    e.preventDefault();

    // for(let i = 0; i < answers.length; i++) {
    //   console.log('selected = ' + answers[i].selected + '\nstatus = ' + answers[i].status);
    //   if(answers[i].selected == answers[i].status && answers[i].status == true) {
    //     console.log(' do score = ' + score);
    //     setScore(score++);
    //     console.log(' posle score = ' + score);
    // }
    //   answers.selected = false;
    // }
    setNumber(++number);
  };


  return (
    <div className="ts__question">
      <h3 className="ts__progress"><span className="ts__progress-passed">{number}</span>/{amount}</h3>
      <h4 className="ts__question-title">{number+1}. <span className="ts__question-text">{question.title}</span></h4>
      <ul className="ts__answer-list">
      { !answers.loading ? 
        (
          answers.answersList.map((answer) => <Answer key={"answer_" + answer.id} answer={answer}/>)
        ) : 
        (
          <>Загрузка...</>
        )
      }
      </ul>  
      <div className="ts__progress-bar">
        <div className="ts__progress-bar-load" style={{width: (number/amount)*100 + '%'}}></div>
      </div> 
      { number != amount-1 ?
        (
          <div className="ts__arrows" onClick={(e) => nextQuestion(e)}>
            <div className="js__btn-back button-dark button-global">
              <span className="button__arrow button__arrow_right"></span>
            </div>
          </div>
        ) : 
        (
          <a className="ts__arrows" href='/result'>
            <div className="js__btn-back button-dark button-global">
              Готово
            </div>
          </a>
        )
      }
    </div>
  );
};

export default Question;
