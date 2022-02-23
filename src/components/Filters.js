import React from "react";
import CategoryFilterItem from "./CategoryFilterItem";

const Filters = ({topics, setTopics}) => {
  //categories array

  return (
    <div className="test-list__filter">
		    {/* <div className="test-list__filter__category">
			    <span className="test-list__filter__category__name">Категория</span>
          <span className="test-list__filter__category__triangle"></span>

			    <ul className="test-list__filter__category__items">
            <CategoryFilterItem topics={topics} setTopics={setTopics} idCategory={1} title={"HTML"}/>
          </ul>
		    </div> */}

        <div className="test-list__filter__category select-status">

          <span className="test-list__filter__category__name">Фильтр</span>
          <span className="test-list__filter__category__triangle" />

          <ul className="test-list__filter__category__items">
            <li className="">
              <a href="" data-code="all" className="filter-item ">Все</a>
            </li>
            {/* <li className="process">
              <a href="" data-code="process" className="filter-item ">
                В процессе 
                <span className="test-list__test__time-load test-filter__ico" />							
              </a>
            </li> */}
            <li className="completed">
              <a href="" data-code="completed" className="filter-item ">
                Пройденные 
                <span className="test-list__test__ok test-filter__ico" />	
              </a>
            </li>
            <li className="not-completed">
              <a href="" data-code="not-completed" className="filter-item ">Непройденные</a>
            </li>
          </ul>
        </div>

        {/* <div className="test-list__filter__category sort">
          <form className="sort-form" method="POST" action="/tests/">
            <input type="hidden" name="order_test_list_by" />
            <input type="hidden" name="order_test_list_field" />
          </form>

          <span>
            <span className="test-list__filter__category__name">
              Популярные						
            </span>

            <span className="test-list__filter__category__arrow" />
          </span>
                                                                                        
          <ul className="test-list__filter__category__items">
            <li>
              <div className="sort-item filter-active">Новые</div>
            </li>
            <li>
              <div className="sort-item ">Старые</div>
            </li>
            <li>
              <div className="sort-item ">А-Я</div>
            </li>
            <li>
              <div className="sort-item ">Я-А</div>
            </li>
          </ul>
        </div> */}
	    </div>
  );
};

export default Filters;
