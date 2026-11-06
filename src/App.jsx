import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import TodoApp from "./components/TodoApp";
import Accordian from "./components/Accordian";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/todo" element={<TodoApp />} />
        <Route path="/accordian" element={<Accordian />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
