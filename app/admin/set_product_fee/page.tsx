'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminShell } from '../AdminShell';
import { DollarSign, Save, RotateCcw } from 'lucide-react';
import { useTranslation } from '@/context/LanguageContext';

export default function SetProductFeePage() {
  const router = useRouter();
  const { language } = useTranslation();

  const [postFee, setPostFee] = useState('290');
  const [commRate, setCommRate] = useState('3.0');
  const [buyerFee, setBuyerFee] = useState('1.5');
  const [vatRate, setVatRate] = useState('7.0');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('stayverse_set_product_fees');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setPostFee(parsed.postFee ?? '290');
          setCommRate(parsed.commRate ?? '3.0');
          setBuyerFee(parsed.buyerFee ?? '1.5');
          setVatRate(parsed.vatRate ?? '7.0');
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  const handleReset = () => {
    setPostFee('290');
    setCommRate('3.0');
    setBuyerFee('1.5');
    setVatRate('7.0');
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { postFee, commRate, buyerFee, vatRate };
    localStorage.setItem('stayverse_set_product_fees', JSON.stringify(data));
    alert(language === 'th' ? 'บันทึกข้อมูลค่าธรรมเนียมเรียบร้อยแล้ว' : 'Fees updated successfully');
  };

  const isTh = language === 'th';

  return (
    <AdminShell activeItem="set_product_fee">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 mb-6 border-b border-gray-200/80">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-gray-800 tracking-tight flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-[#CF7536]" />
            <span>{isTh ? 'ค่าธรรมเนียมสินค้า > แก้ไข' : 'Product Fees > Edit'}</span>
          </h1>
        </div>
        <div className="text-xs font-semibold text-gray-400 mt-2 sm:mt-0 flex items-center space-x-1.5 select-none">
          <span className="hover:text-[#CF7536] cursor-pointer" onClick={() => router.push('/admin')}>Home</span>
          <span>/</span>
          <span className="hover:text-[#CF7536] cursor-pointer" onClick={() => router.push('/admin/set_product_fee')}>{isTh ? 'ค่าธรรมเนียมสินค้า' : 'Product Fees'}</span>
          <span>/</span>
          <span className="text-gray-655">{isTh ? 'แก้ไข' : 'Edit'}</span>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm overflow-hidden max-w-4xl">
        <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
          <h2 className="text-sm font-bold text-gray-700">{isTh ? 'ตั้งค่าค่าธรรมเนียมระบบและค่านายหน้า' : 'Product Fee & Brokerage Commissions Settings'}</h2>
        </div>

        <form onSubmit={handleUpdate} className="p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* โพสต์ประกาศ Fee */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 block">
                {isTh ? 'ค่าลงทะเบียนเผยแพร่ประกาศ (บาท)' : 'Listing Publication Fee (THB)'}
              </label>
              <input
                type="number"
                value={postFee}
                onChange={(e) => setPostFee(e.target.value)}
                className="w-full text-sm bg-white border border-gray-200 rounded-lg p-2.5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#CF7536] transition-all"
                required
              />
              <span className="text-[10px] text-gray-450">{isTh ? '* ค่าบริการต่อการลงทะเบียน 1 ประกาศออนไลน์' : '* Service charge per 1 online property listing'}</span>
            </div>

            {/* ค่านายหน้า Comm Rate */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 block">
                {isTh ? 'อัตราค่านายหน้ามาตรฐาน (%)' : 'Standard Brokerage Commission Rate (%)'}
              </label>
              <input
                type="number"
                step="0.1"
                value={commRate}
                onChange={(e) => setCommRate(e.target.value)}
                className="w-full text-sm bg-white border border-gray-200 rounded-lg p-2.5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#CF7536] transition-all"
                required
              />
              <span className="text-[10px] text-gray-450">{isTh ? '* ค่านายหน้าสำหรับการซื้อขายที่สำเร็จ' : '* Success-based brokerage commission percentage'}</span>
            </div>

            {/* ค่าธรรมเนียมผู้ซื้อ */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 block">
                {isTh ? 'ค่าธรรมเนียมฝั่งผู้ซื้อ (%)' : 'Buyer Transaction Fee (%)'}
              </label>
              <input
                type="number"
                step="0.1"
                value={buyerFee}
                onChange={(e) => setBuyerFee(e.target.value)}
                className="w-full text-sm bg-white border border-gray-200 rounded-lg p-2.5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#CF7536] transition-all"
                required
              />
              <span className="text-[10px] text-gray-450">{isTh ? '* อัตราเรียกเก็บกับผู้เสนอซื้อ' : '* Percentage billed to purchasing parties'}</span>
            </div>

            {/* VAT Rate */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 block">
                {isTh ? 'ภาษีมูลค่าเพิ่ม (%)' : 'VAT / Service Tax Rate (%)'}
              </label>
              <input
                type="number"
                step="0.1"
                value={vatRate}
                onChange={(e) => setVatRate(e.target.value)}
                className="w-full text-sm bg-white border border-gray-200 rounded-lg p-2.5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#CF7536] transition-all"
                required
              />
              <span className="text-[10px] text-gray-450">{isTh ? '* อัตราภาษีมูลค่าเพิ่มของประเทศไทย (7%)' : '* National sales/value-added tax rate (e.g. 7.0%)'}</span>
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
