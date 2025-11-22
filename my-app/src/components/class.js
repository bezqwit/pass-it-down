import { useState } from 'react';
import './class.css';

export default function ClassPage() {
  // Example data - replace with props or API data
  const [classInfo] = useState({
    name: 'Introduction to Computer Science',
    courseNumber: 'CS 101',
    professor: 'Dr. Sarah Johnson'
  });

  const [sortBy, setSortBy] = useState('rating');
  
  const [noteFolders, setNoteFolders] = useState([
    {
      id: 1,
      folderName: 'Complete Semester Notes - Fall 2024',
      grade: 'A',
      rating: 4.8,
      totalRatings: 45,
      uploadedBy: 'John D.',
      uploadDate: '2024-12-15'
    },
    {
      id: 2,
      folderName: 'Midterm & Final Review',
      grade: 'A-',
      rating: 4.5,
      totalRatings: 32,
      uploadedBy: 'Emily R.',
      uploadDate: '2024-12-10'
    },
    {
      id: 3,
      folderName: 'Lecture Notes + Practice Problems',
      grade: 'B+',
      rating: 4.2,
      totalRatings: 28,
      uploadedBy: 'Mike S.',
      uploadDate: '2024-11-30'
    },
    {
      id: 4,
      folderName: 'Weekly Summaries',
      grade: 'A',
      rating: 4.6,
      totalRatings: 19,
      uploadedBy: 'Sarah L.',
      uploadDate: '2024-11-25'
    }
  ]);

  const sortFolders = (folders, sortType) => {
    const sorted = [...folders];
    if (sortType === 'rating') {
      return sorted.sort((a, b) => b.rating - a.rating);
    } else if (sortType === 'grade') {
      const gradeOrder = { 'A': 4, 'A-': 3.7, 'B+': 3.3, 'B': 3, 'B-': 2.7, 'C+': 2.3, 'C': 2 };
      return sorted.sort((a, b) => (gradeOrder[b.grade] || 0) - (gradeOrder[a.grade] || 0));
    } else if (sortType === 'recent') {
      return sorted.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
    }
    return sorted;
  };

  const displayedFolders = sortFolders(noteFolders, sortBy);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    return (
      <div className="stars">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < fullStars ? 'star filled' : (i === fullStars && hasHalfStar ? 'star half' : 'star')}>
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="class-page">
      {/* Header */}
      <div className="class-header">
        <div className="breadcrumb">
          <a href="/dashboard">Home</a> → <a href="/classes">Classes</a> → {classInfo.courseNumber}
        </div>
        <h1 className="class-title">{classInfo.name}</h1>
        <div className="class-meta">
          <span className="course-number">{classInfo.courseNumber}</span>
          <span className="professor">👨‍🏫 {classInfo.professor}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="class-controls">
        <div className="sort-controls">
          <label htmlFor="sort">Sort by:</label>
          <select 
            id="sort" 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="rating">Highest Rated</option>
            <option value="grade">Best Grade</option>
            <option value="recent">Most Recent</option>
          </select>
        </div>
        <button className="btn btn-primary">
          + Upload Your Notes
        </button>
      </div>

      {/* Note Folders List */}
      <div className="folders-list">
        <h2 className="section-title">Student Notes ({noteFolders.length})</h2>
        
        {displayedFolders.map((folder) => (
          <div key={folder.id} className="folder-card">
            <div className="folder-icon">📁</div>
            
            <div className="folder-content">
              <h3 className="folder-name">{folder.folderName}</h3>
              <div className="folder-meta">
                <span className="uploaded-by">by {folder.uploadedBy}</span>
                <span className="upload-date">{new Date(folder.uploadDate).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="folder-stats">
              <div className="grade-badge" data-grade={folder.grade}>
                <span className="grade-label">Grade</span>
                <span className="grade-value">{folder.grade}</span>
              </div>
              
              <div className="rating-info">
                {renderStars(folder.rating)}
                <span className="rating-score">{folder.rating}</span>
                <span className="rating-count">({folder.totalRatings})</span>
              </div>
            </div>

            <button className="btn btn-secondary btn-view">
              View Notes
            </button>
          </div>
        ))}
      </div>

      {/* Empty State (show if no folders) */}
      {noteFolders.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <h3>No notes yet</h3>
          <p>Be the first to share notes for this class!</p>
          <button className="btn btn-primary">Upload Notes</button>
        </div>
      )}
    </div>
  );
}