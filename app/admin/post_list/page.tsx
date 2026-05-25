'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AdminShell, generateMockListings, Listing } from '../AdminShell';
import { Plus, Download, Search, RefreshCcw, Filter, CheckCircle, XCircle, Edit, Trash2, FolderOpen, Eye, Image as ImageIcon } from 'lucide-react';
import { useTranslation } from '@/context/LanguageContext';

export default function PostListPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { language } = useTranslation();
  const isTh = language === 'th';

  const [listings, setListings] = useState<Listing[]>([]);
  const [activeTab, setActiveTab] = useState<string>('allListings');
  const [showFilters, setShowFilters] = useState<boolean>(true);

  const action = searchParams.get('action');
  const webStatus = searchParams.get('web_status');
  const searchAction = searchParams.get('search_action');

  useEffect(() => {
    // Basic mapping from query params to active tab
    if (action === 'reset') {
      setActiveTab('allListings');
    } else if (searchAction === 'search') {
      if (webStatus === '1') setActiveTab('onlineListings');
      else if (webStatus === '2') setActiveTab('draftListings');
      else if (webStatus === '0') setActiveTab('offlineListings');
      else if (webStatus === '3') setActiveTab('rejectListings');
      else if (webStatus === '51') setActiveTab('soldRentListings');
      else if (webStatus === '9') setActiveTab('expireListings');
      else setActiveTab('allListings');
    } else {
      setActiveTab('allListings');
    }
  }, [action, webStatus, searchAction]);

  useEffect(() => {
    setListings(generateMockListings());
  }, []);

  const counts = {
    all: listings.length,
    online: listings.filter(l => l.status === 'online').length,
    draft: listings.filter(l => l.status === 'draft').length,
    offline: listings.filter(l => l.status === 'offline').length,
    reject: listings.filter(l => l.status === 'reject').length,
    soldRent: listings.filter(l => l.status === 'soldRent').length,
    expire: listings.filter(l => l.status === 'expire').length,
  };

  const getStatusColor = (status: Listing['status']) => {
    switch (status) {
      case 'online': return 'text-[#6F42C1] bg-purple-50';
      case 'offline': return 'text-gray-500 bg-gray-50';
      case 'draft': return 'text-amber-500 bg-amber-50';
      case 'reject': return 'text-red-500 bg-red-50';
      case 'soldRent': return 'text-emerald-500 bg-emerald-50';
      case 'expire': return 'text-gray-800 bg-gray-100';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  const getStatusLabel = (status: Listing['status']) => {
    switch (status) {
      case 'online': return 'ON';
      case 'offline': return 'OFF';
      case 'draft': return 'DRAFT';
      case 'reject': return 'REJECT';
      case 'soldRent': return 'SOLD/RENT';
      case 'expire': return 'EXPIRE';
      default: return status.toUpperCase();
    }
  };

  const handleTabClick = (tabId: string) => {
    const mapping: Record<string, string> = {
      allListings: '?action=reset',
      onlineListings: '?search_action=search&web_status=1',
      draftListings: '?search_action=search&web_status=2',
      offlineListings: '?search_action=search&web_status=0',
      rejectListings: '?search_action=search&web_status=3',
      soldRentListings: '?search_action=search&web_status=51',
      expireListings: '?search_action=search&web_status=9'
    };
    router.push(`/admin/post_list${mapping[tabId]}`);
  };

  // Status mapping for dropdown
  const statusValue = webStatus || '';

  return (
    <AdminShell activeItem={activeTab}>
      <div className="bg-[#f8f9fc] min-h-screen">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 py-4 bg-white border-b border-gray-100">
          <h1 className="text-xl font-bold text-gray-800 tracking-tight">
            {isTh ? 'ข้อมูลประกาศ' : 'Listing Information'}
          </h1>
          <div className="text-[13px] text-gray-400 mt-2 sm:mt-0 flex items-center space-x-2 select-none">
            <span className="hover:text-[#6F42C1] cursor-pointer transition-colors" onClick={() => router.push('/admin')}>Home</span>
            <span>/</span>
            <span className="text-[#6F42C1]">{isTh ? 'ข้อมูลประกาศ' : 'Listing Information'}</span>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Top Status Tabs & Action Buttons */}
          <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <button 
                onClick={() => handleTabClick('onlineListings')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full border ${activeTab === 'onlineListings' ? 'border-[#6F42C1] bg-purple-50' : 'border-gray-300 bg-white hover:border-[#6F42C1]'} transition-colors`}
              >
                <CheckCircle className={`w-4 h-4 ${activeTab === 'onlineListings' ? 'text-[#6F42C1]' : 'text-[#6F42C1]'}`} />
                <span className={`text-[13px] font-medium ${activeTab === 'onlineListings' ? 'text-[#6F42C1]' : 'text-gray-700'}`}>Online</span>
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">{counts.online}</span>
              </button>

              <button 
                onClick={() => handleTabClick('offlineListings')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full border ${activeTab === 'offlineListings' ? 'border-gray-800 bg-gray-100' : 'border-gray-300 bg-white hover:border-gray-800'} transition-colors`}
              >
                <XCircle className="w-4 h-4 text-gray-800" />
                <span className={`text-[13px] font-medium ${activeTab === 'offlineListings' ? 'text-gray-800' : 'text-gray-700'}`}>Offline</span>
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">{counts.offline}</span>
              </button>

              <button 
                onClick={() => handleTabClick('draftListings')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full border ${activeTab === 'draftListings' ? 'border-amber-500 bg-amber-50' : 'border-amber-300 bg-white hover:border-amber-500'} transition-colors`}
              >
                <Edit className="w-4 h-4 text-amber-500" />
                <span className={`text-[13px] font-medium ${activeTab === 'draftListings' ? 'text-amber-500' : 'text-gray-700'}`}>Draft</span>
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">{counts.draft}</span>
              </button>

              <button 
                onClick={() => handleTabClick('rejectListings')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full border ${activeTab === 'rejectListings' ? 'border-red-500 bg-red-50' : 'border-red-300 bg-white hover:border-red-500'} transition-colors`}
              >
                <XCircle className="w-4 h-4 text-red-500" />
                <span className={`text-[13px] font-medium ${activeTab === 'rejectListings' ? 'text-red-500' : 'text-gray-700'}`}>Reject</span>
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">{counts.reject}</span>
              </button>

              <button 
                onClick={() => handleTabClick('soldRentListings')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full border ${activeTab === 'soldRentListings' ? 'border-emerald-500 bg-emerald-50' : 'border-emerald-300 bg-white hover:border-emerald-500'} transition-colors`}
              >
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span className={`text-[13px] font-medium ${activeTab === 'soldRentListings' ? 'text-emerald-500' : 'text-gray-700'}`}>Sold/Rent</span>
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">{counts.soldRent}</span>
              </button>

              <button 
                onClick={() => handleTabClick('expireListings')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full border ${activeTab === 'expireListings' ? 'border-gray-800 bg-gray-100' : 'border-gray-300 bg-white hover:border-gray-800'} transition-colors`}
              >
                <XCircle className="w-4 h-4 text-gray-800" />
                <span className={`text-[13px] font-medium ${activeTab === 'expireListings' ? 'text-gray-800' : 'text-gray-700'}`}>Expire</span>
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">{counts.expire}</span>
              </button>
            </div>

            <div className="flex items-center gap-3 w-full xl:w-auto">
              <button className="bg-[#6F42C1] hover:bg-[#5A32A3] text-white px-5 py-2 rounded-md flex items-center justify-center gap-2 text-[13px] font-medium transition-colors whitespace-nowrap">
                <Plus className="w-4 h-4" />
                {isTh ? 'Add new' : 'Add new'}
              </button>
              <button className="bg-[#F39C12] hover:bg-[#D68910] text-white px-5 py-2 rounded-md flex items-center justify-center gap-2 text-[13px] font-medium transition-colors whitespace-nowrap">
                <Download className="w-4 h-4" />
                {isTh ? 'Export' : 'Export'}
              </button>
            </div>
          </div>

          {/* Search and Filters Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex-1">
                <input 
                  type="text" 
                  placeholder="Keyword here" 
                  className="w-full border border-gray-300 px-4 py-2 rounded-md text-[13px] focus:outline-none focus:border-[#6F42C1]"
                />
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className={`px-5 py-2 rounded-md flex items-center gap-2 text-[13px] font-medium transition-colors ${showFilters ? 'bg-gray-200 text-gray-800' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                >
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
                <button className="bg-[#6F42C1] hover:bg-[#5A32A3] text-white px-6 py-2 rounded-md flex items-center gap-2 text-[13px] font-medium transition-colors">
                  <Search className="w-4 h-4" />
                  Search
                </button>
                <button 
                  onClick={() => handleTabClick('allListings')}
                  className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2 rounded-md flex items-center gap-2 text-[13px] font-medium transition-colors"
                >
                  <RefreshCcw className="w-4 h-4" />
                  Reset
                </button>
              </div>
            </div>

            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-5">
                {/* โครงการ */}
                <div className="space-y-1.5">
                  <label className="text-[12px] font-medium text-gray-600">{isTh ? 'โครงการ' : 'Project'}</label>
                  <select className="w-full border border-gray-300 px-3 py-2 rounded-md text-[13px] focus:outline-none focus:border-[#6F42C1] bg-white text-gray-700">
                    <option>เลือกโครงการ</option>
                  </select>
                </div>
                {/* ประเภทอสังหา */}
                <div className="space-y-1.5">
                  <label className="text-[12px] font-medium text-gray-600">{isTh ? 'ประเภทอสังหา' : 'Property Type'}</label>
                  <select className="w-full border border-gray-300 px-3 py-2 rounded-md text-[13px] focus:outline-none focus:border-[#6F42C1] bg-white text-gray-700">
                    <option>ประเภทอสังหา</option>
                  </select>
                </div>
                {/* ทำเล */}
                <div className="space-y-1.5">
                  <label className="text-[12px] font-medium text-gray-600">{isTh ? 'ทำเล' : 'Location'}</label>
                  <select className="w-full border border-gray-300 px-3 py-2 rounded-md text-[13px] focus:outline-none focus:border-[#6F42C1] bg-white text-gray-700">
                    <option>ทำเล</option>
                  </select>
                </div>
                {/* MRT/BTS */}
                <div className="space-y-1.5">
                  <label className="text-[12px] font-medium text-gray-600">MRT/BTS</label>
                  <select className="w-full border border-gray-300 px-3 py-2 rounded-md text-[13px] focus:outline-none focus:border-[#6F42C1] bg-white text-gray-700">
                    <option>MRT/BTS (All)</option>
                  </select>
                </div>
                
                {/* ช่วงราคา */}
                <div className="space-y-1.5">
                  <label className="text-[12px] font-medium text-gray-600">{isTh ? 'ช่วงราคา' : 'Price Range'}</label>
                  <div className="flex items-center gap-2">
                    <input type="text" placeholder={isTh ? 'ราคาต่ำสุด' : 'Min Price'} className="w-full border border-gray-300 px-3 py-2 rounded-md text-[13px] focus:outline-none focus:border-[#6F42C1]" />
                    <input type="text" placeholder={isTh ? 'ราคาสูงสุด' : 'Max Price'} className="w-full border border-gray-300 px-3 py-2 rounded-md text-[13px] focus:outline-none focus:border-[#6F42C1]" />
                  </div>
                </div>
                {/* สถานะ */}
                <div className="space-y-1.5">
                  <label className="text-[12px] font-medium text-gray-600">{isTh ? 'สถานะ' : 'Status'}</label>
                  <select 
                    value={statusValue}
                    onChange={(e) => {
                      const val = e.target.value;
                      const map: Record<string, string> = {
                        '': 'action=reset',
                        '1': 'search_action=search&web_status=1',
                        '0': 'search_action=search&web_status=0',
                        '2': 'search_action=search&web_status=2',
                        '3': 'search_action=search&web_status=3',
                        '51': 'search_action=search&web_status=51',
                        '9': 'search_action=search&web_status=9'
                      };
                      router.push(`/admin/post_list?${map[val]}`);
                    }}
                    className="w-full border border-gray-300 px-3 py-2 rounded-md text-[13px] focus:outline-none focus:border-[#6F42C1] bg-white text-gray-700"
                  >
                    <option value="">All (ทั้งหมด)</option>
                    <option value="1">Online (แสดง)</option>
                    <option value="0">Offline (ออฟไลน์)</option>
                    <option value="2">Draft (แบบร่าง)</option>
                    <option value="3">Reject (ไม่อนุมัติ)</option>
                    <option value="51">Sold/Rent (ขายหรือเช่าแล้ว)</option>
                    <option value="9">Expire (หมดอายุ)</option>
                    <option value="none">Please select</option>
                  </select>
                </div>
                {/* สถานะขายแล้ว/เช่าแล้ว */}
                <div className="space-y-1.5">
                  <label className="text-[12px] font-medium text-gray-600">{isTh ? 'สถานะขายแล้ว/เช่าแล้ว' : 'Sold/Rent Status'}</label>
                  <select className="w-full border border-gray-300 px-3 py-2 rounded-md text-[13px] focus:outline-none focus:border-[#6F42C1] bg-white text-gray-700">
                    <option>All (ทั้งหมด)</option>
                  </select>
                </div>
                {/* ประเภท */}
                <div className="space-y-1.5">
                  <label className="text-[12px] font-medium text-gray-600">{isTh ? 'ประเภท' : 'Type'}</label>
                  <select className="w-full border border-gray-300 px-3 py-2 rounded-md text-[13px] focus:outline-none focus:border-[#6F42C1] bg-white text-gray-700">
                    <option>All (ทั้งหมด)</option>
                  </select>
                </div>

                {/* วันที่สร้าง */}
                <div className="space-y-1.5">
                  <label className="text-[12px] font-medium text-gray-600">{isTh ? 'วันที่สร้าง' : 'Created Date'}</label>
                  <input type="text" placeholder={isTh ? 'เลือกวันที่ต้องการค้นหา' : 'Select date'} className="w-full border border-gray-300 px-3 py-2 rounded-md text-[13px] focus:outline-none focus:border-[#6F42C1]" />
                </div>
                {/* ชั้น */}
                <div className="space-y-1.5">
                  <label className="text-[12px] font-medium text-gray-600">{isTh ? 'ชั้น' : 'Floor'}</label>
                  <select className="w-full border border-gray-300 px-3 py-2 rounded-md text-[13px] focus:outline-none focus:border-[#6F42C1] bg-white text-gray-700">
                    <option>ชั้น</option>
                  </select>
                </div>
                {/* แท็ก */}
                <div className="space-y-1.5">
                  <label className="text-[12px] font-medium text-gray-600">{isTh ? 'แท็ก' : 'Tag'}</label>
                  <select className="w-full border border-gray-300 px-3 py-2 rounded-md text-[13px] focus:outline-none focus:border-[#6F42C1] bg-white text-gray-700">
                    <option>Tag (แท็ก)</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Table Container */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <div className="px-5 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
              <span className="text-[13px] font-bold text-gray-700">
                {isTh ? `ผลลัพธ์ ${listings.length} รายการ` : `Result ${listings.length} items`}
              </span>
              <div className="flex items-center gap-1 text-[13px]">
                <span className="px-2 py-1 text-gray-400">« First</span>
                <span className="px-2 py-1 text-[#6F42C1] bg-purple-50 rounded font-medium">1</span>
                <span className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded cursor-pointer transition-colors">2</span>
                <span className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded cursor-pointer transition-colors">3</span>
                <span className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded cursor-pointer transition-colors">4</span>
                <span className="px-2 py-1 text-[#6F42C1] hover:bg-purple-50 rounded cursor-pointer transition-colors">Next »</span>
                <span className="px-2 py-1 text-[#6F42C1] hover:bg-purple-50 rounded cursor-pointer transition-colors">Last »</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px]">
                <thead>
                  <tr className="border-b border-gray-200 bg-white">
                    <th className="py-3 px-4 w-12 text-center">
                      <input type="checkbox" className="rounded border-gray-300 text-[#6F42C1] focus:ring-[#6F42C1]" />
                    </th>
                    <th className="py-3 px-4 font-bold text-gray-700 whitespace-nowrap">{isTh ? 'รูป' : 'Image'}</th>
                    <th className="py-3 px-4 font-bold text-gray-700 w-[300px] whitespace-nowrap">{isTh ? 'ชื่อประกาศ' : 'Title'}</th>
                    <th className="py-3 px-4 font-bold text-gray-700 whitespace-nowrap">{isTh ? 'ราคาขาย' : 'Sell Price'}</th>
                    <th className="py-3 px-4 font-bold text-gray-700 whitespace-nowrap">{isTh ? 'ราคาเช่า' : 'Rent Price'}</th>
                    <th className="py-3 px-4 font-bold text-gray-700 whitespace-nowrap">{isTh ? 'วันที่' : 'Date'}</th>
                    <th className="py-3 px-4 font-bold text-gray-700 whitespace-nowrap text-center">{isTh ? 'สร้างโดย' : 'Created By'}</th>
                    <th className="py-3 px-4 font-bold text-gray-700 whitespace-nowrap text-center">{isTh ? 'จำนวนวิว' : 'Views'}</th>
                    <th className="py-3 px-4 font-bold text-gray-700 whitespace-nowrap text-center">{isTh ? 'ปักหมุด' : 'Pinned'}</th>
                    <th className="py-3 px-4 font-bold text-gray-700 whitespace-nowrap text-center">Status</th>
                    <th className="py-3 px-4 font-bold text-gray-700 whitespace-nowrap text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {listings.slice(0, 10).map((l, index) => (
                    <tr key={index} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="py-4 px-4 text-center align-top pt-5">
                        <input type="checkbox" className="rounded border-gray-300 text-[#6F42C1] focus:ring-[#6F42C1]" />
                      </td>
                      <td className="py-4 px-4 align-top">
                        <div className="relative w-24 h-16 bg-gray-100 rounded overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={l.imageUrl} alt="Property" className="object-cover w-full h-full" />
                          <div className="absolute top-0 left-0 bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-br">ขาย</div>
                        </div>
                      </td>
                      <td className="py-4 px-4 align-top">
                        <div className="text-gray-500 text-xs mb-1">Ref No : <span className="font-bold text-gray-700">{l.refNo}</span></div>
                        <div className="text-[#0088FF] font-medium leading-snug mb-2 hover:underline cursor-pointer line-clamp-2">{l.title}</div>
                        <div className="text-xs text-gray-500 space-y-0.5">
                          <div>พื้นที่ : {l.area} ตร.ม.</div>
                          <div>ชั้น : {l.floor}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4 align-top font-bold text-gray-800 pt-5">
                        {l.sellPrice ? l.sellPrice.toLocaleString() : '-'}
                      </td>
                      <td className="py-4 px-4 align-top font-bold text-gray-800 pt-5">
                        {l.rentPrice ? l.rentPrice.toLocaleString() : '-'}
                      </td>
                      <td className="py-4 px-4 align-top text-xs pt-5">
                        <div className="mb-1"><span className="text-gray-500">วันโพส :</span><br/>{l.postDate}</div>
                        <div><span className="text-gray-500">วันแก้ไข :</span><br/>{l.editDate}</div>
                      </td>
                      <td className="py-4 px-4 align-top text-center text-xs text-gray-600 pt-5">
                        {l.createdBy}
                      </td>
                      <td className="py-4 px-4 align-top text-center font-medium pt-5">
                        {l.views}
                      </td>
                      <td className="py-4 px-4 align-top text-center pt-5">
                        <span className={`text-[11px] font-bold ${l.pinned ? 'text-green-500' : 'text-red-500'}`}>
                          {l.pinned ? 'YES' : 'NO'}
                        </span>
                      </td>
                      <td className="py-4 px-4 align-top text-center pt-5">
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${getStatusColor(l.status)}`}>
                          {getStatusLabel(l.status)}
                        </span>
                      </td>
                      <td className="py-4 px-4 align-top text-center pt-5">
                        <div className="flex items-center justify-center gap-2 text-gray-400">
                          <button className="hover:text-blue-500 transition-colors" title="View"><Eye className="w-4 h-4" /></button>
                          <button className="hover:text-gray-600 transition-colors" title="Manage images"><ImageIcon className="w-4 h-4" /></button>
                          <button className="hover:text-amber-500 transition-colors" title="Edit"><Edit className="w-4 h-4" /></button>
                          <button className="hover:text-red-500 transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
