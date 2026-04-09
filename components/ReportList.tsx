import { CheckCircle, Mail, MailOpen, MapPin, Calendar, Info } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import type { Report } from './MainScreen';

interface ReportListProps {
  reports: Report[];
  setReports: React.Dispatch<React.SetStateAction<Report[]>>;
}

export function ReportList({ reports, setReports }: ReportListProps) {
  const handleMarkAsRead = (reportId: string) => {
    setReports(reports.map(report => 
      report.id === reportId ? { ...report, emailRead: true } : report
    ));
  };

  if (reports.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center p-6">
          <div className="w-16 h-16 mx-auto mb-3 bg-orange-100 rounded-full flex items-center justify-center">
            <Mail className="w-8 h-8 text-orange-400" />
          </div>
          <p className="text-gray-600 text-sm">아직 신고 내역이 없습니다</p>
          <p className="text-gray-400 text-xs mt-1">신고하기 탭에서 문제를 신고해보세요</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-3">
      {reports.map((report) => (
        <Card key={report.id} className="overflow-hidden border-orange-100">
          <div className="p-3 space-y-3">
            {/* 이미지 */}
            <img
              src={report.image}
              alt="신고 사진"
              className="w-full aspect-video object-cover rounded-lg"
            />

            {/* 내용 */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <Badge
                  variant={report.emailRead ? "outline" : "default"}
                  className={
                    report.emailRead
                      ? "bg-green-100 text-green-700 border-green-200 text-xs"
                      : "bg-orange-500 text-white text-xs"
                  }
                >
                  {report.emailRead ? (
                    <>
                      <MailOpen className="w-3 h-3 mr-1" />
                      확인 완료
                    </>
                  ) : (
                    <>
                      <Mail className="w-3 h-3 mr-1" />
                      접수 완료
                    </>
                  )}
                </Badge>
              </div>
              
              <p className="text-gray-700 text-sm">{report.description}</p>
              
              <div className="space-y-1 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3 h-3" />
                  <span>{report.timestamp.toLocaleString('ko-KR')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3 h-3" />
                  <span className="line-clamp-1">{report.location}</span>
                </div>
              </div>

              {/* AI 위치 정보 */}
              {report.aiLocationInfo && (
                <div className="bg-blue-50 rounded-lg p-2 flex items-start gap-2">
                  <Info className="w-3 h-3 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-900">{report.aiLocationInfo}</p>
                </div>
              )}

              {/* AI 분석 */}
              <div className="bg-orange-50 rounded-lg p-2">
                <p className="text-xs text-orange-900">
                  <span className="block mb-1">AI 분석:</span>
                  {report.aiAnalysis}
                </p>
              </div>

              {/* 읽음 처리 버튼
              {!report.emailRead && (
                <Button
                  onClick={() => handleMarkAsRead(report.id)}
                  size="sm"
                  variant="outline"
                  className="border-green-300 text-green-700 hover:bg-green-50 w-full h-9 text-xs"
                >
                  <CheckCircle className="w-3 h-3 mr-1" />
                  이메일 확인 완료로 표시
                </Button>
              )} */}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
