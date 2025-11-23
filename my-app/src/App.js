import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Login from './components/login';
import Signup from './components/signup';
import ClassPage from './components/class';
import Classes from './components/classes';
import Upload from './components/upload';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation Bar (optional - remove if you don't want it) */}
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo">Pass It Down</Link>
            <div className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
              <Link to="/class">Class Example</Link>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/class" element={<ClassPage />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/upload" element={<Upload />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;