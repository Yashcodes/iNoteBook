import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const s1 = {
    name: "Yash",
    class: "6a",
  };

  const [state, setState] = useState(s1);
  const update = () => {
    setTimeout(() => {
      setState({
        name: "Kajal",
        class: "10b",
      });
    }, 1000);
  };

  return (
    <NoteContext.Provider value={{state, update}}>
      <>{props.children}</>
    </NoteContext.Provider>
  );
};

export default NoteState;
