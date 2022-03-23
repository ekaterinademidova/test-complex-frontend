import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Modal from "../components/Modal";
import axios from 'axios';

import '../css/Modal.css';
import '../css/TestManagement.css';


export default function TestManagement({currentQuestion, currentTopicId, getQuestions, 
                                        setShowTestManagement, setShowModal, setModal, 
                                        perform, setPerform}) {

  let [questionTitle, setQuestionTitle] = useState('');
  let oldQuestionTitle;
  let [answerTitle, setAnswerTitle] = useState('');
  let [answerStatus, setAnswerStatus] = useState(false);

  let [errorQuestionTitle, setErrorQuestionTitle] = useState(false);
  let [errorAnswerTitle, setErrorAnswerTitle] = useState(false);

  let [answers, setAnswers] = useState([]);

  const removeModal = {
    title: 'Удалить Ответ', 
    width: '400px',
    content: 'Вы уверены, что хотите удалить ответ? Это действие невозможно будет отменить.',
    footerButtons: [
      {text: 'Отменить', type: 'secondary', visibility: true},
      {text: 'Удалить', type: 'danger', visibility: true}
    ]
  };

  const getAnswers = (id) => {
    const apiUrl = 'http://localhost:4000/answers?questionId=' + id;
    axios.get(apiUrl)
      .then(res => {
        const data = res.data;
        setAnswers(data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const checkValueQuestion = () => {
    if (questionTitle == '') {
      setErrorQuestionTitle(true);
      return false;
    } else {
      setErrorQuestionTitle(false);
      return true;
    }
  };

  const checkValueAnswer = () => {
    if (answerTitle == '') {
      setErrorAnswerTitle(true);
      return false;
    } else {
      setErrorQuestionTitle(false);
      return true;
    }
  };

  const createQuestion = () => {
    if (checkValueQuestion()) {
      const apiUrl = 'http://localhost:4000/questions';
      axios.post(apiUrl, {
        //body
        Title: questionTitle,
        TopicId: currentTopicId
        })
        .then(res => {
          console.log(res);
          if (res) {
            getQuestions(currentTopicId);
            setShowTestManagement(false);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const updateQuestion = (id) => {
    if (checkValueQuestion()) {
      const apiUrl = 'http://localhost:4000/questions';
      axios.put(apiUrl, {
        //body
        Id: id,
        Title: questionTitle,
        TopicId: currentTopicId
        })
        .then(res => {
          console.log(res);
          if (res) {
            getQuestions(currentTopicId);
            setShowTestManagement(false);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const createAnswer = () => {
    if (checkValueAnswer()) {
      console.log(answerTitle + ' ' + answerStatus)
      const apiUrl = 'http://localhost:4000/answers';
      axios.post(apiUrl, {
        //body
        Title: answerTitle,
        Status: answerStatus,
        QuestionId: currentQuestion.id
        })
        .then(res => {
          console.log(res);
          if (res) {
            getAnswers(currentQuestion.id);
            setAnswerTitle('');
            setAnswerStatus(false);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const deleteAnswer = (id) => {
    const apiUrl = 'http://localhost:4000/answers/' + id;
    axios.delete(apiUrl)
      .then(res => {
        console.log(res);
        if (res) {
          getAnswers(currentQuestion.id);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const cancel = () => {
    if (oldQuestionTitle != questionTitle) {
      console.log('currentQuestion.id ' + currentQuestion.id)
      updateQuestion(currentQuestion.id);
    }
      else setShowTestManagement(false);
  };

  useEffect(() => {
    if (currentQuestion != null) {
      getAnswers(currentQuestion.id);
      setQuestionTitle(currentQuestion.title);
      oldQuestionTitle = currentQuestion.title;
    }
  }, []);

  return (
    <div className="modal-overlay test-management">
      <div className="modal-window test-management" style={currentQuestion != null ? {width: 90 + '%'} : {width: 400 + 'px'}}>
        <div className="modal-header">
          <span className="modal-title">
            {currentQuestion != null ? "Редактирование" : "Создание"}
          </span>
        </div>
        <div className="modal-body">
          <div className="field">
            <label className="label">Содержимое вопроса {errorQuestionTitle ? <span className="error">* это поле обязательно</span> : null}</label>
            <div className="control">
                <input className="input is-info" 
                  placeholder="Введите содержимое вопроса" 
                  value={questionTitle}
                  onChange={event => setQuestionTitle(event.target.value)}
                  style={{borderColor: errorQuestionTitle ? 'red' : '#8b9cab'}} 
                />
            </div>
          </div>
          { currentQuestion != null && (
            <div className="data-columns">
              <div className="column-fields">
                <label className="label">Ответы: </label>
                <div className="answers-list is-info"> 
                  { answers.length ? (
                    answers.map((answer) => 
                      <div className="data-block" key={"question_" + answer.id}>
                        <span className="data-link">
                          {answer.title}
                        </span>
                        <div className="buttons">
                          <span className="remove small-btn" onClick={() => deleteAnswer(answer.id)}>
                            <FontAwesomeIcon icon={faTrash} />
                          </span>
                        </div>
                      </div>)
                    ) : (
                      <div style={{height: 240 + 'px'}}>Пусто</div>
                    )
                  }
                </div>
              </div>
              <div className="column-fields">
                <div className="field answer">
                  <label className="label">Содержимое  ответа {errorAnswerTitle ? <span className="error">* это поле обязательно</span> : null}</label>
                  <div className="control">
                    <input className="input is-info" 
                      placeholder="Введите содержимое ответа" 
                      value={answerTitle}
                      onChange={event => setAnswerTitle(event.target.value)}
                      style={{borderColor: errorAnswerTitle ? 'red' : '#8b9cab'}} 
                    />
                  </div>
                  <div className="answer-status">
                    <label className="label small">Ответ является верным?</label>
                    <input className="checkbox" 
                      type="checkbox"
                      checked={answerStatus}
                      onChange={() => setAnswerStatus(!answerStatus)}
                    />
                  </div>
                  <span className="add-btn btn" onClick={createAnswer}>
                    Добавить ответ
                  </span>
                </div>
              </div>
            </div>
          )}
          
        </div>
        <div className="modal-footer">
          { currentQuestion != null ? (
            <button className={"btn btn-danger"} 
              onClick={cancel}>
              Готово
            </button>
          ) : (
            <>
              <button className={"btn btn-secondary"} 
                onClick={() => setShowTestManagement(false)}>
                Закрыть
              </button>
              <button className={"btn btn-danger"} 
                onClick={createQuestion}>
                Добавить
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};