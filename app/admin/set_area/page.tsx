'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminShell } from '../AdminShell';
import { Plus, Trash2, Search, Edit, FolderOpen, RefreshCcw } from 'lucide-react';
import { useTranslation } from '@/context/LanguageContext';

interface AreaItem {
  id: string;
  nameTh: string;
  nameEn: string;
  provinceTh: string;
  provinceEn: string;
  sort: number;
  status: boolean;
}

export default function SetAreaPage() {
  const router = useRouter();
  const { language } = useTranslation();
  const isTh = language === 'th';

  const [areas, setAreas] = useState<AreaItem[]>([]);
  
  const initialAreas: AreaItem[] = [
    { id: '1', nameTh: 'เลย', nameEn: 'Loei', provinceTh: 'เลย', provinceEn: 'Loei', sort: 999, status: true },
    { id: '2', nameTh: 'พะเยา', nameEn: 'Phayao', provinceTh: 'พะเยา', provinceEn: 'Phayao', sort: 999, status: true },
    { id: '3', nameTh: 'เชียงราย', nameEn: 'Chiang Rai', provinceTh: 'เชียงราย', provinceEn: 'Chiang Rai', sort: 999, status: true },
    { id: '4', nameTh: 'ยโสธร', nameEn: 'Yasothon', provinceTh: 'ยโสธร', provinceEn: 'Yasothon', sort: 999, status: true },
    { id: '5', nameTh: 'แม่ฮ่องสอน', nameEn: 'Mae Hong Son', provinceTh: 'แม่ฮ่องสอน', provinceEn: 'Mae Hong Son', sort: 999, status: true },
    { id: '6', nameTh: 'ร้อยเอ็ด', nameEn: 'Roi Et', provinceTh: 'ร้อยเอ็ด', provinceEn: 'Roi Et', sort: 999, status: true },
    { id: '7', nameTh: 'กาฬสินธุ์', nameEn: 'Kalasin', provinceTh: 'กาฬสินธุ์', provinceEn: 'Kalasin', sort: 999, status: true },
    { id: '8', nameTh: 'อุตรดิตถ์', nameEn: 'Uttaradit', provinceTh: 'อุตรดิตถ์', provinceEn: 'Uttaradit', sort: 999, status: true },
    { id: '9', nameTh: 'มหาสารคาม', nameEn: 'Maha Sarakham', provinceTh: 'มหาสารคาม', provinceEn: 'Maha Sarakham', sort: 999, status: true },
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('stayverse_set_areas_v2');
      if (stored) {
        setAreas(JSON.parse(stored));
      } else {
        localStorage.setItem('stayverse_set_areas_v2', JSON.stringify(initialAreas));
        setAreas(initialAreas);
      }
    }
  }, []);

  const handleDeleteArea = (id: string) => {
    if (confirm(isTh ? 'คุณแน่ใจหรือไม่ว่าต้องการลบพื้นที่นี้?' : 'Are you sure you want to delete this area?')) {
      const updated = areas.filter(a => a.id !== id);
      setAreas(updated);
      localStorage.setItem('stayverse_set_areas_v2', JSON.stringify(updated));
    }
  };

  return (
    <AdminShell activeItem="set_area">
      <div className="bg-white min-h-screen">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 py-4 border-b border-gray-100">
          <h1 className="text-xl font-bold text-gray-800 tracking-tight">
            {isTh ? 'พื้นที่' : 'Areas'}
          </h1>
          <div className="text-[13px] text-gray-400 mt-2 sm:mt-0 flex items-center space-x-2 select-none">
            <span className="hover:text-blue-500 cursor-pointer transition-colors" onClick={() => router.push('/admin')}>Home</span>
            <span>/</span>
            <span className="text-blue-500">{isTh ? 'พื้นที่' : 'Areas'}</span>
          </div>
        </div>

        <div className="p-6">
          {/* Top Actions */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4 gap-4">
            <button 
              onClick={() => router.push('/admin/set_area/new')}
              className="bg-[#6F42C1] hover:bg-[#5A32A3] text-white px-4 py-2 rounded-md flex items-center gap-1.5 text-[13px] font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              {isTh ? 'Add new' : 'Add new'}
            </button>
            
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              <div className="flex items-center border border-gray-200 rounded-md overflow-hidden bg-white h-9">
                <span className="px-3 py-1.5 bg-gray-50 text-gray-600 text-[13px] border-r border-gray-200 h-full flex items-center">Status -</span>
                <select className="px-3 py-1.5 text-[13px] text-gray-600 focus:outline-none bg-transparent h-full">
                  <option value="all">ทั้งหมด</option>
                  <option value="on">ON</option>
                  <option value="off">OFF</option>
                </select>
              </div>
              <input 
                type="text" 
                placeholder={isTh ? 'คำค้นหา' : 'Search keyword'} 
                className="border border-gray-200 px-3 py-1.5 rounded-md text-[13px] focus:outline-none focus:ring-1 focus:ring-[#6F42C1] min-w-[200px] h-9"
              />
              <button className="bg-[#6F42C1] hover:bg-[#5A32A3] text-white px-4 py-1.5 rounded-md flex items-center gap-1.5 text-[13px] font-medium transition-colors h-9">
                <Search className="w-4 h-4" />
                {isTh ? 'Search' : 'Search'}
              </button>
              <button className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-1.5 rounded-md flex items-center gap-1.5 text-[13px] font-medium transition-colors border border-gray-200 h-9">
                <RefreshCcw className="w-3.5 h-3.5" />
                {isTh ? 'Reset' : 'Reset'}
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
            {/* Table Header Info */}
            <div className="bg-gray-50/50 px-4 py-3 border-b border-gray-200 flex justify-between items-center text-[13px]">
              <span className="font-bold text-gray-700">{isTh ? `ค้นพบ ${areas.length} รายการ` : `Found ${areas.length} items`}</span>
              <div className="flex items-center gap-1 text-[13px]">
                <span className="px-2 py-1 text-gray-400">« First</span>
                <span className="px-2 py-1 text-[#6F42C1] hover:bg-purple-50 rounded cursor-pointer">1</span>
                <span className="px-2 py-1 text-[#6F42C1] hover:bg-purple-50 rounded cursor-pointer">2</span>
                <span className="px-2 py-1 text-[#6F42C1] hover:bg-purple-50 rounded cursor-pointer">3</span>
                <span className="px-2 py-1 text-[#6F42C1] hover:bg-purple-50 rounded cursor-pointer">4</span>
                <span className="px-2 py-1 text-[#6F42C1] hover:bg-purple-50 rounded cursor-pointer">5</span>
                <span className="px-2 py-1 text-[#6F42C1] hover:bg-purple-50 rounded cursor-pointer">Next ›</span>
                <span className="px-2 py-1 text-[#6F42C1] hover:bg-purple-50 rounded cursor-pointer">Last »</span>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px]">
                <thead>
                  <tr className="bg-white text-gray-800 border-b border-gray-200">
                    <th className="py-3 px-4 w-12 text-center">
                      <input type="checkbox" className="rounded border-gray-300 text-[#6F42C1] focus:ring-[#6F42C1]" />
                    </th>
                    <th className="py-3 px-4 font-bold border-b-2 border-transparent hover:border-gray-300 cursor-pointer whitespace-nowrap">
                      {isTh ? 'ชื่อพื้นที่ชั้น [TH]' : 'Area Name [TH]'}
                    </th>
                    <th className="py-3 px-4 font-bold border-b-2 border-transparent hover:border-gray-300 cursor-pointer whitespace-nowrap">
                      {isTh ? 'ชื่อพื้นที่ชั้น [EN]' : 'Area Name [EN]'}
                    </th>
                    <th className="py-3 px-4 font-bold border-b-2 border-transparent hover:border-gray-300 cursor-pointer whitespace-nowrap">
                      {isTh ? 'ชื่อพื้นที่ [TH]' : 'Province Name [TH]'}
                    </th>
                    <th className="py-3 px-4 font-bold border-b-2 border-transparent hover:border-gray-300 cursor-pointer whitespace-nowrap">
                      {isTh ? 'ชื่อพื้นที่ [EN]' : 'Province Name [EN]'}
                    </th>
                    <th className="py-3 px-4 font-bold border-b-2 border-transparent hover:border-gray-300 cursor-pointer w-24 whitespace-nowrap">Sort ▾</th>
                    <th className="py-3 px-4 font-bold border-b-2 border-transparent hover:border-gray-300 cursor-pointer w-20 text-center whitespace-nowrap">Status</th>
                    <th className="py-3 px-4 font-bold w-28 text-center whitespace-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {areas.map((a) => (
                    <tr key={a.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-2.5 px-4 text-center">
                        <input type="checkbox" className="rounded border-gray-300 text-[#6F42C1] focus:ring-[#6F42C1]" />
                      </td>
                      <td className="py-2.5 px-4 text-gray-600">{a.nameTh}...</td>
                      <td className="py-2.5 px-4 text-gray-600">{a.nameEn}...</td>
                      <td className="py-2.5 px-4 text-gray-600">{a.provinceTh}...</td>
                      <td className="py-2.5 px-4 text-gray-600">{a.provinceEn}...</td>
                      <td className="py-2.5 px-4">
                        <input 
                          type="text" 
                          defaultValue={a.sort} 
                          className="w-14 px-2 py-1 text-center border border-gray-300 rounded text-xs focus:outline-none focus:border-[#6F42C1]"
                        />
                      </td>
                      <td className="py-2.5 px-4 text-center">
                        <span className={`text-[11px] font-bold ${a.status ? 'text-green-500' : 'text-red-500'}`}>
                          {a.status ? 'ON' : 'OFF'}
                        </span>
                      </td>
                      <td className="py-2.5 px-4">
                        <div className="flex items-center justify-center gap-3">
                          <button className="text-gray-400 hover:text-gray-600 transition-colors">
                            <FolderOpen className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => router.push(`/admin/set_area/edit?id=${a.id}`)}
                            className="text-gray-400 hover:text-blue-500 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteArea(a.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bottom Actions */}
            <div className="bg-gray-50/50 px-4 py-3 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <button className="bg-[#007BFF] hover:bg-[#0069D9] text-white px-4 py-1.5 rounded-md text-[13px] font-medium transition-colors">
                  Select all
                </button>
                <button className="bg-[#007BFF] hover:bg-[#0069D9] text-white px-4 py-1.5 rounded-md text-[13px] font-medium transition-colors">
                  Delete
                </button>
                <button className="bg-[#007BFF] hover:bg-[#0069D9] text-white px-4 py-1.5 rounded-md text-[13px] font-medium transition-colors">
                  Sort
                </button>
              </div>
              <div className="flex items-center gap-1 text-[13px]">
                <span className="px-2 py-1 text-gray-400">« First</span>
                <span className="px-2 py-1 text-[#6F42C1] hover:bg-purple-50 rounded cursor-pointer">1</span>
                <span className="px-2 py-1 text-[#6F42C1] hover:bg-purple-50 rounded cursor-pointer">2</span>
                <span className="px-2 py-1 text-[#6F42C1] hover:bg-purple-50 rounded cursor-pointer">3</span>
                <span className="px-2 py-1 text-[#6F42C1] hover:bg-purple-50 rounded cursor-pointer">4</span>
                <span className="px-2 py-1 text-[#6F42C1] hover:bg-purple-50 rounded cursor-pointer">5</span>
                <span className="px-2 py-1 text-[#6F42C1] hover:bg-purple-50 rounded cursor-pointer">Next ›</span>
                <span className="px-2 py-1 text-[#6F42C1] hover:bg-purple-50 rounded cursor-pointer">Last »</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
