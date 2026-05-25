'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminShell } from '../../AdminShell';
import { 
  Plus, FileText, Download, Search, RotateCcw, Pencil, Trash2, ExternalLink,
  ChevronLeft, ChevronRight, Check
} from 'lucide-react';

// Shared Member interface
export interface Member {
  id: string;
  avatar?: string; // 'everwealth' or empty
  registerChannel: string;
  phone: string;
  name: string;
  email: string;
  password?: string;
  fbId?: string;
  lineId?: string;
  ip?: string;
  cookies?: string;
  activateCode?: string;
  status: 'ON' | 'Wait activate' | 'OFF';
  createdDate: string;
  updatedDate: string;
  lastLoginDate?: string;
  failedLoginCount?: number;
}

const defaultMembers: Member[] = [
  {
    id: '22',
    registerChannel: 'Admin',
    phone: '0867894985',
    name: 'Thithiphol Chokkanapitak',
    email: 'Thithiphol.c@danielnson.com',
    status: 'ON',
    createdDate: '2025-01-14 14:22:25',
    updatedDate: '2025-01-14 14:30:35',
    fbId: 'kirk.bu',
    lineId: 'kirk.bu',
    ip: '101.108.143.29',
    cookies: 'Cookies',
    activateCode: 'Activate Code',
    lastLoginDate: '2025-01-14 14:30:35',
    failedLoginCount: 0
  },
  {
    id: '23',
    registerChannel: 'Admin',
    phone: '0830687438',
    name: 'โอเค ไทย',
    email: 'ok.thaiprop@outlook.com',
    status: 'Wait activate',
    createdDate: '2024-12-11 14:46:24',
    updatedDate: '-',
    fbId: '',
    lineId: '',
    ip: '101.108.143.30',
    cookies: 'Cookies',
    activateCode: 'Activate Code',
    lastLoginDate: '-',
    failedLoginCount: 0
  },
  {
    id: '21',
    registerChannel: 'Admin',
    phone: '0864756039',
    name: 'Kantavit Tansakul',
    email: 'ktansakul97@gmail.com',
    status: 'ON',
    createdDate: '2024-11-14 17:56:31',
    updatedDate: '2024-11-14 17:58:23',
    fbId: '',
    lineId: '',
    ip: '101.108.143.28',
    cookies: 'Cookies',
    activateCode: 'Activate Code',
    lastLoginDate: '2024-11-14 17:58:37',
    failedLoginCount: 0
  },
  {
    id: '24',
    registerChannel: 'Admin',
    phone: '0814659999',
    name: 'ปณิธาน ชิน',
    email: 'pranithanc@gmail.com',
    status: 'ON',
    createdDate: '2024-09-07 11:55:24',
    updatedDate: '2024-09-07 11:55:42',
    fbId: '',
    lineId: '',
    ip: '101.108.143.31',
    cookies: 'Cookies',
    activateCode: 'Activate Code',
    lastLoginDate: '2024-09-07 11:56:00',
    failedLoginCount: 0
  },
  {
    id: '25',
    registerChannel: 'Admin',
    phone: '0917844951',
    name: 'จิระเดช',
    email: '1109don@gmail.com',
    status: 'ON',
    createdDate: '2024-08-21 08:40:23',
    updatedDate: '2024-08-21 08:40:39',
    fbId: '',
    lineId: '',
    ip: '101.108.143.32',
    cookies: 'Cookies',
    activateCode: 'Activate Code',
    lastLoginDate: '2024-08-21 08:41:00',
    failedLoginCount: 0
  },
  {
    id: '26',
    avatar: 'everwealth',
    registerChannel: 'Admin',
    phone: '0655919451',
    name: 'พันธสัญญา โชติธนพุทธิพงษ์',
    email: 'everwealth9@gmail.com',
    status: 'ON',
    createdDate: '2024-07-30 11:28:47',
    updatedDate: '2024-07-30 11:32:47',
    fbId: '',
    lineId: '',
    ip: '101.108.143.33',
    cookies: 'Cookies',
    activateCode: 'Activate Code',
    lastLoginDate: '2024-07-30 11:33:00',
    failedLoginCount: 0
  },
  {
    id: '27',
    registerChannel: 'Admin',
    phone: '0969066598',
    name: 'Hongcharoendee',
    email: 'hongcharoendee@gmail.com',
    status: 'ON',
    createdDate: '2024-06-27 21:25:19',
    updatedDate: '2025-01-29 17:47:18',
    fbId: '',
    lineId: '',
    ip: '101.108.143.34',
    cookies: 'Cookies',
    activateCode: 'Activate Code',
    lastLoginDate: '2025-01-29 17:48:00',
    failedLoginCount: 0
  },
  {
    id: '28',
    registerChannel: 'Admin',
    phone: '0856781555',
    name: 'dot60',
    email: 'dot60@mail4.uk',
    status: 'ON',
    createdDate: '2024-06-18 14:37:09',
    updatedDate: '2024-06-18 14:37:49',
    fbId: '',
    lineId: '',
    ip: '101.108.143.35',
    cookies: 'Cookies',
    activateCode: 'Activate Code',
    lastLoginDate: '2024-06-18 14:38:00',
    failedLoginCount: 0
  }
];

export default function MembersIndexPage() {
  const router = useRouter();
  
  // Data State
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  // Filter States
  const [channelFilter, setChannelFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Active Filter values used in logic (applied on Search click)
  const [appliedChannel, setAppliedChannel] = useState('');
  const [appliedStatus, setAppliedStatus] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Load from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('stayverse_members');
      if (stored) {
        setMembers(JSON.parse(stored));
      } else {
        localStorage.setItem('stayverse_members', JSON.stringify(defaultMembers));
        setMembers(defaultMembers);
      }
    }
  }, []);

  // Sync back to localStorage when members list changes
  const saveMembers = (newMembers: Member[]) => {
    setMembers(newMembers);
    localStorage.setItem('stayverse_members', JSON.stringify(newMembers));
  };

  // Filtered members list based on applied filters
  const filteredMembers = React.useMemo(() => {
    return members.filter(m => {
      const matchChannel = appliedChannel ? m.registerChannel.toLowerCase() === appliedChannel.toLowerCase() : true;
      const matchStatus = appliedStatus ? m.status === appliedStatus : true;
      const matchSearch = appliedSearch ? (
        m.name.toLowerCase().includes(appliedSearch.toLowerCase()) ||
        m.email.toLowerCase().includes(appliedSearch.toLowerCase()) ||
        m.phone.includes(appliedSearch) ||
        (m.fbId && m.fbId.toLowerCase().includes(appliedSearch.toLowerCase()))
      ) : true;
      return matchChannel && matchStatus && matchSearch;
    });
  }, [members, appliedChannel, appliedStatus, appliedSearch]);

  // Paginated list
  const paginatedMembers = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredMembers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredMembers, currentPage]);

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage) || 1;

  // Handlers
  const handleSearch = () => {
    setAppliedChannel(channelFilter);
    setAppliedStatus(statusFilter);
    setAppliedSearch(searchQuery);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setChannelFilter('');
    setStatusFilter('');
    setSearchQuery('');
    setAppliedChannel('');
    setAppliedStatus('');
    setAppliedSearch('');
    setCurrentPage(1);
  };

  const handleSelectRow = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSelectAllOnPage = () => {
    const pageIds = paginatedMembers.map(m => m.id);
    const allSelected = pageIds.every(id => selectedIds.includes(id));
    if (allSelected) {
      setSelectedIds(prev => prev.filter(id => !pageIds.includes(id)));
    } else {
      setSelectedIds(prev => {
        const next = [...prev];
        pageIds.forEach(id => {
          if (!next.includes(id)) next.push(id);
        });
        return next;
      });
    }
  };

  const handleBulkSelectAll = () => {
    setSelectedIds(filteredMembers.map(m => m.id));
  };

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;
    if (confirm(`คุณต้องการลบสมาชิกที่เลือกจำนวน ${selectedIds.length} รายการใช่หรือไม่?`)) {
      const remaining = members.filter(m => !selectedIds.includes(m.id));
      saveMembers(remaining);
      setSelectedIds([]);
      alert('ลบข้อมูลสมาชิกสำเร็จ');
    }
  };

  const handleDeleteItem = (id: string) => {
    if (confirm('คุณแน่ใจว่าต้องการลบสมาชิกท่านนี้ใช่หรือไม่?')) {
      const remaining = members.filter(m => m.id !== id);
      saveMembers(remaining);
      setSelectedIds(prev => prev.filter(x => x !== id));
      alert('ลบข้อมูลสมาชิกสำเร็จ');
    }
  };

  const handleExport = () => {
    alert('ส่งออกข้อมูลสมาชิกเรียบร้อยแล้ว (Mock File Exported)');
  };

  const handleMemberAgreement = () => {
    alert('กำลังเปิดเอกสารข้อตกลงสมาชิก (Member Agreement)');
  };

  const handleLoginAsUser = (member: Member) => {
    alert(`เข้าสู่ระบบในฐานะผู้ใช้งาน: ${member.name} (${member.email})`);
  };

  return (
    <AdminShell activeItem="members">
      {/* Page Title & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 mb-6 border-b border-gray-200/60">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">สมาชิก</h1>
        </div>
        <div className="text-xs font-semibold text-gray-400 mt-2 sm:mt-0 flex items-center space-x-1.5 select-none">
          <span className="hover:text-[#CF7536] cursor-pointer" onClick={() => router.push('/admin')}>Home</span>
          <span>/</span>
          <span className="text-gray-600">สมาชิก</span>
        </div>
      </div>

      {/* Button Toolbars (Add new, Member Agreement, Export) */}
      <div className="flex flex-wrap gap-2.5 mb-6">
        <button
          onClick={() => router.push('/admin/members/new')}
          className="bg-[#6F42C1] hover:bg-[#5A32A3] text-white flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-semibold transition-all duration-200 cursor-pointer shadow-sm hover:shadow"
        >
          <Plus className="w-4 h-4" />
          <span>Add new</span>
        </button>
        <button
          onClick={handleMemberAgreement}
          className="bg-[#0088FF] hover:bg-[#0073D6] text-white flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-semibold transition-all duration-200 cursor-pointer shadow-sm hover:shadow"
        >
          <FileText className="w-4 h-4" />
          <span>Member Agreement</span>
        </button>
        <button
          onClick={handleExport}
          className="bg-[#F59E0B] hover:bg-[#D97706] text-white flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-semibold transition-all duration-200 cursor-pointer shadow-sm hover:shadow"
        >
          <Download className="w-4 h-4" />
          <span>Export</span>
        </button>
      </div>

      {/* Filters Form Container */}
      <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-sm mb-6 flex flex-wrap gap-3 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">ช่องทางการสมัคร</label>
          <select
            value={channelFilter}
            onChange={(e) => setChannelFilter(e.target.value)}
            className="w-full text-sm bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#6F42C1] transition-all duration-200"
          >
            <option value="">ทั้งหมด</option>
            <option value="Admin">Admin</option>
            <option value="Google">Google</option>
            <option value="Facebook">Facebook</option>
          </select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">Status</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full text-sm bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#6F42C1] transition-all duration-200"
          >
            <option value="">ทั้งหมด</option>
            <option value="ON">ON</option>
            <option value="Wait activate">Wait activate</option>
            <option value="OFF">OFF</option>
          </select>
        </div>

        <div className="flex-[2] min-w-[280px]">
          <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">คำค้นหา</label>
          <input
            type="text"
            placeholder="ค้นหาชื่อ, อีเมล, เบอร์โทร..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full text-sm bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#6F42C1] transition-all duration-200"
          />
        </div>

        <div className="flex shrink-0 gap-2">
          <button
            onClick={handleSearch}
            className="bg-[#6F42C1] hover:bg-[#5A32A3] text-white flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer shadow-sm hover:shadow"
          >
            <Search className="w-4 h-4" />
            <span>Search</span>
          </button>
          <button
            onClick={handleReset}
            className="bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-800 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Results Header Counter & Pagination */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between mb-4 gap-3 select-none">
        <span className="text-xs font-bold text-gray-500">
          ค้นพบ {filteredMembers.length} รายการ
        </span>
        
        {/* Pagination Top */}
        <div className="flex items-center gap-1 text-xs">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className={`px-3 py-1.5 border rounded cursor-pointer transition-all duration-150 ${
              currentPage === 1 
                ? 'border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50' 
                : 'border-gray-300 text-gray-600 bg-white hover:bg-gray-50 hover:border-gray-400'
            }`}
          >
            « First
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx + 1}
              onClick={() => setCurrentPage(idx + 1)}
              className={`px-3 py-1.5 border rounded cursor-pointer transition-all duration-150 ${
                currentPage === idx + 1
                  ? 'border-blue-500 text-blue-600 font-bold bg-blue-50/50'
                  : 'border-gray-300 text-gray-600 bg-white hover:bg-gray-50 hover:border-gray-400'
              }`}
            >
              {idx + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1.5 border rounded cursor-pointer transition-all duration-150 ${
              currentPage === totalPages 
                ? 'border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50' 
                : 'border-gray-300 text-gray-600 bg-white hover:bg-gray-50 hover:border-gray-400'
            }`}
          >
            Last »
          </button>
        </div>
      </div>

      {/* Main Members Table */}
      <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-gray-50/70 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase select-none">
                <th className="py-4 px-4 w-12 text-center">
                  <input
                    type="checkbox"
                    checked={paginatedMembers.length > 0 && paginatedMembers.every(m => selectedIds.includes(m.id))}
                    onChange={handleSelectAllOnPage}
                    className="w-4 h-4 rounded text-[#6F42C1] focus:ring-[#6F42C1] cursor-pointer"
                  />
                </th>
                <th className="py-4 px-3 w-28 text-center">รูปภาพ</th>
                <th className="py-4 px-3">ช่องทางการสมัคร</th>
                <th className="py-4 px-3">โทรศัพท์</th>
                <th className="py-4 px-3">ชื่อ</th>
                <th className="py-4 px-3">อีเมล</th>
                <th className="py-4 px-3 w-40">วันที่สร้าง</th>
                <th className="py-4 px-3 w-40">วันที่แก้ไขล่าสุด</th>
                <th className="py-4 px-3 w-28">Status</th>
                <th className="py-4 px-4 w-32 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedMembers.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-gray-400 font-medium">
                    ไม่พบข้อมูลสมาชิก
                  </td>
                </tr>
              ) : (
                paginatedMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50/60 transition-colors duration-150">
                    <td className="py-4.5 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(member.id)}
                        onChange={() => handleSelectRow(member.id)}
                        className="w-4 h-4 rounded text-[#6F42C1] focus:ring-[#6F42C1] cursor-pointer"
                      />
                    </td>
                    <td className="py-4 px-3">
                      <div className="flex justify-center">
                        {member.avatar === 'everwealth' ? (
                          <div className="w-16 h-16 bg-[#061E38] border border-gray-200 rounded flex items-center justify-center overflow-hidden p-1 shadow-inner">
                            {/* Handdrawn responsive clean SVG of Everwealth Logo */}
                            <svg viewBox="0 0 100 100" className="w-full h-full text-white">
                              <defs>
                                <linearGradient id="silver" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor="#E2E8F0" />
                                  <stop offset="50%" stopColor="#94A3B8" />
                                  <stop offset="100%" stopColor="#CBD5E1" />
                                </linearGradient>
                              </defs>
                              {/* Background loop elements */}
                              <rect width="100" height="100" fill="#04182E" rx="8" />
                              {/* Clean Infinity loop path */}
                              <path 
                                d="M 30,50 C 15,35 15,65 30,50 C 45,35 55,35 70,50 C 85,65 85,35 70,50 C 55,65 45,65 30,50 Z" 
                                fill="none" 
                                stroke="url(#silver)" 
                                strokeWidth="8"
                                strokeLinecap="round"
                              />
                              <text x="50%" y="82%" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold" letterSpacing="0.8">EVERWEALTH</text>
                              <text x="50%" y="92%" textAnchor="middle" fill="#94A3B8" fontSize="6" fontWeight="normal" letterSpacing="1.2">REALTY</text>
                            </svg>
                          </div>
                        ) : (
                          <div className="w-16 h-16 bg-gray-100 border border-dashed border-gray-300 rounded flex items-center justify-center text-xs font-semibold text-gray-400 select-none">
                            No Img
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-4.5 px-3 font-semibold text-gray-700">
                      {member.registerChannel}
                    </td>
                    <td className="py-4.5 px-3 font-medium text-gray-650">
                      {member.phone}
                    </td>
                    <td className="py-4.5 px-3 font-bold text-gray-800">
                      {member.name}
                    </td>
                    <td className="py-4.5 px-3 text-gray-600 font-medium">
                      {member.email}
                    </td>
                    <td className="py-4.5 px-3 text-xs text-gray-500 font-mono">
                      {member.createdDate}
                    </td>
                    <td className="py-4.5 px-3 text-xs text-gray-500 font-mono">
                      {member.updatedDate}
                    </td>
                    <td className="py-4.5 px-3">
                      {member.status === 'ON' ? (
                        <span className="text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-200">
                          ON
                        </span>
                      ) : member.status === 'Wait activate' ? (
                        <span className="text-xs font-bold text-red-650 bg-red-50 px-2.5 py-1 rounded-full border border-red-200">
                          Wait activate
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full border border-gray-200">
                          OFF
                        </span>
                      )}
                    </td>
                    <td className="py-4.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5 select-none">
                        <button
                          onClick={() => handleLoginAsUser(member)}
                          title="Login as user"
                          className="p-1.5 border border-gray-200 rounded text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-pointer"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => router.push(`/admin/members/edit?ids=${member.id}`)}
                          title="Edit"
                          className="p-1.5 border border-gray-200 rounded text-gray-500 hover:text-[#CF7536] hover:bg-orange-50 transition-all cursor-pointer"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteItem(member.id)}
                          title="Delete"
                          className="p-1.5 border border-gray-200 rounded text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Action bar (Select all & Delete) and Bottom Pagination */}
      <div className="bg-[#f0f4f8] p-3 rounded-lg border border-gray-200/80 flex flex-col sm:flex-row justify-between items-center gap-4 select-none">
        <div className="flex gap-2">
          <button
            onClick={handleBulkSelectAll}
            className="bg-[#0088FF] hover:bg-[#0073D6] text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-sm transition-all duration-200 cursor-pointer"
          >
            Select all
          </button>
          <button
            onClick={handleBulkDelete}
            disabled={selectedIds.length === 0}
            className={`text-xs font-semibold px-4 py-2.5 rounded-lg shadow-sm transition-all duration-200 ${
              selectedIds.length === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                : 'bg-red-600 hover:bg-red-700 text-white cursor-pointer'
            }`}
          >
            Delete
          </button>
        </div>

        {/* Bottom Pagination */}
        <div className="flex items-center gap-1 text-xs">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className={`px-3 py-1.5 border rounded cursor-pointer transition-all duration-150 ${
              currentPage === 1 
                ? 'border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50' 
                : 'border-gray-300 text-gray-600 bg-white hover:bg-gray-50 hover:border-gray-400'
            }`}
          >
            « First
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx + 1}
              onClick={() => setCurrentPage(idx + 1)}
              className={`px-3 py-1.5 border rounded cursor-pointer transition-all duration-150 ${
                currentPage === idx + 1
                  ? 'border-blue-500 text-blue-600 font-bold bg-blue-50/50'
                  : 'border-gray-300 text-gray-600 bg-white hover:bg-gray-50 hover:border-gray-400'
              }`}
            >
              {idx + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1.5 border rounded cursor-pointer transition-all duration-150 ${
              currentPage === totalPages 
                ? 'border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50' 
                : 'border-gray-300 text-gray-600 bg-white hover:bg-gray-50 hover:border-gray-400'
            }`}
          >
            Last »
          </button>
        </div>
      </div>
    </AdminShell>
  );
}
