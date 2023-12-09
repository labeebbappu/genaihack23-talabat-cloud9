// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./my-routes/home"; 
import Reviews from "./my-routes/reviews";
import Dashboard from "./my-routes/dashboard";  

function App() {
   

  return (
    <>
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      
    </>
  );
}

export default App;
