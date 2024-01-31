/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router";

const App = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    note: "",
    important: false,
    pinned: false,
  });

  const updateForm = (value) => {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  const onSubmit  = async (e) => {
    e.preventDefault();
    //  When a post request is sent to the create url, we'll add a new record to the database.
    const newNote = { ...form };
     await fetch("http://localhost:3001/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNote),
    })
    .catch(error => {
      window.alert(error);
      return;
    });
     setForm({ note: "", important: false, pinned: false });
    navigate("/");
  }

  return (
    <div>
      <h3>Create New Note</h3>
    <form onSubmit={onSubmit}>
      <div>
        <input value={form.note} onChange={(e) => updateForm({ note: e.target.value })} />{" "}
        <button type="submit">add note</button>
      </div>
    </form>
      {notes.map((note) => (
        <div>
          <p key={note._id}>
            {note.note}{" "}
            {!note.important && <button>star</button>}
            {note.important && <button>starred</button>}{" "}
            {!note.pinned && <button>pin</button>}
            {note.pinned && <button>pinned</button>}
          </p>
        </div>
        ))}
    </div>
  );
};

export default App;