'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminShell } from '../../AdminShell';
import { ChevronLeft } from 'lucide-react';
import { useTranslation } from '@/context/LanguageContext';

export default function SetHtmlPageEdit() {
  const router = useRouter();
  const { language } = useTranslation();
  const isTh = language === 'th';

  const [status, setStatus] = useState('ON');
  const [detailsTh, setDetailsTh] = useState('ประกาศความเป็นส่วนตัว\n\nCookies Privacy Notices\n\nเว็บไซต์นี้ให้บริการโดยบริษัท แอสเซท เอ พลัส จำกัด ในกลุ่มบริษัท แอสเซทโกรว์ จำกัด (มหาชน) เว็บไซต์นี้ใช้คุกกี้และเครื่องมืออื่นๆ เพื่อช่วยแยกแยะรูปแบบการใช้งานเว็บไซต์ของท่านจากผู้ใช้งานอื่นๆ ซึ่งจะช่วยให้ท่านได้รับประสบการณ์ที่ดีจากการใช้งานเว็บไซต์ และช่วยให้เราสามารถพัฒนาคุณภาพของเว็บไซต์ให้ดียิ่งขึ้น\n\nนโยบายคุกกี้นี้จะอธิบายถึงความหมาย การทำงาน วัตถุประสงค์ รวมถึงการลบและการปฏิเสธการเก็บคุกกี้เพื่อความเป็นส่วนตัวของท่าน โดยการเข้าสู่เว็บไซต์นี้ถือว่าท่านได้อนุญาตให้บริษัทใช้คุกกี้ตามนโยบายคุกกี้ที่มีรายละเอียดดังต่อไปนี้');
  const [detailsEn, setDetailsEn] = useState('');

  // A simple mock of a WYSIWYG editor toolbar to match the screenshot
  const MockWysiwyg = ({ value, onChange }: { value: string, onChange: (v: string) => void }) => (
    <div className="border border-gray-300 rounded shadow-sm bg-white overflow-hidden">
      {/* Fake Toolbar row 1 */}
      <div className="bg-[#f8f9fa] border-b border-gray-300 px-2 py-1 flex items-center gap-1 overflow-x-auto text-gray-600">
        <button className="flex items-center gap-1 border border-gray-300 bg-white px-2 py-0.5 text-xs rounded hover:bg-gray-50">
          <span className="font-serif">📄</span> ดูรหัส HTML
        </button>
        <div className="w-px h-4 bg-gray-300 mx-1"></div>
        <button className="px-1.5 py-0.5 hover:bg-gray-200 rounded">↶</button>
        <button className="px-1.5 py-0.5 hover:bg-gray-200 rounded">↷</button>
        <div className="w-px h-4 bg-gray-300 mx-1"></div>
        <button className="px-1.5 py-0.5 hover:bg-gray-200 rounded">🔍</button>
        <button className="px-1.5 py-0.5 hover:bg-gray-200 rounded">📑</button>
        <div className="w-px h-4 bg-gray-300 mx-1"></div>
        <button className="px-1.5 py-0.5 hover:bg-gray-200 rounded font-serif">A</button>
        <div className="w-px h-4 bg-gray-300 mx-1"></div>
        <button className="px-1.5 py-0.5 hover:bg-gray-200 rounded font-bold">B</button>
        <button className="px-1.5 py-0.5 hover:bg-gray-200 rounded italic">I</button>
        <button className="px-1.5 py-0.5 hover:bg-gray-200 rounded underline">U</button>
        <button className="px-1.5 py-0.5 hover:bg-gray-200 rounded line-through">S</button>
        <button className="px-1.5 py-0.5 hover:bg-gray-200 rounded">x₂</button>
        <button className="px-1.5 py-0.5 hover:bg-gray-200 rounded">x²</button>
        <button className="px-1.5 py-0.5 hover:bg-gray-200 rounded">🪄</button>
        <button className="px-1.5 py-0.5 hover:bg-gray-200 rounded">Tₓ</button>
        <div className="w-px h-4 bg-gray-300 mx-1"></div>
        <button className="px-1.5 py-0.5 hover:bg-gray-200 rounded">≡</button>
        <button className="px-1.5 py-0.5 hover:bg-gray-200 rounded">⁝</button>
        <button className="px-1.5 py-0.5 hover:bg-gray-200 rounded">“</button>
        <div className="w-px h-4 bg-gray-300 mx-1"></div>
        <button className="px-1.5 py-0.5 hover:bg-gray-200 rounded">◂</button>
        <button className="px-1.5 py-0.5 hover:bg-gray-200 rounded">▸</button>
      </div>
      {/* Fake Toolbar row 2 */}
      <div className="bg-[#f8f9fa] border-b border-gray-300 px-2 py-1 flex items-center gap-2 overflow-x-auto text-gray-600 text-xs">
        <select className="border border-gray-300 bg-white px-1 py-0.5 rounded w-20">
          <option>ลักษณะ</option>
        </select>
        <select className="border border-gray-300 bg-white px-1 py-0.5 rounded w-20">
          <option>รูปแบบ</option>
        </select>
        <select className="border border-gray-300 bg-white px-1 py-0.5 rounded w-20">
          <option>แบบอักษร</option>
        </select>
        <select className="border border-gray-300 bg-white px-1 py-0.5 rounded w-16">
          <option>ขนาด</option>
        </select>
        <button className="px-1.5 py-0.5 hover:bg-gray-200 rounded text-black font-bold">A▾</button>
        <button className="px-1.5 py-0.5 hover:bg-gray-200 rounded bg-gray-800 text-white font-bold">A▾</button>
        <div className="w-px h-4 bg-gray-300 mx-1"></div>
        <button className="px-1.5 py-0.5 hover:bg-gray-200 rounded text-[10px]">🔗</button>
        <button className="px-1.5 py-0.5 hover:bg-gray-200 rounded text-[10px]">🖼️</button>
        <button className="px-1.5 py-0.5 hover:bg-gray-200 rounded text-[10px]">📺</button>
        <button className="px-1.5 py-0.5 hover:bg-gray-200 rounded text-[10px]">😊</button>
        <button className="px-1.5 py-0.5 hover:bg-gray-200 rounded text-[10px]">Ω</button>
        <button className="px-1.5 py-0.5 hover:bg-gray-200 rounded text-[10px]">©</button>
        <button className="px-1.5 py-0.5 hover:bg-gray-200 rounded text-[10px]">🏴</button>
      </div>
      <textarea 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-48 p-4 text-sm text-gray-800 focus:outline-none resize-y"
      ></textarea>
      {/* Fake status bar */}
      <div className="bg-gray-100 border-t border-gray-300 h-4 flex justify-end">
        <div className="w-3 h-3 text-gray-400 cursor-nwse-resize mr-0.5">◢</div>
      </div>
    </div>
  );

  return (
    <AdminShell activeItem="set_html_page">
      <div className="bg-[#f8f9fc] min-h-screen pb-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 py-4 bg-white border-b border-gray-100">
          <h1 className="text-xl font-bold text-gray-800 tracking-tight flex items-center gap-2">
            {isTh ? 'ข้อบังคับและข้อตกลง' : 'Regulations and Agreements'}
            <span className="text-gray-400 text-lg">{'>'}</span>
            <span className="text-gray-600">{isTh ? 'แก้ไข' : 'Edit'}</span>
          </h1>
          <div className="text-[13px] text-[#0088ff] mt-2 sm:mt-0 flex items-center space-x-2 select-none">
            <span className="hover:underline cursor-pointer transition-colors" onClick={() => router.push('/admin')}>Home</span>
            <span className="text-gray-400">/</span>
            <span className="hover:underline cursor-pointer transition-colors" onClick={() => router.push('/admin/set_html_page')}>
              {isTh ? 'ข้อบังคับและข้อตกลง' : 'Regulations and Agreements'}
            </span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-500">{isTh ? 'แก้ไข' : 'Edit'}</span>
          </div>
        </div>

        {/* Back Button */}
        <div className="bg-white p-4 sticky top-0 z-10">
          <button 
            onClick={() => router.push('/admin/set_html_page')}
            className="bg-[#6F42C1] hover:bg-[#5A32A3] text-white px-4 py-1.5 rounded flex items-center gap-2 text-sm font-medium transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            กลับ
          </button>
        </div>

        <div className="max-w-6xl mx-auto p-4 md:p-6">
          <div className="bg-white border border-gray-200 shadow-sm">
            <div className="p-4 md:p-8 space-y-6 md:space-y-8">
              
              {/* ID */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-2 text-gray-800 font-medium pt-1 text-[13px]">ID</div>
                <div className="md:col-span-10 text-gray-700 text-[13px]">5</div>
              </div>

              {/* Page Name */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-2 text-gray-800 font-medium pt-1 text-[13px]">Page Name</div>
                <div className="md:col-span-10 text-gray-700 text-[13px]">CookiesConsent</div>
              </div>

              {/* Details [TH] */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-2 text-gray-800 font-medium pt-1 text-[13px]">Details [TH]</div>
                <div className="md:col-span-10">
                  <MockWysiwyg value={detailsTh} onChange={setDetailsTh} />
                </div>
              </div>

              {/* Details [EN] */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-2 text-gray-800 font-medium pt-1 text-[13px]">Details [EN]</div>
                <div className="md:col-span-10">
                  <MockWysiwyg value={detailsEn} onChange={setDetailsEn} />
                </div>
              </div>

              {/* Status */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-2 text-gray-800 font-medium pt-1 text-[13px]">Status</div>
                <div className="md:col-span-10 space-y-3">
                  <label className="flex items-center gap-2 cursor-pointer w-fit">
                    <input 
                      type="radio" 
                      name="status" 
                      value="ON"
                      checked={status === 'ON'}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-3.5 h-3.5 text-[#6F42C1] focus:ring-[#6F42C1]"
                    />
                    <span className="text-[#2ecc71] text-sm font-bold">ON</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer w-fit">
                    <input 
                      type="radio" 
                      name="status" 
                      value="OFF"
                      checked={status === 'OFF'}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-3.5 h-3.5 text-[#6F42C1] focus:ring-[#6F42C1]"
                    />
                    <span className="text-red-500 text-sm font-bold">OFF</span>
                  </label>
                </div>
              </div>

              {/* Lastupdate */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-2 text-gray-800 font-medium pt-1 text-[13px]">Lastupdate</div>
                <div className="md:col-span-10 text-gray-700 text-[13px]">
                  2022-02-14 13:20:11
                </div>
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="bg-gray-50/50 p-4 md:p-6 border-t border-gray-200 flex items-center gap-3">
              <button 
                onClick={() => {
                  alert('อัพเดทข้อมูลสำเร็จ');
                  router.push('/admin/set_html_page');
                }}
                className="bg-[#6F42C1] hover:bg-[#5A32A3] text-white px-6 py-2 rounded text-[13px] font-medium transition-colors"
              >
                Update
              </button>
              <button 
                onClick={() => window.location.reload()}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded text-[13px] font-medium transition-colors"
              >
                Reset
              </button>
            </div>

          </div>
        </div>
      </div>
    </AdminShell>
  );
}
