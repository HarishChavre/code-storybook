import React from "react";
import { Routes, Route } from "react-router-dom"; // DO NOT use BrowserRouter here
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SubmitStory from "./pages/SubmitStory";
import StoryDetail from "./pages/StoryDetail";

const App = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/submit" element={<SubmitStory />} />
      <Route path="/story/:id" element={<StoryDetail />} />
    </Routes>
  </>
);

export default App;
