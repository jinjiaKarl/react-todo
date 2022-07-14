import { Link } from "react-router-dom";

function About() {
    return(
        <>
            <h3>About</h3>
            <p>Todos is an app that helps you get orgnanized and get your life better.</p>
            <Link className="nav-link" to={"/"}>Return</Link>
        </>
    )
}
export default About;