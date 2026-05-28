'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useTranslation, Language } from '@/context/LanguageContext';
import { mockProperties } from '@/utils/mockProperties';
import {
  Phone, Mail, Globe, Menu, X, ChevronDown, MapPin,
  Share2, ShieldCheck, Shield, Check, Info, Heart, Star, Search, BedDouble, Square, Bath, ChevronLeft, ChevronRight, Calculator
} from 'lucide-react';

const languageFlags: Record<Language, string> = {
  th: 'https://flagcdn.com/w40/th.png',
  en: 'https://flagcdn.com/w40/us.png',
  ru: 'https://flagcdn.com/w40/ru.png',
  zh: 'https://flagcdn.com/w40/cn.png',
  ja: 'https://flagcdn.com/w40/jp.png',
  ko: 'https://flagcdn.com/w40/kr.png'
};

const languageNames: Record<Language, string> = {
  th: 'ไทย',
  en: 'English',
  ru: 'Русский',
  zh: '中文',
  ja: '日本語',
  ko: '한국어'
};

import { footerTranslations } from '@/utils/footerTranslations';

const topHeaderTranslations: Record<Language, Record<string, string>> = {
  th: { search: 'ค้นหา...', listProp: 'ลงประกาศ', sub: 'สมัครสมาชิก', myHome: 'หน้าหลัก', login: 'เข้าสู่ระบบ' },
  en: { search: 'Search...', listProp: 'List Property', sub: 'Subscription', myHome: 'My Home', login: 'Log in' },
  ru: { search: 'Поиск...', listProp: 'Добавить объект', sub: 'Подписка', myHome: 'Мой профиль', login: 'Войти' },
  zh: { search: '搜索...', listProp: '发布房源', sub: '订阅服务', myHome: '我的主页', login: '登录' },
  ja: { search: '検索...', listProp: '物件を掲載', sub: 'サブスクリプション', myHome: 'マイホーム', login: 'ログイン' },
  ko: { search: '검색...', listProp: '매물 등록', sub: '구독', myHome: '마이 홈', login: '로그인' }
};

const mainMenuTranslations: Record<Language, Record<string, string>> = {
  th: { home: 'หน้าแรก', rentToOwn: 'เช่าออมห้อง', monthlyRent: 'เช่าสบายจ่ายรายเดือน', sellWithTenant: 'ขายพร้อมผู้เช่า' },
  en: { home: 'Home', rentToOwn: 'Rent to Own', monthlyRent: 'Monthly Rent', sellWithTenant: 'Sell with Tenant' },
  ru: { home: 'Главная', rentToOwn: 'Аренда с выкупом', monthlyRent: 'Аренда на месяц', sellWithTenant: 'Продажа с арендатором' },
  zh: { home: '首页', rentToOwn: '租房存款', monthlyRent: '舒适月租', sellWithTenant: '带租客出售' },
  ja: { home: 'ホーム', rentToOwn: '賃貸からの購入', monthlyRent: '月額賃貸', sellWithTenant: 'オーナーチェンジ物件' },
  ko: { home: '홈', rentToOwn: '임대 후 구매', monthlyRent: '월세 임대', sellWithTenant: '세입자 안고 매매' }
};

export default function ProjectDetailPage() {
  const { language, setLanguage, t, isMounted } = useTranslation();
  const params = useParams();
  const rawName = params.name as string;
  const projectName = decodeURIComponent(rawName);

  // Find property by name
  const property = mockProperties.find(
    (p) => p.name.toLowerCase() === projectName.toLowerCase()
  );

  // States
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'DETAIL' | 'FACILITIES' | 'GALLERY' | 'MAP'>('DETAIL');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: `Hello, I am interested in ${projectName}. Please send me more details. Thank you.`
  });
  const [consent, setConsent] = useState(false);
  const [decline, setDecline] = useState(false);

  // States for Calculator
  const [calcDownPercent, setCalcDownPercent] = useState(5);
  const [calcRentPlan, setCalcRentPlan] = useState(property?.priceRent || 65000);
  const [calcLeaseTerm, setCalcLeaseTerm] = useState(3);

  useEffect(() => {
    if (property) {
      setCalcRentPlan(property.priceRent || 65000);
    }
  }, [property?.priceRent]);

  // States for other listings
  const [activeListTab, setActiveListTab] = useState<'SALE' | 'RENT'>('SALE');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);
  const itemsPerPage = 6;

  if (!isMounted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-grayPalette-600 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orangePalette-200"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-grayPalette-50 text-grayPalette-500 font-sans p-6">
        <div className="bg-white rounded-3xl p-12 max-w-md w-full shadow-xl border border-gray-100 text-center">
          <Info className="w-16 h-16 text-orangePalette-200 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Project Not Found</h1>
          <p className="text-sm text-gray-500 mb-8">
            We couldn't find a project named <span className="font-semibold text-gray-700">"{projectName}"</span>.
          </p>
          <a
            href="/"
            className="inline-block w-full py-3 bg-orangePalette-200 hover:bg-orangePalette-300 text-white rounded-xl font-bold text-sm transition-all shadow-md"
          >
            Back to Homepage
          </a>
        </div>
      </div>
    );
  }

  // Calculate pricing statistics per sq.m.
  const rentPricePerSqm = property.priceRent > 0 ? (property.priceRent / property.size) : 0;
  const salePricePerSqm = property.priceBuy > 0 ? (property.priceBuy / property.size) : 0;

  // Format currency helper
  const formatValue = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(val);
  };

  const isCondo = property.type === 'condominium';
  const typeStrUpper = (property.type === 'condominium' ? 'CONDOMINIUM' : (property.type === 'house' ? 'HOUSE' : (property.type === 'townhome' ? 'TOWN HOME' : (property.type === 'villa' ? 'VILLA' : property.type.toUpperCase()))));
  const typeStrThai = (property.type === 'condominium' ? 'คอนโดมิเนียม' : (property.type === 'house' ? 'บ้านเดี่ยว' : (property.type === 'townhome' ? 'ทาวน์โฮม' : (property.type === 'villa' ? 'วิลล่า' : 'อสังหาริมทรัพย์'))));

  // Find all units belonging to this project
  const projectUnits = mockProperties.filter(
    (p) => p.name.toLowerCase() === property.name.toLowerCase()
  );

  // Extract aggregate data from mockProperties
  const sizes = projectUnits.map(p => p.size).filter(Boolean);
  const minSize = sizes.length > 0 ? Math.min(...sizes) : property.size;
  const maxSize = sizes.length > 0 ? Math.max(...sizes) : property.size;
  const sizeRangeStr = minSize === maxSize ? `${minSize} sq.m.` : `${minSize} - ${maxSize} sq.m.`;

  const bedroomCounts = projectUnits.map(p => p.bedrooms).filter(Boolean);
  const minBedrooms = bedroomCounts.length > 0 ? Math.min(...bedroomCounts) : property.bedrooms;
  const maxBedrooms = bedroomCounts.length > 0 ? Math.max(...bedroomCounts) : property.bedrooms;
  const bedroomRangeStr = minBedrooms === maxBedrooms
    ? `${minBedrooms} ${minBedrooms > 1 ? 'Bedrooms' : 'Bedroom'}`
    : `${minBedrooms} - ${maxBedrooms} Bedrooms`;

  const buyPrices = projectUnits.map(p => p.priceBuy).filter(p => p > 0);
  const minBuyPrice = buyPrices.length > 0 ? Math.min(...buyPrices) : property.priceBuy;
  const startPriceStrDynamic = minBuyPrice > 0
    ? `${(minBuyPrice / 1000000).toFixed(2)} MB`
    : (property.priceRent > 0 ? `฿ ${(property.priceRent).toLocaleString()} / mo` : 'N/A');

  // Room types available in this project
  const uniqueRoomTypes = Array.from(new Set(projectUnits.map(p => p.roomType).filter(Boolean)));
  const roomTypesStr = uniqueRoomTypes.map(rt => {
    if (rt === 'studio') return 'Studio';
    if (rt === 'duplex') return 'Duplex';
    if (rt === 'penthouse') return 'Penthouse';
    return rt;
  }).join(', ');

  // Lifestyles available in this project
  const uniqueLifestyles = Array.from(new Set(projectUnits.map(p => p.lifestyle).filter(Boolean)));
  const lifestylesStr = uniqueLifestyles.join(', ');

  // Simple deterministic random generator based on property name
  const seedString = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
  };

  const seed = seedString(property.name);
  const getVal = (arr: any[], customSeed = 0) => arr[(seed + customSeed) % arr.length];

  // Deterministic values for condos
  const condoFloors = getVal(['35 Floors', '42 Floors', '47 Floors', '24 Floors', '50 Floors', '31 Floors'], 1);
  const condoBuildings = getVal(['1 Building', '2 Buildings', 'Tower A & Tower B'], 2);
  const condoUnits = getVal(['320 Units', '449 Units', '512 Units', '680 Units', '280 Units'], 3);
  const condoParking = getVal(['Auto Parking (60%)', '286 Cars (55%)', '450 Cars (70%)', 'Conventional & Auto Parking (65%)'], 4);
  const condoLand = getVal(['2-3-63 Rais', '1-2-85 Rais', '3-1-12 Rais', '2-0-45 Rais'], 5);
  const condoCommonFee = getVal(['55 ฿/sq.m./month', '65 ฿/sq.m./month', '75 ฿/sq.m./month', '85 ฿/sq.m./month'], 6);
  const condoSinkingFund = getVal(['500 ฿/sq.m.', '600 ฿/sq.m.', '700 ฿/sq.m.'], 7);

  // Deterministic values for houses/villas/townhomes
  const houseFloors = getVal(['2 Floors', '3 Floors'], 1);
  const houseBuildings = getVal(['1 Unit (Private)', 'Housing Estate'], 2);
  const houseUnits = getVal(['1 Unit', '85 Units (Project)', '120 Units (Project)'], 3);
  const houseParking = getVal(['2-3 Cars', '3-4 Cars', '4-5 Cars'], 4);
  const houseLand = getVal(['65 Sq. Wah', '120 Sq. Wah', '150 Sq. Wah', '85 Sq. Wah'], 5);
  const houseCommonFee = getVal(['2,000 ฿/year', '3,500 ฿/year', '45 ฿/sq.w./month'], 6);

  const specs = {
    projectName: property.name,
    type: isCondo ? 'Condominium' : (property.type === 'house' ? 'House' : (property.type === 'townhome' ? 'Town Home' : (property.type === 'villa' ? 'Villa' : property.type))),
    location: `${property.subDistrict || 'คลองตัน'}, ${property.district || 'คลองเตย'}, ${property.province || 'กรุงเทพมหานคร'}`,
    bts: `${property.station || 'Thong Lo (BTS)'} (${property.distance1 || '450 m.'})`,
    noBuilding: isCondo ? condoBuildings : houseBuildings,
    noFloor: isCondo ? condoFloors : houseFloors,
    noUnit: isCondo ? condoUnits : houseUnits,
    parking: isCondo ? condoParking : houseParking,
    land: isCondo ? condoLand : houseLand,
    startPrice: startPriceStrDynamic,
    commonFee: isCondo ? condoCommonFee : houseCommonFee,
    sinkingFund: isCondo ? condoSinkingFund : '-',
    projectOwner: property.brand || 'Ananda Development',
    yearBuilt: getVal(['November 2017', 'March 2019', 'June 2021', 'December 2022', 'October 2018'], 8),
    yearComplete: getVal(['April 2020', 'September 2021', 'December 2022', 'June 2024', 'January 2021'], 9),
    sizeRange: sizeRangeStr,
    bedroomRange: bedroomRangeStr,
    roomTypes: roomTypesStr || 'Standard',
    lifestyle: lifestylesStr || 'Urban Living'
  };

  const premiumFacilities = [
    'Grand Lobby & Reception Desk',
    'Infinity Edge Sky Swimming Pool & Jacuzzi',
    'Panoramic View Fitness Center (24-Hour Access)',
    'Separate Steam & Luxury Sauna Rooms',
    'Co-Working Space, Meeting Rooms & Private Library',
    'Sky Lounge, Social Club & Bar Lounge',
    'EV Charging Station Bays',
    '24-Hour Active Security Staff & High-Definition CCTV',
    'Smart Card Access Control & Elevators',
    'Automated Parking System'
  ];

  const galleryImages = [
    property.imageUrl,
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'
  ];

  const nearbyPlaces = {
    transports: [
      property.distance1 || '450 meters from BTS Thong Lo',
      property.distance2 || '1.1 km from BTS Phrom Phong'
    ].filter(Boolean),
    shopping: [
      'EmQuartier Shopping Mall (1.2 km)',
      'Emporium Luxury Department Store (1.1 km)',
      'K-Village Lifestyle Mall (800 m)',
      'Donki Mall Thonglor (1.8 km)'
    ],
    education: [
      'Bangkok University - Kluaynamthai Campus (1.5 km)',
      'Srinakharinwirot University (SWU) (2.8 km)',
      'Trinity International School (1.2 km)'
    ],
    hospitals: [
      'Theptarin Hospital (1.0 km)',
      'Samitivej Sukhumvit Hospital (1.6 km)',
      'Sukhumvit Hospital (2.0 km)'
    ]
  };

  const propertyTypes = [
    { value: 'all', label: t.all },
    { value: 'condominium', label: t.condo },
    { value: 'townhome', label: t.townhome },
    { value: 'house', label: t.house },
    { value: 'villa', label: t.villa },
    { value: 'office', label: t.office },
    { value: 'apartment', label: t.apartment },
    { value: 'land', label: t.land },
  ];

  // 1. Filter all mock properties that match the active tab (Sale vs Rent) and are not the current property
  const tabMatchingProperties = mockProperties.filter((p) => {
    if (activeListTab === 'SALE') {
      return p.priceBuy > 0 && p.id !== property.id;
    } else {
      return p.priceRent > 0 && p.id !== property.id;
    }
  });

  // 2. Find exact project matches for this tab
  const exactProjectListings = tabMatchingProperties.filter(
    (p) => p.name.toLowerCase() === property.name.toLowerCase()
  );

  let baseListings = exactProjectListings;

  // 3. Fallback: same district
  if (baseListings.length < 6) {
    const districtListings = tabMatchingProperties.filter(
      (p) => p.district === property.district && p.name.toLowerCase() !== property.name.toLowerCase()
    );
    const combined = [...baseListings];
    districtListings.forEach(item => {
      if (!combined.some(c => c.id === item.id)) {
        combined.push(item);
      }
    });
    baseListings = combined;
  }

  // 4. Fallback: same property type
  if (baseListings.length < 6) {
    const typeListings = tabMatchingProperties.filter(
      (p) => p.type === property.type && p.name.toLowerCase() !== property.name.toLowerCase()
    );
    const combined = [...baseListings];
    typeListings.forEach(item => {
      if (!combined.some(c => c.id === item.id)) {
        combined.push(item);
      }
    });
    baseListings = combined;
  }

  // 5. Fallback: any properties matching this tab
  if (baseListings.length < 6) {
    const otherTabListings = tabMatchingProperties.filter(
      (p) => p.name.toLowerCase() !== property.name.toLowerCase()
    );
    const combined = [...baseListings];
    otherTabListings.forEach(item => {
      if (!combined.some(c => c.id === item.id)) {
        combined.push(item);
      }
    });
    baseListings = combined;
  }

  // Filter based on search term
  const searchFilteredListings = baseListings.filter((p) => {
    const term = searchTerm.toLowerCase();
    return (
      p.name.toLowerCase().includes(term) ||
      p.location.toLowerCase().includes(term) ||
      (p.station && p.station.toLowerCase().includes(term))
    );
  });

  // Paginate listings
  const totalEntries = searchFilteredListings.length;
  const totalPages = Math.ceil(totalEntries / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalEntries);
  const paginatedListings = searchFilteredListings.slice(startIndex, endIndex);

  // Helper for pagination page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill out all required fields (*)');
      return;
    }
    if (!consent) {
      alert('Please accept the PDPA consent form checkboxes to proceed.');
      return;
    }
    setFormSubmitted(true);
  };

  const baseBuyPrice = property.priceBuy > 0 ? property.priceBuy : (property.priceRent * 150);
  const baseRentPrice = property.priceRent > 0 ? property.priceRent : Math.round(baseBuyPrice / 150);
  
  const downAmount = baseBuyPrice * (calcDownPercent / 100);
  const leaseMonths = calcLeaseTerm * 12;
  const totalRentPaid = calcRentPlan * leaseMonths;
  const accumulatedEquityAmount = totalRentPaid + downAmount;
  const accumulatedEquityPercent = (accumulatedEquityAmount / baseBuyPrice) * 100;
  const purchasePriceAfterLease = baseBuyPrice - accumulatedEquityAmount;
  const rentEquityPerYearPercent = (calcRentPlan * 12) / baseBuyPrice * 100;
  const marketPriceAfterLease = baseBuyPrice * (1 + 0.05 * calcLeaseTerm);
  const belowMarketSavings = marketPriceAfterLease - purchasePriceAfterLease;

  const formatInt = (val: number) => Math.round(val).toLocaleString('en-US');

  const handleRentInterest = () => {
    const textTH = `สวัสดีครับ/ค่ะ สนใจเช่าโครงการ ${property.name} ด้วยโปรแกรม Rent Today. Own Tomorrow:\n- ค่าเช่ารายเดือนที่วางแผน: ${formatInt(calcRentPlan)} บาท/เดือน\n- เงินดาวน์: ${calcDownPercent}% (${formatInt(downAmount)} บาท)\n- ระยะเวลาเช่า: ${calcLeaseTerm} ปี\n- ราคาซื้อหลังจากเช่า: ${formatInt(purchasePriceAfterLease)} บาท`;
    const textEN = `Hello, I am interested in renting ${property.name} with the Rent Today. Own Tomorrow program:\n- Planned Monthly Rent: ${formatInt(calcRentPlan)} THB/month\n- Down Payment: ${calcDownPercent}% (${formatInt(downAmount)} THB)\n- Lease Term: ${calcLeaseTerm} Years\n- Purchase Price After Lease: ${formatInt(purchasePriceAfterLease)} THB`;
    
    setFormData({
      ...formData,
      message: language === 'th' ? textTH : textEN
    });
    
    const element = document.getElementById('contact-agent-sidebar');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleBuyInterest = () => {
    const textTH = `สวัสดีครับ/ค่ะ สนใจซื้อโครงการ ${property.name} พร้อมผู้เช่า ด้วยโปรแกรม Rent Today. Own Tomorrow:\n- ราคาขาย: ${formatInt(baseBuyPrice)} บาท\n- ค่าเช่าปัจจุบัน: ${formatInt(calcRentPlan)} บาท/เดือน\n- สัญญาเช่า: ${calcLeaseTerm} ปี\n- อัตราผลตอบแทนสะสม (Equity): ${accumulatedEquityPercent.toFixed(2)}%`;
    const textEN = `Hello, I am interested in buying ${property.name} with tenant under the Rent Today. Own Tomorrow program:\n- Sale Price: ${formatInt(baseBuyPrice)} THB\n- Current Rent: ${formatInt(calcRentPlan)} THB/month\n- Lease Term: ${calcLeaseTerm} Years\n- Accumulated Equity: ${accumulatedEquityPercent.toFixed(2)}%`;
    
    setFormData({
      ...formData,
      message: language === 'th' ? textTH : textEN
    });

    const element = document.getElementById('contact-agent-sidebar');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-grayPalette-50 text-grayPalette-500 font-sans">
      {/* 1. TOP HEADER NAVIGATION */}
      <div className="bg-white border-b border-gray-200 py-2 hidden md:block relative">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-xs">
          <div className="flex items-center space-x-6">
            <a href="/" className="flex items-center">
              <img
                src="https://res.cloudinary.com/dvv3wvgnt/image/upload/v1779681125/svlogo_tzfhad.webp"
                alt="STAYVERSE Logo"
                className="h-12 w-auto object-contain"
              />
            </a>
            <div className="relative">
              <input 
                type="text" 
                placeholder={topHeaderTranslations[language].search} 
                className="pl-9 pr-4 py-1.5 bg-gray-100 rounded-full border border-transparent focus:border-orangePalette-200 focus:bg-white outline-none w-64 text-gray-800 transition-all shadow-inner" 
              />
              <Search className="w-3.5 h-3.5 absolute left-3.5 top-2 text-gray-500" />
            </div>
          </div>
          
          <div className="flex items-center space-x-4 font-semibold text-gray-600">
            <a href="/packages" className="hover:text-orangePalette-200 transition-colors">{topHeaderTranslations[language].listProp}</a>
            <div className="h-3 w-[1px] bg-gray-300"></div>
            <a href="/login" className="hover:text-orangePalette-200 transition-colors">{topHeaderTranslations[language].login}</a>
            <div className="h-3 w-[1px] bg-gray-300"></div>
            
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center space-x-1.5 px-2 py-1 hover:bg-gray-100 rounded-md transition-all cursor-pointer"
              >
                <img src={languageFlags[language]} alt={language} className="w-4 h-3 object-cover rounded-sm" />
                <span className="uppercase">{language}</span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden text-gray-800 font-medium">
                  {(Object.keys(languageFlags) as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-xs flex items-center space-x-2.5 hover:bg-orangePalette-100/50 hover:text-gray-900 transition-all duration-200 cursor-pointer ${language === lang ? 'bg-orangePalette-100/50 text-orangePalette-200 font-bold' : 'text-gray-700'}`}
                    >
                      <img src={languageFlags[lang]} alt={lang} className="w-4 h-3 object-cover rounded-sm" />
                      <span>{languageNames[lang]}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER NAVIGATION (Transparent Glass) */}
      <header className="bg-[#f4f1eb] backdrop-blur-md border-b border-white/5 transition-all py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center relative">
          {/* Logo */}
          <a href="/" className="flex md:hidden items-center">
            <img
              src="https://res.cloudinary.com/dvv3wvgnt/image/upload/v1779681125/svlogo_tzfhad.webp"
              alt="STAYVERSE Logo"
              className="h-12 w-auto object-contain"
            />
          </a>

          {/* Desktop Navigation Menu */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm lg:absolute lg:left-1/2 lg:-translate-x-1/2">
            <a href="/" className="text-[#306473] hover:text-orangePalette-200 hover:border-b-2 hover:border-orangePalette-200 pb-1 font-medium transition-all-custom">{mainMenuTranslations[language].home}</a>
            <a href="#" className="text-[#306473] hover:text-orangePalette-200 hover:border-b-2 hover:border-orangePalette-200 pb-1 font-medium transition-all-custom">{mainMenuTranslations[language].rentToOwn}</a>
            <a href="#" className="text-[#306473] hover:text-orangePalette-200 hover:border-b-2 hover:border-orangePalette-200 pb-1 font-medium transition-all-custom">{mainMenuTranslations[language].monthlyRent}</a>
            <a href="#" className="text-[#306473] hover:text-orangePalette-200 hover:border-b-2 hover:border-orangePalette-200 pb-1 font-medium transition-all-custom">{mainMenuTranslations[language].sellWithTenant}</a>

            <div className="relative group pb-1">
              <button className="flex items-center space-x-1 text-[#306473] hover:text-orangePalette-200 hover:border-b-2 hover:border-orangePalette-200 font-medium transition-all-custom">
                <span>LIFE VERSE</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 pt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                <div className="bg-[#f4f1eb] border border-white/10 rounded-lg shadow-xl overflow-hidden py-1">
                  <a href="/#lifeverse" className="block px-4 py-2.5 text-xs text-[#306473] hover:bg-orangePalette-200/20 hover:text-orangePalette-200 transition-colors">LivingVerse</a>
                  <a href="#" className="block px-4 py-2.5 text-xs text-[#306473] hover:bg-orangePalette-200/20 hover:text-orangePalette-200 transition-colors">SpaceVerse</a>
                  <a href="#" className="block px-4 py-2.5 text-xs text-[#306473] hover:bg-orangePalette-200/20 hover:text-orangePalette-200 transition-colors">ReviewVerse</a>
                  <a href="#" className="block px-4 py-2.5 text-xs text-[#306473] hover:bg-orangePalette-200/20 hover:text-orangePalette-200 transition-colors">TrendVerse</a>
                  <a href="#" className="block px-4 py-2.5 text-xs text-[#306473] hover:bg-orangePalette-200/20 hover:text-orangePalette-200 transition-colors">InsightVerse</a>
                </div>
              </div>
            </div>
          </nav>

          {/* User & Burger actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setBurgerMenuOpen(!burgerMenuOpen)}
              className="p-2 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 text-gray-500 cursor-pointer transition-all lg:flex hidden"
            >
              <Menu className="w-5 h-5 text-orangePalette-200" />
            </button>

            {/* Login is only visible on mobile main header since it's in top bar for tablet/desktop */}
            <a href="/login" className="md:hidden text-[#306473] hover:text-orangePalette-200 font-bold text-xs uppercase transition-all-custom px-3 py-2 border border-[#306473]/25 hover:border-orangePalette-200 rounded-full">
              {language === 'th' ? 'เข้าสู่ระบบ' : 'Login'}
            </a>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-500 cursor-pointer transition-all lg:hidden flex"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-orangePalette-200" />}
            </button>
          </div>
        </div>

        {/* Desktop Mega Dropdown/Burger Menu */}
        {burgerMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-[#052b37] border-b border-white/10 text-white py-8 z-50 animate-fade-in shadow-2xl">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h4 className="text-orangePalette-200 font-bold uppercase tracking-wider text-xs mb-4">{t.forSale}</h4>
                <div className="flex flex-col space-y-2 text-sm text-grayPalette-100">
                  <a href="/#properties" className="hover:text-orangePalette-200 transition-all">Condominium</a>
                  <a href="/#properties" className="hover:text-orangePalette-200 transition-all">Town Home</a>
                  <a href="/#properties" className="hover:text-orangePalette-200 transition-all">House</a>
                  <a href="/#properties" className="hover:text-orangePalette-200 transition-all">Villa</a>
                </div>
              </div>
              <div>
                <h4 className="text-orangePalette-200 font-bold uppercase tracking-wider text-xs mb-4">{t.forRent}</h4>
                <div className="flex flex-col space-y-2 text-sm text-grayPalette-100">
                  <a href="/#properties" className="hover:text-orangePalette-200 transition-all">Condominium</a>
                  <a href="/#properties" className="hover:text-orangePalette-200 transition-all">Town Home</a>
                  <a href="/#properties" className="hover:text-orangePalette-200 transition-all">House</a>
                  <a href="/#properties" className="hover:text-orangePalette-200 transition-all">Villa</a>
                </div>
              </div>
              <div>
                <h4 className="text-tealPalette-100 font-bold uppercase tracking-wider text-xs mb-4">Stayverse Services</h4>
                <div className="flex flex-col space-y-2 text-sm text-grayPalette-100">
                  <a href="#" className="hover:text-tealPalette-100 transition-all">{t.skyDrone}</a>
                  <a href="#" className="hover:text-tealPalette-100 transition-all">{t.tms}</a>
                  <a href="#" className="hover:text-tealPalette-100 transition-all">{t.decorPackage}</a>
                  <a href="#" className="hover:text-tealPalette-100 transition-all">{t.career}</a>
                </div>
              </div>
              <div>
                <h4 className="text-tealPalette-100 font-bold uppercase tracking-wider text-xs mb-4">Corporate</h4>
                <div className="flex flex-col space-y-2 text-sm text-grayPalette-100 font-medium">
                  <a href="#" className="hover:text-tealPalette-100 transition-all">{t.aboutUs}</a>
                  <a href="#" className="hover:text-tealPalette-100 transition-all">{t.privacyPolicy}</a>
                  <p className="text-xs text-gray-400 mt-4 leading-relaxed">{t.footerDesc}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-bluePalette-600/98 backdrop-blur-lg border-b border-white/10 text-white flex flex-col p-6 space-y-4 shadow-xl z-50">
            <a href="/" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-orangePalette-200 text-base font-semibold pb-2 border-b border-white/5 transition-all">{mainMenuTranslations[language].home}</a>
            <a href="#" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-orangePalette-200 text-base font-semibold pb-2 border-b border-white/5 transition-all">{mainMenuTranslations[language].rentToOwn}</a>
            <a href="#" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-orangePalette-200 text-base font-semibold pb-2 border-b border-white/5 transition-all">{mainMenuTranslations[language].monthlyRent}</a>
            <a href="#" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-orangePalette-200 text-base font-semibold pb-2 border-b border-white/5 transition-all">{mainMenuTranslations[language].sellWithTenant}</a>
            <div className="flex flex-col space-y-3 pb-2 border-b border-white/5">
              <span className="text-white text-base font-semibold">LIFE VERSE</span>
              <div className="pl-4 flex flex-col space-y-3">
                <a href="/#lifeverse" onClick={() => setMobileMenuOpen(false)} className="text-white/80 hover:text-orangePalette-200 text-sm transition-all">LivingVerse</a>
                <a href="#" onClick={() => setMobileMenuOpen(false)} className="text-white/80 hover:text-orangePalette-200 text-sm transition-all">SpaceVerse</a>
                <a href="#" onClick={() => setMobileMenuOpen(false)} className="text-white/80 hover:text-orangePalette-200 text-sm transition-all">ReviewVerse</a>
                <a href="#" onClick={() => setMobileMenuOpen(false)} className="text-white/80 hover:text-orangePalette-200 text-sm transition-all">TrendVerse</a>
                <a href="#" onClick={() => setMobileMenuOpen(false)} className="text-white/80 hover:text-orangePalette-200 text-sm transition-all">InsightVerse</a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <a href="/#contact" onClick={() => setMobileMenuOpen(false)} className="bg-orangePalette-200 hover:bg-orangePalette-300 text-white text-center py-2.5 rounded font-semibold text-sm transition-all animate-pulse">
                {t.postProperty}
              </a>
              <a href="/#contact" onClick={() => setMobileMenuOpen(false)} className="bg-white text-bluePalette-600 text-center py-2.5 rounded font-semibold text-sm transition-all">
                {t.sendEnquiry}
              </a>
            </div>
          </div>
        )}
      </header>

      {/* 3. DYNAMIC PROJECT BANNER & PRICING STATS */}
      <section className="bg-white pt-10 pb-6 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">

            {/* Title Details (Left) */}
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight font-sans uppercase">
                {property.name}
              </h1>
              <div className="flex items-center space-x-2 mt-2 text-sm text-gray-500 font-medium">
                <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                <span>{property.distance1 || `${property.station} (${property.distance1 || '450 m.'})`}</span>
              </div>
            </div>

            {/* Average Prices Stats (Right) */}
            <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
              {/* Avg. Price For Rent */}
              <div className="bg-[#2a2f35] text-white px-6 py-3.5 rounded-lg shadow-sm flex flex-col justify-center min-w-[190px]">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">
                  AVG. PRICE FOR RENT
                </span>
                <span className="text-lg md:text-xl font-extrabold tracking-tight">
                  {rentPricePerSqm > 0 ? `฿ ${formatValue(rentPricePerSqm)}` : '฿ 906.92'} <span className="text-xs font-normal text-gray-400">/ sq.m.</span>
                </span>
              </div>

              {/* Avg. Price For Sale */}
              <div className="bg-[#ff5a2c] text-white px-6 py-3.5 rounded-lg shadow-sm flex flex-col justify-center min-w-[190px]">
                <span className="text-[10px] font-bold text-orange-100 uppercase tracking-widest leading-none mb-1">
                  AVG. PRICE FOR SALE
                </span>
                <span className="text-lg md:text-xl font-extrabold tracking-tight">
                  {salePricePerSqm > 0 ? `฿ ${formatValue(salePricePerSqm)}` : '฿ 223,169.61'} <span className="text-xs font-normal text-orange-100">/ sq.m.</span>
                </span>
              </div>

              {/* Share and Save Actions */}
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Project URL copied to clipboard!');
                  }}
                  className="bg-orangePalette-200 hover:bg-orangePalette-300 text-white p-3 rounded-lg shadow-sm transition-all cursor-pointer flex items-center justify-center"
                  title="Share Project"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className={`p-3 rounded-lg border shadow-sm transition-all cursor-pointer flex items-center justify-center ${isSaved ? 'bg-red-50 text-red-500 border-red-200' : 'bg-white hover:bg-gray-50 border-gray-200 text-gray-400'}`}
                  title="Save Project"
                >
                  <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. MAIN LAYOUT: DETAILS TABS & CONTACT SIDEBAR */}
      <section className="py-10 max-w-7xl mx-auto px-4 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* Left Container (Tabs & Spec Info Table) */}
          <div className="lg:col-span-2 flex flex-col space-y-6">

            {/* Tab Links */}
            <div className="relative border-b border-gray-200 pb-px flex items-center space-x-8">
              {(['DETAIL', 'FACILITIES', 'GALLERY', 'MAP'] as const).map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-sm font-extrabold uppercase tracking-widest pb-3.5 transition-all relative cursor-pointer ${isActive ? 'text-gray-800 font-black' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    {tab}
                    {isActive && (
                      <div className="absolute bottom-[-1px] left-0 right-0 flex justify-center">
                        <div className="w-full h-[2.5px] bg-[#ff5a2c] relative">
                          <div className="absolute left-1/2 transform -translate-x-1/2 -top-0.5 w-1.5 h-1.5 rounded-full bg-[#ff5a2c] ring-1 ring-white" />
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Tab Contents */}
            <div className="bg-[#f4f7fa] rounded-2xl p-6 md:p-8 border border-gray-100/50 shadow-sm min-h-[480px]">

              {/* 1. DETAIL TAB CONTENT */}
              {activeTab === 'DETAIL' && (
                <div className="space-y-4 text-sm animate-fade-in">
                  <table className="w-full text-left table-fixed">
                    <tbody>
                      <tr className="border-b border-gray-200/50 py-3.5 flex flex-col sm:flex-row sm:items-center">
                        <td className="w-full sm:w-1/3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 sm:mb-0">The Project</td>
                        <td className="w-full sm:w-2/3 font-semibold text-gray-700">{specs.projectName}</td>
                      </tr>
                      <tr className="border-b border-gray-200/50 py-3.5 flex flex-col sm:flex-row sm:items-center">
                        <td className="w-full sm:w-1/3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 sm:mb-0">TYPE</td>
                        <td className="w-full sm:w-2/3 font-semibold text-gray-700">{specs.type}</td>
                      </tr>
                      <tr className="border-b border-gray-200/50 py-3.5 flex flex-col sm:flex-row sm:items-center">
                        <td className="w-full sm:w-1/3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 sm:mb-0">Location</td>
                        <td className="w-full sm:w-2/3 font-semibold text-gray-700">{specs.location}</td>
                      </tr>
                      <tr className="border-b border-gray-200/50 py-3.5 flex flex-col sm:flex-row sm:items-center">
                        <td className="w-full sm:w-1/3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 sm:mb-0">BTS / MRT</td>
                        <td className="w-full sm:w-2/3 font-semibold text-gray-700">{specs.bts}</td>
                      </tr>
                      <tr className="border-b border-gray-200/50 py-3.5 flex flex-col sm:flex-row sm:items-center">
                        <td className="w-full sm:w-1/3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 sm:mb-0">Bedrooms Available</td>
                        <td className="w-full sm:w-2/3 font-semibold text-gray-700">{specs.bedroomRange}</td>
                      </tr>
                      <tr className="border-b border-gray-200/50 py-3.5 flex flex-col sm:flex-row sm:items-center">
                        <td className="w-full sm:w-1/3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 sm:mb-0">Unit Sizes</td>
                        <td className="w-full sm:w-2/3 font-semibold text-gray-700">{specs.sizeRange}</td>
                      </tr>
                      <tr className="border-b border-gray-200/50 py-3.5 flex flex-col sm:flex-row sm:items-center">
                        <td className="w-full sm:w-1/3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 sm:mb-0">Room Types</td>
                        <td className="w-full sm:w-2/3 font-semibold text-gray-700">{specs.roomTypes}</td>
                      </tr>
                      <tr className="border-b border-gray-200/50 py-3.5 flex flex-col sm:flex-row sm:items-center">
                        <td className="w-full sm:w-1/3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 sm:mb-0">Lifestyles</td>
                        <td className="w-full sm:w-2/3 font-semibold text-gray-700">{specs.lifestyle}</td>
                      </tr>
                      <tr className="border-b border-gray-200/50 py-3.5 flex flex-col sm:flex-row sm:items-center">
                        <td className="w-full sm:w-1/3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 sm:mb-0">No. Building</td>
                        <td className="w-full sm:w-2/3 font-semibold text-gray-700">{specs.noBuilding}</td>
                      </tr>
                      <tr className="border-b border-gray-200/50 py-3.5 flex flex-col sm:flex-row sm:items-center">
                        <td className="w-full sm:w-1/3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 sm:mb-0">No. Floor</td>
                        <td className="w-full sm:w-2/3 font-semibold text-gray-700">{specs.noFloor}</td>
                      </tr>
                      <tr className="border-b border-gray-200/50 py-3.5 flex flex-col sm:flex-row sm:items-center">
                        <td className="w-full sm:w-1/3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 sm:mb-0">No. Unit</td>
                        <td className="w-full sm:w-2/3 font-semibold text-gray-700">{specs.noUnit}</td>
                      </tr>
                      <tr className="border-b border-gray-200/50 py-3.5 flex flex-col sm:flex-row sm:items-center">
                        <td className="w-full sm:w-1/3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 sm:mb-0">Parking</td>
                        <td className="w-full sm:w-2/3 font-semibold text-gray-700">{specs.parking}</td>
                      </tr>
                      <tr className="border-b border-gray-200/50 py-3.5 flex flex-col sm:flex-row sm:items-center">
                        <td className="w-full sm:w-1/3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 sm:mb-0">Land</td>
                        <td className="w-full sm:w-2/3 font-semibold text-gray-700">{specs.land}</td>
                      </tr>
                      <tr className="border-b border-gray-200/50 py-3.5 flex flex-col sm:flex-row sm:items-center">
                        <td className="w-full sm:w-1/3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 sm:mb-0">Start Price</td>
                        <td className="w-full sm:w-2/3 font-semibold text-gray-700">{specs.startPrice}</td>
                      </tr>
                      <tr className="border-b border-gray-200/50 py-3.5 flex flex-col sm:flex-row sm:items-center">
                        <td className="w-full sm:w-1/3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 sm:mb-0">Common Fee</td>
                        <td className="w-full sm:w-2/3 font-semibold text-gray-700">{specs.commonFee}</td>
                      </tr>
                      <tr className="border-b border-gray-200/50 py-3.5 flex flex-col sm:flex-row sm:items-center">
                        <td className="w-full sm:w-1/3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 sm:mb-0">Sinking Fund</td>
                        <td className="w-full sm:w-2/3 font-semibold text-gray-700">{specs.sinkingFund}</td>
                      </tr>
                      <tr className="border-b border-gray-200/50 py-3.5 flex flex-col sm:flex-row sm:items-center">
                        <td className="w-full sm:w-1/3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 sm:mb-0">Project Owner</td>
                        <td className="w-full sm:w-2/3 font-semibold text-gray-700">{specs.projectOwner}</td>
                      </tr>
                      <tr className="border-b border-gray-200/50 py-3.5 flex flex-col sm:flex-row sm:items-center">
                        <td className="w-full sm:w-1/3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 sm:mb-0">Year Built</td>
                        <td className="w-full sm:w-2/3 font-semibold text-gray-700">{specs.yearBuilt}</td>
                      </tr>
                      <tr className="py-3.5 flex flex-col sm:flex-row sm:items-center">
                        <td className="w-full sm:w-1/3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 sm:mb-0">Year Complete</td>
                        <td className="w-full sm:w-2/3 font-semibold text-gray-700">{specs.yearComplete}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* 2. FACILITIES TAB CONTENT */}
              {activeTab === 'FACILITIES' && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-2">Exclusive Facilities</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {premiumFacilities.map((fac, idx) => (
                      <div key={idx} className="flex items-center space-x-3 text-sm text-gray-600 bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm">
                        <div className="bg-emerald-50 text-emerald-500 rounded-full p-1 border border-emerald-100 flex items-center justify-center shrink-0">
                          <Check className="w-4 h-4" />
                        </div>
                        <span className="font-medium">{fac}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. GALLERY TAB CONTENT */}
              {activeTab === 'GALLERY' && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-2">Luxury Gallery</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {galleryImages.map((img, idx) => (
                      <div key={idx} className="relative h-44 rounded-xl overflow-hidden shadow-sm border border-gray-100 group">
                        <img
                          src={img}
                          alt={`${property.name} gallery ${idx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all"></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. MAP TAB CONTENT */}
              {activeTab === 'MAP' && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-2">Location & Coordinates</h3>
                  <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-sm h-96 bg-gray-200">
                    <iframe
                      src={`https://www.google.com/maps/embed/v1/search?key=YOUR_API_KEY&q=${encodeURIComponent(property.name + ' Bangkok')}`}
                      className="absolute inset-0 w-full h-full border-0 grayscale opacity-85 hover:grayscale-0 transition-all"
                      allowFullScreen
                      loading="lazy"
                    ></iframe>

                    {/* Stylized custom overlay map */}
                    <div className="absolute inset-0 bg-grayPalette-600/10 backdrop-blur-[1px] flex flex-col items-center justify-center p-6 text-center z-10 pointer-events-none">
                      <div className="bg-white/90 border border-gray-100 p-6 rounded-2xl max-w-sm shadow-xl flex flex-col items-center pointer-events-auto">
                        <MapPin className="w-10 h-10 text-red-500 mb-3" />
                        <h4 className="font-bold text-gray-800 text-sm mb-1">{property.name}</h4>
                        <p className="text-xs text-gray-500 mb-4">{property.station} Zone</p>
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.name + ' ' + property.location)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-orangePalette-200 hover:bg-orangePalette-300 text-white rounded-lg text-xs font-bold shadow-sm transition-all"
                        >
                          Open in Google Maps
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Right Sidebar Form Container (Contact Form) */}
          <div id="contact-agent-sidebar" className="col-span-1 bg-[#eaeff4] rounded-2xl p-6 border border-gray-200/50 shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 font-sans tracking-wide mb-6 border-b border-gray-200/60 pb-3">
              Contact The Agent
            </h3>

            {formSubmitted ? (
              <div className="bg-white border border-emerald-100 rounded-xl p-6 text-center text-gray-600 animate-fade-in shadow-sm">
                <div className="w-12 h-12 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-500">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-gray-800 text-base mb-1">Message Sent!</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Thank you for your inquiry. A professional agent will contact you shortly via email or phone.
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', message: '' });
                  }}
                  className="mt-6 w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg text-xs font-bold transition-all"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                {/* Name */}
                <div className="flex flex-col">
                  <input
                    type="text"
                    required
                    placeholder="Name*"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orangePalette-200 text-gray-700 placeholder-gray-400 transition-all shadow-inner"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col">
                  <input
                    type="email"
                    required
                    placeholder="Email*"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orangePalette-200 text-gray-700 placeholder-gray-400 transition-all shadow-inner"
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col">
                  <input
                    type="tel"
                    required
                    placeholder="Phone*"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orangePalette-200 text-gray-700 placeholder-gray-400 transition-all shadow-inner"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col">
                  <textarea
                    rows={4}
                    placeholder="Message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orangePalette-200 text-gray-700 placeholder-gray-400 transition-all shadow-inner resize-none"
                  ></textarea>
                </div>

                {/* PDPA checkboxes */}
                <div className="space-y-2.5 pt-2 border-t border-gray-200/50">
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2">
                    CONSENT FORM
                  </div>
                  <p className="text-[9px] text-gray-400 leading-normal">
                    Whereas Anvinest Development Partners Co.,Ltd. ("Company") has been handling the personal data to be in compliance and in accordance with the Personal Data Protection Act, B.E. 2562 (2019) in collecting, using, processing and disclosing the personal data for various purposes as specified below.
                  </p>

                  {/* Agree Checkbox */}
                  <label className="flex items-start space-x-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => {
                        setConsent(e.target.checked);
                        if (e.target.checked) setDecline(false);
                      }}
                      className="mt-1 h-3.5 w-3.5 text-orangePalette-200 border-gray-300 rounded focus:ring-orangePalette-200"
                    />
                    <span className="text-[10px] text-gray-500 leading-tight">
                      2. for the Company to make research on the information and develop products, services as well as selling and marketing. in order to further provide better experiences to the customers.
                    </span>
                  </label>

                  {/* Decline Checkbox */}
                  <label className="flex items-start space-x-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={decline}
                      onChange={(e) => {
                        setDecline(e.target.checked);
                        if (e.target.checked) setConsent(false);
                      }}
                      className="mt-0.5 h-3.5 w-3.5 text-orangePalette-200 border-gray-300 rounded focus:ring-orangePalette-200"
                    />
                    <span className="text-[10px] text-gray-500 leading-tight">
                      Decline
                    </span>
                  </label>
                </div>

                {/* Submit button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#ff5a2c] hover:bg-[#ff7651] text-white rounded-xl text-sm font-bold shadow-md transition-all cursor-pointer flex items-center justify-center"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* 4.8. SMART REAL ESTATE CALCULATOR SECTION */}
      <section className="bg-[#fcfbf9] border-t border-gray-200/60 py-16" id="smart-calculator">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="text-center mb-12">
            <span className="text-[11px] font-black text-orangePalette-200 tracking-[0.2em] uppercase bg-orangePalette-200/10 px-3 py-1 rounded-full">
              FINANCIAL PROGRAM
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0c4a5e] mt-3 font-sans uppercase">
              {language === 'th' ? 'เครื่องคำนวณอสังหาริมทรัพย์อัจฉริยะ' : 'Smart Real Estate Calculator'}
            </h2>
            <p className="text-xs md:text-sm text-gray-500 mt-2 max-w-xl mx-auto font-medium">
              {language === 'th' 
                ? 'วางแผนทางการเงินเพื่อการเป็นเจ้าของอสังหาริมทรัพย์ระดับพรีเมียมด้วยทางเลือกที่ยืดหยุ่นและคุ้มค่าที่สุด' 
                : 'Plan your finances for owning premium real estate with our flexible and highly rewarding programs.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Left Column - Property Info & Preview */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-gray-150 shadow-sm overflow-hidden flex flex-col justify-between">
              <div>
                {/* Image */}
                <div className="relative h-64 md:h-72 w-full overflow-hidden bg-gray-150">
                  <img
                    src={property.imageUrl}
                    alt={property.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-[#2f855a] text-white text-[11px] font-extrabold px-3 py-1.5 rounded-lg shadow-md uppercase tracking-wider">
                      {language === 'th' 
                        ? `เช่า ฿${formatInt(calcRentPlan)} / เดือน` 
                        : `Rent ฿${formatInt(calcRentPlan)} / mo`}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 md:p-8 space-y-4">
                  <h3 className="font-extrabold text-2xl text-gray-800 tracking-tight uppercase">
                    {property.name}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium">
                    {language === 'th'
                      ? `สุดยอดโครงการ ${property.brand || 'ระดับพรีเมียม'} ทำเล ${property.location} โดดเด่นด้วยดีไซน์และฟังก์ชันตอบโจทย์การใช้ชีวิตที่เหนือระดับ พร้อมสิ่งอำนวยความสะดวกครบครัน ตอบรับทุกไลฟ์สไตล์ของคนเมืองได้อย่างสมบูรณ์แบบ`
                      : `Premium residential project by ${property.brand || 'leading developer'} in ${property.location}. Features sophisticated design, luxury amenities, and prime connectivity, perfectly tailored for high-end urban lifestyles.`}
                  </p>

                  <div className="w-full h-px bg-gray-100 my-4" />

                  {/* Price Row */}
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        {language === 'th' ? 'ราคาขาย' : 'SALE PRICE'}
                      </span>
                      <span className="text-xl md:text-2xl font-black text-red-500 font-mono">
                        ฿{formatInt(baseBuyPrice)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="bg-[#052b37] text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                        {language === 'th' ? `สัญญาเช่า ${calcLeaseTerm} ปี` : `${calcLeaseTerm}-Year Lease`}
                      </span>
                      <span className="bg-[#ff5a2c] text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                        {rentEquityPerYearPercent.toFixed(2)}% Equity / {language === 'th' ? 'ปี' : 'Year'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Specs Footer */}
              <div className="px-6 md:px-8 py-5 bg-[#fcfbf9] border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-semibold rounded-b-3xl">
                <div className="flex items-center space-x-2">
                  <BedDouble className="w-4.5 h-4.5 text-[#ff5a2c]" />
                  <span>{property.bedrooms} {language === 'th' ? 'ห้องนอน' : 'Bedrooms'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Bath className="w-4.5 h-4.5 text-[#ff5a2c]" />
                  <span>{Math.max(1, property.bedrooms)} {language === 'th' ? 'ห้องน้ำ' : 'Bathrooms'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Square className="w-4.5 h-4.5 text-[#ff5a2c]" />
                  <span>{property.size} {language === 'th' ? 'ตร.ม.' : 'sq.m.'}</span>
                </div>
              </div>
            </div>

            {/* Right Column - Calculator Card */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-200/80 shadow-md p-6 md:p-8 flex flex-col justify-between space-y-6">
              <div className="text-center pb-4 border-b border-gray-150">
                <h3 className="text-2xl font-extrabold text-[#0c4a5e] tracking-tight font-sans">
                  Rent Today. Own Tomorrow
                </h3>
                <p className="text-xs text-gray-500 mt-1 font-semibold">
                  {language === 'th' 
                    ? `เป็นเจ้าของวันนี้ได้ในราคา ${formatInt(baseBuyPrice)} บาท` 
                    : `Own today for ${formatInt(baseBuyPrice)} THB`}
                </p>
                <div className="mt-3 bg-[#2f855a]/10 border border-[#2f855a]/20 text-[#2f855a] rounded-xl py-2.5 px-4 text-xs md:text-sm font-bold inline-block">
                  {language === 'th' 
                    ? `เป็นเจ้าของหลังจากเช่า ${calcLeaseTerm} ปีได้ในราคาเพียง ${formatInt(purchasePriceAfterLease)} บาท`
                    : `Own after renting for ${calcLeaseTerm} years for only ${formatInt(purchasePriceAfterLease)} THB`}
                </div>
              </div>

              {/* Sliders Area */}
              <div className="space-y-5">
                {/* Down Payment Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs md:text-sm">
                    <span className="font-bold text-gray-700">
                      {language === 'th' ? 'เลือกจำนวนเงินดาวน์ที่คุณพอใจ' : 'Choose down payment percentage'}
                      <span className="text-[10px] text-gray-400 font-normal block md:inline md:ml-1">
                        (0% interest rate for 6 months)
                      </span>
                    </span>
                    <span className="font-black text-[#0c4a5e] font-mono">
                      {calcDownPercent}% ({formatInt(downAmount)})
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    step="5"
                    value={calcDownPercent}
                    onChange={(e) => setCalcDownPercent(Number(e.target.value))}
                    className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#0c4a5e]"
                  />
                  <div className="flex justify-between text-[10px] text-gray-455 font-bold px-1">
                    <span>5%</span>
                    <span>10%</span>
                    <span>15%</span>
                    <span>20%</span>
                    <span>25%</span>
                    <span>30%</span>
                  </div>
                </div>

                {/* Rent Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs md:text-sm">
                    <span className="font-bold text-gray-700">
                      {language === 'th' ? 'เลือกวางแผนค่าเช่า/ เดือน' : 'Choose monthly rent plan'}
                    </span>
                    <span className="font-black text-[#0c4a5e] font-mono">
                      ฿{formatInt(calcRentPlan)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={Math.round(baseRentPrice * 0.5)}
                    max={Math.round(baseRentPrice * 1.5)}
                    step="1000"
                    value={calcRentPlan}
                    onChange={(e) => setCalcRentPlan(Number(e.target.value))}
                    className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#0c4a5e]"
                  />
                  <div className="flex justify-between text-[10px] text-gray-455 font-bold px-1">
                    <span>฿{formatInt(baseRentPrice * 0.5)}</span>
                    <span>฿{formatInt(baseRentPrice)}</span>
                    <span>฿{formatInt(baseRentPrice * 1.5)}</span>
                  </div>
                </div>

                {/* Lease Term Selector */}
                <div className="space-y-2">
                  <span className="text-xs md:text-sm font-bold text-gray-700 block">
                    {language === 'th' ? 'ระยะเวลาเช่า' : 'Lease Term'}
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {([1, 3, 5] as const).map((term) => {
                      const isSel = calcLeaseTerm === term;
                      return (
                        <button
                          key={term}
                          type="button"
                          onClick={() => setCalcLeaseTerm(term)}
                          className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            isSel 
                              ? 'bg-[#0c4a5e] text-white border-[#0c4a5e] shadow-sm' 
                              : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          {term} {language === 'th' ? 'ปี' : (term > 1 ? 'Years' : 'Year')}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Calculations Box */}
              <div className="bg-[#f0f4f7] rounded-2xl p-4 md:p-5 border border-gray-200/30 text-xs md:text-sm space-y-2.5 font-medium text-gray-600">
                <div className="flex justify-between items-center pb-2 border-b border-gray-200/50">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    {language === 'th' ? 'รายละเอียดคำนวณ' : 'CALCULATION SUMMARY'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orangePalette-200" />
                    {language === 'th' ? 'ค่าเช่าตลอดสัญญา' : 'Total rent over contract'}
                  </span>
                  <span className="font-bold text-gray-800 font-mono">฿{formatInt(totalRentPaid)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orangePalette-200" />
                    {language === 'th' ? 'ค่าดาวน์ที่จ่ายไปแล้ว' : 'Down Payment paid'}
                  </span>
                  <span className="font-bold text-gray-800 font-mono">฿{formatInt(downAmount)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orangePalette-200" />
                    {language === 'th' ? 'Equity ที่สะสมได้' : 'Accumulated Equity'}
                  </span>
                  <span className="font-black text-emerald-600 font-mono">{accumulatedEquityPercent.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0c4a5e]" />
                    {language === 'th' ? 'ซื้อตอนหมดสัญญาได้ในราคา' : 'Purchase price after contract'}
                  </span>
                  <span className="font-black text-[#0c4a5e] font-mono">฿{formatInt(purchasePriceAfterLease)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                    {language === 'th' ? 'ราคาตลาดห้องนี้ ณ ปัจจุบัน' : 'Current Market Value'}
                  </span>
                  <span className="font-bold text-gray-700 font-mono">฿{formatInt(marketPriceAfterLease)}</span>
                </div>
              </div>

              {/* Market Saving Highlight */}
              <div className="bg-[#2f855a]/10 border border-[#2f855a]/25 text-[#2f855a] rounded-xl py-3 px-4 text-center font-extrabold text-xs md:text-sm">
                {language === 'th' 
                  ? `เป็นเจ้าของห้องนี้ได้ในราคาต่ำกว่าตลาดถึง ${formatInt(belowMarketSavings)} บาท!!`
                  : `Own this room at a price ${formatInt(belowMarketSavings)} THB lower than market!!`}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleRentInterest}
                  className="py-3 px-4 bg-[#2f855a] hover:bg-[#226040] text-white rounded-xl font-bold text-sm tracking-wide shadow-sm hover:shadow transition-all cursor-pointer text-center"
                >
                  {language === 'th' ? 'สนใจเช่าห้องนี้' : 'Interested in renting'}
                </button>
                <button
                  type="button"
                  onClick={handleBuyInterest}
                  className="py-3 px-4 bg-[#c53030] hover:bg-[#9b2c2c] text-white rounded-xl font-bold text-sm tracking-wide shadow-sm hover:shadow transition-all cursor-pointer text-center"
                >
                  {language === 'th' ? 'สนใจซื้อห้องนี้ พร้อมผู้เช่า' : 'Interested in buying with tenant'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LOCATION & NEARBY SECTION */}
      <section className="bg-white border-t border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#0c4a5e] mb-8 font-sans uppercase">
            LOCATION & NEARBY
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* Transit */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">
                Transportations
              </h3>
              <ul className="space-y-2.5">
                {nearbyPlaces.transports.map((place, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600 font-medium">
                    <MapPin className="w-4.5 h-4.5 text-red-400 shrink-0 mt-0.5" />
                    <span>{place}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Shopping */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">
                Shopping & Dining
              </h3>
              <ul className="space-y-2.5">
                {nearbyPlaces.shopping.map((place, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600 font-medium">
                    <MapPin className="w-4.5 h-4.5 text-orange-400 shrink-0 mt-0.5" />
                    <span>{place}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Education */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">
                Educations
              </h3>
              <ul className="space-y-2.5">
                {nearbyPlaces.education.map((place, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600 font-medium">
                    <MapPin className="w-4.5 h-4.5 text-blue-400 shrink-0 mt-0.5" />
                    <span>{place}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hospitals */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">
                Hospitals
              </h3>
              <ul className="space-y-2.5">
                {nearbyPlaces.hospitals.map((place, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600 font-medium">
                    <MapPin className="w-4.5 h-4.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{place}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 4.9. OTHER LISTINGS SECTION */}
      <section className="bg-grayPalette-50/50 border-t border-gray-100 py-16" id="other-listings">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 border-b border-gray-200 pb-3">
            {/* Tabs (Left side) */}
            <div className="flex items-center space-x-6 md:space-x-8">
              <button
                onClick={() => { setActiveListTab('SALE'); setCurrentPage(1); }}
                className={`text-sm font-extrabold uppercase tracking-widest pb-3.5 transition-all relative cursor-pointer ${activeListTab === 'SALE' ? 'text-gray-800 font-black' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {language === 'th' ? `${typeStrThai} สำหรับขาย` : `${typeStrUpper} FOR SALE`}
                {activeListTab === 'SALE' && (
                  <div className="absolute bottom-[-1px] left-0 right-0 flex justify-center">
                    <div className="w-full h-[2.5px] bg-[#ff5a2c] relative">
                      <div className="absolute left-1/2 transform -translate-x-1/2 -top-0.5 w-1.5 h-1.5 rounded-full bg-[#ff5a2c] ring-1 ring-white" />
                    </div>
                  </div>
                )}
              </button>
              <button
                onClick={() => { setActiveListTab('RENT'); setCurrentPage(1); }}
                className={`text-sm font-extrabold uppercase tracking-widest pb-3.5 transition-all relative cursor-pointer ${activeListTab === 'RENT' ? 'text-gray-800 font-black' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {language === 'th' ? `${typeStrThai} สำหรับเช่า` : `${typeStrUpper} FOR RENT`}
                {activeListTab === 'RENT' && (
                  <div className="absolute bottom-[-1px] left-0 right-0 flex justify-center">
                    <div className="w-full h-[2.5px] bg-[#ff5a2c] relative">
                      <div className="absolute left-1/2 transform -translate-x-1/2 -top-0.5 w-1.5 h-1.5 rounded-full bg-[#ff5a2c] ring-1 ring-white" />
                    </div>
                  </div>
                )}
              </button>
            </div>

            {/* Search input (Right side) */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder={language === 'th' ? 'ค้นหาโครงการ, ทำเล, สถานี...' : 'Search project, location, station...'}
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orangePalette-200 text-gray-700 placeholder-gray-400 transition-all shadow-inner"
              />
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Grid Container */}
          {paginatedListings.length === 0 ? (
            <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center text-gray-400">
              <Info className="w-12 h-12 text-orangePalette-200 mx-auto mb-4" />
              <p className="text-lg font-semibold text-gray-700">
                {language === 'th' ? 'ไม่พบรายการที่ค้นหา' : 'No Listings Found'}
              </p>
              <p className="text-sm mt-1 text-gray-500">
                {language === 'th' ? 'กรุณาลองเปลี่ยนคำค้นหาหรือเลือกแท็บอื่น' : 'Try modifying your search or switching tabs.'}
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedListings.map((prop) => {
                  const isSaleHovered = activeListTab === 'SALE' && hoveredCardId === prop.id;
                  const isRentHovered = activeListTab === 'RENT' && hoveredCardId === prop.id;

                  return (
                    <div
                      key={prop.id}
                      onClick={() => window.open(`/project/${encodeURIComponent(prop.name)}`, '_blank')}
                      onMouseEnter={() => setHoveredCardId(prop.id)}
                      onMouseLeave={() => setHoveredCardId(null)}
                      className="bg-white rounded-2xl overflow-hidden flex flex-col h-full border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
                    >
                      {/* Image */}
                      <div className="relative h-56 w-full overflow-hidden bg-gray-200">
                        <img
                          src={prop.imageUrl}
                          alt={prop.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80'; }}
                        />

                        {/* Top-left Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                          {prop.virtualTour && (
                            <span className="bg-red-600 text-white text-[9px] font-black px-2.5 py-1 uppercase tracking-wider shadow-md flex items-center gap-1 rounded">
                              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                              360° VIRTUAL TOUR
                            </span>
                          )}
                          <span className="bg-[#ff5a2c] text-white text-[9px] font-bold px-2.5 py-1 uppercase tracking-wider shadow-sm rounded">
                            {prop.tag}
                          </span>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="p-5 flex-grow flex flex-col justify-between">
                        <div className="text-center space-y-3">
                          {/* Header details split by a thin line with a center dot */}
                          <div className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">
                            {prop.type.toUpperCase()} &bull; {prop.district} &bull; {prop.province}
                          </div>

                          <div className="w-full h-px bg-gray-200 relative my-2">
                            <div className="absolute left-1/2 transform -translate-x-1/2 -top-0.5 w-1 h-1 bg-gray-400 rounded-full" />
                          </div>

                          {/* Bold title */}
                          <h3 className="font-extrabold text-lg text-gray-800 tracking-tight line-clamp-1 group-hover:text-[#ff5a2c] transition-colors">
                            {prop.name}
                          </h3>

                          {/* Nearest transit distance */}
                          <div className="flex items-center justify-center space-x-1 text-[11px] text-gray-500 pt-0.5">
                            <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                            <span>{prop.distance1 || prop.station}</span>
                          </div>
                        </div>

                        {/* Pricing blocks & specs */}
                        <div className="mt-5 space-y-4">
                          {/* Prices Blocks */}
                          <div className="space-y-1.5">
                            {/* FOR SALE */}
                            {prop.priceBuy > 0 && (
                              <div
                                className={`flex items-center text-white px-3.5 py-2 shadow-sm rounded-lg transition-colors duration-300 ${isSaleHovered ? 'bg-[#ff5a2c]' : 'bg-[#9ea8b3]'}`}
                              >
                                <span className="text-[10px] font-extrabold w-1/3 tracking-widest">FOR SALE</span>
                                <span className="text-sm font-bold w-2/3 text-right font-mono">
                                  ฿ {new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(prop.priceBuy)}
                                </span>
                              </div>
                            )}

                            {/* FOR RENT */}
                            {prop.priceRent > 0 && (
                              <div
                                className={`flex items-center text-white px-3.5 py-2 shadow-sm rounded-lg transition-colors duration-300 ${isRentHovered ? 'bg-[#ff5a2c]' : 'bg-[#9ea8b3]'}`}
                              >
                                <span className="text-[10px] font-extrabold w-1/3 tracking-widest">FOR RENT</span>
                                <span className="text-sm font-bold w-2/3 text-right font-mono">
                                  ฿ {new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(prop.priceRent)} <span className="text-[10px] font-normal">/ mo</span>
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Specs row showing bed, bath, and sqm with red icons */}
                          <div className="flex items-center justify-between text-xs text-gray-500 font-semibold border-t border-gray-100 pt-3.5">
                            <div className="flex items-center space-x-1.5">
                              <BedDouble className="w-4 h-4 text-[#ff5a2c]" />
                              <span>{prop.bedrooms} {language === 'th' ? 'นอน' : 'Bed'}</span>
                            </div>
                            <div className="flex items-center space-x-1.5">
                              <Bath className="w-4 h-4 text-[#ff5a2c]" />
                              <span>{Math.max(1, prop.bedrooms)} {language === 'th' ? 'น้ำ' : 'Bath'}</span>
                            </div>
                            <div className="flex items-center space-x-1.5">
                              <Square className="w-4 h-4 text-[#ff5a2c]" />
                              <span>{prop.size} {language === 'th' ? 'ตร.ม.' : 'sqm'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination controls */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-10 pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-500 font-medium">
                  {language === 'th' ? (
                    <>แสดง <span className="font-semibold text-gray-800">{totalEntries > 0 ? startIndex + 1 : 0}</span> ถึง <span className="font-semibold text-gray-800">{endIndex}</span> จาก <span className="font-semibold text-gray-800">{totalEntries}</span> รายการ</>
                  ) : (
                    <>Showing <span className="font-semibold text-gray-800">{totalEntries > 0 ? startIndex + 1 : 0}</span> to <span className="font-semibold text-gray-800">{endIndex}</span> of <span className="font-semibold text-gray-800">{totalEntries}</span> entries</>
                  )}
                </div>

                {totalPages > 1 && (
                  <div className="flex items-center space-x-1.5">
                    {/* Prev button */}
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="w-9 h-9 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 flex items-center justify-center disabled:opacity-40 disabled:hover:bg-white transition-all cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    {/* Page numbers */}
                    {Array.from({ length: totalPages }).map((_, idx) => {
                      const pageNum = idx + 1;
                      const isActive = currentPage === pageNum;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`w-9 h-9 rounded-lg font-bold text-sm transition-all cursor-pointer flex items-center justify-center ${isActive ? 'bg-[#ff5a2c] text-white shadow-sm' : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'}`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    {/* Next button */}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="w-9 h-9 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 flex items-center justify-center disabled:opacity-40 disabled:hover:bg-white transition-all cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      

      {/* 10. LUXURY FOOTER */}
      <footer className="bg-[#052b37] text-white pt-16 pb-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 w-full grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1 */}
          <div className="space-y-4">
            <a href="/" className="flex items-center">
              <img
                src="https://res.cloudinary.com/dvv3wvgnt/image/upload/v1779681125/svlogo_tzfhad.webp"
                alt="STAYVERSE Logo"
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </a>
            <p className="text-xs text-grayPalette-100 leading-relaxed whitespace-pre-line">
              {footerTranslations[language]?.platformDesc}
            </p>
            <p className="text-[11px] text-grayPalette-100 leading-relaxed pt-1">
              {footerTranslations[language]?.verifiedBy}
            </p>
            <div className="pt-1">
              <button className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-md text-[11px] font-semibold flex items-center gap-2 border border-white/10 transition-all cursor-pointer">
                <Shield className="w-3.5 h-3.5 text-blue-400" />
                All ID Global
              </button>
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-orangePalette-200">{footerTranslations[language]?.browse}</h4>
            <div className="flex flex-col space-y-3 text-xs text-grayPalette-100 font-medium">
              <a href="#" className="hover:text-orangePalette-200 transition-all">{footerTranslations[language]?.rentToOwn}</a>
              <a href="#" className="hover:text-orangePalette-200 transition-all">{footerTranslations[language]?.justRent}</a>
              <a href="#" className="hover:text-orangePalette-200 transition-all">{footerTranslations[language]?.investorsChoice}</a>
              <a href="#" className="hover:text-orangePalette-200 transition-all">{footerTranslations[language]?.mapSearch}</a>
              <a href="#" className="hover:text-orangePalette-200 transition-all">{footerTranslations[language]?.searchByDeveloper}</a>
            </div>
          </div>

          {/* Col 3 */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-orangePalette-200">{footerTranslations[language]?.forOwners}</h4>
            <div className="flex flex-col space-y-3 text-xs text-grayPalette-100 font-medium">
              <a href="#" className="hover:text-orangePalette-200 transition-all">{footerTranslations[language]?.listProperty}</a>
              <a href="#" className="hover:text-orangePalette-200 transition-all">{footerTranslations[language]?.developerPortal}</a>
              <a href="#" className="hover:text-orangePalette-200 transition-all">{footerTranslations[language]?.pricingPackages}</a>
              <a href="#" className="hover:text-orangePalette-200 transition-all">{footerTranslations[language]?.livingServices}</a>
              <a href="/affiliate" className="hover:text-orangePalette-200 transition-all">{footerTranslations[language]?.affiliateProgram}</a>
            </div>
          </div>

          {/* Col 4 */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-orangePalette-200">{footerTranslations[language]?.company}</h4>
            <div className="flex flex-col space-y-3 text-xs text-grayPalette-100 font-medium">
              <a href="#" className="hover:text-orangePalette-200 transition-all">{footerTranslations[language]?.myHome}</a>
              <a href="#" className="hover:text-orangePalette-200 transition-all">{footerTranslations[language]?.aboutStayVerse}</a>
              <a href="#" className="hover:text-orangePalette-200 transition-all">{footerTranslations[language]?.contactUs}</a>
              <a href="#" className="hover:text-orangePalette-200 transition-all">{footerTranslations[language]?.termsAndConditions}</a>
              <a href="#" className="hover:text-orangePalette-200 transition-all">{footerTranslations[language]?.privacyPolicy}</a>
            </div>
          </div>

        </div>

        {/* Affiliate Banner */}
        <div className="max-w-7xl mx-auto px-4 w-full mb-12">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
              <div className="text-[10px] font-bold tracking-widest uppercase text-gray-400">{footerTranslations[language]?.affBannerTitle}</div>
              <h3 className="text-white font-bold text-base md:text-lg">{footerTranslations[language]?.affBannerHeadline}</h3>
              <p className="text-[11px] text-gray-400">{footerTranslations[language]?.affBannerSub}</p>
            </div>
            <a href="/affiliate" className="shrink-0 px-5 py-2.5 bg-transparent border border-white/20 hover:border-white hover:bg-white/10 text-white rounded-lg text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer">
              {footerTranslations[language]?.applyAffiliate}
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 w-full pt-8 border-t border-white/5 flex flex-wrap justify-between items-center gap-4 text-xs text-grayPalette-200">
          <p>{t.rightsReserved}</p>
        </div>
      </footer>
    </div>
  );
}
