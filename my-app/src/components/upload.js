import { useState, useEffect } from 'react';
import { uploadMultipleToCloudinary } from '../config/cloudinary';
import { useNavigate } from 'react-router-dom';

import './upload.css';

export default function Upload() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Check if user is logged in
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
    school: '',
    subject: '',
    courseNumber: '',
    courseName: '',
    professor: '',
    grade: '',
    folderName: '',
    description: '',
    uploadType: 'photos' // 'photos' or 'text'
  });

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [textContent, setTextContent] = useState('');
  const [loading, setLoading] = useState(false);
  // Check if user is logged in when component loads
  useEffect(() => {
    // TODO: Replace with actual auth check
    const userLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (!userLoggedIn) {
      // Redirect to login if not logged in
      navigate('/login?redirect=/upload');
    } else {
      setIsLoggedIn(true);
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const fileObjects = files.map(file => ({
      file: file,
      name: file.name,
      preview: URL.createObjectURL(file),
      type: file.type
    }));
    setUploadedFiles([...uploadedFiles, ...fileObjects]);
  };

  const removeFile = (index) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
  };

  const handleClassInfoSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleGradeSubmit = (e) => {
    e.preventDefault();
    setStep(3);
  };

  const handleFinalSubmit = async (e) => {
  e.preventDefault();
  
  setLoading(true);
  
  try {
    let fileUrls = [];
    
    // Upload files to Cloudinary if using photos
    if (formData.uploadType === 'photos' && uploadedFiles.length > 0) {
      console.log('Uploading files to Cloudinary...');
      
      // Extract the actual File objects from uploadedFiles
      const files = uploadedFiles.map(fileObj => fileObj.file);
      
      // Upload all files to Cloudinary
      const uploadResults = await uploadMultipleToCloudinary(files);
      
      // Extract just the URLs
      fileUrls = uploadResults.map(result => result.url);
      
      console.log('Files uploaded successfully:', fileUrls);
    }

    // TODO: Save to Firestore (we'll do this next)
    const uploadData = {
      ...formData,
      fileUrls: fileUrls, // Array of Cloudinary URLs
      textContent: formData.uploadType === 'text' ? textContent : null,
      uploadDate: new Date().toISOString()
    };
    
    console.log('Complete upload data:', uploadData);
    
    // Show success message and redirect
    alert('Notes uploaded successfully!');
    navigate('/classes');
  } catch (error) {
    console.error('Upload error:', error);
    alert('Failed to upload notes. Please try again.');
  } finally {
    setLoading(false);
  }
};

  if (!isLoggedIn) {
    return (
      <div className="upload-page">
        <div className="loading-message">
          <p>Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="upload-page">
      <div className="upload-container">
        <div className="upload-header">
          <h1>Upload Your Notes</h1>
          <p>Share your knowledge with fellow students</p>
        </div>

        {/* Progress Steps */}
        <div className="progress-steps">
          <div className={`progress-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
            <div className="step-number">1</div>
            <span>Class Info</span>
          </div>
          <div className="progress-line"></div>
          <div className={`progress-step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
            <div className="step-number">2</div>
            <span>Your Grade</span>
          </div>
          <div className="progress-line"></div>
          <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>
            <div className="step-number">3</div>
            <span>Upload Notes</span>
          </div>
        </div>

        {/* Step 1: Class Information */}
        {step === 1 && (
          <form onSubmit={handleClassInfoSubmit} className="upload-form">
            <h2>Class Information</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="school">School *</label>
                <select
                  id="school"
                  name="school"
                  value={formData.school}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select school...</option>
                  <option value="mit">MIT</option>
                  <option value="harvard">Harvard University</option>
                  <option value="stanford">Stanford University</option>
                  <option value="berkeley">UC Berkeley</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select subject...</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Biology">Biology</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Physics">Physics</option>
                  <option value="English">English</option>
                  <option value="History">History</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="courseNumber">Course Number *</label>
                <input
                  type="text"
                  id="courseNumber"
                  name="courseNumber"
                  placeholder="e.g., CS 101"
                  value={formData.courseNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="courseName">Course Name *</label>
                <input
                  type="text"
                  id="courseName"
                  name="courseName"
                  placeholder="e.g., Introduction to Computer Science"
                  value={formData.courseName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="professor">Professor Name *</label>
              <input
                type="text"
                id="professor"
                name="professor"
                placeholder="e.g., Dr. Sarah Johnson"
                value={formData.professor}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/classes')}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Next →
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Grade Information */}
        {step === 2 && (
          <form onSubmit={handleGradeSubmit} className="upload-form">
            <h2>Your Performance</h2>
            
            <div className="form-group">
              <label htmlFor="grade">What grade did you receive? *</label>
              <select
                id="grade"
                name="grade"
                value={formData.grade}
                onChange={handleInputChange}
                required
              >
                <option value="">Select grade...</option>
                <option value="A">A</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B">B</option>
                <option value="B-">B-</option>
                <option value="C+">C+</option>
                <option value="C">C</option>
                <option value="C-">C-</option>
                <option value="D">D</option>
                <option value="Pass">Pass</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="folderName">Folder Name *</label>
              <input
                type="text"
                id="folderName"
                name="folderName"
                placeholder="e.g., Complete Semester Notes - Fall 2024"
                value={formData.folderName}
                onChange={handleInputChange}
                required
              />
              <small>This will be the title students see</small>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description (Optional)</label>
              <textarea
                id="description"
                name="description"
                placeholder="Add any helpful context about your notes..."
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
              />
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={() => setStep(1)}>
                ← Back
              </button>
              <button type="submit" className="btn btn-primary">
                Next →
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Upload Notes */}
        {step === 3 && (
          <form onSubmit={handleFinalSubmit} className="upload-form">
            <h2>Upload Your Notes</h2>

            {/* Upload Type Selection */}
            <div className="upload-type-selector">
              <button
                type="button"
                className={`type-btn ${formData.uploadType === 'photos' ? 'active' : ''}`}
                onClick={() => setFormData({ ...formData, uploadType: 'photos' })}
              >
                📷 Photos/PDFs
              </button>
              <button
                type="button"
                className={`type-btn ${formData.uploadType === 'text' ? 'active' : ''}`}
                onClick={() => setFormData({ ...formData, uploadType: 'text' })}
              >
                📝 Text Entry
              </button>
            </div>

            {/* Photo/PDF Upload */}
            {formData.uploadType === 'photos' && (
              <div className="file-upload-section">
                <label htmlFor="file-upload" className="file-upload-label">
                  <div className="upload-icon">📁</div>
                  <p>Click to upload or drag and drop</p>
                  <small>Images (JPG, PNG) or PDFs</small>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  accept="image/*,.pdf"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />

                {/* Uploaded Files Preview */}
                {uploadedFiles.length > 0 && (
                  <div className="uploaded-files">
                    <h3>Uploaded Files ({uploadedFiles.length})</h3>
                    <div className="files-grid">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="file-preview">
                          {file.type.startsWith('image/') ? (
                            <img src={file.preview} alt={file.name} />
                          ) : (
                            <div className="pdf-preview">📄 PDF</div>
                          )}
                          <p className="file-name">{file.name}</p>
                          <button
                            type="button"
                            className="remove-file-btn"
                            onClick={() => removeFile(index)}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Text Entry */}
            {formData.uploadType === 'text' && (
              <div className="form-group">
                <label htmlFor="textContent">Enter Your Notes</label>
                <textarea
                  id="textContent"
                  placeholder="Type or paste your notes here..."
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                  rows="15"
                  required
                />
              </div>
            )}

            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={() => setStep(2)}>
                ← Back
              </button>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={formData.uploadType === 'photos' && uploadedFiles.length === 0}
              >
                Upload Notes
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}