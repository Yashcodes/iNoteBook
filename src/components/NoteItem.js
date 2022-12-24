import React from "react";

const NoteItem = (props) => {
  const { note } = props;
  return (
    <div className="col-md-3 my-3">
      <div className="card border shadow">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h5 className="card-title">{note.title}</h5>
            <div className="icons pe-auto">
              <i className="fa-solid fa-pen-to-square mx-2 pe-auto"></i>
              <i className="fa-solid fa-trash mx-2 pe-auto"></i>
            </div>
          </div>

          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
