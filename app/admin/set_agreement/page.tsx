'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminShell } from '../AdminShell';
import { useTranslation } from '@/context/LanguageContext';

const DEFAULT_CONTENT_TH = `ข้อมูลเบื้องต้น

เราตระหนักดีว่าข้อมูลส่วนตัวของคุณมีความสำคัญอย่างยิ่ง เราจึงจัดให้มีนโยบายความเป็นส่วนตัวนี้ขึ้น เพื่อชี้แจงเกี่ยวกับการรวบรวมข้อมูล การใช้ข้อมูล และการเปิดเผยข้อมูลส่วนบุคคลของคุณ สำหรับการเข้าใช้บริการเว็บไซต์ stayverse.com และบริการต่างๆ ในเว็บไซต์นี้ ทั้งทางตรงและทางอ้อม

ขอบเขตของนโยบายคุ้มครองข้อมูลส่วนบุคคลของเว็บไซต์
นโยบายฉบับนี้ครอบคลุมถึงวิธีการจัดการข้อมูลส่วนบุคคลที่เราได้รับเมื่อคุณเยี่ยมชมเว็บไซต์ stayverse.com การใช้งานบัญชีผู้ใช้ หรือการติดต่อขอรับบริการต่างๆ`;

interface HtmlEditorMockProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

const HtmlEditorMock: React.FC<HtmlEditorMockProps> = ({ value, onChange, placeholder }) => {
  return (
    <div className="border border-gray-300 rounded overflow-hidden bg-white shadow-sm hover:border-gray-400 transition-colors">
      {/* Editor Toolbar */}
      <div className="bg-[#F8F9FA] border-b border-gray-300 p-2 flex flex-wrap gap-y-1.5 gap-x-2 items-center text-[11px] text-gray-600 select-none">
        
        <div className="flex items-center space-x-1">
          <button type="button" className="px-2 py-1 bg-white border border-gray-300 hover:bg-gray-50 rounded text-gray-700 flex items-center space-x-1 cursor-pointer">
            <span className="text-[10px]">📁</span>
            <span className="font-bold">ดูรหัส HTML</span>
          </button>
        </div>
        <div className="w-[1px] h-4 bg-gray-300" />
        
        <div className="flex items-center space-x-1">
          <button type="button" className="p-1 hover:bg-gray-200 rounded cursor-pointer" title="ตัด">✂️</button>
          <button type="button" className="p-1 hover:bg-gray-200 rounded cursor-pointer" title="คัดลอก">📋</button>
          <button type="button" className="p-1 hover:bg-gray-200 rounded cursor-pointer" title="วาง">📥</button>
        </div>
        <div className="w-[1px] h-4 bg-gray-300" />

        <div className="flex items-center space-x-1">
          <button type="button" className="p-1 hover:bg-gray-200 rounded cursor-pointer" title="เลิกทำ">↩️</button>
          <button type="button" className="p-1 hover:bg-gray-200 rounded cursor-pointer" title="ทำซ้ำ">↪️</button>
        </div>
        <div className="w-[1px] h-4 bg-gray-300" />

        <div className="flex items-center space-x-1 font-sans">
          <button type="button" className="w-6 h-6 hover:bg-gray-200 rounded font-bold cursor-pointer text-xs" title="ตัวหนา">B</button>
          <button type="button" className="w-6 h-6 hover:bg-gray-200 rounded italic cursor-pointer text-xs" title="ตัวเอียง">I</button>
          <button type="button" className="w-6 h-6 hover:bg-gray-200 rounded underline cursor-pointer text-xs" title="ขีดเส้นใต้">U</button>
          <button type="button" className="w-6 h-6 hover:bg-gray-200 rounded line-through cursor-pointer text-xs" title="ขีดฆ่า">S</button>
        </div>
        <div className="w-[1px] h-4 bg-gray-300" />

        <div className="flex items-center space-x-1">
          <select className="bg-white border border-gray-300 rounded px-1.5 py-0.5 text-[10px] text-gray-700 cursor-pointer focus:outline-none">
            <option>รูปแบบ</option>
            <option>หัวข้อ 1</option>
            <option>หัวข้อ 2</option>
            <option>ย่อหน้า</option>
          </select>
          <select className="bg-white border border-gray-300 rounded px-1.5 py-0.5 text-[10px] text-gray-700 cursor-pointer focus:outline-none">
            <option>ตระกูลแบบอักษร</option>
            <option>Sarabun</option>
            <option>Arial</option>
            <option>Times New Roman</option>
          </select>
          <select className="bg-white border border-gray-300 rounded px-1.5 py-0.5 text-[10px] text-gray-700 cursor-pointer focus:outline-none">
            <option>ขนาดแบบอักษร</option>
            <option>12px</option>
            <option>14px</option>
            <option>16px</option>
            <option>18px</option>
          </select>
        </div>
        <div className="w-[1px] h-4 bg-gray-300" />

        <div className="flex items-center space-x-1">
          <button type="button" className="p-1 hover:bg-gray-200 rounded cursor-pointer" title="สีตัวอักษร">🎨</button>
          <button type="button" className="p-1 hover:bg-gray-200 rounded cursor-pointer" title="จัดซ้าย">⬅️</button>
          <button type="button" className="p-1 hover:bg-gray-200 rounded cursor-pointer" title="จัดกลาง">居</button>
          <button type="button" className="p-1 hover:bg-gray-200 rounded cursor-pointer" title="จัดขวา">➡️</button>
        </div>
        <div className="w-[1px] h-4 bg-gray-300" />

        <div className="flex items-center space-x-1">
          <button type="button" className="p-1 hover:bg-gray-200 rounded cursor-pointer" title="รายการ">📝</button>
          <button type="button" className="p-1 hover:bg-gray-200 rounded cursor-pointer" title="แทรกลิงก์">🔗</button>
          <button type="button" className="p-1 hover:bg-gray-200 rounded cursor-pointer" title="รูปภาพ">🖼️</button>
          <button type="button" className="p-1 hover:bg-gray-200 rounded cursor-pointer" title="ตาราง">📊</button>
        </div>

      </div>

      {/* Editor Content Area */}
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={10}
        className="w-full text-xs font-sans p-4 bg-white text-gray-800 focus:outline-none focus:ring-0 border-0 resize-y min-h-[250px]"
      />

      {/* Editor Status Bar */}
      <div className="bg-gray-50 border-t border-gray-200 px-3 py-1 text-[10px] text-gray-400 font-mono select-none flex justify-between items-center">
        <span>path: body &gt;&gt; p</span>
        <span>words: {value.split(/\s+/).filter(Boolean).length}</span>
      </div>
    </div>
  );
};

export default function SetAgreementPage() {
  const router = useRouter();
  const { language } = useTranslation();

  // Settings states
  const [titleTh, setTitleTh] = useState('นโยบายความเป็นส่วนตัว');
  const [titleEn, setTitleEn] = useState('');
  const [contentTh, setContentTh] = useState(DEFAULT_CONTENT_TH);
  const [contentEn, setContentEn] = useState('');
  const [version, setVersion] = useState('1.0');
  const [status, setStatus] = useState<'ON' | 'OFF'>('ON');

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('stayverse_set_agreement');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setTitleTh(parsed.titleTh ?? 'นโยบายความเป็นส่วนตัว');
          setTitleEn(parsed.titleEn ?? '');
          setContentTh(parsed.contentTh ?? DEFAULT_CONTENT_TH);
          setContentEn(parsed.contentEn ?? '');
          setVersion(parsed.version ?? '1.0');
          setStatus(parsed.status ?? 'ON');
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  const handleReset = () => {
    setTitleTh('นโยบายความเป็นส่วนตัว');
    setTitleEn('');
    setContentTh(DEFAULT_CONTENT_TH);
    setContentEn('');
    setVersion('1.0');
    setStatus('ON');
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      titleTh,
      titleEn,
      contentTh,
      contentEn,
      version,
      status,
    };
    localStorage.setItem('stayverse_set_agreement', JSON.stringify(data));
    alert(language === 'th' ? 'บันทึกข้อมูลข้อตกลงเรียบร้อยแล้ว' : 'Agreement settings updated successfully');
  };

  const handleTranslate = () => {
    if (titleTh.trim() === 'นโยบายความเป็นส่วนตัว') {
      setTitleEn('Privacy Policy');
    } else if (titleTh.trim() === 'ข้อตกลงและเงื่อนไขการใช้บริการ') {
      setTitleEn('Terms and Conditions of Service');
    } else {
      setTitleEn(titleTh + ' (EN)');
    }
  };

  return (
    <AdminShell activeItem="set_agreement">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-row justify-between items-center pb-5 mb-5 border-b border-gray-200/60 select-none">
        <h1 className="text-xl font-bold text-gray-800 flex items-center">
          Agreement <span className="text-gray-400 mx-2 text-base font-normal">&gt;</span> <span className="text-gray-500 font-normal">แก้ไข</span>
        </h1>
        <div className="text-xs text-[#0088FF] flex items-center space-x-1.5">
          <span className="hover:underline cursor-pointer" onClick={() => router.push('/admin')}>Home</span>
          <span className="text-gray-400">/</span>
          <span className="hover:underline cursor-pointer" onClick={() => router.push('/admin/set_agreement')}>Agreement</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-500">แก้ไข</span>
        </div>
      </div>

      {/* Back Button */}
      <button
        onClick={() => router.push('/admin')}
        className="bg-[#5B21B6] hover:bg-[#4C1D95] text-white px-3.5 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 mb-6 cursor-pointer shadow-sm transition-colors"
      >
        <span className="text-sm font-bold">&larr;</span>
        <span>กลับ</span>
      </button>

      {/* Flat Form Layout */}
      <div className="bg-white border border-gray-200 rounded-md shadow-sm max-w-7xl overflow-hidden mb-6">
        <form onSubmit={handleUpdate} className="text-xs">
          
          <div className="p-6 md:p-8 space-y-6">
            
            {/* Field 1: หัวข้อ[TH] */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 items-center">
              <div className="md:col-span-2 font-bold text-gray-700 text-xs">
                หัวข้อ[TH]
              </div>
              <div className="md:col-span-10">
                <input
                  type="text"
                  value={titleTh}
                  onChange={(e) => setTitleTh(e.target.value)}
                  placeholder="หัวข้อ [TH]"
                  className="w-full text-xs bg-white border border-gray-200 rounded p-2.5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#5B21B6] transition-all"
                  required
                />
              </div>
            </div>

            {/* Field 2: หัวข้อ [EN] + แปล button */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 items-center">
              <div className="md:col-span-2 font-bold text-gray-700 text-xs">
                หัวข้อ [EN]
              </div>
              <div className="md:col-span-10 flex items-center space-x-2">
                <input
                  type="text"
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  placeholder="หัวข้อ [EN]"
                  className="flex-1 text-xs bg-white border border-gray-200 rounded p-2.5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#5B21B6] transition-all"
                />
                <button
                  type="button"
                  onClick={handleTranslate}
                  className="bg-[#5B21B6] hover:bg-[#4C1D95] text-white px-4 py-2.5 rounded text-xs font-bold cursor-pointer transition-colors shrink-0 shadow-sm"
                >
                  แปล
                </button>
              </div>
            </div>

            {/* Field 3: รายละเอียด [TH] */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 items-start">
              <div className="md:col-span-2 font-bold text-gray-700 text-xs pt-2">
                รายละเอียด [TH]
              </div>
              <div className="md:col-span-10">
                <HtmlEditorMock
                  value={contentTh}
                  onChange={setContentTh}
                  placeholder="รายละเอียด [TH]"
                />
              </div>
            </div>

            {/* Field 4: รายละเอียด [EN] */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 items-start">
              <div className="md:col-span-2 font-bold text-gray-700 text-xs pt-2">
                รายละเอียด [EN]
              </div>
              <div className="md:col-span-10">
                <HtmlEditorMock
                  value={contentEn}
                  onChange={setContentEn}
                  placeholder="รายละเอียด [EN]"
                />
              </div>
            </div>

            {/* Field 5: เวอร์ชัน */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 items-center">
              <div className="md:col-span-2 font-bold text-gray-700 text-xs">
                เวอร์ชัน
              </div>
              <div className="md:col-span-10">
                <input
                  type="text"
                  value={version}
                  onChange={(e) => setVersion(e.target.value)}
                  className="w-full text-xs bg-white border border-gray-200 rounded p-2.5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#5B21B6] transition-all"
                  required
                />
              </div>
            </div>

            {/* Field 6: สถานะ */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 items-start">
              <div className="md:col-span-2 font-bold text-gray-700 text-xs pt-1">
                สถานะ
              </div>
              <div className="md:col-span-10 flex flex-col space-y-2">
                <label className="inline-flex items-center cursor-pointer text-xs w-fit select-none">
                  <input
                    type="radio"
                    name="status"
                    checked={status === 'ON'}
                    onChange={() => setStatus('ON')}
                    className="form-radio h-3.5 w-3.5 text-[#5B21B6] focus:ring-[#5B21B6] border-gray-300"
                  />
                  <span className="ml-2 font-bold text-green-600">ON</span>
                </label>
                <label className="inline-flex items-center cursor-pointer text-xs w-fit select-none">
                  <input
                    type="radio"
                    name="status"
                    checked={status === 'OFF'}
                    onChange={() => setStatus('OFF')}
                    className="form-radio h-3.5 w-3.5 text-[#5B21B6] focus:ring-[#5B21B6] border-gray-300"
                  />
                  <span className="ml-2 font-bold text-red-500">OFF</span>
                </label>
              </div>
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
