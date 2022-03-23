import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MenuInnerItem from "./MenuInnerItem";
import axios from 'axios';


const MenuItem = ({category, setStatusMenu}) => {

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
        const allChapters = res.data;
        setChapters({
          loading: false,
          chaptersList: allChapters.filter(chapter => chapter.topicsCount > 0)
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
            chapters.chaptersList.map((chapter) => <Link to={"/chapter/" + chapter.id} key={"chapter_" + chapter.id} onClick={() => setStatusMenu(false)}>
                                                      <MenuInnerItem chapter={chapter} />
                                                    </Link>)
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
