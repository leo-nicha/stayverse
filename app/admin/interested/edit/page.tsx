'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminShell } from '../../AdminShell';
import { ChevronLeft, Clock, MapPin } from 'lucide-react';

export default function InterestedEditPage() {
  const router = useRouter();
  
  const [want, setWant] = useState('buy');
  const [name, setName] = useState('YY YY');
  const [phone, setPhone] = useState('0945545445');
  const [email, setEmail] = useState('waitingww87@gmail.com');
  const [note, setNote] = useState('');
  const [status, setStatus] = useState('New');

  return (
    <AdminShell activeItem="interested">
      <div className="bg-[#f8f9fc] min-h-screen pb-8">
        
        {/* Top Header / Back button */}
        <div className="bg-white border-b border-gray-100 p-4 sticky top-0 z-10 flex items-center">
          <button 
            onClick={() => router.push('/admin/interested')}
            className="bg-[#6F42C1] hover:bg-[#5A32A3] text-white px-4 py-1.5 rounded flex items-center gap-2 text-sm font-medium transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            กลับ
          </button>
        </div>

        <div className="max-w-[1200px] mx-auto p-4 md:p-6 space-y-6">
          {/* Main Form Card */}
          <div className="bg-white border border-gray-200 shadow-sm">
            <div className="p-4 md:p-8 space-y-8">
              
              {/* ID */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-2 text-gray-600 font-medium pt-1">ID</div>
                <div className="md:col-span-10 text-gray-800">5</div>
              </div>

              {/* Announcement */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-2 text-gray-600 font-medium pt-1">ประกาศ</div>
                <div className="md:col-span-10 space-y-2">
                  <img 
                    src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300&h=200&fit=crop" 
                    alt="Property" 
                    className="w-48 h-32 object-cover rounded shadow-sm border border-gray-200"
                  />
                  <a href="#" className="text-[#0088FF] hover:underline text-[13px] inline-block font-medium">
                    S47 Sukhumvit ห้อง Duplex 1 นอน 1 น้ำ 1 ห้อง Powder ขนาด 61 ตร.ม. ราคา 18.9 ลบ.*
                  </a>
                </div>
              </div>

              {/* Want */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-2 text-gray-600 font-medium pt-1">ต้องการ</div>
                <div className="md:col-span-10 space-y-3">
                  <label className="flex items-center gap-2 cursor-pointer w-fit">
                    <input 
                      type="radio" 
                      name="want" 
                      value="buy"
                      checked={want === 'buy'}
                      onChange={(e) => setWant(e.target.value)}
                      className="w-3.5 h-3.5 text-[#6F42C1] focus:ring-[#6F42C1]"
                    />
                    <span className="text-gray-700 text-sm font-medium">ซื้อ</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer w-fit">
                    <input 
                      type="radio" 
                      name="want" 
                      value="rent"
                      checked={want === 'rent'}
                      onChange={(e) => setWant(e.target.value)}
                      className="w-3.5 h-3.5 text-[#6F42C1] focus:ring-[#6F42C1]"
                    />
                    <span className="text-gray-700 text-sm font-medium">เช่า</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer w-fit">
                    <input 
                      type="radio" 
                      name="want" 
                      value="buy_rent"
                      checked={want === 'buy_rent'}
                      onChange={(e) => setWant(e.target.value)}
                      className="w-3.5 h-3.5 text-[#6F42C1] focus:ring-[#6F42C1]"
                    />
                    <span className="text-gray-700 text-sm font-medium">ซื้อ/เช่า</span>
                  </label>
                </div>
              </div>

              {/* Name */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-2 text-gray-600 font-medium">ชื่อ</div>
                <div className="md:col-span-10">
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full md:w-1/3 bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#6F42C1]"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-2 text-gray-600 font-medium">โทรศัพท์</div>
                <div className="md:col-span-10">
                  <input 
                    type="text" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full md:w-1/3 bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#6F42C1]"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-2 text-gray-600 font-medium">อีเมล</div>
                <div className="md:col-span-10">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full md:w-2/3 lg:w-1/2 bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#6F42C1]"
                  />
                </div>
              </div>

              {/* Note */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                <div className="md:col-span-2 text-gray-600 font-medium pt-2">Note</div>
                <div className="md:col-span-10">
                  <textarea 
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="รายละเอียด"
                    rows={4}
                    className="w-full md:w-2/3 lg:w-1/2 bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#6F42C1] resize-y"
                  ></textarea>
                </div>
              </div>

              {/* Status */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-2 text-gray-600 font-medium pt-1">Status</div>
                <div className="md:col-span-10 space-y-3">
                  <label className="flex items-center gap-2 cursor-pointer w-fit">
                    <input 
                      type="radio" 
                      name="status" 
                      value="New"
                      checked={status === 'New'}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-3.5 h-3.5 text-[#6F42C1] focus:ring-[#6F42C1]"
                    />
                    <span className="text-red-500 text-sm font-bold">New</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer w-fit">
                    <input 
                      type="radio" 
                      name="status" 
                      value="Read"
                      checked={status === 'Read'}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-3.5 h-3.5 text-[#6F42C1] focus:ring-[#6F42C1]"
                    />
                    <span className="text-[#2ecc71] text-sm font-bold">Read</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer w-fit">
                    <input 
                      type="radio" 
                      name="status" 
                      value="Contact"
                      checked={status === 'Contact'}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-3.5 h-3.5 text-[#6F42C1] focus:ring-[#6F42C1]"
                    />
                    <span className="text-[#2ecc71] text-sm font-bold">Contact</span>
                  </label>
                </div>
              </div>

              {/* Created Date */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-2 text-gray-600 font-medium pt-1">วันที่สร้าง</div>
                <div className="md:col-span-10 text-gray-600 text-sm">
                  2026-04-25 11:10:13
                </div>
              </div>

            </div>

            {/* History Section */}
            <div className="px-4 md:px-8 pb-8">
              <div className="text-gray-600 font-medium mb-3">วันที่แก้ไขล่าสุด</div>
              <div className="border border-[#0088FF] rounded overflow-hidden shadow-sm">
                <div className="bg-[#EBF5FF] text-[#0088FF] px-4 py-2 text-sm font-bold flex items-center gap-2 border-b border-[#0088FF]">
                  <Clock className="w-4 h-4" />
                  ประวัติการดูแล-ทัก <span className="bg-[#6F42C1] text-white text-[10px] px-1.5 py-0.5 rounded ml-1">2 รายการ</span>
                </div>
                <div className="bg-white p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Item 1 */}
                  <div className="border border-gray-200 rounded p-3 flex gap-4">
                    <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=150&h=100&fit=crop" alt="Property" className="w-24 h-16 object-cover rounded shadow-sm flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <div className="text-[#0088FF] font-medium text-[13px] truncate">CQ8472_2025 แอล 47 สุขุมวิท</div>
                        <div className="text-gray-400 text-[10px] whitespace-nowrap flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          25/04/2026 12:10
                        </div>
                      </div>
                      <div className="flex items-start gap-1 text-gray-500 text-[11px] mt-1 line-clamp-1">
                        <MapPin className="w-3 h-3 flex-shrink-0 mt-0.5" />
                        สุขุมวิท อโศก ทองหล่อ เอกมัย พร้อมพงษ์ เพชรบุรีพระราม9
                      </div>
                      <div className="text-blue-500 text-[11px] mt-1 font-medium bg-blue-50 inline-block px-1 rounded">คอนโด</div>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 rounded">ขาย</span>
                        <span className="text-[13px] font-bold text-gray-800">8,900,000 บาท</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Item 2 */}
                  <div className="border border-gray-200 rounded p-3 flex gap-4">
                    <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=150&h=100&fit=crop" alt="Property" className="w-24 h-16 object-cover rounded shadow-sm flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <div className="text-[#0088FF] font-medium text-[13px] truncate">Solace_Loft โซเลซ พหลฯ - ประดิพัทธ์</div>
                        <div className="text-gray-400 text-[10px] whitespace-nowrap flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          25/04/2026 11:12
                        </div>
                      </div>
                      <div className="flex items-start gap-1 text-gray-500 text-[11px] mt-1 line-clamp-1">
                        <MapPin className="w-3 h-3 flex-shrink-0 mt-0.5" />
                        พหลโยธิน จตุจักร สะพานควาย ประดิพัทธ์ ลาดพร้าว
                      </div>
                      <div className="text-blue-500 text-[11px] mt-1 font-medium bg-blue-50 inline-block px-1 rounded">คอนโด</div>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 rounded">ขาย</span>
                        <span className="text-[13px] font-bold text-gray-800">6,270,000 บาท</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Form Actions */}
            <div className="bg-gray-50/50 p-4 md:p-6 border-t border-gray-200 flex items-center gap-3">
              <button 
                onClick={() => {
                  alert('อัพเดทข้อมูลสำเร็จ');
                  router.push('/admin/interested');
                }}
                className="bg-[#6F42C1] hover:bg-[#5A32A3] text-white px-6 py-1.5 rounded text-[13px] font-medium transition-colors"
              >
                Update
              </button>
              <button 
                onClick={() => window.location.reload()}
                className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-1.5 rounded text-[13px] font-medium transition-colors"
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
