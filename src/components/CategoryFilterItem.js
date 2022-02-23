import React from "react";

const CategoryFilterItem = ({topics, setTopics, id, title}) => {
  
  const chooseCategory = (id) => {
    // setTopics(topics.Where(x => x.Id = id));
  }
  return (
    <li className="filter-category__li" onClick={chooseCategory(id)}>
      <a className="filter-category__a" href="#">{title}</a>
    </li>
  );
};

export default CategoryFilterItem;
