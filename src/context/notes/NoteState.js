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
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhYzVkN2NhYWRjYTE2YTYzYmQ1ZjM5In0sImlhdCI6MTY3MjI0MDUxMX0.XmP3ORxdaBE66g6zuqXFYyRPhyvKU6W4sA2HD-Q3dkc",
      },
    });

    const json = await response.json();
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
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhYzVkN2NhYWRjYTE2YTYzYmQ1ZjM5In0sImlhdCI6MTY3MjI0MDUxMX0.XmP3ORxdaBE66g6zuqXFYyRPhyvKU6W4sA2HD-Q3dkc",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = await response.json();

    setNotes(notes.concat(note));
  };

  //! Delete a note
  const deleteNote = async (id) => {
    //* API Call

    // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhYzVkN2NhYWRjYTE2YTYzYmQ1ZjM5In0sImlhdCI6MTY3MjI0MDUxMX0.XmP3ORxdaBE66g6zuqXFYyRPhyvKU6W4sA2HD-Q3dkc",
      },
    });

    //* Logic to delete in client
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });

    setNotes(newNotes);
  };

  //! Edit a note
  const editNote = async (id, title, description, tag) => {
    //* API Call

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhYzVkN2NhYWRjYTE2YTYzYmQ1ZjM5In0sImlhdCI6MTY3MjI0MDUxMX0.XmP3ORxdaBE66g6zuqXFYyRPhyvKU6W4sA2HD-Q3dkc",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    // eslint-disable-next-line
    const json = await response.json();

    //? Creating new notes array to be passed an client side notes
    let newNotes = JSON.parse(JSON.stringify(notes));

    //* Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const note = newNotes[index];

      if (note._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
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
