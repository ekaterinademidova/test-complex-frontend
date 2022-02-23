import React from "react";
import { useHistory } from "react-router-dom";


const MenuInnerItem = ({chapter, setSelectedChapter}) => {

  const history = useHistory();

  const chooseChapter = (id) => {
    setSelectedChapter(id); 
    console.log('chapter.id = ' + id);
    history.push("/chapter/topics");
  };

  return (
    <li className="side-menu__inner-list_item"  onClick={() => chooseChapter(chapter.id)}>
      <span className="side-menu__inner-list_link ">{chapter.title}</span>
    </li>
  );
};

export default MenuInnerItem;
