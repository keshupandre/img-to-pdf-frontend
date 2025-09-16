'use client';

interface ProgressSectionProps {
  progress: number;
}

export function ProgressSection({ progress }: ProgressSectionProps) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-12 border border-white/10 text-center">
      {/* Animated Progress Icon */}
      <div className="relative mb-8">
        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center animate-pulse">
          <svg className="w-12 h-12 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
        
        {/* Pulse rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 bg-purple-400 rounded-2xl opacity-75 animate-pulse-ring" />
          <div className="absolute w-24 h-24 bg-purple-400 rounded-2xl opacity-75 animate-pulse-ring animation-delay-2000" />
        </div>
      </div>

      {/* Progress Title */}
      <h3 className="text-3xl font-bold text-white mb-6">
        Converting Your Images
      </h3>
      
      {/* Progress Bar Container */}
      <div className="relative w-full max-w-md mx-auto mb-8">
        <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden backdrop-blur-sm border border-white/20">
          <div
            className="bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-600 h-3 rounded-full transition-all duration-500 ease-out relative overflow-hidden"
            style={{ width: `${progress}%` }}
          >
            {/* Shimmer effect on progress bar */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
          </div>
        </div>
        
        {/* Progress percentage overlay */}
        <div className="absolute -top-8 left-0 w-full flex justify-center">
          <div className="bg-purple-500/20 px-4 py-2 rounded-xl border border-purple-400/30">
            <span className="text-white font-bold text-lg">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>

      {/* Status Messages */}
      <div className="space-y-2">
        <p className="text-xl font-semibold text-purple-200">
          {progress < 30 && "Preparing your images..."}
          {progress >= 30 && progress < 60 && "Processing images..."}
          {progress >= 60 && progress < 90 && "Creating PDF document..."}
          {progress >= 90 && "Almost ready!"}
        </p>
        <p className="text-purple-300 text-sm">
          Please wait while we convert your images to PDF
        </p>
      </div>

      {/* Progress Steps Indicator */}
      <div className="flex justify-center items-center space-x-4 mt-8">
        <div className={`flex items-center space-x-2 ${progress >= 25 ? 'text-emerald-400' : 'text-purple-300'}`}>
          <div className={`w-3 h-3 rounded-full ${progress >= 25 ? 'bg-emerald-400' : 'bg-purple-300/50'} transition-colors duration-300`} />
          <span className="text-sm font-medium">Upload</span>
        </div>
        <div className="w-8 h-px bg-purple-300/30" />
        <div className={`flex items-center space-x-2 ${progress >= 50 ? 'text-emerald-400' : 'text-purple-300'}`}>
          <div className={`w-3 h-3 rounded-full ${progress >= 50 ? 'bg-emerald-400' : 'bg-purple-300/50'} transition-colors duration-300`} />
          <span className="text-sm font-medium">Process</span>
        </div>
        <div className="w-8 h-px bg-purple-300/30" />
        <div className={`flex items-center space-x-2 ${progress >= 75 ? 'text-emerald-400' : 'text-purple-300'}`}>
          <div className={`w-3 h-3 rounded-full ${progress >= 75 ? 'bg-emerald-400' : 'bg-purple-300/50'} transition-colors duration-300`} />
          <span className="text-sm font-medium">Convert</span>
        </div>
        <div className="w-8 h-px bg-purple-300/30" />
        <div className={`flex items-center space-x-2 ${progress >= 100 ? 'text-emerald-400' : 'text-purple-300'}`}>
          <div className={`w-3 h-3 rounded-full ${progress >= 100 ? 'bg-emerald-400' : 'bg-purple-300/50'} transition-colors duration-300`} />
          <span className="text-sm font-medium">Complete</span>
        </div>
      </div>
    </div>
  );
}
