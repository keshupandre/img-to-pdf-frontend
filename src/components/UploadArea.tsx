'use client';

import { useCallback, DragEvent, RefObject, useState } from 'react';

interface UploadAreaProps {
  onFilesSelected: (files: File[]) => void;
  fileInputRef: RefObject<HTMLInputElement | null>;
}

export function UploadArea({ onFilesSelected, fileInputRef }: UploadAreaProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    onFilesSelected(files);
  }, [onFilesSelected]);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    onFilesSelected(files);
  }, [onFilesSelected]);

  const openFileDialog = useCallback(() => {
    fileInputRef.current?.click();
  }, [fileInputRef]);

  return (
    <div
      className={`relative border-2 border-dashed rounded-3xl p-12 md:p-16 text-center transition-all duration-300 cursor-pointer group ${
        isDragOver
          ? 'border-emerald-400 bg-emerald-50/80 backdrop-blur-sm scale-105'
          : 'border-purple-300/50 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-purple-400/70 hover:scale-[1.02]'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={openFileDialog}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/20 to-pink-50/20 rounded-3xl" />
      
      <div className="relative pointer-events-none">
        {/* Upload Icon with Animation */}
        <div className="relative mb-8">
          <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-all duration-300 ${
            isDragOver 
              ? 'bg-emerald-500 scale-110' 
              : 'bg-gradient-to-br from-purple-500 to-pink-500 group-hover:scale-110 group-hover:shadow-lg'
          }`}>
            <svg 
              className="w-10 h-10 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isDragOver ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              )}
            </svg>
          </div>
          
          {/* Pulse rings for drag state */}
          {isDragOver && (
            <>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-emerald-400 rounded-2xl opacity-75 animate-pulse-ring" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-emerald-400 rounded-2xl opacity-75 animate-pulse-ring animation-delay-2000" />
            </>
          )}
        </div>

        <h3 className={`text-2xl md:text-3xl font-bold mb-4 transition-colors duration-300 ${
          isDragOver ? 'text-emerald-600' : 'text-white group-hover:text-purple-100'
        }`}>
          {isDragOver ? 'Drop your images here!' : 'Upload Your Images'}
        </h3>
        
        <p className={`text-lg mb-8 transition-colors duration-300 ${
          isDragOver ? 'text-emerald-700' : 'text-purple-200 group-hover:text-purple-100'
        }`}>
          {isDragOver 
            ? 'Release to upload your files' 
            : 'Drag and drop images here, or click to browse'
          }
        </p>

        {/* Supported formats */}
        <div className="flex items-center justify-center space-x-6 mb-8 text-sm text-purple-300">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full" />
            <span>JPG</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full" />
            <span>JPEG</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-pink-400 rounded-full" />
            <span>PNG</span>
          </div>
        </div>
        
        <button
          type="button"
          className="group/btn relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:scale-105 pointer-events-auto btn-glow overflow-hidden"
          onClick={(e) => {
            e.stopPropagation();
            openFileDialog();
          }}
        >
          <div className="flex items-center space-x-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Choose Files</span>
          </div>
          
          {/* Shimmer effect */}
          <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 group-hover/btn:animate-shimmer" />
        </button>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />
    </div>
  );
}
