import React from "react";
import { useHistory } from "react-router-dom";


const MenuInnerItem = ({chapter}) => {

  return (
    <li className="side-menu__inner-list_item" >
      <span className="side-menu__inner-list_link ">{chapter.title}</span>
    </li>
  );
};

export default MenuInnerItem;
