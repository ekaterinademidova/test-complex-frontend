import React from 'react';
import axios from 'axios';

export default function Modal({modal, perform, setPerform, setShowModal}) {

  const { title, footerButtons, content } = modal;
  const [
    { type: typeCancel, text: textCancel, visibility: visCancel },
    { type: typePerform, text: textPerform, visibility: visPerform }
  ] = footerButtons;

  const cancel = () => {
    setShowModal(false);
  };

  console.log('открыта');


  const action = (perform) => {
    const apiUrl = 'http://localhost:4000/' + perform.name + perform.id;
    axios.delete(apiUrl)
      .then(res => {
        console.log(res);
        if (res) {
          setPerform({completed: true})
          cancel();
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div className="modal-overlay">
      <div className="modal-window">
        <div className="modal-header">
          <span className="modal-title">{title || 'Окно'}</span>
        </div>
        <div className="modal-body">
          {content || ''}
        </div>
        <div className="modal-footer">
          { visCancel && (
            <button className={"btn btn-"+ typeCancel} 
              onClick={cancel}>
              {textCancel}
            </button>
          )}
          { visPerform && (
            <button className={"btn btn-"+ typePerform} 
              onClick={() => action(perform)}>
              {textPerform}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};