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
            <a href="/packages" className="hover:text-orangePalette-200 transition-colors">{topHeaderTranslations[language].listProp}</a>
            <a href="/subscription" className="hover:text-orangePalette-200 transition-colors">{topHeaderTranslations[language].sub}</a>
            <a href="/admin" className="hover:text-orangePalette-200 transition-colors">{topHeaderTranslations[language].myHome}</a>
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
          <a href="/" className="flex md:hidden items-center">
            <img
              src="https://res.cloudinary.com/dvv3wvgnt/image/upload/v1779681125/svlogo_tzfhad.webp"
              alt="STAYVERSE Logo"
              className="h-12 w-auto object-contain"
            />
          </a>

          {/* Desktop Navigation Menu */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm">
            <a href="/" className="text-[#306473] hover:text-orangePalette-200 hover:border-b-2 hover:border-orangePalette-200 pb-1 font-medium transition-all-custom">หน้าแรก</a>
            <a href="#" className="text-[#306473] hover:text-orangePalette-200 hover:border-b-2 hover:border-orangePalette-200 pb-1 font-medium transition-all-custom">เช่าออมห้อง</a>
            <a href="#" className="text-[#306473] hover:text-orangePalette-200 hover:border-b-2 hover:border-orangePalette-200 pb-1 font-medium transition-all-custom">เช่าสบายจ่ายรายเดือน</a>
            <a href="#" className="text-[#306473] hover:text-orangePalette-200 hover:border-b-2 hover:border-orangePalette-200 pb-1 font-medium transition-all-custom">ขายพร้อมผู้เช่า</a>

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
            <a href="/" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-orangePalette-200 text-base font-semibold pb-2 border-b border-white/5 transition-all">หน้าแรก</a>
            <a href="#" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-orangePalette-200 text-base font-semibold pb-2 border-b border-white/5 transition-all">เช่าออมห้อง</a>
            <a href="#" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-orangePalette-200 text-base font-semibold pb-2 border-b border-white/5 transition-all">เช่าสบายจ่ายรายเดือน</a>
            <a href="#" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-orangePalette-200 text-base font-semibold pb-2 border-b border-white/5 transition-all">ขายพร้อมผู้เช่า</a>
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
           <h1 className="text-4xl md:text-5xl font-extrabold text-[#0f4a56] tracking-tight">แพ็กเกจสำหรับผู้พัฒนา</h1>
           <p className="text-lg text-gray-500 max-w-2xl mx-auto">แผนเรียบง่ายสำหรับผู้พัฒนาอสังหาฯ ไทยที่ลงประกาศบน StayVerse</p>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
           {/* STARTER CARD */}
           <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col h-full transform hover:-translate-y-1 transition-all">
             <div className="mb-6">
               <h3 className="text-[#0f4a56] font-bold text-xs uppercase tracking-wider mb-4">STARTER</h3>
               <div className="text-4xl font-extrabold text-[#0f4a56] mb-4">ฟรี</div>
               <p className="text-gray-500 text-sm h-10">เหมาะกับผู้เริ่มต้นที่อยากทดลองลงประกาศ</p>
             </div>
             
             <ul className="space-y-4 mb-8 flex-grow">
               <li className="flex items-start text-sm text-gray-600"><Check className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0 mt-0.5" /> ลงประกาศใช้งานสูงสุด 3 ยูนิต</li>
               <li className="flex items-start text-sm text-gray-600"><Check className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0 mt-0.5" /> การจัดวางประกาศมาตรฐาน</li>
               <li className="flex items-start text-sm text-gray-600"><Check className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0 mt-0.5" /> วิเคราะห์พื้นฐาน</li>
               <li className="flex items-start text-sm text-gray-600"><Check className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0 mt-0.5" /> รองรับทางอีเมล</li>
               <li className="flex items-start text-sm text-gray-600"><Check className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0 mt-0.5" /> คอมมิชชั่นแพลตฟอร์ม 8% ต่อการขาย</li>
             </ul>
             
             <button className="w-full py-3.5 bg-[#0f4a56] hover:bg-[#0a353d] text-white font-bold rounded-xl text-sm transition-colors mt-auto shadow-md">
               เริ่มต้นใช้งาน
             </button>
           </div>
           
           {/* PRO/RECOMMENDED CARD */}
           <div className="bg-[#0f4a56] rounded-3xl p-8 shadow-2xl flex flex-col h-full transform scale-100 md:scale-105 z-10 relative">
             <div className="mb-6">
               <div className="text-4xl font-extrabold text-white mb-4 tracking-tight mt-6 md:mt-2">฿4,900 <span className="text-xl font-medium text-white/80">/ เดือน</span></div>
               <p className="text-white/80 text-sm h-10">สำหรับผู้พัฒนารายย่อยถึงกลางที่มุ่งดิจิทัลเต็มตัว</p>
             </div>
             
             <ul className="space-y-4 mb-8 flex-grow">
               <li className="flex items-start text-sm text-white/95"><Check className="w-4 h-4 text-white/80 mr-2 flex-shrink-0 mt-0.5" /> ลงประกาศใช้งานสูงสุด 25 ยูนิต</li>
               <li className="flex items-start text-sm text-white/95"><Check className="w-4 h-4 text-white/80 mr-2 flex-shrink-0 mt-0.5" /> การจัดวางประกาศระดับพรีเมียม</li>
               <li className="flex items-start text-sm text-white/95"><Check className="w-4 h-4 text-white/80 mr-2 flex-shrink-0 mt-0.5" /> วิเคราะห์ขั้นสูง + ติดตามลีด</li>
               <li className="flex items-start text-sm text-white/95"><Check className="w-4 h-4 text-white/80 mr-2 flex-shrink-0 mt-0.5" /> รองรับระดับพรีเมียม (ตอบใน 24 ชม.)</li>
               <li className="flex items-start text-sm text-white/95"><Check className="w-4 h-4 text-white/80 mr-2 flex-shrink-0 mt-0.5" /> คอมมิชชั่นแพลตฟอร์ม 5% ต่อการขาย</li>
               <li className="flex items-start text-sm text-white/95"><Check className="w-4 h-4 text-white/80 mr-2 flex-shrink-0 mt-0.5" /> สล็อตแนะนำพิเศษ (2 ต่อเดือน)</li>
             </ul>
             
             <button className="w-full py-3.5 bg-[#f4f1eb] hover:bg-white text-[#0f4a56] font-bold rounded-xl text-sm transition-colors mt-auto shadow-lg shadow-black/20">
               เริ่มต้นใช้งาน
             </button>
           </div>
           
           {/* ENTERPRISE CARD */}
           <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col h-full transform hover:-translate-y-1 transition-all">
             <div className="mb-6">
               <h3 className="text-[#0f4a56] font-bold text-xs uppercase tracking-wider mb-4">ENTERPRISE</h3>
               <div className="text-4xl font-extrabold text-[#0f4a56] mb-4">กำหนดเอง</div>
               <p className="text-gray-500 text-sm h-10">สำหรับผู้พัฒนารายใหญ่ เจ้าของพอร์ตฯ และโครงการ RTO เต็มรูปแบบ</p>
             </div>
             
             <ul className="space-y-4 mb-8 flex-grow">
               <li className="flex items-start text-sm text-gray-600"><Check className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0 mt-0.5" /> ลงประกาศไม่จำกัด</li>
               <li className="flex items-start text-sm text-gray-600"><Check className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0 mt-0.5" /> แบนเนอร์แนะนำบนหน้าแรก</li>
               <li className="flex items-start text-sm text-gray-600"><Check className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0 mt-0.5" /> ผู้จัดการบัญชีเฉพาะ</li>
               <li className="flex items-start text-sm text-gray-600"><Check className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0 mt-0.5" /> เชื่อมต่อกับระบบอื่น (CRM, ERP)</li>
               <li className="flex items-start text-sm text-gray-600"><Check className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0 mt-0.5" /> คอมมิชชั่นแพลตฟอร์ม 3% ต่อการขาย</li>
               <li className="flex items-start text-sm text-gray-600"><Check className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0 mt-0.5" /> โอกาสทำการตลาดร่วม</li>
             </ul>
             
             <button className="w-full py-3.5 bg-[#0f4a56] hover:bg-[#0a353d] text-white font-bold rounded-xl text-sm transition-colors mt-auto shadow-md">
               ติดต่อฝ่ายขาย
             </button>
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
