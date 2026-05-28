'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AdminShell } from '../AdminShell';
import { Plus, Search, RefreshCcw, Edit, Trash2, FolderOpen } from 'lucide-react';
import { useTranslation } from '@/context/LanguageContext';

export default function VideoListPage() {
  const router = useRouter();
  const { language } = useTranslation();

  const videos = [
    { id: 1, name: '[PH Vlog] โคตรเหมือนต่างถิ่น! Ananda Instant Livin...', sort: 2, status: 'ON', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=200&h=120' },
    { id: 2, name: '🔥 RESALE HOT HOT 🔥 | The ESSE Asoke ราคาสบายกระเป๋า...', sort: 1, status: 'ON', image: 'https://images.unsplash.com/photo-1541888050969-ce8793397972?auto=format&fit=crop&q=80&w=200&h=120' },
    { id: 3, name: '[PH Vlog] ดีต่อใจ แม่ม้ายยังหนุ่ม! Unbox amsw...', sort: 1, status: 'ON', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=200&h=120' },
    { id: 4, name: 'TechLite: ปรับลุคส์ผนังบ้านเดิมด้วย AvatarOn A สว...', sort: 0, status: 'ON', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=200&h=120' },
    { id: 5, name: '[PH Vlog] ฮาวทูแปลงโฉมห้องเก่า! Casual Desk สเปซที่...', sort: 0, status: 'ON', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=200&h=120' },
    { id: 6, name: '[PH Vlog] แต่งห้องอย่างไร? DUOSTIX จาก American S...', sort: 0, status: 'ON', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=200&h=120' },
  ];

  return (
    <AdminShell activeItem="youtubeVideo">
      <div className="bg-[#f8f9fc] min-h-screen pb-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 py-4 bg-white border-b border-gray-100">
          <h1 className="text-xl font-bold text-gray-800 tracking-tight">
            Video
          </h1>
          <div className="text-[13px] text-[#0088ff] mt-2 sm:mt-0 flex items-center space-x-2 select-none">
            <span className="hover:underline cursor-pointer transition-colors" onClick={() => router.push('/admin')}>Home</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-500">Video</span>
          </div>
        </div>

        <div className="p-6">
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            {/* Top Toolbar */}
            <div className="p-4 border-b border-gray-200 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <button onClick={() => router.push('/admin/video_list/new')} className="bg-[#6F42C1] hover:bg-[#5A32A3] text-white px-4 py-1.5 rounded flex items-center justify-center gap-2 text-[13px] font-medium transition-colors">
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
                ค้นพบ <span className="font-bold">17</span> รายการ
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
                    <th className="py-3 px-4 font-bold text-gray-700 w-32">รูป</th>
                    <th className="py-3 px-4 font-bold text-gray-700">ชื่อวิดีโอ</th>
                    <th className="py-3 px-4 font-bold text-gray-700 text-center w-24">
                      <div className="flex items-center justify-center gap-1">
                        Sort <span className="text-[#2ecc71] text-[10px]">▼</span>
                      </div>
                    </th>
                    <th className="py-3 px-4 font-bold text-gray-700 text-center w-24">Status</th>
                    <th className="py-3 px-4 font-bold text-gray-700 text-center w-32">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {videos.map((v) => (
                    <tr key={v.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="py-3 px-4 text-center align-middle">
                        <input type="checkbox" className="rounded border-gray-300 text-[#6F42C1] focus:ring-[#6F42C1]" />
                      </td>
                      <td className="py-3 px-4 align-middle">
                        <div className="w-24 h-16 rounded overflow-hidden shadow-sm border border-gray-200">
                          <img src={v.image} alt={v.name} className="w-full h-full object-cover" />
                        </div>
                      </td>
                      <td className="py-3 px-4 align-middle text-gray-700">{v.name}</td>
                      <td className="py-3 px-4 align-middle text-center">
                        <input type="text" defaultValue={v.sort} className="w-16 border border-gray-300 rounded px-2 py-1 text-center text-[12px] focus:outline-none focus:border-[#6F42C1] text-gray-700" />
                      </td>
                      <td className="py-3 px-4 align-middle text-center">
                        <span className="text-[#2ecc71] font-bold">{v.status}</span>
                      </td>
                      <td className="py-3 px-4 align-middle text-center">
                        <div className="flex items-center justify-center gap-2 text-gray-500">
                          <button className="hover:text-gray-700 transition-colors" title="Folder"><FolderOpen className="w-4 h-4" /></button>
                          <button onClick={() => router.push('/admin/video_list/edit')} className="hover:text-amber-500 transition-colors" title="Edit"><Edit className="w-4 h-4" /></button>
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
                <button className="bg-[#0088ff] hover:bg-[#0077cc] text-white px-4 py-1.5 rounded text-[13px] font-medium transition-colors">Select all</button>
                <button className="bg-[#0088ff] hover:bg-[#0077cc] text-white px-4 py-1.5 rounded text-[13px] font-medium transition-colors">Delete</button>
                <button className="bg-[#0088ff] hover:bg-[#0077cc] text-white px-4 py-1.5 rounded text-[13px] font-medium transition-colors">Sort</button>
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
