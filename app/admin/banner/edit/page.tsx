'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminShell } from '../../AdminShell';
import { ArrowLeft, Calendar } from 'lucide-react';
import { useTranslation } from '@/context/LanguageContext';

export default function EditBannerPage() {
  const router = useRouter();
  const { language } = useTranslation();
  
  // States
  const [status, setStatus] = useState<'ON' | 'OFF'>('ON');
  
  return (
    <AdminShell activeItem="banner">
      <div className="bg-[#f8f9fc] min-h-screen pb-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 py-4 bg-white border-b border-gray-100">
          <h1 className="text-xl font-bold text-gray-800 tracking-tight flex items-center gap-2">
            แบนเนอร์ <span className="text-gray-400 text-[18px] font-normal">&gt;</span> แก้ไข
          </h1>
        </div>

        <div className="p-6">
          {/* Back Button */}
          <button 
            onClick={() => router.push('/admin/banner')}
            className="mb-6 bg-[#6F42C1] hover:bg-[#5A32A3] text-white px-4 py-1.5 rounded flex items-center gap-2 text-[13px] font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            กลับ
          </button>

          {/* Form */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="p-8 space-y-8">
              
              {/* ID */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 items-center">
                <label className="text-[13px] font-medium text-gray-700 md:text-right">ID</label>
                <div className="md:col-span-3 text-[13px] text-[#0088ff]">
                  1
                </div>
              </div>

              {/* Type */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 items-start">
                <label className="text-[13px] font-medium text-gray-700 md:text-right pt-2">ประเภท</label>
                <div className="md:col-span-3">
                  <select className="border border-gray-300 rounded px-3 py-2 text-[13px] w-full md:w-80 focus:outline-none focus:border-[#6F42C1] bg-white text-gray-700">
                    <option>รูปภาพกำหนดเอง</option>
                  </select>
                </div>
              </div>

              {/* Banner PC */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 items-start">
                <div className="md:text-right"></div>
                <div className="md:col-span-3 space-y-1 text-[13px]">
                  <div className="font-medium text-gray-800">Banner PC</div>
                  <div className="text-[#2ecc71] font-medium">ขนาดรูปภาพที่แนะนำ (1116 x 208px)</div>
                  <div className="flex w-full md:w-[480px] mt-2 border border-gray-300 rounded overflow-hidden">
                    <input type="text" placeholder="Choose file" readOnly className="flex-1 px-3 py-2 focus:outline-none bg-white text-gray-400 border-none" />
                    <button className="bg-gray-100 border-l border-gray-300 text-gray-600 px-4 py-2 hover:bg-gray-200 transition-colors">Browse</button>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="w-64 border border-gray-200 rounded p-2">
                      <img src="https://res.cloudinary.com/dvv3wvgnt/image/upload/v1779681125/svlogo_tzfhad.webp" alt="Banner PC Preview" className="w-full h-auto object-contain" />
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer text-gray-600 pt-1">
                      <input type="checkbox" className="rounded border-gray-300 text-[#6F42C1] focus:ring-[#6F42C1]" />
                      Delete image
                    </label>
                  </div>
                </div>
              </div>

              {/* Banner Mobile */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 items-start">
                <div className="md:text-right"></div>
                <div className="md:col-span-3 space-y-1 text-[13px]">
                  <div className="font-medium text-gray-800">Banner Mobile</div>
                  <div className="text-[#2ecc71] font-medium">ขนาดรูปภาพที่แนะนำ (393 x 201px)</div>
                  <div className="flex w-full md:w-[480px] mt-2 border border-gray-300 rounded overflow-hidden">
                    <input type="text" placeholder="Choose file" readOnly className="flex-1 px-3 py-2 focus:outline-none bg-white text-gray-400 border-none" />
                    <button className="bg-gray-100 border-l border-gray-300 text-gray-600 px-4 py-2 hover:bg-gray-200 transition-colors">Browse</button>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="w-48 border border-gray-200 rounded p-2">
                      <img src="https://res.cloudinary.com/dvv3wvgnt/image/upload/v1779681125/svlogo_tzfhad.webp" alt="Banner Mobile Preview" className="w-full h-auto object-contain" />
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer text-gray-600 pt-1">
                      <input type="checkbox" className="rounded border-gray-300 text-[#6F42C1] focus:ring-[#6F42C1]" />
                      Delete image
                    </label>
                  </div>
                </div>
              </div>

              {/* Start Date */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 items-start">
                <label className="text-[13px] font-medium text-gray-700 md:text-right pt-2">วันที่เริ่มแสดง</label>
                <div className="md:col-span-3 flex flex-wrap items-center gap-3">
                  <div className="relative w-48">
                    <input type="text" className="border-b border-gray-300 rounded-none px-1 py-1.5 text-[13px] w-full focus:outline-none focus:border-[#6F42C1] bg-white pr-8" />
                    <Calendar className="w-4 h-4 text-gray-400 absolute right-2 top-2" />
                  </div>
                  <button className="bg-[#ff4d4f] text-white px-2.5 py-1 rounded text-[11px] font-medium">ลบ</button>
                  <span className="text-[12px] text-gray-600">*ลบเป็นค่าว่าง ถ้าต้องการแสดงตลอดเวลา</span>
                </div>
              </div>

              {/* End Date */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 items-start">
                <label className="text-[13px] font-medium text-gray-700 md:text-right pt-2">วันที่สิ้นสุด</label>
                <div className="md:col-span-3 flex flex-wrap items-center gap-3">
                  <div className="relative w-48">
                    <input type="text" className="border-b border-gray-300 rounded-none px-1 py-1.5 text-[13px] w-full focus:outline-none focus:border-[#6F42C1] bg-white pr-8" />
                    <Calendar className="w-4 h-4 text-gray-400 absolute right-2 top-2" />
                  </div>
                  <button className="bg-[#ff4d4f] text-white px-2.5 py-1 rounded text-[11px] font-medium">ลบ</button>
                  <span className="text-[12px] text-gray-600">*ลบเป็นค่าว่าง ถ้าต้องการแสดงตลอดเวลา</span>
                </div>
              </div>

              {/* URL */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 items-start">
                <label className="text-[13px] font-medium text-gray-700 md:text-right pt-2">URL</label>
                <div className="md:col-span-3">
                  <textarea 
                    defaultValue="https://propholic.com/" 
                    rows={4}
                    className="border border-gray-300 rounded px-3 py-2 text-[13px] w-full focus:outline-none focus:border-[#6F42C1] resize-y text-gray-700"
                  ></textarea>
                </div>
              </div>

              {/* จำนวนวิว */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 items-center">
                <label className="text-[13px] font-medium text-gray-700 md:text-right">จำนวนวิว</label>
                <div className="md:col-span-3">
                  <input type="text" defaultValue="1509100" className="border border-gray-300 rounded px-3 py-2 text-[13px] w-full md:w-64 focus:outline-none focus:border-[#6F42C1] text-gray-700" />
                </div>
              </div>

              {/* จำนวนคลิ้ก */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 items-center">
                <label className="text-[13px] font-medium text-gray-700 md:text-right">จำนวนคลิ้ก</label>
                <div className="md:col-span-3">
                  <input type="text" defaultValue="1178" className="border border-gray-300 rounded px-3 py-2 text-[13px] w-full md:w-64 focus:outline-none focus:border-[#6F42C1] text-gray-700" />
                </div>
              </div>

              {/* เรียงลำดับ */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 items-center">
                <label className="text-[13px] font-medium text-gray-700 md:text-right">เรียงลำดับ</label>
                <div className="md:col-span-3">
                  <input type="text" defaultValue="99999" className="border border-gray-300 rounded px-3 py-2 text-[13px] w-full md:w-64 focus:outline-none focus:border-[#6F42C1] text-gray-700" />
                </div>
              </div>

              {/* สถานะ */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 items-start">
                <label className="text-[13px] font-medium text-gray-700 md:text-right pt-1">สถานะ</label>
                <div className="md:col-span-3 space-y-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="status" 
                      value="ON" 
                      checked={status === 'ON'}
                      onChange={() => setStatus('ON')}
                      className="text-[#6F42C1] focus:ring-[#6F42C1]"
                    />
                    <span className="text-[13px] font-bold text-[#2ecc71]">ON</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="status" 
                      value="OFF"
                      checked={status === 'OFF'}
                      onChange={() => setStatus('OFF')}
                      className="text-[#6F42C1] focus:ring-[#6F42C1]"
                    />
                    <span className="text-[13px] font-bold text-[#e74c3c]">OFF</span>
                  </label>
                </div>
              </div>

              {/* วันที่สร้าง */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 items-center pt-2">
                <label className="text-[13px] font-medium text-gray-700 md:text-right">วันที่สร้าง</label>
                <div className="md:col-span-3 text-[13px] text-gray-700">
                  2022-08-16 17:27:37
                </div>
              </div>

              {/* วันที่แก้ไขล่าสุด */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 items-center pb-2">
                <label className="text-[13px] font-medium text-gray-700 md:text-right">วันที่แก้ไขล่าสุด</label>
                <div className="md:col-span-3 text-[13px] text-gray-700">
                  2026-05-28 10:44:45
                </div>
              </div>

            </div>

            {/* Form Footer */}
            <div className="bg-gray-50/50 p-6 border-t border-gray-200 flex items-center gap-3">
              <button className="bg-[#6F42C1] hover:bg-[#5A32A3] text-white px-6 py-1.5 rounded text-[13px] font-medium transition-colors">
                Update
              </button>
              <button className="bg-[#f0f2f5] hover:bg-gray-200 text-gray-700 px-6 py-1.5 rounded text-[13px] font-medium transition-colors">
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
