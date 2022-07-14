import { useState } from "react";
import TrashCanIcon from "./TrashCanSvg";
import axios from "axios";

function Todo(props) {
    const [completed, setCompleted] = useState(props.todo.completed);
    const [showDelete, setShowDelete] = useState(false);
    async function handleCheckClick(e) {
        const payload = {
            completed: e.target.checked,
        };

        const resp = await axios.put(`/api/todos/${props.todo.id}`, payload);
        setCompleted(resp.data.todo.completed);
    }

    async function handleDelete(e) {
        await axios.delete(`/api/todos/${props.todo.id}`);
        props.onDeleteSuccess();
    }
    return (
        <div
          className="todo"
          onMouseEnter={() => setShowDelete(true)}
          onMouseLeave={() => setShowDelete(false)}
        >
          <input
            type={"checkbox"}
            className="checkbox"
            checked={completed}
            onChange={handleCheckClick}
          />
          <p>{props.todo.description}</p>
    
          {showDelete && 
            <button className="delete" onClick={handleDelete}>
              <TrashCanIcon />
            </button>
          }
        </div>
      );
};

export default Todo;