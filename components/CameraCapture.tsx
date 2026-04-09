import { useState, useRef } from 'react';
import { Camera, Upload, Send, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { toast } from 'sonner';
import type { Report } from './MainScreen';

interface CameraCaptureProps {
  onReportSubmit: (report: Report) => void;
}

export function CameraCapture({ onReportSubmit }: CameraCaptureProps) {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [currentReport, setCurrentReport] = useState<Report | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
      }
    } catch (error) {
      console.error('카메라 시작 오류:', error);
      toast.error('카메라를 시작할 수 없습니다. 파일 업로드를 이용해주세요.');
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(videoRef.current, 0, 0);
      setCapturedImage(canvas.toDataURL('image/jpeg'));
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsStreaming(false);
    }
  };

  const handleSubmit = async () => {
    if (!capturedImage) {
      toast.error('사진을 촬영하거나 업로드해주세요');
      return;
    }

    setIsSubmitting(true);

    // 위치 정보 가져오기
    let location = '위치 정보를 가져올 수 없습니다';
    let lat = 37.5665; // 서울 중심 (기본값)
    let lng = 126.9780;
    let aiLocationInfo = '';

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      lat = position.coords.latitude;
      lng = position.coords.longitude;
      // location = `위도: ${lat.toFixed(6)}, 경도: ${lng.toFixed(6)}`;
      location = `주소: 전북특별자치도 부안군 변산면 격포리 258-43`;
    } catch (error) {
      console.error('위치 정보 오류:', error);
      // GPS 정보를 가져올 수 없을 때 AI가 위치를 유추
      const aiLocation = generateAILocation(description);
      lat = aiLocation.lat;
      lng = aiLocation.lng;
      location = aiLocation.address;
      aiLocationInfo = 'AI가 사진과 설명을 분석하여 위치를 추정했습니다.';
    }

    // LLM 분석 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const aiAnalysis = generateAIAnalysis(description);

    const report: Report = {
      id: Date.now().toString(),
      image: capturedImage,
      description: description || '',
      location,
      lat,
      lng,
      timestamp: new Date(),
      aiAnalysis,
      aiLocationInfo,
      emailSent: true,
      emailRead: false,
    };

    setCurrentReport(report);
    setIsSubmitting(false);
    setShowSuccessModal(true);
    
    // 리포트 추가
    onReportSubmit(report);
    
    // 폼 초기화
    setCapturedImage(null);
    setDescription('');
  };

  const generateAIAnalysis = (userDescription: string): string => {
    const analyses = [
      // '도로 위 파손된 맨홀 뚜껑이 발견되었습니다. 보행자 안전사고 위험이 있어 즉시 수리가 필요합니다.',
      // '불법 주정차로 인해 보행로가 막혀있습니다. 주민 통행에 불편을 주고 있어 단속이 필요합니다.',
      '가로등이 고장나 야간 보행 안전에 문제가 있습니다. 빠른 수리가 필요합니다.',
      // '쓰레기 무단투기가 발견되었습니다. 환경 미화 및 청소가 필요합니다.',
    ];
    
    if (userDescription) {
      return `사용자 제보: ${userDescription}\n\nAI 분석 결과: 신고 내용을 확인하였으며, 관련 부서에서 신속히 조치하겠습니다.`;
    }
    
    return analyses[Math.floor(Math.random() * analyses.length)];
  };

  const generateAILocation = (userDescription: string): { lat: number; lng: number; address: string } => {
    // AI가 사진과 설명을 분석하여 위치를 추정하는 시뮬레이션
    const locations = [
      { lat: 37.5665, lng: 126.9780, address: '서울시 중구 명동' },
      { lat: 37.5794, lng: 126.9770, address: '서울시 종로구 광화문' },
      { lat: 37.5172, lng: 127.0473, address: '서울시 강남구 역삼동' },
      { lat: 37.5326, lng: 126.9900, address: '서울시 용산구 이태원' },
      { lat: 37.4979, lng: 127.0276, address: '서울시 서초구 서초동' },
    ];
    
    return locations[Math.floor(Math.random() * locations.length)];
  };

  const retake = () => {
    setCapturedImage(null);
    stopCamera();
  };

  return (
    <div className="p-4 space-y-4">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {!capturedImage && !isStreaming && (
          <div className="min-h-[500px] bg-gradient-to-br from-orange-100 to-amber-100 flex flex-col items-center justify-center gap-3 p-4">
            <Camera className="w-12 h-12 text-orange-400" />
            <p className="text-gray-600 text-sm text-center">사진을 촬영하거나 업로드하세요</p>
            <div className="flex flex-col gap-2 w-full max-w-xs">
              {/* <Button
                onClick={startCamera}
                className="bg-orange-500 hover:bg-orange-600 text-white w-full text-sm"
              >
                <Camera className="w-4 h-4 mr-2" />
                카메라 촬영
              </Button> */}
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="border-orange-300 text-orange-600 hover:bg-orange-50 w-full text-sm"
              >
                <Upload className="w-4 h-4 mr-2" />
                민원 사진 업로드
              </Button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        )}

        {isStreaming && (
          <div className="relative">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full aspect-[3/4] object-cover bg-black"
            />
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4">
              <Button
                onClick={capturePhoto}
                className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg text-sm flex-1"
              >
                <Camera className="w-4 h-4 mr-2" />
                촬영
              </Button>
              <Button
                onClick={stopCamera}
                variant="outline"
                className="bg-white shadow-lg text-sm"
              >
                취소
              </Button>
            </div>
          </div>
        )}

        {capturedImage && (
          <div className="relative">
            <img src={capturedImage} alt="촬영된 사진" className="h-64 w-full object-cover" />
            <Button
              onClick={retake}
              variant="outline"
              className="absolute top-2 right-2 bg-white shadow-lg text-xs h-8"
            >
              다시 찍기
            </Button>
          </div>
        )}
      </div>

      {capturedImage && (
        <div className="bg-white rounded-xl shadow-sm p-4 space-y-3">
          <div>
            <label className="text-gray-700 mb-2 block text-sm">상황 설명 (선택사항)</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="발견한 문제를 자유롭게 설명해주세요."
              className="min-h-[100px] border-orange-200 focus:border-orange-400 text-sm"
            />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white h-11 text-sm"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                분석 중...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                신고 제출하기
              </>
            )}
          </Button>
        </div>
      )}

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
          <DialogContent
            className="
              w-[92vw] max-w-sm
              rounded-xl
              bg-white
              shadow-lg
              md:max-w-[420px]
            "
          >
      <DialogHeader>
          <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
            <Send className="w-6 h-6 text-white" />
          </div>
          <DialogTitle className="text-center text-base">신고가 접수되었습니다</DialogTitle>
          <DialogDescription className="text-center space-y-3 pt-3 text-sm md:text-[0.9rem]">
            <p className="text-sm">
              담당자에게 이메일이 전송되었습니다.
              <br />
              빠른 시일 내에 처리하겠습니다.
            </p>
            {currentReport && (
              <div className="bg-orange-50 rounded-lg p-3 text-left text-xs md:text-sm">
                <p className="text-orange-900">
                  <span className="block mb-1">AI 분석 결과:</span>
                  {currentReport.aiAnalysis}
                </p>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
        <Button
          onClick={() => setShowSuccessModal(false)}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm h-10"
        >
          확인
        </Button>
      </DialogContent>
    </Dialog>
    </div>
  );
}
