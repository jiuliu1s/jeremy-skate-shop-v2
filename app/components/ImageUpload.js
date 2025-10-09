// app/components/ImageUpload.js
'use client';

import { useState, useRef } from 'react';

export default function ImageUpload({ onImageUpload, existingImage }) {
  const [previewUrl, setPreviewUrl] = useState(existingImage || '');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size too large! Please select an image under 5MB.');
        return;
      }
      
      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file (JPG, PNG, WEBP, etc.)');
        return;
      }
      
      processImageFile(file);
    }
  };

  const processImageFile = (file) => {
    setIsUploading(true);
    
    // Create a preview URL and convert to base64 for storage
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target.result;
      setPreviewUrl(imageData);
      onImageUpload(imageData); // This will be the base64 encoded image
      setIsUploading(false);
    };
    reader.onerror = () => {
      alert('Error reading file. Please try another image.');
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleCameraCapture = (event) => {
    const file = event.target.files[0];
    if (file) {
      processImageFile(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const triggerCameraInput = () => {
    cameraInputRef.current?.click();
  };

  const removeImage = () => {
    setPreviewUrl('');
    onImageUpload('');
  };

  return (
    <div className="space-y-4">
      {/* Preview */}
      {previewUrl ? (
        <div className="relative">
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="w-full h-48 object-cover rounded-lg border-2 border-gray-300"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
            title="Remove image"
          >
            ×
          </button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg h-48 flex items-center justify-center bg-gray-50">
          <div className="text-center text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm">No image selected</p>
          </div>
        </div>
      )}

      {/* Upload Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* File Upload */}
        <div className="flex-1">
          <button
            type="button"
            onClick={triggerFileInput}
            disabled={isUploading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed font-medium transition-colors"
          >
            {isUploading ? '📤 Uploading...' : '📁 Upload from Device'}
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*"
            className="hidden"
          />
          <p className="text-xs text-gray-500 mt-2 text-center">
            JPG, PNG, WEBP (Max 5MB)
          </p>
        </div>

        {/* Camera Capture */}
        <div className="flex-1">
          <button
            type="button"
            onClick={triggerCameraInput}
            disabled={isUploading}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed font-medium transition-colors"
          >
            {isUploading ? '📤 Uploading...' : '📷 Take Photo'}
          </button>
          <input
            type="file"
            ref={cameraInputRef}
            onChange={handleCameraCapture}
            accept="image/*"
            capture="environment"
            className="hidden"
          />
          <p className="text-xs text-gray-500 mt-2 text-center">
            Use camera (mobile)
          </p>
        </div>
      </div>

      {/* Drag & Drop Area */}
      <div 
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer bg-gray-50 hover:bg-blue-50"
        onClick={triggerFileInput}
        onDragOver={(e) => {
          e.preventDefault();
          e.currentTarget.classList.add('border-blue-400', 'bg-blue-50');
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.currentTarget.classList.remove('border-blue-400', 'bg-blue-50');
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.currentTarget.classList.remove('border-blue-400', 'bg-blue-50');
          const file = e.dataTransfer.files[0];
          if (file && file.type.startsWith('image/')) {
            if (file.size > 5 * 1024 * 1024) {
              alert('File size too large! Please select an image under 5MB.');
              return;
            }
            processImageFile(file);
          } else {
            alert('Please drop a valid image file.');
          }
        }}
      >
        <div className="text-gray-500">
          <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p className="font-medium">Drag & drop image here</p>
          <p className="text-sm">or click to browse files</p>
        </div>
      </div>

      {/* Help Text */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-sm text-blue-800">
          <strong>Tip:</strong> On mobile, "Take Photo" will open your camera. "Upload from Device" will let you choose from your gallery.
        </p>
      </div>
    </div>
  );
}