import './Dashboard.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to classes page with search query
      navigate(`/classes?search=${encodeURIComponent(searchQuery)}`);
    } else {
      // If empty, just go to classes page
      navigate('/classes');
    }
  };

  const handleBrowseNotes = () => {
    navigate('/classes');
  };

  const handleUploadNotes = () => {
    // Navigate to upload page (you'll create this later)
    navigate('/upload');
  };
  
  return (
    <div className="dashboard">
      {/* Hero Section */}
      <div className="hero">
        
        <h2 className="hero-title">Share Notes, Ace Your Classes</h2>
        <div className="gradient-rect">
      
        <h3>
          Build better study habits<br />
          with <span className="brand">PassItDown</span>
        </h3>
        </div>
        <p className="hero-subtitle">
          Access thousands of student notes, upload your own, and collaborate with classmates to succeed together.
        </p>
        
        <div className="cta-buttons">
          <button 
            className="btn btn-large btn-primary-large"
            onClick={handleBrowseNotes}>
              Browse Notes
          </button>
          <button 
            className="btn btn-large btn-secondary-large"
            onClick={handleUploadNotes}>
              Upload Your Notes
          </button>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="search-container">
          <input
            type="text"
            placeholder="Search for a class (e.g., CS 101, Biology 201)..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-btn">Search</button>
        </form>
      </div>

      {/* Features */}
      <div className="features">
        <div className="feature-card">
          <div className="feature-icon">📝</div>
          <h3 className="feature-title">Upload & Share</h3>
          <p className="feature-desc">
            Share your notes with classmates and help others succeed
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🔍</div>
          <h3 className="feature-title">Easy Search</h3>
          <p className="feature-desc">
            Find notes by class, topic, or professor in seconds
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🤝</div>
          <h3 className="feature-title">Study Together</h3>
          <p className="feature-desc">
            Collaborate with peers and build a stronger community
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>© 2025 Pass It Down. Made by students, for students.</p>
      </footer>
    </div>
  );
}