import React, { useState, useEffect } from "react";


const Answer = ({answer, selectedAnswers, setSelectedAnswers}) => {
  let [selectedAnswer, setSelectedAnswer] = useState(false);

  let array = selectedAnswers;

  useEffect(() => {
    if (selectedAnswer) {
      array.push(answer.id);
    } else {
      var index = array.indexOf(answer.id);
      if (index > -1) {
        array.splice(index, 1);
      }
    }
    setSelectedAnswers(array);
  }, [selectedAnswer]);

  const chooseAnswer = () => {
    setSelectedAnswer(!selectedAnswer);
  };

  return (
    <li className="ts__answer-li" onClick={chooseAnswer}>
      <label className={selectedAnswer ? "ts__question-label selected" : "ts__question-label"} >
        <span className="ts__question-answer-text">{answer.title}</span>
      </label>
    </li>
  );
};

export default Answer;
