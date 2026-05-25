'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminShell } from '../AdminShell';
import { Globe, Save, RotateCcw } from 'lucide-react';
import { useTranslation } from '@/context/LanguageContext';

export default function SetMetaPage() {
  const router = useRouter();
  const { language } = useTranslation();

  const [siteTitleTh, setSiteTitleTh] = useState('Stayverse | ที่ปรึกษาอสังหาริมทรัพย์และบ้านหรูในกรุงเทพฯ');
  const [siteTitleEn, setSiteTitleEn] = useState('Stayverse | Luxury Real Estate & Property Brokerage Bangkok');
  const [metaKeywordsTh, setMetaKeywordsTh] = useState('คอนโดหรู, บ้านเดี่ยว, คอนโดใกล้รถไฟฟ้า, ซื้อคอนโด, เช่าคอนโด, กรุงเทพ');
  const [metaKeywordsEn, setMetaKeywordsEn] = useState('luxury condo bangkok, houses for sale, rent condo near bts, real estate agent bangkok');
  const [metaDescTh, setMetaDescTh] = useState('สเตย์เวิร์ส ที่ปรึกษาอสังหาริมทรัพย์ระดับพรีเมียมครบวงจร ค้นหาซื้อ-เช่า คอนโดมิเนียมและบ้านในทำเลที่ดีที่สุดของกรุงเทพฯ');
  const [metaDescEn, setMetaDescEn] = useState('Stayverse is a premier luxury real estate agency in Bangkok. Find premium properties, condos, and villas for sale and rent in prime locations.');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('stayverse_set_metas');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setSiteTitleTh(parsed.siteTitleTh ?? '');
          setSiteTitleEn(parsed.siteTitleEn ?? '');
          setMetaKeywordsTh(parsed.metaKeywordsTh ?? '');
          setMetaKeywordsEn(parsed.metaKeywordsEn ?? '');
          setMetaDescTh(parsed.metaDescTh ?? '');
          setMetaDescEn(parsed.metaDescEn ?? '');
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  const handleReset = () => {
    setSiteTitleTh('Stayverse | ที่ปรึกษาอสังหาริมทรัพย์และบ้านหรูในกรุงเทพฯ');
    setSiteTitleEn('Stayverse | Luxury Real Estate & Property Brokerage Bangkok');
    setMetaKeywordsTh('คอนโดหรู, บ้านเดี่ยว, คอนโดใกล้รถไฟฟ้า, ซื้อคอนโด, เช่าคอนโด, กรุงเทพ');
    setMetaKeywordsEn('luxury condo bangkok, houses for sale, rent condo near bts, real estate agent bangkok');
    setMetaDescTh('สเตย์เวิร์ส ที่ปรึกษาอสังหาริมทรัพย์ระดับพรีเมียมครบวงจร ค้นหาซื้อ-เช่า คอนโดมิเนียมและบ้านในทำเลที่ดีที่สุดของกรุงเทพฯ');
    setMetaDescEn('Stayverse is a premier luxury real estate agency in Bangkok. Find premium properties, condos, and villas for sale and rent in prime locations.');
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { siteTitleTh, siteTitleEn, metaKeywordsTh, metaKeywordsEn, metaDescTh, metaDescEn };
    localStorage.setItem('stayverse_set_metas', JSON.stringify(data));
    alert(language === 'th' ? 'บันทึกข้อมูลเมตาเสร็จสมบูรณ์' : 'SEO Meta tags updated successfully');
  };

  const isTh = language === 'th';

  return (
    <AdminShell activeItem="set_meta">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 mb-6 border-b border-gray-200/80">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-gray-800 tracking-tight flex items-center gap-2">
            <Globe className="w-6 h-6 text-[#CF7536]" />
            <span>{isTh ? 'Meta Tag > แก้ไข' : 'Meta Tag > Edit'}</span>
          </h1>
        </div>
        <div className="text-xs font-semibold text-gray-400 mt-2 sm:mt-0 flex items-center space-x-1.5 select-none">
          <span className="hover:text-[#CF7536] cursor-pointer" onClick={() => router.push('/admin')}>Home</span>
          <span>/</span>
          <span className="hover:text-[#CF7536] cursor-pointer" onClick={() => router.push('/admin/set_meta')}>Meta Tag</span>
          <span>/</span>
          <span className="text-gray-655">{isTh ? 'แก้ไข' : 'Edit'}</span>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm overflow-hidden max-w-5xl">
        <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
          <h2 className="text-sm font-bold text-gray-700">{isTh ? 'ตั้งค่าแท็กระบุตัวตนการแสดงผลระบบค้นหา (SEO Meta)' : 'Global Website Search Engine Optimization (SEO) Meta Tags'}</h2>
        </div>

        <form onSubmit={handleUpdate} className="p-6 md:p-8 space-y-6">
          
          {/* TH Meta Section */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-[#CF7536] uppercase tracking-wider">{isTh ? 'ภาษาไทย [TH]' : 'Thai Metadata [TH]'}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-600 block">{isTh ? 'หัวข้อหลักเว็บไซต์ (Site Title)' : 'Site Title'}</label>
                <input
                  type="text"
                  value={siteTitleTh}
                  onChange={(e) => setSiteTitleTh(e.target.value)}
                  className="w-full text-xs bg-white border border-gray-200 rounded-lg p-2 text-gray-750 focus:outline-none focus:ring-1 focus:ring-[#CF7536] transition-all"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-600 block">{isTh ? 'คำค้นหาคีย์เวิร์ด (Keywords)' : 'Meta Keywords'}</label>
                <input
                  type="text"
                  value={metaKeywordsTh}
                  onChange={(e) => setMetaKeywordsTh(e.target.value)}
                  className="w-full text-xs bg-white border border-gray-200 rounded-lg p-2 text-gray-755 focus:outline-none focus:ring-1 focus:ring-[#CF7536] transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600 block">{isTh ? 'รายละเอียดคำนำนำ (Meta Description)' : 'Meta Description'}</label>
              <textarea
                value={metaDescTh}
                onChange={(e) => setMetaDescTh(e.target.value)}
                rows={3}
                className="w-full text-xs bg-white border border-gray-200 rounded-lg p-2 text-gray-755 focus:outline-none focus:ring-1 focus:ring-[#CF7536] transition-all"
                required
              />
            </div>
          </div>

          {/* EN Meta Section */}
          <div className="border-t border-gray-100 pt-6 space-y-4">
            <h3 className="text-xs font-bold text-[#CF7536] uppercase tracking-wider">{isTh ? 'ภาษาอังกฤษ [EN]' : 'English Metadata [EN]'}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-600 block">Site Title</label>
                <input
                  type="text"
                  value={siteTitleEn}
                  onChange={(e) => setSiteTitleEn(e.target.value)}
                  className="w-full text-xs bg-white border border-gray-200 rounded-lg p-2 text-gray-755 focus:outline-none focus:ring-1 focus:ring-[#CF7536] transition-all"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-600 block">Meta Keywords</label>
                <input
                  type="text"
                  value={metaKeywordsEn}
                  onChange={(e) => setMetaKeywordsEn(e.target.value)}
                  className="w-full text-xs bg-white border border-gray-200 rounded-lg p-2 text-gray-755 focus:outline-none focus:ring-1 focus:ring-[#CF7536] transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600 block">Meta Description</label>
              <textarea
                value={metaDescEn}
                onChange={(e) => setMetaDescEn(e.target.value)}
                rows={3}
                className="w-full text-xs bg-white border border-gray-200 rounded-lg p-2 text-gray-755 focus:outline-none focus:ring-1 focus:ring-[#CF7536] transition-all"
                required
              />
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6 flex items-center gap-3">
            <button
              type="submit"
              className="bg-[#6F42C1] hover:bg-[#5A32A3] text-white flex items-center gap-1.5 px-6 py-2.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer shadow-sm hover:shadow"
            >
              <Save className="w-4 h-4" />
              <span>Update</span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200 flex items-center gap-1.5 px-6 py-2.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>
        </form>
      </div>
    </AdminShell>
  );
}
