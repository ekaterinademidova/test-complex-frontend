import React from 'react';
import '../css/Modal.css';
import '../css/Result.css';
import axios from 'axios';

export default function Result({result, setShowResult, questions}) {


  const { progress, wrongQuestions } = result;

  let wrongs = questions.filter(item => wrongQuestions.includes(item.id));

  const formatedTime = (time) => {
    const formattedSeconds = (time.seconds < 10 ? '0' : '') + time.seconds;
    const formattedMinutes = (time.minutes < 10 ? '0' : '') + time.minutes;
    const formattedHours = (time.hours < 10 ? '0' : '') + time.hours;
    
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  const cancel = () => {
    setShowResult(false);
  };

  return (
    <div className="modal-overlay result">
      <div className="modal-window result">
        {/* <div className="modal-header">
          <span className="modal-title">Ваш результат!</span>
        </div> */}
        <div className="modal-body"> 
            <span className="modal-title">Ваш результат!</span>
          <div className="result-data">
            <img src="http://localhost:3000/static/media/result.15712616.png"></img>
            <div className="result-mark">{progress.mark}%</div>
            
          </div>
          <div className="result-time">
              <span className="text">Время прохождения</span>
              <br/>
              <span className="time">{formatedTime(progress.testTime)}</span>
            </div>
          <ol className="result-wrongs">
            {
              wrongs.map((wrong) => <li key={"wrong_" + wrong.id}>{wrong.title}</li>)
            }
          </ol>
        </div>
        <div className="modal-footer">
          <button className={"btn btn-danger"} 
            onClick={cancel}
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};