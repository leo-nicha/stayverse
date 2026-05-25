'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminShell } from '../AdminShell';
import { ShieldCheck, Save, RotateCcw } from 'lucide-react';
import { useTranslation } from '@/context/LanguageContext';

export default function SetDocumentPage() {
  const router = useRouter();
  const { language } = useTranslation();

  const [watermarkEnabled, setWatermarkEnabled] = useState(true);
  const [watermarkText, setWatermarkText] = useState('STAYVERSE REALTY');
  const [preventCopy, setPreventCopy] = useState(false);
  const [mfaExport, setMfaExport] = useState(true);
  const [archiveDuration, setArchiveDuration] = useState('180');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('stayverse_set_documents');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setWatermarkEnabled(parsed.watermarkEnabled ?? true);
          setWatermarkText(parsed.watermarkText ?? 'STAYVERSE REALTY');
          setPreventCopy(parsed.preventCopy ?? false);
          setMfaExport(parsed.mfaExport ?? true);
          setArchiveDuration(parsed.archiveDuration ?? '180');
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  const handleReset = () => {
    setWatermarkEnabled(true);
    setWatermarkText('STAYVERSE REALTY');
    setPreventCopy(false);
    setMfaExport(true);
    setArchiveDuration('180');
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { watermarkEnabled, watermarkText, preventCopy, mfaExport, archiveDuration };
    localStorage.setItem('stayverse_set_documents', JSON.stringify(data));
    alert(language === 'th' ? 'บันทึกการตั้งค่าความปลอดภัยเอกสารเรียบร้อยแล้ว' : 'Document settings updated successfully');
  };

  const isTh = language === 'th';

  return (
    <AdminShell activeItem="set_document">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 mb-6 border-b border-gray-200/80">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-gray-800 tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#CF7536]" />
            <span>{isTh ? 'ป้องกันและจัดเอกสาร > แก้ไข' : 'Document Protection > Edit'}</span>
          </h1>
        </div>
        <div className="text-xs font-semibold text-gray-400 mt-2 sm:mt-0 flex items-center space-x-1.5 select-none">
          <span className="hover:text-[#CF7536] cursor-pointer" onClick={() => router.push('/admin')}>Home</span>
          <span>/</span>
          <span className="hover:text-[#CF7536] cursor-pointer" onClick={() => router.push('/admin/set_document')}>{isTh ? 'ป้องกันและจัดเอกสาร' : 'Document Protection'}</span>
          <span>/</span>
          <span className="text-gray-655">{isTh ? 'แก้ไข' : 'Edit'}</span>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm overflow-hidden max-w-4xl">
        <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
          <h2 className="text-sm font-bold text-gray-700">{isTh ? 'ตั้งค่าความปลอดภัยของรูปภาพและเอกสาร PDF' : 'Image Watermarking & PDF Security Settings'}</h2>
        </div>

        <form onSubmit={handleUpdate} className="p-6 md:p-8 space-y-6">
          
          {/* Toggles Container */}
          <div className="space-y-4">
            
            {/* Watermark Toggle */}
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div className="space-y-1 pr-4">
                <span className="text-xs font-bold text-gray-800 block">
                  {isTh ? 'ลายน้ำอัตโนมัติบนรูปภาพ' : 'Automatic Image Watermarking'}
                </span>
                <span className="text-[11px] text-gray-400 block font-medium">
                  {isTh ? 'สแตมป์ชื่อแบรนด์หรือโลโก้ลงบนภาพทรัพย์ที่อัปโหลด' : 'Stamp company name or logo onto uploaded listing photos'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setWatermarkEnabled(!watermarkEnabled)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  watermarkEnabled ? 'bg-[#6F42C1]' : 'bg-gray-200'
                }`}
              >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  watermarkEnabled ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Watermark Input Text */}
            {watermarkEnabled && (
              <div className="space-y-1.5 pl-4 border-l-2 border-[#CF7536]">
                <label className="text-xs font-bold text-gray-700 block">{isTh ? 'ข้อความลายน้ำ' : 'Watermark Text'}</label>
                <input
                  type="text"
                  value={watermarkText}
                  onChange={(e) => setWatermarkText(e.target.value)}
                  className="w-full md:w-1/2 text-sm bg-white border border-gray-200 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#CF7536] transition-all"
                  required
                />
              </div>
            )}

            {/* Prevent Copying */}
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div className="space-y-1 pr-4">
                <span className="text-xs font-bold text-gray-800 block">
                  {isTh ? 'ป้องกันการคัดลอกเนื้อหา' : 'Prevent Text Selection & Copy'}
                </span>
                <span className="text-[11px] text-gray-400 block font-medium">
                  {isTh ? 'บล็อกการคลิกขวาและการคลุมดำข้อความบนหน้าบ้านและรายละเอียดทรัพย์' : 'Blocks right-click and text selections on customer-facing property detail pages'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setPreventCopy(!preventCopy)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  preventCopy ? 'bg-[#6F42C1]' : 'bg-gray-200'
                }`}
              >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  preventCopy ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* MFA for Export */}
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div className="space-y-1 pr-4">
                <span className="text-xs font-bold text-gray-800 block">
                  {isTh ? 'ตรวจสอบความปลอดภัยขั้นสูงเมื่อส่งออกข้อมูล' : 'Enhanced Security for PDF/Excel Exports'}
                </span>
                <span className="text-[11px] text-gray-400 block font-medium">
                  {isTh ? 'ต้องยืนยันตัวตนซ้ำด้วยรหัส OTP ก่อนดาวน์โหลดรายงานสมาชิกหรือรายงานยอดขาย' : 'Requires dynamic validation check before downloading member lists or sales sheets'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMfaExport(!mfaExport)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  mfaExport ? 'bg-[#6F42C1]' : 'bg-gray-200'
                }`}
              >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  mfaExport ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Archive Duration Limit */}
            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-bold text-gray-700 block">
                {isTh ? 'ระยะเวลาเก็บรักษาเอกสารบันทึกเหตุการณ์ (วัน)' : 'System Audit Log Archiving Limit (Days)'}
              </label>
              <select
                value={archiveDuration}
                onChange={(e) => setArchiveDuration(e.target.value)}
                className="w-full md:w-1/3 text-xs bg-white border border-gray-200 rounded-lg p-2.5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#CF7536]"
              >
                <option value="90">90 {isTh ? 'วัน' : 'Days'}</option>
                <option value="180">180 {isTh ? 'วัน' : 'Days'}</option>
                <option value="365">365 {isTh ? 'วัน' : 'Days'}</option>
                <option value="0">{isTh ? 'ไม่จำกัด' : 'Unlimited'}</option>
              </select>
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
