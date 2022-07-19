import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NewTodoInput  from "./NewTodoForm";
import Todo  from "./Todo";
import axios from "axios";

export interface TodoObj {
    id: string;
    description: string;
    completed: boolean;
}

  
function Todos() {
    // ts中使用useState https://zhuanlan.zhihu.com/p/358934875
    const [todos, setTodos] = useState<TodoObj[]>([]);

    // useCallback在第二个参数的依赖项不发生变化的时候，不会返回一个新的函数
    // setTodos在第一次渲染完之后就不会变了 和 useCallback的第二个参数直接使用[]没有区别
    const fetchTodos = useCallback(async () => {
        // try {
        //     const resp = await axios.get("/api/todos");
        //     setTodos(resp.data.todos);
        // }catch(err) {
        //     console.log(err);
        // }
        // 使用fetch
        try {
            const resp = await fetch("/api/todos");
            if (!resp.ok) {
                throw new Error(`HTTP error! Status: ${resp.status }`);
            }
            const r = await resp.json()
            setTodos(r.todos);
        }catch(err) {
            console.log(err);
        }
       
    },[setTodos]);

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    function onDeleteSuccess() {
        fetchTodos();
    }
    
    function onCreateSuccess(newTodo: TodoObj) {
        setTodos([...todos, newTodo]);
    }
    
    return (
        <>
            <h3>To Do:</h3>
            <div className="todos">
                {todos.map( (todo) => {
                    return (
                        <Todo key={todo.id} todo={todo} onDeleteSuccess={onDeleteSuccess}/>
                    ) 
                })}
            </div>
            <NewTodoInput onCreateSuccess={onCreateSuccess} />
            <Link to="/about" className="nav-link">
            Learn more...
            </Link>
        </>
    )
}
export default Todos;