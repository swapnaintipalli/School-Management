import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Admin from './pages/Admin';
import Parents from './pages/Parents';
import './App.css'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Admin/>} />
        <Route path="/parents" element={<Parents/>} />
        <Route path="/" element={<Parents/>} />
      </Routes>
    </Router>
  );
}

export default App;