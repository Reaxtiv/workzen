// WebActivityTest.js - Componente de prueba para el WebActivityTracker
import React, { useState, useEffect } from 'react';

const WebActivityTest = ({ webStats, webTracker, startWebTracking, stopWebTracking, className = '' }) => {
  const [currentSimulation, setCurrentSimulation] = useState('WorkZen Dashboard');
  const [isTrackerActive, setIsTrackerActive] = useState(true);
  
  const testSites = [
    { 
      name: 'YouTube', 
      url: 'https://youtube.com/watch?v=123',
      category: 'entertainment',
      productive: false,
      color: '#EF4444'
    },
    { 
      name: 'Facebook', 
      url: 'https://facebook.com/feed',
      category: 'social_media',
      productive: false,
      color: '#3B82F6'
    },
    { 
      name: 'GitHub', 
      url: 'https://github.com/user/repo',
      category: 'development',
      productive: true,
      color: '#10B981'
    },
    { 
      name: 'Stack Overflow', 
      url: 'https://stackoverflow.com/questions/123',
      category: 'development',
      productive: true,
      color: '#F97316'
    },
    { 
      name: 'Netflix', 
      url: 'https://netflix.com/browse',
      category: 'entertainment',
      productive: false,
      color: '#E53E3E'
    },
    { 
      name: 'Gmail', 
      url: 'https://gmail.com/inbox',
      category: 'business',
      productive: true,
      color: '#06B6D4'
    }
  ];

  const handleStartTracking = () => {
    if (startWebTracking) {
      startWebTracking();
      setIsTrackerActive(true);
      console.log('🟢 WebTracker started manually');
    }
  };

  const handleStopTracking = () => {
    if (stopWebTracking) {
      stopWebTracking();
      setIsTrackerActive(false);
      console.log('🔴 WebTracker stopped manually');
    }
  };

  const simulateVisit = (site) => {
    setCurrentSimulation(site.name);
    
    // Simular tiempo gastado en la categoría anterior (5-15 segundos)
    if (webTracker) {
      const randomTime = Math.floor(Math.random() * 10000) + 5000; // 5-15 segundos
      if (!webTracker.timeSpentByCategory[site.category]) {
        webTracker.timeSpentByCategory[site.category] = 0;
      }
      webTracker.timeSpentByCategory[site.category] += randomTime;
      
      console.log(`🌐 Simulated ${Math.round(randomTime/1000)}s on ${site.name} (${site.category})`);
    }
  };

  const openRealSite = (url) => {
    window.open(url, '_blank');
    console.log(`🔗 Opened real site: ${url}`);
  };

  return (
    <div className={`bg-white p-6 rounded-xl shadow-sm border border-gray-200 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">🧪 Web Activity Testing</h3>
        <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">
          Current simulation: <strong className="text-blue-600">{currentSimulation}</strong>
        </p>
        <p className="text-xs text-gray-500">
          Test the web activity tracker by simulating visits or opening real sites:
        </p>
      </div>

      <div className="space-y-2 mb-4">
        <h4 className="text-sm font-semibold text-gray-700">Simulate Time Spent:</h4>
        <div className="grid grid-cols-2 gap-2">
          {testSites.map((site) => (
            <button
              key={site.name}
              onClick={() => simulateVisit(site)}
              className={`p-3 text-sm rounded-lg border transition-all duration-200 hover:scale-105 ${
                currentSimulation === site.name
                  ? 'bg-blue-100 border-blue-300 text-blue-700'
                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: site.color }}
                ></div>
                <span>{site.name}</span>
              </div>
              <div className="text-xs opacity-75">
                {site.productive ? '✅ Productive' : '❌ Distraction'}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <h4 className="text-sm font-semibold text-gray-700">Open Real Sites (New Tab):</h4>
        <div className="grid grid-cols-2 gap-2">
          {testSites.slice(0, 4).map((site) => (
            <button
              key={`real-${site.name}`}
              onClick={() => openRealSite(site.url)}
              className="p-2 text-xs rounded-lg bg-green-50 border border-green-200 text-green-700 hover:bg-green-100 transition-colors"
            >
              🔗 Open {site.name}
            </button>
          ))}
        </div>
      </div>

      {/* Mostrar datos actuales del tracker */}
      {webStats && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Current Tracker Data:</h4>
          <div className="text-xs space-y-1">
            <div>
              <strong>Current Site:</strong> {webStats.current?.label || 'WorkZen Dashboard'}
              {webStats.current?.productive !== null && (
                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                  webStats.current.productive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {webStats.current.productive ? 'Productive' : 'Distraction'}
                </span>
              )}
            </div>
            <div><strong>Web Productivity Score:</strong> {webStats.webProductivityScore || 100}%</div>
            <div><strong>Categories Tracked:</strong> {Object.keys(webStats.categoryStats || {}).length}</div>
            <div><strong>Total Time:</strong> {Math.round((webStats.totalTime || 0) / 1000)}s</div>
          </div>
        </div>
      )}

      <div className="mt-4 text-xs text-gray-500 border-t pt-3">
        <p>💡 <strong>Instructions:</strong></p>
        <p>• Use "Simulate" buttons to add fake data and see the tracker work</p>
        <p>• Use "Open Real Sites" to test actual web tracking (return to this tab to see changes)</p>
        <p>• Check browser console for detailed tracking logs</p>
      </div>
    </div>
  );
};

export default WebActivityTest;
