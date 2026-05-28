'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AdminShell } from '../AdminShell';
import { Plus, Search, RefreshCcw, Edit, Trash2, FolderOpen } from 'lucide-react';
import { useTranslation } from '@/context/LanguageContext';

export default function BannerPage() {
  const router = useRouter();
  const { language } = useTranslation();
  const isTh = language === 'th';

  const banners = [
    { id: 1, name: 'WE PUBLISH ARTICLES', type: 'รูปภาพกำหนดเอง', startDate: '-', endDate: '-', views: 1469291, clicks: 1172, sort: 99999, status: 'ON', image: 'https://res.cloudinary.com/dvv3wvgnt/image/upload/v1779681125/svlogo_tzfhad.webp' },
    { id: 2, name: 'PROPHOLIC CHANNEL', type: 'รูปภาพกำหนดเอง', startDate: '-', endDate: '-', views: 1469293, clicks: 840, sort: 99999, status: 'ON', image: 'https://res.cloudinary.com/dvv3wvgnt/image/upload/v1779681125/svlogo_tzfhad.webp' },
    { id: 3, name: 'OUR FACEBOOK FAN PAGE', type: 'รูปภาพกำหนดเอง', startDate: '-', endDate: '-', views: 1469293, clicks: 2200, sort: 99999, status: 'ON', image: 'https://res.cloudinary.com/dvv3wvgnt/image/upload/v1779681125/svlogo_tzfhad.webp' },
  ];

  return (
    <AdminShell activeItem="banner">
      <div className="bg-[#f8f9fc] min-h-screen pb-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 py-4 bg-white border-b border-gray-100">
          <h1 className="text-xl font-bold text-gray-800 tracking-tight">
            แบนเนอร์
          </h1>
          <div className="text-[13px] text-[#0088ff] mt-2 sm:mt-0 flex items-center space-x-2 select-none">
            <span className="hover:underline cursor-pointer transition-colors" onClick={() => router.push('/admin')}>Home</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-500">แบนเนอร์</span>
          </div>
        </div>

        <div className="p-6">
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            {/* Top Toolbar */}
            <div className="p-4 border-b border-gray-200 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <button onClick={() => router.push('/admin/banner/new')} className="bg-[#6F42C1] hover:bg-[#5A32A3] text-white px-4 py-1.5 rounded flex items-center justify-center gap-2 text-[13px] font-medium transition-colors">
                <Plus className="w-4 h-4" />
                Add new
              </button>

              <div className="flex flex-wrap items-center gap-2">
                <select className="border border-gray-300 px-3 py-1.5 rounded text-[13px] focus:outline-none focus:border-[#6F42C1] bg-white text-gray-700 w-24">
                  <option>Status</option>
                  <option>ON</option>
                  <option>OFF</option>
                </select>
                <input 
                  type="text" 
                  placeholder="ค้นหา" 
                  className="border border-gray-300 px-3 py-1.5 rounded text-[13px] focus:outline-none focus:border-[#6F42C1] w-48"
                />
                <button className="bg-[#6F42C1] hover:bg-[#5A32A3] text-white px-4 py-1.5 rounded flex items-center gap-2 text-[13px] font-medium transition-colors">
                  <Search className="w-4 h-4" />
                  Search
                </button>
                <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-1.5 rounded flex items-center gap-2 text-[13px] font-medium transition-colors">
                  <RefreshCcw className="w-3.5 h-3.5" />
                  Reset
                </button>
              </div>
            </div>

            {/* Results Count & Pagination top */}
            <div className="px-5 py-3 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
              <span className="text-[13px] text-gray-700 font-medium">
                ค้นพบ <span className="font-bold">3</span> รายการ
              </span>
              <div className="flex items-center gap-1 text-[12px] border border-gray-200 rounded overflow-hidden">
                <span className="px-3 py-1.5 text-gray-400 bg-white border-r border-gray-200">« First</span>
                <span className="px-3 py-1.5 text-[#0088ff] bg-blue-50 font-medium border-r border-gray-200">1</span>
                <span className="px-3 py-1.5 text-gray-600 hover:bg-gray-50 bg-white cursor-pointer transition-colors">Last »</span>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px]">
                <thead>
                  <tr className="border-b border-gray-200 bg-white">
                    <th className="py-3 px-4 w-12 text-center">
                      <input type="checkbox" className="rounded border-gray-300 text-[#6F42C1] focus:ring-[#6F42C1]" />
                    </th>
                    <th className="py-3 px-4 font-bold text-gray-700">Banner PC</th>
                    <th className="py-3 px-4 font-bold text-gray-700">ประเภท</th>
                    <th className="py-3 px-4 font-bold text-gray-700 text-center">วันที่เริ่มแสดง</th>
                    <th className="py-3 px-4 font-bold text-gray-700 text-center">วันที่สิ้นสุด</th>
                    <th className="py-3 px-4 font-bold text-gray-700">ชื่อแบนเนอร์</th>
                    <th className="py-3 px-4 font-bold text-gray-700 text-center">จำนวนวิว</th>
                    <th className="py-3 px-4 font-bold text-gray-700 text-center">จำนวนคลิ้ก</th>
                    <th className="py-3 px-4 font-bold text-gray-700 text-center flex items-center justify-center gap-1">
                      Sort <span className="text-gray-400 text-[10px]">▼</span>
                    </th>
                    <th className="py-3 px-4 font-bold text-gray-700 text-center">Status</th>
                    <th className="py-3 px-4 font-bold text-gray-700 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {banners.map((b) => (
                    <tr key={b.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="py-3 px-4 text-center align-middle">
                        <input type="checkbox" className="rounded border-gray-300 text-[#6F42C1] focus:ring-[#6F42C1]" />
                      </td>
                      <td className="py-3 px-4 align-middle">
                        <div className="flex items-center gap-3">
                          <div className="w-24 h-10 bg-gray-100 border border-gray-200 rounded flex items-center justify-center text-[10px] text-gray-400 font-bold px-2 text-center leading-tight">
                            {b.name}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 align-middle text-gray-700">{b.type}</td>
                      <td className="py-3 px-4 align-middle text-center text-gray-500">{b.startDate}</td>
                      <td className="py-3 px-4 align-middle text-center text-gray-500">{b.endDate}</td>
                      <td className="py-3 px-4 align-middle text-gray-700"></td>
                      <td className="py-3 px-4 align-middle text-center text-gray-700">{b.views}</td>
                      <td className="py-3 px-4 align-middle text-center text-gray-700">{b.clicks}</td>
                      <td className="py-3 px-4 align-middle text-center">
                        <input type="text" defaultValue={b.sort} className="w-16 border border-gray-300 rounded px-2 py-1 text-center text-[12px] focus:outline-none focus:border-[#6F42C1] text-gray-700" />
                      </td>
                      <td className="py-3 px-4 align-middle text-center">
                        <span className="text-[#2ecc71] font-bold">{b.status}</span>
                      </td>
                      <td className="py-3 px-4 align-middle text-center">
                        <div className="flex items-center justify-center gap-2 text-gray-500">
                          <button className="hover:text-gray-700 transition-colors" title="Folder"><FolderOpen className="w-4 h-4" /></button>
                          <button onClick={() => router.push('/admin/banner/edit')} className="hover:text-amber-500 transition-colors" title="Edit"><Edit className="w-4 h-4" /></button>
                          <button className="hover:text-red-500 transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bottom Actions and Pagination */}
            <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/50">
              <div className="flex items-center gap-2">
                <button className="bg-[#3498db] hover:bg-[#2980b9] text-white px-4 py-1.5 rounded text-[13px] font-medium transition-colors">Select all</button>
                <button className="bg-[#3498db] hover:bg-[#2980b9] text-white px-4 py-1.5 rounded text-[13px] font-medium transition-colors">Delete</button>
                <button className="bg-[#3498db] hover:bg-[#2980b9] text-white px-4 py-1.5 rounded text-[13px] font-medium transition-colors">Sort</button>
              </div>
              <div className="flex items-center gap-1 text-[12px] border border-gray-200 rounded overflow-hidden bg-white">
                <span className="px-3 py-1.5 text-gray-400 border-r border-gray-200">« First</span>
                <span className="px-3 py-1.5 text-[#0088ff] bg-blue-50 font-medium border-r border-gray-200">1</span>
                <span className="px-3 py-1.5 text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors">Last »</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
