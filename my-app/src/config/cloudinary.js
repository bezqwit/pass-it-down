// Cloudinary configuration
// TODO: Replace YOUR_CLOUD_NAME with your actual cloud name from Cloudinary dashboard
export const CLOUDINARY_CONFIG = {
  cloudName: 'dqksveu06', // Replace this!
  uploadPreset: 'student_notes', // Replace if you used a different preset name
};

// Upload a single file to Cloudinary
export const uploadToCloudinary = async (file) => {
  // Create form data
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);
  
  try {
    // Upload to Cloudinary
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/upload`,
      {
        method: 'POST',
        body: formData
      }
    );
    
    const data = await response.json();
    
    if (data.secure_url) {
      return {
        url: data.secure_url,
        publicId: data.public_id,
        format: data.format,
        type: data.resource_type
      };
    } else {
      throw new Error('Upload failed: ' + (data.error?.message || 'Unknown error'));
    }
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};

// Upload multiple files to Cloudinary
export const uploadMultipleToCloudinary = async (files) => {
  const uploadPromises = files.map(file => uploadToCloudinary(file));
  return Promise.all(uploadPromises);
};



