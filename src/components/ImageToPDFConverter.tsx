'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { UploadArea } from './UploadArea';
import { ProgressSection } from './ProgressSection';
import { ErrorSection } from './ErrorSection';
import { ResultSection } from './ResultSection';
import { FileList } from './FileList';
import { ConversionOptions } from './ConversionOptions';

interface SelectedFile extends File {
  id: string;
}

// Helper function to create SelectedFile from File
function createSelectedFile(file: File): SelectedFile {
  return Object.assign(file, { id: Math.random().toString(36).substr(2, 9) });
}

export function ImageToPDFConverter() {
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
  const [currentPdfFile, setCurrentPdfFile] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  
  // Conversion options state
  const [conversionOptions, setConversionOptions] = useState({
    fit: false,
    position: 'center',
    orientation: 'P',
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'; // Backend URL from environment variable

  const isValidImageFile = useCallback((file: File) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    return validTypes.includes(file.type);
  }, []);

  const addFiles = useCallback((files: File[]) => {
    const imageFiles = files.filter(isValidImageFile);
    
    if (imageFiles.length === 0) {
      setError('Please select valid image files (JPG, JPEG, PNG)');
      return;
    }

    const newFiles: SelectedFile[] = imageFiles.map(file => createSelectedFile(file));

    setSelectedFiles(prev => {
      // Check for duplicates
      const existingNames = new Set(prev.map(f => f.name + f.size));
      const uniqueFiles = newFiles.filter(f => !existingNames.has(f.name + f.size));
      return [...prev, ...uniqueFiles];
    });

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [isValidImageFile]);

  const removeFile = useCallback((id: string) => {
    setSelectedFiles(prev => prev.filter(file => file.id !== id));
  }, []);

  const clearFiles = useCallback(() => {
    setSelectedFiles([]);
    setCurrentPdfFile(null);
    setShowResult(false);
    setError(null);
    setProgress(0);
  }, []);

  const moveFile = useCallback((id: string, direction: 'up' | 'down') => {
    setSelectedFiles(prev => {
      const index = prev.findIndex(file => file.id === id);
      if (index === -1) return prev;
      
      const newFiles = [...prev];
      if (direction === 'up' && index > 0) {
        [newFiles[index], newFiles[index - 1]] = [newFiles[index - 1], newFiles[index]];
      } else if (direction === 'down' && index < newFiles.length - 1) {
        [newFiles[index], newFiles[index + 1]] = [newFiles[index + 1], newFiles[index]];
      }
      return newFiles;
    });
  }, []);

  const reorderFiles = useCallback((dragIndex: number, dropIndex: number) => {
    setSelectedFiles(prev => {
      const newFiles = [...prev];
      const draggedFile = newFiles[dragIndex];
      newFiles.splice(dragIndex, 1);
      newFiles.splice(dropIndex, 0, draggedFile);
      return newFiles;
    });
  }, []);

  const convertToPDF = useCallback(async () => {
    if (selectedFiles.length === 0) {
      setError('Please select at least one image');
      return;
    }

    setIsConverting(true);
    setError(null);
    setProgress(0);

    // Animate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const increment = Math.random() * 15;
        return Math.min(prev + increment, 90);
      });
    }, 200);

    try {
      const formData = new FormData();
      
      // Add conversion options to form data
      formData.append('fit', conversionOptions.fit.toString());
      formData.append('position', conversionOptions.position);
      formData.append('orientation', conversionOptions.orientation);
      
      // Debug: Log the files being added
      console.log('Selected files:', selectedFiles);
      console.log('Conversion options:', conversionOptions);
      
      selectedFiles.forEach((file, index) => {
        console.log(`Adding file ${index}:`, file.name, file.size, file.type);
        // Append file directly without casting
        formData.append('images', file);
      });

      // Debug: Log FormData contents
      console.log('FormData entries:');
      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
        if (pair[1] instanceof File) {
          console.log('File details:', pair[1].name, pair[1].size, pair[1].type);
        }
      }

      const response = await fetch(`${apiUrl}/upload`, {
        method: 'POST',
        body: formData,
        // Don't set Content-Type header, let browser set it with boundary
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server error response:', errorText);
        throw new Error(errorText || 'Conversion failed');
      }

      const result = await response.json();
      console.log('Success response:', result);
      
      if (result.success) {
        setCurrentPdfFile(result.pdfFile);
        setProgress(100);
        
        setTimeout(() => {
          clearInterval(progressInterval);
          setIsConverting(false);
          setShowResult(true);
        }, 500);
      } else {
        throw new Error('Conversion failed');
      }

    } catch (error) {
      clearInterval(progressInterval);
      console.error('Conversion error:', error);
      setError(`Failed to convert images: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setIsConverting(false);
      setProgress(0);
    }
  }, [selectedFiles, apiUrl, conversionOptions]);

  const downloadPDF = useCallback(async () => {
    if (!currentPdfFile) {
      setError('No PDF file available for download');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/download?file=${currentPdfFile}`);
      
      if (!response.ok) {
        throw new Error('Download failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = currentPdfFile;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Download error:', error);
      setError(`Failed to download PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }, [currentPdfFile, apiUrl]);

  const resetConverter = useCallback(() => {
    clearFiles();
  }, [clearFiles]);

  const hideError = useCallback(() => {
    setError(null);
  }, []);

  // Health check to test backend connection
  const checkBackendHealth = useCallback(async () => {
    try {
      console.log('Checking backend health...');
      const response = await fetch(`${apiUrl}/health`);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Backend health check successful:', data);
      } else {
        console.error('Backend health check failed:', response.status);
        setError('Cannot connect to the image conversion service. Please try again later or contact support if the issue persists.');
      }
    } catch (error) {
      console.error('Backend health check error:', error);
      setError('Cannot connect to the image conversion service. Please try again later or contact support if the issue persists.');
    }
  }, [apiUrl]);

  // Check backend health on component mount
  useEffect(() => {
    checkBackendHealth();
  }, [checkBackendHealth]);

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      {!isConverting && !showResult && (
        <>
          <UploadArea
            onFilesSelected={addFiles}
            fileInputRef={fileInputRef}
          />
          
          {selectedFiles.length > 0 && (
            <>
              <FileList
                files={selectedFiles}
                onRemoveFile={removeFile}
                onMoveFile={moveFile}
                onReorderFiles={reorderFiles}
                onConvert={convertToPDF}
                onClear={clearFiles}
              />
              
              <ConversionOptions
                fit={conversionOptions.fit}
                position={conversionOptions.position}
                orientation={conversionOptions.orientation}
                onFitChange={(fit) => setConversionOptions(prev => ({ ...prev, fit }))}
                onPositionChange={(position) => setConversionOptions(prev => ({ ...prev, position }))}
                onOrientationChange={(orientation) => setConversionOptions(prev => ({ ...prev, orientation }))}
              />
            </>
          )}
        </>
      )}

      {/* Progress */}
      {isConverting && (
        <ProgressSection progress={progress} />
      )}

      {/* Result */}
      {showResult && !isConverting && (
        <ResultSection
          onDownload={downloadPDF}
          onNewConversion={resetConverter}
        />
      )}

      {/* Error */}
      {error && (
        <ErrorSection
          error={error}
          onDismiss={hideError}
        />
      )}
    </div>
  );
}
