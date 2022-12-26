import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  //! Fetch all note
  const fetchNotes = async () => {
    //* API Call

    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM5ZjU5NmU4NjkzMTE5YWQ4ZjUzMjY5In0sImlhdCI6MTY3MTM4NzUxNn0.LLfF2jk--h1s3JKat_IGkjUZchHeT10aE2MLaHI7Uzc",
      },
    });

    const json = await response.json();
    // console.log(json);
    setNotes(json);
  };

  //! Add a note
  const addNote = async (title, description, tag) => {
    //* API Call
    // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM5ZjU5NmU4NjkzMTE5YWQ4ZjUzMjY5In0sImlhdCI6MTY3MTM4NzUxNn0.LLfF2jk--h1s3JKat_IGkjUZchHeT10aE2MLaHI7Uzc",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    // const json = response.json();

    console.log("Adding a new note");
    const note = {
      _id: "63a5f7486541f5d7cf547675",
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
  const deleteNote = async (id) => {
    //* API Call

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM5ZjU5NmU4NjkzMTE5YWQ4ZjUzMjY5In0sImlhdCI6MTY3MTM4NzUxNn0.LLfF2jk--h1s3JKat_IGkjUZchHeT10aE2MLaHI7Uzc",
      },
    });

    //* Logic to delete in client
    console.log("Deleting the note with id " + id);
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
      body: JSON.stringify({ title, description, tag }),
    });

    console.log("Editing notes");
    // eslint-disable-next-line
    const json = response.json();

    //* Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const note = notes[index];

      if (note._id === id) {
        note.title = title;
        note.description = description;
        note.tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, fetchNotes }}
    >
      <>{props.children}</>
    </NoteContext.Provider>
  );
};

export default NoteState;
