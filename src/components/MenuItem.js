import React, { useState, useEffect } from "react";
import MenuInnerItem from "./MenuInnerItem";
import axios from 'axios';


const MenuItem = ({category, setSelectedChapter}) => {

  let [statusInnerList, setStatusInnerList] = useState(false);

  const showInnerList = () => {
    setStatusInnerList(!statusInnerList);
  };

  const [chapters, setChapters] = useState(
    {
      loading: false,
      chaptersList: [],
    }
  );

  useEffect(() => {
    setChapters({loading: true})
    const apiUrl1 = 'http://localhost:4000/chapters?categoryId=' + category.id;
    axios.get(apiUrl1)
      .then(res => {
        console.log(res);
        const allChapters = res.data;
        setChapters({
          loading: false,
          chaptersList: allChapters
        });
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <li className={statusInnerList ? "side-menu__main-list_item opened-subnav" : "side-menu__main-list_item"}>
      <span className="side-menu__item_plus" onClick={showInnerList}></span>
      <span className="side-menu__main-list_link" aria-disabled>{category.title}</span>

      <ul className="side-menu__inner-list">
        { showInnerList ?
          !chapters.loading ? 
          (
            chapters.chaptersList.map((chapter) => <MenuInnerItem key={"chapter_" + chapter.id} chapter={chapter} setSelectedChapter={setSelectedChapter}/>)
          ) : 
          (
            <>Загрузка...</>
          ) :
          null
        }
      </ul>
    </li>
  );
};

export default MenuItem;
