'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminShell } from '../AdminShell';
import { Plus, Search, RotateCcw, Pencil, Trash2, FolderOpen } from 'lucide-react';
import { useTranslation } from '@/context/LanguageContext';

interface ProjectItem {
  id: string;
  image: string;
  nameTh: string;
  nameEn: string;
  type: string; // e.g., 'Condo', 'Home', 'Townhome'
  constructionStatus: string; // e.g., 'โครงการพร้อมอยู่', 'กำลังก่อสร้าง'
  sortOrder: number;
  status: 'ON' | 'OFF';
}

const PRESET_IMAGES = [
  { label: 'Condo 1 (Modern Highrise)', url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=150&auto=format&fit=crop&q=60' },
  { label: 'Condo 2 (Luxury Tower)', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=150&auto=format&fit=crop&q=60' },
  { label: 'House 1 (Modern Villa)', url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=150&auto=format&fit=crop&q=60' },
  { label: 'House 2 (Garden Estate)', url: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=150&auto=format&fit=crop&q=60' },
  { label: 'House 3 (Townhome Cozy)', url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=150&auto=format&fit=crop&q=60' },
];

export default function SetProjectPage() {
  const router = useRouter();
  const { language } = useTranslation();
  const isTh = language === 'th';

  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  // Filter States
  const [filterType, setFilterType] = useState('');
  const [filterConstruction, setFilterConstruction] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Active filter states (applied on click "Search")
  const [appliedFilters, setAppliedFilters] = useState({
    type: '',
    construction: '',
    status: '',
    search: '',
  });



  // Initial Seeding matching screenshot items
  const initialProjects: ProjectItem[] = [
    {
      id: '3325',
      image: PRESET_IMAGES[0].url,
      nameTh: 'เจ ดับบลิว ซิตี้ รัชดาภิเษก 32',
      nameEn: 'J.W. CITY Ratchada 32',
      type: 'Condo',
      constructionStatus: 'โครงการพร้อมอยู่',
      sortOrder: 999,
      status: 'ON',
    },
    {
      id: '3811',
      image: PRESET_IMAGES[1].url,
      nameTh: 'ดีจาล แมนชั่น',
      nameEn: 'Diyal Mansion',
      type: 'Condo',
      constructionStatus: 'โครงการพร้อมอยู่',
      sortOrder: 999,
      status: 'ON',
    },
    {
      id: '3910',
      image: PRESET_IMAGES[2].url,
      nameTh: 'เอคิว อลิกซ์ - เรสซิเดนซ์ ศูนย์วิจัย',
      nameEn: 'AQ Alix - Residence Soonvijai',
      type: 'Condo',
      constructionStatus: 'โครงการพร้อมอยู่',
      sortOrder: 999,
      status: 'ON',
    },
    {
      id: '3550',
      image: PRESET_IMAGES[3].url,
      nameTh: 'บ้านสวน จตุจักร',
      nameEn: 'BaanSuan Chatuchak',
      type: 'Condo',
      constructionStatus: 'โครงการพร้อมอยู่',
      sortOrder: 999,
      status: 'ON',
    },
    {
      id: '2264',
      image: PRESET_IMAGES[4].url,
      nameTh: 'บ้านพนาลัย',
      nameEn: 'Baan Panalai',
      type: 'Home',
      constructionStatus: 'โครงการพร้อมอยู่',
      sortOrder: 999,
      status: 'ON',
    },
  ];

  // Load from local storage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('stayverse_set_projects');
      if (stored) {
        try {
          setProjects(JSON.parse(stored));
        } catch (e) {
          console.error(e);
        }
      } else {
        localStorage.setItem('stayverse_set_projects', JSON.stringify(initialProjects));
        setProjects(initialProjects);
      }
    }
  }, []);

  // Filter application
  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAppliedFilters({
      type: filterType,
      construction: filterConstruction,
      status: filterStatus,
      search: searchQuery,
    });
  };

  const handleResetFilters = () => {
    setFilterType('');
    setFilterConstruction('');
    setFilterStatus('');
    setSearchQuery('');
    setAppliedFilters({
      type: '',
      construction: '',
      status: '',
      search: '',
    });
  };

  const filteredProjects = projects.filter((p) => {
    if (appliedFilters.type && p.type !== appliedFilters.type) return false;
    if (appliedFilters.construction && p.constructionStatus !== appliedFilters.construction) return false;
    if (appliedFilters.status && p.status !== appliedFilters.status) return false;
    if (appliedFilters.search) {
      const query = appliedFilters.search.toLowerCase();
      const matchNameTh = p.nameTh.toLowerCase().includes(query);
      const matchNameEn = p.nameEn.toLowerCase().includes(query);
      const matchId = p.id.includes(query);
      if (!matchNameTh && !matchNameEn && !matchId) return false;
    }
    return true;
  });

  // Checkbox handlers
  const handleToggleSelectRow = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleToggleSelectAllHeader = () => {
    if (selectedIds.length === filteredProjects.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredProjects.map((p) => p.id));
    }
  };

  const handleSelectAllBottom = () => {
    setSelectedIds(filteredProjects.map((p) => p.id));
  };

  // Bulk Actions
  const handleBulkDelete = () => {
    if (selectedIds.length === 0) {
      alert(isTh ? 'กรุณาเลือกรายการที่ต้องการลบ' : 'Please select items to delete');
      return;
    }
    const confirmMsg = isTh 
      ? `คุณแน่ใจหรือไม่ว่าต้องการลบ ${selectedIds.length} รายการที่เลือก?`
      : `Are you sure you want to delete ${selectedIds.length} selected items?`;
      
    if (confirm(confirmMsg)) {
      const updated = projects.filter((p) => !selectedIds.includes(p.id));
      setProjects(updated);
      setSelectedIds([]);
      localStorage.setItem('stayverse_set_projects', JSON.stringify(updated));
    }
  };

  const handleSingleDelete = (id: string) => {
    const confirmMsg = isTh 
      ? 'คุณแน่ใจหรือไม่ว่าต้องการลบโครงการนี้?'
      : 'Are you sure you want to delete this project?';
    if (confirm(confirmMsg)) {
      const updated = projects.filter((p) => p.id !== id);
      setProjects(updated);
      setSelectedIds(selectedIds.filter((selected) => selected !== id));
      localStorage.setItem('stayverse_set_projects', JSON.stringify(updated));
    }
  };

  const handleSortChange = (id: string, value: string) => {
    const numericValue = parseInt(value, 10) || 0;
    const updated = projects.map((p) => {
      if (p.id === id) {
        return { ...p, sortOrder: numericValue };
      }
      return p;
    });
    setProjects(updated);
  };

  const handleBulkSortSave = () => {
    localStorage.setItem('stayverse_set_projects', JSON.stringify(projects));
    alert(isTh ? 'บันทึกลำดับเรียบร้อยแล้ว' : 'Sort order updated successfully');
  };



  return (
    <AdminShell activeItem="set_project">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-row justify-between items-center pb-5 mb-5 border-b border-gray-200/60 select-none">
        <h1 className="text-xl font-bold text-gray-800 flex items-center">
          {isTh ? 'โครงการ' : 'Projects'}
        </h1>
        <div className="text-xs text-[#0088FF] flex items-center space-x-1.5">
          <span className="hover:underline cursor-pointer" onClick={() => router.push('/admin')}>
            Home
          </span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-500">{isTh ? 'โครงการ' : 'Projects'}</span>
        </div>
      </div>

      {/* Action and Filter Controls Bar */}
      <div className="bg-white p-4 border border-gray-200 rounded-md shadow-sm mb-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Add New Button */}
          <div>
            <button
              onClick={() => router.push('/admin/set_project/new')}
              className="bg-[#5B21B6] hover:bg-[#4C1D95] text-white px-4 py-1.5 rounded text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add new</span>
            </button>
          </div>

          {/* Filters Form */}
          <form onSubmit={handleSearch} className="flex flex-wrap items-center gap-2 text-xs">
            {/* Project Type */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-white border border-gray-300 rounded px-2.5 py-1.5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#5B21B6]"
            >
              <option value="">{isTh ? 'ประเภทโครงการ' : 'Project Type'}</option>
              <option value="Condo">Condo</option>
              <option value="Home">Home</option>
              <option value="Townhome">Townhome</option>
            </select>

            {/* Construction Status */}
            <select
              value={filterConstruction}
              onChange={(e) => setFilterConstruction(e.target.value)}
              className="bg-white border border-gray-300 rounded px-2.5 py-1.5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#5B21B6]"
            >
              <option value="">{isTh ? 'สถานะก่อสร้างของโครงการ' : 'Construction Status'}</option>
              <option value="โครงการพร้อมอยู่">โครงการพร้อมอยู่</option>
              <option value="กำลังก่อสร้าง">กำลังก่อสร้าง</option>
            </select>

            {/* Status */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-white border border-gray-300 rounded px-2.5 py-1.5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#5B21B6]"
            >
              <option value="">Status-</option>
              <option value="ON">ON</option>
              <option value="OFF">OFF</option>
            </select>

            {/* Keyword Search */}
            <input
              type="text"
              placeholder={isTh ? 'คำค้นหา' : 'Search query'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white border border-gray-300 rounded px-2.5 py-1.5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#5B21B6] w-48 placeholder-gray-400"
            />

            {/* Action Buttons */}
            <button
              type="submit"
              className="bg-[#5B21B6] hover:bg-[#4C1D95] text-white px-4 py-1.5 rounded font-semibold flex items-center gap-1 cursor-pointer transition-colors shadow-sm"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search</span>
            </button>

            <button
              type="button"
              onClick={handleResetFilters}
              className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-4 py-1.5 rounded font-semibold flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </form>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden mb-6">
        {/* Count Summary & Top Pagination */}
        <div className="px-6 py-3 border-b border-gray-150 flex flex-col sm:flex-row justify-between items-center bg-white text-xs select-none gap-2">
          <div className="text-gray-700">
            {isTh ? 'ทั้งหมด' : 'Total'}{' '}
            <span className="font-bold text-gray-900">{filteredProjects.length.toLocaleString()}</span>{' '}
            {isTh ? 'รายการ' : 'items'}
          </div>
          
          {/* Mock Pagination matching screenshot layout */}
          <div className="flex items-center space-x-1">
            <span className="px-2 py-1 border border-gray-200 rounded text-gray-400 bg-gray-50 text-[10px]">&laquo; First</span>
            <span className="px-2.5 py-1 border border-[#5B21B6] bg-[#5B21B6]/5 text-[#5B21B6] rounded font-semibold text-[10px]">1</span>
            <span className="px-2.5 py-1 border border-gray-200 rounded text-gray-600 hover:bg-gray-50 cursor-pointer text-[10px]">2</span>
            <span className="px-2.5 py-1 border border-gray-200 rounded text-gray-600 hover:bg-gray-50 cursor-pointer text-[10px]">3</span>
            <span className="px-2.5 py-1 border border-gray-200 rounded text-gray-600 hover:bg-gray-50 cursor-pointer text-[10px]">4</span>
            <span className="px-2.5 py-1 border border-gray-200 rounded text-gray-600 hover:bg-gray-50 cursor-pointer text-[10px]">5</span>
            <span className="px-2.5 py-1 border border-gray-200 rounded text-gray-600 hover:bg-gray-50 cursor-pointer text-[10px]">6</span>
            <span className="text-gray-400 px-1 text-[10px]">...</span>
            <span className="px-2.5 py-1 border border-gray-200 rounded text-gray-600 hover:bg-gray-50 cursor-pointer text-[10px]">802</span>
            <span className="px-2 py-1 border border-gray-200 rounded text-gray-600 hover:bg-gray-50 cursor-pointer text-[10px]">Next &raquo;</span>
            <span className="px-2 py-1 border border-gray-200 rounded text-gray-600 hover:bg-gray-50 cursor-pointer text-[10px]">Last &raquo;</span>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F8F9FA] text-gray-700 font-bold border-b border-gray-200">
                <th className="py-3 px-4 w-12 text-center">
                  <input
                    type="checkbox"
                    checked={filteredProjects.length > 0 && selectedIds.length === filteredProjects.length}
                    onChange={handleToggleSelectAllHeader}
                    className="w-3.5 h-3.5 border border-gray-300 rounded text-[#5B21B6] focus:ring-[#5B21B6] cursor-pointer"
                  />
                </th>
                <th className="py-3 px-4 w-20 text-gray-600">ID</th>
                <th className="py-3 px-4 w-24 text-gray-600">{isTh ? 'รูปโครงการ' : 'Project Image'}</th>
                <th className="py-3 px-4 text-gray-600">{isTh ? 'ชื่อโครงการ [TH]' : 'Project Name [TH]'}</th>
                <th className="py-3 px-4 text-gray-600">{isTh ? 'ชื่อโครงการ [EN]' : 'Project Name [EN]'}</th>
                <th className="py-3 px-4 text-gray-600">{isTh ? 'สถานะก่อสร้างของโครงการ' : 'Construction Status'}</th>
                <th className="py-3 px-4 w-24 text-gray-600 text-center">
                  <span className="flex items-center justify-center gap-1">
                    Sort
                    <span className="text-[10px] opacity-75 font-normal">⇅</span>
                  </span>
                </th>
                <th className="py-3 px-4 w-20 text-center text-gray-600">Status</th>
                <th className="py-3 px-4 w-24 text-center text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((p) => {
                  const isSelected = selectedIds.includes(p.id);
                  return (
                    <tr key={p.id} className={`hover:bg-gray-50/50 text-gray-800 ${isSelected ? 'bg-[#5B21B6]/5' : ''}`}>
                      <td className="py-3 px-4 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelectRow(p.id)}
                          className="w-3.5 h-3.5 border border-gray-300 rounded text-[#5B21B6] focus:ring-[#5B21B6] cursor-pointer"
                        />
                      </td>
                      <td className="py-3 px-4 text-gray-600 font-mono">{p.id}</td>
                      <td className="py-3 px-4">
                        <img
                          src={p.image}
                          alt={p.nameEn}
                          className="w-14 h-10 object-cover rounded border border-gray-200"
                        />
                      </td>
                      <td className="py-3 px-4 font-semibold text-gray-900">{p.nameTh}</td>
                      <td className="py-3 px-4 text-gray-600">{p.nameEn}</td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-gray-700">{p.constructionStatus}</div>
                        <div className="text-[10px] text-gray-400 font-medium">{p.type}</div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <input
                          type="text"
                          value={p.sortOrder}
                          onChange={(e) => handleSortChange(p.id, e.target.value)}
                          className="w-16 h-7 text-center bg-white border border-gray-300 rounded text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#5B21B6]"
                        />
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`text-[11px] font-bold ${p.status === 'ON' ? 'text-green-600' : 'text-red-500'}`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center space-x-1.5">
                          <button
                            title="Details"
                            className="p-1.5 text-gray-500 hover:bg-gray-100 rounded transition-colors cursor-pointer"
                          >
                            <FolderOpen className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => router.push(`/admin/set_project/new?id=${p.id}`)}
                            title="Edit"
                            className="p-1.5 text-[#5B21B6] hover:bg-violet-50 rounded transition-colors cursor-pointer"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleSingleDelete(p.id)}
                            title="Delete"
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-gray-400 font-medium bg-gray-50/20">
                    {isTh ? 'ไม่พบข้อมูลโครงการตามตัวกรอง' : 'No projects found matching the filters'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Bottom Actions Footer */}
        <div className="bg-[#F8F9FA] px-6 py-4 flex flex-col sm:flex-row justify-between items-center border-t border-gray-200/60 select-none gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={handleSelectAllBottom}
              className="bg-[#0088FF] hover:bg-[#0077EE] text-white px-3 py-1.5 rounded text-xs font-semibold cursor-pointer transition-colors shadow-sm"
            >
              Select all
            </button>
            <button
              onClick={handleBulkDelete}
              className="bg-[#DC3545] hover:bg-[#C82333] text-white px-3 py-1.5 rounded text-xs font-semibold cursor-pointer transition-colors shadow-sm"
            >
              Delete
            </button>
            <button
              onClick={handleBulkSortSave}
              className="bg-[#0088FF] hover:bg-[#0077EE] text-white px-3 py-1.5 rounded text-xs font-semibold cursor-pointer transition-colors shadow-sm"
            >
              Sort
            </button>
          </div>

          {/* Bottom Pagination */}
          <div className="flex items-center space-x-1">
            <span className="px-2 py-1 border border-gray-200 rounded text-gray-400 bg-gray-50 text-[10px]">&laquo; First</span>
            <span className="px-2.5 py-1 border border-[#5B21B6] bg-[#5B21B6]/5 text-[#5B21B6] rounded font-semibold text-[10px]">1</span>
            <span className="px-2.5 py-1 border border-gray-200 rounded text-gray-600 hover:bg-gray-50 cursor-pointer text-[10px]">2</span>
            <span className="px-2.5 py-1 border border-gray-200 rounded text-gray-600 hover:bg-gray-50 cursor-pointer text-[10px]">3</span>
            <span className="px-2.5 py-1 border border-gray-200 rounded text-gray-600 hover:bg-gray-50 cursor-pointer text-[10px]">4</span>
            <span className="px-2.5 py-1 border border-gray-200 rounded text-gray-600 hover:bg-gray-50 cursor-pointer text-[10px]">5</span>
            <span className="px-2.5 py-1 border border-gray-200 rounded text-gray-600 hover:bg-gray-50 cursor-pointer text-[10px]">6</span>
            <span className="text-gray-400 px-1 text-[10px]">...</span>
            <span className="px-2.5 py-1 border border-gray-200 rounded text-gray-600 hover:bg-gray-50 cursor-pointer text-[10px]">802</span>
            <span className="px-2 py-1 border border-gray-200 rounded text-gray-600 hover:bg-gray-50 cursor-pointer text-[10px]">Next &raquo;</span>
            <span className="px-2 py-1 border border-gray-200 rounded text-gray-600 hover:bg-gray-50 cursor-pointer text-[10px]">Last &raquo;</span>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
