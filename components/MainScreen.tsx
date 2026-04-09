import { useState } from 'react';
import { Camera, List, Map } from 'lucide-react';
import { CameraCapture } from './CameraCapture';
import { ReportList } from './ReportList';
import { MapView } from './MapView';
import { Button } from './ui/button';

export interface Report {
  id: string;
  image: string;
  description: string;
  location: string;
  lat: number;
  lng: number;
  timestamp: Date;
  aiAnalysis: string;
  aiLocationInfo?: string;
  emailSent: boolean;
  emailRead: boolean;
}

export function MainScreen() {
  const [view, setView] = useState<'capture' | 'list' | 'map'>('capture');
  const [reports, setReports] = useState<Report[]>([]);

  const handleReportSubmit = (report: Report) => {
    setReports([report, ...reports]);
  };

  return (
    <div className="h-full flex flex-col">
  {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white pt-3 pb-3 px-4 shadow-lg flex-shrink-0">
        <div className="flex items-center justify-between">
          <h1 className="text-left font-semibold">🚨 Udong's</h1>

          {/* 프로필 */}
          <button className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center overflow-hidden border border-white/60">
            {/* 이미지 있는 경우 */}
            {/* <img src="/profile.jpg" alt="프로필" className="w-full h-full object-cover" /> */}

            {/* 이미지 없을 때 이니셜 */}
            <span className="text-orange-600 text-sm font-semibold">U</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-orange-100 flex-shrink-0">
        <div className="flex">
          <button
            onClick={() => setView('capture')}
            className={`flex-1 flex flex-col items-center justify-center gap-1 py-3 transition-colors ${
              view === 'capture'
                ? 'text-orange-600 border-b-2 border-orange-600'
                : 'text-gray-400'
            }`}
          >
            <Camera className="w-5 h-5" />
            <span className="text-xs">신고</span>
          </button>
          <button
            onClick={() => setView('list')}
            className={`flex-1 flex flex-col items-center justify-center gap-1 py-3 transition-colors ${
              view === 'list'
                ? 'text-orange-600 border-b-2 border-orange-600'
                : 'text-gray-400'
            }`}
          >
            <List className="w-5 h-5" />
            <span className="text-xs">내역 {reports.length > 0 && `(${reports.length})`}</span>
          </button>
          <button
            onClick={() => setView('map')}
            className={`flex-1 flex flex-col items-center justify-center gap-1 py-3 transition-colors ${
              view === 'map'
                ? 'text-orange-600 border-b-2 border-orange-600'
                : 'text-gray-400'
            }`}
          >
            <Map className="w-5 h-5" />
            <span className="text-xs">지도</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {view === 'capture' && <CameraCapture onReportSubmit={handleReportSubmit} />}
        {view === 'list' && <ReportList reports={reports} setReports={setReports} />}
        {view === 'map' && <MapView reports={reports} setReports={setReports} />}
      </div>
    </div>
  );
}
