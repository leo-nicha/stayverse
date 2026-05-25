'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminShell } from '../AdminShell';
import { Search, RefreshCcw, Tag, Clock, FileText } from 'lucide-react';
import { useTranslation } from '@/context/LanguageContext';

interface ReleaseItem {
  id: string;
  version: string;
  dateStr: string;
  title: string;
  content: React.ReactNode;
}

export default function ReleasesPage() {
  const router = useRouter();
  const { language } = useTranslation();
  const isTh = language === 'th';

  const [searchTerm, setSearchTerm] = useState('');
  
  const releases: ReleaseItem[] = [
    {
      id: '1',
      version: 'v.18.11.2025',
      dateStr: '18 พ.ย. 2568',
      title: 'News : สิทธิพิเศษสำหรับลูกค้า MyOwnWeb เรียนเชิญเข้าร่วมงานสัมมนาอสังหาฯแห่งปี Next 8.0 Conference 2025',
      content: (
        <div className="space-y-4 text-[13px] text-gray-700 leading-relaxed mt-2">
          <div>
            <span className="font-bold">Next 8.0 Conference 2025</span><br />
            <span className="font-bold">Living The NEXT chapter, together We build tomorrow</span>
          </div>
          <p>
            เวทีที่เน้นการติดอาวุธให้ผู้เข้าร่วมพร้อมรับมือกับคลื่นแห่งการเปลี่ยนแปลงครั้งใหญ่ (The Challenge), นำพาตนเองและองค์กรเข้าสู่ยุคดิจิทัลและ AI (The Change), และปลดล็อกโอกาสการเติบโตและการลงทุนในอนาคต (The Chance). เป็นการรวมพลังกันของข้อมูลเชิงลึก (Data), นวัตกรรม (Technology/AI), และกลยุทธ์การเงิน (Investment) เพื่อร่วมกันสร้างบทต่อไป
          </p>
          <p>
            วันศุกร์ที่ 21 พฤศจิกายน 2568 (เวลา 11.00 - 18.30 น.)<br />
            สถานที่ : True Digital Park (Grand Hall ชั้น 3)
          </p>
        </div>
      )
    },
    {
      id: '2',
      version: 'v.1.0.6',
      dateStr: '8 เม.ย. 2568',
      title: 'Update_1.0.6_08042025',
      content: (
        <p className="text-[13px] text-gray-700 leading-relaxed mt-2">
          อัปเดตระบบ MyOwnWeb เพิ่มการใส่ข้อมูลปล่อยเช่าระยะสั้น, support การ Sync data ประกาศจาก livinginsider.com รูปแบบใหม่, กำหนดข้อมูลการติดต่อในหน้ารายละเอียดทรัพย์ของแต่ละประกาศได้, เพิ่มการรองรับ Link TikTok ในการแสดงของข้อมูลทรัพย์, เพิ่มช่องทาง Instagram และ TikTok ในข้อมูลการติดต่อ และ เพิ่มการสร้างโครงการสำหรับทรัพย์ประเภทอื่นๆ
        </p>
      )
    },
    {
      id: '3',
      version: 'v.1.0.5',
      dateStr: '18 ต.ค. 2567',
      title: 'Update_1.0.5_18102024',
      content: (
        <p className="text-[13px] text-gray-700 leading-relaxed mt-2">
          อัปเดตระบบ MyOwnWeb เพิ่มการติด Tag ในประกาศ และ เพิ่มการแสดงจำนวนประกาศหน้าแรกของเว็บไซต์
        </p>
      )
    },
    {
      id: '4',
      version: 'v.1.0.4',
      dateStr: '2 ก.ย. 2567',
      title: 'Update_1.0.4_02092024',
      content: (
        <p className="text-[13px] text-gray-700 leading-relaxed mt-2">
          อัพเดตการเพิ่มธีม Luxury Theme โดยมีโทนสีให้เลือกถึง 10 สี
        </p>
      )
    }
  ];

  return (
    <AdminShell activeItem="whatsNew">
      <div className="bg-[#f8f9fc] min-h-screen">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 py-4 bg-white border-b border-gray-100">
          <h1 className="text-xl font-bold text-gray-800 tracking-tight">
            {isTh ? 'มีอะไรใหม่บ้าง ?' : "What's New?"}
          </h1>
          <div className="text-[13px] text-gray-400 mt-2 sm:mt-0 flex items-center space-x-2 select-none">
            <span className="hover:text-blue-500 cursor-pointer transition-colors" onClick={() => router.push('/admin')}>Home</span>
            <span>/</span>
            <span className="text-blue-500">{isTh ? 'มีอะไรใหม่บ้าง ?' : "What's New?"}</span>
          </div>
        </div>

        <div className="p-6">
          {/* Top Actions */}
          <div className="bg-white rounded-t-md border border-gray-200 border-b-0 p-4">
            <div className="flex flex-col sm:flex-row justify-end items-center gap-3">
              <div className="flex items-center border border-gray-200 rounded-md overflow-hidden bg-white h-9 w-full sm:w-auto">
                <select className="px-3 py-1.5 text-[13px] text-gray-700 focus:outline-none bg-transparent h-full w-full sm:w-48 appearance-none">
                  <option value="latest">{isTh ? 'เรียงตามไทม์ไลน์ล่าสุด' : 'Sort by latest timeline'}</option>
                  <option value="oldest">{isTh ? 'เรียงตามไทม์ไลน์เก่าสุด' : 'Sort by oldest timeline'}</option>
                </select>
                <div className="px-2 pointer-events-none text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none bg-[#6F42C1] hover:bg-[#5A32A3] text-white px-5 py-1.5 rounded-md flex items-center justify-center gap-1.5 text-[13px] font-medium transition-colors h-9">
                  <Search className="w-4 h-4" />
                  {isTh ? 'Search' : 'Search'}
                </button>
                <button className="flex-1 sm:flex-none bg-white hover:bg-gray-50 text-gray-700 px-5 py-1.5 rounded-md flex items-center justify-center gap-1.5 text-[13px] font-medium transition-colors border border-gray-200 h-9">
                  <RefreshCcw className="w-3.5 h-3.5" />
                  {isTh ? 'Reset' : 'Reset'}
                </button>
              </div>
            </div>
          </div>

          {/* Pagination Top */}
          <div className="bg-gray-50/50 px-4 py-3 border-l border-r border-gray-200 flex justify-end items-center text-[13px]">
            <div className="flex items-center gap-1 text-[13px]">
              <span className="px-2 py-1 text-gray-400 cursor-not-allowed">« First</span>
              <span className="px-2 py-1 text-[#6F42C1] bg-purple-50 rounded font-medium">1</span>
              <span className="px-2 py-1 text-gray-400 cursor-not-allowed">Last »</span>
            </div>
          </div>

          {/* List Container */}
          <div className="bg-white border-l border-r border-b border-gray-200 rounded-b-md shadow-sm">
            <div className="divide-y divide-gray-100">
              {releases.map((release) => (
                <div key={release.id} className="p-6 hover:bg-gray-50/30 transition-colors relative">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex items-center gap-1 text-[#6F42C1] text-sm font-semibold">
                      <Tag className="w-4 h-4 fill-current opacity-20" />
                      {release.version}
                    </span>
                    <span className="inline-flex items-center gap-1 bg-[#0088FF] text-white text-[11px] font-medium px-2 py-0.5 rounded-sm">
                      <Clock className="w-3 h-3" />
                      {release.dateStr}
                    </span>
                    <div className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 cursor-pointer">
                      <FileText className="w-4 h-4" />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-base font-bold text-gray-800 mb-2">
                      {release.title}
                    </h3>
                    {release.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
