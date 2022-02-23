import React, {useState, useEffect} from 'react';

import Loading from "../components/Loading";
import { withAuthenticationRequired } from "@auth0/auth0-react";

import '../css/Test.css';
import Question from '../components/Question';
import axios from 'axios';



export const Test = () => {
  let [number, setNumber] = useState(0);

  const [questions, setQuestions] = useState(
    {
      loading: false,
      questionsList: [],
    }
  );

  const getQuestions = (topicId) => {
    setQuestions({loading: true})
    const apiUrl1 = 'http://localhost:4000/questions?topicId=' + topicId;
    axios.get(apiUrl1)
      .then(res => {
        console.log(res);
        const allQuestions = res.data;
        setQuestions({
          loading: false,
          questionsList: allQuestions
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  getQuestions(1);
  shuffle(questions.questionsList);

  useEffect(() => {
    console.log(questions.questionsList);
  }, []);

  

  // let [score, setScore] = useState(0);

  return (
    <div id="content" className=" ts__container">
      <a href="/topics/" className="ts__exit-btn" title="В список тестов"></a>
      <article className="ts__wrapper" itemScope="" itemType="https://schema.org/CreativeWork">
        <form className="ts__form ts__section__business ts__class__">
          <div className="ts__background-color">
            <section className="container">
              { !questions.loading ? 
                (
                  <Question key={"question_" + questions.questionsList[number].id}
                            question={questions.questionsList[number]} 
                            number={number} 
                            setNumber={setNumber}
                            amount={questions.questionsList.length}
                            // score={score}
                            // setScore={setScore}
                            />
                ) : 
                (
                  <>Загрузка...</>
                )
              }
            </section>
          </div>
        </form>
      </article>
		</div>
  );
}

export default withAuthenticationRequired(Test, {
  onRedirecting: () => <Loading />,
});