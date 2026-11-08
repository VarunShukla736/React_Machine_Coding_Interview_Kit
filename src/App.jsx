import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import TodoApp from "./components/TodoApp";
import Accordian from "./components/Accordian";
import ContactUsForm from "./components/ContactUsForm";
import "./App.css";
import TrafficLight from "./components/TrafficLight";
import UserManagemnt from "./components/UserManagement";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/todo" element={<TodoApp />} />
        <Route path="/accordian" element={<Accordian />} />
        <Route path="/contactus" element={<ContactUsForm />} />
        <Route path="/trafficlight" element={<TrafficLight />} />
        <Route path="/user-management" element={<UserManagemnt />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
