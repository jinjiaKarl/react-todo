import Hello from "./components/Hello";
import About from "./components/About";
import Todos from "./components/Todos";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App(): JSX.Element {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Hello/>} />
      <Route path="/about" element={<About/>}/>
      <Route path="/todos" element={<Todos/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
