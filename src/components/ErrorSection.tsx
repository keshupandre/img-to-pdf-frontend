'use client';

interface ErrorSectionProps {
  error: string;
  onDismiss: () => void;
}

export function ErrorSection({ error, onDismiss }: ErrorSectionProps) {
  return (
    <div className="bg-red-500/10 backdrop-blur-sm border border-red-400/30 rounded-3xl p-8 text-center animate-fadeInUp">
      {/* Error Icon */}
      <div className="relative mb-6">
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
      </div>

      {/* Error Title */}
      <h3 className="text-2xl font-bold text-red-400 mb-4">
        Oops! Something went wrong
      </h3>
      
      {/* Error Message */}
      <div className="bg-red-500/20 rounded-2xl p-4 mb-6 border border-red-400/30">
        <p className="text-red-200 font-medium">
          {error}
        </p>
      </div>

      {/* Troubleshooting Tips */}
      <div className="text-left mb-8 space-y-2">
        <p className="text-purple-200 font-medium mb-3 text-center">💡 Quick fixes to try:</p>
        <div className="space-y-2 text-sm text-purple-300">
          <div className="flex items-start space-x-2">
            <span className="text-red-400">•</span>
            <span>Check if your images are in supported formats (JPG, JPEG, PNG)</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-red-400">•</span>
            <span>Ensure your images are not corrupted or too large</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-red-400">•</span>
            <span>Check your internet connection</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-red-400">•</span>
            <span>Try with fewer images at once</span>
          </div>
        </div>
      </div>
      
      {/* Action Button */}
      <button
        onClick={onDismiss}
        className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-2xl transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-2 mx-auto"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <span>Try Again</span>
      </button>
    </div>
  );
}
