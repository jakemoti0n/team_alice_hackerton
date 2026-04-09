import { useState, useEffect } from 'react';
import { MapPin, Navigation, Info, ZoomIn, ZoomOut } from 'lucide-react';
import { Badge } from './ui/badge';
import type { Report } from './MainScreen';
import MapComponent from './map';

interface MapViewProps {
  reports: Report[];
  setReports: React.Dispatch<React.SetStateAction<Report[]>>;
}

export function MapView({ reports, setReports }: MapViewProps) {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [center, setCenter] = useState({ lat: 37.5665, lng: 126.9780 }); // 서울 중심
  const [zoom, setZoom] = useState(12);

  useEffect(() => {
    // 리포트가 있으면 중심점을 리포트들의 평균 위치로 설정
    if (reports.length > 0) {
      const avgLat = reports.reduce((sum, r) => sum + r.lat, 0) / reports.length;
      const avgLng = reports.reduce((sum, r) => sum + r.lng, 0) / reports.length;
      setCenter({ lat: avgLat, lng: avgLng });
    }
  }, [reports]);

  const handleMarkAsRead = (reportId: string) => {
    setReports(reports.map(report => 
      report.id === reportId ? { ...report, emailRead: true } : report
    ));
    if (selectedReport?.id === reportId) {
      setSelectedReport({ ...selectedReport, emailRead: true });
    }
  };

  const goToCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setZoom(15);
      },
      (error) => {
        console.error('위치 정보를 가져올 수 없습니다:', error);
      }
    );
  };

  // 좌표를 화면 픽셀로 변환
  const latLngToPixel = (lat: number, lng: number, width: number, height: number) => {
    // 간단한 메르카토르 투영 사용
    const scale = Math.pow(2, zoom) * 256 / 360;
    const worldWidth = 256 * Math.pow(2, zoom);
    
    const x = (lng + 180) * worldWidth / 360 - (center.lng + 180) * worldWidth / 360 + width / 2;
    const latRad = lat * Math.PI / 180;
    const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
    const centerLatRad = center.lat * Math.PI / 180;
    const centerMercN = Math.log(Math.tan(Math.PI / 4 + centerLatRad / 2));
    const y = height / 2 - (mercN - centerMercN) * worldWidth / (2 * Math.PI);
    
    return { x, y };
  };

  if (reports.length === 1 ) {
    return (
      <div className="flex items-center justify-center h-full bg-orange-50">
        {/* <div className="text-center p-6">
          <div className="w-16 h-16 mx-auto mb-3 bg-orange-100 rounded-full flex items-center justify-center">
            <MapPin className="w-8 h-8 text-orange-400" />
          </div>
          <p className="text-gray-600 text-sm">아직 신고 내역이 없습니다</p>
          <p className="text-gray-400 text-xs mt-1">신고하기 탭에서 문제를 신고하면<br />지도에서 위치를 확인할 수 있습니다</p>
        </div> */}
        <MapComponent kakaoApiKey="1b191295b63ba214e903ff029903f9c5"/>
      </div>
    );
  }

  return (
    <div className="relative h-full overflow-hidden bg-gradient-to-br from-blue-50 to-green-50">
      {/* 지도 그리드 배경 */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#cbd5e1" strokeWidth="0.5" opacity="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* 도로 라인 시뮬레이션 */}
        <line x1="0" y1="30%" x2="100%" y2="30%" stroke="#94a3b8" strokeWidth="2" opacity="0.2" />
        <line x1="0" y1="60%" x2="100%" y2="60%" stroke="#94a3b8" strokeWidth="2" opacity="0.2" />
        <line x1="30%" y1="0" x2="30%" y2="100%" stroke="#94a3b8" strokeWidth="2" opacity="0.2" />
        <line x1="70%" y1="0" x2="70%" y2="100%" stroke="#94a3b8" strokeWidth="2" opacity="0.2" />
      </svg>

      {/* 마커들 */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        {reports.map((report) => {
          const container = document.querySelector('.relative.h-\\[calc\\(100vh-180px\\)\\]');
          const width = container?.clientWidth || 1000;
          const height = container?.clientHeight || 600;
          const pos = latLngToPixel(report.lat, report.lng, width, height);
          
          // 화면 밖의 마커는 표시하지 않음
          if (pos.x < -50 || pos.x > width + 50 || pos.y < -50 || pos.y > height + 50) {
            return null;
          }

          return (
            <div
              key={report.id}
              className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer transition-transform hover:scale-110"
              style={{
                left: `${pos.x}px`,
                top: `${pos.y}px`,
                zIndex: selectedReport?.id === report.id ? 10 : 1,
              }}
              onClick={() => setSelectedReport(report)}
            >
              {/* 마커 핀 */}
              <div className="relative">
                <svg width="40" height="50" viewBox="0 0 40 50">
                  <path
                    d="M20 0C11.716 0 5 6.716 5 15c0 8.284 15 35 15 35s15-26.716 15-35c0-8.284-6.716-15-15-15z"
                    fill={report.emailRead ? '#22c55e' : '#f97316'}
                    stroke="white"
                    strokeWidth="2"
                  />
                  <circle cx="20" cy="15" r="6" fill="white" />
                  <text
                    x="20"
                    y="20"
                    textAnchor="middle"
                    fontSize="16"
                    fill={report.emailRead ? '#22c55e' : '#f97316'}
                  >
                    📍
                  </text>
                </svg>
                
                {/* 선택된 마커 표시 */}
                {selectedReport?.id === report.id && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <div className="w-12 h-12 rounded-full bg-orange-500 opacity-30 animate-ping"></div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 범례 */}
      <div className="absolute top-2 right-2 bg-white rounded-lg shadow-lg p-2 z-20">
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span>접수</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>완료</span>
          </div>
        </div>
      </div>

      {/* 줌 컨트롤 */}
      <div className="absolute top-2 left-2 bg-white rounded-lg shadow-lg overflow-hidden z-20">
        <button
          onClick={() => setZoom(Math.min(zoom + 1, 18))}
          className="block p-2 hover:bg-orange-50 transition-colors border-b border-gray-200"
        >
          <ZoomIn className="w-4 h-4 text-orange-600" />
        </button>
        <button
          onClick={() => setZoom(Math.max(zoom - 1, 8))}
          className="block p-2 hover:bg-orange-50 transition-colors"
        >
          <ZoomOut className="w-4 h-4 text-orange-600" />
        </button>
      </div>

      {/* 현재 위치로 이동 버튼 */}
      <button
        onClick={goToCurrentLocation}
        className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-lg z-20 hover:bg-orange-50 transition-colors"
      >
        <Navigation className="w-5 h-5 text-orange-600" />
      </button>

      {/* 선택된 리포트 상세 정보 */}
      {selectedReport && (
        <div className="absolute bottom-2 left-2 right-2 bg-white rounded-xl shadow-xl z-30 overflow-hidden max-h-[50%] overflow-y-auto">
          <button
            onClick={() => setSelectedReport(null)}
            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 z-10 text-sm"
          >
            ✕
          </button>
          
          <div className="p-3 space-y-2">
            <div className="flex items-start gap-2">
              <img
                src={selectedReport.image}
                alt="신고 사진"
                className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <Badge
                  variant={selectedReport.emailRead ? "outline" : "default"}
                  className={
                    selectedReport.emailRead
                      ? "bg-green-100 text-green-700 border-green-200 mb-1 text-xs"
                      : "bg-orange-500 text-white mb-1 text-xs"
                  }
                >
                  {selectedReport.emailRead ? '확인 완료' : '접수 완료'}
                </Badge>
                <p className="text-gray-900 line-clamp-2 text-xs">{selectedReport.description}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(selectedReport.timestamp).toLocaleString('ko-KR', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-2">
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3 h-3 text-gray-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-gray-700 line-clamp-1">{selectedReport.location}</p>
              </div>
            </div>

            {selectedReport.aiLocationInfo && (
              <div className="bg-blue-50 rounded-lg p-2 flex items-start gap-1.5">
                <Info className="w-3 h-3 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-blue-900">{selectedReport.aiLocationInfo}</p>
              </div>
            )}

            <div className="bg-orange-50 rounded-lg p-2">
              <p className="text-xs text-orange-900">
                <span className="block mb-1">AI 분석:</span>
                {selectedReport.aiAnalysis}
              </p>
            </div>

            {!selectedReport.emailRead && (
              <button
                onClick={() => handleMarkAsRead(selectedReport.id)}
                className="w-full py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors text-xs"
              >
                이메일 확인 완료로 표시
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
