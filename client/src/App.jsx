/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({
    note: "",
    starred: false,
    pinned: false,
  });

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    /* NOTE: I don't think we need this block of code. I'll double-check when the backend is connected. -Sebastian 
    const fetchData = async () => {
      const id = params.id.toString();
      const response = await fetch(
        `http://localhost:3001/api/notes/${params.id.toString()}`
      );
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const note = await response.json();
      if (!note) {
        window.alert(`Note with id ${id} not found`);
        navigate("/");
        return;
      }
      setForm(note);
    };
    fetchData(); */

    const getNotes = async () => {
      /* NOTE: This is sent to GET url in Node to retrieve all notes in the database and store them in 
      "notes" variable to display to user. */
      const response = await fetch(`http://localhost:3001/api/notes`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const notes = await response.json();
      setNotes(notes);
    };

    getNotes();
    return;
  }, [params.id, navigate]);

  const updateForm = (value) => {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  };

  const createNote = async (e) => {
    e.preventDefault();
    // NOTE: When a post request is sent to the create url, we'll add a new note to the database.
    const newNote = { ...form };
    await fetch("http://localhost:3001/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNote),
    }).catch((error) => {
      window.alert(error);
      return;
    });
    setForm({ note: "", starred: false, pinned: false });
    navigate("/");
  };

  const setOrRemoveStarPin = async (e) => {
    e.preventDefault();
    const innerText = e.target.value;
    const updatedNote =
      innerText === "star"
        ? {
            starred: true,
          }
        : innerText === "pin"
        ? {
            pinned: true,
          }
        : innerText === "pinned"
        ? {
            pinned: false,
          }
        : {
            starred: false,
          };
    // NOTE: This will send a post request to update the note so that it's starred or pinned in the database.
    await fetch(`http://localhost:3001/api/notes/${params.id}`, {
      method: "POST",
      body: JSON.stringify(updatedNote),
      headers: {
        "Content-Type": "application/json",
      },
    });
    navigate("/");
  };

  const deleteNote = async (id) => {
    // NOTE: This will send a delete request to delete the note in the database.
    await fetch(`http://localhost:3001/api/notes/${id}`, {
      method: "DELETE",
    });
    const newNote = notes.filter((el) => el._id !== id);
    setNotes(newNote);
  };

  const showNotes = (note) => {
    return (
      <>
        <div key={note._id}>
          <p>
            {note.note}{" "}
            {!note.starred && (
              <button onClick={setOrRemoveStarPin}>star</button>
            )}
            {note.starred && (
              <button onClick={setOrRemoveStarPin}>starred</button>
            )}{" "}
            {!note.pinned && <button onClick={setOrRemoveStarPin}>pin</button>}
            {note.pinned && (
              <button onClick={setOrRemoveStarPin}>pinned</button>
            )}{" "}
            <button onClick={deleteNote}>delete</button>
          </p>
        </div>
      </>
    );
  };

  return (
    <div>
      <h3>Create New Note</h3>
      <form onSubmit={createNote}>
        <div>
          <input
            value={form.note}
            onChange={(e) => updateForm({ note: e.target.value })}
          />{" "}
          <button type="submit">add note</button>
        </div>
      </form>
      {notes.map((note) => (
        <>
          {note.pinned && showNotes(note)}
          {!note.pinned && showNotes(note)}
        </>
      ))}
      ;
    </div>
  );
};

export default App;
