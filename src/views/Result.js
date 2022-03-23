import React, {useState, useEffect} from 'react';

import Loading from "../components/Loading";
// import { withAuthenticationRequired } from "@auth0/auth0-react";

import '../css/Test.css';



export const Result = () => {

  return (
    <div id="content" className=" ts__container">
      <a href="/topics/" className="ts__exit-btn" title="В список тестов"></a>
      <article className="ts__wrapper" itemScope="" itemType="https://schema.org/CreativeWork">
        <form className="ts__form ts__section__business ts__class__">
          <div className="ts__background-color">
            <section className="container">
            {/* https://testometrika.com/upload/iblock/72b/72bec6eef95339bd4bf53a134ae0cece.svg */}
            </section>
          </div>
        </form>
      </article>
		</div>
  );
}

export default Result;
// export default withAuthenticationRequired(Result, {
//   onRedirecting: () => <Loading />,
// });