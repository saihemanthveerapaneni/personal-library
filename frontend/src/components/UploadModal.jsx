import React, { useState, useRef } from 'react';
import { uploadBook } from '../api';

// Configurable constants
export const MAX_FILE_SIZE_MB = 25;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const AVAILABLE_GENRES = [
  "Fiction", "Non-Fiction", "Fantasy", "Sci-Fi", 
  "Mystery", "Thriller", "Romance", "Memoir", 
  "History", "Self-Help", "Science", "Philosophy"
];

const UploadModal = ({ isOpen, onClose, onUploadSuccess, initialData = {} }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState(initialData?.title || '');
  const [author, setAuthor] = useState(initialData?.author || '');
  const [genres, setGenres] = useState(initialData?.genre ? (Array.isArray(initialData.genre) ? initialData.genre : [initialData.genre]) : []);
  const [totalPages, setTotalPages] = useState('');
  
  const [validationError, setValidationError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const validatePdfFile = (file) => {
    if (!file) {
      return "Only PDF files are allowed";
    }
    const hasPdfExt = file.name.toLowerCase().endsWith(".pdf");
    const hasPdfType = file.type === "application/pdf";
    if (!hasPdfType || !hasPdfExt) {
      return "Only PDF files are allowed";
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return `File size exceeds the maximum limit of ${MAX_FILE_SIZE_MB}MB (${(file.size / (1024 * 1024)).toFixed(1)}MB).`;
    }
    return null;
  };

  const processFile = (file) => {
    const error = validatePdfFile(file);
    if (error) {
      setValidationError(error);
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return false;
    }

    setValidationError("");
    setSelectedFile(file);

    // Autofill title if empty
    if (!title.trim()) {
      const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
      const formattedTitle = nameWithoutExt.replace(/[_-]/g, " ");
      setTitle(formattedTitle);
    }
    return true;
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isUploading) setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (isUploading) return;

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    setTitle('');
    setAuthor('');
    setGenres([]);
    setTotalPages('');
    setValidationError('');
    setIsUploading(false);
    setUploadProgress(0);
    setIsDragging(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleClose = () => {
    if (isUploading) return;
    resetForm();
    onClose();
  };

  const handleGenreToggle = (g) => {
    if (genres.includes(g)) {
      setGenres(genres.filter(item => item !== g));
    } else {
      setGenres([...genres, g]);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    if (!selectedFile) {
      setValidationError("Only PDF files are allowed");
      return;
    }

    const fileError = validatePdfFile(selectedFile);
    if (fileError) {
      setValidationError(fileError);
      return;
    }

    setValidationError("");
    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", selectedFile);
    if (title.trim()) formData.append("title", title.trim());
    if (author.trim()) formData.append("author", author.trim());
    if (genres.length > 0) formData.append("genre", genres.join(", "));
    if (totalPages && parseInt(totalPages, 10) > 0) {
      formData.append("total_pages", parseInt(totalPages, 10));
    }

    try {
      await uploadBook(formData, (percent) => {
        setUploadProgress(percent);
      });
      setIsUploading(false);
      resetForm();
      if (onUploadSuccess) onUploadSuccess();
      onClose();
    } catch (err) {
      setIsUploading(false);
      setValidationError(err.message || "Upload failed. Please check the file and try again.");
    }
  };

  return (
    <div 
      className="modal-overlay active" 
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
      style={{ zIndex: 1000 }}
    >
      <div className="modal" style={{ maxWidth: '520px', width: '92%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 600 }}>Upload a Book (PDF Only)</h2>
          <button 
            type="button" 
            onClick={handleClose}
            disabled={isUploading}
            style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', color: 'var(--ink-light, #666)' }}
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {/* Dropzone with Drag and Drop & Click to Browse */}
        <div 
          className={`dropzone ${isDragging ? 'drag-active' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !isUploading && fileInputRef.current?.click()}
          style={{
            position: 'relative',
            cursor: isUploading ? 'not-allowed' : 'pointer',
            border: isDragging ? '2px dashed var(--accent, #9b2c2c)' : '2px dashed var(--border, #d8d0c5)',
            backgroundColor: isDragging ? 'rgba(155, 44, 44, 0.05)' : 'var(--bg-subtle, #faf7f2)',
            borderRadius: '8px',
            padding: '24px 16px',
            textAlign: 'center',
            transition: 'all 0.2s ease',
            marginBottom: '14px'
          }}
        >
          <input 
            ref={fileInputRef}
            type="file" 
            accept="application/pdf,.pdf" 
            onChange={handleFileChange}
            disabled={isUploading}
            style={{ display: 'none' }}
          />

          <div style={{ fontSize: '28px', marginBottom: '8px' }}>📄</div>
          
          {selectedFile ? (
            <div>
              <div style={{ fontWeight: 600, color: 'var(--ink, #222)', wordBreak: 'break-all' }}>
                {selectedFile.name}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--ink-light, #777)', marginTop: '4px' }}>
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB · Ready to upload
              </div>
            </div>
          ) : (
            <div>
              <b style={{ color: 'var(--ink, #222)' }}>
                {isDragging ? "Drop PDF file here" : "Choose a PDF or drag & drop"}
              </b>
              <div style={{ fontSize: '12px', color: 'var(--ink-light, #777)', marginTop: '4px' }}>
                PDF files only · Maximum size {MAX_FILE_SIZE_MB}MB
              </div>
            </div>
          )}
        </div>

        {/* Inline Error Message */}
        {validationError && (
          <div 
            className="upload-error-banner"
            role="alert"
            style={{
              backgroundColor: '#fef2f2',
              border: '1px solid #f87171',
              color: '#991b1b',
              padding: '10px 14px',
              borderRadius: '6px',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '16px'
            }}
          >
            <span style={{ fontSize: '16px', fontWeight: 'bold' }}>⚠️</span>
            <span>{validationError}</span>
          </div>
        )}

        {/* Upload Progress Bar */}
        {isUploading && (
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px', color: 'var(--ink, #333)' }}>
              <span>Uploading &amp; extracting metadata...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div style={{ width: '100%', height: '8px', backgroundColor: '#e5e1da', borderRadius: '4px', overflow: 'hidden' }}>
              <div 
                style={{ 
                  width: `${uploadProgress}%`, 
                  height: '100%', 
                  backgroundColor: 'var(--accent, #9b2c2c)', 
                  transition: 'width 0.2s ease',
                  borderRadius: '4px' 
                }} 
              />
            </div>
          </div>
        )}

        {/* Metadata form fields */}
        <div className="field" style={{ marginBottom: '12px' }}>
          <label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--ink, #444)', display: 'block', marginBottom: '4px' }}>
            Title <small style={{ color: 'var(--ink-light, #888)' }}>(Optional - extracted from PDF if blank)</small>
          </label>
          <input 
            type="text"
            placeholder="e.g. Frankenstein"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isUploading}
            style={{ width: '100%', padding: '8px 10px', borderRadius: '5px', border: '1px solid var(--border, #ccc)' }}
          />
        </div>

        <div className="field" style={{ marginBottom: '12px' }}>
          <label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--ink, #444)', display: 'block', marginBottom: '4px' }}>
            Author <small style={{ color: 'var(--ink-light, #888)' }}>(Optional - extracted from PDF if blank)</small>
          </label>
          <input 
            type="text"
            placeholder="e.g. Mary Shelley"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            disabled={isUploading}
            style={{ width: '100%', padding: '8px 10px', borderRadius: '5px', border: '1px solid var(--border, #ccc)' }}
          />
        </div>

        <div className="field" style={{ marginBottom: '12px' }}>
          <label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--ink, #444)', display: 'block', marginBottom: '4px' }}>
            Genres
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', maxHeight: '72px', overflowY: 'auto', padding: '4px 0' }}>
            {AVAILABLE_GENRES.map((g) => {
              const active = genres.includes(g);
              return (
                <button
                  type="button"
                  key={g}
                  onClick={() => handleGenreToggle(g)}
                  disabled={isUploading}
                  style={{
                    padding: '4px 10px',
                    fontSize: '12px',
                    borderRadius: '14px',
                    border: active ? '1px solid var(--accent, #9b2c2c)' : '1px solid var(--border, #d0c8be)',
                    backgroundColor: active ? 'var(--accent, #9b2c2c)' : '#fff',
                    color: active ? '#fff' : 'var(--ink, #333)',
                    cursor: isUploading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {g}
                </button>
              );
            })}
          </div>
        </div>

        <div className="field" style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--ink, #444)', display: 'block', marginBottom: '4px' }}>
            Total Pages <small style={{ color: 'var(--ink-light, #888)' }}>(Optional - auto-counted from PDF)</small>
          </label>
          <input 
            type="number"
            min="1"
            placeholder="Auto-detected from PDF"
            value={totalPages}
            onChange={(e) => setTotalPages(e.target.value)}
            disabled={isUploading}
            style={{ width: '100%', padding: '8px 10px', borderRadius: '5px', border: '1px solid var(--border, #ccc)' }}
          />
        </div>

        {/* Modal Actions */}
        <div className="modal-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button 
            type="button" 
            className="btn-text" 
            onClick={handleClose} 
            disabled={isUploading}
            style={{ padding: '8px 16px', border: 'none', background: 'none', cursor: isUploading ? 'not-allowed' : 'pointer' }}
          >
            Cancel
          </button>
          <button 
            type="button" 
            className="btn-add" 
            onClick={handleSubmit}
            disabled={isUploading}
            style={{
              padding: '8px 20px',
              backgroundColor: isUploading ? '#a0aec0' : 'var(--accent, #9b2c2c)',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: isUploading ? 'not-allowed' : 'pointer',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {isUploading ? (
              <>
                <span className="spinner" style={{ display: 'inline-block', width: '12px', height: '12px', border: '2px solid #fff', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}></span>
                Uploading...
              </>
            ) : "Add to Library"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
