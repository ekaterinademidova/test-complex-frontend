import React, {useState, useEffect} from "react";
import Loading from "../components/Loading";
// import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Categories from "../components/Categories";
import Chapters from "../components/Chapters";
import Topics from "../components/Topics";
import Modal from "../components/Modal";

import '../css/Management.css';
import '../css/Modal.css';

export const Management = () => {
  // const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState(localStorage.getItem('selectedItem' || null));

  const showData = (selectedItem) => {
    setSelectedItem(selectedItem);
  };

  useEffect(() => {
    localStorage.setItem('selectedItem', selectedItem);
  }, [selectedItem]);
  

  let [showModal, setShowModal] = useState(false);
  let [modal, setModal] = useState(null);
  let [perform, setPerform] = useState({});

  return (
    <div id="content" className="management-page">
      {showModal && 
        <Modal modal={modal} 
          perform={perform} 
          setPerform={setPerform}
          setShowModal={setShowModal}/>
      }
      <div className="menu block">

        <span className="menu-title">МЕНЮ</span>

        <ul className="material-list">
          <li onClick={() => setSelectedItem('categories')}>
            Категории
          </li>
          <li onClick={() => showData('chapters')}>
            Разделы
          </li>
          <li  onClick={() => showData('topics', 'topics')}>
            Темы
          </li>
        </ul>
        <span className="menu-title">ДОСТУП</span>
        <ul className="material-list">
          <li className="">
            Пользователи
          </li>
        </ul>
      </div>

      { selectedItem === 'categories'? 
        (
          <Categories setShowModal={setShowModal} 
                      setModal={setModal} 
                      perform={perform} 
                      setPerform={setPerform}/>
        ) : 
        (
          null
        )
      }

      { selectedItem === 'chapters'? 
        (
          <Chapters setShowModal={setShowModal} 
                    setModal={setModal} 
                    perform={perform} 
                    setPerform={setPerform}/>
        ) : 
        (
          null
        )
      }

      { selectedItem === 'topics'? 
        (
          <Topics setShowModal={setShowModal} 
                  setModal={setModal} 
                  perform={perform} 
                  setPerform={setPerform}/>
        ) : 
        (
          null
        )
      }

    </div>
  );
};

export default Management;
// export default withAuthenticationRequired(Management, {
//   onRedirecting: () => <Loading />,
// });
