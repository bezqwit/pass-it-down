import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './classes.css';

export default function Classes() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');

  // Get search query from URL when component loads
  useEffect(() => {
    const query = searchParams.get('search');
    if (query) {
      setSearchTerm(query);
    }
  }, [searchParams]);

  // Example class data - replace with API data later
  const [classes] = useState([
    {
      id: 1,
      courseNumber: 'CS 101',
      name: 'Introduction to Computer Science',
      professor: 'Dr. Sarah Johnson',
      subject: 'Computer Science',
      noteCount: 24,
      avgRating: 4.5
    },
    {
      id: 2,
      courseNumber: 'MATH 201',
      name: 'Calculus II',
      professor: 'Prof. Michael Chen',
      subject: 'Mathematics',
      noteCount: 18,
      avgRating: 4.3
    },
    {
      id: 3,
      courseNumber: 'BIO 150',
      name: 'General Biology',
      professor: 'Dr. Emily Rodriguez',
      subject: 'Biology',
      noteCount: 32,
      avgRating: 4.7
    },
    {
      id: 4,
      courseNumber: 'ENG 102',
      name: 'English Composition',
      professor: 'Prof. David Williams',
      subject: 'English',
      noteCount: 15,
      avgRating: 4.2
    },
    {
      id: 5,
      courseNumber: 'CS 202',
      name: 'Data Structures',
      professor: 'Dr. Sarah Johnson',
      subject: 'Computer Science',
      noteCount: 28,
      avgRating: 4.6
    },
    {
      id: 6,
      courseNumber: 'CHEM 101',
      name: 'General Chemistry',
      professor: 'Dr. Robert Lee',
      subject: 'Chemistry',
      noteCount: 21,
      avgRating: 4.4
    }
  ]);

  // Get unique subjects for filter
  const subjects = ['all', ...new Set(classes.map(c => c.subject))];

  // Filter classes based on search and subject
  const filteredClasses = classes.filter(classItem => {
    const matchesSearch = 
      classItem.courseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classItem.professor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSubject = filterSubject === 'all' || classItem.subject === filterSubject;
    
    return matchesSearch && matchesSubject;
  });

  const handleClassClick = (classId) => {
    navigate(`/class/${classId}`);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    return (
      <div className="stars-small">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < fullStars ? 'star filled' : (i === fullStars && hasHalfStar ? 'star half' : 'star')}>
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="classes-page">
      <div className="classes-header">
        <div className="breadcrumb">
          <a href="/">Home</a> → Classes
        </div>
        <h1 className="page-title">Browse Classes</h1>
        <p className="page-subtitle">Find notes for your courses</p>
      </div>

      {/* Search and Filter Section */}
      <div className="search-filter-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by course number, name, or professor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input-large"
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="filter-section">
          <label htmlFor="subject-filter">Filter by subject:</label>
          <select
            id="subject-filter"
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            className="subject-filter"
          >
            {subjects.map(subject => (
              <option key={subject} value={subject}>
                {subject === 'all' ? 'All Subjects' : subject}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="results-info">
        <p>Showing {filteredClasses.length} {filteredClasses.length === 1 ? 'class' : 'classes'}</p>
      </div>

      {/* Classes Grid */}
      <div className="classes-grid">
        {filteredClasses.map((classItem) => (
          <div 
            key={classItem.id} 
            className="class-card"
            onClick={() => handleClassClick(classItem.id)}
          >
            <div className="class-card-header">
              <span className="course-number-badge">{classItem.courseNumber}</span>
              <div className="class-rating">
                {renderStars(classItem.avgRating)}
                <span className="rating-number">{classItem.avgRating}</span>
              </div>
            </div>

            <h3 className="class-name">{classItem.name}</h3>
            
            <div className="class-meta">
              <p className="professor-name">👨‍🏫 {classItem.professor}</p>
              <p className="subject-tag">{classItem.subject}</p>
            </div>

            <div className="class-stats">
              <div className="stat">
                <span className="stat-icon">📝</span>
                <span className="stat-text">{classItem.noteCount} note sets</span>
              </div>
            </div>

            <button className="view-notes-btn">
              View Notes →
            </button>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredClasses.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>No classes found</h3>
          <p>Try adjusting your search or filter</p>
          <button 
            className="btn btn-primary"
            onClick={() => {
              setSearchTerm('');
              setFilterSubject('all');
            }}
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Add New Class Section */}
      <div className="add-class-section">
        <h3>Can't find your class?</h3>
        <p>Be the first to add notes for a new class</p>
        <button className="btn btn-secondary">+ Add New Class</button>
      </div>
    </div>
  );
}