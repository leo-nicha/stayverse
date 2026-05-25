'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminShell } from '../AdminShell';
import { useTranslation } from '@/context/LanguageContext';

export default function SetWebsitePage() {
  const router = useRouter();
  const { language } = useTranslation();

  // Settings states
  const [companyName, setCompanyName] = useState('Stayverse');
  const [businessThemeLimit, setBusinessThemeLimit] = useState('4');
  const [luxuryThemeLimit, setLuxuryThemeLimit] = useState('9');
  const [additionalDetailsTh, setAdditionalDetailsTh] = useState('');
  const [additionalDetailsEn, setAdditionalDetailsEn] = useState('');
  const [shareUrlRefNo, setShareUrlRefNo] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('stayverse_set_website');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setCompanyName(parsed.companyName ?? 'Stayverse');
          setBusinessThemeLimit(parsed.businessThemeLimit ?? '4');
          setLuxuryThemeLimit(parsed.luxuryThemeLimit ?? '9');
          setAdditionalDetailsTh(parsed.additionalDetailsTh ?? '');
          setAdditionalDetailsEn(parsed.additionalDetailsEn ?? '');
          setShareUrlRefNo(parsed.shareUrlRefNo ?? false);
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  const handleReset = () => {
    setCompanyName('Stayverse');
    setBusinessThemeLimit('4');
    setLuxuryThemeLimit('9');
    setAdditionalDetailsTh('');
    setAdditionalDetailsEn('');
    setShareUrlRefNo(false);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      companyName,
      businessThemeLimit,
      luxuryThemeLimit,
      additionalDetailsTh,
      additionalDetailsEn,
      shareUrlRefNo,
    };
    localStorage.setItem('stayverse_set_website', JSON.stringify(data));
    alert(language === 'th' ? 'บันทึกข้อมูลเรียบร้อยแล้ว' : 'Settings updated successfully');
  };

  return (
    <AdminShell activeItem="set_website">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-row justify-between items-center pb-5 mb-5 border-b border-gray-200/60 select-none">
        <h1 className="text-xl font-bold text-gray-800 flex items-center">
          ตั้งค่าทั่วไป <span className="text-gray-400 mx-2 text-base font-normal">&gt;</span> <span className="text-gray-500 font-normal">แก้ไข</span>
        </h1>
        <div className="text-xs text-[#0088FF] flex items-center space-x-1.5">
          <span className="hover:underline cursor-pointer" onClick={() => router.push('/admin')}>home</span>
          <span className="text-gray-400">/</span>
          <span className="hover:underline cursor-pointer" onClick={() => router.push('/admin/set_website')}>ตั้งค่าทั่วไป</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-500">แก้ไข</span>
        </div>
      </div>

      {/* Main Card Container */}
      <div className="bg-white border border-gray-200 rounded-md shadow-sm max-w-7xl overflow-hidden mb-6">
        {/* Title block */}
        <div className="px-6 py-4 border-b border-gray-200 bg-white">
          <h2 className="text-sm font-bold text-gray-800">ตั้งค่าทั่วไป</h2>
        </div>

        <form onSubmit={handleUpdate} className="text-xs">
          
          {/* Row 1: ชื่อบริษัท หรือ ชื่อธุรกิจ */}
          <div className="px-6 py-5 border-b border-gray-200/60">
            <div className="font-bold text-gray-700 text-xs mb-2">
              ชื่อบริษัท หรือ ชื่อธุรกิจ
            </div>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full text-xs bg-white border border-gray-200 rounded p-2.5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#6F42C1] focus:border-[#6F42C1] transition-all"
              required
            />
          </div>

          {/* Section Header: ตั้งค่าหน้าแรก */}
          <div className="bg-[#F8F9FA] border-b border-gray-200/60 px-6 py-3 font-bold text-gray-700 text-xs">
            ตั้งค่าหน้าแรก
          </div>

          {/* Row 2: จำนวนประกาศ Business Theme */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 py-5 border-b border-gray-200/60 items-start">
            <div className="md:col-span-1 font-bold text-gray-700 text-xs pt-2.5">
              จำนวนประกาศล่าสุดที่ต้องการแสดง Business Theme
            </div>
            <div className="md:col-span-2 space-y-1">
              <input
                type="number"
                value={businessThemeLimit}
                onChange={(e) => setBusinessThemeLimit(e.target.value)}
                className="w-full md:w-[320px] text-xs bg-white border border-gray-200 rounded p-2.5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#6F42C1] focus:border-[#6F42C1] transition-all"
                required
              />
              <div className="text-[11px] text-red-500 mt-1">
                * ค่าเริ่มต้นของจำนวนประกาศล่าสุด คือ 4 ประกาศ
              </div>
            </div>
          </div>

          {/* Row 3: จำนวนประกาศ Luxury Theme */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 py-5 border-b border-gray-200/60 items-start">
            <div className="md:col-span-1 font-bold text-gray-700 text-xs pt-2.5">
              จำนวนประกาศล่าสุดที่ต้องการแสดง Luxury Theme
            </div>
            <div className="md:col-span-2 space-y-1">
              <input
                type="number"
                value={luxuryThemeLimit}
                onChange={(e) => setLuxuryThemeLimit(e.target.value)}
                className="w-full md:w-[320px] text-xs bg-white border border-gray-200 rounded p-2.5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#6F42C1] focus:border-[#6F42C1] transition-all"
                required
              />
              <div className="text-[11px] text-red-500 mt-1">
                * ค่าเริ่มต้นของจำนวนประกาศล่าสุด คือ 9 ประกาศ
              </div>
            </div>
          </div>

          {/* Row 4: รายละเอียดเพิ่มเติม [TH] */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 py-5 border-b border-gray-200/60 items-start">
            <div className="md:col-span-1 font-bold text-gray-700 text-xs pt-2.5">
              รายละเอียดเพิ่มเติม [TH]
            </div>
            <div className="md:col-span-2 space-y-1">
              <textarea
                placeholder="รายละเอียดเพิ่มเติม [TH]"
                value={additionalDetailsTh}
                onChange={(e) => setAdditionalDetailsTh(e.target.value)}
                rows={5}
                className="w-full text-xs bg-white border border-gray-200 rounded p-2.5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#6F42C1] focus:border-[#6F42C1] transition-all"
              />
              <div className="text-[11px] text-red-500 mt-1">
                * แสดงผลหน้ารายละเอียดและระบุประกาศทุกประเภท โดยจะแสดงหน้าจำนวนรายละเอียด
              </div>
            </div>
          </div>

          {/* Row 5: รายละเอียดเพิ่มเติม [EN] */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 py-5 border-b border-gray-200/60 items-start">
            <div className="md:col-span-1 font-bold text-gray-700 text-xs pt-2.5">
              รายละเอียดเพิ่มเติม [EN]
            </div>
            <div className="md:col-span-2 space-y-1">
              <textarea
                placeholder="รายละเอียดเพิ่มเติม [EN]"
                value={additionalDetailsEn}
                onChange={(e) => setAdditionalDetailsEn(e.target.value)}
                rows={5}
                className="w-full text-xs bg-white border border-gray-200 rounded p-2.5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#6F42C1] focus:border-[#6F42C1] transition-all"
              />
              <div className="text-[11px] text-red-500 mt-1">
                * แสดงผลรายละเอียดและระบุประกาศทุกประเภท โดยจะแสดงหน้าจำนวนรายละเอียด
              </div>
            </div>
          </div>

          {/* Section Header: ตั้งค่าหน้ารายละเอียดประกาศ */}
          <div className="bg-[#F8F9FA] border-b border-gray-200/60 px-6 py-3 font-bold text-gray-700 text-xs">
            ตั้งค่าหน้ารายละเอียดประกาศ
          </div>

          {/* Row 6: แชร์ประกาศ Url แบบ Ref No */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 py-5 border-b border-gray-200/60 items-center">
            <div className="md:col-span-1 font-bold text-gray-700 text-xs">
              แชร์ประกาศ Url แบบ Ref No
            </div>
            <div className="md:col-span-2">
              <button
                type="button"
                onClick={() => setShareUrlRefNo(!shareUrlRefNo)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  shareUrlRefNo ? 'bg-[#5B21B6]' : 'bg-[#737373]'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    shareUrlRefNo ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Bottom Action Row */}
          <div className="bg-[#F8F9FA] px-6 py-4 flex items-center gap-2 border-t border-gray-200/60">
            <button
              type="submit"
              className="bg-[#5B21B6] hover:bg-[#4C1D95] text-white px-4 py-2 rounded text-xs font-semibold cursor-pointer shadow-sm hover:shadow transition-colors"
            >
              Update
            </button>
            
            <button
              type="button"
              onClick={handleReset}
              className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-4 py-2 rounded text-xs font-semibold cursor-pointer transition-colors"
            >
              Reset
            </button>
          </div>

        </form>
      </div>
    </AdminShell>
  );
}
