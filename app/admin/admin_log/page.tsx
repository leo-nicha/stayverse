'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AdminShell } from '../AdminShell';
import { Search, RefreshCcw } from 'lucide-react';

export default function AdminLogPage() {
  return <AdminLogContent role="admin" />;
}

function AdminLogContent({ role = 'admin' }: { role?: 'admin' | 'developer' | 'affiliate' | 'tenant' }) {
  const router = useRouter();
  const basePath = role === 'admin' ? '/admin' : `/${role}`;

  const mockLogs = [
    { id: 1, username: 'admin@stayverse.com', action: 'view page edit Html Page CookiesConsent || 5', date: '28 พ.ค. 2569 เวลา 14:19:35 น.' },
    { id: 2, username: 'admin@stayverse.com', action: 'view Html Page', date: '28 พ.ค. 2569 เวลา 14:06:18 น.' },
    { id: 3, username: 'admin@stayverse.com', action: 'view Html Page', date: '28 พ.ค. 2569 เวลา 14:06:16 น.' },
    { id: 4, username: 'admin@stayverse.com', action: 'view page edit Html Page how_to_post || 4', date: '28 พ.ค. 2569 เวลา 14:06:14 น.' },
    { id: 5, username: 'admin@stayverse.com', action: 'view Html Page', date: '28 พ.ค. 2569 เวลา 14:06:13 น.' },
    { id: 6, username: 'admin@stayverse.com', action: 'view page edit Html Page CookiesConsent || 5', date: '28 พ.ค. 2569 เวลา 14:06:10 น.' },
    { id: 7, username: 'admin@stayverse.com', action: 'view Html Page', date: '28 พ.ค. 2569 เวลา 14:06:04 น.' },
    { id: 8, username: 'admin@stayverse.com', action: 'view Html Page', date: '28 พ.ค. 2569 เวลา 14:05:58 น.' },
    { id: 9, username: 'admin@stayverse.com', action: 'view page edit Html Page privacy || 1', date: '28 พ.ค. 2569 เวลา 14:05:54 น.' },
    { id: 10, username: 'admin@stayverse.com', action: 'view Html Page', date: '28 พ.ค. 2569 เวลา 14:05:52 น.' },
  ];

  return (
    <AdminShell activeItem="activityLog" role={role}>
      <div className="bg-[#f8f9fc] min-h-screen pb-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 py-4 bg-white border-b border-gray-100">
          <h1 className="text-xl font-bold text-gray-800 tracking-tight">
            Activity log
          </h1>
          <div className="text-[13px] text-[#0088ff] mt-2 sm:mt-0 flex items-center space-x-2 select-none">
            <span className="hover:underline cursor-pointer transition-colors" onClick={() => router.push(basePath)}>Home</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-500">Activity log</span>
          </div>
        </div>

        <div className="p-4 md:p-6">
          <div className="bg-white border border-gray-200 shadow-sm overflow-hidden rounded">
            
            {/* Search Tools Row */}
            <div className="p-4 border-b border-gray-200 flex justify-end">
              <div className="flex items-center gap-2 text-[13px]">
                <input 
                  type="text" 
                  placeholder="เลือกวันที่ที่ต้องการค้นหา" 
                  className="border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:border-[#6F42C1] w-48 text-gray-700 placeholder-gray-400"
                />
                <select className="border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:border-[#6F42C1] bg-white text-gray-700 w-24">
                  <option>ADMIN</option>
                </select>
                <input 
                  type="text" 
                  placeholder="คำค้นหา" 
                  className="border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:border-[#6F42C1] w-48 text-gray-700 placeholder-gray-400"
                />
                <button className="bg-[#6F42C1] hover:bg-[#5A32A3] text-white px-4 py-1.5 rounded flex items-center gap-2 font-medium transition-colors">
                  <Search className="w-3.5 h-3.5" />
                  Search
                </button>
                <button className="bg-gray-100 border border-gray-200 hover:bg-gray-200 text-gray-700 px-4 py-1.5 rounded flex items-center gap-2 font-medium transition-colors">
                  <RefreshCcw className="w-3.5 h-3.5" />
                  Reset
                </button>
              </div>
            </div>

            {/* Top Pagination Row */}
            <div className="px-5 py-3 flex justify-between items-center">
              <span className="text-[13px] text-gray-700 font-medium">
                ค้นพบ <span className="font-bold">2,140</span> รายการ
              </span>
              <div className="flex items-center text-[12px] border border-gray-200 rounded overflow-hidden">
                <span className="px-2.5 py-1.5 text-gray-400 bg-white border-r border-gray-200">« First</span>
                <span className="px-2.5 py-1.5 text-[#0088ff] font-bold bg-white border-r border-gray-200 cursor-pointer">1</span>
                <span className="px-2.5 py-1.5 text-[#0088ff] hover:bg-gray-50 bg-white border-r border-gray-200 cursor-pointer">Next »</span>
                <span className="px-2.5 py-1.5 text-[#0088ff] hover:bg-gray-50 bg-white cursor-pointer">Last »</span>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto border-t border-b border-gray-200">
              <table className="w-full text-left text-[13px]">
                <thead>
                  <tr className="bg-white border-b border-gray-200">
                    <th className="py-3 px-6 font-bold text-gray-800">Username</th>
                    <th className="py-3 px-6 font-bold text-gray-800">Action</th>
                    <th className="py-3 px-6 font-bold text-gray-800 w-64">วันที่</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {mockLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50/50 transition-colors bg-white">
                      <td className="py-4 px-6 text-gray-700">
                        {log.username}
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        {log.action}
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        {log.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bottom Pagination Row */}
            <div className="px-5 py-4 flex justify-end items-center bg-gray-50/50">
              <div className="flex items-center text-[12px] border border-gray-200 rounded overflow-hidden">
                <span className="px-2.5 py-1.5 text-gray-400 bg-white border-r border-gray-200">« First</span>
                <span className="px-2.5 py-1.5 text-[#0088ff] font-bold bg-white border-r border-gray-200 cursor-pointer">1</span>
                <span className="px-2.5 py-1.5 text-[#0088ff] hover:bg-gray-50 bg-white border-r border-gray-200 cursor-pointer">Next »</span>
                <span className="px-2.5 py-1.5 text-[#0088ff] hover:bg-gray-50 bg-white cursor-pointer">Last »</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </AdminShell>
  );
}
