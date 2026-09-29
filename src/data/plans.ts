import { Plan } from '../types';

export const PLANS: Plan[] = [
  {
    id: 'curation',
    name: '큐레이션 독서 플랜',
    badge: '스타터 추천',
    isPopular: false,
    priceText: '39,000원',
    periodText: '/월 (정기배송)',
    originalPriceText: '50,000원',
    tagline: '세계 예술 그림책으로 키우는 감수성과 독서 습관',
    description: '칼데콧, 볼로냐 라가치상 등 전 세계 권위 있는 수상작 중 큐레이터가 엄선한 그림책을 매달 2권씩 배송받고 부모를 위한 예술 가이드를 함께 제공합니다.',
    coverImage: '/src/assets/images/archiving_kit_box_1790678250545.jpg',
    features: [
      '매달 세계 명작 예술 그림책 2권 정기 배송',
      '작품별 독후 미술 놀이 가이드 & 워크시트 4종',
      '워킹맘을 위한 3분 큐레이션 도슨트 해설 리플릿',
      '전국 무료 친환경 정기 배송 및 연간 도서 목록 리포트'
    ],
    specs: [
      { label: '배송 주기', value: '매월 1회 (2째주 화요일 출고)' },
      { label: '도서 구성', value: '국내외 수상작 양장 그림책 2권' },
      { label: '부가 자료', value: '아틀리에 감상 가이드북 + 워크북' },
      { label: '구독 혜택', value: '중도 해지 위약금 0원 / 언제든 플랜 변경 가능' }
    ],
    processSummary: '매월 1일 이달의 테마 공지 → 엄선된 명작 검수 → 정성스러운 친환경 패키징 → 집 앞 안전 도착'
  },
  {
    id: 'masterpiece',
    name: '마스터피스 플랜',
    badge: 'BEST 시그니처',
    isPopular: true,
    priceText: '79,000원',
    periodText: '/월 (분기별 출판)',
    originalPriceText: '110,000원',
    tagline: '아이의 낙서가 소장용 하드커버 양장 동화책이 되는 올인원 구독',
    description: '판교·분당 워킹맘이 가장 많이 선택한 플랜! 매달 세계 명작 2권 정기 배송과 함께, 3개월마다 아이의 그림을 전문 북디자이너가 예술 양장본으로 직접 출판해 드립니다.',
    coverImage: '/src/assets/images/book_mockup_cover_1790678227817.jpg',
    features: [
      '분기별(3개월마다) 아이 그림 100% 수록 하드커버 동화책 1권 출판',
      '매달 세계 명작 그림책 2권 배송 (연간 24권 소장)',
      '전문 아동 색채 심리 분석 & 성장 컬러 팔레트 리포트',
      '전문 북디자이너의 1:1 리터칭 및 타이포그래피 시안 사전 검수',
      '아틀리에 프리미엄 패브릭 북케이스 & 원화 보관 키트 무료 증정'
    ],
    specs: [
      { label: '출판 구성', value: '하드커버 양장본 (24~32페이지, A4 와이드 규격)' },
      { label: '수록 작품수', value: '분기당 15~20점 엄선 수록' },
      { label: '도서 배송', value: '매월 세계 명작 2권 + 분기별 출판 양장본 1권' },
      { label: '인쇄 사양', value: '독일산 친환경 무광 코팅지 + 실 제본 양장' },
      { label: '디자인 검수', value: '출판 전 모바일 시안 100% 사전 컨펌' }
    ],
    processSummary: '아카이빙 키트에 그림 담기 → 전용 택배 수거 → 아틀리에 스튜디오 리터칭 → 모바일 시안 확인 → 하드커버 출판 배송'
  },
  {
    id: 'onetime',
    name: '원타임 단품 플랜',
    badge: '기념 소장용',
    isPopular: false,
    priceText: '149,000원',
    periodText: '/1회 단품 제작',
    originalPriceText: '190,000원',
    tagline: '정기구독 부담 없이 1년 치 대표작 20편을 담은 특별 대형 하드커버',
    description: '아이의 생일, 유치원 졸업, 첫 번째 전시회를 기념하고 싶을 때 단 1회로 주문하는 프리미엄 대형 하드커버 아트북 제작 서비스입니다.',
    coverImage: '/src/assets/images/book_inside_spread_1790678238690.jpg',
    features: [
      '대표 그림 20편 초고해상도 디지털 스캔 & 원색 복원 보정',
      '대형 와이드 하드커버 양장 제본 (금박/은박 각인 타이틀 선택)',
      '아이의 말과 에피소드를 담은 1:1 맞춤형 스토리텔링 캡션',
      '친환경 원목 스탠드 + 선물용 럭셔리 기프트 하드박스 포장',
      '완성본 디지털 PDF E-Book 파일 무료 증정'
    ],
    specs: [
      { label: '제작 기간', value: '원화 접수 후 약 2~3주 소요' },
      { label: '수록 작품수', value: '최대 20점 (추가 옵션 가능)' },
      { label: '책 규격', value: '250 x 250mm 대형 정방형 하드커버 양장' },
      { label: '패키지', value: '아틀리에 시그니처 딥그린 선물 박스' }
    ],
    processSummary: '모바일 사진 또는 원화 택배 발송 → 에디터 스토리텔링 구성 → 시안 확인 → 럭셔리 패키지 배송'
  }
];
