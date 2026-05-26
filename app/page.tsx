'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation, Language } from '@/context/LanguageContext';
import {
  Phone, Mail, Globe, Menu, X, ChevronDown, ChevronLeft, ChevronRight, Search, ArrowRight,
  MapPin, BedDouble, Square, ShieldCheck, Heart, Percent, Calculator,
  TrendingUp, Landmark, Star, ExternalLink, HelpCircle, Share2
} from 'lucide-react';
import { locationData } from '@/utils/mockLocationData';
import { mockProperties } from '@/utils/mockProperties';
import { motion, AnimatePresence } from 'framer-motion';

// Luxury Promotion Slides
const bannerSlides = [
  {
    id: 1,
    title: 'Culture Chula',
    subtitle: 'Co-Living Concept near Chulalongkorn University',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80',
    link: '#',
  },
  {
    id: 2,
    title: 'The Residences 38',
    subtitle: 'Ultra-Luxury Living in the Heart of Sukhumvit',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80',
    link: '#',
  },
  {
    id: 3,
    title: 'Ashton Asoke-Rama 9',
    subtitle: 'Premium Condominium with Panoramic Skyline Views',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80',
    link: '#',
  },
  {
    id: 4,
    title: 'Culture Thonglor',
    subtitle: 'Co-create Your Lifestyle in Bangkok’s Most Vibrant Area',
    imageUrl: 'https://images.unsplash.com/photo-1600607687931-cebf12f45cc3?w=1600&q=80',
    link: '#',
  },
  {
    id: 5,
    title: 'COCO PARC',
    subtitle: 'Urban Luxury Retreat with direct Park Views',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80',
    link: '#',
  },
  {
    id: 6,
    title: 'Ideo Sukhumvit-Rama 4',
    subtitle: 'High Rise Living connected to dual transit lines',
    imageUrl: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1600&q=80',
    link: '#',
  },
  {
    id: 7,
    title: 'The Lumpini 24',
    subtitle: 'Exclusive Family Residence in Sukhumvit 24',
    imageUrl: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80',
    link: '#',
  },
  {
    id: 8,
    title: 'Premium Pool Villa Thonglor',
    subtitle: 'Ultra-Luxury Private Villa in Thonglor Center',
    imageUrl: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1600&q=80',
    link: '#',
  },
  {
    id: 9,
    title: 'Nantawan Rama 9',
    subtitle: 'Spacious Luxury House on New Krungthep Kreetha',
    imageUrl: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1600&q=80',
    link: '#',
  },
  {
    id: 10,
    title: 'Saladaeng One',
    subtitle: 'Super Luxury Condominium overlooking Lumpini Park',
    imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1600&q=80',
    link: '#',
  }
];

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

const topHeaderTranslations: Record<Language, Record<string, string>> = {
  th: { search: 'ค้นหา...', listProp: 'ลงประกาศ', sub: 'สมัครสมาชิก', myHome: 'หน้าหลัก', login: 'เข้าสู่ระบบ' },
  en: { search: 'Search...', listProp: 'List Property', sub: 'Subscription', myHome: 'My Home', login: 'Log in' },
  ru: { search: 'Поиск...', listProp: 'Добавить объект', sub: 'Подписка', myHome: 'Мой профиль', login: 'Войти' },
  zh: { search: '搜索...', listProp: '发布房源', sub: '订阅服务', myHome: '我的主页', login: '登录' },
  ja: { search: '検索...', listProp: '物件を掲載', sub: 'サブスクリプション', myHome: 'マイホーム', login: 'ログイン' },
  ko: { search: '검색...', listProp: '매물 등록', sub: '구독', myHome: '마이 홈', login: '로그인' }
};

const mainMenuTranslations: Record<Language, Record<string, string>> = {
  th: {
    home: 'หน้าแรก',
    rentToOwn: 'เช่าออมห้อง',
    monthlyRent: 'เช่าสบายจ่ายรายเดือน',
    sellWithTenant: 'ขายพร้อมผู้เช่า'
  },
  en: {
    home: 'Home',
    rentToOwn: 'Rent to Own',
    monthlyRent: 'Monthly Rent',
    sellWithTenant: 'Sell with Tenant'
  },
  ru: {
    home: 'Главная',
    rentToOwn: 'Аренда с выкупом',
    monthlyRent: 'Аренда на месяц',
    sellWithTenant: 'Продажа с арендатором'
  },
  zh: {
    home: '首页',
    rentToOwn: '租房存款',
    monthlyRent: '舒适月租',
    sellWithTenant: '带租客出售'
  },
  ja: {
    home: 'ホーム',
    rentToOwn: '賃貸からの購入',
    monthlyRent: '月額賃貸',
    sellWithTenant: 'オーナーチェンジ物件'
  },
  ko: {
    home: '홈',
    rentToOwn: '임대 후 구매',
    monthlyRent: '월세 임대',
    sellWithTenant: '세입자 안고 매매'
  }
};

const whyChooseUsTranslations: Record<Language, Record<string, string>> = {
  th: {
    t1: 'คัดสรรโครงการคุณภาพ',
    d1: 'เราตรวจสอบคอนโดมิเนียม ที่อยู่อาศัย และโฉนดที่ดินทั้งหมดล่วงหน้า เพื่อให้แน่ใจว่าถูกต้องตามกฎหมายและคุ้มค่าแก่การลงทุนก่อนนำมาลงประกาศ',
    t2: 'ผู้เชี่ยวชาญทำเลรถไฟฟ้า',
    d2: 'เชี่ยวชาญพิเศษเฉพาะอสังหาริมทรัพย์ตามแนวรถไฟฟ้าในกรุงเทพฯ (BTS และ MRT) เพื่อความสะดวกสบายขั้นสุดของคุณ',
    t3: 'ดูแลครบวงจร',
    d3: 'ตั้งแต่การค้นหาเริ่มต้นและการจัดหาเงินทุน ไปจนถึงการจัดการผู้เช่าและการจดทะเบียนโอนกรรมสิทธิ์ ผู้เชี่ยวชาญของเราจะดูแลคุณในทุกขั้นตอน'
  },
  en: {
    t1: 'Curated Portfolios',
    d1: 'We pre-vet all condominiums, residential properties, and land titles to ensure legal clearances and investment feasibility before listing.',
    t2: 'Transit Linkage Experts',
    d2: 'Specializing exclusively in properties along Bangkok’s transit lines (BTS Skytrain and MRT Underground) for ultimate convenience.',
    t3: 'Comprehensive Care',
    d3: 'From initial search and property financing to tenancy management and transfer registration, our experts manage every single step.'
  },
  ru: {
    t1: 'Отобранные портфолио',
    d1: 'Мы предварительно проверяем все кондоминиумы и земельные участки на юридическую чистоту и инвестиционную привлекательность.',
    t2: 'Эксперты по недвижимости у метро',
    d2: 'Специализируемся исключительно на объектах вдоль линий метро Бангкока (BTS и MRT) для вашего максимального удобства.',
    t3: 'Комплексное обслуживание',
    d3: 'От первоначального поиска до управления арендой и регистрации перевода прав собственности - наши эксперты контролируют каждый шаг.'
  },
  zh: {
    t1: '精选房源',
    d1: '我们在挂牌前会预先审查所有公寓、住宅及土地产权，确保法律合规及投资可行性。',
    t2: '轨道交通房产专家',
    d2: '专门致力于曼谷轨道交通（BTS 轻轨和 MRT 地铁）沿线房产，为您提供极致便利。',
    t3: '全方位贴心服务',
    d3: '从初步搜索、房产融资，到租务管理和过户登记，我们的专家为您打理每一个环节。'
  },
  ja: {
    t1: '厳選されたポートフォリオ',
    d1: 'リスティング前にすべてのコンドミニアム、住宅、土地の権利を事前審査し、法的な問題がないか確認します。',
    t2: '駅近物件のエキスパート',
    d2: '最高の利便性を提供するため、バンコクの交通機関（BTSおよびMRT）沿線の物件に特化しています。',
    t3: '包括的なサポート',
    d3: '物件探しや資金調達から、賃貸管理や名義変更の手続きまで、専門家がすべてのステップをサポートします。'
  },
  ko: {
    t1: '엄선된 포트폴리오',
    d1: '매물 등록 전 모든 콘도, 주거용 부동산 및 토지 소유권을 사전 검토하여 법적 문제와 투자 타당성을 확인합니다.',
    t2: '역세권 부동산 전문가',
    d2: '최고의 편의성을 위해 방콕 대중교통(BTS 및 MRT) 노선 주변의 부동산만을 전문으로 다룹니다.',
    t3: '종합적인 관리 서비스',
    d3: '초기 검색 및 자금 조달부터 임대 관리 및 명의 이전 등록까지, 전문가가 모든 단계를 관리합니다.'
  }
};

const searchEngineTranslations: Record<Language, Record<string, string>> = {
  th: {
    brandLabel: 'แบรนด์โครงการ',
    allBrands: 'ทุกแบรนด์',
    transitLabel: 'รถไฟฟ้า BTS/MRT',
    allLines: 'ทุกสาย',
    stationLabel: 'สถานี',
    allStations: 'ทุกสถานี',
    provinceLabel: 'จังหวัด',
    allProvinces: 'ทุกจังหวัด',
    districtLabel: 'อำเภอ / เขต',
    allDistricts: 'ทุกอำเภอ/เขต',
    subDistrictLabel: 'ตำบล / แขวง',
    allSubDistricts: 'ทุกตำบล/แขวง'
  },
  en: {
    brandLabel: 'Project Brand',
    allBrands: 'All brands',
    transitLabel: 'BTS/MRT Line',
    allLines: 'All lines',
    stationLabel: 'Station',
    allStations: 'All stations',
    provinceLabel: 'Province',
    allProvinces: 'All provinces',
    districtLabel: 'District',
    allDistricts: 'All districts',
    subDistrictLabel: 'Sub-district',
    allSubDistricts: 'All sub-districts'
  },
  ru: {
    brandLabel: 'Бренд проекта',
    allBrands: 'Все бренды',
    transitLabel: 'Линия BTS/MRT',
    allLines: 'Все линии',
    stationLabel: 'Станция',
    allStations: 'Все станции',
    provinceLabel: 'Провинция',
    allProvinces: 'Все провинции',
    districtLabel: 'Район',
    allDistricts: 'Все районы',
    subDistrictLabel: 'Под-район',
    allSubDistricts: 'Все под-районы'
  },
  zh: {
    brandLabel: '项目品牌',
    allBrands: '所有品牌',
    transitLabel: 'BTS/MRT 线路',
    allLines: '所有线路',
    stationLabel: '车站',
    allStations: '所有车站',
    provinceLabel: '省份',
    allProvinces: '所有省份',
    districtLabel: '区/县',
    allDistricts: '所有区/县',
    subDistrictLabel: '街道/镇',
    allSubDistricts: '所有街道/镇'
  },
  ja: {
    brandLabel: 'プロジェクトブランド',
    allBrands: 'すべてのブランド',
    transitLabel: 'BTS/MRT路線',
    allLines: 'すべての路線',
    stationLabel: '駅',
    allStations: 'すべての駅',
    provinceLabel: '県',
    allProvinces: 'すべての県',
    districtLabel: '区/郡',
    allDistricts: 'すべての区/郡',
    subDistrictLabel: '町/地区',
    allSubDistricts: 'すべての町/地区'
  },
  ko: {
    brandLabel: '프로젝트 브랜드',
    allBrands: '모든 브랜드',
    transitLabel: 'BTS/MRT 노선',
    allLines: '모든 노선',
    stationLabel: '역',
    allStations: '모든 역',
    provinceLabel: '도',
    allProvinces: '모든 도',
    districtLabel: '구/군',
    allDistricts: '모든 구/군',
    subDistrictLabel: '동/면',
    allSubDistricts: '모든 동/면'
  }
};

const highlightTranslations: Record<Language, Record<string, string>> = {
  th: {
    title: 'โครงการไฮไลท์',
    subtitle: 'แสดง {count} โครงการคุณภาพที่ตรงกับไลฟ์สไตล์ของคุณ',
    noFound: 'ไม่พบโครงการ',
    tryReset: 'ลองรีเซ็ตหรือปรับเปลี่ยนพารามิเตอร์การค้นหาของคุณ'
  },
  en: {
    title: 'Highlight Projects',
    subtitle: 'Showing {count} handpicked residences matching your lifestyle',
    noFound: 'No Properties Found',
    tryReset: 'Try resetting or modifying your search parameters.'
  },
  ru: {
    title: 'Избранные проекты',
    subtitle: 'Показано {count} отборных резиденций, подходящих под ваш стиль жизни',
    noFound: 'Объекты не найдены',
    tryReset: 'Попробуйте сбросить или изменить параметры поиска.'
  },
  zh: {
    title: '精选项目',
    subtitle: '显示 {count} 个符合您生活方式的精选住宅',
    noFound: '未找到房源',
    tryReset: '尝试重置或修改您的搜索参数。'
  },
  ja: {
    title: 'ハイライトプロジェクト',
    subtitle: 'あなたのライフスタイルに合う厳選された{count}件の住宅を表示中',
    noFound: '物件が見つかりません',
    tryReset: '検索パラメータをリセットまたは変更してみてください。'
  },
  ko: {
    title: '추천 프로젝트',
    subtitle: '귀하의 라이프스타일에 맞는 {count}개의 엄선된 레지던스를 표시합니다.',
    noFound: '매물을 찾을 수 없습니다',
    tryReset: '검색 매개변수를 재설정하거나 수정해 보세요.'
  }
};

const sectionTitleTranslations: Record<Language, Record<string, string>> = {
  th: {
    videoTitle: 'วิดีโอโครงการ',
    recommendTitle: 'โครงการแนะนำ',
    insightTitle: 'อัปเดตเทรนด์การอยู่อาศัยและการลงทุน',
    guideTitle: 'แนะนำและสาระน่ารู้เกี่ยวกับอสังหาริมทรัพย์',
    reviewSubtitle: 'ความเห็นจากลูกค้า',
    reviewTitle: 'รีวิวจากลูกค้า'
  },
  en: {
    videoTitle: 'Project Video',
    recommendTitle: 'Recommended Projects',
    insightTitle: 'Urban Living & Real Estate Insights',
    guideTitle: 'Real Estate Guides & Insights',
    reviewSubtitle: 'Client Feedback',
    reviewTitle: 'Client Feedback'
  },
  ru: {
    videoTitle: 'Видео проекта',
    recommendTitle: 'Рекомендуемые проекты',
    insightTitle: 'Тенденции городской жизни и недвижимости',
    guideTitle: 'Руководства и обзоры по недвижимости',
    reviewSubtitle: 'Мнение клиентов',
    reviewTitle: 'Отзывы клиентов'
  },
  zh: {
    videoTitle: '项目视频',
    recommendTitle: '推荐项目',
    insightTitle: '城市生活和房地产见解',
    guideTitle: '房地产指南和见解',
    reviewSubtitle: '客户意见',
    reviewTitle: '客户反馈'
  },
  ja: {
    videoTitle: 'プロジェクトビデオ',
    recommendTitle: 'おすすめのプロジェクト',
    insightTitle: '都市生活と不動産のインサイト',
    guideTitle: '不動産ガイドとインサイト',
    reviewSubtitle: 'クライアントのフィードバック',
    reviewTitle: 'お客様の声'
  },
  ko: {
    videoTitle: '프로젝트 비디오',
    recommendTitle: '추천 프로젝트',
    insightTitle: '도시 생활 및 부동산 인사이트',
    guideTitle: '부동산 가이드 및 인사이트',
    reviewSubtitle: '고객 피드백',
    reviewTitle: '고객 리뷰'
  }
};

const contactFormTranslations: Record<Language, Record<string, string>> = {
  th: {
    title: 'ติดต่อตัวแทน STAYVERSE',
    subtitle: 'ฝากข้อมูลติดต่อของคุณและที่ปรึกษาด้านอสังหาริมทรัพย์ระดับลักชัวรีของเราจะติดต่อกลับภายใน 2 ชั่วโมง',
    fullName: 'ชื่อ - นามสกุล',
    phone: 'เบอร์โทรศัพท์',
    email: 'อีเมล',
    message: 'ข้อความ / รายละเอียดที่สนใจ',
    placeholder: 'โปรดระบุ: โครงการที่สนใจ ช่วงงบประมาณ เช่าหรือซื้อ...',
    submitBtn: 'ส่งข้อความ'
  },
  en: {
    title: 'Contact Stayverse Advisors',
    subtitle: 'Leave your contact details and our luxury property consultants will get back to you within 2 hours.',
    fullName: 'Full Name',
    phone: 'Phone Number',
    email: 'Email Address',
    message: 'Message / Interest details',
    placeholder: 'Please specify: Project of interest, budget range, renting or buying...',
    submitBtn: 'Submit Enquiry'
  },
  ru: {
    title: 'Свяжитесь с консультантами Stayverse',
    subtitle: 'Оставьте свои контактные данные, и наши консультанты по элитной недвижимости свяжутся с вами в течение 2 часов.',
    fullName: 'Полное имя',
    phone: 'Номер телефона',
    email: 'Адрес электронной почты',
    message: 'Сообщение / Детали интереса',
    placeholder: 'Пожалуйста, укажите: интересующий проект, бюджет, аренда или покупка...',
    submitBtn: 'Отправить запрос'
  },
  zh: {
    title: '联系 Stayverse 顾问',
    subtitle: '留下您的联系方式，我们的豪宅顾问将在 2 小时内给您回复。',
    fullName: '姓名',
    phone: '电话号码',
    email: '电子邮件地址',
    message: '信息 / 兴趣详情',
    placeholder: '请说明：感兴趣的项目、预算范围、租赁或购买...',
    submitBtn: '提交查询'
  },
  ja: {
    title: 'Stayverseアドバイザーに連絡',
    subtitle: '連絡先を残していただければ、当社の高級不動産コンサルタントが2時間以内にご連絡いたします。',
    fullName: '氏名',
    phone: '電話番号',
    email: 'メールアドレス',
    message: 'メッセージ / 詳細',
    placeholder: '興味のあるプロジェクト、予算範囲、賃貸か購入かなどを指定してください...',
    submitBtn: 'お問い合わせを送信'
  },
  ko: {
    title: 'Stayverse 어드바이저 문의',
    subtitle: '연락처를 남겨주시면 럭셔리 부동산 컨설턴트가 2시간 이내에 연락드리겠습니다.',
    fullName: '성명',
    phone: '전화번호',
    email: '이메일 주소',
    message: '메시지 / 관심 세부 정보',
    placeholder: '관심 프로젝트, 예산 범위, 임대 또는 구매 여부를 명시해 주세요...',
    submitBtn: '문의 제출하기'
  }
};

const transitData: Record<string, string[]> = {
  "BTS สายสีเขียวอ่อน (สายสุขุมวิท) | Light Green Line": [
    "คูคต (Khu Khot)", "แยก คปอ. (Yaek Kor Por Aor)", "พิพิธภัณฑ์กองทัพอากาศ (Royal Thai Air Force Museum)",
    "โรงพยาบาลภูมิพลอดุลยเดช (Bhumibol Adulyadej Hospital)", "สะพานใหม่ (Saphan Mai)", "สายหยุด (Sai Yud)",
    "พหลโยธิน 59 (Phahon Yothin 59)", "วัดพระศรีมหาธาตุ (Wat Phra Sri Mahathat)", "กรมทหารราบที่ 11 (11th Infantry Regiment)",
    "บางบัว (Bang Bua)", "กรมป่าไม้ (Royal Forest Department)", "มหาวิทยาลัยเกษตรศาสตร์ (Kasetsart University)",
    "เสนานิคม (Sena Nikhom)", "รัชโยธิน (Ratchayothin)", "พหลโยธิน 24 (Phahon Yothin 24)", "ห้าแยกลาดพร้าว (Ha Yaek Lat Phrao)",
    "หมอชิต (Mo Chit)", "สะพานควาย (Saphan Khwai)", "อารีย์ (Ari)", "สนามเป้า (Sanam Pao)", "อนุสาวรีย์ชัยสมรภูมิ (Victory Monument)",
    "พญาไท (Phaya Thai)", "ราชเทวี (Ratchathewi)", "สยาม (Siam)", "ชิดลม (Chit Lom)", "เพลินจิต (Phloen Chit)", "นานา (Nana)",
    "อโศก (Asok)", "พร้อมพงษ์ (Phrom Phong)", "ทองหล่อ (Thong Lo)", "เอกมัย (Ekkamai)", "พระโขนง (Phra Khanong)",
    "อ่อนนุช (On Nut)", "บางจาก (Bang Chak)", "ปุณณวิถี (Punnawithi)", "อุดมสุข (Udom Suk)", "บางนา (Bang Na)",
    "แบริ่ง (Bearing)", "สำโรง (Samrong)", "ปู่เจ้า (Pu Chao)", "ช้างเอราวัณ (Chang Erawan)", "โรงเรียนนายเรือ (Naval Academy)",
    "ปากน้ำ (Pak Nam)", "ศรีนครินทร์ (Srinakarin)", "แพรกษา (Phraek Sa)", "สายลวด (Sai Luat)", "เคหะฯ (Kheha)",
    "เมืองโบราณ (Ancient City)", "บางปู (Bang Pu)", "ตำหรุ (Tamru)"
  ],
  "BTS สีเขียวเข้ม (สายสีลม) | Green Line (Silom Line)": [
    "สนามกีฬาแห่งชาติ (National Stadium)", "สยาม (Siam)", "ราชดำริ (Ratchadamri)", "ศาลาแดง (Sala Daeng)",
    "ช่องนนทรี (Chong Nonsi)", "เซนต์หลุยส์ (Saint Louis)", "สุรศักดิ์ (Surasak)", "สะพานตากสิน (Saphan Taksin)",
    "กรุงธนบุรี (Krung Thon Buri)", "วงเวียนใหญ่ (Wongwian Yai)", "โพธิ์นิมิตร (Pho Nimit)", "ตลาดพลู (Talat Phlu)",
    "วุฒากาศ (Wutthakat)", "บางหว้า (Bang Wa)"
  ],
  "MRT สายสีน้ำเงิน | Blue Line": [
    "ท่าพระ (Tha Phra)", "จรัญฯ 13 (Charan 13)", "ไฟฉาย (Fai Chai)", "บางขุนนนท์ (Bang Khun Non)", "บางยี่ขัน (Bang Yi Khan)",
    "สิรินธร (Sirindhorn)", "บางพลัด (Bang Phlat)", "บางอ้อ (Bang O)", "บางโพ (Bang Pho)", "เตาปูน (Tao Poon)",
    "บางซื่อ (Bang Sue)", "กำแพงเพชร (Kamphaeng Phet)", "สวนจตุจักร (Chatuchak Park)", "พหลโยธิน (Phahon Yothin)",
    "ลาดพร้าว (Lat Phrao)", "รัชดาภิเษก (Ratchadaphisek)", "สุทธิสาร (Sutthisan)", "ห้วยขวาง (Huai Khwang)",
    "ศูนย์วัฒนธรรมแห่งประเทศไทย (Thailand Cultural Centre)", "พระราม 9 (Phra Ram 9)", "เพชรบุรี (Phetchaburi)",
    "สุขุมวิท (Sukhumvit)", "ศูนย์การประชุมแห่งชาติสิริกิติ์ (Queen Sirikit National Convention Centre)",
    "คลองเตย (Khlong Toei)", "ลุมพินี (Lumphini)", "สีลม (Si Lom)", "สามย่าน (Sam Yan)", "หัวลำโพง (Hua Lamphong)",
    "วัดมังกร (Wat Mangkon)", "สามยอด (Sam Yot)", "สนามไชย (Sanam Chai)", "อิสรภาพ (Itsaraphap)",
    "พาณิชยการธนบุรี (Phanitsayakarn Thonburi)", "บางไผ่ (Bang Phai)",
    "บางหว้า (Bang Wa)", "เพชรเกษม 48 (Phetkasem 48)", "ภาษีเจริญ (Phasi Charoen)", "บางแค (Bang Kae)",
    "หลักสอง (Lak Song)", "พุทธมณฑล สาย 2 (Phutthamonthon Sai 2)", "พุทธมณฑล สาย 3 (Phutthamonthon Sai 3)",
    "พุทธมณฑล สาย 4 (Phutthamonthon Sai 4)"
  ],
  "MRT สายสีม่วง | Purple Line": [
    "คลองบางไผ่ (Khlong Bang Phai)", "ตลาดบางใหญ่ (Talad Bang Yai)", "สามแยกบางใหญ่ (Sam Yaek Bang Yai)",
    "บางพลู (Bang Phlu)", "บางรักใหญ่ (Bang Rak Yai)", "บางรักน้อยท่าอิฐ (Bang Rak Noi Tha It)", "ไทรม้า (Sai Ma)",
    "สะพานพระนั่งเกล้า (Phra Nang Klao Bridge)", "แยกนนทบุรี 1 (Yaek Nonthaburi 1)", "บางกระสอ (Bang Krasor)",
    "ศูนย์ราชการนนทบุรี (Nonthaburi Civic Center)", "กระทรวงสาธารณสุข (Ministry of Public Health)",
    "แยกติวานนท์ (Yaek Tiwanon)", "วงศ์สว่าง (Wong Sawang)", "บางซ่อน (Bang Son)", "เตาปูน (Tao Poon)",
    "รัฐสภา (Parliament House)", "ศรีย่าน (Sri Yan)", "วชิรพยาบาล (Vajira Hospital)", "หอสมุดแห่งชาติ (National Library)",
    "บางขุนพรหม (Bang Khun Phrom)", "ผ่านฟ้า (Phan Fa)", "สามยอด (Sam Yot)", "สะพานพุทธ (Memorial Bridge)",
    "วงเวียนใหญ่ (Wongwian Yai)", "สำเหร่ (Samre)", "ดาวคะนอง (Dao Khanong)", "บางปะแก้ว (Bang Pakaeo)",
    "บางปะกอก (Bang Pakok)", "แยกประชาอุทิศ (Yaek Pracha Uthit)", "ราษฎร์บูรณะ (Rat Burana)", "พระประแดง (Phra Pradaeng)",
    "ครุใน (Khru Nai)"
  ],
  "MRT สายสีชมพู | Pink Line": [
    "ศูนย์ราชการนนทบุรี (Nonthaburi Civic Center)", "แคราย (Khae Rai)", "สนามบินน้ำ (Sanambin Nam)", "สามัคคี (Samakkhie)",
    "กรมชลประทาน (Royal Irrigation Department)", "แยกปากเกร็ด (Yaek Pak Kret)", "เลี่ยงเมืองปากเกร็ด (Pak Kret Bypass)",
    "แจ้งวัฒนะ-ปากเกร็ด 28 (Chaeng Watthana - Pak Kret 28)", "เมืองทองธานี (Muang Thong Thani)", "ศรีรัช (Si Rat)",
    "แจ้งวัฒนะ 14 (Chaeng Watthana 14)", "ศูนย์ราชการเฉลิมพระเกียรติ (Government Complex)", "โทรคมนาคมแห่งชาติ (National Telecom)",
    "หลักสี่ (Lak Si)", "ราชภัฏพระนคร (Rajabhat Phranakhon)", "วัดพระศรีมหาธาตุ (Wat Phra Sri Mahathat)",
    "รามอินทรา 3 (Ram Inthra 3)", "ลาดปลาเค้า (Lat Pla Khao)", "รามอินทรา กม. 4 (Ram Inthra Kor Mor 4)",
    "มัยลาภ (Maiyalap)", "วัชรพล (Vatcharaphol)", "รามอินทรา กม. 6 (Ram Inthra Kor Mor 6)", "คู้บอน (Khu Bon)",
    "รามอินทรา กม. 9 (Ram Inthra Kor Mor 9)", "วงแหวนรามอินทรา (Outer Ring Road - Ram Inthra)", "นพรัตน์ (Nopparat)",
    "บางชัน (Bang Chan)", "เศรษฐบุตรบำเพ็ญ (Setthabutbamphen)", "ตลาดมีนบุรี (Min Buri Market)", "มีนบุรี (Min Buri)",
    "อิมแพ็คเมืองทองธานี (Impact Muang Thong Thani)", "ทะเลสาบเมืองทองธานี (Muang Thong Thani Lake)"
  ],
  "MRT สายสีเหลือง | Yellow Line": [
    "ลาดพร้าว (Lat Phrao)", "ภาวนา (Phawana)", "โชคชัย 4 (Chok Chai 4)", "ลาดพร้าว 71 (Lat Phrao 71)",
    "ลาดพร้าว 87 (Lat Phrao 87)", "มหาดไทย (Mahat Thai)", "ลาดพร้าว 101 (Lat Phrao 101)", "บางกะปิ (Bang Kapi)",
    "แยกลำสาลี (Yaek Lam Sali)", "ศรีกรีฑา (Si Kritha)", "พัฒนาการ (Phatthanakan)", "กลันตัน (Kalantan)",
    "ศรีนุช (Si Nut)", "ศรีนครินทร์ 38 (Srinagarindra 38)", "สวนหลวง ร.9 (Suan Luang Rama IX)", "ศรีอุดม (Si Udom)",
    "ศรีเอี่ยม (Si Iam)", "ศรีลาซาล (Si La Salle)", "ศรีแบริ่ง (Si Bearing)", "ศรีด่าน (Si Dan)", "ศรีเทพา (Si Thepha)",
    "ทิพวัล (Thipphawan)", "สำโรง (Samrong)"
  ],
  "SRT สายสีแดง | Red Line Commuter Train": [
    "กรุงเทพอภิวัฒน์ (Krung Thep Aphiwat)", "จตุจักร (Chatuchak)", "วัดเสมียนนารี (Wat Samian Nari)", "บางเขน (Bang Khen)",
    "ทุ่งสองห้อง (Thung Song Hong)", "หลักสี่ (Lak Si)", "การเคหะ (Kan Kheha)", "ดอนเมือง (Don Muang)", "หลักหก (Lak Hok)",
    "รังสิต (Rangsit)", "คลองหนึ่ง (Khlong Neung)", "มหาวิทยาลัยกรุงเทพ-รังสิต (Bangkok University-Rangsit)",
    "เชียงราก (Chiang Rak)", "มหาวิทยาลัยธรรมศาสตร์-รังสิต (Thammasat University-Rangsit)"
  ],
  "SRT สายสีแดงอ่อน - ทิศตะวันตก": [
    "กรุงเทพอภิวัฒน์ (Krung Thep Aphiwat)", "บางซ่อน (Bang Son)", "สะพานพระราม 6 (Rama VI Bridge)",
    "บางกรวย-กฟผ. (Bang Kruai-EGAT)", "บางบำหรุ (Bang Bamru)", "ตลิ่งชัน (Taling Chan)", "บ้านฉิมพลี (Baan Chimpli)",
    "กาญจนาภิเษก (Kanchanaphisek)", "ศาลายา (Salaya)"
  ],
  "ARL แอร์พอร์ต เรล ลิงก์ | Airport Rail Link": [
    "พญาไท (Phaya Thai)", "ราชปรารภ (Ratchaprarop)", "มักกะสัน (Makkasan)", "รามคำแหง (Ramkhamhaeng)", "หัวหมาก (Hua Mak)",
    "บ้านทับช้าง (Ban Thap Chang)", "ลาดกระบัง (Lat Krabang)", "สุวรรณภูมิ (Suvarnabhumi)"
  ],
  "BTS สายสีทอง | Gold Line": [
    "กรุงธนบุรี (Krung Thon Buri)", "เจริญนคร (Charoen Nakhon)", "คลองสาน (Khlong San)", "ประชาธิปก (Prajadhipok)"
  ]
};

const developerBrands = [
  "เอพี ไทยแลนด์ (AP Thailand)",
  "แสนสิริ (Sansiri)",
  "แลนด์ แอนด์ เฮ้าส์ (Land & Houses)",
  "ศุภาลัย (Supalai)",
  "แอสเซทไวส์ (Asset Wise)",
  "ออริจิ้น พร็อพเพอร์ตี้ (Origin Property)",
  "พฤกษา เรียลเอสเตท (Pruksa Real Estate)",
  "เอสซี แอสเซท (SC Asset)",
  "เฟรเซอร์ส พร็อพเพอร์ตี้ ประเทศไทย (Frasers Property Thailand)",
  "สิงห์ เอสเตท (Singha Estate)"
];

const widgetTitles: Record<string, Record<string, string>> = {
  th: {
    title: 'ดีลเด่นแนะนำพิเศษ',
    subtitle: 'รวมโครงการคัดสรรพิเศษ ราคาคุ้มค่าที่สุดในกรุงเทพฯ',
    beds: 'ห้องนอน',
    sqm: 'ตร.ม.',
    buy: 'ขาย',
    rent: 'เช่า',
    viewDetails: 'ดูรายละเอียด'
  },
  en: {
    title: 'Property Spotlight',
    subtitle: 'Curated premium residences with exceptional value',
    beds: 'Beds',
    sqm: 'Sqm',
    buy: 'Buy',
    rent: 'Rent',
    viewDetails: 'View Details'
  },
  ru: {
    title: 'Рекомендуемые предложения',
    subtitle: 'Подобрано специально для вас по выгодной цене',
    beds: 'Спальни',
    sqm: 'кв.м.',
    buy: 'Купить',
    rent: 'Аренда',
    viewDetails: 'Подробнее'
  },
  zh: {
    title: '精选特惠房源',
    subtitle: '为您挑选最具投资与居住价值的曼谷房产',
    beds: '卧室',
    sqm: '平米',
    buy: '售',
    rent: '租',
    viewDetails: '查看详情'
  },
  ja: {
    title: '本日の注目物件',
    subtitle: 'バンコクで最も価値のある厳選されたプレミアム物件',
    beds: '寝室',
    sqm: '㎡',
    buy: '購入',
    rent: '賃貸',
    viewDetails: '詳細を見る'
  },
  ko: {
    title: '오늘의 추천 매물',
    subtitle: '방콕에서 가장 가치 있는 엄선된 주거 및 투자용 부동산',
    beds: '침실',
    sqm: '㎡',
    buy: '매매',
    rent: '임대',
    viewDetails: '상세보기'
  }
};

const howItWorksTranslations: Record<Language, { title: string; subtitle: string }> = {
  th: {
    title: 'ขั้นตอนการทำงานของ StayVerse',
    subtitle: 'เปลี่ยนขั้นตอนการซื้อ-ขายและเช่าอสังหาริมทรัพย์ให้เป็นเรื่องง่าย ด้วยระบบดิจิทัลและ Rent-to-own ครบวงจร'
  },
  en: {
    title: 'How StayVerse Works',
    subtitle: 'Simplifying the real estate journey for buyers and sellers through 100% digital transactions and Rent-to-own options.'
  },
  ru: {
    title: 'Как работает StayVerse',
    subtitle: 'Упрощение покупки, продажи и аренды недвижимости с помощью 100% цифровых транзакций и системы Rent-to-own.'
  },
  zh: {
    title: 'StayVerse 工作流程',
    subtitle: '通过 100% 数字化交易和先租后买（Rent-to-own）系统，简化买家和卖家的房产交易旅程。'
  },
  ja: {
    title: 'StayVerse の仕組み',
    subtitle: '100%デジタル取引とレント・トゥ・オウン（先賃貸後購入）により、不動産の購入・売却・賃貸プロセスをシンプルにします。'
  },
  ko: {
    title: 'StayVerse 이용 방법',
    subtitle: '100% 디지털 거래와 Rent-to-own 옵션을 통해 구매자와 판매자 모두를 위한 부동산 거래 과정을 간소화합니다.'
  }
};

const lifeVerseArticles = [
  {
    id: 'main',
    title: {
      th: 'ถ้าผู้ป่วยอัลไซเมอร์อยู่ในคอนโด นิติบุคคล กรรมการคอนโด รปภ. ลูกบ้าน และรัฐต้องรับมืออย่างไรในสังคมสูงวัย',
      en: 'If Alzheimer patients live in condos, how should juristic persons, board members, guards, residents, and the state respond in an aging society?'
    },
    snippet: {
      th: 'เจาะลึกแนวทางปฏิบัติสำหรับโครงการที่พักอาศัย เมื่อประเทศไทยก้าวเข้าสู่สังคมสูงวัยอย่างสมบูรณ์แบบและการอยู่ร่วมกันอย่างปลอดภัย',
      en: 'In-depth guidelines for residential projects as Thailand fully transitions into an aging society and how to live together safely.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&q=80',
    date: '22 May 2026',
    category: {
      th: 'บทความเด่น',
      en: 'Featured Article'
    }
  },
  {
    id: 1,
    title: {
      th: 'เอพี ไทยแลนด์ ตอกย้ำองค์กรแห่งการเรียนรู้ เสริมทัพพลัส AI มุ่งส่งมอบ LIVING QUALITY',
      en: 'AP Thailand reinforces learning organization, boosting AI integration to deliver LIVING QUALITY'
    },
    snippet: {
      th: 'เอพี ไทยแลนด์ เดินหน้าตอกย้ำองค์กรแห่งการเรียนรู้ เสริมทัพพลัส AI เพื่อยกระดับคุณภาพชีวิตและเพิ่มประสิทธิภาพการบริการลูกค้า...',
      en: 'AP Thailand continues to drive its learning organization philosophy, integrating AI to elevate quality of life and client services...'
    },
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80',
    date: '18 May 2026',
    category: {
      th: 'ข่าวสารอสังหาฯ',
      en: 'Real Estate News'
    }
  },
  {
    id: 2,
    title: {
      th: 'รู้จักช่วง “Honeymoon Period” ของคอนโด ทำไมคอนโดที่ดีเวลอปเปอร์ยังขายไม่หมด ถึงเป็นช่วงเวลาที่น่าอยู่ที่สุด',
      en: 'Understanding the "Honeymoon Period" of condos: Why a partially sold condo is actually the most pleasant time to live'
    },
    snippet: {
      th: 'เปิดมุมมองที่น่าสนใจของช่วงที่โครงการเพิ่งสร้างเสร็จและมีผู้อยู่อาศัยยังไม่เต็มพื้นที่ ความเงียบสงบและการบริการดูแลที่ดีที่สุด...',
      en: 'An interesting perspective of the period when a project is newly completed and partially occupied: tranquility and top-tier services...'
    },
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80',
    date: '14 May 2026',
    category: {
      th: 'เกร็ดความรู้',
      en: 'Living Tips'
    }
  },
  {
    id: 3,
    title: {
      th: 'บ้านอาจไม่ใช่การลงทุนที่หวือหวา แต่คือความสุขระยะยาวของชีวิต',
      en: 'A house might not be a flashy investment, but it represents the long-term happiness of life'
    },
    snippet: {
      th: 'เปรียบเทียบแนวคิดการซื้อบ้านเพื่อความสุขในชีวิตประจำวันกับการลงทุนทางการเงินแบบอื่น ที่ให้ผลตอบแทนเป็นความมั่นคงและสุขภาพจิต...',
      en: 'Comparing the concept of buying a home for daily happiness vs. other financial investments, offering stability and mental peace...'
    },
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80',
    date: '14 May 2026',
    category: {
      th: 'แนวคิดการเงิน',
      en: 'Financial Mindset'
    }
  },
  {
    id: 4,
    title: {
      th: 'นาราสิริ “THE ART OF REFINED LIVING” เมื่อบริบทของคำว่าบ้านหรูได้เปลี่ยนผ่าน',
      en: 'Narasiri "THE ART OF REFINED LIVING": How the definition of a luxury home has transitioned in the modern era'
    },
    snippet: {
      th: 'ในยุคปัจจุบัน ความหรูหราไม่ได้วัดกันที่ขนาดหรือความฟุ่มเฟือยของวัสดุอีกต่อไป แต่รวมถึงเรื่องของความเงียบสงบ ความเป็นส่วนตัว และสุขภาวะที่ดี...',
      en: 'In the modern era, luxury is no longer measured by size or materialism alone, but encompasses peace, privacy, and well-being...'
    },
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80',
    date: '14 May 2026',
    category: {
      th: 'สุนทรียภาพการอยู่อาศัย',
      en: 'Refined Living'
    }
  }
];

const guideVerseArticles = [
  {
    id: 1,
    title: {
      th: 'บริษัท แอสเซทไวส์ จำกัด (มหาชน) หรือ ASW จัดพิธีลงเสาเอกโครงการ Kave Carnival รังสิต นำโดย นางสาวกมล คุณารักษ์กุล กรรมการผู้จัดการกลุ่ม',
      en: 'Assetwise Public Company Limited (ASW) holds the piling ceremony for the Kave Carnival Rangsit project, led by Ms. Kamon Kunarukskul, Group Managing Director.'
    },
    snippet: {
      th: 'จัดพิธีลงเสาเอกโครงการคอนโดมิเนียมใหม่ล่าสุด เจาะกลุ่มนักศึกษามหาวิทยาลัยธรรมศาสตร์ รังสิต ยกระดับการอยู่อาศัยของคนรุ่นใหม่...',
      en: 'Holds the piling ceremony for the latest condominium project, targeting students near Thammasat University Rangsit and elevating youth lifestyle...'
    },
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&q=80',
    date: '20 May 2026',
    category: {
      th: 'ข่าวสารอสังหาฯ',
      en: 'Real Estate News'
    }
  },
  {
    id: 2,
    title: {
      th: 'ยิปซัมตราช้าง เดินหน้ายกระดับมาตรฐานวัสดุก่อสร้างไทย คว้าการรับรองมาตรฐานผลิตภัณฑ์อุตสาหกรรม (มอก.) 863-2567 สำหรับ "โครงคร่าวฝ้า-ผนัง"',
      en: 'Elephant Gypsum advances Thai construction material standards, securing TIS 863-2567 certification for its ceiling and wall metal framing.'
    },
    snippet: {
      th: 'ยื่นใบรับรองยกระดับคุณภาพการก่อสร้างภายในอาคารด้วยโครงคร่าวเหล็กชุบสังกะสีมาตรฐานใหม่ เพื่อความมั่นใจของเจ้าของบ้านและผู้รับเหมา...',
      en: 'Securing the new industrial product standard for ceiling-wall metal framing, bringing confidence to homeowners and contractors...'
    },
    imageUrl: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?w=400&q=80',
    date: '20 May 2026',
    category: {
      th: 'ข่าวประชาสัมพันธ์',
      en: 'PR News'
    }
  },
  {
    id: 3,
    title: {
      th: 'ตลาดอาคารสำนักงานยังอยู่ในสภาวะชีพจรสายล้น พลัส พร็อพเพอร์ตี้แนะผู้ประกอบการเร่งปรับรูปแบบอาคารให้สอดคล้องกับความต้องการของผู้เช่าในปัจจุบัน',
      en: 'Office market remains in oversupply state: Plus Property advises developers to quickly adapt building features to match current tenant demands.'
    },
    snippet: {
      th: 'แนะผู้ประกอบการอาคารสำนักงานและเจ้าของตึกเร่งรีโนเวทและยกระดับสิ่งอำนวยความสะดวก เพื่อตอบรับเทรนด์การทำงานรูปแบบไฮบริดและไลฟ์สไตล์ผู้เช่ายุคใหม่...',
      en: 'Recommending office developers and building owners to speed up renovations and upgrade facilities to meet hybrid work trends and modern tenant demands...'
    },
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80',
    date: '20 May 2026',
    category: {
      th: 'บทวิเคราะห์ตลาด',
      en: 'Market Analysis'
    }
  }
];

interface SponsorVideo {
  id: number;
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
}

const sponsorVideos: SponsorVideo[] = [
  {
    id: 1,
    title: 'ไอดีโอ คิว วิกตอรี่',
    videoUrl: 'https://www.youtube.com/watch?v=U8Cd_McCdow',
    thumbnailUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&q=80',
  },
  {
    id: 2,
    title: 'แอชตัน อโศก - พระราม 9',
    videoUrl: 'https://www.youtube.com/watch?v=idJthveed1M',
    thumbnailUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80',
  },
  {
    id: 3,
    title: 'ไอดีโอ โมบิ สุขุมวิท อีสต์พอยท์',
    videoUrl: 'https://www.youtube.com/watch?v=aN9DH_GxqEo',
    thumbnailUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80',
  },
  {
    id: 4,
    title: 'เซนโทร บางนา',
    videoUrl: 'https://www.youtube.com/watch?v=yJ4v-yxuPk8',
    thumbnailUrl: 'https://images.unsplash.com/photo-1600607687931-cebf12f45cc3?w=400&q=80',
  },
  {
    id: 5,
    title: 'นันทวัน พระราม 9',
    videoUrl: 'https://www.youtube.com/watch?v=1lqfF6wOkMc',
    thumbnailUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80',
  },
  {
    id: 6,
    title: 'เศรษฐสิริ มารท วงแหวน-จตุโชติ',
    videoUrl: 'https://www.youtube.com/watch?v=bumsIF8hbi0',
    thumbnailUrl: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80',
  }
];

const parseVideoUrl = (url: string) => {
  if (!url) return '';

  // YouTube URLs
  const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
  if (ytMatch && ytMatch[1]) {
    return `https://www.youtube.com/embed/${ytMatch[1]}`;
  }

  // Google Drive URLs
  const gdMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/i) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/i);
  if (gdMatch && gdMatch[1]) {
    return `https://drive.google.com/file/d/${gdMatch[1]}/preview`;
  }

  return url;
};

export default function HomePage() {
  const { language, setLanguage, t, isMounted } = useTranslation();

  // Lightbox infographic state
  const [selectedInfographic, setSelectedInfographic] = useState<string | null>(null);

  // Navigation & Dropdown states
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);

  // Search Engine states
  const [searchType, setSearchType] = useState<'buy' | 'rent'>('buy');
  const [keyword, setKeyword] = useState('');
  const [propertyType, setPropertyType] = useState('all');
  const [bedrooms, setBedrooms] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [transitLine, setTransitLine] = useState('all');
  const [station, setStation] = useState('all');
  const [roomType, setRoomType] = useState('all');
  const [lifestyle, setLifestyle] = useState('all');

  const [province, setProvince] = useState('all');
  const [district, setDistrict] = useState('all');
  const [subDistrict, setSubDistrict] = useState('all');
  const [brand, setBrand] = useState('all');
  const [activeProjectTab, setActiveProjectTab] = useState('RECOMMEND');

  // Sponsorer VDO section states
  const [activeVideo, setActiveVideo] = useState<SponsorVideo>(sponsorVideos[0]);

  // Carousel Slider state
  const [currentSlide, setCurrentSlide] = useState(0);

  // Calculator tab state
  const [activeCalcTab, setActiveCalcTab] = useState<'mortgage' | 'principal' | 'transfer' | 'yield'>('mortgage');

  // Interactive Calculator states
  // 1. Mortgage
  const [mPrice, setMPrice] = useState(5000000);
  const [mDown, setMDown] = useState(20); // 20%
  const [mRate, setMRate] = useState(4.5); // 4.5%
  const [mTerm, setMTerm] = useState(30); // 30 years

  // 2. Principal (Borrowing Power)
  const [pIncome, setPIncome] = useState(50000);
  const [pDebts, setPDebts] = useState(5000);
  const [pRate, setPRate] = useState(4.5);
  const [pTerm, setPTerm] = useState(30);

  // 3. Transfer Fees
  const [tSalePrice, setTSalePrice] = useState(5000000);
  const [tAppraisal, setTAppraisal] = useState(4800000);
  const [tYearsOwned, setTYearsOwned] = useState(3);
  const [tSplitFee, setTSplitFee] = useState<boolean>(true); // 50/50 transfer fee split

  // 4. Rental Yield
  const [yPrice, setYPrice] = useState(5000000);
  const [yRent, setYRent] = useState(22000);
  const [yCommon, setYCommon] = useState(18000); // annual common fee
  const [yExpense, setYExpense] = useState(5000); // annual other expenses

  // Copy infographic image on mount
  useEffect(() => {
    fetch('/api/copy')
      .then((res) => res.json())
      .then((data) => console.log('Copy result:', data))
      .catch((err) => console.error('Copy error:', err));
  }, []);

  // Auto cycle slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Thumbnail Listing Widget State
  const slideshowProperties = mockProperties.slice(0, 10);
  const [thumbnailIndex, setThumbnailIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1200);
  const [randomProperties, setRandomProperties] = useState<any[]>([]);
  const [recommendedRandomProperties, setRecommendedRandomProperties] = useState<any[]>([]);
  const guideVerseProperties = [12, 16, 18]
    .map(id => mockProperties.find(p => p.id === id))
    .filter((p): p is typeof mockProperties[0] => !!p);

  useEffect(() => {
    // Select 3 random properties on mount
    const shuffled = [...mockProperties].sort(() => 0.5 - Math.random());
    setRandomProperties(shuffled.slice(0, 3));

    // Select 10 random properties for Recommended Projects thumbnails on mount
    const shuffledForRecommended = [...mockProperties].sort(() => 0.5 - Math.random());
    setRecommendedRandomProperties(shuffledForRecommended.slice(0, 10));
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const getVisibleItems = () => {
    if (windowWidth < 768) return 1;
    if (windowWidth < 1024) return 2;
    return 4;
  };

  const visibleItems = getVisibleItems();
  const maxSlideshowIndex = Math.max(0, slideshowProperties.length - visibleItems);

  useEffect(() => {
    const timer = setInterval(() => {
      setThumbnailIndex((prev) => (prev >= maxSlideshowIndex ? 0 : prev + 1));
    }, 6000); // slow slide show
    return () => clearInterval(timer);
  }, [maxSlideshowIndex]);

  if (!isMounted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-grayPalette-600 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orangePalette-200"></div>
      </div>
    );
  }

  // Filter properties logic
  const filteredProperties = mockProperties.filter((item) => {
    // Search Type
    if (searchType === 'buy' && item.status === 'rent') return false;
    if (searchType === 'rent' && item.status === 'sale') return false;

    // Keyword match (name or location)
    if (keyword && !item.name.toLowerCase().includes(keyword.toLowerCase()) &&
      !item.location.toLowerCase().includes(keyword.toLowerCase())) {
      return false;
    }

    // Property Type
    if (propertyType !== 'all' && item.type !== propertyType) return false;

    // Bedrooms
    if (bedrooms !== 'all') {
      if (bedrooms === 'studio' && item.roomType !== 'studio') return false;
      if (bedrooms !== 'studio' && item.bedrooms !== parseInt(bedrooms)) return false;
    }

    // Price Range Filter
    const itemPrice = searchType === 'buy' ? item.priceBuy : item.priceRent;
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      if (max) {
        if (itemPrice < min || itemPrice > max) return false;
      } else {
        if (itemPrice < min) return false;
      }
    }

    // Station
    if (station !== 'all' && item.station !== station && !item.station.toLowerCase().includes(station.toLowerCase())) return false;

    // Main Line
    if (transitLine !== 'all' && item.transitLine !== transitLine) return false;

    // Room Type
    if (roomType !== 'all' && item.roomType !== roomType) return false;

    // Lifestyle
    if (lifestyle !== 'all' && item.lifestyle !== lifestyle) return false;

    // Brand
    if (brand !== 'all' && item.brand !== brand) return false;

    // Province, District, SubDistrict
    if (province !== 'all' && item.province !== province) return false;
    if (district !== 'all' && item.district !== district) return false;
    if (subDistrict !== 'all' && item.subDistrict !== subDistrict) return false;

    return true;
  });

  // Calculate Mortgage Monthly Payment
  const loanAmt = mPrice * (1 - mDown / 100);
  const monthlyRate = (mRate / 12) / 100;
  const numPayments = mTerm * 12;
  const mortgagePayment = monthlyRate > 0
    ? (loanAmt * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)
    : loanAmt / numPayments;
  const totalMRepayment = mortgagePayment * numPayments;
  const totalMInterest = totalMRepayment - loanAmt;

  // Calculate Borrowing Power (Principal)
  const maxDSR = 0.40; // 40% Debt Service Ratio
  const maxMonthlyDebtService = (pIncome * maxDSR) - pDebts;
  const pMonthlyRate = (pRate / 12) / 100;
  const pNumPayments = pTerm * 12;
  const maxLoanAmt = pMonthlyRate > 0
    ? (maxMonthlyDebtService * (Math.pow(1 + pMonthlyRate, pNumPayments) - 1)) / (pMonthlyRate * Math.pow(1 + pMonthlyRate, pNumPayments))
    : maxMonthlyDebtService * pNumPayments;
  const maxAffordableHomePrice = maxLoanAmt / 0.8; // assumes 20% down payment

  // Calculate Transfer Costs
  const transferFeeTotal = tAppraisal * 0.02;
  const transferFeePaid = tSplitFee ? transferFeeTotal / 2 : transferFeeTotal; // split 50/50

  // Specific Business Tax (SBT) vs Stamp Duty
  const sbtApplies = tYearsOwned < 5;
  const specificBusinessTax = sbtApplies ? Math.max(tSalePrice, tAppraisal) * 0.033 : 0;
  const stampDuty = !sbtApplies ? Math.max(tSalePrice, tAppraisal) * 0.005 : 0;

  // Estimated personal withholding tax (Thai land dept rules: progressive based on appraised value divided by ownership years)
  // Let's estimate a standard withholding tax of 1.5% for individual seller
  const withholdingTax = tAppraisal * 0.015;
  const mortgageRegistrationFee = tSalePrice * 0.8 * 0.01; // 1% of mortgage loan amt (usually paid by buyer, assumed 80% LTV)
  const totalSellerClosingCost = withholdingTax + specificBusinessTax + stampDuty + (tSplitFee ? transferFeeTotal / 2 : transferFeeTotal);
  const totalBuyerClosingCost = (tSplitFee ? transferFeeTotal / 2 : 0) + mortgageRegistrationFee;

  // Calculate Rental Yields
  const grossAnnualIncome = yRent * 12;
  const calculatedGrossYield = (grossAnnualIncome / yPrice) * 100;
  const calculatedNetYield = ((grossAnnualIncome - yCommon - yExpense) / yPrice) * 100;

  // Formatting currency helper
  const formatCurrency = (val: number, isShort = false) => {
    if (isNaN(val)) return '0';
    if (isShort && val >= 1000000) {
      return (val / 1000000).toFixed(2) + ' M';
    }
    return new Intl.NumberFormat(language === 'en' ? 'en-US' : 'th-TH', {
      maximumFractionDigits: 0
    }).format(val);
  };

  const menuItems = [
    { label: t.home, href: '#' },
    { label: t.forSale, href: '#properties' },
    { label: t.forRent, href: '#properties' },
    { label: t.lifestyle, href: '#' },
    { label: t.contactUs, href: '#contact' },
    { label: t.mapSearch, href: '#' },
    { label: t.virtualTour, href: '#' },
  ];

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

  return (
    <div className="flex flex-col min-h-screen bg-[#f2eae1] text-grayPalette-500 font-sans">
      <div className="sticky top-0 z-50 w-full flex flex-col shadow-sm">
        
        {/* 1. TOP HEADER NAVIGATION */}
        <div className="bg-white border-b border-gray-200 py-2 hidden md:block relative">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-xs">
          <div className="flex items-center space-x-6">
            <a href="#" className="flex items-center">
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
            <a href="/subscription" className="hover:text-orangePalette-200 transition-colors">{topHeaderTranslations[language].sub}</a>
            <a href="/admin" className="hover:text-orangePalette-200 transition-colors">{topHeaderTranslations[language].myHome}</a>
            <div className="h-3 w-[1px] bg-gray-300"></div>
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

              <AnimatePresence>
                {langMenuOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setLangMenuOpen(false)}
                    ></div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden text-gray-800 font-medium"
                    >
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
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER NAVIGATION (Transparent Glass) */}
      <header className="bg-[#f4f1eb] backdrop-blur-md border-b border-white/5 transition-all py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex md:hidden items-center">
            <img
              src="https://res.cloudinary.com/dvv3wvgnt/image/upload/v1779681125/svlogo_tzfhad.webp"
              alt="STAYVERSE Logo"
              className="h-12 w-auto object-contain"
            />
          </a>

          {/* Desktop Navigation Menu */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm">
            <a href="#" className="text-[#306473] hover:text-orangePalette-200 hover:border-b-2 hover:border-orangePalette-200 pb-1 font-medium transition-all-custom">{mainMenuTranslations[language].home}</a>
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
                  <a href="#lifeverse" className="block px-4 py-2.5 text-xs text-[#306473] hover:bg-orangePalette-200/20 hover:text-orangePalette-200 transition-colors">LivingVerse</a>
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
              className="p-2 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 text-white cursor-pointer transition-all lg:flex hidden"
            >
              <Menu className="w-5 h-5 text-orangePalette-200" />
            </button>

            {/* Login is only visible on mobile main header since it's in top bar for tablet/desktop */}
            <a href="/login" className="md:hidden text-[#306473] hover:text-orangePalette-200 font-bold text-xs uppercase transition-all-custom px-3 py-2 border border-[#306473]/25 hover:border-orangePalette-200 rounded-full">
              {language === 'th' ? 'เข้าสู่ระบบ' : 'Login'}
            </a>
            <a href="#contact" className="bg-white hover:bg-orangePalette-100 text-bluePalette-600 px-4 py-2 rounded-full text-xs font-bold uppercase transition-all-custom">
              {t.sendEnquiry}
            </a>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-white cursor-pointer transition-all lg:hidden flex"
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
                  {propertyTypes.slice(1).map((type) => (
                    <a key={type.value} href="#properties" onClick={() => { setPropertyType(type.value); setSearchType('buy'); setBurgerMenuOpen(false); }} className="hover:text-orangePalette-200 transition-all">{type.label}</a>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-orangePalette-200 font-bold uppercase tracking-wider text-xs mb-4">{t.forRent}</h4>
                <div className="flex flex-col space-y-2 text-sm text-grayPalette-100">
                  {propertyTypes.slice(1).map((type) => (
                    <a key={type.value} href="#properties" onClick={() => { setPropertyType(type.value); setSearchType('rent'); setBurgerMenuOpen(false); }} className="hover:text-orangePalette-200 transition-all">{type.label}</a>
                  ))}
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
            <a href="#" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-orangePalette-200 text-base font-semibold pb-2 border-b border-white/5 transition-all">{mainMenuTranslations[language].home}</a>
            <a href="#" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-orangePalette-200 text-base font-semibold pb-2 border-b border-white/5 transition-all">{mainMenuTranslations[language].rentToOwn}</a>
            <a href="#" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-orangePalette-200 text-base font-semibold pb-2 border-b border-white/5 transition-all">{mainMenuTranslations[language].monthlyRent}</a>
            <a href="#" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-orangePalette-200 text-base font-semibold pb-2 border-b border-white/5 transition-all">{mainMenuTranslations[language].sellWithTenant}</a>
            <div className="flex flex-col space-y-3 pb-2 border-b border-white/5">
              <span className="text-white text-base font-semibold">LIFE VERSE</span>
              <div className="pl-4 flex flex-col space-y-3">
                <a href="#lifeverse" onClick={() => setMobileMenuOpen(false)} className="text-white/80 hover:text-orangePalette-200 text-sm transition-all">LivingVerse</a>
                <a href="#" onClick={() => setMobileMenuOpen(false)} className="text-white/80 hover:text-orangePalette-200 text-sm transition-all">SpaceVerse</a>
                <a href="#" onClick={() => setMobileMenuOpen(false)} className="text-white/80 hover:text-orangePalette-200 text-sm transition-all">ReviewVerse</a>
                <a href="#" onClick={() => setMobileMenuOpen(false)} className="text-white/80 hover:text-orangePalette-200 text-sm transition-all">TrendVerse</a>
                <a href="#" onClick={() => setMobileMenuOpen(false)} className="text-white/80 hover:text-orangePalette-200 text-sm transition-all">InsightVerse</a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="bg-orangePalette-200 hover:bg-orangePalette-300 text-white text-center py-2.5 rounded font-semibold text-sm transition-all animate-pulse">
                {t.postProperty}
              </a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="bg-white text-bluePalette-600 text-center py-2.5 rounded font-semibold text-sm transition-all">
                {t.sendEnquiry}
              </a>
            </div>
            <a href="/login" onClick={() => setMobileMenuOpen(false)} className="w-full mt-3 block bg-orangePalette-200 hover:bg-orangePalette-300 text-white text-center py-2.5 rounded font-semibold text-sm transition-all">
              {language === 'th' ? 'เข้าสู่ระบบ / Login' : 'Sign In / Login'}
            </a>
          </div>
        )}
      </header>
      </div>


      {/* 3. HERO SLIDER BANNER */}
      <section className="relative h-[480px] md:h-[620px] overflow-hidden bg-grayPalette-600 group">
        {bannerSlides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-grayPalette-600 via-grayPalette-600/40 to-black/30 z-10"></div>

            {/* Background Image */}
            <img
              src={slide.imageUrl}
              alt={slide.title}
              className="w-full h-full object-cover transform scale-105 transition-transform duration-10000"
            />

            {/* Content text */}
            <div className="absolute inset-0 z-20 flex flex-col justify-end pb-16 md:pb-24 max-w-7xl mx-auto px-4">
              <div className="max-w-2xl text-white space-y-4">
                <span className="bg-orangePalette-200 text-white text-xs font-semibold px-3 py-1 rounded uppercase tracking-wider">
                  Featured
                </span>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight font-sans drop-shadow-lg text-gradient-orange">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl text-grayPalette-50/90 font-light drop-shadow-md">
                  {slide.subtitle}
                </p>
                <div className="pt-4">
                  <a href="#properties" className="inline-flex items-center space-x-2 bg-white hover:bg-orangePalette-200 hover:text-white text-grayPalette-600 px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 transform hover:translate-x-1 shadow-lg">
                    <span>Explore Properties</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Controls: Dots */}
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
          {bannerSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-3.5 h-3.5 rounded-full transition-all duration-300 border border-white/40 cursor-pointer ${idx === currentSlide ? 'bg-orangePalette-200 scale-125' : 'bg-white/20 hover:bg-white/40'}`}
            ></button>
          ))}
        </div>

        {/* Slider Controls: Arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev === 0 ? bannerSlides.length - 1 : prev - 1))}
          className="absolute top-1/2 left-4 md:left-8 transform -translate-y-1/2 z-30 p-2 md:p-3 bg-white/10 hover:bg-orangePalette-200/90 backdrop-blur-md rounded-full text-white transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 shadow-lg cursor-pointer flex items-center justify-center"
        >
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)}
          className="absolute top-1/2 right-4 md:right-8 transform -translate-y-1/2 z-30 p-2 md:p-3 bg-white/10 hover:bg-orangePalette-200/90 backdrop-blur-md rounded-full text-white transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 shadow-lg cursor-pointer flex items-center justify-center"
        >
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
        </button>
      </section>

      {/* 4. HIGH-END INTERACTIVE SEARCH ENGINE */}
      <section className="relative z-30 -mt-10 max-w-7xl mx-auto w-full px-4" id="search-engine">
        <div className="bg-white text-grayPalette-600 rounded-3xl shadow-2xl p-6 md:p-8 border border-grayPalette-100 transition-all animate-fade-in">
          <h2 className="text-center font-bold text-lg md:text-2xl uppercase tracking-wider text-[#0c4a5e] mb-6 font-sans">
            {t.searchTitle}
          </h2>

          {/* Buy / Rent Radio Tabs */}
          <div className="flex justify-center space-x-4 mb-6 border-b border-grayPalette-100 pb-4">
            <button
              onClick={() => setSearchType('buy')}
              className={`flex items-center space-x-2 px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 cursor-pointer ${searchType === 'buy' ? 'bg-orangePalette-200 text-white shadow-md' : 'text-grayPalette-300 hover:bg-gray-100'}`}
            >
              <span>{t.buyBtn}</span>
            </button>
            <button
              onClick={() => setSearchType('rent')}
              className={`flex items-center space-x-2 px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 cursor-pointer ${searchType === 'rent' ? 'bg-orangePalette-200 text-white shadow-md' : 'text-grayPalette-300 hover:bg-gray-100'}`}
            >
              <span>{t.rentBtn}</span>
            </button>
          </div>

          {/* Search filters Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Row 1 */}
            {/* Input Keyword */}
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-grayPalette-300 uppercase tracking-wider mb-1.5">{t.searchPlaceholder}</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-grayPalette-50 border border-grayPalette-100 rounded-xl text-sm focus:outline-none focus:border-orangePalette-200 transition-all text-grayPalette-500 font-medium"
                />
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-grayPalette-200" />
              </div>
            </div>

            {/* Property Type Dropdown */}
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-grayPalette-300 uppercase tracking-wider mb-1.5">{t.filterProperty}</label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full py-2 px-3 bg-grayPalette-50 border border-grayPalette-100 rounded-xl text-sm focus:outline-none focus:border-orangePalette-200 transition-all text-grayPalette-500 font-medium"
              >
                {propertyTypes.map((item) => (
                  <option key={item.value} value={item.value}>{item.label}</option>
                ))}
              </select>
            </div>

            {/* Brand Dropdown */}
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-grayPalette-300 uppercase tracking-wider mb-1.5">{searchEngineTranslations[language].brandLabel}</label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full py-2 px-3 bg-grayPalette-50 border border-grayPalette-100 rounded-xl text-sm focus:outline-none focus:border-orangePalette-200 transition-all text-grayPalette-500 font-medium"
              >
                <option value="all">{searchEngineTranslations[language].allBrands}</option>
                {developerBrands.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* Price Range Dropdown */}
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-grayPalette-300 uppercase tracking-wider mb-1.5">{t.filterPrice}</label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full py-2 px-3 bg-grayPalette-50 border border-grayPalette-100 rounded-xl text-sm focus:outline-none focus:border-orangePalette-200 transition-all text-grayPalette-500 font-medium"
              >
                <option value="all">{t.anyPrice}</option>
                {searchType === 'buy' ? (
                  <>
                    <option value="0-3000000">Under 3M THB</option>
                    <option value="3000000-6000000">3M - 6M THB</option>
                    <option value="6000000-10000000">6M - 10M THB</option>
                    <option value="10000000-20000000">10M - 20M THB</option>
                    <option value="20000000-100000000">20M+ THB</option>
                  </>
                ) : (
                  <>
                    <option value="0-15000">Under 15K THB/mo</option>
                    <option value="15000-30000">15K - 30K THB/mo</option>
                    <option value="30000-60000">30K - 60K THB/mo</option>
                    <option value="60000-150000">60K - 150K THB/mo</option>
                    <option value="150000-1000000">150K+ THB/mo</option>
                  </>
                )}
              </select>
            </div>

            {/* Row 2 */}
            {/* Room Type Dropdown */}
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-grayPalette-300 uppercase tracking-wider mb-1.5">{t.filterRoomType}</label>
              <select
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                className="w-full py-2 px-3 bg-grayPalette-50 border border-grayPalette-100 rounded-xl text-sm focus:outline-none focus:border-orangePalette-200 transition-all text-grayPalette-500 font-medium"
              >
                <option value="all">{t.all}</option>
                <option value="studio">{t.studio}</option>
                <option value="duplex">{t.duplex}</option>
                <option value="penthouse">{t.penthouse}</option>
              </select>
            </div>

            {/* Bedrooms Dropdown */}
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-grayPalette-300 uppercase tracking-wider mb-1.5">{t.filterBed}</label>
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full py-2 px-3 bg-grayPalette-50 border border-grayPalette-100 rounded-xl text-sm focus:outline-none focus:border-orangePalette-200 transition-all text-grayPalette-500 font-medium"
              >
                <option value="all">{t.all}</option>
                <option value="studio">{t.studio}</option>
                <option value="1">1 {t.beds}</option>
                <option value="2">2 {t.beds}</option>
                <option value="3">3 {t.beds}</option>
                <option value="4">4+ {t.beds}</option>
              </select>
            </div>

            {/* Main Line Dropdown */}
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-grayPalette-300 uppercase tracking-wider mb-1.5">{searchEngineTranslations[language].transitLabel}</label>
              <select
                value={transitLine}
                onChange={(e) => {
                  setTransitLine(e.target.value);
                  setStation('all');
                }}
                className="w-full py-2 px-3 bg-grayPalette-50 border border-grayPalette-100 rounded-xl text-sm focus:outline-none focus:border-orangePalette-200 transition-all text-grayPalette-500 font-medium"
              >
                <option value="all">{searchEngineTranslations[language].allLines}</option>
                {Object.keys(transitData).map((line) => (
                  <option key={line} value={line}>{line}</option>
                ))}
              </select>
            </div>

            {/* Sub Station Dropdown */}
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-grayPalette-300 uppercase tracking-wider mb-1.5">{searchEngineTranslations[language].stationLabel}</label>
              <select
                value={station}
                onChange={(e) => setStation(e.target.value)}
                className="w-full py-2 px-3 bg-grayPalette-50 border border-grayPalette-100 rounded-xl text-sm focus:outline-none focus:border-orangePalette-200 transition-all text-grayPalette-500 font-medium disabled:opacity-50"
                disabled={transitLine === 'all'}
              >
                <option value="all">{searchEngineTranslations[language].allStations}</option>
                {transitLine !== 'all' && transitData[transitLine]?.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            {/* Row 3 */}
            {/* Province Dropdown */}
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-grayPalette-300 uppercase tracking-wider mb-1.5">{searchEngineTranslations[language].provinceLabel}</label>
              <select
                value={province}
                onChange={(e) => {
                  setProvince(e.target.value);
                  setDistrict('all');
                  setSubDistrict('all');
                }}
                className="w-full py-2 px-3 bg-grayPalette-50 border border-grayPalette-100 rounded-xl text-sm focus:outline-none focus:border-orangePalette-200 transition-all text-grayPalette-500 font-medium"
              >
                <option value="all">{searchEngineTranslations[language].allProvinces}</option>
                {Object.keys(locationData).map((prov) => (
                  <option key={prov} value={prov}>{prov}</option>
                ))}
              </select>
            </div>

            {/* District Dropdown */}
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-grayPalette-300 uppercase tracking-wider mb-1.5">{searchEngineTranslations[language].districtLabel}</label>
              <select
                value={district}
                onChange={(e) => {
                  setDistrict(e.target.value);
                  setSubDistrict('all');
                }}
                className="w-full py-2 px-3 bg-grayPalette-50 border border-grayPalette-100 rounded-xl text-sm focus:outline-none focus:border-orangePalette-200 transition-all text-grayPalette-500 font-medium disabled:opacity-50"
                disabled={province === 'all'}
              >
                <option value="all">{searchEngineTranslations[language].allDistricts}</option>
                {province !== 'all' && Object.keys(locationData[province] || {}).map((dist) => (
                  <option key={dist} value={dist}>{dist}</option>
                ))}
              </select>
            </div>

            {/* Sub-district Dropdown */}
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-grayPalette-300 uppercase tracking-wider mb-1.5">{searchEngineTranslations[language].subDistrictLabel}</label>
              <select
                value={subDistrict}
                onChange={(e) => setSubDistrict(e.target.value)}
                className="w-full py-2 px-3 bg-grayPalette-50 border border-grayPalette-100 rounded-xl text-sm focus:outline-none focus:border-orangePalette-200 transition-all text-grayPalette-500 font-medium disabled:opacity-50"
                disabled={district === 'all'}
              >
                <option value="all">{searchEngineTranslations[language].allSubDistricts}</option>
                {province !== 'all' && district !== 'all' && (locationData[province]?.[district] || []).map((sub) => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>

            {/* Lifestyle Dropdown */}
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-grayPalette-300 uppercase tracking-wider mb-1.5">{t.filterLifestyle}</label>
              <select
                value={lifestyle}
                onChange={(e) => setLifestyle(e.target.value)}
                className="w-full py-2 px-3 bg-grayPalette-50 border border-grayPalette-100 rounded-xl text-sm focus:outline-none focus:border-orangePalette-200 transition-all text-grayPalette-500 font-medium"
              >
                <option value="all">{t.all}</option>
                <option value="ใกล้มหาวิทยาลัย">ใกล้มหาวิทยาลัย</option>
                <option value="สระว่ายน้ำ">สระว่ายน้ำ</option>
                <option value="ใกล้ร้านสะดวกซื้อ">ใกล้ร้านสะดวกซื้อ</option>
                <option value="ฟิตเนส 24 ชม.">ฟิตเนส 24 ชม.</option>
                <option value="ใกล้ห้างสรรพสินค้า">ใกล้ห้างสรรพสินค้า</option>
                <option value="รปภ. 24 ชม.">รปภ. 24 ชม.</option>
                <option value="เลี้ยงสัตว์ได้">เลี้ยงสัตว์ได้</option>
              </select>
            </div>
          </div>

          {/* Reset Filters & Search Actions */}
          <div className="flex items-center justify-center space-x-4 pt-6 mt-6 border-t border-grayPalette-100">
            <button
              onClick={() => {
                setKeyword('');
                setPropertyType('all');
                setBedrooms('all');
                setPriceRange('all');
                setTransitLine('all');
                setStation('all');
                setRoomType('all');
                setLifestyle('all');
                setProvince('all');
                setDistrict('all');
                setSubDistrict('all');
                setBrand('all');
              }}
              className="px-8 py-2.5 border border-grayPalette-100 hover:bg-gray-50 text-grayPalette-400 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer min-w-[120px]"
            >
              Reset
            </button>
            <a
              href="#hilight-properties"
              className="px-10 py-2.5 bg-orangePalette-200 hover:bg-orangePalette-300 text-white rounded-xl text-sm font-bold text-center flex items-center justify-center space-x-2 shadow-md shadow-orangePalette-200/20 transition-all duration-300 cursor-pointer min-w-[160px]"
            >
              <Search className="w-4 h-4" />
              <span>{t.searchBtn}</span>
            </a>
          </div>
        </div>
      </section>

      {/* 4.5 HI - LIGHT PROPERTIES */}
      <section className="py-16 w-full bg-[#f4f2ed] -mt-5" id="hilight-properties">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#0c4a5e] mb-2 font-sans">
                {highlightTranslations[language].title}
              </h2>
              <p className="text-grayPalette-400 text-sm mt-1 font-semibold">
                {highlightTranslations[language].subtitle.replace('{count}', filteredProperties.length.toString())}
              </p>
            </div>

            <div className="flex space-x-2">
              <span className="text-xs bg-orangePalette-50 text-orangePalette-300 px-3 py-1.5 rounded-full font-bold uppercase tracking-wider shadow-sm">
                {searchType === 'buy' ? 'For Sale' : 'For Rent'}
              </span>
            </div>
          </div>

          {filteredProperties.length === 0 ? (
            <div className="bg-white border border-grayPalette-100 rounded-3xl p-12 text-center text-grayPalette-300">
              <HelpCircle className="w-12 h-12 text-grayPalette-200 mx-auto mb-4" />
              <p className="text-lg font-semibold">{highlightTranslations[language].noFound}</p>
              <p className="text-sm mt-1">{highlightTranslations[language].tryReset}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
              {filteredProperties.slice(0, 4).map((prop) => (
                <div
                  key={prop.id}
                  onClick={() => window.open(`/project/${encodeURIComponent(prop.name)}`, '_blank')}
                  className="bg-[#f2f4f7] overflow-hidden flex flex-col h-full border border-gray-100 shadow-sm transition-transform hover:-translate-y-1 cursor-pointer"
                >
                  {/* Image */}
                  <div className="relative h-56 w-full overflow-hidden bg-gray-200">
                    <img
                      src={prop.imageUrl}
                      alt={prop.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                      <span className="bg-[#ff5a2c] text-white text-[10px] font-bold px-2.5 py-1 uppercase tracking-wider shadow-sm">
                        {prop.tag}
                      </span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-5 flex-grow flex flex-col">
                    <div className="text-center space-y-3">
                      <div className="text-[10px] text-gray-700 font-bold tracking-widest uppercase">
                        {prop.type.toUpperCase()} | {prop.district} | {prop.province}
                      </div>

                      <div className="w-full h-px bg-gray-300 relative my-2">
                        <div className="absolute left-1/2 transform -translate-x-1/2 -top-0.5 w-1 h-1 bg-gray-500 rounded-full" />
                      </div>

                      <h3 className="font-extrabold text-lg text-[#2d2d2d] tracking-tight line-clamp-1">
                        {prop.name}
                      </h3>

                      {/* Distances */}
                      <div className="flex flex-col items-center justify-center space-y-1 text-[10px] text-gray-500 pt-1 pb-3">
                        {prop.distance1 && (
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3 text-red-500" />
                            <span>{prop.distance1}</span>
                          </div>
                        )}
                        {prop.distance2 && (
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3 text-red-500" />
                            <span>{prop.distance2}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Prices Blocks */}
                    <div className="mt-auto space-y-1.5">
                      {/* FOR SALE */}
                      <div className="flex bg-[#9ea8b3] items-center text-white px-3 py-2 shadow-sm">
                        <span className="text-[10px] font-bold w-1/3 tracking-wider">FOR SALE</span>
                        <span className="text-xs font-semibold w-2/3 text-right">
                          {prop.priceBuy > 0 ? `฿ ${new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(prop.priceBuy)}` : '-'}
                        </span>
                      </div>

                      {/* FOR RENT */}
                      <div className="flex bg-[#9ea8b3] items-center text-white px-3 py-2 shadow-sm">
                        <span className="text-[10px] font-bold w-1/3 tracking-wider">FOR RENT</span>
                        <span className="text-xs font-semibold w-2/3 text-right">
                          {prop.priceRent > 0 ? `฿ ${new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(prop.priceRent)}` : '-'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4.6 SPONSORER POSITION VDO SECTION (PROP CHANNEL) */}
      <section className="py-12 w-full bg-[#f2eae1] border-t border-gray-100" id="prop-channel">
        <div className="max-w-7xl mx-auto px-4 w-full">
          {/* Header Title matching Ref Image */}
          <div className="mb-4">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#0c4a5e] mb-2 font-sans">
              {sectionTitleTranslations[language].videoTitle}
            </h2>
          </div>

          {/* VDO Widget Core Layout */}
          <div className="flex flex-col lg:flex-row w-full bg-black shadow-2xl overflow-hidden">
            {/* Left: Video Player */}
            <div className="w-full lg:w-[65%] bg-[#0c4a5e] relative aspect-video lg:h-[450px] flex items-center justify-center">
              {activeVideo ? (
                <iframe
                  src={parseVideoUrl(activeVideo.videoUrl)}
                  className="absolute inset-0 w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  title={activeVideo.title}
                ></iframe>
              ) : (
                <div className="text-center text-gray-400 p-6">
                  <p className="text-sm">ดูวิดีโอไม่ได้</p>
                  <p className="text-xs mt-1">กรุณาเลือกวิดีโอจากรายการ</p>
                </div>
              )}
            </div>

            {/* Right: Scrollable Playlist Panel */}
            <div className="w-full lg:w-[35%] bg-[#0c4a5e] text-white flex flex-col h-[300px] lg:h-[450px]">
              <div className="flex-1 overflow-y-auto divide-y divide-white/10 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                {sponsorVideos.map((video) => {
                  const isActive = activeVideo?.id === video.id;
                  return (
                    <button
                      key={video.id}
                      onClick={() => setActiveVideo(video)}
                      className={`w-full text-left flex items-center p-3.5 space-x-3.5 transition-all duration-300 hover:bg-[#41707e]/80 focus:outline-none ${isActive ? 'bg-[#41707e]' : 'bg-transparent'
                        }`}
                    >
                      {/* Thumbnail */}
                      <div className="relative w-20 md:w-24 h-12 md:h-16 shrink-0 rounded overflow-hidden shadow-md bg-black/20">
                        <img
                          src={video.thumbnailUrl}
                          alt={video.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                        {/* Play overlay icon */}
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center hover:bg-black/40 transition-all duration-300">
                          <div className="w-6 h-6 rounded-full bg-white/90 flex items-center justify-center shadow-sm">
                            <ChevronRight className="w-3.5 h-3.5 text-[#8c734b] ml-0.5 fill-current" />
                          </div>
                        </div>
                      </div>

                      {/* Video Title */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs md:text-sm font-semibold text-white/95 leading-snug line-clamp-2 font-sans tracking-wide">
                          {video.title}
                        </h4>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4.7 THUMBNAIL SLIDESHOW WIDGET */}
      <section className="py-12 w-full bg-[#f4f2ed] border-y border-gray-100" id="spotlight-properties">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#0c4a5e] font-sans">
                {widgetTitles[language]?.title || widgetTitles['th'].title}
              </h2>
              <p className="text-grayPalette-300 text-xs md:text-sm mt-1">
                {widgetTitles[language]?.subtitle || widgetTitles['th'].subtitle}
              </p>
            </div>

            {/* Navigation Arrows */}
            <div className="flex space-x-2">
              <button
                onClick={() => setThumbnailIndex((prev) => Math.max(0, prev - 1))}
                disabled={thumbnailIndex === 0}
                className="w-9 h-9 rounded-full bg-white hover:bg-orangePalette-200 border border-gray-200 text-gray-600 hover:text-white flex items-center justify-center shadow-sm disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-gray-600 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setThumbnailIndex((prev) => Math.min(maxSlideshowIndex, prev + 1))}
                disabled={thumbnailIndex === maxSlideshowIndex}
                className="w-9 h-9 rounded-full bg-white hover:bg-orangePalette-200 border border-gray-200 text-gray-600 hover:text-white flex items-center justify-center shadow-sm disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-gray-600 transition-all cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Slider Outer Container */}
          <div className="overflow-hidden relative py-2">
            <div
              className="flex transition-transform duration-1000 ease-in-out -mx-3"
              style={{
                transform: `translate3d(-${thumbnailIndex * (100 / visibleItems)}%, 0, 0)`,
              }}
            >
              {slideshowProperties.map((prop) => {
                const displayPrice = prop.priceBuy > 0 ? prop.priceBuy : prop.priceRent;
                const priceLabel = prop.priceBuy > 0
                  ? `฿${formatCurrency(displayPrice)}`
                  : `฿${formatCurrency(displayPrice)} / mo`;

                return (
                  <div
                    key={prop.id}
                    className="w-full md:w-1/2 lg:w-1/4 shrink-0 px-3 transition-all duration-300"
                  >
                    <div
                      onClick={() => window.open(`/project/${encodeURIComponent(prop.name)}`, '_blank')}
                      className="bg-white hover:bg-grayPalette-50 border border-gray-100 hover:border-orangePalette-200/50 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-3 flex items-center space-x-3 h-[116px] cursor-pointer"
                    >
                      {/* Thumbnail Image */}
                      <div className="relative w-28 h-full shrink-0 rounded-xl overflow-hidden bg-gray-100">
                        <img
                          src={prop.imageUrl}
                          alt={prop.name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                        {prop.virtualTour && (
                          <span className="absolute bottom-1.5 right-1.5 bg-tealPalette-100 text-white text-[8px] font-bold px-1.5 py-0.5 rounded tracking-wide shadow-sm">
                            3D
                          </span>
                        )}
                        <span className="absolute top-1.5 left-1.5 bg-orangePalette-200 text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                          {prop.priceBuy > 0 ? (widgetTitles[language]?.buy || widgetTitles['th'].buy) : (widgetTitles[language]?.rent || widgetTitles['th'].rent)}
                        </span>
                      </div>

                      {/* Details Column */}
                      <div className="flex flex-col justify-between h-full py-0.5 flex-grow min-w-0">
                        <div className="min-w-0">
                          {/* Price */}
                          <div className="text-tealPalette-300 font-extrabold text-sm md:text-[15px] leading-tight truncate">
                            {priceLabel}
                          </div>
                          {/* Name */}
                          <h3 className="text-xs md:text-sm font-bold text-grayPalette-500 mt-1 truncate">
                            {prop.name}
                          </h3>
                        </div>

                        {/* Specs */}
                        <div>
                          <div className="flex items-center gap-1.5 text-[9px] md:text-[10px] text-grayPalette-300 font-semibold mb-1">
                            <span className="flex items-center gap-0.5 bg-grayPalette-50 px-1.5 py-0.5 rounded border border-grayPalette-100">
                              <BedDouble className="w-3.5 h-3.5 text-orangePalette-200" />
                              <span>{prop.bedrooms} {widgetTitles[language]?.beds || widgetTitles['th'].beds}</span>
                            </span>
                            <span className="flex items-center gap-0.5 bg-grayPalette-50 px-1.5 py-0.5 rounded border border-grayPalette-100">
                              <Square className="w-3 h-3 text-orangePalette-200" />
                              <span>{prop.size} {widgetTitles[language]?.sqm || widgetTitles['th'].sqm}</span>
                            </span>
                          </div>

                          {/* Location Station */}
                          {prop.station && (
                            <div className="text-[9px] md:text-[10px] text-grayPalette-200 flex items-center space-x-1 truncate">
                              <MapPin className="w-3 h-3 text-red-400 shrink-0" />
                              <span className="truncate">{prop.station}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bullet Indicators */}
          <div className="flex justify-center space-x-2 mt-4">
            {Array.from({ length: maxSlideshowIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setThumbnailIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${idx === thumbnailIndex ? 'bg-orangePalette-200 w-4' : 'bg-gray-300 hover:bg-gray-400'}`}
              ></button>
            ))}
          </div>
        </div>
      </section>

      {/* 5. RECOMMENDED PROJECTS */}
      <section className="py-6 bg-[#f2eae1]" id="properties">
        <div className="max-w-7xl mx-auto px-4 w-full mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#0c4a5e] mb-6 font-sans">
            {sectionTitleTranslations[language].recommendTitle}
          </h2>

          {/* Project Tabs */}
          <div className="flex flex-wrap items-center gap-6 border-b border-gray-200 pb-2 mb-8">
            {['RECOMMEND', 'HOT CONDOMINIUM FOR SALE', 'HOT CONDOMINIUM FOR RENT', 'HOUSE', 'TOWN HOME'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveProjectTab(tab)}
                className={`uppercase text-sm font-semibold tracking-wider pb-2 transition-all relative ${activeProjectTab === tab
                  ? 'text-orange-500'
                  : 'text-gray-400 hover:text-gray-800'
                  }`}
              >
                {tab}
                {activeProjectTab === tab && (
                  <div className="absolute bottom-[-9px] left-0 right-0 flex justify-center">
                    <div className="w-full h-[2px] bg-orange-500 relative">
                      <div className="absolute left-1/2 transform -translate-x-1/2 -top-1 w-2.5 h-2.5 rounded-full bg-orange-500 ring-2 ring-white" />
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 w-full relative">
          {mockProperties.filter(p => p.tag === activeProjectTab).length === 0 ? (
            <div className="bg-white border border-grayPalette-100 rounded-3xl p-12 text-center text-grayPalette-300">
              <HelpCircle className="w-12 h-12 text-grayPalette-200 mx-auto mb-4" />
              <p className="text-lg font-semibold">No Properties Found for {activeProjectTab}</p>
            </div>
          ) : (
            <div className="relative">
              {/* Left Arrow for Slider Effect */}
              <button className="absolute left-[-24px] top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-[#ff5a2c] rounded-full text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="flex flex-wrap justify-center gap-6 animate-fade-in overflow-hidden px-2 py-4">
                {mockProperties.filter(p => p.tag === activeProjectTab).slice(0, 3).map((prop) => (
                  <div
                    key={prop.id}
                    onClick={() => window.open(`/project/${encodeURIComponent(prop.name)}`, '_blank')}
                    className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-[400px] bg-[#f2f4f7] overflow-hidden flex flex-col h-full border border-gray-100 shadow-sm transition-transform hover:-translate-y-1 cursor-pointer"
                  >
                    {/* Image */}
                    <div className="relative h-64 w-full overflow-hidden bg-gray-200">
                      <img
                        src={prop.imageUrl}
                        alt={prop.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="p-6 flex-grow flex flex-col">
                      <div className="text-center space-y-4">
                        <div className="text-[11px] text-gray-700 font-bold tracking-widest uppercase">
                          {prop.type.toUpperCase()} | {prop.district} | {prop.province}
                        </div>

                        <div className="w-full h-px bg-gray-300 relative my-2">
                          <div className="absolute left-1/2 transform -translate-x-1/2 -top-0.5 w-1 h-1 bg-gray-500 rounded-full" />
                        </div>

                        <h3 className="font-extrabold text-xl text-[#2d2d2d] tracking-tight">
                          {prop.name}
                        </h3>

                        {/* Distances */}
                        <div className="flex flex-col items-center justify-center space-y-1.5 text-[11px] text-gray-500 pt-2 pb-4">
                          {prop.distance1 && (
                            <div className="flex items-center space-x-1.5">
                              <MapPin className="w-3.5 h-3.5 text-red-500" />
                              <span>{prop.distance1}</span>
                            </div>
                          )}
                          {prop.distance2 && (
                            <div className="flex items-center space-x-1.5">
                              <MapPin className="w-3.5 h-3.5 text-red-500" />
                              <span>{prop.distance2}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Prices Blocks */}
                      <div className="mt-auto space-y-2">
                        {/* FOR SALE */}
                        <div className="flex bg-[#9ea8b3] items-center text-white px-4 py-2.5 shadow-sm">
                          <span className="text-[11px] font-bold w-1/3 tracking-wider">FOR SALE</span>
                          <span className="text-sm font-semibold w-2/3 text-right">
                            {prop.priceBuy > 0 ? `฿ ${new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(prop.priceBuy)}` : '-'}
                          </span>
                        </div>

                        {/* FOR RENT */}
                        <div className="flex bg-[#9ea8b3] items-center text-white px-4 py-2.5 shadow-sm">
                          <span className="text-[11px] font-bold w-1/3 tracking-wider">FOR RENT</span>
                          <span className="text-sm font-semibold w-2/3 text-right">
                            {prop.priceRent > 0 ? `฿ ${new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(prop.priceRent)}` : '-'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Arrow for Slider Effect */}
              <button className="absolute right-[-24px] top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-[#ff5a2c] rounded-full text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}


        </div>
      </section>

      {/* 10 Random Recommended Projects Thumbnails */}
      <section>
          <div className="py-12 mt-12 bg-[white] p-6 border border-gray-100">
            <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center">
              {recommendedRandomProperties.map((prop) => {
                const displayPrice = prop.priceBuy > 0 ? prop.priceBuy : prop.priceRent;
                const priceLabel = prop.priceBuy > 0
                  ? `฿${formatCurrency(displayPrice)}`
                  : `฿${formatCurrency(displayPrice)} / mo`;

                const shortWidgetTitles: Record<string, Record<string, string>> = {
                  th: { beds: 'นอน', sqm: 'ตร.ม.' },
                  en: { beds: 'Bed', sqm: 'sqm' },
                  ru: { beds: 'спальни', sqm: 'кв.ม.' },
                  zh: { beds: '卧', sqm: '平米' },
                  ja: { beds: '寝', sqm: '㎡' },
                  ko: { beds: '룸', sqm: '㎡' }
                };

                const shortSqm = shortWidgetTitles[language]?.sqm || shortWidgetTitles['th'].sqm;

                return (
                  <div
                    key={prop.id}
                    onClick={() => window.open(`/project/${encodeURIComponent(prop.name)}`, '_blank')}
                    className="w-full max-w-[280px] bg-white hover:bg-grayPalette-50 border border-gray-100 hover:border-orangePalette-200/50 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-3 flex items-center space-x-3 h-[116px] cursor-pointer"
                  >
                    {/* Thumbnail Image */}
                    <div className="relative w-28 h-full shrink-0 rounded-xl overflow-hidden bg-gray-100">
                      <img
                        src={prop.imageUrl}
                        alt={prop.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      {prop.virtualTour && (
                        <span className="absolute bottom-1.5 right-1.5 bg-tealPalette-100 text-white text-[8px] font-bold px-1.5 py-0.5 rounded tracking-wide shadow-sm">
                          3D
                        </span>
                      )}
                      <span className="absolute top-1.5 left-1.5 bg-orangePalette-200 text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                        {prop.priceBuy > 0 ? (widgetTitles[language]?.buy || widgetTitles['th'].buy) : (widgetTitles[language]?.rent || widgetTitles['th'].rent)}
                      </span>
                    </div>

                    {/* Details Column */}
                    <div className="flex flex-col justify-between h-full py-0.5 flex-grow min-w-0">
                      <div className="min-w-0">
                        {/* Price */}
                        <div className="text-tealPalette-300 font-extrabold text-sm md:text-[15px] leading-tight truncate">
                          {priceLabel}
                        </div>
                        {/* Name */}
                        <h3 className="text-xs md:text-sm font-bold text-grayPalette-500 mt-1 truncate">
                          {prop.name}
                        </h3>
                      </div>

                      {/* Specs */}
                      <div>
                        <div className="flex items-center gap-1 text-[9px] text-grayPalette-300 font-semibold mb-1">

                          <span className="bg-grayPalette-50 px-1.5 py-0.5 rounded border border-grayPalette-100 whitespace-nowrap">
                            {prop.size} {shortSqm}
                          </span>
                        </div>

                        {/* Location Station */}
                        {prop.station && (
                          <div className="text-[9px] md:text-[10px] text-grayPalette-200 flex items-center space-x-1 truncate">
                            <MapPin className="w-3 h-3 text-red-400 shrink-0" />
                            <span className="truncate">{prop.station}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
      </section>

      {/* 7.8. GDN HORIZONTAL BANNER BARS */}
      <section className="py-6 bg-gray-50/30">
        <div className="max-w-7xl mx-auto px-4 w-full flex flex-col space-y-6">
          {/* Banner 1: Stayverse Advisory */}
          <a
            href="/"
            className="relative block w-full rounded-[8px] md:rounded-[12px] overflow-hidden border border-gray-200/50 shadow-sm hover:shadow-md group transition-all duration-300 hover:scale-[1.002] cursor-pointer"
          >
            <img
              src="/stayverse_ads1.jpg"
              alt="Stayverse Advisory Premium Luxury Living"
              className="w-full h-auto"
            />
          </a>

          {/* Banner 2: Stayverse Facebook Page */}
          <a
            href="/"
            className="relative block w-full rounded-[8px] md:rounded-[12px] overflow-hidden border border-gray-200/50 shadow-sm hover:shadow-md group transition-all duration-300 hover:scale-[1.002] cursor-pointer"
          >
            <img
              src="/stayverse_ads2.jpg"
              alt="Stayverse Facebook Fan Page"
              className="w-full h-auto"
            />
          </a>
        </div>
      </section>

      {/* 8. LUXURY WHY CHOOSE US */}
      <section className="py-16 bg-[#f8f7f2] text-[#c48952]">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <h2 className="text-center font-bold text-2xl md:text-3xl uppercase tracking-wider text-[#104b59] mb-12 font-sans">
            {t.whyChooseUs}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#f3ece2] border border-white/10 p-8 rounded-3xl text-center space-y-4">
              <div className="w-12 h-12 bg-orangePalette-200/20 text-orangePalette-200 rounded-2xl flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-lg text-[#3a6972]">{whyChooseUsTranslations[language].t1}</h3>
              <p className="text-sm text-[#57524d] font-light leading-relaxed">
                {whyChooseUsTranslations[language].d1}
              </p>
            </div>

            <div className="bg-[#f3ece2] border border-white/10 p-8 rounded-3xl text-center space-y-4">
              <div className="w-12 h-12 bg-tealPalette-100/20 text-tealPalette-100 rounded-2xl flex items-center justify-center mx-auto">
                <Landmark className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-lg text-[#3a6972]">{whyChooseUsTranslations[language].t2}</h3>
              <p className="text-sm text-[#57524d] font-light leading-relaxed">
                {whyChooseUsTranslations[language].d2}
              </p>
            </div>

            <div className="bg-[#f3ece2] border border-white/10 p-8 rounded-3xl text-center space-y-4">
              <div className="w-12 h-12 bg-orangePalette-200/20 text-orangePalette-200 rounded-2xl flex items-center justify-center mx-auto">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-lg text-[#3a6972]">{whyChooseUsTranslations[language].t3}</h3>
              <p className="text-sm text-[#57524d] font-light leading-relaxed">
                {whyChooseUsTranslations[language].d3}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8.5. HOW IT WORKS (INFOGRAPHIC) */}
      <section className="py-8 bg-gray-50/50 border-t border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Buyer's Journey */}
            <div className="flex flex-col items-center">
              <div
                className="relative w-full rounded-3xl overflow-hidden shadow-xl border border-gray-200/60 bg-white p-2 hover:shadow-orangePalette-200/10 transition-all duration-500 group flex-1 flex items-center justify-center cursor-zoom-in"
                onClick={() => setSelectedInfographic('/buyer-journey.png')}
              >
                <img
                  src="/buyer-journey.png"
                  alt="Buyer's Journey"
                  className="w-full h-auto rounded-2xl object-contain group-hover:scale-[1.01] transition-transform duration-500"
                />
                <div className="absolute bottom-4 right-4 bg-black/65 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-center space-x-1 border border-white/10">
                  <Search className="w-3.5 h-3.5" />
                  <span>{language === 'th' ? 'คลิกเพื่อขยาย' : 'Click to zoom'}</span>
                </div>
              </div>
            </div>

            {/* Seller's Journey */}
            <div className="flex flex-col items-center">
              <div
                className="relative w-full rounded-3xl overflow-hidden shadow-xl border border-gray-200/60 bg-white p-2 hover:shadow-orangePalette-200/10 transition-all duration-500 group flex-1 flex items-center justify-center cursor-zoom-in"
                onClick={() => setSelectedInfographic('/seller-journey.png')}
              >
                <img
                  src="/seller-journey.png"
                  alt="Seller's Journey"
                  className="w-full h-auto rounded-2xl object-contain group-hover:scale-[1.01] transition-transform duration-500"
                />
                <div className="absolute bottom-4 right-4 bg-black/65 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-center space-x-1 border border-white/10">
                  <Search className="w-3.5 h-3.5" />
                  <span>{language === 'th' ? 'คลิกเพื่อขยาย' : 'Click to zoom'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8.8. LIFEVERSE SECTION */}
      <section id="lifeverse" className="py-12 bg-white border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 w-full">
          {/* Header */}
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-orangePalette-200">LIFEVERSE</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0c4a5e] font-sans tracking-wide mt-1">
              {sectionTitleTranslations[language].insightTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Area (Red + Yellow areas combined inside a 2-col flex container) */}
            <div className="lg:col-span-2 flex flex-col space-y-8">

              {/* RED SQUARE AREA: Blog / Article List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Featured Main Article (Left) */}
                {lifeVerseArticles.filter(a => a.id === 'main').map(article => (
                  <div key={article.id} className="relative group overflow-hidden rounded-3xl shadow-lg border border-gray-100 flex flex-col h-[340px] md:h-[380px] cursor-pointer">
                    <img
                      src={article.imageUrl}
                      alt={article.title[language === 'th' ? 'th' : 'en'] || article.title['th']}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent flex flex-col justify-end p-6 text-white">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-orangePalette-100 bg-orangePalette-200/20 border border-orangePalette-100/30 px-2.5 py-1 rounded-full self-start mb-3 backdrop-blur-sm">
                        {article.category[language === 'th' ? 'th' : 'en'] || article.category['th']}
                      </span>
                      <h3 className="font-extrabold text-lg md:text-xl leading-snug hover:text-orangePalette-100 transition-colors line-clamp-3">
                        {article.title[language === 'th' ? 'th' : 'en'] || article.title['th']}
                      </h3>
                      <p className="text-xs text-gray-200 font-light mt-2 line-clamp-2 leading-relaxed">
                        {article.snippet[language === 'th' ? 'th' : 'en'] || article.snippet['th']}
                      </p>
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10 text-[10px] text-gray-300">
                        <span>{article.date}</span>
                        <span className="text-orangePalette-100 font-bold hover:underline flex items-center space-x-1">
                          <span>{language === 'th' ? 'อ่านต่อ' : 'Read more'}</span>
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Smaller Articles Stack (Right) */}
                <div className="flex flex-col justify-between space-y-4 h-[340px] md:h-[380px]">
                  {lifeVerseArticles.filter(a => a.id !== 'main').slice(0, 3).map(article => (
                    <div key={article.id} className="flex space-x-4 items-start group border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                      <div className="w-24 h-16 md:w-28 md:h-20 shrink-0 rounded-xl overflow-hidden shadow-sm border border-gray-100 relative">
                        <img
                          src={article.imageUrl}
                          alt={article.title[language === 'th' ? 'th' : 'en'] || article.title['th']}
                          className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[9px] font-extrabold tracking-wider uppercase text-tealPalette-300">
                              {article.category[language === 'th' ? 'th' : 'en'] || article.category['th']}
                            </span>
                            <span className="text-[9px] text-gray-400">{article.date}</span>
                          </div>
                          <h4 className="font-bold text-xs md:text-sm text-grayPalette-600 line-clamp-2 group-hover:text-orangePalette-200 transition-colors leading-snug">
                            {article.title[language === 'th' ? 'th' : 'en'] || article.title['th']}
                          </h4>
                          <p className="text-[10px] text-gray-400 font-light mt-1 line-clamp-1 leading-relaxed hidden sm:block">
                            {article.snippet[language === 'th' ? 'th' : 'en'] || article.snippet['th']}
                          </p>
                        </div>
                        <div className="flex items-center justify-between mt-1 text-[10px]">
                          <a href="#" className="text-orangePalette-200 hover:text-orangePalette-300 font-bold flex items-center space-x-0.5">
                            <span>{language === 'th' ? 'อ่านต่อ' : 'Read More'}</span>
                            <ArrowRight className="w-2.5 h-2.5" />
                          </a>
                          <button className="text-gray-400 hover:text-orangePalette-200 p-1" aria-label="Share">
                            <Share2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* YELLOW SQUARE AREA: compact 3 Property cards */}
              <div className="border-t border-gray-100 pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {randomProperties.map(p => (
                    <div key={p.id} className="bg-white border border-gray-100 rounded-2xl p-2.5 shadow-md flex items-center space-x-3 hover:shadow-lg transition-all duration-300 group h-[116px]">
                      {/* Thumbnail image and status badge */}
                      <div className="relative w-28 h-full shrink-0 rounded-xl overflow-hidden bg-gray-100">
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-1.5 left-1.5 bg-[#ff5a2c] text-white text-[8px] font-black px-1.5 py-0.5 rounded-md uppercase tracking-wider">
                          {p.status === 'rent' ? (language === 'th' ? 'เช่า' : 'Rent') : (language === 'th' ? 'ขาย' : 'Buy')}
                        </span>
                        {p.virtualTour && (
                          <span className="absolute bottom-1.5 right-1.5 bg-tealPalette-100 text-white text-[8px] font-bold px-1.5 py-0.5 rounded tracking-wide shadow-sm">
                            3D
                          </span>
                        )}
                      </div>

                      {/* Details Column */}
                      <div className="flex flex-col justify-between h-full py-0.5 flex-grow min-w-0">
                        <div className="min-w-0">
                          {/* Price */}
                          <div className="text-tealPalette-300 font-extrabold text-sm md:text-[15px] leading-tight truncate">
                            ฿{p.priceBuy ? p.priceBuy.toLocaleString() : p.priceRent.toLocaleString()}
                          </div>
                          {/* Name */}
                          <h4 className="font-extrabold text-[11px] text-gray-800 line-clamp-1 mt-0.5">
                            {p.name}
                          </h4>
                        </div>

                        {/* Specs & Station */}
                        <div>
                          <div className="flex items-center gap-1 text-[8px] sm:text-[9px] text-gray-500 mb-1">
                            <span className="flex items-center gap-0.5 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-200">
                              <BedDouble className="w-3 h-3 text-orangePalette-200" />
                              <span>{p.bedrooms} {language === 'th' ? 'ห้องนอน' : 'Beds'}</span>
                            </span>
                            <span className="flex items-center gap-0.5 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-200">
                              <Square className="w-2.5 h-2.5 text-orangePalette-200" />
                              <span>{p.size} {language === 'th' ? 'ตร.ม.' : 'Sqm'}</span>
                            </span>
                          </div>

                          {/* Station Badge */}
                          {p.station && (
                            <div className="flex items-center space-x-1 text-[9px] font-bold text-tealPalette-300 truncate">
                              <MapPin className="w-3 h-3 shrink-0 text-red-500" />
                              <span className="truncate">{p.station}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* BLACK SQUARE AREA: GDN Tall Ad Banner on the right */}
            <div className="lg:col-span-1 h-full">
              <a
                href="/"
                className="relative block h-[360px] lg:h-full w-full rounded-3xl overflow-hidden border border-grayPalette-100/10 shadow-2xl hover:shadow-orangePalette-200/10 group transition-all duration-500 hover:scale-[1.01] cursor-pointer animate-fade-in"
              >
                <img
                  src="/stayverse-ad.png"
                  alt="Google Display Network (GDN) Ad"
                  className="w-full h-full object-cover"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 8.9. GUIDEVERSE SECTION */}
      <section className="py-12 bg-gray-50/30 border-b border-gray-100" id="guideverse">
        <div className="max-w-7xl mx-auto px-4 w-full">
          {/* Header */}
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-orangePalette-200">GUIDEVERSE</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0c4a5e] font-sans tracking-wide mt-1">
              {sectionTitleTranslations[language].guideTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Area (Articles + Properties + Testimonials) */}
            <div className="lg:col-span-2 flex flex-col space-y-8">

              {/* Green Box Area: 3-column articles side-by-side */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {guideVerseArticles.map(article => (
                  <div key={article.id} className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 flex flex-col h-full hover:shadow-lg transition-all duration-300 group cursor-pointer">
                    <div className="relative h-40 overflow-hidden bg-gray-100">
                      <img
                        src={article.imageUrl}
                        alt={article.title[language === 'th' ? 'th' : 'en'] || article.title['th']}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[9px] font-extrabold tracking-wider uppercase text-tealPalette-300">
                            {article.category[language === 'th' ? 'th' : 'en'] || article.category['th']}
                          </span>
                        </div>
                        <h4 className="font-bold text-xs md:text-sm text-grayPalette-600 line-clamp-3 group-hover:text-orangePalette-200 transition-colors leading-snug">
                          {article.title[language === 'th' ? 'th' : 'en'] || article.title['th']}
                        </h4>
                        <p className="text-[10px] text-gray-400 font-light mt-1.5 line-clamp-2 leading-relaxed">
                          {article.snippet[language === 'th' ? 'th' : 'en'] || article.snippet['th']}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50 text-[10px]">
                        <span className="text-gray-400 font-light">{article.date}</span>
                        <div className="flex items-center space-x-2">
                          <a href="#" className="text-orangePalette-200 hover:text-orangePalette-300 font-bold flex items-center space-x-0.5">
                            <span>{language === 'th' ? 'อ่านต่อ' : 'Read More'}</span>
                            <ArrowRight className="w-2.5 h-2.5" />
                          </a>
                          <button className="text-gray-400 hover:text-orangePalette-200 p-1" aria-label="Share">
                            <Share2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Red Box Area: 3 properties horizontal */}
              <div className="border-t border-gray-100 pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {guideVerseProperties.map(p => (
                    <div key={p.id} className="bg-white border border-gray-100 rounded-2xl p-2.5 shadow-md flex items-center space-x-3 hover:shadow-lg transition-all duration-300 group h-[116px]">
                      {/* Thumbnail image and status badge */}
                      <div className="relative w-28 h-full shrink-0 rounded-xl overflow-hidden bg-gray-100">
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-1.5 left-1.5 bg-[#ff5a2c] text-white text-[8px] font-black px-1.5 py-0.5 rounded-md uppercase tracking-wider">
                          {p.status === 'rent' ? (language === 'th' ? 'เช่า' : 'Rent') : (language === 'th' ? 'ขาย' : 'Buy')}
                        </span>
                        {p.virtualTour && (
                          <span className="absolute bottom-1.5 right-1.5 bg-tealPalette-100 text-white text-[8px] font-bold px-1.5 py-0.5 rounded tracking-wide shadow-sm">
                            3D
                          </span>
                        )}
                      </div>

                      {/* Details Column */}
                      <div className="flex flex-col justify-between h-full py-0.5 flex-grow min-w-0">
                        <div className="min-w-0">
                          {/* Price */}
                          <div className="text-tealPalette-300 font-extrabold text-sm md:text-[15px] leading-tight truncate">
                            ฿{p.priceBuy ? p.priceBuy.toLocaleString() : p.priceRent.toLocaleString()}
                          </div>
                          {/* Name */}
                          <h4 className="font-extrabold text-[11px] text-gray-800 line-clamp-1 mt-0.5">
                            {p.name}
                          </h4>
                        </div>

                        {/* Specs & Station */}
                        <div>
                          <div className="flex items-center gap-1 text-[8px] sm:text-[9px] text-gray-500 mb-1">
                            <span className="flex items-center gap-0.5 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-200">
                              <BedDouble className="w-3 h-3 text-orangePalette-200" />
                              <span>{p.bedrooms} {language === 'th' ? 'ห้องนอน' : 'Beds'}</span>
                            </span>
                            <span className="flex items-center gap-0.5 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-200">
                              <Square className="w-2.5 h-2.5 text-orangePalette-200" />
                              <span>{p.size} {language === 'th' ? 'ตร.ม.' : 'Sqm'}</span>
                            </span>
                          </div>

                          {/* Station Badge */}
                          {p.station && (
                            <div className="flex items-center space-x-1 text-[9px] font-bold text-tealPalette-300 truncate">
                              <MapPin className="w-3 h-3 shrink-0 text-red-500" />
                              <span className="truncate">{p.station}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Yellow Box Area: Testimonials block with dark background */}
              <div className="bg-[#154e5c] rounded-3xl p-6 md:p-8 border border-white/5 shadow-2xl flex flex-col space-y-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orangePalette-200">
                    {sectionTitleTranslations[language].reviewSubtitle}
                  </span>
                  <h3 className="text-xl md:text-2xl font-extrabold text-white font-sans mt-1">
                    {sectionTitleTranslations[language].reviewTitle}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Testimonial 1 */}
                  <div className="bg-white/5 border border-white/10 hover:border-orangePalette-200/50 hover:bg-white/10 transition-all duration-300 rounded-2xl p-5 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <p className="text-xs text-gray-300 font-light leading-relaxed italic">
                        "{language === 'th'
                          ? 'ประทับใจบริการของ Stayverse มากครับ ให้คำแนะนำอย่างละเอียดและช่วยเดินเรื่องสินเชื่อกับธนาคารจนผ่านฉลุย ได้บ้านหรูในฝันตามที่ต้องการจริงๆ'
                          : 'Very impressed with Stayverse\'s service. They gave detailed advice and helped with the bank loan process until it was approved. Truly got my dream luxury home.'
                        }"
                      </p>
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-white">
                        {language === 'th' ? 'คุณกิตติศักดิ์ พลอยดี' : 'Kittisak Ploydee'}
                      </h5>
                      <p className="text-[10px] text-orangePalette-100">
                        {language === 'th' ? 'ผู้ซื้อโครงการ เดอะ เรสซิเดนซ์ 38' : 'Buyer of The Residences 38'}
                      </p>
                    </div>
                  </div>

                  {/* Testimonial 2 */}
                  <div className="bg-white/5 border border-white/10 hover:border-orangePalette-200/50 hover:bg-white/10 transition-all duration-300 rounded-2xl p-5 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <p className="text-xs text-gray-300 font-light leading-relaxed italic">
                        "{language === 'th'
                          ? 'หาเช่าคอนโดผ่านระบบออนไลน์สะดวกมาก เจ้าหน้าที่ดูแลใส่ใจและช่วยประสานงานกับเจ้าของห้องได้รวดเร็ว แนะนำเลยค่ะ!'
                          : 'Finding a condo online was extremely convenient. The staff was very attentive and coordinated with the owner quickly. Highly recommended!'
                        }"
                      </p>
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-white">
                        Mrs. Sarah Jenkins
                      </h5>
                      <p className="text-[10px] text-orangePalette-100">
                        {language === 'th' ? 'ผู้เช่าโครงการ แอชตัน อโศก - พระราม 9' : 'Tenant at Ashton Asoke - Rama 9'}
                      </p>
                    </div>
                  </div>

                  {/* Testimonial 3 */}
                  <div className="bg-white/5 border border-white/10 hover:border-orangePalette-200/50 hover:bg-white/10 transition-all duration-300 rounded-2xl p-5 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <p className="text-xs text-gray-300 font-light leading-relaxed italic">
                        "{language === 'th'
                          ? 'ฝากขายห้องกับ Stayverse ไม่ผิดหวังเลยค่ะ ทำการตลาดให้ดีมากและปิดการขายได้ภายในเวลาเพียง 2 เดือนเท่านั้น มืออาชีพสุดๆ'
                          : 'Listing my room with Stayverse was the right choice. They did great marketing and closed the sale within just 2 months. Extremely professional.'
                        }"
                      </p>
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-white">
                        {language === 'th' ? 'คุณมลฤดี ศิริวัฒน์' : 'Monrudee Siriwat'}
                      </h5>
                      <p className="text-[10px] text-orangePalette-100">
                        {language === 'th' ? 'เจ้าของฝากขายโครงการ ดิ เอส อโศก' : 'Seller of The Esse Asoke'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Blue Box Area: Tall Advisory Banner */}
            <div className="lg:col-span-1 h-full">
              <a
                href="/"
                className="relative block h-[450px] lg:h-full w-full rounded-3xl overflow-hidden border border-grayPalette-100/10 shadow-2xl hover:shadow-orangePalette-200/10 group transition-all duration-500 hover:scale-[1.01] cursor-pointer animate-fade-in"
              >
                <img
                  src="/stayverse-ad.png"
                  alt="Stayverse Advisory Premium Luxury Living"
                  className="w-full h-full object-cover"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. REAL ESTATE SMART CALCULATORS SECTION */}
      <section className="py-16 bg-white border-y border-grayPalette-100" id="calculators">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#0c4a5e] font-sans">
              {t.calculators}
            </h2>
            <p className="text-grayPalette-200 text-sm mt-2">
              Empower your real estate investments with calculations aligned with Thai banking and land tax frameworks.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Calculator Tabs */}
            <div className="lg:col-span-3 flex flex-col space-y-2 bg-gray-50 p-2 rounded-2xl border border-gray-100">
              <button
                onClick={() => setActiveCalcTab('mortgage')}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold flex items-center space-x-3 transition-all cursor-pointer ${activeCalcTab === 'mortgage' ? 'bg-orangePalette-200 text-white shadow-md' : 'text-grayPalette-300 hover:bg-gray-100'}`}
              >
                <Calculator className="w-5 h-5" />
                <span>{t.mortgageCalc}</span>
              </button>
              <button
                onClick={() => setActiveCalcTab('principal')}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold flex items-center space-x-3 transition-all cursor-pointer ${activeCalcTab === 'principal' ? 'bg-orangePalette-200 text-white shadow-md' : 'text-grayPalette-300 hover:bg-gray-100'}`}
              >
                <ShieldCheck className="w-5 h-5" />
                <span>{t.principalCalc}</span>
              </button>
              <button
                onClick={() => setActiveCalcTab('transfer')}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold flex items-center space-x-3 transition-all cursor-pointer ${activeCalcTab === 'transfer' ? 'bg-orangePalette-200 text-white shadow-md' : 'text-grayPalette-300 hover:bg-gray-100'}`}
              >
                <Landmark className="w-5 h-5" />
                <span>{t.transferCalc}</span>
              </button>
              <button
                onClick={() => setActiveCalcTab('yield')}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold flex items-center space-x-3 transition-all cursor-pointer ${activeCalcTab === 'yield' ? 'bg-orangePalette-200 text-white shadow-md' : 'text-grayPalette-300 hover:bg-gray-100'}`}
              >
                <Percent className="w-5 h-5" />
                <span>{t.yieldCalc}</span>
              </button>
            </div>

            {/* Right Interactive Inputs and Outputs Panel */}
            <div className="lg:col-span-9 bg-gray-50 rounded-3xl p-6 md:p-8 border border-gray-100 shadow-inner grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* Tab 1: Mortgage Calculator */}
              {activeCalcTab === 'mortgage' && (
                <>
                  {/* Inputs */}
                  <div className="space-y-5">
                    <h3 className="font-extrabold text-lg text-grayPalette-500 uppercase tracking-wide border-b border-gray-200 pb-2">{t.mortgageCalc}</h3>

                    <div className="flex flex-col">
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span>{t.propPrice}</span>
                        <span className="text-orangePalette-200">฿{formatCurrency(mPrice)}</span>
                      </div>
                      <input
                        type="range" min="1000000" max="50000000" step="100000"
                        value={mPrice} onChange={(e) => setMPrice(Number(e.target.value))}
                        className="w-full accent-orangePalette-200 cursor-pointer"
                      />
                      <input
                        type="number" value={mPrice} onChange={(e) => setMPrice(Number(e.target.value))}
                        className="mt-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-semibold"
                      />
                    </div>

                    <div className="flex flex-col">
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span>{t.downPayment} (%)</span>
                        <span className="text-orangePalette-200">{mDown}% (฿{formatCurrency(mPrice * mDown / 100)})</span>
                      </div>
                      <input
                        type="range" min="0" max="80" step="5"
                        value={mDown} onChange={(e) => setMDown(Number(e.target.value))}
                        className="w-full accent-orangePalette-200 cursor-pointer"
                      />
                    </div>

                    <div className="flex flex-col">
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span>{t.interestRate}</span>
                        <span className="text-orangePalette-200">{mRate}%</span>
                      </div>
                      <input
                        type="range" min="1" max="15" step="0.1"
                        value={mRate} onChange={(e) => setMRate(Number(e.target.value))}
                        className="w-full accent-orangePalette-200 cursor-pointer"
                      />
                    </div>

                    <div className="flex flex-col">
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span>{t.loanTerm}</span>
                        <span className="text-orangePalette-200">{mTerm} Years</span>
                      </div>
                      <input
                        type="range" min="5" max="40" step="1"
                        value={mTerm} onChange={(e) => setMTerm(Number(e.target.value))}
                        className="w-full accent-orangePalette-200 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Outputs */}
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col justify-between shadow-sm">
                    <div className="space-y-4">
                      <h4 className="text-xs uppercase tracking-widest text-gray-400 font-bold">Estimated Outlay</h4>

                      <div className="border-b border-gray-50 pb-3">
                        <p className="text-xs text-gray-400 font-semibold">{t.monthlyPayment}</p>
                        <p className="text-3xl font-black text-gradient">฿{formatCurrency(mortgagePayment)}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-400 font-semibold">Loan Amount</p>
                          <p className="text-sm font-extrabold text-grayPalette-500">฿{formatCurrency(loanAmt)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 font-semibold">{t.totalInterest}</p>
                          <p className="text-sm font-extrabold text-orangePalette-300">฿{formatCurrency(totalMInterest)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-gray-100 text-xs text-gray-400 leading-relaxed bg-orangePalette-50/50 p-3 rounded-lg border border-orangePalette-50">
                      <strong>Calculated based on standard LTV guidelines:</strong> Monthly installment is estimated on a fixed rate. Actual bank terms may include floating rates MRR/MLR.
                    </div>
                  </div>
                </>
              )}

              {/* Tab 2: Borrowing Power Calculator */}
              {activeCalcTab === 'principal' && (
                <>
                  {/* Inputs */}
                  <div className="space-y-5">
                    <h3 className="font-extrabold text-lg text-grayPalette-500 uppercase tracking-wide border-b border-gray-200 pb-2">{t.principalCalc}</h3>

                    <div className="flex flex-col">
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span>Net Monthly Income</span>
                        <span className="text-orangePalette-200">฿{formatCurrency(pIncome)}</span>
                      </div>
                      <input
                        type="range" min="15000" max="300000" step="5000"
                        value={pIncome} onChange={(e) => setPIncome(Number(e.target.value))}
                        className="w-full accent-orangePalette-200 cursor-pointer"
                      />
                    </div>

                    <div className="flex flex-col">
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span>Existing Monthly Debts</span>
                        <span className="text-orangePalette-200">฿{formatCurrency(pDebts)}</span>
                      </div>
                      <input
                        type="range" min="0" max="100000" step="1000"
                        value={pDebts} onChange={(e) => setPDebts(Number(e.target.value))}
                        className="w-full accent-orangePalette-200 cursor-pointer"
                      />
                    </div>

                    <div className="flex flex-col">
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span>Interest Rate</span>
                        <span className="text-orangePalette-200">{pRate}%</span>
                      </div>
                      <input
                        type="range" min="1.0" max="12" step="0.1"
                        value={pRate} onChange={(e) => setPRate(Number(e.target.value))}
                        className="w-full accent-orangePalette-200 cursor-pointer"
                      />
                    </div>

                    <div className="flex flex-col">
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span>Loan Term</span>
                        <span className="text-orangePalette-200">{pTerm} Years</span>
                      </div>
                      <input
                        type="range" min="5" max="40" step="1"
                        value={pTerm} onChange={(e) => setPTerm(Number(e.target.value))}
                        className="w-full accent-orangePalette-200 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Outputs */}
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col justify-between shadow-sm">
                    <div className="space-y-4">
                      <h4 className="text-xs uppercase tracking-widest text-gray-400 font-bold">Estimated Purchasing Power</h4>

                      <div className="border-b border-gray-50 pb-3">
                        <p className="text-xs text-gray-400 font-semibold">Max Loan Available</p>
                        <p className="text-3xl font-black text-gradient">฿{formatCurrency(maxLoanAmt)}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-400 font-semibold">Max Target Home Price</p>
                          <p className="text-sm font-extrabold text-grayPalette-500">฿{formatCurrency(maxAffordableHomePrice)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 font-semibold">Max Monthly Installment</p>
                          <p className="text-sm font-extrabold text-orangePalette-300">฿{formatCurrency(maxMonthlyDebtService)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-gray-100 text-xs text-gray-400 leading-relaxed bg-tealPalette-50/50 p-3 rounded-lg border border-tealPalette-50">
                      <strong>Calculated on 40% Debt Service Ratio:</strong> Most Thai commercial banks limit total debt service to 40% of net salary, minus existing auto/card loan debts.
                    </div>
                  </div>
                </>
              )}

              {/* Tab 3: Transfer Fees Calculator */}
              {activeCalcTab === 'transfer' && (
                <>
                  {/* Inputs */}
                  <div className="space-y-5">
                    <h3 className="font-extrabold text-lg text-grayPalette-500 uppercase tracking-wide border-b border-gray-200 pb-2">{t.transferCalc}</h3>

                    <div className="flex flex-col">
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span>Sale / Agreement Price</span>
                        <span className="text-orangePalette-200">฿{formatCurrency(tSalePrice)}</span>
                      </div>
                      <input
                        type="range" min="1000000" max="30000000" step="100000"
                        value={tSalePrice} onChange={(e) => setTSalePrice(Number(e.target.value))}
                        className="w-full accent-orangePalette-200 cursor-pointer"
                      />
                    </div>

                    <div className="flex flex-col">
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span>Official Appraisal Value</span>
                        <span className="text-orangePalette-200">฿{formatCurrency(tAppraisal)}</span>
                      </div>
                      <input
                        type="range" min="1000000" max="30000000" step="100000"
                        value={tAppraisal} onChange={(e) => setTAppraisal(Number(e.target.value))}
                        className="w-full accent-orangePalette-200 cursor-pointer"
                      />
                    </div>

                    <div className="flex flex-col">
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span>Years Owned by Seller</span>
                        <span className="text-orangePalette-200">{tYearsOwned} Years {sbtApplies ? '(SBT applies)' : '(Stamp duty applies)'}</span>
                      </div>
                      <input
                        type="range" min="1" max="10" step="1"
                        value={tYearsOwned} onChange={(e) => setTYearsOwned(Number(e.target.value))}
                        className="w-full accent-orangePalette-200 cursor-pointer"
                      />
                    </div>

                    <div className="flex items-center space-x-3 pt-2">
                      <input
                        type="checkbox" id="splitFee" checked={tSplitFee}
                        onChange={(e) => setTSplitFee(e.target.checked)}
                        className="w-4 h-4 accent-orangePalette-200"
                      />
                      <label htmlFor="splitFee" className="text-xs font-semibold text-gray-600">Split 2% Transfer Fee 50/50 between Buyer & Seller</label>
                    </div>
                  </div>

                  {/* Outputs */}
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col justify-between shadow-sm">
                    <div className="space-y-4">
                      <h4 className="text-xs uppercase tracking-widest text-gray-400 font-bold">Closing Fees Summary</h4>

                      <div className="border-b border-gray-50 pb-3 flex justify-between items-baseline">
                        <div>
                          <p className="text-xs text-gray-400 font-semibold">Total Buyer Fees</p>
                          <p className="text-2xl font-black text-gradient">฿{formatCurrency(totalBuyerClosingCost)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-400 font-semibold">Total Seller Fees</p>
                          <p className="text-2xl font-black text-grayPalette-500">฿{formatCurrency(totalSellerClosingCost)}</p>
                        </div>
                      </div>

                      <div className="space-y-1.5 text-xs text-gray-600">
                        <div className="flex justify-between">
                          <span>Total 2% Transfer Fee:</span>
                          <span className="font-semibold">฿{formatCurrency(transferFeeTotal)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Specific Business Tax (3.3%):</span>
                          <span className="font-semibold">฿{formatCurrency(specificBusinessTax)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Stamp Duty (0.5%):</span>
                          <span className="font-semibold">฿{formatCurrency(stampDuty)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Estimated Withholding Tax:</span>
                          <span className="font-semibold">฿{formatCurrency(withholdingTax)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-3 border-t border-gray-100 text-[11px] text-gray-400 leading-relaxed bg-orangePalette-50/50 p-2.5 rounded">
                      Specific Business Tax is waived if ownership exceeds 5 years or the seller’s name is registered on the Tabien Baan (House Registration) for over 1 year.
                    </div>
                  </div>
                </>
              )}

              {/* Tab 4: Rental Yields Calculator */}
              {activeCalcTab === 'yield' && (
                <>
                  {/* Inputs */}
                  <div className="space-y-5">
                    <h3 className="font-extrabold text-lg text-grayPalette-500 uppercase tracking-wide border-b border-gray-200 pb-2">{t.yieldCalc}</h3>

                    <div className="flex flex-col">
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span>Property Purchase Price</span>
                        <span className="text-orangePalette-200">฿{formatCurrency(yPrice)}</span>
                      </div>
                      <input
                        type="range" min="1000000" max="30000000" step="100000"
                        value={yPrice} onChange={(e) => setYPrice(Number(e.target.value))}
                        className="w-full accent-orangePalette-200 cursor-pointer"
                      />
                    </div>

                    <div className="flex flex-col">
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span>{t.monthlyRent}</span>
                        <span className="text-orangePalette-200">฿{formatCurrency(yRent)} / mo</span>
                      </div>
                      <input
                        type="range" min="5000" max="150000" step="1000"
                        value={yRent} onChange={(e) => setYRent(Number(e.target.value))}
                        className="w-full accent-orangePalette-200 cursor-pointer"
                      />
                    </div>

                    <div className="flex flex-col">
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span>{t.annualFee} (ส่วนกลาง)</span>
                        <span className="text-orangePalette-200">฿{formatCurrency(yCommon)} / year</span>
                      </div>
                      <input
                        type="range" min="0" max="100000" step="1000"
                        value={yCommon} onChange={(e) => setYCommon(Number(e.target.value))}
                        className="w-full accent-orangePalette-200 cursor-pointer"
                      />
                    </div>

                    <div className="flex flex-col">
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span>Other Annual Maintenance Fees</span>
                        <span className="text-orangePalette-200">฿{formatCurrency(yExpense)} / year</span>
                      </div>
                      <input
                        type="range" min="0" max="50000" step="1000"
                        value={yExpense} onChange={(e) => setYExpense(Number(e.target.value))}
                        className="w-full accent-orangePalette-200 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Outputs */}
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col justify-between shadow-sm">
                    <div className="space-y-4">
                      <h4 className="text-xs uppercase tracking-widest text-gray-400 font-bold">Yield Projections</h4>

                      <div className="border-b border-gray-50 pb-3">
                        <p className="text-xs text-gray-400 font-semibold">{t.grossYield}</p>
                        <p className="text-3xl font-black text-gradient-teal">{calculatedGrossYield.toFixed(2)}%</p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-400 font-semibold">{t.netYield}</p>
                        <p className="text-xl font-bold text-grayPalette-500">{calculatedNetYield.toFixed(2)}%</p>
                      </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-gray-100 text-xs text-gray-400 leading-relaxed bg-tealPalette-50/50 p-3 rounded-lg border border-tealPalette-50">
                      <strong>Yield benchmark indicators:</strong> In Bangkok, prime condos near transit typically average between 4.0% to 5.5% gross yield.
                    </div>
                  </div>
                </>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* 7. HIGH-END WIDGETS SECTION */}
      <section className="py-16 max-w-7xl mx-auto px-4 w-full grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Statistics & Analytics widget (Left) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 border border-grayPalette-100 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2.5 mb-6">
              <div className="p-2.5 bg-orangePalette-50 rounded-xl text-orangePalette-200">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-lg md:text-xl font-extrabold text-grayPalette-600 font-sans uppercase tracking-wider">{t.statistics}</h3>
            </div>

            <div className="space-y-4 text-xs md:text-sm text-gray-600">
              <div className="flex justify-between items-center py-2.5 border-b border-gray-100">
                <span className="font-semibold text-grayPalette-300">Bangkok Condo Price Index</span>
                <span className="font-bold text-tealPalette-300 flex items-center space-x-1">
                  <span>+3.8% Y-o-Y</span>
                </span>
              </div>

              <div className="flex justify-between items-center py-2.5 border-b border-gray-100">
                <span className="font-semibold text-grayPalette-300">Transit Condo Premium Ratio</span>
                <span className="font-bold text-grayPalette-500">1.25x vs non-transit</span>
              </div>

              <div className="flex justify-between items-center py-2.5 border-b border-gray-100">
                <span className="font-semibold text-grayPalette-300">Foreign Quota Availability (Thonglor)</span>
                <span className="font-bold text-orangePalette-300">Medium Demand (Avg 42% filled)</span>
              </div>

              <div className="flex justify-between items-center py-2.5 border-b border-gray-100">
                <span className="font-semibold text-grayPalette-300">LTV Borrowing Margin</span>
                <span className="font-bold text-gray-500">90% - 100% (First Home)</span>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-grayPalette-50 rounded-2xl flex items-center justify-between border border-grayPalette-100">
            <div className="text-xs text-gray-400 pr-4">
              Detailed market reports compiled by Stayverse Research Group, updated May 2026.
            </div>
            <a href="#" className="flex items-center space-x-1.5 text-xs font-bold text-orangePalette-200 hover:text-orangePalette-300 shrink-0">
              <span>View Report</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Daily Interest Rates widget (Right) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 md:p-8 border border-grayPalette-100 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2.5 mb-6">
              <div className="p-2.5 bg-tealPalette-50 rounded-xl text-tealPalette-300">
                <Percent className="w-5 h-5" />
              </div>
              <h3 className="text-lg md:text-xl font-extrabold text-grayPalette-600 font-sans uppercase tracking-wider">{t.dailyRates}</h3>
            </div>

            <div className="space-y-4">
              {/* Bank 1 */}
              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100/50">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                    KB
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-gray-800">Kasikornbank (KBank)</h4>
                    <p className="text-[10px] text-gray-400">Fixed first 3 years</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-emerald-600">3.85%</p>
                  <p className="text-[9px] text-gray-400">MRR - 2.50%</p>
                </div>
              </div>

              {/* Bank 2 */}
              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100/50">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-purple-700 text-white flex items-center justify-center font-bold text-xs">
                    SCB
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-gray-800">Siam Commercial Bank</h4>
                    <p className="text-[10px] text-gray-400">Special Refinance Package</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-purple-700">3.90%</p>
                  <p className="text-[9px] text-gray-400">MRR - 2.45%</p>
                </div>
              </div>

              {/* Bank 3 */}
              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100/50">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-800 text-white flex items-center justify-center font-bold text-xs">
                    BBL
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-gray-800">Bangkok Bank</h4>
                    <p className="text-[10px] text-gray-400">Exclusive Developer Partner</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-blue-800">3.65%</p>
                  <p className="text-[9px] text-gray-400">MRR - 2.70%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-[11px] text-gray-400 leading-relaxed">
            * Rates are indicative. Final rates depend on applicant credit profiles and developer agreements. All banks listed are authorized under the Bank of Thailand.
          </div>
        </div>

      </section>

      {/* 9. CONTACT FORM SECTION */}
      <section className="py-16 max-w-3xl mx-auto px-4 w-full text-grayPalette-500" id="contact">
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-grayPalette-100 shadow-xl space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-extrabold text-grayPalette-600 font-sans uppercase tracking-wider">{contactFormTranslations[language].title}</h3>
            <p className="text-sm text-gray-400 mt-1.5">{contactFormTranslations[language].subtitle}</p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-xs font-semibold text-gray-400 mb-1">{contactFormTranslations[language].fullName}</label>
                <input type="text" className="px-3 py-2 bg-grayPalette-50 border border-grayPalette-100 rounded-xl text-sm focus:outline-none focus:border-orangePalette-200" required />
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-semibold text-gray-400 mb-1">{contactFormTranslations[language].phone}</label>
                <input type="tel" className="px-3 py-2 bg-grayPalette-50 border border-grayPalette-100 rounded-xl text-sm focus:outline-none focus:border-orangePalette-200" required />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-semibold text-gray-400 mb-1">{contactFormTranslations[language].email}</label>
              <input type="email" className="px-3 py-2 bg-grayPalette-50 border border-grayPalette-100 rounded-xl text-sm focus:outline-none focus:border-orangePalette-200" required />
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-semibold text-gray-400 mb-1">{contactFormTranslations[language].message}</label>
              <textarea rows={4} className="px-3 py-2 bg-grayPalette-50 border border-grayPalette-100 rounded-xl text-sm focus:outline-none focus:border-orangePalette-200" placeholder={contactFormTranslations[language].placeholder} required></textarea>
            </div>

            <button type="submit" className="w-full py-3 bg-orangePalette-200 hover:bg-orangePalette-300 text-white font-bold rounded-xl text-sm uppercase tracking-wider shadow-lg shadow-orangePalette-200/20 transition-all duration-300 cursor-pointer">
              {contactFormTranslations[language].submitBtn}
            </button>
          </form>
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
            <p className="text-xs text-grayPalette-100 leading-relaxed">
              {t.footerDesc}
            </p>
            <div className="flex items-center space-x-3 text-grayPalette-100">
              <span className="p-2 bg-white/5 rounded-full hover:bg-orangePalette-200 transition-all cursor-pointer"><Star className="w-4 h-4 text-orangePalette-200" /></span>
              <span className="p-2 bg-white/5 rounded-full hover:bg-orangePalette-200 transition-all cursor-pointer"><Heart className="w-4 h-4 text-orangePalette-200" /></span>
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-orangePalette-200">Quick Links</h4>
            <div className="flex flex-col space-y-2 text-xs text-grayPalette-100">
              <a href="#search-engine" className="hover:text-orangePalette-200 transition-all">Search Engine</a>
              <a href="#properties" className="hover:text-orangePalette-200 transition-all">Premium Listings</a>
              <a href="#calculators" className="hover:text-orangePalette-200 transition-all">Interactive Calculators</a>
              <a href="#contact" className="hover:text-orangePalette-200 transition-all">Get in Touch</a>
            </div>
          </div>

          {/* Col 3 */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-orangePalette-200">Properties</h4>
            <div className="flex flex-col space-y-2 text-xs text-grayPalette-100">
              <a href="#properties" className="hover:text-orangePalette-200 transition-all">{t.condo}</a>
              <a href="#properties" className="hover:text-orangePalette-200 transition-all">{t.house}</a>
              <a href="#properties" className="hover:text-orangePalette-200 transition-all">{t.villa}</a>
              <a href="#properties" className="hover:text-orangePalette-200 transition-all">{t.townhome}</a>
            </div>
          </div>

          {/* Col 4 */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-orangePalette-200">Advisory Head Office</h4>
            <div className="text-xs text-grayPalette-100 space-y-2">
              <p>Stayverse Real Estate Co., Ltd.</p>
              <p>Level 28, Exchange Tower, Sukhumvit Road,</p>
              <p>Khlong Toei, Bangkok 10110, Thailand</p>
              <p className="pt-2">Tel: +66 2 056 2333</p>
              <p>Email: info@stayverse.com</p>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 w-full pt-8 border-t border-white/5 flex flex-wrap justify-between items-center gap-4 text-xs text-grayPalette-200">
          <p>{t.rightsReserved}</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-orangePalette-200 transition-all">Terms of Service</a>
            <a href="#" className="hover:text-orangePalette-200 transition-all">{t.privacyPolicy}</a>
            <a href="#" className="hover:text-orangePalette-200 transition-all">Sitemap</a>
          </div>
        </div>
      </footer>

      {/* Lightbox Modal */}
      {selectedInfographic && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md transition-all duration-300 p-4 cursor-zoom-out"
          onClick={() => setSelectedInfographic(null)}
        >
          <div className="absolute top-4 right-4 z-[110]">
            <button
              className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-200 cursor-pointer border border-white/10 focus:outline-none"
              onClick={() => setSelectedInfographic(null)}
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div
            className="relative max-w-[95vw] max-h-[90vh] flex items-center justify-center p-2"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image itself
          >
            <img
              src={selectedInfographic}
              alt="Full Size Infographic"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-white/10 select-none"
            />
          </div>
        </div>
      )}
    </div>
  );
}
