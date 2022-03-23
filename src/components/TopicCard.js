import React from "react";

const TopicCard = ({topic}) => {
  
  return (
    <span className="test-list__test">
      <span className="test-list__test__text">
        <img className="test-list__test__img" src="https://testometrika.com/upload/uf/2c8/2c8852a200c89cf9789a5c35d73f4c2e.svg" />
          <span className="test-list__test__title">
            {topic.title}
          </span>
      </span>
    </span>
  );
};

export default TopicCard;
