'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation, Language } from '@/context/LanguageContext';
import { 
  LayoutDashboard, Megaphone, Pencil, FileText, User, UserPlus, 
  Image as ImageIcon, Tv, Video, BookOpen, Tag, Bell, MessageSquare, 
  Award, Search, Info, Phone, Settings, Book, ShieldAlert, Activity, 
  LogOut, ChevronDown, ChevronLeft, ChevronRight, Copy, Check, ExternalLink, Menu, X, 
  Globe, Clock, HelpCircle, Share2, Download, RotateCcw, Eye, Trash2, CheckCircle, XCircle,
  PlusCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export interface Listing {
  id: string;
  refNo: string;
  title: string;
  imageUrl: string;
  area: number;
  floor: string;
  sellPrice: number | null;
  rentPrice: number | null;
  postDate: string;
  editDate: string;
  saveDate: string;
  createdBy: string;
  views: number;
  pinned: boolean;
  status: 'online' | 'offline' | 'draft' | 'reject' | 'soldRent' | 'expire';
  location: string;
  propertyType: string;
  project: string;
  mrtBts: string;
  roomType: string;
  tags: string[];
}

export const generateMockListings = (): Listing[] => {
  const listings: Listing[] = [];
  
  listings.push({
    id: '20260520135',
    refNo: '20260520135',
    title: 'Stunning Sea View Corner Unit | For Sale at La Royale',
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=60',
    area: 106.00,
    floor: '17',
    sellPrice: 7950000,
    rentPrice: null,
    postDate: '2026-05-20 13:57:58',
    editDate: '2026-05-20 14:30:31',
    saveDate: '-',
    createdBy: 'Super Admin',
    views: 7,
    pinned: false,
    status: 'online',
    location: 'Pattaya',
    propertyType: 'Condo',
    project: 'La Royale',
    mrtBts: 'None',
    roomType: '2 Bedrooms',
    tags: ['Sea View', 'Corner Unit']
  });

  listings.push({
    id: '20260405134',
    refNo: '20260405134',
    title: 'ด่วน!!! ขายวิลล่าในฝัน พัทยาตะวันออก',
    imageUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&auto=format&fit=crop&q=60',
    area: 122.00,
    floor: '2',
    sellPrice: 9900000,
    rentPrice: null,
    postDate: '2026-04-05 18:49:45',
    editDate: '2026-04-06 09:58:03',
    saveDate: '-',
    createdBy: 'Super Admin',
    views: 56,
    pinned: false,
    status: 'online',
    location: 'Pattaya',
    propertyType: 'Villa',
    project: 'Dream Villa',
    mrtBts: 'None',
    roomType: '3 Bedrooms',
    tags: ['Pool Villa', 'Urgent Sale']
  });

  listings.push({
    id: '20260319133',
    refNo: '20260319133',
    title: 'บ้านในฝันสไตล์ครอปิคอล ณ บ้านดุสิต พัทยา เลค!',
    imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop&q=60',
    area: 171.00,
    floor: '1',
    sellPrice: 12500000,
    rentPrice: null,
    postDate: '2026-03-19 20:36:01',
    editDate: '2026-03-20 10:30:42',
    saveDate: '-',
    createdBy: 'Agent Somchai',
    views: 63,
    pinned: false,
    status: 'online',
    location: 'Pattaya',
    propertyType: 'House',
    project: 'Baan Dusit Lake',
    mrtBts: 'None',
    roomType: '4 Bedrooms',
    tags: ['Tropical', 'Garden']
  });

  const titles = [
    'Luxury Condo close to MRT Rama 9',
    'Modern Penthouse BTS Ari with city view',
    'Cozy studio room in Sukhumvit',
    'Exclusive house in Bangkok suburb',
    'High-rise condo close to BTS Siam',
    'Pool Villa in Hua Hin near beach',
    'Modern Condo with river view',
    'Single house with large garden in Chiang Mai',
  ];
  
  const locations = ['Bangkok', 'Pattaya', 'Phuket', 'Hua Hin', 'Chiang Mai'];
  const propertyTypes = ['Condo', 'House', 'Villa', 'Townhouse'];
  const roomTypes = ['1 Bedroom', '2 Bedrooms', '3 Bedrooms', '4 Bedrooms'];
  const creators = ['Super Admin', 'Agent Somchai', 'Agent Natee'];

  for (let i = 1; i <= 96; i++) {
    const idNum = 20260500000 + i;
    const loc = locations[i % locations.length];
    const type = propertyTypes[i % propertyTypes.length];
    const price = 2000000 + (i * 150000) % 20000000;
    const rentPrice = type === 'Condo' ? 12000 + (i * 1000) % 50000 : null;
    
    listings.push({
      id: idNum.toString(),
      refNo: idNum.toString(),
      title: `${titles[i % titles.length]} #${i}`,
      imageUrl: i % 2 === 0 
        ? 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=60'
        : 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=60',
      area: 30 + (i * 5) % 150,
      floor: (i % 30 + 1).toString(),
      sellPrice: i % 10 === 0 ? null : price,
      rentPrice: rentPrice,
      postDate: `2026-05-${String((i % 20) + 1).padStart(2, '0')} 10:00:00`,
      editDate: `2026-05-${String((i % 20) + 1).padStart(2, '0')} 14:00:00`,
      saveDate: '-',
      createdBy: creators[i % creators.length],
      views: Math.floor(Math.random() * 100) + 1,
      pinned: i % 15 === 0,
      status: 'online',
      location: loc,
      propertyType: type,
      project: `${type} Project ${i}`,
      mrtBts: loc === 'Bangkok' ? (i % 2 === 0 ? 'BTS Ari' : 'MRT Sukhumvit') : 'None',
      roomType: roomTypes[i % roomTypes.length],
      tags: ['Modern', 'Good Location']
    });
  }

  for (let i = 1; i <= 9; i++) {
    const idNum = 20260490000 + i;
    const loc = locations[i % locations.length];
    const type = propertyTypes[i % propertyTypes.length];
    const price = 1500000 + (i * 100000) % 10000000;
    
    listings.push({
      id: idNum.toString(),
      refNo: idNum.toString(),
      title: `Offline Listing ${type} at ${loc} #${i}`,
      imageUrl: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&auto=format&fit=crop&q=60',
      area: 40 + (i * 7) % 100,
      floor: (i % 15 + 1).toString(),
      sellPrice: price,
      rentPrice: null,
      postDate: `2026-04-${String((i % 28) + 1).padStart(2, '0')} 11:00:00`,
      editDate: `2026-04-${String((i % 28) + 1).padStart(2, '0')} 12:00:00`,
      saveDate: '-',
      createdBy: creators[i % creators.length],
      views: Math.floor(Math.random() * 20),
      pinned: false,
      status: 'offline',
      location: loc,
      propertyType: type,
      project: `${type} Project ${i}`,
      mrtBts: 'None',
      roomType: roomTypes[i % roomTypes.length],
      tags: []
    });
  }

  for (let i = 1; i <= 3; i++) {
    const idNum = 20260380000 + i;
    const loc = locations[i % locations.length];
    const type = propertyTypes[i % propertyTypes.length];
    const price = 3000000 + (i * 500000) % 15000000;
    
    listings.push({
      id: idNum.toString(),
      refNo: idNum.toString(),
      title: `Sold/Rented: Luxury ${type} in ${loc} #${i}`,
      imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop&q=60',
      area: 60 + (i * 12) % 200,
      floor: (i % 10 + 1).toString(),
      sellPrice: price,
      rentPrice: type === 'Condo' ? 25000 : null,
      postDate: `2026-03-${String((i % 28) + 1).padStart(2, '0')} 09:30:00`,
      editDate: `2026-03-${String((i % 28) + 1).padStart(2, '0')} 10:30:00`,
      saveDate: '-',
      createdBy: creators[i % creators.length],
      views: Math.floor(Math.random() * 200) + 50,
      pinned: false,
      status: 'soldRent',
      location: loc,
      propertyType: type,
      project: `${type} Project ${i}`,
      mrtBts: 'None',
      roomType: roomTypes[i % roomTypes.length],
      tags: ['Sold Out', 'Success']
    });
  }

  return listings;
};

export const adminTranslations = {
  th: {
    dashboardTitle: 'ภาพรวม',
    breadcrumbsHome: 'Home',
    breadcrumbsOverview: 'ภาพรวม',
    menuTitle: 'MENU',
    overview: 'ภาพรวม',
    whatsNew: 'มีอะไรใหม่บ้าง ?',
    customize: 'ปรับแต่งเว็บ',
    listingInfo: 'ข้อมูลประกาศ',
    members: 'สมาชิก',
    interested: 'ผู้สนใจ',
    coverImage: 'ภาพปก',
    banner: 'แบนเนอร์',
    youtubeVideo: 'วิดีโอ (Youtube)',
    articles: 'บทความ',
    promotions: 'โปรโมชัน',
    newsletter: 'รับข่าวสาร',
    reviews: 'ความคิดเห็นจากลูกค้า',
    certificates: 'ใบรับรองต่างๆ',
    jobBoard: 'ประกาศหา...',
    aboutUs: 'เกี่ยวกับเรา',
    contactInfo: 'ข้อมูลการติดต่อ',
    systemSettings: 'ตั้งค่าระบบ',
    manual: 'คู่มือ',
    admin: 'แอดมิน',
    activityLog: 'Activity log',
    logout: 'ออกจากระบบ',
    totalListings: 'ประกาศทั้งหมด',
    onlineListings: 'ประกาศออนไลน์',
    soldRentedListings: 'ประกาศขาย/เช่าแล้ว',
    offlineListings: 'ประกาศออฟไลน์',
    requestLinkTitle: 'Request link',
    requestLinkDesc: 'Copy link เพื่อส่งให้ผู้ที่สนใจสร้างเงื่อนไขเพื่อค้นหาทรัพย์ที่ต้องการ',
    copyButton: 'คัดลอก',
    copiedButton: 'คัดลอกแล้ว',
    memberSummaryTitle: 'Member summary',
    totalMembers: 'สมาชิกทั้งหมด',
    newMembersMonth: 'สมาชิกใหม่เดือนนี้',
    whatsNewTitle: 'มีอะไรใหม่บ้าง ?',
    newsBadge: 'News',
    newsTitle: 'News : สิทธิพิเศษสำหรับลูกค้า MyOwnWeb เรียนเชิญเข้าร่วมงานสัมมนาอสังหาฯแห่งปี Next 8.0 Conference 2025',
    newsSubtitle1: 'Next 8.0 Conference 2025',
    newsSubtitle2: 'Living The NEXT chapter, together We build tomorrow',
    newsDescription: 'เวทีที่เน้นการติดอาวุธให้ผู้เข้าร่วมพร้อมรับมือกับคลื่นแห่งการเปลี่ยนแปลงครั้งใหญ่ (The Challenge), นำพาตนเองและองค์กรเข้าสู่ยุคดิจิทัลและ AI (The Change), และปลดล็อกโอกาสการเติบโตและการลงทุนในอนาคต (The Chance). เป็นการรวมพลังของข้อมูลเชิงลึก (Data), นวัตกรรม (Technology/AI), และกลยุทธ์การเงิน (Investment) เพื่อร่วมกันสร้างบทต่อไป',
    newsDate: 'วันศุกร์ที่ 21 พฤศจิกายน 2568 (เวลา 11.00 - 18.30 น.)',
    newsVenue: 'สถานที่ : True Digital Park (Grand Hall ชั้น 3)',
    allListings: 'ประกาศทั้งหมด',
    onlineListings: 'ประกาศออนไลน์',
    draftListings: 'ประกาศแบบร่าง',
    offlineListings: 'ประกาศออฟไลน์',
    rejectListings: 'ประกาศไม่อนุมัติ',
    soldRentListings: 'ประกาศขาย/เช่าแล้ว',
    expireListings: 'ประกาศหมดอายุ',
    branchInfo: 'ข้อมูลสาขา',
    contactChannels: 'ช่องทางการติดต่อ',
    set_website: 'ตั้งค่าทั่วไป',
    set_agreement: 'Agreement',
    set_analytic: 'Tracking code',
    set_project: 'โครงการ',
    set_area: 'พื้นที่',
    set_permission: 'กำหนดสิทธิ์',
    set_station: 'สถานีรถไฟฟ้า',
    set_education: 'โรงเรียนและมหาวิทยาลัย',
    set_hospital: 'โรงพยาบาล',
    set_product_fee: 'ค่าธรรมเนียมสินค้า',
    set_tag: 'แท็ก',
    set_document: 'ป้องกันและจัดเอกสาร',
    set_mail: 'Mail Template',
    set_meta: 'Meta Tag',
    version: 'เวอร์ชัน'
  },
  en: {
    dashboardTitle: 'Overview',
    breadcrumbsHome: 'Home',
    breadcrumbsOverview: 'Overview',
    menuTitle: 'MENU',
    overview: 'Overview',
    whatsNew: "What's New?",
    customize: 'Website Customize',
    listingInfo: 'Listing Information',
    members: 'Members',
    interested: 'Interested Persons',
    coverImage: 'Cover Images',
    banner: 'Banners',
    youtubeVideo: 'Video (Youtube)',
    articles: 'Articles',
    promotions: 'Promotions',
    newsletter: 'Newsletter',
    reviews: 'Customer Reviews',
    certificates: 'Certificates',
    jobBoard: 'Requests...',
    aboutUs: 'About Us',
    contactInfo: 'Contact Information',
    systemSettings: 'System Settings',
    manual: 'Manual',
    admin: 'Admin',
    activityLog: 'Activity log',
    logout: 'Logout',
    totalListings: 'Total Listings',
    onlineListings: 'Online Listings',
    soldRentedListings: 'Sold/Rented',
    offlineListings: 'Offline Listings',
    requestLinkTitle: 'Request link',
    requestLinkDesc: 'Copy link to send to clients to specify criteria and search for desired properties.',
    copyButton: 'Copy',
    copiedButton: 'Copied',
    memberSummaryTitle: 'Member summary',
    totalMembers: 'Total Members',
    newMembersMonth: 'New Members This Month',
    whatsNewTitle: "What's New?",
    newsBadge: 'News',
    newsTitle: 'News: Special privileges for MyOwnWeb customers. Cordially invited to the real estate seminar of the year "Next 8.0 Conference 2025"',
    newsSubtitle1: 'Next 8.0 Conference 2025',
    newsSubtitle2: 'Living The NEXT chapter, together We build tomorrow',
    newsDescription: 'A seminar focusing on equipping participants to cope with the wave of major changes (The Challenge), leading themselves and their organizations into the digital and AI era (The Change), and unlocking future growth and investment opportunities (The Chance). It is an integration of deep data (Data), innovation (Technology/AI), and financial strategy (Investment) to build the next chapter together.',
    newsDate: 'Friday, November 21, 2025 (Time: 11.00 - 18.30)',
    newsVenue: 'Location: True Digital Park (Grand Hall, 3rd Floor)',
    allListings: 'All Listings',
    onlineListings: 'Online Listings',
    draftListings: 'Draft Listings',
    offlineListings: 'Offline Listings',
    rejectListings: 'Rejected Listings',
    soldRentListings: 'Sold/Rented Listings',
    expireListings: 'Expired Listings',
    branchInfo: 'Branch Info',
    contactChannels: 'Contact Channels',
    set_website: 'General Settings',
    set_agreement: 'Agreement',
    set_analytic: 'Tracking code',
    set_project: 'Projects',
    set_area: 'Areas',
    set_permission: 'Permissions',
    set_station: 'Stations',
    set_education: 'Education',
    set_hospital: 'Hospitals',
    set_product_fee: 'Product Fees',
    set_tag: 'Tags',
    set_document: 'Document Protection',
    set_mail: 'Mail Template',
    set_meta: 'Meta Tag',
    version: 'Version'
  }
};

export const languageFlags: Record<Language, string> = {
  th: '🇹🇭',
  en: '🇺🇸',
  ru: '🇷🇺',
  zh: '🇨🇳',
  ja: '🇯🇵',
  ko: '🇰🇷'
};

export const languageNames: Record<Language, string> = {
  th: 'ไทย (TH)',
  en: 'English (EN)',
  ru: 'Русский (RU)',
  zh: '中文 (ZH)',
  ja: '日本語 (JA)',
  ko: '한국어 (KO)'
};

const menuStructure = [
  { id: 'overview', labelKey: 'overview', icon: LayoutDashboard, badge: null, hasSubmenu: false },
  { id: 'whatsNew', labelKey: 'whatsNew', icon: Megaphone, badge: { text: 'N', color: 'bg-red-500 text-white animate-pulse' }, hasSubmenu: false },
  { id: 'customize', labelKey: 'customize', icon: Pencil, badge: null, hasSubmenu: false },
  { 
    id: 'listingInfo', 
    labelKey: 'listingInfo', 
    icon: FileText, 
    badge: null, 
    hasSubmenu: true, 
    subItems: [
      { id: 'allListings', labelKey: 'allListings' },
      { id: 'onlineListings', labelKey: 'onlineListings' },
      { id: 'draftListings', labelKey: 'draftListings' },
      { id: 'offlineListings', labelKey: 'offlineListings' },
      { id: 'rejectListings', labelKey: 'rejectListings' },
      { id: 'soldRentListings', labelKey: 'soldRentListings' },
      { id: 'expireListings', labelKey: 'expireListings' }
    ]
  },
  { id: 'members', labelKey: 'members', icon: User, badge: null, hasSubmenu: false },
  { id: 'interested', labelKey: 'interested', icon: UserPlus, badge: { text: '3', color: 'bg-[#0088FF] text-white' }, hasSubmenu: false },
  { id: 'coverImage', labelKey: 'coverImage', icon: ImageIcon, badge: null, hasSubmenu: false },
  { id: 'banner', labelKey: 'banner', icon: Tv, badge: null, hasSubmenu: false },
  { id: 'youtubeVideo', labelKey: 'youtubeVideo', icon: Video, badge: null, hasSubmenu: false },
  { id: 'articles', labelKey: 'articles', icon: BookOpen, badge: null, hasSubmenu: false },
  { id: 'promotions', labelKey: 'promotions', icon: Tag, badge: null, hasSubmenu: false },
  { id: 'newsletter', labelKey: 'newsletter', icon: Bell, badge: null, hasSubmenu: false },
  { id: 'reviews', labelKey: 'reviews', icon: MessageSquare, badge: null, hasSubmenu: false },
  { id: 'certificates', labelKey: 'certificates', icon: Award, badge: null, hasSubmenu: false },
  { id: 'jobBoard', labelKey: 'jobBoard', icon: Megaphone, badge: null, hasSubmenu: false },
  { id: 'aboutUs', labelKey: 'aboutUs', icon: Info, badge: null, hasSubmenu: false },
  { 
    id: 'contactInfo', 
    labelKey: 'contactInfo', 
    icon: Phone, 
    badge: null, 
    hasSubmenu: true, 
    subItems: [
      { id: 'branchInfo', labelKey: 'branchInfo' },
      { id: 'contactChannels', labelKey: 'contactChannels' }
    ]
  },
  { 
    id: 'systemSettings', 
    labelKey: 'systemSettings', 
    icon: Settings, 
    badge: null, 
    hasSubmenu: true, 
    subItems: [
      { id: 'set_website', labelKey: 'set_website' },
      { id: 'set_agreement', labelKey: 'set_agreement' },
      { id: 'set_analytic', labelKey: 'set_analytic' },
      { id: 'set_project', labelKey: 'set_project' },
      { id: 'set_area', labelKey: 'set_area' },
      { id: 'set_permission', labelKey: 'set_permission' },
      { id: 'set_station', labelKey: 'set_station' },
      { id: 'set_education', labelKey: 'set_education' },
      { id: 'set_hospital', labelKey: 'set_hospital' },
      { id: 'set_product_fee', labelKey: 'set_product_fee' },
      { id: 'set_tag', labelKey: 'set_tag' },
      { id: 'set_document', labelKey: 'set_document' },
      { id: 'set_mail', labelKey: 'set_mail' },
      { id: 'set_meta', labelKey: 'set_meta' }
    ]
  },
  { id: 'manual', labelKey: 'manual', icon: Book, badge: null, hasSubmenu: false },
  { id: 'admin', labelKey: 'admin', icon: ShieldAlert, badge: null, hasSubmenu: false },
  { id: 'activityLog', labelKey: 'activityLog', icon: Activity, badge: null, hasSubmenu: false },
];

interface SubItem {
  id: string;
  labelKey: string;
}

interface MenuItem {
  id: string;
  labelKey: string;
  icon?: any;
  badge?: { text: string; color: string } | null;
  hasSubmenu: boolean;
  subItems?: SubItem[];
}

interface CollapsibleMenuItemProps {
  item: MenuItem;
  tAdmin: any;
  activeItem: string;
  onMenuClick: (id: string) => void;
  counts?: Record<string, number>;
}

const CollapsibleMenuItem: React.FC<CollapsibleMenuItemProps> = ({
  item,
  tAdmin,
  activeItem,
  onMenuClick,
  counts,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = item.icon;
  const isSelected = activeItem === item.id || (item.hasSubmenu && item.subItems?.some(s => activeItem === s.id));

  useEffect(() => {
    if (item.hasSubmenu && item.subItems?.some(s => activeItem === s.id)) {
      setIsOpen(true);
    }
  }, [activeItem, item.subItems, item.hasSubmenu]);

  const label = tAdmin[item.labelKey] || item.labelKey;

  if (item.hasSubmenu) {
    return (
      <div className="w-full">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between px-4 py-2.5 my-0.5 text-sm font-medium rounded-lg transition-colors duration-200 cursor-pointer ${
            isSelected 
              ? 'bg-[#CF7536]/10 text-[#CF7536]' 
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <div className="flex items-center space-x-3">
            {Icon && <Icon className={`w-4 h-4 ${isSelected ? 'text-[#CF7536]' : 'text-gray-400'}`} />}
            <span>{label}</span>
          </div>
          <div className="flex items-center">
            <ChevronLeft className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${isOpen ? 'transform -rotate-90' : ''}`} />
          </div>
        </button>
        
        <div
          className={`grid transition-[grid-template-rows,opacity] duration-200 ease-in-out ${
            isOpen ? 'grid-rows-[1fr] opacity-100 mt-0.5' : 'grid-rows-[0fr] opacity-0'
          } overflow-hidden pl-10 pr-2`}
        >
          <div className="min-h-0 space-y-1 py-0.5">
            {item.subItems?.map((sub) => {
              const subLabel = tAdmin[sub.labelKey] || sub.labelKey;
              const countKey = sub.id.replace('Listings', '');
              const countVal = counts ? counts[countKey] : undefined;
              const showCount = ['allListings', 'onlineListings', 'draftListings', 'offlineListings', 'rejectListings', 'soldRentListings', 'expireListings'].includes(sub.id);
              
              return (
                <button
                  key={sub.id}
                  onClick={() => onMenuClick(sub.id)}
                  className={`w-full text-left py-2 px-3 text-xs rounded-md transition-colors duration-200 cursor-pointer flex justify-between items-center ${
                    activeItem === sub.id
                      ? 'bg-[#CF7536] text-white font-semibold'
                      : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'
                  }`}
                >
                  <span>
                    {subLabel}
                    {showCount && countVal !== undefined ? ` (${countVal})` : ''}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => onMenuClick(item.id)}
      className={`w-full flex items-center justify-between px-4 py-2.5 my-0.5 text-sm font-medium rounded-lg transition-colors duration-200 cursor-pointer ${
        isSelected 
          ? 'bg-[#CF7536]/10 text-[#CF7536] font-semibold border-l-4 border-[#CF7536] rounded-l-none' 
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      <div className="flex items-center space-x-3">
        {Icon && <Icon className={`w-4 h-4 ${isSelected ? 'text-[#CF7536]' : 'text-gray-400'}`} />}
        <span>{label}</span>
      </div>
      
      {item.badge && (
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.badge.color}`}>
          {item.badge.text}
        </span>
      )}
    </button>
  );
};

interface AdminShellProps {
  activeItem: string;
  setActiveItem?: (id: string) => void;
  children: React.ReactNode;
}

export const AdminShell: React.FC<AdminShellProps> = ({
  activeItem,
  setActiveItem,
  children,
}) => {
  const { language, setLanguage, isMounted } = useTranslation();
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [listings, setListings] = useState<Listing[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('stayverse_listings');
      if (stored) {
        setListings(JSON.parse(stored));
      } else {
        const generated = generateMockListings();
        localStorage.setItem('stayverse_listings', JSON.stringify(generated));
        setListings(generated);
      }
    }
  }, []);

  const tabCounts = React.useMemo(() => {
    return {
      all: listings.length,
      online: listings.filter(l => l.status === 'online').length,
      offline: listings.filter(l => l.status === 'offline').length,
      draft: listings.filter(l => l.status === 'draft').length,
      reject: listings.filter(l => l.status === 'reject').length,
      soldRent: listings.filter(l => l.status === 'soldRent').length,
      expire: listings.filter(l => l.status === 'expire').length,
    };
  }, [listings]);

  const handleMenuClick = (itemId: string) => {
    setMobileSidebarOpen(false);
    if (itemId === 'members') {
      router.push('/admin/members/index');
    } else if (itemId === 'whatsNew') {
      router.push('/admin/releases');
    } else if (itemId === 'overview') {
      router.push('/admin');
    } else if (['allListings', 'onlineListings', 'draftListings', 'offlineListings', 'rejectListings', 'soldRentListings', 'expireListings'].includes(itemId)) {
      const mapping: Record<string, string> = {
        allListings: '?action=reset',
        onlineListings: '?search_action=search&web_status=1',
        draftListings: '?search_action=search&web_status=2',
        offlineListings: '?search_action=search&web_status=0',
        rejectListings: '?search_action=search&web_status=3',
        soldRentListings: '?search_action=search&web_status=51',
        expireListings: '?search_action=search&web_status=9'
      };
      router.push(`/admin/post_list${mapping[itemId]}`);
    } else if (itemId.startsWith('set_')) {
      router.push(`/admin/${itemId}`);
    } else {
      if (typeof window !== 'undefined' && window.location.pathname === '/admin') {
        if (setActiveItem) {
          setActiveItem(itemId);
        }
      } else {
        router.push(`/admin?activeItem=${itemId}`);
      }
    }
  };

  const tAdmin = adminTranslations[language] || adminTranslations.en;

  if (!isMounted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-800">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#CF7536]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f7f9] text-[#1E1612] font-sans flex flex-col">
      {/* 1. TOP HEADER NAVIGATION BAR */}
      <header className="bg-white border-b border-gray-200/80 sticky top-0 z-30 shadow-sm flex items-center justify-between px-4 md:px-6 h-[64px]">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)} 
            className="md:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <a href="/admin" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#CF7536] to-[#A15A28] flex items-center justify-center text-white font-extrabold text-sm shadow-md">
              SV
            </div>
            <span className="font-extrabold text-xl tracking-tight text-gray-800 hidden sm:inline-block">
              STAY<span className="text-[#CF7536]">VERSE</span>
            </span>
          </a>
          
          <div className="h-4 w-[1px] bg-gray-300 hidden md:block"></div>
          
          <a 
            href="/" 
            className="text-xs font-semibold text-gray-500 hover:text-[#CF7536] transition-colors hidden md:inline-block uppercase tracking-wider"
          >
            Home
          </a>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button 
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center space-x-1.5 px-2.5 py-1.5 border border-gray-200 bg-white hover:bg-gray-50 text-xs font-semibold text-gray-700 rounded-lg shadow-sm transition-all duration-200 cursor-pointer"
            >
              <span>{languageFlags[language]}</span>
              <span className="uppercase text-gray-600">{language}</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>

            {langDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setLangDropdownOpen(false)}
                ></div>
                
                <div className="absolute right-0 mt-1 w-44 bg-white border border-gray-200/80 rounded-xl shadow-xl z-50 py-1 overflow-hidden">
                  {(Object.keys(languageFlags) as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs flex items-center space-x-2.5 hover:bg-gray-50 ${
                        language === lang ? 'bg-[#CF7536]/10 text-[#CF7536] font-bold' : 'text-gray-600'
                      }`}
                    >
                      <span>{languageFlags[lang]}</span>
                      <span>{languageNames[lang]}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="flex items-center space-x-2.5 border-l border-gray-200 pl-4">
            <div className="w-8 h-8 rounded-full bg-[#CF7536] text-white font-bold flex items-center justify-center shadow-sm text-sm uppercase">
              A
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-bold text-gray-800">Admin Stayverse</span>
              <span className="text-[10px] text-gray-400">Super Administrator</span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. MAIN CONTAINER SIDEBAR + CONTENT */}
      <div className="flex-1 flex relative">
        <AnimatePresence>
          {mobileSidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileSidebarOpen(false)}
                className="fixed inset-0 bg-black z-40 md:hidden"
              />
              
              <motion.aside
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 bottom-0 left-0 w-[260px] bg-white border-r border-gray-200 shadow-2xl z-50 flex flex-col md:hidden"
              >
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#CF7536] to-[#A15A28] flex items-center justify-center text-white font-extrabold text-xs">
                      SV
                    </div>
                    <span className="font-extrabold text-lg text-gray-800">
                      STAY<span className="text-[#CF7536]">VERSE</span>
                    </span>
                  </div>
                  <button 
                    onClick={() => setMobileSidebarOpen(false)}
                    className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
                  <span className="px-4 text-[10px] font-bold text-gray-400 tracking-wider block mb-2">{tAdmin.menuTitle}</span>
                  {menuStructure.map((item) => (
                    <CollapsibleMenuItem
                      key={item.id}
                      item={item}
                      tAdmin={tAdmin}
                      activeItem={activeItem}
                      onMenuClick={handleMenuClick}
                      counts={tabCounts}
                    />
                  ))}
                  
                  <div className="border-t border-gray-100 pt-4 mt-4">
                    <a 
                      href="/"
                      className="w-full flex items-center px-4 py-2.5 text-sm font-medium text-red-650 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      <span>{tAdmin.logout}</span>
                    </a>
                  </div>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        <aside className="w-[260px] bg-white border-r border-gray-200/80 hidden md:flex flex-col shrink-0">
          <div className="flex-1 overflow-y-auto px-3.5 py-5 space-y-1 select-none">
            <span className="px-4 text-[10px] font-extrabold text-gray-400 tracking-widest block mb-2">{tAdmin.menuTitle}</span>
            {menuStructure.map((item) => (
              <CollapsibleMenuItem
                key={item.id}
                item={item}
                tAdmin={tAdmin}
                activeItem={activeItem}
                onMenuClick={handleMenuClick}
                counts={tabCounts}
              />
            ))}
            
            <div className="border-t border-gray-100 pt-4 mt-6">
              <a 
                href="/"
                className="w-full flex items-center px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 hover:text-red-700 rounded-lg transition-all duration-200 cursor-pointer"
              >
                <LogOut className="w-4 h-4 mr-3 text-red-400" />
                <span>{tAdmin.logout}</span>
              </a>
            </div>
          </div>
        </aside>

        <main className="flex-1 min-w-0 overflow-y-auto p-4 md:p-6 lg:p-8 flex flex-col justify-between">
          <div>
            {children}
          </div>

          <footer className="border-t border-gray-200/80 pt-6 mt-12 text-xs font-semibold text-gray-400 flex flex-col sm:flex-row justify-between items-center gap-3">
            <div>
              <span>Copyright © 2026 All rights reserved.</span>
            </div>
            <div>
              <span>Version 3.0.2</span>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};
