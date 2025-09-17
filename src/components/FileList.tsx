'use client';

import { useState, useCallback, DragEvent, useEffect } from 'react';

interface SelectedFile extends File {
  id: string;
}

interface FileListProps {
  files: SelectedFile[];
  onRemoveFile: (id: string) => void;
  onMoveFile: (id: string, direction: 'up' | 'down') => void;
  onReorderFiles: (dragIndex: number, dropIndex: number) => void;
  onConvert: () => void;
  onClear: () => void;
}

export function FileList({ 
  files, 
  onRemoveFile, 
  onMoveFile, 
  onReorderFiles, 
  onConvert, 
  onClear 
}: FileListProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [imageUrls, setImageUrls] = useState<Map<string, string>>(new Map());

  const formatFileSize = useCallback((bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }, []);

  // Create and manage image URLs
  useEffect(() => {
    setImageUrls(prevImageUrls => {
      const newImageUrls = new Map<string, string>();
      
      files.forEach(file => {
        if (!prevImageUrls.has(file.id)) {
          newImageUrls.set(file.id, URL.createObjectURL(file));
        } else {
          newImageUrls.set(file.id, prevImageUrls.get(file.id)!);
        }
      });

      // Cleanup old URLs that are no longer needed
      prevImageUrls.forEach((url, id) => {
        if (!files.find(f => f.id === id)) {
          URL.revokeObjectURL(url);
        }
      });

      return newImageUrls;
    });
  }, [files]);

  // Cleanup URLs on unmount
  useEffect(() => {
    return () => {
      imageUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [imageUrls]);

  const handleDragStart = useCallback((e: DragEvent<HTMLDivElement>, index: number) => {
    setDraggedIndex(index);
    e.currentTarget.style.transform = 'rotate(2deg) scale(0.95)';
    e.currentTarget.style.opacity = '0.7';
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (draggedIndex !== null) {
      e.currentTarget.style.transform = 'scale(1.02)';
      e.currentTarget.style.borderColor = '#8b5cf6';
      e.currentTarget.style.backgroundColor = 'rgba(139, 92, 246, 0.1)';
    }
  }, [draggedIndex]);

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = '';
    e.currentTarget.style.borderColor = '';
    e.currentTarget.style.backgroundColor = '';
  }, []);

  const handleDrop = useCallback((e: DragEvent<HTMLDivElement>, dropIndex: number) => {
    e.preventDefault();
    e.currentTarget.style.transform = '';
    e.currentTarget.style.borderColor = '';
    e.currentTarget.style.backgroundColor = '';
    
    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      onReorderFiles(draggedIndex, dropIndex);
    }
  }, [draggedIndex, onReorderFiles]);

  const handleDragEnd = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = '';
    e.currentTarget.style.opacity = '';
    setDraggedIndex(null);
    
    // Clean up all drag effects
    document.querySelectorAll('.file-item').forEach(item => {
      const element = item as HTMLElement;
      element.style.transform = '';
      element.style.borderColor = '';
      element.style.backgroundColor = '';
    });
  }, []);

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">
            Selected Images
          </h3>
          <p className="text-purple-200 text-sm flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Drag to reorder, or use the arrow buttons
          </p>
        </div>
        <div className="bg-purple-500/20 px-4 py-2 rounded-xl border border-purple-400/30">
          <span className="text-purple-200 font-medium">{files.length} files</span>
        </div>
      </div>
      
      <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar mb-8">
        {files.map((file, index) => (
          <div
            key={file.id}
            className="file-item group bg-white/10 backdrop-blur-sm border border-white/20 p-5 rounded-2xl flex items-center justify-between hover:bg-white/15 transition-all duration-300 cursor-move hover:shadow-lg animate-fadeInUp"
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center space-x-4">
              {/* Drag handle */}
              <div className="text-white/50 group-hover:text-white/80 cursor-grab active:cursor-grabbing transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                </svg>
              </div>
              
              {/* File type indicator with image preview */}
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center overflow-hidden border-2 border-white/20">
                {imageUrls.has(file.id) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img 
                    src={imageUrls.get(file.id)} 
                    alt={file.name}
                    className="w-full h-full object-cover rounded-lg"
                    onError={(e) => {
                      // Fallback to icon if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                ) : null}
                <div className="hidden text-white text-xl">📷</div>
              </div>
              
              {/* File info */}
              <div className="flex-1">
                <div className="font-semibold text-white truncate max-w-xs">
                  {file.name}
                </div>
                <div className="text-sm text-purple-200">
                  {formatFileSize(file.size)}
                </div>
              </div>
              
              {/* Order indicator */}
              <div className="bg-purple-500/30 px-3 py-1 rounded-lg text-purple-200 text-sm font-medium">
                #{index + 1}
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onMoveFile(file.id, 'up')}
                disabled={index === 0}
                className="w-10 h-10 bg-blue-500/80 hover:bg-blue-500 disabled:bg-gray-500/50 text-white rounded-xl transition-all duration-200 hover:scale-110 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center"
                title="Move up"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </button>
              <button
                onClick={() => onMoveFile(file.id, 'down')}
                disabled={index === files.length - 1}
                className="w-10 h-10 bg-blue-500/80 hover:bg-blue-500 disabled:bg-gray-500/50 text-white rounded-xl transition-all duration-200 hover:scale-110 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center"
                title="Move down"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <button
                onClick={() => onRemoveFile(file.id)}
                className="w-10 h-10 bg-red-500/80 hover:bg-red-500 text-white rounded-xl transition-all duration-200 hover:scale-110 flex items-center justify-center"
                title="Remove file"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onConvert}
          className="group relative bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:scale-105 flex items-center justify-center space-x-3 btn-glow overflow-hidden"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Convert to PDF</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 group-hover:animate-shimmer" />
        </button>
        
        <button
          onClick={onClear}
          className="bg-red-500/80 hover:bg-red-500 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-3"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          <span>Clear All</span>
        </button>
      </div>
    </div>
  );
}
