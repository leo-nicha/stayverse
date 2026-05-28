'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminShell } from '../../../admin/AdminShell';
import { Calendar } from 'lucide-react';

export default function TenantClientDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  
  // State for the form
  const [contractType, setContractType] = useState('sell');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [price, setPrice] = useState('');
  const [details, setDetails] = useState('');

  return (
    <AdminShell activeItem="client" role="tenant">
      <div className="min-h-screen bg-[#f8f9fc] font-sans">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 py-4 bg-white border-b border-gray-100">
          <h1 className="text-xl font-bold text-gray-800 tracking-tight">
            รายละเอียดผู้ซื้อ / ผู้เช่า
          </h1>
          <div className="text-[13px] text-gray-400 mt-2 sm:mt-0 flex items-center space-x-2 select-none">
            <span className="hover:text-[#6F42C1] cursor-pointer transition-colors" onClick={() => router.push('/tenant/my_properties')}>Home</span>
            <span>/</span>
            <span className="hover:text-[#6F42C1] cursor-pointer transition-colors" onClick={() => router.push('/tenant/client')}>ผู้ซื้อ / ผู้เช่า</span>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">
            {/* Blue Header Bar */}
            <div className="bg-[#0088FF] text-white px-6 py-3">
              <h1 className="text-[15px] font-medium">
                ข้อมูลผู้ซื้อ/เช่า
              </h1>
            </div>

            <div className="px-6 py-8 max-w-5xl">
              {/* Form Body */}
              <div className="space-y-7">
                
                {/* ประเภทสัญญา (Contract Type) */}
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
                  <div className="sm:w-56 shrink-0 mt-0.5">
                    <label className="text-[14px] text-gray-700">ประเภทสัญญา</label>
                  </div>
                  <div className="flex flex-col gap-3.5">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="radio" 
                        name="contractType" 
                        value="sell" 
                        checked={contractType === 'sell'} 
                        onChange={() => setContractType('sell')}
                        className="w-4 h-4 text-[#6F42C1] border-gray-300 focus:ring-[#6F42C1] accent-[#6F42C1]" 
                      />
                      <span className="text-[14px] text-gray-800">ซื้อ</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="radio" 
                        name="contractType" 
                        value="rent" 
                        checked={contractType === 'rent'} 
                        onChange={() => setContractType('rent')}
                        className="w-4 h-4 text-[#6F42C1] border-gray-300 focus:ring-[#6F42C1] accent-[#6F42C1]" 
                      />
                      <span className="text-[14px] text-gray-800">เช่า</span>
                    </label>
                  </div>
                </div>

                {/* ผู้ซื้อ/เช่า (Buyer/Tenant) */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                  <div className="sm:w-56 shrink-0">
                    <label className="text-[14px] text-gray-700">ผู้ซื้อ/เช่า</label>
                  </div>
                  <div className="flex-1 max-w-[320px]">
                    <input 
                      type="text" 
                      placeholder="ผู้ซื้อ/เช่า" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2 bg-white border border-gray-200 rounded text-[14px] focus:outline-none focus:border-[#0088FF] transition-colors"
                    />
                  </div>
                </div>

                {/* โทรศัพท์ (Phone) */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                  <div className="sm:w-56 shrink-0">
                    <label className="text-[14px] text-gray-700">โทรศัพท์</label>
                  </div>
                  <div className="flex-1 max-w-[320px]">
                    <input 
                      type="text" 
                      placeholder="โทรศัพท์" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2 bg-white border border-gray-200 rounded text-[14px] focus:outline-none focus:border-[#0088FF] transition-colors"
                    />
                  </div>
                </div>

                {/* วันที่ขายได้/เช่าได้ (Date) */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                  <div className="sm:w-56 shrink-0">
                    <label className="text-[14px] text-gray-700">วันที่ขายได้/เช่าได้</label>
                  </div>
                  <div className="flex-1 max-w-[320px] flex items-center">
                    <Calendar className="w-4 h-4 text-gray-400 mr-3" />
                    <div className="flex-1 border-b border-gray-200">
                      <input 
                        type="date" 
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-transparent border-none text-[14px] text-gray-700 focus:outline-none focus:ring-0 p-0 pb-1.5"
                      />
                    </div>
                  </div>
                </div>

                {/* ราคาที่ขายได้ (Price) */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                  <div className="sm:w-56 shrink-0">
                    <label className="text-[14px] text-gray-700">ราคาที่ขายได้</label>
                  </div>
                  <div className="flex-1 max-w-[320px]">
                    <input 
                      type="text" 
                      placeholder="ราคาที่ขายได้" 
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full px-3.5 py-2 bg-white border border-gray-200 rounded text-[14px] focus:outline-none focus:border-[#0088FF] transition-colors"
                    />
                  </div>
                </div>

                {/* รายละเอียดอื่นๆ (Other details) */}
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
                  <div className="sm:w-56 shrink-0 mt-2">
                    <label className="text-[14px] text-gray-700">รายละเอียดอื่นๆ</label>
                  </div>
                  <div className="flex-1 max-w-3xl">
                    <textarea 
                      placeholder="รายละเอียดอื่นๆ" 
                      rows={4}
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded text-[14px] focus:outline-none focus:border-[#0088FF] transition-colors resize-y"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* แนบไฟล์เพิ่มเติม (Additional attached files) */}
          <div className="mt-8 mb-4">
            <h3 className="text-[14.5px] font-medium text-gray-700">แนบไฟล์เพิ่มเติม</h3>
          </div>
          
          <div className="bg-white border border-gray-200 overflow-hidden">
            <table className="w-full text-left text-[14px] text-gray-800">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="py-4 px-5 font-bold w-1/2 border-r border-gray-200">หัวข้อ</th>
                  <th className="py-4 px-5 font-bold w-1/4 border-r border-gray-200">ไฟล์</th>
                  <th className="py-4 px-5 font-bold w-1/4">วันที่สร้าง / By</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-7 border-r border-gray-200"></td>
                  <td className="py-7 border-r border-gray-200"></td>
                  <td className="py-7"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
