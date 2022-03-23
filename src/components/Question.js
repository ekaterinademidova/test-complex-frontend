import React, { useState, useEffect } from "react";
import Answer from './Answer';
import axios from 'axios';
import Result from "./Result";
import moment from 'moment';
import 'moment-timezone';
import 'moment-precise-range-plugin';
const Question = ({question, number, setNumber, questions, userAnswers, setUserAnswers, time, selectedTopic}) => {

  const amount = questions.length;
  let [selectedAnswers, setSelectedAnswers] = useState([]);
  let [showResult, setShowResult] = useState(false);
  let [result, setResult] = useState(null);

  const [answers, setAnswers] = useState(
    {
      loading: false,
      answersList: [],
    }
  );

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const diff = (start, end) => {
    // var d1 = moment(dateToHHMM_DDMMYY(start),'YYYY-MM-DD HH:mm:ss');
    // var d2 = moment(dateToHHMM_DDMMYY(end),'YYYY-MM-DD HH:mm:ss');
    // let time = moment.preciseDiff(d1, d2, true); 
    let time = moment.preciseDiff(start, end, true); 

    return time;
  };



  useEffect(() => {
    setAnswers({loading: true})
    const apiUrl = 'http://localhost:4000/answers?questionId=' + question.id;
    axios.get(apiUrl)
      .then(res => {
        const allAnswers = res.data;
        shuffle(allAnswers);
        setAnswers({
          loading: false,
          answersList: allAnswers
        });
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const enterAnswer = () => {
    let array = userAnswers;
    array.push( 
      {
        questionId: question.id,
        selectedAnswers: selectedAnswers
      }
    );
    setUserAnswers(array);
  };

  const nextQuestion = () => {
    enterAnswer();
    setNumber(++number);
  };

  const checkResult = () => {
    enterAnswer();
    let userTime = diff(time, new Date());

    const apiUrl = 'http://localhost:4000/progresses';
    axios.post(apiUrl, {
      //body
      UserId: 1,
      TopicId: selectedTopic, 
      UserTime: {
        Hours: userTime.hours,
        Minutes: userTime.minutes,
        Seconds: userTime.seconds
      },
      UserAnswers: userAnswers
      })
      .then(res => {
        setResult(res.data);
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
  
  useEffect(() => {
    if (result != null) {
      console.log('result changed ' + showResult)
      console.log(result)
      setShowResult(true);
    }
  }, [result]);

  return (
    <div className="ts__question">
      {showResult && 
        <Result result={result} 
          setShowResult={setShowResult}
          questions={questions}
          />
      }
      <h3 className="ts__progress"><span className="ts__progress-passed">{number}</span>/{amount}</h3>
      <h4 className="ts__question-title">{number+1}. <span className="ts__question-text">{question.title}</span></h4>
      <ul className="ts__answer-list">
      { !answers.loading ? 
        (
          answers.answersList.map((answer) => <Answer key={"answer_" + answer.id} 
                                                      answer={answer} 
                                                      selectedAnswers={selectedAnswers}
                                                      setSelectedAnswers={setSelectedAnswers}
                                                      />)
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
          <div className="ts__arrows" onClick={nextQuestion}>
            <div className="js__btn-back button-dark button-global">
              <span className="button__arrow button__arrow_right"></span>
            </div>
          </div>
        ) : 
        (
          <a className="ts__arrows" onClick={checkResult}>
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
