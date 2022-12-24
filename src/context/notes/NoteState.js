import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "63a5f7486541f5d7bf227675",
      user: "639f596e8693119ad8f53269",
      title: "Wish",
      description: "Good Morning",
      tag: "Greeting",
      date: "2022-12-23T18:45:28.547Z",
      __v: 0,
    },
    {
      _id: "63a5f7636541f5d7bf227677",
      user: "639f596e8693119ad8f53269",
      title: "Practical",
      description: "Write practical 2",
      tag: "Python",
      date: "2022-12-23T18:45:55.014Z",
      __v: 0,
    },
    {
      _id: "63a5f7636541f5d7bf227677",
      user: "639f596e8693119ad8f53269",
      title: "Practical",
      description: "Write practical 2",
      tag: "Python",
      date: "2022-12-23T18:45:55.014Z",
      __v: 0,
    },
    {
      _id: "63a5f7636541f5d7bf227677",
      user: "639f596e8693119ad8f53269",
      title: "Practical",
      description: "Write practical 2",
      tag: "Python",
      date: "2022-12-23T18:45:55.014Z",
      __v: 0,
    },
    {
      _id: "63a5f7636541f5d7bf227677",
      user: "639f596e8693119ad8f53269",
      title: "Practical",
      description: "Write practical 2",
      tag: "Python",
      date: "2022-12-23T18:45:55.014Z",
      __v: 0,
    },
    {
      _id: "63a5f7636541f5d7bf227677",
      user: "639f596e8693119ad8f53269",
      title: "Practical",
      description: "Write practical 2",
      tag: "Python",
      date: "2022-12-23T18:45:55.014Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesInitial);

  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      <>{props.children}</>
    </NoteContext.Provider>
  );
};

export default NoteState;
