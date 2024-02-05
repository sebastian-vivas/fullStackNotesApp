import { useState } from "react";
import { useNavigate } from "react-router";

const Create = () => {
  const [form, setForm] = useState({
    note: "",
  });
  const navigate = useNavigate();

  const updateForm = (value) => {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  };

  const createNote = async (e) => {
    e.preventDefault();
    const newNote = { ...form };
    await fetch("http://localhost:8080/note/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNote),
    }).catch((error) => {
      window.alert(error);
      return;
    });
    setForm({ note: "" });
    navigate("/");
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
    </div>
  );
};

export default Create;
