// import React, { useEffect, useRef } from "react";

// interface MapComponentProps {
//   lat?: number;
//   lng?: number;
//   imageUrl?: string;
//   address?: string;
//   kakaoApiKey: string; // API Key 필수
// }

// const MapComponent: React.FC<MapComponentProps> = ({
//   lat = 35.631061,
//   lng = 126.47035289972223,
//   imageUrl = "싱크홀.jpg",
//   address = "전북특별자치도 부안군 변산면 격포리 257",
//   kakaoApiKey,
// }) => {
//   const mapRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!mapRef.current) return;

//     // 카카오 지도 SDK 동적 로드
//     const script = document.createElement("script");
//     script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoApiKey}&autoload=false`;
//     script.async = true;

//     script.onload = () => {
//       // @ts-ignore
//       const kakao = window.kakao;
//       kakao.maps.load(() => {
//         const markerPosition = new kakao.maps.LatLng(lat, lng);

//         const map = new kakao.maps.Map(mapRef.current!, {
//           center: markerPosition,
//           level: 2,
//         });

//         const marker = new kakao.maps.Marker({ position: markerPosition });
//         marker.setMap(map);

//         const content = `<div class="custom-popup">
//           <img src="./components/${imageUrl}" alt="현장 사진" />
//           <div><strong>주소:</strong> ${address}</div>
//         </div>`;

//         const infowindow = new kakao.maps.InfoWindow({
//           content,
//           removable: true,
//         });

//         kakao.maps.event.addListener(marker, "click", () => {
//           infowindow.open(map, marker);
//         });
//       });
//     };

//     document.head.appendChild(script);

//     // 언마운트 시 스크립트 제거
//     return () => {
//       document.head.removeChild(script);
//     };
//   }, [lat, lng, imageUrl, address, kakaoApiKey]);

//   return <div style={{ width: "100%", height: "100%" }} ref={mapRef}></div>;
// };

// export default MapComponent;


import React, { useEffect, useRef, useState } from "react";

interface MapComponentProps {
  lat?: number;
  lng?: number;
  imageUrl?: string;
  address?: string;
  kakaoApiKey: string; // API Key 필수
}

const MapComponent: React.FC<MapComponentProps> = ({
  lat = 35.631201099722226,
  lng = 126.471056,
  imageUrl = "가로등.jpg",
  address = "전북특별자치도 부안군 변산면 격포리 258-43",
  kakaoApiKey,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [currentPosition, setCurrentPosition] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    // 현재 위치 가져오기
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => {
        console.warn("GPS 접근 실패, 기본 좌표 사용", err);
        setCurrentPosition({ lat, lng }); // 실패 시 기본 좌표
      }
    );
  }, [lat, lng]);

  useEffect(() => {
    if (!mapRef.current || !currentPosition) return;

    // 카카오 지도 SDK 동적 로드
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoApiKey}&autoload=false`;
    script.async = true;

    script.onload = () => {
      // @ts-ignore
      const kakao = window.kakao;
      kakao.maps.load(() => {
        // 지도 중앙은 현재 위치
        const center = new kakao.maps.LatLng(currentPosition.lat, currentPosition.lng);

        const map = new kakao.maps.Map(mapRef.current!, {
          center,
          level: 2,
        });

        // 마커는 기존 lat/lng
        const markerPosition = new kakao.maps.LatLng(lat, lng);
        const marker = new kakao.maps.Marker({ position: markerPosition });
        marker.setMap(map);

        const content = `<div class="custom-popup" style="width: 200px;">
          <img src="./components/${imageUrl}" alt="현장 사진" style="width: 100%;"/>
          <div>
          <div style="width: 40%;"><strong>위치: </strong></div><div>${address}</div>
          </div>
          <div><strong>사유: </strong>가로등 고장</div>
        </div>`;

        const infowindow = new kakao.maps.InfoWindow({
          content,
          removable: true,
        });

        kakao.maps.event.addListener(marker, "click", () => {
          infowindow.open(map, marker);
        });
      });
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [lat, lng, imageUrl, address, kakaoApiKey, currentPosition]);

  return <div style={{ width: "100%", height: "100%" }} ref={mapRef}></div>;
};

export default MapComponent;
