import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
// import { withAuthenticationRequired } from "@auth0/auth0-react";

import '../css/Test.css';
import Question from '../components/Question';
import axios from 'axios';



export const Test = () => {
  const params = useParams();
  let [selectedTopic, setSelectedTopic] = useState(params.id);
  
  let [number, setNumber] = useState(0);
  let [isLoading, setIsLoading] = useState(true);

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  let [questions, setQuestions] = useState([]);

  let [userAnswers, setUserAnswers] = useState([]); 

  useEffect(() => {
    const apiUrl = 'http://localhost:4000/questions?topicId=' + selectedTopic;
    axios.get(apiUrl)
      .then(res => {
        const allQuestions = res.data;
        shuffle(allQuestions);
        setQuestions(allQuestions);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);


  const [ time, setTime ] = useState(null);

  useEffect(() => {
    if (questions.length) {
      setTime(new Date());
      setIsLoading(false);
    }
  }, [questions]);

  useEffect(() => {
    setSelectedTopic(params.id)
  });

  return (
    <div id="content" className=" ts__container">
      <a href="/topics/" className="ts__exit-btn" title="В список тестов"></a>
      <article className="ts__wrapper" itemScope="" itemType="https://schema.org/CreativeWork">
        <form className="ts__form ts__section__business ts__class__">
          <div className="ts__background-color">
            <section className="container">
              { isLoading === false ? 
                (
                  <Question key={"question_" + questions[number].id}
                            question={questions[number]} 
                            number={number} 
                            setNumber={setNumber}
                            questions={questions}
                            userAnswers={userAnswers}
                            setUserAnswers={setUserAnswers}
                            time={time}
                            selectedTopic={selectedTopic}
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

export default Test;
// export default withAuthenticationRequired(Test, {
//   onRedirecting: () => <Loading />,
// });