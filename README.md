# 우리동네 리포터 

"사진만 찍으세요. 모든 과정은 AI가 처리해 줍니다." 시민이 단 30초 만에 문제를 신고할 수 있도록 돕는 AI 기반 민원 솔루션

## 1. 기획 배경

민원의 불편함: 복잡한 절차와 긴 소요 시간으로 인해 포기하게 되는 지역 사회 문제들 
패러다임의 변화: 디지털 취약계층도 사진 한 장으로 쉽게 참여할 수 있는 '간편한 신고 접수' 환경 조성



## 2. 서비스 및 에이전트 파이프라인

> **4단계의 지능형 에이전트 시스템을 통해 민원 처리 전 과정을 자동화합니다.** 

![서비스 파이프라인](https://github.com/user-attachments/assets/211b685c-dd60-40c6-8058-ed54a06ca79d)
![에이전트 아키텍처](https://github.com/user-attachments/assets/6576b0e7-b8e6-48f1-b55c-d2c54bd61f48)

| 단계 | 에이전트명 | 주요 역할 및 기능 | 기술적 특징 |
| :--- | :--- | :--- | :--- |
| **01** | **Preprocess & Vision** | 사진 데이터(EXIF) 분석 및 객체 감지 | 도로 파손, 가로등 고장 판별 및 **긴급 점수 산출** |
| **02** | **Routing** | 문제 유형별 담당 부서 자동 매칭 |**ChromaDB** 연동을 통한 최적의 유관 부서 검색 |
| **03** | **Generate & Verify** | 신고문 생성 및 품질 검증 |신뢰도 기반 **최대 3회 재생성(Regenerate) 루프** |
| **04** | **Dispatch** | 최종 신고 내용 대외 발송 |**SMTP 기반** 자동 이메일 발송 및 첨부파일 관리 |



## 3. 주요 기능 및 시연

###  01. 서비스 시작 및 권한 인증
사용자의 개인정보 보호와 정확한 위치 기반 신고를 위한 필수 설정 단계입니다.

| **권한 요청 화면** | **핵심 가치** |
| :---: | :--- |
| <img width="250" src="https://github.com/user-attachments/assets/d9d0c3fe-9ae8-468d-9222-741941221590" /> | • **신뢰 기반 인터페이스**: 카메라 및 위치 권한 필요성 명시 [cite: 67][cite_start]<br>• **간편한 시작**: 원클릭 권한 허용으로 즉시 서비스 진입 |

---

###  02. 발견 및 촬영 (단 30초!)
현장의 문제를 포착하고 상세 정보를 입력하는 단계입니다. [cite_start]사진만 찍으면 모든 과정은 AI가 처리합니다. 

| **사진 촬영** | **상황 설명** |
| :---: | :---: |
| <img width="250" src="https://github.com/user-attachments/assets/a94c3aa7-5273-408f-8a1c-1dc8d6421f30" /> | <img width="250" src="https://github.com/user-attachments/assets/981d69b6-c385-42e2-80ec-7dd16b279569" /> |
| **현장 포착**: 문제 상황 즉시 촬영  | **정보 보완**: AI 분석을 돕는 추가 설명 입력  |

---

###  03. AI 분석 및 자동 접수
[cite_start]멀티 에이전트 시스템이 유형 분석부터 부서 매칭까지 자동으로 처리하여 행정 절차를 혁신합니다. 

| **AI 분석 프로세스** | **자동 부서 매칭** |
| :---: | :---: |
| <img width="250" src="https://github.com/user-attachments/assets/f0a09e14-9ed6-4fd9-800c-8a865946eb60" /> | <img width="250" src="https://github.com/user-attachments/assets/e6d6b7ea-7622-4975-89f6-405076b5f439" /> |
| **지능형 판별**: 사진 기반 유형 및 긴급도 분류 ] | **행정 효율**: 최적 담당 부서 자동 라우팅  |

---

###  04. 접수 내역 및 지도 기반 확인
신고 현황을 실시간으로 확인하고 지도상에서 시각화된 데이터를 제공합니다.

| **신고 내역 리스트** | **상세 정보 확인** | **지도 뷰(Map)** |
| :---: | :---: | :---: |
| <img width="220" src="https://github.com/user-attachments/assets/2d5e9335-709a-46ba-bc27-33bcbc492f35" /> | <img width="220" alt="image" src="https://github.com/user-attachments/assets/9e4a7e9a-1c13-442d-9f7e-db9b5c5d0ff3" /> | <img width="220" src="https://github.com/user-attachments/assets/ba686908-413c-497d-8482-56c8e44e3196" /> |
| 진행 상태 실시간 모니터링 | ]AI 분석 결과 및 접수 일자 | 우리 동네 신고 현황 시각화 |

###  05. 주요 특징 

| 분류 | 상세 내용 | 기대 효과 |
| :--- | :--- | :--- |
| **AI 지능형 행정** | • 업로드된 사진을 분석하여 **문제 유형 자동 분류** | • GPS 부재 시 사진/설명을 기반으로 **위치 추정** | 신속한 민원 분류 및 데이터 정확도 향상 |
| **모바일 우선 설계** | • **반응형 디자인**: 다양한 화면 크기 최적화 <br> | • **터치 친화적 인터페이스**: 현장 신고 최적화 | 언제 어디서나 끊김 없는 신고 경험 제공 |
| **포용적 접근성** | • **시각적 피드백**: 명확한 상태 표시 및 알림 <br> | • **디지털 취약계층 지원**: 사진 한 장으로 끝나는 간편 UI | 누구나 소외됨 없는 우리 동네 민원 참여 |



## 기술 스택 

| 구분 | 내용 |
| :--- | :--- |
| **언어 및 기반** | ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black) |
| **프레임워크/라이브러리** | ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) |
| **AI 및 데이터** | ![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white) ![ChromaDB](https://img.shields.io/badge/ChromaDB-5462eb?style=for-the-badge) |
| **도구 및 배포** | ![VS Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white) ![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white) |
| **주요 API/시스템** | ![SMTP](https://img.shields.io/badge/SMTP_Mail-D14836?style=for-the-badge&logo=gmail&logoColor=white) ![Exif](https://img.shields.io/badge/EXIF_Data-blue?style=for-the-badge) |


## 참고사항
**현재 프로젝트는 MVP(Minimum Viable Product) 1.0 초기 버전으로, 핵심 기능을 검증하기 위한 데모 버전입니다.** 
