
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom"; 
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SubmitStory from "./pages/SubmitStory";
import StoryDetail from "./pages/StoryDetail";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        
        <Route 
          path="/login" 
          element={user ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} 
        />
        <Route 
          path="/register" 
          element={user ? <Navigate to="/" /> : <Register onRegister={handleLogin} />} 
        />


        <Route 
          path="/" 
          element={user ? <Home /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/submit" 
          element={user ? <SubmitStory /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/story/:id" 
          element={user ? <StoryDetail /> : <Navigate to="/login" />} 
        />

       
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
