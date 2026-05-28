'use client';

import React, { useState } from 'react';
import { useTranslation, Language } from '@/context/LanguageContext';
import { Menu, X, ChevronDown, Search, Star, Heart, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  th: { home: 'หน้าแรก', rentToOwn: 'เช่าออมห้อง', monthlyRent: 'เช่าสบายจ่ายรายเดือน', sellWithTenant: 'ขายพร้อมผู้เช่า' },
  en: { home: 'Home', rentToOwn: 'Rent to Own', monthlyRent: 'Monthly Rent', sellWithTenant: 'Sell with Tenant' },
  ru: { home: 'Главная', rentToOwn: 'Аренда с выкупом', monthlyRent: 'Аренда на месяц', sellWithTenant: 'Продажа с арендатором' },
  zh: { home: '首页', rentToOwn: '租房存款', monthlyRent: '舒适月租', sellWithTenant: '带租客出售' },
  ja: { home: 'ホーム', rentToOwn: '賃貸からの購入', monthlyRent: '月額賃貸', sellWithTenant: 'オーナーチェンジ物件' },
  ko: { home: '홈', rentToOwn: '임대 후 구매', monthlyRent: '월세 임대', sellWithTenant: '세입자 안고 매매' }
};

const packageTranslations: Record<Language, any> = {
  en: {
    title: 'FIND YOUR PERFECT PLAN',
    subtitle: 'SaaS + Transaction Commission',
    starter: 'STARTER',
    starterPrice: '฿2,900',
    starterDesc: '/ month · Up to 10 active listings',
    starterFeatures: [
      'Basic listing & contract tools',
      'Email support (48h response)',
      'Monthly performance report',
      'Standard contract templates'
    ],
    pro: 'PROFESSIONAL',
    proPrice: '฿7,900',
    proDesc: '/ month · Up to 50 active listings',
    proFeatures: [
      'Priority listing placement',
      'API & system integration',
      'Dedicated account manager',
      'Real-time analytics dashboard'
    ],
    enterprise: 'ENTERPRISE',
    enterprisePrice: '฿19,900',
    enterpriseDesc: '/ month · Unlimited listings',
    enterpriseFeatures: [
      'White-label branding option',
      'Custom contract structures',
      '24/7 priority support hotline',
      'Bulk management & API access'
    ],
    footerNote: '+1.5 - 5% Transaction Commission on every Rent-to-Own contract executed — paid by developer at contract signing'
  },
  th: {
    title: 'ค้นหาแผนที่เหมาะสมกับคุณ',
    subtitle: 'SaaS + ค่าคอมมิชชั่นจากธุรกรรม',
    starter: 'เริ่มต้น',
    starterPrice: '฿2,900',
    starterDesc: '/ เดือน · ลงประกาศได้สูงสุด 10 รายการ',
    starterFeatures: [
      'เครื่องมือลงประกาศและสัญญาพื้นฐาน',
      'สนับสนุนทางอีเมล (ตอบกลับใน 48 ชม.)',
      'รายงานประสิทธิภาพรายเดือน',
      'เทมเพลตสัญญามาตรฐาน'
    ],
    pro: 'มืออาชีพ',
    proPrice: '฿7,900',
    proDesc: '/ เดือน · ลงประกาศได้สูงสุด 50 รายการ',
    proFeatures: [
      'จัดอันดับประกาศพิเศษ',
      'การเชื่อมต่อ API และระบบ',
      'ผู้จัดการบัญชีส่วนตัว',
      'แดชบอร์ดการวิเคราะห์แบบเรียลไทม์'
    ],
    enterprise: 'องค์กร',
    enterprisePrice: '฿19,900',
    enterpriseDesc: '/ เดือน · ลงประกาศไม่จำกัด',
    enterpriseFeatures: [
      'ตัวเลือกการสร้างแบรนด์ White-label',
      'โครงสร้างสัญญาที่ปรับแต่งได้',
      'สายด่วนสนับสนุนพิเศษตลอด 24 ชม.',
      'การจัดการจำนวนมากและการเข้าถึง API'
    ],
    footerNote: '+1.5 - 5% ค่าคอมมิชชั่นจากธุรกรรม สำหรับทุกสัญญา Rent-to-Own ที่ดำเนินการ — จ่ายโดยผู้พัฒนาเมื่อเซ็นสัญญา'
  },
  ru: {
    title: 'НАЙДИТЕ СВОЙ ИДЕАЛЬНЫЙ ПЛАН',
    subtitle: 'SaaS + Комиссия за транзакцию',
    starter: 'СТАРТОВЫЙ',
    starterPrice: '฿2,900',
    starterDesc: '/ месяц · До 10 активных объявлений',
    starterFeatures: [
      'Базовые инструменты объявлений и контрактов',
      'Поддержка по email (ответ за 48ч)',
      'Ежемесячный отчет об эффективности',
      'Стандартные шаблоны контрактов'
    ],
    pro: 'ПРОФЕССИОНАЛЬНЫЙ',
    proPrice: '฿7,900',
    proDesc: '/ месяц · До 50 активных объявлений',
    proFeatures: [
      'Приоритетное размещение объявлений',
      'Интеграция API и систем',
      'Персональный менеджер',
      'Панель аналитики в реальном времени'
    ],
    enterprise: 'КОРПОРАТИВНЫЙ',
    enterprisePrice: '฿19,900',
    enterpriseDesc: '/ месяц · Неограниченное количество объявлений',
    enterpriseFeatures: [
      'Опция White-label брендинга',
      'Индивидуальные структуры контрактов',
      'Круглосуточная приоритетная поддержка',
      'Массовое управление и доступ к API'
    ],
    footerNote: '+1.5 - 5% Комиссия за транзакцию с каждого заключенного контракта Rent-to-Own — оплачивается застройщиком при подписании'
  },
  zh: {
    title: '寻找完美的计划',
    subtitle: 'SaaS + 交易佣金',
    starter: '入门版',
    starterPrice: '฿2,900',
    starterDesc: '/ 月 · 最多 10 个有效房源',
    starterFeatures: [
      '基本房源和合同工具',
      '电子邮件支持（48小时回复）',
      '每月绩效报告',
      '标准合同模板'
    ],
    pro: '专业版',
    proPrice: '฿7,900',
    proDesc: '/ 月 · 最多 50 个有效房源',
    proFeatures: [
      '优先房源展示',
      'API及系统集成',
      '专属客户经理',
      '实时数据分析面板'
    ],
    enterprise: '企业版',
    enterprisePrice: '฿19,900',
    enterpriseDesc: '/ 月 · 无限制房源',
    enterpriseFeatures: [
      '白标品牌选项',
      '自定义合同结构',
      '24/7 优先支持热线',
      '批量管理及 API 访问'
    ],
    footerNote: '+1.5 - 5% 交易佣金（每笔签订的先租后买合同）— 由开发商在签订合同时支付'
  },
  ja: {
    title: '最適なプランを見つける',
    subtitle: 'SaaS + 取引手数料',
    starter: 'スターター',
    starterPrice: '฿2,900',
    starterDesc: '/ 月 · 最大10件のアクティブなリスティング',
    starterFeatures: [
      '基本的なリスティングと契約ツール',
      'メールサポート（48時間以内返信）',
      '月間パフォーマンスレポート',
      '標準的な契約テンプレート'
    ],
    pro: 'プロフェッショナル',
    proPrice: '฿7,900',
    proDesc: '/ 月 · 最大50件のアクティブなリスティング',
    proFeatures: [
      '優先的なリスティング配置',
      'APIとシステムの統合',
      '専任アカウントマネージャー',
      'リアルタイム分析ダッシュボード'
    ],
    enterprise: 'エンタープライズ',
    enterprisePrice: '฿19,900',
    enterpriseDesc: '/ 月 · 無制限のリスティング',
    enterpriseFeatures: [
      'ホワイトラベルブランディングオプション',
      'カスタム契約構造',
      '24時間年中無休の優先サポートホットライン',
      '一括管理とAPIアクセス'
    ],
    footerNote: '+1.5 - 5% 実行されたすべてのRent-to-Own契約に対する取引手数料 — 契約署名時に開発者が支払い'
  },
  ko: {
    title: '완벽한 플랜 찾기',
    subtitle: 'SaaS + 거래 수수료',
    starter: '스타터',
    starterPrice: '฿2,900',
    starterDesc: '/ 월 · 최대 10개의 활성 리스팅',
    starterFeatures: [
      '기본 리스팅 및 계약 도구',
      '이메일 지원(48시간 내 응답)',
      '월간 실적 보고서',
      '표준 계약 템플릿'
    ],
    pro: '프로페셔널',
    proPrice: '฿7,900',
    proDesc: '/ 월 · 최대 50개의 활성 리스팅',
    proFeatures: [
      '우선 리스팅 배치',
      'API 및 시스템 통합',
      '전담 계정 관리자',
      '실시간 분석 대시보드'
    ],
    enterprise: '엔터프라이즈',
    enterprisePrice: '฿19,900',
    enterpriseDesc: '/ 월 · 무제한 리스팅',
    enterpriseFeatures: [
      '화이트 레이블 브랜딩 옵션',
      '맞춤형 계약 구조',
      '연중무휴 우선 지원 핫라인',
      '대량 관리 및 API 액세스'
    ],
    footerNote: '+1.5 - 5% 실행된 모든 Rent-to-Own 계약에 대한 거래 수수료 — 계약 서명 시 개발자 지불'
  }
};

export default function PackagesPage() {
  const { language, setLanguage, t } = useTranslation();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchType, setSearchType] = useState<'buy'|'rent'>('buy');
  const [propertyType, setPropertyType] = useState('all');

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
    <div className="flex flex-col min-h-screen bg-[#f4f1eb] text-grayPalette-500 font-sans">
      <div className="sticky top-0 z-50 w-full flex flex-col shadow-sm">
        
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

            <a href="/#contact" className="hover:text-orangePalette-200 transition-colors">{topHeaderTranslations[language].sub}</a>
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
                    <a key={type.value} href="/#properties" onClick={() => { setPropertyType(type.value); setSearchType('buy'); setBurgerMenuOpen(false); }} className="hover:text-orangePalette-200 transition-all">{type.label}</a>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-orangePalette-200 font-bold uppercase tracking-wider text-xs mb-4">{t.forRent}</h4>
                <div className="flex flex-col space-y-2 text-sm text-grayPalette-100">
                  {propertyTypes.slice(1).map((type) => (
                    <a key={type.value} href="/#properties" onClick={() => { setPropertyType(type.value); setSearchType('rent'); setBurgerMenuOpen(false); }} className="hover:text-orangePalette-200 transition-all">{type.label}</a>
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
            <a href="/" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-orangePalette-200 text-base font-semibold pb-2 border-b border-white/5 transition-all">{mainMenuTranslations[language].home}</a>
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

       <main className="flex-grow pt-16 pb-32 max-w-7xl mx-auto px-4 w-full">
         <div className="text-center mb-16 space-y-4">
           <h1 className="text-4xl md:text-5xl font-medium text-[#1a5561] tracking-wide uppercase">{packageTranslations[language].title}</h1>
           <p className="text-lg text-gray-500">{packageTranslations[language].subtitle}</p>
         </div>
         
         <div className="max-w-5xl mx-auto w-full">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
             {/* STARTER CARD */}
             <div className="bg-[#9bb4b6] px-8 py-10 flex flex-col items-center text-center">
               <h3 className="text-white font-medium uppercase tracking-widest text-sm mb-4">{packageTranslations[language].starter}</h3>
               <div className="text-5xl md:text-6xl text-[#1a5561] mb-4 tracking-tighter">{packageTranslations[language].starterPrice}</div>
               <p className="text-white text-sm mb-6 font-light">{packageTranslations[language].starterDesc}</p>
               <div className="w-full h-px bg-white/50 mb-6"></div>
               <ul className="space-y-4 w-full text-left">
                 {packageTranslations[language].starterFeatures.map((feat: string, i: number) => (
                   <li key={i} className="flex items-start text-sm text-white font-light">
                     <Check className="w-4 h-4 text-white mr-3 flex-shrink-0 mt-0.5" strokeWidth={2} /> 
                     {feat}
                   </li>
                 ))}
               </ul>
             </div>
             
             {/* PRO CARD */}
             <div className="bg-[#9bb4b6] px-8 py-10 flex flex-col items-center text-center">
               <h3 className="text-white font-medium uppercase tracking-widest text-sm mb-4">{packageTranslations[language].pro}</h3>
               <div className="text-5xl md:text-6xl text-[#1a5561] mb-4 tracking-tighter">{packageTranslations[language].proPrice}</div>
               <p className="text-white text-sm mb-6 font-light">{packageTranslations[language].proDesc}</p>
               <div className="w-full h-px bg-white/50 mb-6"></div>
               <ul className="space-y-4 w-full text-left">
                 {packageTranslations[language].proFeatures.map((feat: string, i: number) => (
                   <li key={i} className="flex items-start text-sm text-white font-light">
                     <Check className="w-4 h-4 text-white mr-3 flex-shrink-0 mt-0.5" strokeWidth={2} /> 
                     {feat}
                   </li>
                 ))}
               </ul>
             </div>
             
             {/* ENTERPRISE CARD */}
             <div className="bg-[#9bb4b6] px-8 py-10 flex flex-col items-center text-center">
               <h3 className="text-white font-medium uppercase tracking-widest text-sm mb-4">{packageTranslations[language].enterprise}</h3>
               <div className="text-5xl md:text-6xl text-[#1a5561] mb-4 tracking-tighter">{packageTranslations[language].enterprisePrice}</div>
               <p className="text-white text-sm mb-6 font-light">{packageTranslations[language].enterpriseDesc}</p>
               <div className="w-full h-px bg-white/50 mb-6"></div>
               <ul className="space-y-4 w-full text-left">
                 {packageTranslations[language].enterpriseFeatures.map((feat: string, i: number) => (
                   <li key={i} className="flex items-start text-sm text-white font-light">
                     <Check className="w-4 h-4 text-white mr-3 flex-shrink-0 mt-0.5" strokeWidth={2} /> 
                     {feat}
                   </li>
                 ))}
               </ul>
             </div>
           </div>

           {/* FOOTER BANNER */}
           <div className="mt-4 bg-[#1a5561] py-4 px-6 text-center text-white text-sm">
             {packageTranslations[language].footerNote}
           </div>
         </div>
       </main>

      {/* 10. LUXURY FOOTER */}
      <footer className="bg-[#052b37] text-white pt-16 pb-8 border-t border-white/5 mt-auto">
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
              <a href="/#search-engine" className="hover:text-orangePalette-200 transition-all">Search Engine</a>
              <a href="/#properties" className="hover:text-orangePalette-200 transition-all">Premium Listings</a>
              <a href="/#calculators" className="hover:text-orangePalette-200 transition-all">Interactive Calculators</a>
              <a href="/#contact" className="hover:text-orangePalette-200 transition-all">Get in Touch</a>
            </div>
          </div>

          {/* Col 3 */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-orangePalette-200">Properties</h4>
            <div className="flex flex-col space-y-2 text-xs text-grayPalette-100">
              <a href="/#properties" className="hover:text-orangePalette-200 transition-all">{t.condo}</a>
              <a href="/#properties" className="hover:text-orangePalette-200 transition-all">{t.house}</a>
              <a href="/#properties" className="hover:text-orangePalette-200 transition-all">{t.villa}</a>
              <a href="/#properties" className="hover:text-orangePalette-200 transition-all">{t.townhome}</a>
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
    </div>
  );
}
