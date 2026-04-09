# 우리동네 리포터 🏘️

동네의 문제를 발견하고 신고하여 더 나은 우리 동네를 만드는 모바일 웹 애플리케이션입니다.

## 주요 기능 ✨

- 📸 **카메라 촬영 및 파일 업로드**: 문제 상황을 사진으로 기록
- 🤖 **AI 분석**: 업로드된 사진과 설명을 AI가 분석하여 문제 유형 파악
- 📍 **위치 정보**: GPS를 통한 정확한 위치 정보 수집 (AI 위치 추정 기능 포함)
- 📧 **이메일 알림**: 담당자에게 자동으로 신고 내용 전송
- 📋 **신고 내역 관리**: 제출한 신고들의 상태 확인 및 관리
- 🗺️ **지도 뷰**: 신고 위치를 지도에서 시각적으로 확인

## 기술 스택 🛠️

- **Frontend**: React 18, TypeScript
- **UI 라이브러리**: Tailwind CSS, Radix UI
- **빌드 도구**: Vite
- **아이콘**: Lucide React
- **알림**: Sonner (Toast notifications)

## 설치 및 실행 🚀

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

애플리케이션이 `http://localhost:3000`에서 실행됩니다.

### 3. 빌드

```bash
npm run build
```

### 4. 프리뷰

```bash
npm run preview
```

## 프로젝트 구조 📁

```
hackerton/
├── components/           # React 컴포넌트들
│   ├── ui/              # 재사용 가능한 UI 컴포넌트들
│   ├── figma/           # Figma 관련 컴포넌트들
│   ├── CameraCapture.tsx # 카메라 촬영 및 신고 제출
│   ├── MainScreen.tsx   # 메인 화면 및 탭 네비게이션
│   ├── MapView.tsx      # 지도 뷰 컴포넌트
│   ├── PermissionScreen.tsx # 권한 요청 화면
│   └── ReportList.tsx   # 신고 내역 리스트
├── src/                 # 메인 소스 코드
│   ├── App.tsx         # 메인 앱 컴포넌트
│   └── main.tsx        # 앱 엔트리 포인트
├── styles/             # 스타일 파일들
│   └── globals.css     # 전역 CSS 및 Tailwind 설정
└── public/             # 정적 파일들
```

## 사용 방법 📱

### 1. 권한 허용
- 앱 실행 시 카메라 및 위치 권한을 허용해주세요
- 권한이 없어도 파일 업로드로 이용 가능합니다

### 2. 문제 신고
- **신고** 탭에서 카메라로 촬영하거나 파일을 업로드하세요
- 상황 설명을 추가로 작성할 수 있습니다
- **신고 제출하기** 버튼을 눌러 제출하세요

### 3. 신고 내역 확인
- **내역** 탭에서 제출한 신고들을 확인할 수 있습니다
- AI 분석 결과와 처리 상태를 볼 수 있습니다

### 4. 지도에서 확인
- **지도** 탭에서 신고 위치들을 시각적으로 확인할 수 있습니다
- 마커를 클릭하면 해당 신고의 상세 정보를 볼 수 있습니다

## 특징 🎯

### AI 기능
- 업로드된 사진을 분석하여 문제 유형을 자동으로 분류
- GPS 정보가 없을 때 사진과 설명을 바탕으로 위치를 추정

### 반응형 디자인
- 모바일 우선 설계로 다양한 화면 크기에 최적화
- 터치 친화적인 인터페이스

### 접근성
- 시각적 피드백과 명확한 상태 표시
- 키보드 네비게이션 지원

## 개발 참고사항 💡

### 환경 변수
현재 데모 버전으로 실제 백엔드 연동은 포함되어 있지 않습니다. 실제 배포 시에는 다음과 같은 환경 변수들이 필요할 수 있습니다:

- `VITE_API_URL`: 백엔드 API URL
- `VITE_MAP_API_KEY`: 지도 서비스 API 키
- `VITE_AI_API_KEY`: AI 분석 서비스 API 키

### 브라우저 지원
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 라이선스 📄

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 기여하기 🤝

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

**우리동네 리포터**로 더 나은 동네를 만들어보세요! 🌟
