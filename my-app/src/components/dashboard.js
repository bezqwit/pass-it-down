import './Dashboard.css';

export default function Dashboard() {
  return (
    <div className="dashboard">
      {/* Hero Section */}
      <div className="hero">
        <h2 className="hero-title">Share Notes, Ace Your Classes</h2>
        <p className="hero-subtitle">
          Access thousands of student notes, upload your own, and collaborate with classmates to succeed together.
        </p>
        
        <div className="cta-buttons">
          <button className="btn btn-large btn-primary-large">Browse Notes</button>
          <button className="btn btn-large btn-secondary-large">Upload Your Notes</button>
        </div>

        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for a class (e.g., CS 101, Biology 201)..."
            className="search-input"
          />
          <button className="search-btn">Search</button>
        </div>
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