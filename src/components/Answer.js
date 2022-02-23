import React, { useState } from "react";


const Answer = ({answer}) => {
  let [selectedAnswer, setSelectedAnswer] = useState(false);

  const chooseAnswer = () => {
    setSelectedAnswer(!selectedAnswer);

    //ханести выбранные ответы

    // for(let i = 0; i < array.length; i++) {
    //   if(array[i].id == id) {
    //     array[i].selected = !selectedAnswer;
    //   }
    // }
    // setAnswers([...array.map(item => {
    //   if(item.id === id) {
    //     item.selected = !selectedAnswer;
    //   }
    //   return item;
    // })]);
    // answer.setSelected(selectedAnswer);
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
