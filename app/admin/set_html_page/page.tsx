'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AdminShell } from '../AdminShell';
import { Edit, FolderOpen } from 'lucide-react';
import { useTranslation } from '@/context/LanguageContext';

export default function SetHtmlPageList() {
  const router = useRouter();
  const { language } = useTranslation();
  const isTh = language === 'th';

  const mockPages = [
    { id: '1', name: 'CookiesConsent', status: 'ON' },
    { id: '2', name: 'how_to_post', status: 'ON' },
    { id: '3', name: 'agreement', status: 'ON' },
    { id: '4', name: 'privacy', status: 'ON' },
  ];

  return (
    <AdminShell activeItem="set_html_page">
      <div className="bg-[#f8f9fc] min-h-screen pb-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 py-4 bg-white border-b border-gray-100">
          <h1 className="text-xl font-bold text-gray-800 tracking-tight">
            {isTh ? 'ข้อบังคับและข้อตกลง' : 'Regulations and Agreements'}
          </h1>
          <div className="text-[13px] text-[#0088ff] mt-2 sm:mt-0 flex items-center space-x-2 select-none">
            <span className="hover:underline cursor-pointer transition-colors" onClick={() => router.push('/admin')}>Home</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-500">{isTh ? 'ข้อบังคับและข้อตกลง' : 'Regulations and Agreements'}</span>
          </div>
        </div>

        <div className="p-6">
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            
            {/* Top Pagination */}
            <div className="px-5 py-3 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
              <span className="text-[13px] text-gray-700 font-medium">
                {isTh ? 'ค้นพบ' : 'Found'} <span className="font-bold">5</span> {isTh ? 'รายการ' : 'items'}
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
                    <th className="py-3 px-6 font-bold text-gray-700">Page Name</th>
                    <th className="py-3 px-6 font-bold text-gray-700 text-center w-32">Status</th>
                    <th className="py-3 px-6 font-bold text-gray-700 text-center w-32">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {mockPages.map((page) => (
                    <tr key={page.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="py-4 px-6 align-middle text-gray-700 font-medium">
                        {page.name}
                      </td>
                      <td className="py-4 px-6 align-middle text-center">
                        <span className="text-[12px] font-bold text-[#2ecc71]">
                          {page.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 align-middle text-center">
                        <div className="flex items-center justify-center gap-2 text-gray-500">
                          <button className="hover:text-gray-700 transition-colors" title="Folder"><FolderOpen className="w-4 h-4" /></button>
                          <button onClick={() => router.push(`/admin/set_html_page/edit?id=${page.id}`)} className="hover:text-amber-500 transition-colors" title="Edit"><Edit className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bottom Pagination */}
            <div className="px-5 py-3 border-t border-gray-200 flex justify-end items-center bg-gray-50/50">
              <div className="flex items-center gap-1 text-[12px] border border-gray-200 rounded overflow-hidden">
                <span className="px-3 py-1.5 text-gray-400 bg-white border-r border-gray-200">« First</span>
                <span className="px-3 py-1.5 text-[#0088ff] bg-blue-50 font-medium border-r border-gray-200">1</span>
                <span className="px-3 py-1.5 text-gray-600 hover:bg-gray-50 bg-white cursor-pointer transition-colors">Last »</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </AdminShell>
  );
}
