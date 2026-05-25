'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AdminShell } from '../../AdminShell';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from '@/context/LanguageContext';

function SetStationEditContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || searchParams.get('ids');

  const { language } = useTranslation();
  const isTh = language === 'th';

  const [formData, setFormData] = useState({
    line: 'BTS สายหลัก',
    stationTh: '',
    stationEn: '',
    latitude: '',
    longitude: '',
    sort: '',
    status: true,
  });

  // Mock fetching data based on ID
  useEffect(() => {
    if (id) {
      // In a real scenario, fetch data using the ID
      setFormData({
        line: 'BTS สายหลัก',
        stationTh: 'BTS สายลวด',
        stationEn: 'BTS Sai Luat',
        latitude: '13.577687',
        longitude: '100.605371',
        sort: '71',
        status: true,
      });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' || type === 'radio' ? checked : value
    }));
  };

  const handleRadioChange = (name: string, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updated data:', formData);
    router.push('/admin/set_station');
  };

  const createdDate = '2019-04-02 10:24:35';
  const lastModified = '2020-07-29 18:13:07';

  return (
    <AdminShell activeItem="set_station">
      <div className="bg-white min-h-screen pb-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 py-4 border-b border-gray-100">
          <h1 className="text-xl font-bold text-gray-800 tracking-tight">
            {isTh ? 'สถานีรถไฟฟ้า > แก้ไข' : 'Stations > Edit'}
          </h1>
          <div className="text-[13px] text-gray-400 mt-2 sm:mt-0 flex items-center space-x-2 select-none">
            <span className="hover:text-blue-500 cursor-pointer transition-colors" onClick={() => router.push('/admin')}>Home</span>
            <span>/</span>
            <span className="hover:text-blue-500 cursor-pointer transition-colors" onClick={() => router.push('/admin/set_station')}>{isTh ? 'สถานีรถไฟฟ้า' : 'Stations'}</span>
            <span>/</span>
            <span className="text-blue-500">{isTh ? 'แก้ไข' : 'Edit'}</span>
          </div>
        </div>

        <div className="p-6">
          {/* Back Button */}
          <div className="mb-6">
            <button 
              onClick={() => router.push('/admin/set_station')}
              className="bg-[#6F42C1] hover:bg-[#5A32A3] text-white px-4 py-2 rounded-md flex items-center gap-1.5 text-[13px] font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {isTh ? 'กลับ' : 'Back'}
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="max-w-5xl">
              {/* Block 1 */}
              <div className="border-b border-gray-100 pb-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-y-4 gap-x-6">
                  {/* ID */}
                  <div className="md:col-span-3 flex items-center">
                    <label className="text-[13px] font-bold text-gray-700">ID</label>
                  </div>
                  <div className="md:col-span-9 flex items-center">
                    <span className="text-[13px] text-gray-800">{id || '398'}</span>
                  </div>

                  {/* Train Line */}
                  <div className="md:col-span-3 flex items-center">
                    <label className="text-[13px] font-bold text-gray-700">
                      {isTh ? 'สายรถไฟฟ้า' : 'Transit Line'}
                    </label>
                  </div>
                  <div className="md:col-span-6 lg:col-span-6">
                    <select
                      name="line"
                      value={formData.line}
                      onChange={handleChange}
                      className="w-full border border-gray-200 px-3 py-2 rounded-md text-[13px] focus:outline-none focus:ring-1 focus:ring-[#6F42C1] bg-white"
                    >
                      <option value="MRT สายสีน้ำเงิน">MRT สายสีน้ำเงิน</option>
                      <option value="BTS สายหลัก">BTS สายหลัก</option>
                      <option value="Airport link">Airport link</option>
                      <option value="MRT สายสีม่วง">MRT สายสีม่วง</option>
                      <option value="รถ BRT">รถ BRT</option>
                    </select>
                  </div>
                  <div className="md:col-span-3 lg:col-span-3"></div>

                  {/* Station Name TH */}
                  <div className="md:col-span-3 flex items-center">
                    <label className="text-[13px] font-bold text-gray-700">
                      {isTh ? 'สถานี [TH]' : 'Station [TH]'}
                    </label>
                  </div>
                  <div className="md:col-span-6 lg:col-span-4">
                    <input 
                      type="text" 
                      name="stationTh"
                      value={formData.stationTh}
                      onChange={handleChange}
                      className="w-full border border-gray-200 px-3 py-2 rounded-md text-[13px] focus:outline-none focus:ring-1 focus:ring-[#6F42C1]"
                    />
                  </div>
                  <div className="md:col-span-3 lg:col-span-5"></div>

                  {/* Station Name EN */}
                  <div className="md:col-span-3 flex items-center">
                    <label className="text-[13px] font-bold text-gray-700">
                      {isTh ? 'สถานี [EN]' : 'Station [EN]'}
                    </label>
                  </div>
                  <div className="md:col-span-6 lg:col-span-4">
                    <input 
                      type="text" 
                      name="stationEn"
                      value={formData.stationEn}
                      onChange={handleChange}
                      className="w-full border border-gray-200 px-3 py-2 rounded-md text-[13px] focus:outline-none focus:ring-1 focus:ring-[#6F42C1]"
                    />
                  </div>
                  <div className="md:col-span-3 lg:col-span-5 flex items-center">
                    <button type="button" className="bg-[#6F42C1] hover:bg-[#5A32A3] text-white px-4 py-1.5 rounded-md text-[13px] font-medium transition-colors">
                      {isTh ? 'แปล' : 'Translate'}
                    </button>
                  </div>

                  {/* Latitude */}
                  <div className="md:col-span-3 flex items-center">
                    <label className="text-[13px] font-bold text-gray-700">
                      Latitude
                    </label>
                  </div>
                  <div className="md:col-span-6 lg:col-span-4">
                    <input 
                      type="text" 
                      name="latitude"
                      value={formData.latitude}
                      onChange={handleChange}
                      className="w-full border border-gray-200 px-3 py-2 rounded-md text-[13px] focus:outline-none focus:ring-1 focus:ring-[#6F42C1]"
                    />
                  </div>
                  <div className="md:col-span-3 lg:col-span-5"></div>

                  {/* Longitude */}
                  <div className="md:col-span-3 flex items-center">
                    <label className="text-[13px] font-bold text-gray-700">
                      Longitude
                    </label>
                  </div>
                  <div className="md:col-span-6 lg:col-span-4">
                    <input 
                      type="text" 
                      name="longitude"
                      value={formData.longitude}
                      onChange={handleChange}
                      className="w-full border border-gray-200 px-3 py-2 rounded-md text-[13px] focus:outline-none focus:ring-1 focus:ring-[#6F42C1]"
                    />
                  </div>
                  <div className="md:col-span-3 lg:col-span-5"></div>

                  {/* Sort */}
                  <div className="md:col-span-3 flex items-center">
                    <label className="text-[13px] font-bold text-gray-700">
                      {isTh ? 'เรียงลำดับ' : 'Sort'}
                    </label>
                  </div>
                  <div className="md:col-span-6 lg:col-span-4">
                    <input 
                      type="text" 
                      name="sort"
                      value={formData.sort}
                      onChange={handleChange}
                      className="w-full border border-gray-200 px-3 py-2 rounded-md text-[13px] focus:outline-none focus:ring-1 focus:ring-[#6F42C1]"
                    />
                  </div>
                  <div className="md:col-span-3 lg:col-span-5"></div>
                </div>
              </div>

              {/* Block 2 */}
              <div className="border-b border-gray-100 pb-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-y-6 gap-x-6">
                  {/* Status */}
                  <div className="md:col-span-3 flex items-start pt-1">
                    <label className="text-[13px] font-bold text-gray-700">
                      {isTh ? 'สถานะ' : 'Status'}
                    </label>
                  </div>
                  <div className="md:col-span-9">
                    <div className="flex flex-col gap-3">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="status" 
                          checked={formData.status === true}
                          onChange={() => handleRadioChange('status', true)}
                          className="w-3.5 h-3.5 text-[#6F42C1] focus:ring-[#6F42C1] border-gray-300"
                        />
                        <span className="text-[13px] font-bold text-green-500">ON</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="status" 
                          checked={formData.status === false}
                          onChange={() => handleRadioChange('status', false)}
                          className="w-3.5 h-3.5 text-[#6F42C1] focus:ring-[#6F42C1] border-gray-300"
                        />
                        <span className="text-[13px] font-bold text-[#6F42C1]">OFF</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Block 3 */}
              <div className="pb-6 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-y-4 gap-x-6">
                  {/* Created Date */}
                  <div className="md:col-span-3 flex items-center">
                    <label className="text-[13px] font-bold text-gray-700">
                      {isTh ? 'วันที่สร้าง' : 'Created Date'}
                    </label>
                  </div>
                  <div className="md:col-span-9 flex items-center">
                    <span className="text-[13px] text-gray-600">{createdDate}</span>
                  </div>

                  {/* Last Modified */}
                  <div className="md:col-span-3 flex items-center">
                    <label className="text-[13px] font-bold text-gray-700">
                      {isTh ? 'วันที่แก้ไขล่าสุด' : 'Last Modified'}
                    </label>
                  </div>
                  <div className="md:col-span-9 flex items-center">
                    <span className="text-[13px] text-gray-600">{lastModified}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="bg-gray-50/50 p-4 border-t border-gray-200 -mx-6 -mb-6 mt-6 flex gap-3 px-6">
              <button 
                type="submit"
                className="bg-[#6F42C1] hover:bg-[#5A32A3] text-white px-6 py-2 rounded-md text-[13px] font-medium transition-colors"
              >
                {isTh ? 'Update' : 'Update'}
              </button>
              <button 
                type="button"
                className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-6 py-2 rounded-md text-[13px] font-medium transition-colors"
              >
                {isTh ? 'Reset' : 'Reset'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminShell>
  );
}

export default function SetStationEditPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-[#f4f7f9] text-gray-800">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#CF7536]"></div>
      </div>
    }>
      <SetStationEditContent />
    </Suspense>
  );
}
