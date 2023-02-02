import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Articles from "./pages/Articles/Articles";
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Articles />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
