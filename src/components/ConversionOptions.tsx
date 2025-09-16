'use client';

interface ConversionOptionsProps {
  fit: boolean;
  position: string;
  orientation: string;
  onFitChange: (fit: boolean) => void;
  onPositionChange: (position: string) => void;
  onOrientationChange: (orientation: string) => void;
}

export function ConversionOptions({
  fit,
  position,
  orientation,
  onFitChange,
  onPositionChange,
  onOrientationChange,
}: ConversionOptionsProps) {
  const positions = [
    { value: 'center', label: 'Center', icon: '●' },
    { value: 'top-left', label: 'Top Left', icon: '◤' },
    { value: 'top-center', label: 'Top Center', icon: '▲' },
    { value: 'top-right', label: 'Top Right', icon: '◥' },
    { value: 'center-left', label: 'Center Left', icon: '◀' },
    { value: 'center-right', label: 'Center Right', icon: '▶' },
    { value: 'bottom-left', label: 'Bottom Left', icon: '◣' },
    { value: 'bottom-center', label: 'Bottom Center', icon: '▼' },
    { value: 'bottom-right', label: 'Bottom Right', icon: '◢' },
  ];

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 mb-6">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4m0-6V4" />
        </svg>
        Conversion Options
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Orientation */}
        <div>
          <label className="block text-purple-200 text-sm font-medium mb-3">
            📄 PDF Orientation
          </label>
          <div className="space-y-2">
            <label className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="radio"
                name="orientation"
                value="P"
                checked={orientation === 'P'}
                onChange={(e) => onOrientationChange(e.target.value)}
                className="w-4 h-4 text-purple-500 border-purple-300 focus:ring-purple-500"
              />
              <span className="text-white group-hover:text-purple-200 transition-colors">
                📖 Portrait
              </span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="radio"
                name="orientation"
                value="L"
                checked={orientation === 'L'}
                onChange={(e) => onOrientationChange(e.target.value)}
                className="w-4 h-4 text-purple-500 border-purple-300 focus:ring-purple-500"
              />
              <span className="text-white group-hover:text-purple-200 transition-colors">
                📰 Landscape
              </span>
            </label>
          </div>
        </div>

        {/* Position */}
        <div>
          <label className="block text-purple-200 text-sm font-medium mb-3">
            📍 Image Position
          </label>
          <select
            value={position}
            onChange={(e) => onPositionChange(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
          >
            {positions.map((pos) => (
              <option key={pos.value} value={pos.value} className="bg-gray-800 text-white">
                {pos.icon} {pos.label}
              </option>
            ))}
          </select>
        </div>

        {/* Fit Small Images */}
        <div>
          <label className="block text-purple-200 text-sm font-medium mb-3">
            🔍 Image Scaling
          </label>
          <label className="flex items-center space-x-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={fit}
              onChange={(e) => onFitChange(e.target.checked)}
              className="w-4 h-4 text-purple-500 border-purple-300 rounded focus:ring-purple-500"
            />
            <div>
              <span className="text-white group-hover:text-purple-200 transition-colors block">
                Fit small images
              </span>
              <span className="text-purple-300 text-xs">
                Scale up small images to fit page
              </span>
            </div>
          </label>
        </div>
      </div>

      {/* Position Visual Guide */}
      <div className="mt-6 p-4 bg-purple-500/10 rounded-2xl border border-purple-400/20">
        <p className="text-purple-200 text-sm mb-3 font-medium">📍 Position Preview:</p>
        <div className="relative">
          {/* PDF Page Representation */}
          <div className="mx-auto w-36 h-48 bg-white/5 border border-white/20 rounded-lg p-2 relative">
            <div className="grid grid-cols-3 gap-1 h-full">
              {/* Top Row */}
              <button
                onClick={() => onPositionChange('top-left')}
                className={`w-full h-full rounded text-sm transition-all duration-200 flex items-center justify-center ${
                  position === 'top-left'
                    ? 'bg-purple-500 text-white shadow-lg scale-110'
                    : 'bg-white/10 text-purple-300 hover:bg-white/20 hover:scale-105'
                }`}
                title="Top Left"
              >
                ◤
              </button>
              <button
                onClick={() => onPositionChange('top-center')}
                className={`w-full h-full rounded text-sm transition-all duration-200 flex items-center justify-center ${
                  position === 'top-center'
                    ? 'bg-purple-500 text-white shadow-lg scale-110'
                    : 'bg-white/10 text-purple-300 hover:bg-white/20 hover:scale-105'
                }`}
                title="Top Center"
              >
                ▲
              </button>
              <button
                onClick={() => onPositionChange('top-right')}
                className={`w-full h-full rounded text-sm transition-all duration-200 flex items-center justify-center ${
                  position === 'top-right'
                    ? 'bg-purple-500 text-white shadow-lg scale-110'
                    : 'bg-white/10 text-purple-300 hover:bg-white/20 hover:scale-105'
                }`}
                title="Top Right"
              >
                ◥
              </button>
              
              {/* Middle Row */}
              <button
                onClick={() => onPositionChange('center-left')}
                className={`w-full h-full rounded text-sm transition-all duration-200 flex items-center justify-center ${
                  position === 'center-left'
                    ? 'bg-purple-500 text-white shadow-lg scale-110'
                    : 'bg-white/10 text-purple-300 hover:bg-white/20 hover:scale-105'
                }`}
                title="Center Left"
              >
                ◀
              </button>
              <button
                onClick={() => onPositionChange('center')}
                className={`w-full h-full rounded text-sm transition-all duration-200 flex items-center justify-center ${
                  position === 'center'
                    ? 'bg-purple-500 text-white shadow-lg scale-110'
                    : 'bg-white/10 text-purple-300 hover:bg-white/20 hover:scale-105'
                }`}
                title="Center"
              >
                ●
              </button>
              <button
                onClick={() => onPositionChange('center-right')}
                className={`w-full h-full rounded text-sm transition-all duration-200 flex items-center justify-center ${
                  position === 'center-right'
                    ? 'bg-purple-500 text-white shadow-lg scale-110'
                    : 'bg-white/10 text-purple-300 hover:bg-white/20 hover:scale-105'
                }`}
                title="Center Right"
              >
                ▶
              </button>
              
              {/* Bottom Row */}
              <button
                onClick={() => onPositionChange('bottom-left')}
                className={`w-full h-full rounded text-sm transition-all duration-200 flex items-center justify-center ${
                  position === 'bottom-left'
                    ? 'bg-purple-500 text-white shadow-lg scale-110'
                    : 'bg-white/10 text-purple-300 hover:bg-white/20 hover:scale-105'
                }`}
                title="Bottom Left"
              >
                ◣
              </button>
              <button
                onClick={() => onPositionChange('bottom-center')}
                className={`w-full h-full rounded text-sm transition-all duration-200 flex items-center justify-center ${
                  position === 'bottom-center'
                    ? 'bg-purple-500 text-white shadow-lg scale-110'
                    : 'bg-white/10 text-purple-300 hover:bg-white/20 hover:scale-105'
                }`}
                title="Bottom Center"
              >
                ▼
              </button>
              <button
                onClick={() => onPositionChange('bottom-right')}
                className={`w-full h-full rounded text-sm transition-all duration-200 flex items-center justify-center ${
                  position === 'bottom-right'
                    ? 'bg-purple-500 text-white shadow-lg scale-110'
                    : 'bg-white/10 text-purple-300 hover:bg-white/20 hover:scale-105'
                }`}
                title="Bottom Right"
              >
                ◢
              </button>
            </div>
          </div>
          <p className="text-center text-purple-300 text-xs mt-2">PDF Page Layout</p>
        </div>
      </div>
    </div>
  );
}
