import { Camera, MapPin } from 'lucide-react';
import { Button } from './ui/button';

interface PermissionScreenProps {
  onPermissionsGranted: () => void;
}

export function PermissionScreen({ onPermissionsGranted }: PermissionScreenProps) {
  const handleRequestPermissions = async () => {
    try {
      // 카메라 권한 요청
      await navigator.mediaDevices.getUserMedia({ video: true });
      
      // 위치 권한 요청
      navigator.geolocation.getCurrentPosition(() => {
        onPermissionsGranted();
      }, (error) => {
        console.error('위치 권한 오류:', error);
        // 데모용으로 권한 없어도 진행
        onPermissionsGranted();
      });
    } catch (error) {
      console.error('카메라 권한 오류:', error);
      // 데모용으로 권한 없어도 진행
      onPermissionsGranted();
    }
  };

  return (
    <div className="h-full flex items-center justify-center p-6">
      <div className="w-full text-center space-y-6">
        <div className="space-y-3">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Camera className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-orange-600">우리동네 리포터</h1>
          <p className="text-gray-600 text-sm">
            동네의 문제를 발견하고 신고하여
            <br />
            더 나은 우리 동네를 만들어요
          </p>
        </div>

        <div className="space-y-3 bg-white rounded-xl p-5 shadow-sm">
          <div className="flex items-start gap-3 text-left">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Camera className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h3 className="text-gray-900 text-sm">카메라 권한</h3>
              <p className="text-gray-600 text-xs">
                문제 상황을 사진으로 촬영하기 위해 필요합니다
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 text-left">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h3 className="text-gray-900 text-sm">위치 정보</h3>
              <p className="text-gray-600 text-xs">
                신고 위치를 정확히 파악하기 위해 필요합니다
              </p>
            </div>
          </div>
        </div>

        <Button
          onClick={handleRequestPermissions}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white h-12 rounded-xl text-sm"
        >
          권한 허용하고 시작하기
        </Button>
      </div>
    </div>
  );
}
