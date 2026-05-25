'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminShell } from '../../AdminShell';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from '@/context/LanguageContext';

export default function SetAreaNewPage() {
  const router = useRouter();
  const { language } = useTranslation();
  const isTh = language === 'th';

  const [formData, setFormData] = useState({
    areaNameTh: '',
    areaNameEn: '',
    locationNameTh: '',
    locationNameEn: '',
    latitude: '',
    longitude: '',
    view: '',
    sort: '',
    featured: false,
    status: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
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
    // Simulate save logic here
    console.log('Saved data:', formData);
    router.push('/admin/set_area');
  };

  const currentDateTime = '2026-05-22 08:53:49';

  return (
    <AdminShell activeItem="set_area">
      <div className="bg-white min-h-screen pb-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 py-4 border-b border-gray-100">
          <h1 className="text-xl font-bold text-gray-800 tracking-tight">
            {isTh ? 'พื้นที่ > เพิ่ม' : 'Areas > Add'}
          </h1>
          <div className="text-[13px] text-gray-400 mt-2 sm:mt-0 flex items-center space-x-2 select-none">
            <span className="hover:text-blue-500 cursor-pointer transition-colors" onClick={() => router.push('/admin')}>Home</span>
            <span>/</span>
            <span className="hover:text-blue-500 cursor-pointer transition-colors" onClick={() => router.push('/admin/set_area')}>{isTh ? 'พื้นที่' : 'Areas'}</span>
            <span>/</span>
            <span className="text-blue-500">{isTh ? 'เพิ่ม' : 'Add'}</span>
          </div>
        </div>

        <div className="p-6">
          {/* Back Button */}
          <div className="mb-6">
            <button 
              onClick={() => router.push('/admin/set_area')}
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
                  {/* Area Name TH */}
                  <div className="md:col-span-3 flex items-center">
                    <label className="text-[13px] font-bold text-gray-700">
                      {isTh ? 'ชื่อพื้นที่ [TH]' : 'Area Name [TH]'}
                    </label>
                  </div>
                  <div className="md:col-span-6">
                    <input 
                      type="text" 
                      name="areaNameTh"
                      placeholder={isTh ? 'ชื่อพื้นที่ [TH]' : 'Area Name [TH]'}
                      value={formData.areaNameTh}
                      onChange={handleChange}
                      className="w-full border border-gray-200 px-3 py-2 rounded-md text-[13px] focus:outline-none focus:ring-1 focus:ring-[#6F42C1]"
                    />
                  </div>
                  <div className="md:col-span-3"></div>

                  {/* Area Name EN */}
                  <div className="md:col-span-3 flex items-center">
                    <label className="text-[13px] font-bold text-gray-700">
                      {isTh ? 'ชื่อพื้นที่ [EN]' : 'Area Name [EN]'}
                    </label>
                  </div>
                  <div className="md:col-span-6">
                    <input 
                      type="text" 
                      name="areaNameEn"
                      placeholder={isTh ? 'ชื่อพื้นที่ [EN]' : 'Area Name [EN]'}
                      value={formData.areaNameEn}
                      onChange={handleChange}
                      className="w-full border border-gray-200 px-3 py-2 rounded-md text-[13px] focus:outline-none focus:ring-1 focus:ring-[#6F42C1]"
                    />
                  </div>
                  <div className="md:col-span-3 flex items-center">
                    <button type="button" className="bg-[#6F42C1] hover:bg-[#5A32A3] text-white px-4 py-1.5 rounded-md text-[13px] font-medium transition-colors">
                      {isTh ? 'แปล' : 'Translate'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Block 2 */}
              <div className="border-b border-gray-100 pb-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-y-4 gap-x-6">
                  {/* Location Name TH */}
                  <div className="md:col-span-3 flex items-center">
                    <label className="text-[13px] font-bold text-gray-700">
                      {isTh ? 'ชื่อพื้นที่ตั้ง [TH]' : 'Location Name [TH]'}
                    </label>
                  </div>
                  <div className="md:col-span-6 lg:col-span-4">
                    <input 
                      type="text" 
                      name="locationNameTh"
                      placeholder={isTh ? 'ชื่อพื้นที่ตั้ง [TH]' : 'Location Name [TH]'}
                      value={formData.locationNameTh}
                      onChange={handleChange}
                      className="w-full border border-gray-200 px-3 py-2 rounded-md text-[13px] focus:outline-none focus:ring-1 focus:ring-[#6F42C1]"
                    />
                  </div>
                  <div className="md:col-span-3 lg:col-span-5"></div>

                  {/* Location Name EN */}
                  <div className="md:col-span-3 flex items-center">
                    <label className="text-[13px] font-bold text-gray-700">
                      {isTh ? 'ชื่อพื้นที่ตั้ง [EN]' : 'Location Name [EN]'}
                    </label>
                  </div>
                  <div className="md:col-span-6 lg:col-span-4">
                    <input 
                      type="text" 
                      name="locationNameEn"
                      placeholder={isTh ? 'ชื่อพื้นที่ตั้ง [EN]' : 'Location Name [EN]'}
                      value={formData.locationNameEn}
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
                      placeholder="Latitude"
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
                      placeholder="Longitude"
                      value={formData.longitude}
                      onChange={handleChange}
                      className="w-full border border-gray-200 px-3 py-2 rounded-md text-[13px] focus:outline-none focus:ring-1 focus:ring-[#6F42C1]"
                    />
                  </div>
                  <div className="md:col-span-3 lg:col-span-5"></div>

                  {/* View */}
                  <div className="md:col-span-3 flex items-center">
                    <label className="text-[13px] font-bold text-gray-700">
                      View
                    </label>
                  </div>
                  <div className="md:col-span-6 lg:col-span-4">
                    <input 
                      type="text" 
                      name="view"
                      placeholder="View"
                      value={formData.view}
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
                      placeholder={isTh ? 'เรียงลำดับ' : 'Sort'}
                      value={formData.sort}
                      onChange={handleChange}
                      className="w-full border border-gray-200 px-3 py-2 rounded-md text-[13px] focus:outline-none focus:ring-1 focus:ring-[#6F42C1]"
                    />
                  </div>
                  <div className="md:col-span-3 lg:col-span-5"></div>
                </div>
              </div>

              {/* Block 3 */}
              <div className="border-b border-gray-100 pb-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-y-6 gap-x-6">
                  {/* Featured */}
                  <div className="md:col-span-3 flex items-start pt-1">
                    <label className="text-[13px] font-bold text-gray-700">
                      Featured
                    </label>
                  </div>
                  <div className="md:col-span-9">
                    <div className="flex flex-col gap-3">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="featured" 
                          checked={formData.featured === true}
                          onChange={() => handleRadioChange('featured', true)}
                          className="w-3.5 h-3.5 text-[#6F42C1] focus:ring-[#6F42C1] border-gray-300"
                        />
                        <span className="text-[13px] font-bold text-green-500">ON</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="featured" 
                          checked={formData.featured === false}
                          onChange={() => handleRadioChange('featured', false)}
                          className="w-3.5 h-3.5 text-[#6F42C1] focus:ring-[#6F42C1] border-gray-300"
                        />
                        <span className="text-[13px] font-bold text-[#6F42C1]">OFF</span>
                      </label>
                    </div>
                  </div>

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

              {/* Block 4 */}
              <div className="pb-6 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-y-4 gap-x-6">
                  {/* Created Date */}
                  <div className="md:col-span-3 flex items-center">
                    <label className="text-[13px] font-bold text-gray-700">
                      {isTh ? 'วันที่สร้าง' : 'Created Date'}
                    </label>
                  </div>
                  <div className="md:col-span-9 flex items-center">
                    <span className="text-[13px] text-gray-600">{currentDateTime}</span>
                  </div>

                  {/* Last Modified */}
                  <div className="md:col-span-3 flex items-center">
                    <label className="text-[13px] font-bold text-gray-700">
                      {isTh ? 'วันที่แก้ไขล่าสุด' : 'Last Modified'}
                    </label>
                  </div>
                  <div className="md:col-span-9 flex items-center">
                    <span className="text-[13px] text-gray-600">{currentDateTime}</span>
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
                {isTh ? 'Add new' : 'Add new'}
              </button>
              <button 
                type="button"
                onClick={() => setFormData({
                  areaNameTh: '', areaNameEn: '', locationNameTh: '', locationNameEn: '',
                  latitude: '', longitude: '', view: '', sort: '', featured: false, status: false
                })}
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
