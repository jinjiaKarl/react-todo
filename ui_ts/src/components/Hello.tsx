import { Link } from "react-router-dom";

function Hello() {
    return (
        <div>
            <h2>Hello World</h2>
            <Link to={"/about"}>About</Link>
            <br/>
            <Link to={"/todos"}>Todos</Link>
        </div>
    )
}

export default Hello;