'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminShell } from '../AdminShell';
import { Plus, Trash2, Search, Edit, FolderOpen, RefreshCcw } from 'lucide-react';
import { useTranslation } from '@/context/LanguageContext';

interface StationItem {
  id: string;
  nameTh: string;
  nameEn: string;
  sort: number;
  status: boolean;
}

export default function SetStationPage() {
  const router = useRouter();
  const { language } = useTranslation();
  const isTh = language === 'th';

  const [stations, setStations] = useState<StationItem[]>([]);
  
  const initialStations: StationItem[] = [
    { id: '1', nameTh: 'MRT สายสีน้ำเงิน', nameEn: 'MRT blue line', sort: 0, status: true },
    { id: '2', nameTh: 'BTS สายหลัก', nameEn: 'BTS', sort: 0, status: true },
    { id: '3', nameTh: 'Airport link', nameEn: 'Airport link', sort: 0, status: true },
    { id: '4', nameTh: 'MRT สายสีม่วง', nameEn: 'MRT purple line', sort: 0, status: true },
    { id: '5', nameTh: 'รถ BRT', nameEn: 'BRT bus', sort: 0, status: true },
    { id: '6', nameTh: 'สถานศึกษา', nameEn: 'Education', sort: 0, status: true },
    { id: '7', nameTh: 'สนามบิน', nameEn: 'Airport', sort: 0, status: true },
    { id: '8', nameTh: 'โรงพยาบาล', nameEn: 'Hospital', sort: 0, status: true },
    { id: '9', nameTh: 'ห้างสรรพสินค้า', nameEn: 'Shopping mall', sort: 0, status: true },
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('stayverse_set_stations_v2');
      if (stored) {
        setStations(JSON.parse(stored));
      } else {
        localStorage.setItem('stayverse_set_stations_v2', JSON.stringify(initialStations));
        setStations(initialStations);
      }
    }
  }, []);

  const handleDeleteStation = (id: string) => {
    if (confirm(isTh ? 'คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้?' : 'Are you sure you want to delete this item?')) {
      const updated = stations.filter(s => s.id !== id);
      setStations(updated);
      localStorage.setItem('stayverse_set_stations_v2', JSON.stringify(updated));
    }
  };

  return (
    <AdminShell activeItem="set_station">
      <div className="bg-white min-h-screen">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 py-4 border-b border-gray-100">
          <h1 className="text-xl font-bold text-gray-800 tracking-tight">
            {isTh ? 'สายรถไฟฟ้า' : 'Transit Lines'}
          </h1>
          <div className="text-[13px] text-gray-400 mt-2 sm:mt-0 flex items-center space-x-2 select-none">
            <span className="hover:text-blue-500 cursor-pointer transition-colors" onClick={() => router.push('/admin')}>Home</span>
            <span>/</span>
            <span className="text-blue-500">{isTh ? 'สายรถไฟฟ้า' : 'Transit Lines'}</span>
          </div>
        </div>

        <div className="p-6">
          {/* Top Actions */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4 gap-4">
            <button 
              onClick={() => router.push('/admin/set_station/new')}
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
              <span className="font-bold text-gray-700">{isTh ? `ค้นพบ ${stations.length} รายการ` : `Found ${stations.length} items`}</span>
              <div className="flex items-center gap-1 text-[13px]">
                <span className="px-2 py-1 text-gray-400">« First</span>
                <span className="px-2 py-1 text-[#6F42C1] hover:bg-purple-50 rounded cursor-pointer bg-purple-50 font-medium">1</span>
                <span className="px-2 py-1 text-gray-400 cursor-not-allowed">Last »</span>
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
                      {isTh ? 'ชื่อ [TH]' : 'Name [TH]'}
                    </th>
                    <th className="py-3 px-4 font-bold border-b-2 border-transparent hover:border-gray-300 cursor-pointer whitespace-nowrap">
                      {isTh ? 'ชื่อ [EN]' : 'Name [EN]'}
                    </th>
                    <th className="py-3 px-4 font-bold border-b-2 border-transparent hover:border-gray-300 cursor-pointer w-24 whitespace-nowrap">Sort ▾</th>
                    <th className="py-3 px-4 font-bold border-b-2 border-transparent hover:border-gray-300 cursor-pointer w-20 text-center whitespace-nowrap">Status</th>
                    <th className="py-3 px-4 font-bold w-28 text-center whitespace-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {stations.map((s) => (
                    <tr key={s.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-2.5 px-4 text-center">
                        <input type="checkbox" className="rounded border-gray-300 text-[#6F42C1] focus:ring-[#6F42C1]" />
                      </td>
                      <td className="py-2.5 px-4 text-gray-600">{s.nameTh}</td>
                      <td className="py-2.5 px-4 text-gray-600">{s.nameEn}</td>
                      <td className="py-2.5 px-4">
                        <input 
                          type="text" 
                          defaultValue={s.sort} 
                          className="w-14 px-2 py-1 text-center border border-gray-300 rounded text-xs focus:outline-none focus:border-[#6F42C1]"
                        />
                      </td>
                      <td className="py-2.5 px-4 text-center">
                        <span className={`text-[11px] font-bold ${s.status ? 'text-green-500' : 'text-red-500'}`}>
                          {s.status ? 'ON' : 'OFF'}
                        </span>
                      </td>
                      <td className="py-2.5 px-4">
                        <div className="flex items-center justify-center gap-3">
                          <button className="text-gray-400 hover:text-gray-600 transition-colors">
                            <FolderOpen className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => router.push(`/admin/set_station/edit?id=${s.id}`)}
                            className="text-gray-400 hover:text-blue-500 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteStation(s.id)}
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
                <span className="px-2 py-1 text-[#6F42C1] hover:bg-purple-50 rounded cursor-pointer bg-purple-50 font-medium">1</span>
                <span className="px-2 py-1 text-gray-400 cursor-not-allowed">Last »</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
