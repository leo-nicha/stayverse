'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'th' | 'en' | 'ru' | 'zh' | 'ja' | 'ko';

export interface Translations {
  email: string;
  phone: string;
  postProperty: string;
  sendEnquiry: string;
  home: string;
  forSale: string;
  forRent: string;
  lifestyle: string;
  contactUs: string;
  mapSearch: string;
  virtualTour: string;
  aboutUs: string;
  privacyPolicy: string;
  skyDrone: string;
  tms: string;
  career: string;
  decorPackage: string;
  
  // Property Types
  condo: string;
  townhome: string;
  house: string;
  compoundHouse: string;
  office: string;
  apartment: string;
  building: string;
  commercial: string;
  warehouse: string;
  homeOffice: string;
  shophouse: string;
  retail: string;
  land: string;
  villa: string;
  all: string;

  // Search Engine
  searchTitle: string;
  buyBtn: string;
  rentBtn: string;
  searchPlaceholder: string;
  filterProperty: string;
  filterBed: string;
  filterPrice: string;
  filterStation: string;
  filterRoomType: string;
  filterLifestyle: string;
  searchBtn: string;
  
  // Room types
  studio: string;
  duplex: string;
  penthouse: string;
  beds: string;
  anyPrice: string;
  anyLocation: string;
  
  // Section Headers
  premiumListings: string;
  calculators: string;
  statistics: string;
  dailyRates: string;
  whyChooseUs: string;
  
  // Calculators
  mortgageCalc: string;
  principalCalc: string;
  transferCalc: string;
  yieldCalc: string;
  
  // Mortgage Calc
  propPrice: string;
  downPayment: string;
  interestRate: string;
  loanTerm: string;
  monthlyPayment: string;
  totalInterest: string;
  totalPayment: string;
  
  // Yield Calc
  monthlyRent: string;
  annualFee: string;
  grossYield: string;
  netYield: string;
  
  // Footer
  footerDesc: string;
  rightsReserved: string;
}

const translations: Record<Language, Translations> = {
  th: {
    email: 'info@stayverse.com',
    phone: '+66 2 056 2333',
    postProperty: 'ฝากขาย/เช่า',
    sendEnquiry: 'สนใจซื้อ/เช่า',
    home: 'หน้าแรก',
    forSale: 'สำหรับขาย',
    forRent: 'สำหรับเช่า',
    lifestyle: 'ชีวิตคนเมือง',
    contactUs: 'ติดต่อเรา',
    mapSearch: 'ค้นหาโดยแผนที่',
    virtualTour: '360 Virtual Tour',
    aboutUs: 'เกี่ยวกับเรา',
    privacyPolicy: 'นโยบายความเป็นส่วนตัว',
    skyDrone: 'สกายโดรน',
    tms: 'บริการจัดการผู้เช่า',
    career: 'ร่วมงานกับเรา',
    decorPackage: 'แพ็กเกจตกแต่ง & เฟอร์นิเจอร์',
    
    condo: 'คอนโดมิเนียม',
    townhome: 'ทาวน์โฮม',
    house: 'บ้านเดี่ยว',
    compoundHouse: 'บ้านในโครงการ',
    office: 'ออฟฟิศ',
    apartment: 'อพาร์ทเม้นท์',
    building: 'อาคาร/โครงการ',
    commercial: 'พื้นที่เชิงพาณิชย์',
    warehouse: 'คลังสินค้า/โรงงาน',
    homeOffice: 'โฮมออฟฟิศ',
    shophouse: 'อาคารพาณิชย์',
    retail: 'ร้านค้าปลีก',
    land: 'ที่ดิน',
    villa: 'วิลล่า',
    all: 'ทั้งหมด',

    searchTitle: 'ค้นหาทำเลที่ดีที่สุดสำหรับคุณ',
    buyBtn: 'ซื้อ',
    rentBtn: 'เช่า',
    searchPlaceholder: 'ชื่อโครงการ, ทำเล, คำค้นหา',
    filterProperty: 'ประเภทอสังหาฯ',
    filterBed: 'ห้องนอน',
    filterPrice: 'ราคา',
    filterStation: 'รถไฟฟ้า BTS/MRT',
    filterRoomType: 'ชนิดห้อง',
    filterLifestyle: 'ไลฟ์สไตล์',
    searchBtn: 'ค้นหา',
    
    studio: 'สตูดิโอ',
    duplex: 'ดูเพล็กซ์',
    penthouse: 'เพนท์เฮ้าส์',
    beds: 'ห้องนอน',
    anyPrice: 'ทุกระดับราคา',
    anyLocation: 'ทุกทำเล',
    
    premiumListings: 'อสังหาริมทรัพย์ระดับพรีเมียมแนะนำ',
    calculators: 'เครื่องคำนวณอสังหาริมทรัพย์อัจฉริยะ',
    statistics: 'ดัชนีตลาดและข้อมูลสถิติอสังหาฯ',
    dailyRates: 'อัตราดอกเบี้ยบ้านประจำวัน',
    whyChooseUs: 'ทำไมต้องเลือก สเตย์เวิร์ส (Stayverse)',
    
    mortgageCalc: 'คำนวณเงินกู้บ้าน',
    principalCalc: 'คำนวณวงเงินกู้สูงสุด',
    transferCalc: 'ค่าใช้จ่ายวันโอน',
    yieldCalc: 'คำนวณผลตอบแทนเช่า',
    
    propPrice: 'ราคาอสังหาริมทรัพย์',
    downPayment: 'เงินดาวน์',
    interestRate: 'อัตราดอกเบี้ย (% ต่อปี)',
    loanTerm: 'ระยะเวลากู้ (ปี)',
    monthlyPayment: 'ยอดผ่อนต่อเดือน',
    totalInterest: 'ดอกเบี้ยรวม',
    totalPayment: 'ยอดจ่ายรวมทั้งหมด',
    
    monthlyRent: 'ค่าเช่าคาดการณ์ต่อเดือน',
    annualFee: 'ค่าส่วนกลางต่อปี',
    grossYield: 'ผลตอบแทนเบื้องต้น (Gross Yield)',
    netYield: 'ผลตอบแทนสุทธิ (Net Yield)',
    
    footerDesc: 'สเตย์เวิร์ส ที่ปรึกษาอสังหาริมทรัพย์มืออาชีพครบวงจรบนทำเลที่ดีที่สุดในกรุงเทพฯ',
    rightsReserved: 'สงวนลิขสิทธิ์ © 2026 Stayverse Co., Ltd.',
  },
  en: {
    email: 'info@stayverse.com',
    phone: '+66 2 056 2333',
    postProperty: 'List with Us',
    sendEnquiry: 'Send Enquiry',
    home: 'Home',
    forSale: 'For Sale',
    forRent: 'For Rent',
    lifestyle: 'Urban Lifestyle',
    contactUs: 'Contact Us',
    mapSearch: 'Map Search',
    virtualTour: '360° VR Tour',
    aboutUs: 'About Us',
    privacyPolicy: 'Privacy Policy',
    skyDrone: 'Sky Drone',
    tms: 'Tenancy Management',
    career: 'Careers',
    decorPackage: 'Decor Package',
    
    condo: 'Condominium',
    townhome: 'Town Home',
    house: 'House',
    compoundHouse: 'Compound House',
    office: 'Office',
    apartment: 'Apartment',
    building: 'Building/Project',
    commercial: 'Commercial Space',
    warehouse: 'Factory/Warehouse',
    homeOffice: 'Home Office',
    shophouse: 'Shophouse',
    retail: 'Retail Shop',
    land: 'Land',
    villa: 'Villa',
    all: 'All Properties',

    searchTitle: 'CHOOSE THE BEST LOCATION FOR YOU',
    buyBtn: 'Buy',
    rentBtn: 'Rent',
    searchPlaceholder: 'Project, Location, Keyword',
    filterProperty: 'Property Type',
    filterBed: 'Bedrooms',
    filterPrice: 'Price Range',
    filterStation: 'BTS/MRT Station',
    filterRoomType: 'Room Type',
    filterLifestyle: 'Lifestyle',
    searchBtn: 'Search',
    
    studio: 'Studio',
    duplex: 'Duplex',
    penthouse: 'Penthouse',
    beds: 'Beds',
    anyPrice: 'Any Price',
    anyLocation: 'Any Location',
    
    premiumListings: 'Featured Premium Properties',
    calculators: 'Smart Real Estate Calculators',
    statistics: 'Market Trends & Analytics',
    dailyRates: 'Daily Bank Mortgage Rates',
    whyChooseUs: 'Why Stayverse',
    
    mortgageCalc: 'Mortgage Loan',
    principalCalc: 'Borrowing Power',
    transferCalc: 'Transfer Fees',
    yieldCalc: 'Rental Yield',
    
    propPrice: 'Property Price',
    downPayment: 'Down Payment',
    interestRate: 'Interest Rate (% p.a.)',
    loanTerm: 'Loan Term (Years)',
    monthlyPayment: 'Monthly Payment',
    totalInterest: 'Total Interest',
    totalPayment: 'Total Payments',
    
    monthlyRent: 'Expected Monthly Rent',
    annualFee: 'Annual Common Fee',
    grossYield: 'Gross Rental Yield',
    netYield: 'Net Rental Yield',
    
    footerDesc: 'Stayverse, professional real estate brokerage and consultancy at the best locations in Bangkok.',
    rightsReserved: 'All Rights Reserved © 2026 Stayverse Co., Ltd.',
  },
  ru: {
    email: 'info@stayverse.com',
    phone: '+66 2 056 2333',
    postProperty: 'Разместить объект',
    sendEnquiry: 'Отправить запрос',
    home: 'Главная',
    forSale: 'Купить',
    forRent: 'Арендовать',
    lifestyle: 'Городской стиль',
    contactUs: 'Контакты',
    mapSearch: 'Поиск на карте',
    virtualTour: '360° VR-тур',
    aboutUs: 'О нас',
    privacyPolicy: 'Конфиденциальность',
    skyDrone: 'Скай Дрон',
    tms: 'Управление арендой',
    career: 'Вакансии',
    decorPackage: 'Пакет декора',
    
    condo: 'Кондоминиум',
    townhome: 'Таунхаус',
    house: 'Дом',
    compoundHouse: 'Дом в поселке',
    office: 'Офис',
    apartment: 'Апартаменты',
    building: 'Здание/Проект',
    commercial: 'Коммерческая площадь',
    warehouse: 'Склад/Фабрика',
    homeOffice: 'Домашний офис',
    shophouse: 'Магазин-дом',
    retail: 'Торговая точка',
    land: 'Участок земли',
    villa: 'Вилла',
    all: 'Все объекты',

    searchTitle: 'ВЫБЕРИТЕ ЛУЧШУЮ ЛОКАЦИЮ ДЛЯ СЕБЯ',
    buyBtn: 'Купить',
    rentBtn: 'Арендовать',
    searchPlaceholder: 'Проект, локация, ключевое слово',
    filterProperty: 'Тип жилья',
    filterBed: 'Спальни',
    filterPrice: 'Цена',
    filterStation: 'Станция BTS/MRT',
    filterRoomType: 'Тип комнат',
    filterLifestyle: 'Стиль жизни',
    searchBtn: 'Поиск',
    
    studio: 'Студия',
    duplex: 'Дуплекс',
    penthouse: 'Пентхаус',
    beds: 'Спальни',
    anyPrice: 'Любая цена',
    anyLocation: 'Любая локация',
    
    premiumListings: 'Премиальные предложения',
    calculators: 'Калькуляторы недвижимости',
    statistics: 'Аналитика и тренды рынка',
    dailyRates: 'Текущие ставки по ипотеке',
    whyChooseUs: 'Почему Stayverse',
    
    mortgageCalc: 'Ипотечный кредит',
    principalCalc: 'Лимит кредита',
    transferCalc: 'Расходы на оформление',
    yieldCalc: 'Доходность аренды',
    
    propPrice: 'Стоимость объекта',
    downPayment: 'Первоначальный взнос',
    interestRate: 'Ставка (% годовых)',
    loanTerm: 'Срок кредита (лет)',
    monthlyPayment: 'Ежемесячный платеж',
    totalInterest: 'Всего процентов',
    totalPayment: 'Итого выплат',
    
    monthlyRent: 'Ожидаемая арендная плата',
    annualFee: 'Годовое содержание',
    grossYield: 'Валовая доходность',
    netYield: 'Чистая доходность',
    
    footerDesc: 'Stayverse, профессиональные брокерские и консалтинговые услуги на рынке недвижимости Бангкока.',
    rightsReserved: 'Все права защищены © 2026 Stayverse Co., Ltd.',
  },
  zh: {
    email: 'info@stayverse.com',
    phone: '+66 2 056 2333',
    postProperty: '委托出租/出售',
    sendEnquiry: '意向咨询',
    home: '首页',
    forSale: '出售房源',
    forRent: '出租房源',
    lifestyle: '都市生活',
    contactUs: '联系我们',
    mapSearch: '地图找房',
    virtualTour: '360°全景看房',
    aboutUs: '关于我们',
    privacyPolicy: '隐私政策',
    skyDrone: '航拍展示',
    tms: '托管服务',
    career: '加入我们',
    decorPackage: '软装家具包',
    
    condo: '公寓/联排别墅',
    townhome: '联排别墅',
    house: '独栋别墅',
    compoundHouse: '小区独栋',
    office: '写字楼',
    apartment: '公寓住宅',
    building: '整栋楼宇',
    commercial: '商业地产',
    warehouse: '厂房仓库',
    homeOffice: '商住两用',
    shophouse: '店面商铺',
    retail: '零售商铺',
    land: '土地',
    villa: '豪华别墅',
    all: '全部房源',

    searchTitle: '为您挑选绝佳黄金地段',
    buyBtn: '购买',
    rentBtn: '租赁',
    searchPlaceholder: '项目名称、地段、关键词',
    filterProperty: '物业类型',
    filterBed: '卧室数量',
    filterPrice: '价格区间',
    filterStation: '轻轨/地铁站',
    filterRoomType: '房型',
    filterLifestyle: '生活配套',
    searchBtn: '立即搜索',
    
    studio: '单身公寓',
    duplex: '复式/跃层',
    penthouse: '顶层豪宅',
    beds: '室',
    anyPrice: '价格不限',
    anyLocation: '地段不限',
    
    premiumListings: '精选尊贵房源',
    calculators: '智能房产计算器',
    statistics: '市场趋势与数据分析',
    dailyRates: '各大银行今日房贷利率',
    whyChooseUs: '为什么选择 Stayverse',
    
    mortgageCalc: '房贷试算',
    principalCalc: '可贷额度',
    transferCalc: '过户税费',
    yieldCalc: '租金收益',
    
    propPrice: '房屋总价',
    downPayment: '首付款',
    interestRate: '年利率 (%)',
    loanTerm: '贷款期限 (年)',
    monthlyPayment: '每月月供',
    totalInterest: '利息总额',
    totalPayment: '还款总额',
    
    monthlyRent: '预估月租金',
    annualFee: '年物业费',
    grossYield: '毛收益率',
    netYield: '净收益率',
    
    footerDesc: 'Stayverse，曼谷黄金地段专业的房地产经纪与投资顾问公司。',
    rightsReserved: '版权所有 © 2026 Stayverse Co., Ltd.',
  },
  ja: {
    email: 'info@stayverse.com',
    phone: '+66 2 056 2333',
    postProperty: '物件掲載の依頼',
    sendEnquiry: 'お問い合わせ',
    home: 'ホーム',
    forSale: '購入物件',
    forRent: '賃貸物件',
    lifestyle: '都市生活ニュース',
    contactUs: 'お問い合わせ',
    mapSearch: '地図から検索',
    virtualTour: '360° バーチャルツアー',
    aboutUs: '会社概要',
    privacyPolicy: 'プライバシーポリシー',
    skyDrone: 'スカイドローン',
    tms: '賃貸管理サービス',
    career: '採用情報',
    decorPackage: 'インテリアパッケージ',
    
    condo: 'コンドミニアム',
    townhome: 'タウンハウス',
    house: '一戸建て',
    compoundHouse: '分譲地内一戸建て',
    office: 'オフィス',
    apartment: 'アパートメント',
    building: '一棟ビル/プロジェクト',
    commercial: '商業用スペース',
    warehouse: '工場/倉庫',
    homeOffice: 'ホームオフィス',
    shophouse: 'ショップハウス',
    retail: '店舗物件',
    land: '土地',
    villa: 'ヴィラ',
    all: 'すべての物件',

    searchTitle: '最適なロケーションを選択する',
    buyBtn: '購入',
    rentBtn: '賃貸',
    searchPlaceholder: '物件名、ロケーション、キーワード',
    filterProperty: '物件タイプ',
    filterBed: '寝室数',
    filterPrice: '価格帯',
    filterStation: 'BTS/MRT駅',
    filterRoomType: '部屋タイプ',
    filterLifestyle: 'ライフスタイル',
    searchBtn: '検索',
    
    studio: 'スタジオ',
    duplex: 'メゾネット',
    penthouse: 'ペントハウス',
    beds: '寝室',
    anyPrice: '上限なし',
    anyLocation: '全エリア',
    
    premiumListings: 'おすすめプレミアム物件',
    calculators: 'スマートローン計算機',
    statistics: '不動産市場動向と統計データ',
    dailyRates: '本日の住宅ローン金利',
    whyChooseUs: 'Stayverseを選ぶ理由',
    
    mortgageCalc: '住宅ローン計算',
    principalCalc: '借入可能額シミュレーション',
    transferCalc: '諸費用（登記・税金）',
    yieldCalc: '利回り計算',
    
    propPrice: '物件価格',
    downPayment: '頭金',
    interestRate: '金利（年利 %）',
    loanTerm: '返済期間（年）',
    monthlyPayment: '毎月の返済額',
    totalInterest: '利息総額',
    totalPayment: '総返済額',
    
    monthlyRent: '想定月額家賃',
    annualFee: '年間管理費',
    grossYield: '表面利回り',
    netYield: '実質利回り',
    
    footerDesc: 'Stayverseは、バンコクの好立地物件に特化した不動産仲介・コンサルタントです。',
    rightsReserved: '著作権所有 © 2026 Stayverse Co., Ltd.',
  },
  ko: {
    email: 'info@stayverse.com',
    phone: '+66 2 056 2333',
    postProperty: '매물 등록 문의',
    sendEnquiry: '매수/임차 문의',
    home: '홈',
    forSale: '매매房',
    forRent: '임대房',
    lifestyle: '도시 라이프',
    contactUs: '문의하기',
    mapSearch: '지도로 검색',
    virtualTour: '360° 가상 투어',
    aboutUs: '회사 소개',
    privacyPolicy: '개인정보처리방침',
    skyDrone: '스카이 드론',
    tms: '임대 관리 서비스',
    career: '채용 정보',
    decorPackage: '가구 & 데코 패키지',
    
    condo: '콘도미니엄',
    townhome: '타운하우스',
    house: '단독주택',
    compoundHouse: '단지형 단독주택',
    office: '사무실',
    apartment: '아파트',
    building: '빌딩/프로젝트',
    commercial: '상업용 공간',
    warehouse: '공장/창고',
    homeOffice: '홈 오피스',
    shophouse: '상가주택',
    retail: '매장/상가',
    land: '토지',
    villa: '풀빌라',
    all: '전체 보기',

    searchTitle: '가장 좋은 위치를 선택하세요',
    buyBtn: '매매',
    rentBtn: '임대',
    searchPlaceholder: '프로젝트명, 지역, 키워드',
    filterProperty: '매물 유형',
    filterBed: '방 개수',
    filterPrice: '가격대',
    filterStation: 'BTS/MRT 전철역',
    filterRoomType: '룸 타입',
    filterLifestyle: '라이프스타일',
    searchBtn: '검색',
    
    studio: '원룸/스튜디오',
    duplex: '복층형',
    penthouse: '펜트하우스',
    beds: '침실',
    anyPrice: '가격 제한 없음',
    anyLocation: '전체 지역',
    
    premiumListings: '추천 프리미엄 매물',
    calculators: '부동산 금융 계산기',
    statistics: '부동산 시장 트렌드 및 통계',
    dailyRates: '주요 은행 오늘 주택담보대출 금리',
    whyChooseUs: 'Stayverse를 선택해야 하는 이유',
    
    mortgageCalc: '대출 이자 계산',
    principalCalc: '대출 한도 계산',
    transferCalc: '등기/이전 세금',
    yieldCalc: '임대 수익률',
    
    propPrice: '매매 가격',
    downPayment: '선납금/다운페이',
    interestRate: '대출 금리 (연 %)',
    loanTerm: '대출 기간 (년)',
    monthlyPayment: '월 상환액',
    totalInterest: '총 이자 비용',
    totalPayment: '총 원리금 상환액',
    
    monthlyRent: '예상 월세',
    annualFee: '연간 공동 관리비',
    grossYield: '세전 수익률',
    netYield: '세후 실질 수익률',
    
    footerDesc: 'Stayverse는 방콕 최고의 위치에 있는 주거 및 투자용 부동산 전문 컨설턴트입니다.',
    rightsReserved: '모든 권리 보유 © 2026 Stayverse Co., Ltd.',
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  isMounted: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('th');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedLang = localStorage.getItem('stayverse_lang') as Language;
    if (savedLang && ['th', 'en', 'ru', 'zh', 'ja', 'ko'].includes(savedLang)) {
      setLanguageState(savedLang);
    } else {
      // detect browser language
      const browserLang = navigator.language.split('-')[0];
      if (['th', 'en', 'ru', 'zh', 'ja', 'ko'].includes(browserLang)) {
        setLanguageState(browserLang as Language);
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('stayverse_lang', lang);
  };

  const t = translations[language] || translations['th'];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isMounted }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}
