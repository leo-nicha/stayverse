'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminShell } from '../../AdminShell';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from '@/context/LanguageContext';

export default function NewVideoPage() {
  const router = useRouter();
  const { language } = useTranslation();
  
  // States
  const [status, setStatus] = useState<'ON' | 'OFF'>('OFF');
  
  return (
    <AdminShell activeItem="youtubeVideo">
      <div className="bg-[#f8f9fc] min-h-screen pb-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 py-4 bg-white border-b border-gray-100">
          <h1 className="text-xl font-bold text-gray-800 tracking-tight flex items-center gap-2">
            Video <span className="text-gray-400 text-[18px] font-normal">&gt;</span> เพิ่ม
          </h1>
          <div className="text-[13px] text-[#0088ff] mt-2 sm:mt-0 flex items-center space-x-2 select-none">
            <span className="hover:underline cursor-pointer transition-colors" onClick={() => router.push('/admin')}>Home</span>
            <span className="text-gray-400">/</span>
            <span className="hover:underline cursor-pointer transition-colors" onClick={() => router.push('/admin/video_list')}>Video</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-500">เพิ่ม</span>
          </div>
        </div>

        <div className="p-6">
          {/* Back Button */}
          <button 
            onClick={() => router.push('/admin/video_list')}
            className="mb-6 bg-[#6F42C1] hover:bg-[#5A32A3] text-white px-4 py-1.5 rounded flex items-center gap-2 text-[13px] font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            กลับ
          </button>

          {/* Form */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="p-8 space-y-6">
              
              {/* ชื่อวิดีโอ [TH] */}
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-8 items-center">
                <label className="text-[13px] font-medium text-gray-700 md:text-left">ชื่อวิดีโอ [TH]</label>
                <div className="flex items-center gap-2">
                  <input type="text" placeholder="ชื่อวิดีโอ [TH]" className="border border-gray-300 rounded px-3 py-2 text-[13px] w-full md:w-[600px] focus:outline-none focus:border-[#6F42C1] placeholder-gray-400" />
                </div>
              </div>

              {/* ชื่อวิดีโอ [EN] */}
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-8 items-center">
                <label className="text-[13px] font-medium text-gray-700 md:text-left">ชื่อวิดีโอ [EN]</label>
                <div className="flex items-center gap-2">
                  <input type="text" placeholder="ชื่อวิดีโอ [EN]" className="border border-gray-300 rounded px-3 py-2 text-[13px] w-full md:w-[600px] focus:outline-none focus:border-[#6F42C1] placeholder-gray-400" />
                  <button className="bg-[#6F42C1] hover:bg-[#5A32A3] text-white px-3 py-1.5 rounded text-[12px] font-medium transition-colors">แปล</button>
                </div>
              </div>

              {/* ชื่อวิดีโอ URL */}
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-8 items-center">
                <label className="text-[13px] font-medium text-gray-700 md:text-left">ชื่อวิดีโอ URL</label>
                <div className="flex items-center gap-2">
                  <input type="text" placeholder="ชื่อวิดีโอ URL" className="border border-gray-300 rounded px-3 py-2 text-[13px] w-full md:w-[600px] focus:outline-none focus:border-[#6F42C1] placeholder-gray-400" />
                </div>
              </div>

              {/* รายละเอียด [TH] */}
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-8 items-start">
                <label className="text-[13px] font-medium text-gray-700 md:text-left pt-2">รายละเอียด [TH]</label>
                <div className="flex items-start gap-2">
                  <textarea 
                    placeholder="รายละเอียด [TH]" 
                    rows={4}
                    className="border border-gray-300 rounded px-3 py-2 text-[13px] w-full md:w-[600px] focus:outline-none focus:border-[#6F42C1] resize-y placeholder-gray-400"
                  ></textarea>
                </div>
              </div>

              {/* รายละเอียด [EN] */}
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-8 items-start">
                <label className="text-[13px] font-medium text-gray-700 md:text-left pt-2">รายละเอียด [EN]</label>
                <div className="flex items-start gap-2">
                  <textarea 
                    placeholder="รายละเอียด [EN]" 
                    rows={4}
                    className="border border-gray-300 rounded px-3 py-2 text-[13px] w-full md:w-[600px] focus:outline-none focus:border-[#6F42C1] resize-y placeholder-gray-400"
                  ></textarea>
                  <button className="bg-[#6F42C1] hover:bg-[#5A32A3] text-white px-3 py-1.5 rounded text-[12px] font-medium transition-colors">แปล</button>
                </div>
              </div>

              {/* Cover */}
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-8 items-start">
                <label className="text-[13px] font-medium text-gray-700 md:text-left pt-2">Cover</label>
                <div className="flex w-full md:w-[600px] border border-gray-300 rounded overflow-hidden">
                  <input type="text" placeholder="Choose file" readOnly className="flex-1 px-3 py-2 focus:outline-none bg-white text-gray-400 border-none" />
                  <button className="bg-gray-100 border-l border-gray-300 text-gray-600 px-4 py-2 hover:bg-gray-200 transition-colors">Browse</button>
                </div>
              </div>

              {/* Code for YouTube Videos */}
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-8 items-center">
                <label className="text-[13px] font-medium text-gray-700 md:text-left">Code for YouTube Videos</label>
                <div className="flex items-center gap-2">
                  <input type="text" placeholder="Code for YouTube Videos" className="border border-gray-300 rounded px-3 py-2 text-[13px] w-full md:w-[600px] focus:outline-none focus:border-[#6F42C1] placeholder-gray-400" />
                </div>
              </div>

              {/* เรียงลำดับ */}
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-8 items-center">
                <label className="text-[13px] font-medium text-gray-700 md:text-left">เรียงลำดับ</label>
                <div className="flex items-center gap-2">
                  <input type="text" placeholder="เรียงลำดับ" className="border border-gray-300 rounded px-3 py-2 text-[13px] w-full md:w-[250px] focus:outline-none focus:border-[#6F42C1] placeholder-gray-400" />
                </div>
              </div>

              {/* จำนวนวิว */}
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-8 items-center">
                <label className="text-[13px] font-medium text-gray-700 md:text-left">จำนวนวิว</label>
                <div className="flex items-center gap-2">
                  <input type="text" placeholder="จำนวนวิว" className="border border-gray-300 rounded px-3 py-2 text-[13px] w-full md:w-[250px] focus:outline-none focus:border-[#6F42C1] placeholder-gray-400" />
                </div>
              </div>

              {/* สถานะ */}
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-8 items-start">
                <label className="text-[13px] font-medium text-gray-700 md:text-left pt-1">สถานะ</label>
                <div className="space-y-3">
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
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-8 items-center pt-2 pb-4">
                <label className="text-[13px] font-medium text-gray-700 md:text-left">วันที่สร้าง</label>
                <div className="text-[13px] text-gray-700 font-medium">
                  2026-05-28 10:56:11
                </div>
              </div>

            </div>

            {/* Form Footer */}
            <div className="bg-gray-50/50 p-6 border-t border-gray-200 flex items-center gap-3">
              <button className="bg-[#6F42C1] hover:bg-[#5A32A3] text-white px-6 py-1.5 rounded text-[13px] font-medium transition-colors">
                Add new
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
