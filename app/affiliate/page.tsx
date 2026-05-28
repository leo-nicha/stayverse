'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation, Language } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Globe } from 'lucide-react';

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

const affiliateTranslations: Record<Language, any> = {
  th: {
    back: 'กลับสู่หน้าหลัก',
    heroTitle1: 'STAYVERSE',
    heroTitle2: 'AFFILIATE',
    heroSubtitle: 'เปลี่ยน "การแชร์" ของคุณให้เป็น "รายได้" กับ StayVerse Affiliate!',
    heroDesc: 'อสังหาริมทรัพย์ซับซ้อนเกินไปไหม? ไม่ใช่อีกต่อไป!\nเพียงแค่แชร์ลิงก์โครงการ Rent-to-Own จาก StayVerse และรอรับค่าคอมมิชชั่นของคุณได้เลย!',
    bullet1Title: 'แชร์ง่ายๆ:',
    bullet1Desc: 'ใครๆ ก็ทำได้—เพียงคุณมีโซเชียลมีเดีย',
    bullet2Title: 'รายได้สูง:',
    bullet2Desc: 'รับค่าคอมมิชชั่นในระดับสูงสุด',
    bullet3Title: 'ไม่ต้องลงทุน:',
    bullet3Desc: 'เริ่มต้น ฟรี ด้วยเงิน 0 บาท',
    bullet4Title: 'ไม่ต้องมีสต็อก:',
    bullet4Desc: 'เราได้เตรียมอสังหาริมทรัพย์ที่ดีที่สุดไว้ให้คุณแล้ว',
    bullet5Title: 'ไม่ต้องมีประสบการณ์:',
    bullet5Desc: 'ไม่จำเป็นต้องเป็นนายหน้ามืออาชีพ หรือมีใบอนุญาต',
    ctaText: 'เริ่มสร้างรายได้เสริมของคุณวันนี้ ทักแชทเพื่อเข้าร่วมเลย!',
    applyBtn: 'สมัคร Affiliate',
    imgTitle: 'รายได้พาสซีฟ',
    imgDesc: 'เข้าร่วมการปฏิวัติการแชร์อสังหาริมทรัพย์ดิจิทัล และเพิ่มศักยภาพเครือข่ายของคุณให้สูงสุด',
    commTitle1: 'STAYVERSE AFFILIATE',
    commTitle2: 'อัตราค่าคอมมิชชั่น',
    thAffiliate: 'พันธมิตร',
    thSubAffiliate: '(จ่ายครั้งเดียว/ หน่วย)',
    thSvTiers: 'ระดับค่าคอมมิชชั่น SV',
    thPropValue: 'มูลค่าอสังหาริมทรัพย์',
    thRate: 'อัตรา (%)',
    thSvComm: 'ค่าคอมมิชชั่น SV',
    thAffComm: 'ค่าคอมมิชชั่นพันธมิตร (%)',
    thEarn: 'รายได้',
    tr1col1: 'เช่าอย่างเดียว',
    tr1col2: '1 เดือน',
    tr2col1: 'เช่าออมห้อง (Rent to Own)',
    tr2col2: '1.5 - 5%',
    tr6col1: 'ราคาลดพิเศษ (3%)',
    tableNote: 'หมายเหตุ: อัตราค่าคอมมิชชั่นในตารางนี้อาจเปลี่ยนแปลงได้ขึ้นอยู่กับค่าคอมมิชชั่นที่แพลตฟอร์มได้รับ สำหรับอัตราที่ถูกต้อง โปรดตรวจสอบค่าคอมมิชชั่นพันธมิตรเฉพาะสำหรับแต่ละยูนิตในระบบ StayVerse Affiliate หลังจากเข้าสู่ระบบ',
    progTitle: 'โปรแกรม AFFILIATE ของ STAYVERSE',
    progDesc: 'แนะนำผู้เช่าและผู้พัฒนา รับค่าคอมมิชชั่นแบบแฟลตเรทต่อสอบถาม นัดชม และสัญญาเช่าซื้อ',
    whatYouGet: 'สิ่งที่คุณได้รับ',
    get1Price: '฿50',
    get1Desc: '฿50 ต่อการส่งสอบถาม',
    get2Price: '฿500',
    get2Desc: '฿500 ต่อการนัดชม',
    get3Price: '฿3,000',
    get3Desc: '฿3,000 ต่อสัญญาเช่าซื้อ',
    howItWorks: 'ทำงานอย่างไร',
    step1: '1. สมัครด้านล่าง เราพิจารณาใบสมัครด้วยตนเองภายใน 2 วันทำการ',
    step2: '2. รับรหัสแนะนำของคุณ พร้อมแบนเนอร์สำหรับวางบนเว็บ',
    step3: '3. ผู้เข้าชมที่มาจากลิงก์ของคุณจะถูกนับให้คุณ 30 วัน',
    step4: '4. เมื่อเขาส่งสอบถาม นัดชม หรือลงสัญญา ค่าคอมมิชชั่นจะเข้าแดชบอร์ดของคุณ',
    applyBtnBottom: 'สมัคร Affiliate'
  },
  en: {
    back: 'Back to Home',
    heroTitle1: 'STAYVERSE',
    heroTitle2: 'AFFILIATE',
    heroSubtitle: 'Turn your "Shares" into "Income" with StayVerse Affiliate!',
    heroDesc: 'Is real estate too complicated? Not anymore!\nJust share Rent-to-Own project links from StayVerse and wait for your booming commissions!',
    bullet1Title: 'Easy Sharing:',
    bullet1Desc: 'Anyone can do it—all you need is your social media.',
    bullet2Title: 'High Earnings:',
    bullet2Desc: 'Earn top-tier, Higher commissions.',
    bullet3Title: 'Zero Investment:',
    bullet3Desc: 'Start for FREE with 0 Baht.',
    bullet4Title: 'No Inventory Needed:',
    bullet4Desc: 'We\'ve already prepared the best properties for you.',
    bullet5Title: 'No Experience Required:',
    bullet5Desc: 'You don\'t need to be a professional agent or have a license.',
    ctaText: 'Start building your side hustle today. DM us to join!',
    applyBtn: 'Apply for Affiliate',
    imgTitle: 'Passive Income',
    imgDesc: 'Join the revolution of digital real estate sharing and maximize your network\'s potential.',
    commTitle1: 'STAYVERSE AFFILIATE',
    commTitle2: 'Commission Rate',
    thAffiliate: 'Affiliate',
    thSubAffiliate: '(One Time Payment/ Unit)',
    thSvTiers: 'SV Commission Tiers',
    thPropValue: 'Property Value',
    thRate: 'Rate (%)',
    thSvComm: 'SV Commission',
    thAffComm: 'Affiliate Commission (%)',
    thEarn: 'Earn',
    tr1col1: 'Just rent',
    tr1col2: '1 Month',
    tr2col1: 'Rent to Own',
    tr2col2: '1.5 - 5%',
    tr6col1: 'Fire Sale Price (3%)',
    tableNote: 'Note: Commission rates in this table are subject to change based on the platform\'s received commission. For accurate rates, please check the specific Affiliate Commission for each unit in the StayVerse Affiliate system after logging in.',
    progTitle: 'STAYVERSE AFFILIATE PROGRAM',
    progDesc: 'Refer tenants and developers, receive flat-rate commissions per inquiry, viewing, and lease agreement',
    whatYouGet: 'What you get',
    get1Price: '฿50',
    get1Desc: '฿50 per inquiry submitted',
    get2Price: '฿500',
    get2Desc: '฿500 per property viewing',
    get3Price: '฿3,000',
    get3Desc: '฿3,000 per lease agreement',
    howItWorks: 'How it works',
    step1: '1. Apply below, we review applications manually within 2 business days',
    step2: '2. Receive your referral code and banners for your website',
    step3: '3. Visitors from your links will be credited to you for 30 days',
    step4: '4. When they submit an inquiry, view, or sign a contract, commissions go to your dashboard',
    applyBtnBottom: 'Apply for Affiliate'
  },
  ru: {
    back: 'На главную',
    heroTitle1: 'STAYVERSE',
    heroTitle2: 'AFFILIATE',
    heroSubtitle: 'Turn your "Shares" into "Income" with StayVerse Affiliate!',
    heroDesc: 'Is real estate too complicated? Not anymore!\nJust share Rent-to-Own project links from StayVerse and wait for your booming commissions!',
    bullet1Title: 'Easy Sharing:',
    bullet1Desc: 'Anyone can do it—all you need is your social media.',
    bullet2Title: 'High Earnings:',
    bullet2Desc: 'Earn top-tier, Higher commissions.',
    bullet3Title: 'Zero Investment:',
    bullet3Desc: 'Start for FREE with 0 Baht.',
    bullet4Title: 'No Inventory Needed:',
    bullet4Desc: 'We\'ve already prepared the best properties for you.',
    bullet5Title: 'No Experience Required:',
    bullet5Desc: 'You don\'t need to be a professional agent or have a license.',
    ctaText: 'Start building your side hustle today. DM us to join!',
    applyBtn: 'Apply for Affiliate',
    imgTitle: 'Passive Income',
    imgDesc: 'Join the revolution of digital real estate sharing and maximize your network\'s potential.',
    commTitle1: 'STAYVERSE AFFILIATE',
    commTitle2: 'Commission Rate',
    thAffiliate: 'Affiliate',
    thSubAffiliate: '(One Time Payment/ Unit)',
    thSvTiers: 'SV Commission Tiers',
    thPropValue: 'Property Value',
    thRate: 'Rate (%)',
    thSvComm: 'SV Commission',
    thAffComm: 'Affiliate Commission (%)',
    thEarn: 'Earn',
    tr1col1: 'Just rent',
    tr1col2: '1 Month',
    tr2col1: 'Rent to Own',
    tr2col2: '1.5 - 5%',
    tr6col1: 'Fire Sale Price (3%)',
    tableNote: 'Note: Commission rates in this table are subject to change based on the platform\'s received commission. For accurate rates, please check the specific Affiliate Commission for each unit in the StayVerse Affiliate system after logging in.',
    progTitle: 'STAYVERSE AFFILIATE PROGRAM',
    progDesc: 'Refer tenants and developers, receive flat-rate commissions per inquiry, viewing, and lease agreement',
    whatYouGet: 'What you get',
    get1Price: '฿50',
    get1Desc: '฿50 per inquiry submitted',
    get2Price: '฿500',
    get2Desc: '฿500 per property viewing',
    get3Price: '฿3,000',
    get3Desc: '฿3,000 per lease agreement',
    howItWorks: 'How it works',
    step1: '1. Apply below, we review applications manually within 2 business days',
    step2: '2. Receive your referral code and banners for your website',
    step3: '3. Visitors from your links will be credited to you for 30 days',
    step4: '4. When they submit an inquiry, view, or sign a contract, commissions go to your dashboard',
    applyBtnBottom: 'Apply for Affiliate'
  },
  zh: {
    back: '返回首页',
    heroTitle1: 'STAYVERSE',
    heroTitle2: 'AFFILIATE',
    heroSubtitle: 'Turn your "Shares" into "Income" with StayVerse Affiliate!',
    heroDesc: 'Is real estate too complicated? Not anymore!\nJust share Rent-to-Own project links from StayVerse and wait for your booming commissions!',
    bullet1Title: 'Easy Sharing:',
    bullet1Desc: 'Anyone can do it—all you need is your social media.',
    bullet2Title: 'High Earnings:',
    bullet2Desc: 'Earn top-tier, Higher commissions.',
    bullet3Title: 'Zero Investment:',
    bullet3Desc: 'Start for FREE with 0 Baht.',
    bullet4Title: 'No Inventory Needed:',
    bullet4Desc: 'We\'ve already prepared the best properties for you.',
    bullet5Title: 'No Experience Required:',
    bullet5Desc: 'You don\'t need to be a professional agent or have a license.',
    ctaText: 'Start building your side hustle today. DM us to join!',
    applyBtn: 'Apply for Affiliate',
    imgTitle: 'Passive Income',
    imgDesc: 'Join the revolution of digital real estate sharing and maximize your network\'s potential.',
    commTitle1: 'STAYVERSE AFFILIATE',
    commTitle2: 'Commission Rate',
    thAffiliate: 'Affiliate',
    thSubAffiliate: '(One Time Payment/ Unit)',
    thSvTiers: 'SV Commission Tiers',
    thPropValue: 'Property Value',
    thRate: 'Rate (%)',
    thSvComm: 'SV Commission',
    thAffComm: 'Affiliate Commission (%)',
    thEarn: 'Earn',
    tr1col1: 'Just rent',
    tr1col2: '1 Month',
    tr2col1: 'Rent to Own',
    tr2col2: '1.5 - 5%',
    tr6col1: 'Fire Sale Price (3%)',
    tableNote: 'Note: Commission rates in this table are subject to change based on the platform\'s received commission. For accurate rates, please check the specific Affiliate Commission for each unit in the StayVerse Affiliate system after logging in.',
    progTitle: 'STAYVERSE AFFILIATE PROGRAM',
    progDesc: 'Refer tenants and developers, receive flat-rate commissions per inquiry, viewing, and lease agreement',
    whatYouGet: 'What you get',
    get1Price: '฿50',
    get1Desc: '฿50 per inquiry submitted',
    get2Price: '฿500',
    get2Desc: '฿500 per property viewing',
    get3Price: '฿3,000',
    get3Desc: '฿3,000 per lease agreement',
    howItWorks: 'How it works',
    step1: '1. Apply below, we review applications manually within 2 business days',
    step2: '2. Receive your referral code and banners for your website',
    step3: '3. Visitors from your links will be credited to you for 30 days',
    step4: '4. When they submit an inquiry, view, or sign a contract, commissions go to your dashboard',
    applyBtnBottom: 'Apply for Affiliate'
  },
  ja: {
    back: 'ホームに戻る',
    heroTitle1: 'STAYVERSE',
    heroTitle2: 'AFFILIATE',
    heroSubtitle: 'Turn your "Shares" into "Income" with StayVerse Affiliate!',
    heroDesc: 'Is real estate too complicated? Not anymore!\nJust share Rent-to-Own project links from StayVerse and wait for your booming commissions!',
    bullet1Title: 'Easy Sharing:',
    bullet1Desc: 'Anyone can do it—all you need is your social media.',
    bullet2Title: 'High Earnings:',
    bullet2Desc: 'Earn top-tier, Higher commissions.',
    bullet3Title: 'Zero Investment:',
    bullet3Desc: 'Start for FREE with 0 Baht.',
    bullet4Title: 'No Inventory Needed:',
    bullet4Desc: 'We\'ve already prepared the best properties for you.',
    bullet5Title: 'No Experience Required:',
    bullet5Desc: 'You don\'t need to be a professional agent or have a license.',
    ctaText: 'Start building your side hustle today. DM us to join!',
    applyBtn: 'Apply for Affiliate',
    imgTitle: 'Passive Income',
    imgDesc: 'Join the revolution of digital real estate sharing and maximize your network\'s potential.',
    commTitle1: 'STAYVERSE AFFILIATE',
    commTitle2: 'Commission Rate',
    thAffiliate: 'Affiliate',
    thSubAffiliate: '(One Time Payment/ Unit)',
    thSvTiers: 'SV Commission Tiers',
    thPropValue: 'Property Value',
    thRate: 'Rate (%)',
    thSvComm: 'SV Commission',
    thAffComm: 'Affiliate Commission (%)',
    thEarn: 'Earn',
    tr1col1: 'Just rent',
    tr1col2: '1 Month',
    tr2col1: 'Rent to Own',
    tr2col2: '1.5 - 5%',
    tr6col1: 'Fire Sale Price (3%)',
    tableNote: 'Note: Commission rates in this table are subject to change based on the platform\'s received commission. For accurate rates, please check the specific Affiliate Commission for each unit in the StayVerse Affiliate system after logging in.',
    progTitle: 'STAYVERSE AFFILIATE PROGRAM',
    progDesc: 'Refer tenants and developers, receive flat-rate commissions per inquiry, viewing, and lease agreement',
    whatYouGet: 'What you get',
    get1Price: '฿50',
    get1Desc: '฿50 per inquiry submitted',
    get2Price: '฿500',
    get2Desc: '฿500 per property viewing',
    get3Price: '฿3,000',
    get3Desc: '฿3,000 per lease agreement',
    howItWorks: 'How it works',
    step1: '1. Apply below, we review applications manually within 2 business days',
    step2: '2. Receive your referral code and banners for your website',
    step3: '3. Visitors from your links will be credited to you for 30 days',
    step4: '4. When they submit an inquiry, view, or sign a contract, commissions go to your dashboard',
    applyBtnBottom: 'Apply for Affiliate'
  },
  ko: {
    back: '홈으로 돌아가기',
    heroTitle1: 'STAYVERSE',
    heroTitle2: 'AFFILIATE',
    heroSubtitle: 'Turn your "Shares" into "Income" with StayVerse Affiliate!',
    heroDesc: 'Is real estate too complicated? Not anymore!\nJust share Rent-to-Own project links from StayVerse and wait for your booming commissions!',
    bullet1Title: 'Easy Sharing:',
    bullet1Desc: 'Anyone can do it—all you need is your social media.',
    bullet2Title: 'High Earnings:',
    bullet2Desc: 'Earn top-tier, Higher commissions.',
    bullet3Title: 'Zero Investment:',
    bullet3Desc: 'Start for FREE with 0 Baht.',
    bullet4Title: 'No Inventory Needed:',
    bullet4Desc: 'We\'ve already prepared the best properties for you.',
    bullet5Title: 'No Experience Required:',
    bullet5Desc: 'You don\'t need to be a professional agent or have a license.',
    ctaText: 'Start building your side hustle today. DM us to join!',
    applyBtn: 'Apply for Affiliate',
    imgTitle: 'Passive Income',
    imgDesc: 'Join the revolution of digital real estate sharing and maximize your network\'s potential.',
    commTitle1: 'STAYVERSE AFFILIATE',
    commTitle2: 'Commission Rate',
    thAffiliate: 'Affiliate',
    thSubAffiliate: '(One Time Payment/ Unit)',
    thSvTiers: 'SV Commission Tiers',
    thPropValue: 'Property Value',
    thRate: 'Rate (%)',
    thSvComm: 'SV Commission',
    thAffComm: 'Affiliate Commission (%)',
    thEarn: 'Earn',
    tr1col1: 'Just rent',
    tr1col2: '1 Month',
    tr2col1: 'Rent to Own',
    tr2col2: '1.5 - 5%',
    tr6col1: 'Fire Sale Price (3%)',
    tableNote: 'Note: Commission rates in this table are subject to change based on the platform\'s received commission. For accurate rates, please check the specific Affiliate Commission for each unit in the StayVerse Affiliate system after logging in.',
    progTitle: 'STAYVERSE AFFILIATE PROGRAM',
    progDesc: 'Refer tenants and developers, receive flat-rate commissions per inquiry, viewing, and lease agreement',
    whatYouGet: 'What you get',
    get1Price: '฿50',
    get1Desc: '฿50 per inquiry submitted',
    get2Price: '฿500',
    get2Desc: '฿500 per property viewing',
    get3Price: '฿3,000',
    get3Desc: '฿3,000 per lease agreement',
    howItWorks: 'How it works',
    step1: '1. Apply below, we review applications manually within 2 business days',
    step2: '2. Receive your referral code and banners for your website',
    step3: '3. Visitors from your links will be credited to you for 30 days',
    step4: '4. When they submit an inquiry, view, or sign a contract, commissions go to your dashboard',
    applyBtnBottom: 'Apply for Affiliate'
  }
};

export default function AffiliatePublicPage() {
  const router = useRouter();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const { language, setLanguage } = useTranslation();
  
  // Use Thai as the default/base if something is missing, though here we supply all keys.
  const t = affiliateTranslations[language] || affiliateTranslations.th;

  return (
    <div className="min-h-screen bg-[#f4f1eb] font-sans selection:bg-[#CF7536] selection:text-white pb-20 overflow-x-hidden relative">
      
      {/* Premium Language Swapper at top-right (absolute like login page) */}
      <div className="absolute top-4 right-4 z-50">
        <div className="relative">
          <button
            onClick={() => setLangMenuOpen(!langMenuOpen)}
            className="flex items-center space-x-2 px-3.5 py-1.5 bg-white/80 backdrop-blur-md hover:bg-gray-100 rounded-full border border-gray-200 text-xs text-gray-800 shadow-lg transition-all cursor-pointer"
          >
            <img src={languageFlags[language]} alt={language} className="w-4 h-3 object-cover rounded-sm" />
            <span className="font-semibold uppercase">{language}</span>
            <Globe className="w-3.5 h-3.5 text-[#CF7536]" />
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
                  className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden"
                >
                  {(Object.keys(languageFlags) as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-xs flex items-center space-x-2.5 hover:bg-[#CF7536]/10 hover:text-gray-900 transition-all duration-200 cursor-pointer ${language === lang ? 'bg-[#CF7536]/10 text-[#CF7536] font-bold' : 'text-gray-700'}`}
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

      {/* Mini Header */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between pt-16 md:pt-4">
        <a href="/" className="flex items-center space-x-2">
          <img
            src="https://res.cloudinary.com/dvv3wvgnt/image/upload/v1779681125/svlogo_tzfhad.webp"
            alt="STAYVERSE Logo"
            className="h-10 w-auto object-contain"
          />
        </a>
        <button onClick={() => router.push('/')} className="text-sm font-semibold text-gray-500 hover:text-gray-800 flex items-center gap-1 transition-all cursor-pointer mr-2 md:mr-32 lg:mr-0">
          <ArrowLeft className="w-4 h-4" />
          <span>{t.back}</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-4 md:mt-12">
        {/* HERO SECTION */}
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-[64px] font-black text-[#1a3b47] tracking-tight leading-[1.1]">
              {t.heroTitle1} <br />
              {t.heroTitle2}
            </h1>
            
            <h2 className="text-lg md:text-xl font-medium text-gray-700 max-w-lg mt-4">
              {t.heroSubtitle}
            </h2>
            
            <p className="text-[15px] md:text-base text-gray-600 max-w-xl leading-relaxed mt-2 whitespace-pre-line">
              {t.heroDesc}
            </p>

            <ul className="space-y-3.5 pt-4">
              {[
                { title: t.bullet1Title, desc: t.bullet1Desc },
                { title: t.bullet2Title, desc: t.bullet2Desc },
                { title: t.bullet3Title, desc: t.bullet3Desc },
                { title: t.bullet4Title, desc: t.bullet4Desc },
                { title: t.bullet5Title, desc: t.bullet5Desc }
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-[#CF7536] shrink-0 shadow-[0_0_8px_rgba(207,117,54,0.4)]"></div>
                  <span className="text-[15px] text-gray-700 font-medium leading-snug">
                    <span className="font-bold text-[#1a3b47]">{item.title}</span> {item.desc}
                  </span>
                </li>
              ))}
            </ul>

            <div className="pt-6">
              <p className="text-lg font-bold text-[#CF7536] mb-5">{t.ctaText}</p>
              <button onClick={() => router.push('/login')} className="px-8 py-3.5 bg-[#CF7536] hover:bg-[#b0612a] text-white rounded-lg font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer">
                {t.applyBtn}
              </button>
            </div>
          </div>
          
          <div className="flex-1 w-full flex justify-center md:justify-end relative">
            <div className="relative w-full max-w-[500px] h-[550px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/40">
              <img 
                src="https://images.unsplash.com/photo-1579621970795-87facc2f976d?q=80&w=1000" 
                alt="Affiliate Earnings" 
                className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a3b47]/90 via-[#1a3b47]/20 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <h3 className="font-black text-3xl drop-shadow-md mb-2">{t.imgTitle}</h3>
                <p className="text-white/90 text-[15px] font-medium leading-relaxed">{t.imgDesc}</p>
              </div>
            </div>
          </div>
        </div>

        {/* COMMISSION RATE TABLE SECTION */}
        <div className="mt-24 md:mt-32">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-black text-[#1a3b47] tracking-tight">{t.commTitle1}</h2>
            <h3 className="text-2xl md:text-[28px] font-light text-[#CF7536] mt-1 tracking-[0.15em] uppercase">{t.commTitle2}</h3>
          </div>
          
          <div className="overflow-x-auto rounded-xl shadow-lg border border-[#e5dfd3]">
            <table className="w-full min-w-[900px] text-center border-collapse bg-white text-[15px]">
              <thead>
                <tr className="bg-[#f2efe8] text-[#1a3b47] font-bold">
                  <th className="py-5 px-4 border-r border-b border-[#e5dfd3] w-[25%] text-left pl-8 leading-snug">{t.thAffiliate}<br/><span className="text-[11px] font-medium text-gray-500">{t.thSubAffiliate}</span></th>
                  <th className="py-5 px-4 border-r border-b border-[#e5dfd3] w-[12%] leading-snug">{t.thSvTiers}</th>
                  <th className="py-5 px-4 border-r border-b border-[#e5dfd3] w-[15%] leading-snug">{t.thPropValue}</th>
                  <th className="py-5 px-4 border-r border-b border-[#e5dfd3] w-[10%] leading-snug">{t.thRate}</th>
                  <th className="py-5 px-4 border-r border-b border-[#e5dfd3] w-[15%] leading-snug">{t.thSvComm}</th>
                  <th className="py-5 px-4 border-r border-b border-[#e5dfd3] w-[12%] bg-[#e3eaed] leading-snug">{t.thAffComm}</th>
                  <th className="py-5 px-4 border-b border-[#e5dfd3] w-[11%] bg-[#e3eaed] leading-snug">{t.thEarn}</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 font-medium">
                <tr>
                  <td className="py-5 px-4 border-r border-[#e5dfd3] text-left pl-8 font-bold text-[#1a3b47]">{t.tr1col1}</td>
                  <td className="py-5 px-4 border-r border-[#e5dfd3] bg-[#faf8f5]">{t.tr1col2}</td>
                  <td className="py-5 px-4 border-r border-[#e5dfd3]">15,000</td>
                  <td className="py-5 px-4 border-r border-[#e5dfd3] bg-[#faf8f5]">100%</td>
                  <td className="py-5 px-4 border-r border-[#e5dfd3]">15,000</td>
                  <td className="py-5 px-4 border-r border-[#e5dfd3] bg-[#f0f3f5] font-semibold text-gray-600">5%</td>
                  <td className="py-5 px-4 bg-[#f0f3f5] font-bold text-gray-800">750.00</td>
                </tr>
                <tr className="border-t border-[#e5dfd3]">
                  <td className="py-5 px-4 border-r border-[#e5dfd3] text-left pl-8 font-bold text-[#1a3b47]">{t.tr2col1}</td>
                  <td className="py-5 px-4 border-r border-[#e5dfd3] bg-[#faf8f5]">{t.tr2col2}</td>
                  <td className="py-5 px-4 border-r border-[#e5dfd3]"></td>
                  <td className="py-5 px-4 border-r border-[#e5dfd3] bg-[#faf8f5]"></td>
                  <td className="py-5 px-4 border-r border-[#e5dfd3]"></td>
                  <td className="py-5 px-4 border-r border-[#e5dfd3] bg-[#f0f3f5]"></td>
                  <td className="py-5 px-4 bg-[#f0f3f5]"></td>
                </tr>
                <tr className="border-t border-[#e5dfd3]">
                  <td className="py-5 px-4 border-r border-[#e5dfd3] text-left pl-14 font-bold text-[#CF7536]">1.50%</td>
                  <td className="py-5 px-4 border-r border-[#e5dfd3] bg-[#faf8f5]"></td>
                  <td className="py-5 px-4 border-r border-[#e5dfd3]">3,000,000</td>
                  <td className="py-5 px-4 border-r border-[#e5dfd3] bg-[#faf8f5]">1.50%</td>
                  <td className="py-5 px-4 border-r border-[#e5dfd3]">45,000</td>
                  <td className="py-5 px-4 border-r border-[#e5dfd3] bg-[#f0f3f5] font-semibold text-gray-600">10%</td>
                  <td className="py-5 px-4 bg-[#f0f3f5] font-bold text-gray-800">4,500</td>
                </tr>
                <tr className="border-t border-[#e5dfd3]">
                  <td className="py-5 px-4 border-r border-[#e5dfd3] text-left pl-14 font-bold text-[#CF7536]">2.50%</td>
                  <td className="py-5 px-4 border-r border-[#e5dfd3] bg-[#faf8f5]"></td>
                  <td className="py-5 px-4 border-r border-[#e5dfd3]">3,000,000</td>
                  <td className="py-5 px-4 border-r border-[#e5dfd3] bg-[#faf8f5]">2.50%</td>
                  <td className="py-5 px-4 border-r border-[#e5dfd3]">75,000</td>
                  <td className="py-5 px-4 border-r border-[#e5dfd3] bg-[#f0f3f5] font-semibold text-gray-600">10%</td>
                  <td className="py-5 px-4 bg-[#f0f3f5] font-bold text-gray-800">7,500</td>
                </tr>
                <tr className="border-t border-[#e5dfd3]">
                  <td className="py-5 px-4 border-r border-[#e5dfd3] text-left pl-14 font-bold text-[#CF7536]">5%</td>
                  <td className="py-5 px-4 border-r border-[#e5dfd3] bg-[#faf8f5]"></td>
                  <td className="py-5 px-4 border-r border-[#e5dfd3]">3,000,000</td>
                  <td className="py-5 px-4 border-r border-[#e5dfd3] bg-[#faf8f5]">5.00%</td>
                  <td className="py-5 px-4 border-r border-[#e5dfd3]">150,000</td>
                  <td className="py-5 px-4 border-r border-[#e5dfd3] bg-[#f0f3f5] font-semibold text-gray-600">20%</td>
                  <td className="py-5 px-4 bg-[#f0f3f5] font-bold text-gray-800">30,000</td>
                </tr>
                <tr className="border-t border-[#e5dfd3]">
                  <td className="py-5 px-4 border-r border-[#e5dfd3] text-left pl-8 font-bold text-[#1a3b47]">{t.tr6col1}</td>
                  <td className="py-5 px-4 border-r border-[#e5dfd3] bg-[#faf8f5]">3%</td>
                  <td className="py-5 px-4 border-r border-[#e5dfd3]">3,000,000</td>
                  <td className="py-5 px-4 border-r border-[#e5dfd3] bg-[#faf8f5]">3.00%</td>
                  <td className="py-5 px-4 border-r border-[#e5dfd3]">90,000</td>
                  <td className="py-5 px-4 border-r border-[#e5dfd3] bg-[#f0f3f5] font-semibold text-gray-600">10%</td>
                  <td className="py-5 px-4 bg-[#f0f3f5] font-bold text-gray-800">9,000</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-8 text-center text-[13px] text-gray-500 max-w-4xl mx-auto leading-relaxed">
            {t.tableNote}
          </div>
        </div>

        {/* THAI INFO SECTION */}
        <div className="mt-28 md:mt-36 max-w-5xl mx-auto pb-10">
          <h2 className="text-3xl md:text-[40px] font-black text-[#1a3b47] tracking-tight uppercase leading-tight">
            {t.progTitle}
          </h2>
          <p className="text-gray-600 mt-5 text-[17px] max-w-2xl">
            {t.progDesc}
          </p>

          <div className="mt-14">
            <h3 className="text-[22px] font-extrabold text-[#1a3b47] mb-6">{t.whatYouGet}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { price: t.get1Price, desc: t.get1Desc },
                { price: t.get2Price, desc: t.get2Desc },
                { price: t.get3Price, desc: t.get3Desc }
              ].map((item, idx) => (
                <div key={idx} className="bg-[#fcfcfa] rounded-[20px] border border-[#e5dfd3]/80 p-8 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <h4 className="text-[40px] font-black text-[#1a3b47] mb-3">{item.price}</h4>
                  <p className="text-gray-600 text-[15px] font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 bg-white rounded-[24px] p-10 md:p-12 border border-[#e5dfd3] shadow-sm">
            <h3 className="text-[22px] font-extrabold text-[#1a3b47] mb-8">{t.howItWorks}</h3>
            <div className="space-y-6 text-gray-700 text-[16px] font-medium">
              <div className="flex gap-4">
                <span className="text-[#CF7536] font-black text-xl shrink-0">1.</span>
                <p className="mt-0.5">{t.step1.replace('1. ', '')}</p>
              </div>
              <div className="flex gap-4">
                <span className="text-[#CF7536] font-black text-xl shrink-0">2.</span>
                <p className="mt-0.5">{t.step2.replace('2. ', '')}</p>
              </div>
              <div className="flex gap-4">
                <span className="text-[#CF7536] font-black text-xl shrink-0">3.</span>
                <p className="mt-0.5">{t.step3.replace('3. ', '')}</p>
              </div>
              <div className="flex gap-4">
                <span className="text-[#CF7536] font-black text-xl shrink-0">4.</span>
                <p className="mt-0.5">{t.step4.replace('4. ', '')}</p>
              </div>
            </div>
            
            <div className="mt-10 pt-8 border-t border-gray-100">
              <button onClick={() => router.push('/login')} className="px-10 py-4 bg-[#1a3b47] hover:bg-[#11272f] text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all cursor-pointer">
                {t.applyBtnBottom}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
