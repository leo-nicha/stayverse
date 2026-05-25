'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminShell } from '../AdminShell';
import { useTranslation } from '@/context/LanguageContext';

export default function SetAnalyticPage() {
  const router = useRouter();
  const { language } = useTranslation();

  const [headTag, setHeadTag] = useState('');
  const [bodyTag, setBodyTag] = useState('');

  // Load from localStorage on mount (using stayverse_set_tracking as requested)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('stayverse_set_tracking');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setHeadTag(parsed.headTag ?? parsed.googleAnalytics ?? '');
          setBodyTag(parsed.bodyTag ?? parsed.facebookPixel ?? '');
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  const handleReset = () => {
    setHeadTag('');
    setBodyTag('');
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { headTag, bodyTag };
    localStorage.setItem('stayverse_set_tracking', JSON.stringify(data));
    alert(language === 'th' ? 'บันทึกข้อมูลรหัสติดตามเรียบร้อยแล้ว' : 'Tracking scripts updated successfully');
  };

  return (
    <AdminShell activeItem="set_analytic">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-row justify-between items-center pb-5 mb-5 border-b border-gray-200/60 select-none">
        <h1 className="text-xl font-bold text-gray-800 flex items-center">
          Tracking code <span className="text-gray-400 mx-2 text-base font-normal">&gt;</span> <span className="text-gray-500 font-normal">แก้ไข</span>
        </h1>
        <div className="text-xs text-[#0088FF] flex items-center space-x-1.5">
          <span className="hover:underline cursor-pointer" onClick={() => router.push('/admin')}>Home</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-500">Tracking code</span>
        </div>
      </div>

      {/* Main Card Container */}
      <div className="bg-white border border-gray-200 rounded-md shadow-sm max-w-7xl overflow-hidden mb-6">
        <form onSubmit={handleUpdate} className="text-xs">
          <div className="p-6 md:p-8 space-y-6">
            
            {/* Row 1: head tag */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
              <div className="md:col-span-1 font-bold text-gray-700 text-xs pt-2">
                Google Analytic/Facebook pixel Tag in &lt;head&gt;
              </div>
              <div className="md:col-span-3">
                <textarea
                  value={headTag}
                  onChange={(e) => setHeadTag(e.target.value)}
                  placeholder={
                    language === 'th'
                      ? 'ระบุ Google Analytic/Facebook pixel Tag in <head>'
                      : 'Specify Google Analytic/Facebook pixel Tag in <head>'
                  }
                  rows={6}
                  className="w-full text-xs font-mono bg-white border border-gray-200 rounded p-2.5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#5B21B6] transition-all resize-y"
                />
              </div>
            </div>

            {/* Row 2: body tag */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
              <div className="md:col-span-1 font-bold text-gray-700 text-xs pt-2">
                Google Analytic/Facebook pixel Tag in &lt;body&gt;
              </div>
              <div className="md:col-span-3">
                <textarea
                  value={bodyTag}
                  onChange={(e) => setBodyTag(e.target.value)}
                  placeholder={
                    language === 'th'
                      ? 'ระบุ Google Analytic/Facebook pixel Tag in <body>'
                      : 'Specify Google Analytic/Facebook pixel Tag in <body>'
                  }
                  rows={6}
                  className="w-full text-xs font-mono bg-white border border-gray-200 rounded p-2.5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#5B21B6] transition-all resize-y"
                />
              </div>
            </div>

          </div>

          {/* Bottom Actions Footer */}
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
              reset
            </button>
          </div>
        </form>
      </div>
    </AdminShell>
  );
}
