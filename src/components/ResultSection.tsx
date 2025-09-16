'use client';

interface ResultSectionProps {
  onDownload: () => void;
  onNewConversion: () => void;
}

export function ResultSection({ onDownload, onNewConversion }: ResultSectionProps) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-12 border border-white/10 text-center">
      {/* Success Animation */}
      <div className="relative mb-8">
        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center animate-bounce">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        {/* Success rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 bg-emerald-400 rounded-2xl opacity-75 animate-pulse-ring" />
          <div className="absolute w-24 h-24 bg-emerald-400 rounded-2xl opacity-75 animate-pulse-ring animation-delay-2000" />
        </div>
      </div>

      {/* Success Message */}
      <h3 className="text-4xl font-bold text-white mb-4">
        🎉 Conversion Complete!
      </h3>
      <p className="text-xl text-emerald-200 mb-2 font-medium">
        Your PDF has been generated successfully
      </p>
      <p className="text-purple-300 mb-12 text-sm">
        Ready for download • High quality • Optimized size
      </p>

      {/* Feature highlights */}
      <div className="grid grid-cols-3 gap-6 mb-12 max-w-md mx-auto">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <p className="text-xs text-purple-200">Fast</p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
            <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-xs text-purple-200">Quality</p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
            <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <p className="text-xs text-purple-200">Secure</p>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onDownload}
          className="group relative bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:scale-105 flex items-center justify-center space-x-3 btn-glow overflow-hidden"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Download PDF</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 group-hover:animate-shimmer" />
        </button>
        
        <button
          onClick={onNewConversion}
          className="bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 hover:shadow-lg hover:scale-105 backdrop-blur-sm flex items-center justify-center space-x-3"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Convert More Images</span>
        </button>
      </div>

      {/* Helpful tip */}
      <div className="mt-8 p-4 bg-blue-500/10 rounded-2xl border border-blue-400/20">
        <p className="text-blue-200 text-sm flex items-center justify-center">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          Your PDF maintains the original image quality and order
        </p>
      </div>
    </div>
  );
}
