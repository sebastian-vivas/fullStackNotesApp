/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Notes = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const getNotes = async () => {
    const response = await fetch(`http://localhost:8080/note`);
    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }
    const notes = await response.json();
    setNotes(notes);
  };

  useEffect(() => {
    getNotes();
    return;
  }, []);

  const deleteNote = async (id) => {
    await fetch(`http://localhost:8080/${id}`, {
      method: "DELETE",
    });
    const newNote = notes.filter((el) => el._id !== id);
    setNotes(newNote);
  };

  const setOrRemoveStar = async (e, id) => {
    const buttonText = e.target.textContent;

    let updatedNote;

    if (buttonText === "star") {
      updatedNote = {
        starred: true,
      };
      getNotes();
    }

    if (buttonText === "starred") {
      updatedNote = {
        starred: false,
      };
      getNotes();
    }

    await fetch(`http://localhost:8080/updateStar/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedNote),
      headers: {
        "Content-Type": "application/json",
      },
    });
    window.location.reload();
  };

  const setOrRemovePin = async (e, id) => {
    let updatedNote;
    const buttonText = e.target.textContent;

    if (buttonText === "pin") {
      updatedNote = {
        pinned: true,
      };
      getNotes();
    }

    if (buttonText === "pinned") {
      updatedNote = {
        pinned: false,
      };
      getNotes();
    }

    await fetch(`http://localhost:8080/updatePin/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedNote),
      headers: {
        "Content-Type": "application/json",
      },
    });
    window.location.reload();
  };

  const showNotes = (note) => {
    return (
      <>
        {note.note}{" "}
        {!note.starred && (
          <button onClick={(e) => setOrRemoveStar(e, note._id)}>star</button>
        )}
        {note.starred && (
          <button onClick={(e) => setOrRemoveStar(e, note._id)}>starred</button>
        )}{" "}
        {!note.pinned && (
          <button onClick={(e) => setOrRemovePin(e, note._id)}>pin</button>
        )}
        {note.pinned && (
          <button onClick={(e) => setOrRemovePin(e, note._id)}>pinned</button>
        )}{" "}
        <button onClick={() => deleteNote(note._id)}>delete</button>
      </>
    );
  };

  return (
    <div>
      {notes.map((note) => (
        <div key={note._id}>{note.pinned && showNotes(note)}</div>
      ))}
      {notes.map((note) => (
        <div key={note._id}>{!note.pinned && showNotes(note)}</div>
      ))}
    </div>
  );
};

export default Notes;
