import React, { useState, useEffect } from "react";
import axios from 'axios';


const Chapters = ({setShowModal, setModal, perform, setPerform}) => {
    let [data, setData] = useState([]);
    let [categoriesList, setCategoriesList] = useState([]);
    let [isLoading, setIsLoading] = useState(true);
    let [statusLoading, setStatusLoading] = useState('Загрузка...');
    let [status, setStatus] = useState('data');
  
    let [currentChapter, setCurrentChapter] = useState(null);
    let [chapterTitle, setChapterTitle] = useState('');
    let [chapterDesc, setChapterDesc] = useState('');
    let [chapterCategoryId, setChapterCategoryId] = useState(0);
  
    let [filterData, setFilterData] = useState([]);
    let [searchText, setSearchText] = useState('');
    let [selectedOption, setSelectedOption] = useState(0);

    let [errorTitle, setErrorTitle] = useState(false);
    let [errorDesc, setErrorDesc] = useState(false);
    let [errorCategoryId, setErrorCategoryId] = useState(false);


    const removeModal = {
      title: 'Удалить раздел', 
      width: '400px',
      content: 'Вы уверены, что хотите удалить раздел? Это действие невозможно будет отменить.',
      footerButtons: [
        {text: 'Отменить', type: 'secondary', visibility: true},
        {text: 'Удалить', type: 'danger', visibility: true}
      ]
    };

    const warningModal = {
      title: 'Удаление невозможно', 
      width: '400px',
      content: 'В системе присутствуют данные, ссылающиеся на данный раздел.',
      footerButtons: [
        {text: 'Закрыть', type: 'danger', visibility: true},
        {text: '', type: '', visibility: false}
      ]
    };

    const showData = (id) => {
      setIsLoading(true);
      const apiUrl = 'http://localhost:4000/chapters?categoryId=' + id;
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

    const clearErrors = () => {
      setErrorTitle(false);
      setErrorDesc(false);
      setErrorCategoryId(false);
    };
    
    const clearFields = () => {
      setChapterTitle('');
      setChapterDesc('');
      setChapterCategoryId(0);
      setCurrentChapter(0);
      clearErrors();
    };

    const checkValue = () => {
      chapterTitle == '' ? setErrorTitle(true) : setErrorTitle(false);
      chapterDesc == '' ? setErrorDesc(true) : setErrorDesc(false);
      chapterCategoryId == 0 ? setErrorCategoryId(true) : setErrorCategoryId(false);
      if (chapterTitle.length && chapterDesc.length && chapterCategoryId != 0) return true;
        else return false;
    };
  
    const createChapter = () => {
      
      if (checkValue()) {
        const apiUrl = 'http://localhost:4000/chapters';
        axios.post(apiUrl, {
          //body
          Title: chapterTitle,
          Description: chapterDesc,
          CategoryId: chapterCategoryId
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
  
    const updateChapter = () => {
      if (checkValue()) {
        const apiUrl = 'http://localhost:4000/chapters';
        axios.put(apiUrl, {
          //body
          Id: currentChapter,
          Title: chapterTitle,
          Description: chapterDesc,
          CategoryId: chapterCategoryId
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

    const deleteChapter = (id) => {
      const apiUrl = 'http://localhost:4000/topics?chapterId=' + id;
        axios.get(apiUrl)
          .then(res => {
            if (res.data.length) {
              setModal(warningModal);
              setShowModal(true);
            } else {
              setModal(removeModal);
              setPerform({
                name: 'chapters/',
                id: id,
                completed: false
              });
              setShowModal(true);
            }
          })
          .catch(err => {
            console.log(err);
          });
    };

    useEffect(() => {
      if (perform.completed) {
        showData(0);
        setStatus('data');
      }
    }, [perform]);

    const selectCategory = (id) => {
      setIsLoading(true);
      if (id != 0) {
        let array = data.filter(item => item.categoryId == id);
        setFilterData(array);
      } else {
        setFilterData(data);
      }
      setSearchText('');
    };

    useEffect(() => {
      selectCategory(selectedOption);
    }, [selectedOption]);

    const search = (name) => {
      setIsLoading(true);
      let array = [];
      if (name != '') {
        if (selectedOption == 0){
          array = data.filter(item => item.title.includes(name));
        } else {
          array = data.filter(item => item.title.includes(name) 
                                  && item.categoryId == selectedOption);
        }
        setFilterData(array);
      } else {
        if (selectedOption == 0){
          array = data;
        } else {
          array = data.filter(item => item.categoryId == selectedOption);
        }
        setFilterData(array);
        setTimeout(setIsLoading(false), 3000);
      }
    };

    const selectItem = (chapter) => {
      setChapterTitle(chapter.title);
      setChapterDesc(chapter.description);
      setChapterCategoryId(chapter.categoryId)
      setCurrentChapter(chapter.id);
      setStatus('editing');
    };

    const clickEnter = (key) => {
      if (key === 'Enter') {
        search(searchText);
      }
    };

    useEffect(() => {
      showData(0);
      getCategories();
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
                <select className="select" defaultValue={0} onChange={e => setSelectedOption(Number(e.target.value))}>
                  <option className="option" key={'option_all'} value={0}>Все</option>
                    {categoriesList.map((item) => <option key={'option_' + item.id} className="option" value={item.id}>{item.title}</option>)}
                </select>
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
                    filterData.map((chapter) => 
                      <tr className="table-row" key={"chapter_" + chapter.id} >
                        <td className="table-column" style={{width: 70 + '%'}}>{chapter.title}</td>
                        <td className="table-column" style={{width: 15 + '%'}}><span className="edit-btn btn" onClick={() => selectItem(chapter)}>Изменить</span></td>
                        <td className="table-column" style={{width: 15 + '%'}}><span className="remove-btn btn" onClick={() => deleteChapter(chapter.id)}>Удалить</span></td>
                      </tr>)
                  ) : (
                    <tr><td>{statusLoading}</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : ( 
            <div  className="column-fields">
              <div className="field">
                  <label className="label">Название раздела {errorTitle ? <span className="error">* это поле обязательно</span> : null}</label>
                  <div className="control">
                      <input className="input is-info" 
                        placeholder="Введите название" 
                        value={chapterTitle}
                        onChange={event => setChapterTitle(event.target.value)}
                        style={{borderColor: errorTitle ? 'red' : '#8b9cab'}} 
                      />
                  </div>
              </div>
              <div className="field">
                  <label className="label">Описание {errorDesc ? <span className="error">* это поле обязательно</span> : null}</label>
                  <div className="control">
                      <textarea className="textarea is-info" 
                        placeholder="Введите описание"
                        value={chapterDesc}
                        onChange={event => setChapterDesc(event.target.value)}
                        style={{borderColor: errorDesc ? 'red' : '#8b9cab'}} 
                      />
                  </div>
              </div>
              <div className="field">
                <label className="label">Категория {errorCategoryId ? <span className="error">* это поле обязательно</span> : null}</label>
                <div className="control">
                  <select className="select is-info" 
                    value={chapterCategoryId}
                    onChange={e => setChapterCategoryId(Number(e.target.value))}
                    style={{borderColor: errorCategoryId ? 'red' : '#8b9cab'}} >
                    <option className="option" key={'choose_option_all'} value={0} disabled>Нет</option>
                      {categoriesList.map((item) => <option key={'choose_option_' + item.id} className="option" value={item.id}>{item.title}</option>)}
                  </select>
                </div>
              </div>
              { status === 'create-new' ? (
                <button className="add-btn btn" onClick={createChapter}>Добавить раздел</button>
              ) : (
                <button className="edit-btn btn" onClick={updateChapter}>Обновить раздел</button>
              )}
              <button className="btn" onClick={() => {setStatus('data');  clearFields();}}>Закрыть</button>
            </div>
            
          )
        }
      </div>
    );
};

export default Chapters;
