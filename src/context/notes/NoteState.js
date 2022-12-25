import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";

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
      _id: "63a5f7636541f5d7bf2276464",
      user: "639f596e8693119ad8f53269",
      title: "Practical",
      description: "Write practical 2",
      tag: "Python",
      date: "2022-12-23T18:45:55.014Z",
      __v: 0,
    },
    {
      _id: "63a5f7636541f5d7bf2276568",
      user: "639f596e8693119ad8f53269",
      title: "Practical",
      description: "Write practical 2",
      tag: "Python",
      date: "2022-12-23T18:45:55.014Z",
      __v: 0,
    },
    {
      _id: "63a5f7636541f5d7bf2276678",
      user: "639f596e8693119ad8f53269",
      title: "Practical",
      description: "Write practical 2",
      tag: "Python",
      date: "2022-12-23T18:45:55.014Z",
      __v: 0,
    },
    {
      _id: "63a5f7636541f5d7bf2276345",
      user: "639f596e8693119ad8f53269",
      title: "Practical",
      description: "Write practical 2",
      tag: "Python",
      date: "2022-12-23T18:45:55.014Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesInitial);

  //! Add a note
  const addNote = (title, description, tag) => {
    //TODO : API Call

    console.log("Adding a new note");
    const note = {
      _id: "63a5f7486541f5d7bf547675",
      user: "639f596e8693119ad8f53269",
      title: title,
      description: description,
      tag: tag,
      date: "2022-12-23T18:45:28.547Z",
      __v: 0,
    };

    setNotes(notes.concat(note));
  };

  //! Delete a note
  const deleteNote = (id) => {
    //TODO : API Call

    console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });

    setNotes(newNotes);
  };

  //! Edit a note
  const editNote = async (id, title, description, tag) => {
    //* API Call

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM5ZjU5NmU4NjkzMTE5YWQ4ZjUzMjY5In0sImlhdCI6MTY3MTM4NzUxNn0.LLfF2jk--h1s3JKat_IGkjUZchHeT10aE2MLaHI7Uzc",
      },
      body: JSON.stringify(data),
    });

    console.log("Editing notes")
    const json = response.json();

    //?*Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const note = notes[index];

      if (note._id === id) {
        (note.title = title),
          (note.description = description),
          (note.tag = tag);
      }
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      <>{props.children}</>
    </NoteContext.Provider>
  );
};

export default NoteState;
