import './App.css';
import { Register, Login, Category } from '../src/containers'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Category" element={<Category />} />
    </Routes>
  </Router>
  );
}

export default App
