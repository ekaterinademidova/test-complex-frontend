import React from "react";

const TopicCard = ({id, title, img, link}) => {
  
  return (
    <div className="col-xs-12 col-sm-6" id={id}>
      <a className="test-list__test " href="/topic">
        <span className="test-list__test__text">
          <img className="test-list__test__img" src={img} />
            <span className="test-list__test__title">
              {title}
            </span>
        </span>
      </a>
    </div>
  );
};

export default TopicCard;
