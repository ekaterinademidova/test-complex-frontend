import React, { useState, useEffect } from "react";
// import TableRow from "./TableRowCategory";
import axios from 'axios';
import Loading from "./Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import TestManagement from "./TestManagement";

const Topics = ({setShowModal, setModal, perform, setPerform}) => {
  let [data, setData] = useState([]);
  let [categoriesList, setCategoriesList] = useState([]);
  let [chaptersList, setChaptersList] = useState([]);
  let [currentChapters, setCurrentChapters] = useState([]);
  let [currentChaptersField, setCurrentChaptersField] = useState([]);
  let [isLoading, setIsLoading] = useState(true);
  let [statusLoading, setStatusLoading] = useState('Загрузка...');
  let [status, setStatus] = useState('data');

  let [currentTopicId, setCurrentTopicId] = useState(null);
  let [topicTitle, setTopicTitle] = useState('');
  let [topicDesc, setTopicDesc] = useState('');
  let [topicCategoryId, setTopicCategoryId] = useState(0);
  let [selectedCategoryId, setSelectedCategoryId] = useState(0);
  let [topicChapterId, setTopicChapterId] = useState(0);
  let [topicLecture, setTopicLecture] = useState('');
  let [topicLab, setTopicLab] = useState('');

  let [filterData, setFilterData] = useState([]);
  let [searchText, setSearchText] = useState('');
  let [selectedOptionCategory, setSelectedOptionCategory] = useState(0);
  let [selectedOptionChapter, setSelectedOptionChapter] = useState(0);

  let [errorTitle, setErrorTitle] = useState(false);
  let [errorDesc, setErrorDesc] = useState(false);
  let [errorChapterId, setErrorChapterId] = useState(false);
  let [errorLecture, setErrorLecture] = useState(false);
  let [errorLab, setErrorLab] = useState(false);

  let [currentQuestions, setCurrentQuestions] = useState([]);
  let [currentQuestion, setCurrentQuestion] = useState(0);

  let [showTestManagement, setShowTestManagement] = useState(false);

  let [topicIsDeleted, setTopicIsDeleted] = useState(false);


  const removeModalTopic = {
    title: 'Удалить тему', 
    width: '400px',
    content: 'Вы уверены, что хотите удалить тему со всеми данными? Это действие невозможно будет отменить.',
    footerButtons: [
      {text: 'Отменить', type: 'secondary', visibility: true},
      {text: 'Удалить', type: 'danger', visibility: true}
    ]
  };

  const removeModalQuestion = {
    title: 'Удалить Ответ', 
    width: '400px',
    content: 'Вы уверены, что хотите удалить вопрос со всеми данными? Это действие невозможно будет отменить.',
    footerButtons: [
      {text: 'Отменить', type: 'secondary', visibility: true},
      {text: 'Удалить', type: 'danger', visibility: true}
    ]
  };

  const showData = (id) => {
    setIsLoading(true);
    const apiUrl = 'http://localhost:4000/topics?chapterId=' + id;
    axios.get(apiUrl)
      .then(res => {
        const data = res.data;
        setData(data);
        setFilterData(data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getCategories = () => {
    const apiUrl = 'http://localhost:4000/categories';
    axios.get(apiUrl)
      .then(res => {
        const list = res.data;
        setCategoriesList(list);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getChapters = (id) => {
    const apiUrl = 'http://localhost:4000/chapters?categoryId=' + id;
    axios.get(apiUrl)
      .then(res => {
        const list = res.data;
        setChaptersList(list);
        setCurrentChapters(list);
      })
        .catch(err => {
        console.log(err);
      });
  };

  const clearErrors = () => {
    setErrorTitle(false);
    setErrorDesc(false);
    setErrorChapterId(false);
    setErrorLecture(false);
    setErrorLab(false);
  };
  
  const clearFields = () => {
    setTopicTitle('');
    setTopicDesc('');
    setTopicCategoryId(0);
    setTopicChapterId(0);
    setTopicLecture('');
    setTopicLab('');
    setCurrentTopicId(0);
    setCurrentQuestions([]);
    clearErrors();
  };

  const checkValue = () => {
    topicTitle == '' ? setErrorTitle(true) : setErrorTitle(false);
    topicDesc == '' ? setErrorDesc(true) : setErrorDesc(false);
    topicChapterId == 0 ? setErrorChapterId(true) : setErrorChapterId(false);
    topicLecture == '' ? setErrorLecture(true) : setErrorLecture(false);
    topicLab == '' ? setErrorLab(true) : setErrorLab(false);
    if (topicTitle.length && topicDesc.length && topicLecture.length && topicLab.length && topicChapterId != 0) return true;
      else return false;
  };

  const createTopic = () => {
    if (checkValue()) {
      const apiUrl = 'http://localhost:4000/topics';
      axios.post(apiUrl, {
        //body
        Title: topicTitle,
        Description: topicDesc,
        ChapterId: topicChapterId,
        Lecture: topicLecture,
        Lab: topicLab
        })
        .then(res => {
          console.log(res);
          if (res) {
            showData(0);
            setStatus('data');
            clearFields();
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  const updateTopic = () => {
    if (checkValue()) {
      const apiUrl = 'http://localhost:4000/topics';
      axios.put(apiUrl, {
        //body
        Id: currentTopicId,
        Title: topicTitle,
        Description: topicDesc,
        ChapterId: topicChapterId,
        Lecture: topicLecture,
        Lab: topicLab
        })
        .then(res => {
          console.log(res);
          if (res) {
            showData(0);
            setStatus('data');
            clearFields();
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const deleteTopic = (id) => {
    setModal(removeModalTopic);
    setPerform({
      name: 'topics/',
      id: id,
      completed: false
    });
    setShowModal(true);
    setTopicIsDeleted(true);
  };

  useEffect(() => {
    if (perform.completed) {
      showData(0);
      getQuestions(currentTopicId);
      if (topicIsDeleted) setStatus('data');
    }
  }, [perform]);

  const deleteQuestion = (id) => {
    setModal(removeModalQuestion);
    setPerform({
      name: 'questions/',
      id: id,
      completed: false
    });
    setShowModal(true);
    setTopicIsDeleted(false);
  };

  const selectCategory = (id) => {
    if (id != 0) {
      let array = chaptersList.filter(item => item.categoryId == id);
      setCurrentChapters(array);
    } else {
      setCurrentChapters(chaptersList);
    }
  };

  const selectChapter = (id) => {
    setIsLoading(true);
    if (id != 0) {
      let array = data.filter(item => item.chapterId == id);
      setFilterData(array);
    } else {
      setFilterData(data);
    }
    setSearchText('');
  };
  
  const showChaptersField = (id) => {
    if (id != 0) {
      let array = chaptersList.filter(item => item.categoryId == id);
      setCurrentChaptersField(array);
    } else {
      setCurrentChaptersField(chaptersList);
    }
  };

  useEffect(() => {
    selectCategory(selectedOptionCategory);
  }, [selectedOptionCategory]);

  useEffect(() => {
    selectChapter(selectedOptionChapter);
  }, [selectedOptionChapter]);

  useEffect(() => {
    setTopicCategoryId(selectedCategoryId);
    showChaptersField(selectedCategoryId);
  }, [selectedCategoryId]);

  const search = (name) => {
    setIsLoading(true);
    let array = [];
    if (name != '') {
      if (selectedOptionChapter == 0){
        array = data.filter(item => item.title.includes(name));
      } else {
        array = data.filter(item => item.title.includes(name) 
                                && item.chapterId == selectedOptionChapter);
      }
      setFilterData(array);
    } else {
      if (selectedOptionChapter == 0){
        array = data;
      } else {
        array = data.filter(item => item.chapterId == selectedOptionChapter);
      }
      setFilterData(array);
      setTimeout(setIsLoading(false), 3000);
    }
  };
  
  const clickEnter = (key) => {
    if (key === 'Enter') {
      search(searchText);
    }
  };

  const getChapter = (topic) => {
    const apiUrl = 'http://localhost:4000/chapters/' + topic.chapterId;
    axios.get(apiUrl)
      .then(res => {
        const chapter = res.data;
        setTopicCategoryId(chapter.categoryId);
        if (res.data) {
          setTopicTitle(topic.title);
          setTopicDesc(topic.description);
          showChaptersField(selectedCategoryId);
          setTopicChapterId(topic.chapterId);
          setTopicLecture(topic.lecture);
          setTopicLab(topic.lab);
          setCurrentTopicId(topic.id);

          getQuestions(topic.id);
        }
      })
        .catch(err => {
          console.log(err);
      });
  }

  const getQuestions = (id) => {
    const apiUrl = 'http://localhost:4000/questions?topicId=' + id;
    axios.get(apiUrl)
      .then(res => {
        const questions = res.data;
        setCurrentQuestions(questions);
      })
        .catch(err => {
          console.log(err);
      });
  }

  const selectItem = (topic) => {
    getChapter(topic);
  };

  useEffect(() => {
    if (topicCategoryId != 0 && status == 'data') setStatus('editing');
  }, [topicCategoryId]);

  useEffect(() => {
    showData(0);
    getCategories();
    getChapters(0);
  }, []);

  useEffect(() => {
    if (data.length) {
      if (filterData.length) {
        setStatusLoading('Загрузка...')
        setIsLoading(false);
      } else {
        setStatusLoading('Записи не найдены.')
      }
    }
  }, [data, filterData]);
  
  return (
    <div className="data block">
      { status === 'data'? 
        (
          <div className="content">
            <div className="filter-area">
              <div className="search__wrap">
                <input style={{backgroundColor: '#f1f4f7'}} 
                      className="col-md-12 search" 
                      placeholder="Поиск..." 
                      value={searchText}
                      onChange={event => setSearchText(event.target.value)}
                      onKeyUp={(e) => clickEnter(e.key)}
                      id="title-search-input" 
                      type="text" 
                      name="q" 
                      size="40" 
                      maxLength="50" 
                      autoComplete="off" />
                <span className="search__submit" onClick={() => search(searchText)}></span>
                
              </div>
              <div className="search-filter-block"> 
                <label className="search-filter-label">Категория</label>
                <select className="select filter" defaultValue={0} onChange={e => setSelectedOptionCategory(Number(e.target.value))}>
                  <option className="option" key={'option_all'} value={0}>Все</option>
                    {categoriesList.map((item) => <option key={'option_cat' + item.id} className="option" value={item.id}>{item.title}</option>)}
                </select>
              </div>
              <div className="search-filter-block">
                <label className="search-filter-label">Раздел</label>
                <select className="select filter" defaultValue={0} onChange={e => setSelectedOptionChapter(Number(e.target.value))} disabled={ selectedOptionCategory != 0 ? false : true}>
                  <option className="option" key={'option_all'} value={0}>Все</option>
                    {currentChapters.map((item) => <option key={'option_chap' + item.id} className="option" value={item.id}>{item.title}</option>)}
                </select>
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Наименование</th>
                  <th style={{textAlign: 'center'}} colSpan="2"> 
                    <span className="add-btn btn"  style={{width: 100 + '%'}} onClick={() => setStatus('create-new')}>Добавить</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                { isLoading === false ? (
                  filterData.map((topic) => 
                    <tr className="table-row" key={"topic_" + topic.id} >
                      <td className="table-column" style={{width: 70 + '%'}}>{topic.title}</td>
                      <td className="table-column" style={{width: 15 + '%'}}><span className="edit-btn btn" onClick={() => selectItem(topic)}>Изменить</span></td>
                      <td className="table-column" style={{width: 15 + '%'}}><span className="remove-btn btn" onClick={() => deleteTopic(topic.id)}>Удалить</span></td>
                    </tr>)
                ) : (
                  <tr><td>{statusLoading}</td></tr>
                )}
              </tbody>
            </table>
          </div>
        ) : ( 
          <div className="data-columns">
            <div className="column-fields">
              <div className="field">
                  <label className="label">Название темы {errorTitle ? <span className="error">* это поле обязательно</span> : null}</label>
                  <div className="control">
                      <input className="input is-info" 
                        placeholder="Введите название" 
                        value={topicTitle}
                        onChange={event => setTopicTitle(event.target.value)}
                        style={{borderColor: errorTitle ? 'red' : '#8b9cab'}} 
                      />
                  </div>
              </div>
              <div className="field">
                  <label className="label">Описание {errorDesc ? <span className="error">* это поле обязательно</span> : null}</label>
                  <div className="control">
                      <textarea className="textarea is-info" 
                        placeholder="Введите описание"
                        value={topicDesc}
                        onChange={event => setTopicDesc(event.target.value)}
                        style={{borderColor: errorDesc ? 'red' : '#8b9cab'}} 
                      />
                  </div>
              </div>
              <div className="field">
                <label className="label">Категория</label>
                <div className="control">
                  <select className="select is-info" 
                    value={topicCategoryId}
                    onChange={e => setSelectedCategoryId(Number(e.target.value))} >
                    <option className="option" key={'choose_option_all'} value={0} disabled>Нет</option>
                      {categoriesList.map((item) => <option key={'choose_option_' + item.id} className="option" value={item.id}>{item.title}</option>)}
                  </select>
                </div>
              </div>
              <div className="field">
                <label className="label">Раздел {errorChapterId ? <span className="error">* это поле обязательно</span> : null}</label>
                <div className="control">
                  <select className="select is-info" 
                    value={topicChapterId}
                    onChange={e => setTopicChapterId(Number(e.target.value))}
                    disabled={ topicCategoryId != 0 ? false : true}
                    style={{borderColor: errorChapterId ? 'red' : '#8b9cab'}} >
                    <option className="option" key={'choose_option_all'} value={0} disabled>Нет</option>
                      {currentChaptersField.map((item) => <option key={'choose_option_' + item.id} className="option" value={item.id}>{item.title}</option>)}
                    </select>
                </div>
              </div>
              <div className="field">
                  <label className="label">Лекция {errorLecture ? <span className="error">* это поле обязательно</span> : null}</label>
                  <div className="control">
                      <input className="input is-info" 
                        placeholder="Введите название" 
                        value={topicLecture}
                        onChange={event => setTopicLecture(event.target.value)}
                        style={{borderColor: errorLecture ? 'red' : '#8b9cab'}} 
                      />
                  </div>
              </div>
              <div className="field">
                  <label className="label">Лабораторная работа {errorLab ? <span className="error">* это поле обязательно</span> : null}</label>
                  <div className="control">
                  <input className="input is-info" 
                        placeholder="Введите название" 
                        value={topicLab}
                        onChange={event => setTopicLab(event.target.value)}
                        style={{borderColor: errorLab ? 'red' : '#8b9cab'}} 
                      />
                  </div>
              </div>
              { status === 'create-new' ? (
                <button className="add-btn btn" onClick={createTopic}>Добавить тему</button>
              ) : (
                <button className="edit-btn btn" onClick={updateTopic}>Обновить тему</button>
              )}
              <button className="btn" onClick={() => {setStatus('data'); clearFields();}}>Закрыть</button>
            </div>
            {showTestManagement && 
              <TestManagement currentQuestion={currentQuestion}
                currentTopicId={currentTopicId}
                getQuestions={getQuestions}
                setShowTestManagement={setShowTestManagement}
                setShowModal={setShowModal} 
                setModal={setModal} 
                perform={perform} 
                setPerform={setPerform} />
            }
            { status === 'editing' ? 
                currentQuestions.length ? (
                  <div className="column-fields">
                    <div className="data-block">
                      <label className="label">Вопросы: </label>
                      <span className="add small-btn"  style={{width: 100 + '%'}} onClick={() => {setShowTestManagement(true); setCurrentQuestion(null);}}>
                        <FontAwesomeIcon icon={faPlus} />
                      </span>
                    </div>
                    <div className="questions-list is-info"> 
                      {currentQuestions.map((question) => 
                        <div className="data-block"  key={"question_" + question.id}>
                          <span className="data-link">
                            {question.title}
                          </span>
                          <div className="data-block buttons">
                            <span className="edit small-btn" onClick={() => {setShowTestManagement(true); setCurrentQuestion(question);}}>
                              <FontAwesomeIcon icon={faEdit} />
                            </span>
                            <span className="remove small-btn">
                              <FontAwesomeIcon icon={faTrash} onClick={() => deleteQuestion(question.id)}/>
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <span>Список вопросов пока пуст.</span>
                )
              : (
                <span className="instruction">Чтобы добавить вопросы с ответами, сохраните текущие данные, 
                  после найдите созданную тему в списке и нажмите кнопку "Изменить". <br/>
                  Область для работы с тестом к теме станет доступной.</span>
              )
            }
          </div>
          
        )
      }
    </div>
  );
};

export default Topics;
