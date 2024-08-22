import logo from './logo.svg';
import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './Pages/LoginPage';
import DashBoard from './Pages/DashBoard';
import EditTaskPage from './Pages/EditTaskPage';


function App() {


  return (
    <div className="App">
   
   <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/tasks/:id" element={<EditTaskPage />} />
        <Route path="/tasks" element={<EditTaskPage />} />
         
      
      </Routes>
    </BrowserRouter>
   
    </div>
  );
}

export default App;
