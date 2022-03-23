import React, { useState, useEffect } from "react";
import axios from 'axios';


const Categories = ({setShowModal, setModal, perform, setPerform}) => {
  let [data, setData] = useState([]);
  let [isLoading, setIsLoading] = useState(true);
  let [statusLoading, setStatusLoading] = useState('Загрузка...');
  let [status, setStatus] = useState('data');

  let [currentCategory, setCurrentCategory] = useState(null);
  let [categoryTitle, setCategoryTitle] = useState('');
  let [categoryDesc, setCategoryDesc] = useState('');

  let [filterData, setFilterData] = useState([]);
  let [searchText, setSearchText] = useState('');

  let [errorTitle, setErrorTitle] = useState(false);
  let [errorDesc, setErrorDesc] = useState(false);

  const removeModal = {
    title: 'Удалить категорию', 
    width: '400px',
    content: 'Вы уверены, что хотите удалить категорию? Это действие невозможно будет отменить.',
    footerButtons: [
      {text: 'Отменить', type: 'secondary', visibility: true},
      {text: 'Удалить', type: 'danger', visibility: true}
    ]
  };

  const warningModal = {
    title: 'Удаление невозможно', 
    width: '400px',
    content: 'В системе присутствуют данные, ссылающиеся на данную категорию.',
    footerButtons: [
      {text: 'Закрыть', type: 'danger', visibility: true},
      {text: '', type: '', visibility: false}
    ]
  };

  const showData = () => {
    setIsLoading(true);
    const apiUrl = 'http://localhost:4000/categories';
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
  
  const clearErrors = () => {
    setErrorTitle(false);
    setErrorDesc(false);
  }
  const clearFields = () => {
    setCategoryTitle('');
    setCategoryDesc('');
    setCurrentCategory(0);
    clearErrors();
  };

  const checkValue = () => {
    categoryTitle == '' ? setErrorTitle(true) : setErrorTitle(false);
    categoryDesc == '' ? setErrorDesc(true) : setErrorDesc(false);
    if (categoryTitle.length && categoryDesc.length) return true;
      else return false;
  };

  const createCategory = () => {
    if (checkValue()) {
      const apiUrl = 'http://localhost:4000/categories';
      axios.post(apiUrl, {
        Title: categoryTitle,
        Description: categoryDesc
      })
        .then(res => {
          console.log(res);
          if (res) {
            showData();
            setStatus('data');
            clearFields();
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const updateCategory = () => {
    if (checkValue()) {
      const apiUrl = 'http://localhost:4000/categories';
      axios.put(apiUrl, {
        Id: currentCategory,
        Title: categoryTitle,
        Description: categoryDesc
        })
        .then(res => {
          console.log(res);
          if (res) {
            showData();
            setStatus('data');
            clearFields();
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const deleteCategory = (id) => {
    const apiUrl = 'http://localhost:4000/chapters?categoryId=' + id;
      axios.get(apiUrl)
        .then(res => {
          if (res.data.length) {
            setModal(warningModal);
            setShowModal(true);
          } else {
            setModal(removeModal);
            setPerform({
              name: 'categories/',
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
      showData();
      setStatus('data');
    }
  }, [perform]);

  const selectItem = (category) => {
    clearErrors();
    setCategoryTitle(category.title);
    setCategoryDesc(category.description);
    setCurrentCategory(category.id);
    setStatus('editing');
  };

  useEffect(() => {
    showData();
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

  const search = (name) => {
    setIsLoading(true);
    if (name != '') {
      let array = data.filter(category => category.title.includes(name));
      setFilterData(array);
    } else {
      setFilterData(data);
      setTimeout(setIsLoading(false), 3000);
    }
  };

  const clickEnter = (key) => {
    if (key === 'Enter') {
      search(searchText);
    }
  };

  return (
    <div className="data block">
      { status === 'data'? 
        (
          <div className="content">
            <div className="search__wrap">
              <input style={{backgroundColor: '#f1f4f7'}} 
                    className="search" 
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
                  filterData.map((category) => 
                    <tr className="table-row" key={"category_" + category.id} >
                      <td className="table-column" style={{width: 70 + '%'}}>{category.title}</td>
                      <td className="table-column" style={{width: 15 + '%'}}><span className="edit-btn btn" onClick={() => selectItem(category)}>Изменить</span></td>
                      <td className="table-column" style={{width: 15 + '%'}}><span className="remove-btn btn" onClick={() => deleteCategory(category.id)}>Удалить</span></td>
                    </tr>)
                ) : (
                  <tr><td>{statusLoading}</td></tr>
                )}
               
              </tbody>
            </table>
          </div>
        ) : ( 
          <div className="column-fields">
            <div className="field">
                <label className="label">Название категории {errorTitle ? <span className="error">* это поле обязательно</span> : null}</label>
                <div className="control">
                    <input className="input is-info" 
                      placeholder="Введите название" 
                      value={categoryTitle}
                      onChange={event => setCategoryTitle(event.target.value)}
                      style={{borderColor: errorTitle ? 'red' : '#8b9cab'}} 
                    />
                </div>
            </div>
            <div className="field">
                <label className="label">Описание {errorDesc ? <span className="error">* это поле обязательно</span> : null}</label>
                <div className="control">
                    <textarea className="textarea is-info" 
                      placeholder="Введите описание"
                      value={categoryDesc}
                      onChange={event => setCategoryDesc(event.target.value)}
                      style={{borderColor: errorDesc ? 'red' : '#8b9cab'}} 
                    />
                </div>
            </div>
            { status === 'create-new' ? (
              <button className="add-btn btn" onClick={createCategory}>Добавить категорию</button>
            ) : (
              <button className="edit-btn btn" onClick={updateCategory}>Обновить категорию</button>
            )}
            <button className="btn" onClick={() => {setStatus('data');  clearFields();}}>Закрыть</button>
          </div>
          
        )
      }
    </div>
  );
};

export default Categories;
