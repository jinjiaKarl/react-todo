import React, { useState } from "react";
import axios from "axios";


function NewTodoInput(props)  {
  const [showInput, setShowInput] = useState(false);
  const [value, setValue] = useState("");
  
  async function handleSave(e) {
    // form默认会重新加载页面，阻止该行为
    e.preventDefault();

    const payload = {
      description: value,
    };

    const resp = await axios.post("/api/todos", payload);
    console.log(resp.data);

    props.onCreateSuccess(resp.data.todo);
    setShowInput(false);
    setValue("");
  }

  return showInput ? (
    <form className="input-box">
      <input
        className="todo-input"
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="To do..."
      />
      <button className="save-button" onClick={(e) => handleSave(e)}>
        Save
      </button>
    </form>
  ) : (
    <div className="button-box">
      <button className="new-button" onClick={() => setShowInput(true)}>
        New
      </button>
    </div>
  );
};

export default NewTodoInput;