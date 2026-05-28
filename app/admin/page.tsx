'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation, Language } from '@/context/LanguageContext';
import { 
  LayoutDashboard, Megaphone, Pencil, FileText, User, UserPlus, 
  Image as ImageIcon, Tv, Video, BookOpen, Tag, Bell, MessageSquare, 
  Award, Search, Info, Phone, Settings, Book, ShieldAlert, Activity, 
  LogOut, ChevronDown, ChevronLeft, ChevronRight, Copy, Check, ExternalLink, Menu, X, 
  Globe, Clock, HelpCircle, Share2, Download, RotateCcw, Eye, Trash2, CheckCircle, XCircle,
  PlusCircle
} from 'lucide-react';
import { AdminShell, Listing, generateMockListings, adminTranslations, languageFlags, languageNames } from './AdminShell';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminPage() {
  return <DashboardContent role="admin" />;
}

export function DashboardContent({ role = 'admin' }: { role?: 'admin' | 'developer' | 'affiliate' | 'tenant' }) {
  const { language, setLanguage, isMounted } = useTranslation();
  
  // States
  const [activeItem, setActiveItem] = useState('overview');
  const [copied, setCopied] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Listings State
  const [listings, setListings] = useState<Listing[]>([]);
  
  useEffect(() => {
    setListings(generateMockListings());
  }, []);

  // Listing Search & Filters
  const [searchKeyword, setSearchKeyword] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'online' | 'offline' | 'draft' | 'reject' | 'soldRent' | 'expire'>('online');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedListingIds, setSelectedListingIds] = useState<string[]>([]);
  const listingsPerPage = 10;

  // Advanced Filters State
  const [filterProject, setFilterProject] = useState('');
  const [filterPropertyType, setFilterPropertyType] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterMrtBts, setFilterMrtBts] = useState('');
  const [filterMinPrice, setFilterMinPrice] = useState('');
  const [filterMaxPrice, setFilterMaxPrice] = useState('');
  const [filterBedrooms, setFilterBedrooms] = useState('');
  const [filterSoldRented, setFilterSoldRented] = useState('');
  const [filterFloor, setFilterFloor] = useState('');
  const [filterStatus, setFilterStatus] = useState('online');
  const [filterDealType, setFilterDealType] = useState('');
  const [filterSortBy, setFilterSortBy] = useState('newest');
  const [filterTags, setFilterTags] = useState('');
  const [filterCreatedDate, setFilterCreatedDate] = useState('');
  const [filterCreatedBy, setFilterCreatedBy] = useState('');

  // Sync advanced filter status with tab
  useEffect(() => {
    setFilterStatus(activeTab);
  }, [activeTab]);

  // Sync sidebar activeItem with top tabs and view
  useEffect(() => {
    if (activeItem === 'allListings') {
      setActiveTab('all');
    } else if (activeItem === 'onlineListings') {
      setActiveTab('online');
    } else if (activeItem === 'offlineListings') {
      setActiveTab('offline');
    } else if (activeItem === 'draftListings') {
      setActiveTab('draft');
    } else if (activeItem === 'rejectListings') {
      setActiveTab('reject');
    } else if (activeItem === 'soldRentListings') {
      setActiveTab('soldRent');
    } else if (activeItem === 'expireListings') {
      setActiveTab('expire');
    }
  }, [activeItem]);

  const handleTabClick = (tab: typeof activeTab) => {
    setActiveTab(tab);
    if (tab === 'all') setActiveItem('allListings');
    else if (tab === 'online') setActiveItem('onlineListings');
    else if (tab === 'offline') setActiveItem('offlineListings');
    else if (tab === 'draft') setActiveItem('draftListings');
    else if (tab === 'reject') setActiveItem('rejectListings');
    else if (tab === 'soldRent') setActiveItem('soldRentListings');
    else if (tab === 'expire') setActiveItem('expireListings');
  };

  const handleStatusFilterChange = (val: string) => {
    setFilterStatus(val);
    if (val === 'all' || val === 'online' || val === 'offline' || val === 'draft' || val === 'reject' || val === 'soldRent' || val === 'expire') {
      handleTabClick(val as any);
    }
  };

  const handleResetFilters = () => {
    setSearchKeyword('');
    setActiveTab('online');
    setActiveItem('onlineListings');
    setFilterProject('');
    setFilterPropertyType('');
    setFilterLocation('');
    setFilterMrtBts('');
    setFilterMinPrice('');
    setFilterMaxPrice('');
    setFilterBedrooms('');
    setFilterSoldRented('');
    setFilterFloor('');
    setFilterStatus('online');
    setFilterDealType('');
    setFilterSortBy('newest');
    setFilterTags('');
    setFilterCreatedDate('');
    setFilterCreatedBy('');
    setCurrentPage(1);
    setSelectedListingIds([]);
  };

  // Actions
  const handleDeleteSelected = () => {
    if (confirm(`คุณต้องการลบรายการประกาศที่เลือกจำนวน ${selectedListingIds.length} รายการใช่หรือไม่?`)) {
      setListings(prev => prev.filter(item => !selectedListingIds.includes(item.id)));
      setSelectedListingIds([]);
      alert('ลบรายการประกาศเรียบร้อยแล้ว');
    }
  };

  const handleExport = () => {
    alert('ส่งออกข้อมูลประกาศสำเร็จ (Mock CSV/Excel Exported)');
  };

  const handleSelectRow = (id: string) => {
    setSelectedListingIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSelectAllRows = () => {
    const paginatedIds = currentPaginatedListings.map(l => l.id);
    const allSelected = paginatedIds.every(id => selectedListingIds.includes(id));
    if (allSelected) {
      setSelectedListingIds(prev => prev.filter(id => !paginatedIds.includes(id)));
    } else {
      setSelectedListingIds(prev => {
        const newSelection = [...prev];
        paginatedIds.forEach(id => {
          if (!newSelection.includes(id)) newSelection.push(id);
        });
        return newSelection;
      });
    }
  };

  const handleTogglePin = (id: string) => {
    setListings(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, pinned: !item.pinned };
      }
      return item;
    }));
  };

  const handleToggleStatus = (id: string) => {
    setListings(prev => prev.map(item => {
      if (item.id === id) {
        const nextStatus = item.status === 'online' ? 'offline' : 'online';
        return { ...item, status: nextStatus };
      }
      return item;
    }));
  };

  const handleViewItem = (item: Listing) => {
    alert(`รายละเอียดประกาศ (Ref: ${item.refNo})\nหัวข้อ: ${item.title}\nโครงการ: ${item.project}\nทำเล: ${item.location}\nราคาขาย: ${item.sellPrice ? formatCurrency(item.sellPrice) + ' บาท' : '-'}\nราคาเช่า: ${item.rentPrice ? formatCurrency(item.rentPrice) + ' บาท/เดือน' : '-'}`);
  };

  const handleEditItem = (item: Listing) => {
    alert(`แก้ไขประกาศ Ref: ${item.refNo}\n(ในระบบจริงจะนำท่านไปยังหน้าแก้ไขฟอร์มประกาศ)`);
  };

  const handleCopyItemLink = (item: Listing) => {
    navigator.clipboard.writeText(`https://www.stayverse.com/listings/${item.id}`);
    alert(`คัดลอกลิงก์ของประกาศ Ref: ${item.refNo} แล้ว!`);
  };

  const handleDeleteItem = (id: string) => {
    if (confirm('คุณแน่ใจว่าต้องการลบประกาศนี้ใช่หรือไม่?')) {
      setListings(prev => prev.filter(item => item.id !== id));
      setSelectedListingIds(prev => prev.filter(x => x !== id));
      alert('ลบประกาศสำเร็จ');
    }
  };

  const formatCurrency = (val: number | null) => {
    if (val === null) return '-';
    return new Intl.NumberFormat('th-TH', { style: 'decimal' }).format(val);
  };

  const formatDateTime = (val: string | null | undefined) => {
    if (!val || val === '-') return '-';
    return val;
  };

  // Tab Badge counts from total list
  const tabCounts = React.useMemo(() => {
    return {
      all: listings.length,
      online: listings.filter(l => l.status === 'online').length,
      offline: listings.filter(l => l.status === 'offline').length,
      draft: listings.filter(l => l.status === 'draft').length,
      reject: listings.filter(l => l.status === 'reject').length,
      soldRent: listings.filter(l => l.status === 'soldRent').length,
      expire: listings.filter(l => l.status === 'expire').length,
    };
  }, [listings]);

  // Filtering + Sorting logic
  const filteredListings = React.useMemo(() => {
    return listings
      .filter((item) => {
        // Tab Filter
        if (activeTab !== 'all' && item.status !== activeTab) {
          return false;
        }

        // Keyword Search (matches refNo, title, project, location, mrtBts, or creator)
        if (searchKeyword.trim() !== '') {
          const kw = searchKeyword.toLowerCase();
          const matchesKw =
            item.refNo.toLowerCase().includes(kw) ||
            item.title.toLowerCase().includes(kw) ||
            item.project.toLowerCase().includes(kw) ||
            item.location.toLowerCase().includes(kw) ||
            item.mrtBts.toLowerCase().includes(kw) ||
            item.createdBy.toLowerCase().includes(kw);
          if (!matchesKw) return false;
        }

        // Advanced Filters
        if (filterProject !== '') {
          if (item.project !== filterProject) return false;
        }
        if (filterPropertyType !== '') {
          if (item.propertyType !== filterPropertyType) return false;
        }
        if (filterLocation !== '') {
          if (item.location !== filterLocation) return false;
        }
        if (filterMrtBts !== '') {
          if (item.mrtBts !== filterMrtBts) return false;
        }
        if (filterBedrooms !== '') {
          if (item.roomType !== filterBedrooms) return false;
        }
        if (filterSoldRented !== '') {
          if (filterSoldRented === 'soldRent') {
            if (item.status !== 'soldRent') return false;
          } else if (filterSoldRented === 'available') {
            if (item.status === 'soldRent') return false;
          }
        }
        if (filterFloor !== '') {
          if (item.floor !== filterFloor) return false;
        }
        if (filterMinPrice !== '') {
          const min = parseFloat(filterMinPrice);
          const prices = [];
          if (item.sellPrice !== null) prices.push(item.sellPrice);
          if (item.rentPrice !== null) prices.push(item.rentPrice);
          if (prices.length > 0) {
            const matchesMin = prices.some(p => p >= min);
            if (!matchesMin) return false;
          } else {
            return false;
          }
        }
        if (filterMaxPrice !== '') {
          const max = parseFloat(filterMaxPrice);
          const prices = [];
          if (item.sellPrice !== null) prices.push(item.sellPrice);
          if (item.rentPrice !== null) prices.push(item.rentPrice);
          if (prices.length > 0) {
            const matchesMax = prices.some(p => p <= max);
            if (!matchesMax) return false;
          } else {
            return false;
          }
        }
        if (filterDealType !== '') {
          if (filterDealType === 'sell' && item.sellPrice === null) return false;
          if (filterDealType === 'rent' && item.rentPrice === null) return false;
          if (filterDealType === 'both' && (item.sellPrice === null || item.rentPrice === null)) return false;
        }
        if (filterCreatedDate !== '') {
          if (!item.postDate.startsWith(filterCreatedDate)) return false;
        }
        if (filterCreatedBy !== '') {
          if (item.createdBy !== filterCreatedBy) return false;
        }
        if (filterTags !== '') {
          if (item.tags.indexOf(filterTags) === -1) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filterSortBy === 'newest') {
          return new Date(b.postDate).getTime() - new Date(a.postDate).getTime();
        } else if (filterSortBy === 'oldest') {
          return new Date(a.postDate).getTime() - new Date(b.postDate).getTime();
        } else if (filterSortBy === 'price_asc') {
          const priceA = a.sellPrice || a.rentPrice || 0;
          const priceB = b.sellPrice || b.rentPrice || 0;
          return priceA - priceB;
        } else if (filterSortBy === 'price_desc') {
          const priceA = a.sellPrice || a.rentPrice || 0;
          const priceB = b.sellPrice || b.rentPrice || 0;
          return priceB - priceA;
        } else if (filterSortBy === 'views') {
          return b.views - a.views;
        }
        return 0;
      });
  }, [
    listings,
    activeTab,
    searchKeyword,
    filterProject,
    filterPropertyType,
    filterLocation,
    filterMrtBts,
    filterBedrooms,
    filterSoldRented,
    filterFloor,
    filterMinPrice,
    filterMaxPrice,
    filterDealType,
    filterCreatedDate,
    filterCreatedBy,
    filterSortBy,
    filterTags,
  ]);

  const totalPages = Math.ceil(filteredListings.length / listingsPerPage);
  
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [filteredListings, totalPages, currentPage]);

  const currentPaginatedListings = React.useMemo(() => {
    const startIdx = (currentPage - 1) * listingsPerPage;
    return filteredListings.slice(startIdx, startIdx + listingsPerPage);
  }, [filteredListings, currentPage, listingsPerPage]);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      if (currentPage <= 2) {
        end = 4;
      }
      if (currentPage >= totalPages - 1) {
        start = totalPages - 3;
      }
      
      if (start > 2) {
        pages.push(-1);
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (end < totalPages - 1) {
        pages.push(-1);
      }
      
      pages.push(totalPages);
    }
    
    return pages;
  };

  // Fallback translation helper
  const tAdmin = adminTranslations[language as 'th' | 'en'] || adminTranslations['th'];

  const linkToCopy = "https://www.stayverse.com/?qa=1";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(linkToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Tab config matching the screenshot
  const tabConfig = [
    { id: 'online', label: 'Online', countKey: 'online' as const, color: 'text-purple-600', activeBorder: 'border-purple-650 text-purple-650 bg-purple-50/30', icon: CheckCircle },
    { id: 'offline', label: 'Offline', countKey: 'offline' as const, color: 'text-gray-500', activeBorder: 'border-gray-550 text-gray-750 bg-gray-50/40', icon: XCircle },
    { id: 'draft', label: 'Draft', countKey: 'draft' as const, color: 'text-amber-500', activeBorder: 'border-amber-500 text-amber-600 bg-amber-50/30', icon: FileText },
    { id: 'reject', label: 'Reject', countKey: 'reject' as const, color: 'text-red-500', activeBorder: 'border-red-500 text-red-600 bg-red-50/30', icon: ShieldAlert },
    { id: 'soldRent', label: 'Sold/Rent', countKey: 'soldRent' as const, color: 'text-emerald-600', activeBorder: 'border-emerald-600 text-emerald-600 bg-emerald-50/30', icon: Tag },
    { id: 'expire', label: 'Expire', countKey: 'expire' as const, color: 'text-zinc-700', activeBorder: 'border-zinc-800 text-zinc-900 bg-zinc-55', icon: Clock },
  ];

  const renderPagination = (size: 'sm' | 'md') => {
    if (totalPages <= 1) return null;
    
    return (
      <div className={`flex items-center space-x-1 select-none ${size === 'sm' ? 'scale-90 origin-right' : ''}`}>
        {/* First Button */}
        <button
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
          className="px-2 py-1.5 text-[11px] font-bold rounded border border-gray-200 bg-white hover:bg-gray-50 text-gray-650 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
        >
          « First
        </button>

        {/* Page numbers */}
        {getPageNumbers().map((page, idx) => {
          if (page === -1) {
            return <span key={`dots-${size}-${idx}`} className="px-1.5 py-0.5 text-xs text-gray-400 font-bold">...</span>;
          }
          return (
            <button
              key={`page-${size}-${page}`}
              onClick={() => setCurrentPage(page)}
              className={`px-2.5 py-1 text-[11px] font-bold rounded border cursor-pointer transition-all ${
                currentPage === page
                  ? 'bg-[#CF7536] text-white border-[#CF7536] shadow-sm'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          );
        })}

        {/* Next Button */}
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-2 py-1.5 text-[11px] font-bold rounded border border-gray-200 bg-white hover:bg-gray-50 text-gray-650 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
        >
          Next »
        </button>

        {/* Last Button */}
        <button
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
          className="px-2 py-1.5 text-[11px] font-bold rounded border border-gray-200 bg-white hover:bg-gray-50 text-gray-650 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
        >
          Last »
        </button>
      </div>
    );
  };

  if (!isMounted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-800">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#CF7536]"></div>
      </div>
    );
  }

  return (
    <AdminShell activeItem={activeItem} setActiveItem={setActiveItem} role={role}>

        {/* 3. MAIN DASHBOARD CONTENT AREA */}
        <main className="flex-1 min-w-0 overflow-y-auto p-4 md:p-6 lg:p-8 flex flex-col justify-between">
          <div>
            {activeItem === 'listingInfo' || activeItem === 'allListings' || activeItem.endsWith('Listings') ? (
              <>
                {/* A. TITLE AND BREADCRUMBS BAR */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-800 flex items-center gap-2">
                      <FileText className="w-7 h-7 text-[#CF7536]" />
                      <span>ข้อมูลประกาศ</span>
                    </h1>
                    <p className="text-xs text-gray-400 font-medium mt-1">จัดการรายการอสังหาริมทรัพย์ทั้งหมดในระบบ</p>
                  </div>
                  
                  {/* Breadcrumbs */}
                  <div className="flex items-center space-x-2 text-xs font-semibold text-gray-500 bg-white px-3 py-1.5 rounded-lg border border-gray-200/60 shadow-sm select-none">
                    <button onClick={() => setActiveItem('overview')} className="hover:text-[#CF7536] transition-colors cursor-pointer font-bold">Admin</button>
                    <span className="text-gray-300">/</span>
                    <span className="text-gray-400 font-medium font-bold">ข้อมูลประกาศ</span>
                  </div>
                </div>

                {/* B. TABS + ACTION BUTTONS ROW */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                  {/* Status filter tabs */}
                  <div className="flex items-center space-x-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none select-none">
                    {tabConfig.map((tab) => {
                      const IconComponent = tab.icon;
                      const count = tabCounts[tab.countKey];
                      const isActive = activeTab === tab.id;
                      
                      return (
                        <button
                          key={tab.id}
                          onClick={() => handleTabClick(tab.id as any)}
                          className={`flex items-center space-x-2 px-4 py-2 text-xs font-bold rounded-lg border transition-all duration-200 whitespace-nowrap cursor-pointer ${
                            isActive
                              ? `${tab.activeBorder} shadow-sm font-extrabold`
                              : `bg-white hover:bg-gray-50 border-gray-200 ${tab.color}`
                          }`}
                        >
                          <IconComponent className={`w-3.5 h-3.5 ${isActive ? '' : tab.color}`} />
                          <span className={isActive ? '' : 'text-gray-700 font-semibold'}>{tab.label}</span>
                          <span className={`px-1.5 py-0.2 rounded text-[10px] ${
                            isActive 
                              ? 'bg-black/10 text-current' 
                              : `bg-gray-105 ${tab.color} border border-current/10`
                          }`}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Top Action Buttons (Add Listing, Export, and Delete Selected) */}
                  <div className="flex items-center gap-2 self-end lg:self-auto select-none">
                    {/* Delete Selected (Conditional) */}
                    {selectedListingIds.length > 0 && (
                      <motion.button
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        onClick={handleDeleteSelected}
                        className="flex items-center space-x-1.5 bg-red-500 hover:bg-red-650 text-white text-xs font-bold px-3.5 py-2.5 rounded-lg shadow-sm transition-colors cursor-pointer border border-red-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>ลบ ({selectedListingIds.length})</span>
                      </motion.button>
                    )}

                    {/* Export Button (Orange) */}
                    <button
                      onClick={handleExport}
                      className="flex items-center space-x-1.5 bg-[#F1A22E] hover:bg-[#d68e22] text-white text-xs font-bold px-3.5 py-2.5 rounded-lg shadow-sm transition-colors cursor-pointer border border-[#d68e22]"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>ส่งออกข้อมูล</span>
                    </button>


                  </div>
                </div>

                {/* C. SEARCH AND FILTER CONTROL CARD */}
                <div className="bg-white rounded-2xl border border-gray-200/70 p-5 shadow-sm mb-6">
                  <div className="flex flex-col md:flex-row gap-3">
                    {/* Keyword input */}
                    <div className="relative flex-1">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                      <input
                        type="text"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        placeholder="Keyword here"
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 hover:border-gray-300 focus:border-[#CF7536] focus:bg-white rounded-xl text-xs md:text-sm text-gray-700 font-semibold focus:outline-none transition-all duration-200 shadow-inner-sm"
                      />
                    </div>

                    {/* Controls row */}
                    <div className="flex items-center gap-2 select-none">
                      {/* Filter toggle button */}
                      <button
                        onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                        className={`flex items-center space-x-1.5 px-4 py-2.5 text-xs font-bold rounded-xl border transition-all duration-200 cursor-pointer ${
                          showAdvancedFilters 
                            ? 'bg-gray-100 text-gray-800 border-gray-350 shadow-inner font-extrabold' 
                            : 'bg-white text-gray-600 hover:bg-gray-50 border-gray-200 hover:border-gray-350'
                        }`}
                      >
                        <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${showAdvancedFilters ? 'transform rotate-180 text-purple-600' : 'text-gray-400'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                        </svg>
                        <span>Filter</span>
                      </button>

                      {/* Search / Submit button */}
                      <button
                        onClick={() => setCurrentPage(1)}
                        className="flex items-center space-x-1.5 px-5 py-2.5 bg-[#5B21B6] hover:bg-[#4C1D95] text-white text-xs font-bold rounded-xl shadow-md shadow-[#5B21B6]/15 transition-all duration-200 cursor-pointer border border-[#4C1D95]"
                      >
                        <Search className="w-3.5 h-3.5" />
                        <span>Search</span>
                      </button>

                      {/* Reset filters button */}
                      <button
                        onClick={handleResetFilters}
                        className="flex items-center space-x-1.5 px-4 py-2.5 bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 hover:border-gray-350 text-xs font-bold rounded-xl transition-all duration-200 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5 text-gray-400" />
                        <span>Reset</span>
                      </button>
                    </div>
                  </div>

                  {/* Collapsible Advanced Filters panel */}
                  <div
                    className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-in-out ${
                      showAdvancedFilters ? 'grid-rows-[1fr] opacity-100 mt-5 pt-5 border-t border-gray-100' : 'grid-rows-[0fr] opacity-0 mt-0 pt-0'
                    } overflow-hidden`}
                  >
                    <div className="min-h-0">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        
                        {/* 1. โครงการ (Project) */}
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-xs font-bold text-gray-600">โครงการ</label>
                          <select
                            value={filterProject}
                            onChange={(e) => { setFilterProject(e.target.value); setCurrentPage(1); }}
                            className="px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-[#CF7536] focus:bg-white transition-all duration-200 cursor-pointer"
                          >
                            <option value="">เลือกโครงการ (All Projects)</option>
                            <option value="La Royale">La Royale</option>
                            <option value="Dream Villa">Dream Villa</option>
                            <option value="Baan Dusit Lake">Baan Dusit Lake</option>
                          </select>
                        </div>

                        {/* 2. ประเภททรัพย์ (Property Type) */}
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-xs font-bold text-gray-600">ประเภทอสังหา</label>
                          <select
                            value={filterPropertyType}
                            onChange={(e) => { setFilterPropertyType(e.target.value); setCurrentPage(1); }}
                            className="px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-[#CF7536] focus:bg-white transition-all duration-200 cursor-pointer"
                          >
                            <option value="">ประเภทอสังหา (All Types)</option>
                            <option value="Condo">คอนโด (Condo)</option>
                            <option value="House">บ้านเดี่ยว (House)</option>
                            <option value="Villa">พูลวิลล่า (Villa)</option>
                            <option value="Townhouse">ทาวน์โฮม (Townhouse)</option>
                          </select>
                        </div>

                        {/* 3. ทำเล (Location) */}
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-xs font-bold text-gray-600">ทำเล</label>
                          <select
                            value={filterLocation}
                            onChange={(e) => { setFilterLocation(e.target.value); setCurrentPage(1); }}
                            className="px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-[#CF7536] focus:bg-white transition-all duration-200 cursor-pointer"
                          >
                            <option value="">ทำเล (All Locations)</option>
                            <option value="Bangkok">กรุงเทพฯ (Bangkok)</option>
                            <option value="Pattaya">พัทยา (Pattaya)</option>
                            <option value="Phuket">ภูเก็ต (Phuket)</option>
                            <option value="Hua Hin">หัวหิน (Hua Hin)</option>
                            <option value="Chiang Mai">เชียงใหม่ (Chiang Mai)</option>
                          </select>
                        </div>

                        {/* 4. รถไฟฟ้า BTS/MRT */}
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-xs font-bold text-gray-600">MRT/BTS</label>
                          <select
                            value={filterMrtBts}
                            onChange={(e) => { setFilterMrtBts(e.target.value); setCurrentPage(1); }}
                            className="px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-[#CF7536] focus:bg-white transition-all duration-200 cursor-pointer"
                          >
                            <option value="">MRT/BTS (All)</option>
                            <option value="BTS Siam">BTS สยาม (Siam)</option>
                            <option value="BTS Ari">BTS อารีย์ (Ari)</option>
                            <option value="MRT Sukhumvit">MRT สุขุมวิท (Sukhumvit)</option>
                            <option value="MRT Rama 9">MRT พระราม 9 (Rama 9)</option>
                            <option value="None">ไม่มี (None)</option>
                          </select>
                        </div>

                        {/* 5. สถานะ (Status) */}
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-xs font-bold text-gray-600">สถานะ</label>
                          <select
                            value={filterStatus}
                            onChange={(e) => { handleStatusFilterChange(e.target.value); setCurrentPage(1); }}
                            className="px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-[#CF7536] focus:bg-white transition-all duration-200 cursor-pointer"
                          >
                            <option value="all">All (ทั้งหมด)</option>
                            <option value="online">ออนไลน์ (Online)</option>
                            <option value="offline">ออฟไลน์ (Offline)</option>
                            <option value="draft">ฉบับร่าง (Draft)</option>
                            <option value="reject">ไม่อนุมัติ (Reject)</option>
                            <option value="soldRent">ขาย/เช่าแล้ว (Sold/Rent)</option>
                            <option value="expire">หมดอายุ (Expire)</option>
                          </select>
                        </div>

                        {/* 6. สถานะขายแล้ว/เช่าแล้ว */}
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-xs font-bold text-gray-600">สถานะขายแล้ว/เช่าแล้ว</label>
                          <select
                            value={filterSoldRented}
                            onChange={(e) => { setFilterSoldRented(e.target.value); setCurrentPage(1); }}
                            className="px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-[#CF7536] focus:bg-white transition-all duration-200 cursor-pointer"
                          >
                            <option value="">All (ทั้งหมด)</option>
                            <option value="soldRent">ขายแล้ว/เช่าแล้ว (Sold/Rented)</option>
                            <option value="available">ยังไม่ขาย/เช่า (Available)</option>
                          </select>
                        </div>

                        {/* 7. ช่วงราคา */}
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-xs font-bold text-gray-600">ช่วงราคา</label>
                          <div className="flex items-center space-x-2">
                            <input
                              type="number"
                              value={filterMinPrice}
                              onChange={(e) => { setFilterMinPrice(e.target.value); setCurrentPage(1); }}
                              placeholder="ราคาต่ำสุด"
                              className="w-1/2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-[#CF7536] focus:bg-white transition-all duration-200"
                            />
                            <span className="text-gray-400 text-xs">-</span>
                            <input
                              type="number"
                              value={filterMaxPrice}
                              onChange={(e) => { setFilterMaxPrice(e.target.value); setCurrentPage(1); }}
                              placeholder="ราคาสูงสุด"
                              className="w-1/2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-[#CF7536] focus:bg-white transition-all duration-200"
                            />
                          </div>
                        </div>

                        {/* 8. ประเภทห้อง */}
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-xs font-bold text-gray-600">ประเภทห้อง</label>
                          <select
                            value={filterBedrooms}
                            onChange={(e) => { setFilterBedrooms(e.target.value); setCurrentPage(1); }}
                            className="px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-[#CF7536] focus:bg-white transition-all duration-200 cursor-pointer"
                          >
                            <option value="">จำนวนห้องนอน</option>
                            <option value="1 Bedroom">1 ห้องนอน (1 Bed)</option>
                            <option value="2 Bedrooms">2 ห้องนอน (2 Beds)</option>
                            <option value="3 Bedrooms">3 ห้องนอน (3 Beds)</option>
                            <option value="4 Bedrooms">4+ ห้องนอน (4+ Beds)</option>
                          </select>
                        </div>

                        {/* 9. ชั้น */}
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-xs font-bold text-gray-600">ชั้น</label>
                          <select
                            value={filterFloor}
                            onChange={(e) => { setFilterFloor(e.target.value); setCurrentPage(1); }}
                            className="px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-[#CF7536] focus:bg-white transition-all duration-200 cursor-pointer"
                          >
                            <option value="">ชั้น (ทั้งหมด)</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="17">17</option>
                            <option value="30">30</option>
                          </select>
                        </div>

                        {/* 10. ประเภท */}
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-xs font-bold text-gray-600">ประเภท</label>
                          <select
                            value={filterDealType}
                            onChange={(e) => { setFilterDealType(e.target.value); setCurrentPage(1); }}
                            className="px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-[#CF7536] focus:bg-white transition-all duration-200 cursor-pointer"
                          >
                            <option value="">All (ทั้งหมด)</option>
                            <option value="sell">ขาย (For Sale)</option>
                            <option value="rent">เช่า (For Rent)</option>
                            <option value="both">ขายและเช่า (Sale & Rent)</option>
                          </select>
                        </div>

                        {/* 11. เรียงลำดับ */}
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-xs font-bold text-gray-600">เรียงลำดับ</label>
                          <select
                            value={filterSortBy}
                            onChange={(e) => { setFilterSortBy(e.target.value); setCurrentPage(1); }}
                            className="px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-[#CF7536] focus:bg-white transition-all duration-200 cursor-pointer"
                          >
                            <option value="newest">Sort by (เรียงลำดับล่าสุด)</option>
                            <option value="oldest">เก่าสุด (Oldest)</option>
                            <option value="price_asc">ราคา: ต่ำไปสูง (Price: Low to High)</option>
                            <option value="price_desc">ราคา: สูงไปต่ำ (Price: High to Low)</option>
                            <option value="views">ยอดเข้าชม (Most Viewed)</option>
                          </select>
                        </div>

                        {/* 12. แท็ก */}
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-xs font-bold text-gray-600">แท็ก</label>
                          <select
                            value={filterTags}
                            onChange={(e) => { setFilterTags(e.target.value); setCurrentPage(1); }}
                            className="px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-[#CF7536] focus:bg-white transition-all duration-200 cursor-pointer"
                          >
                            <option value="">Tag (แท็ก)</option>
                            <option value="Sea View">Sea View</option>
                            <option value="Pool Villa">Pool Villa</option>
                            <option value="Corner Unit">Corner Unit</option>
                            <option value="Urgent Sale">Urgent Sale</option>
                            <option value="Modern">Modern</option>
                            <option value="Good Location">Good Location</option>
                          </select>
                        </div>

                        {/* 13. วันที่สร้าง */}
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-xs font-bold text-gray-600">วันที่สร้าง</label>
                          <input
                            type="date"
                            value={filterCreatedDate}
                            onChange={(e) => { setFilterCreatedDate(e.target.value); setCurrentPage(1); }}
                            className="px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-[#CF7536] focus:bg-white transition-all duration-200 text-gray-500"
                          />
                        </div>

                        {/* 14. ผู้สร้าง */}
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-xs font-bold text-gray-600">ผู้สร้าง</label>
                          <select
                            value={filterCreatedBy}
                            onChange={(e) => { setFilterCreatedBy(e.target.value); setCurrentPage(1); }}
                            className="px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-[#CF7536] focus:bg-white transition-all duration-200 cursor-pointer"
                          >
                            <option value="">Please select (ผู้สร้างทั้งหมด)</option>
                            <option value="Super Admin">Super Admin</option>
                            <option value="Agent Somchai">Agent Somchai</option>
                            <option value="Agent Natee">Agent Natee</option>
                          </select>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>

                {/* D. LISTINGS RESULT SUMMARY HEADER */}
                <div className="bg-white rounded-t-2xl border-t border-x border-gray-200/75 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 shadow-sm select-none">
                  <div className="text-xs md:text-sm font-bold text-gray-700">
                    ผลลัพธ์ <span className="text-[#CF7536] text-sm md:text-base font-extrabold">{filteredListings.length}</span> รายการ
                  </div>

                  {/* Top Pagination */}
                  {renderPagination('sm')}
                </div>

                {/* E. LISTINGS TABLE */}
                <div className="bg-white rounded-b-2xl border-b border-x border-gray-200/75 shadow-sm overflow-hidden mb-6">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-250 text-gray-500 text-[10px] md:text-[11px] font-extrabold tracking-wider uppercase select-none">
                          <th className="py-4 px-4 w-12 text-center">
                            <input
                              type="checkbox"
                              checked={currentPaginatedListings.length > 0 && currentPaginatedListings.every(l => selectedListingIds.includes(l.id))}
                              onChange={handleSelectAllRows}
                              className="w-4 h-4 rounded border-gray-300 text-[#CF7536] focus:ring-[#CF7536] cursor-pointer"
                            />
                          </th>
                          <th className="py-4 px-3 w-28 text-center">รูป</th>
                          <th className="py-4 px-4 min-w-[280px]">ชื่อประกาศ</th>
                          <th className="py-4 px-4 text-right w-32">ราคาขาย</th>
                          <th className="py-4 px-4 text-right w-32">ราคาเช่า</th>
                          <th className="py-4 px-4 w-36">วันที่</th>
                          <th className="py-4 px-4 w-32">สร้างโดย</th>
                          <th className="py-4 px-3 text-center w-20">จำนวนวิว</th>
                          <th className="py-4 px-3 text-center w-20">ปักหมุด</th>
                          <th className="py-4 px-3 text-center w-24">Status</th>
                          <th className="py-4 px-4 text-center w-36">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 text-xs font-semibold text-gray-700">
                        {currentPaginatedListings.length === 0 ? (
                          <tr>
                            <td colSpan={11} className="py-12 text-center text-gray-400 font-medium bg-gray-50/30">
                              <div className="flex flex-col items-center justify-center space-y-2">
                                <Search className="w-8 h-8 text-gray-300" />
                                <span>ไม่พบข้อมูลประกาศตามตัวกรองที่ระบุ</span>
                              </div>
                            </td>
                          </tr>
                        ) : (
                          currentPaginatedListings.map((item) => {
                            const isChecked = selectedListingIds.includes(item.id);
                            return (
                              <tr 
                                key={item.id}
                                className={`hover:bg-gray-50/60 transition-colors duration-150 ${isChecked ? 'bg-[#CF7536]/5' : ''}`}
                              >
                                {/* 1. Checkbox */}
                                <td className="py-4 px-4 text-center">
                                  <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => handleSelectRow(item.id)}
                                    className="w-4 h-4 rounded border-gray-300 text-[#CF7536] focus:ring-[#CF7536] cursor-pointer"
                                  />
                                </td>

                                {/* 2. Image */}
                                <td className="py-4 px-3">
                                  <div className="relative w-24 h-16 rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-gray-100 mx-auto">
                                    <img
                                      src={item.imageUrl}
                                      alt={item.title}
                                      className="w-full h-full object-cover"
                                      onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200&auto=format&fit=crop&q=60';
                                      }}
                                    />
                                    {/* Deal type badge overlay */}
                                    <div className="absolute top-1 left-1 flex gap-0.5 select-none">
                                      {item.sellPrice !== null && (
                                        <span className="bg-emerald-600 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded shadow-sm">
                                          ขาย
                                        </span>
                                      )}
                                      {item.rentPrice !== null && (
                                        <span className="bg-[#0088FF] text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded shadow-sm">
                                          เช่า
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </td>

                                {/* 3. Description details */}
                                <td className="py-4 px-4">
                                  <div className="space-y-1 text-left">
                                    <div className="flex items-center space-x-1.5 select-none">
                                      <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded border border-gray-200">
                                        Ref: {item.refNo}
                                      </span>
                                      <span className="text-[10px] text-gray-400 font-medium">
                                        {item.location} • {item.propertyType}
                                      </span>
                                    </div>
                                    
                                    <a 
                                      href={`/listings/${item.id}`}
                                      target="_blank"
                                      rel="noopener noreferrer" 
                                      className="text-blue-600 hover:text-[#CF7536] text-xs font-bold leading-normal block hover:underline transition-all"
                                    >
                                      {item.title}
                                    </a>
                                    
                                    <div className="text-[10px] text-gray-500 font-medium flex flex-wrap gap-x-2 gap-y-0.5 items-center">
                                      <span>พื้นที่ : {item.area.toFixed(2)} ตร.ม.</span>
                                      <span>ชั้น : {item.floor}</span>
                                      <span>โครงการ: {item.project}</span>
                                      {item.mrtBts !== 'None' && (
                                        <>
                                          <span className="text-[#0088FF] font-semibold">{item.mrtBts}</span>
                                        </>
                                      )}
                                    </div>
                                    
                                    <div className="text-[10.5px] text-gray-400 font-bold flex items-center gap-1.5 mt-1 select-none">
                                      <PlusCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                      <span>บันทึกล่าสุด : {formatDateTime(item.editDate)}</span>
                                    </div>
                                  </div>
                                </td>

                                {/* 4. Sell Price */}
                                <td className="py-4 px-4 text-right text-gray-850 font-extrabold font-mono text-xs">
                                  {item.sellPrice !== null ? `${formatCurrency(item.sellPrice)}` : '-'}
                                </td>

                                {/* 5. Rent Price */}
                                <td className="py-4 px-4 text-right text-gray-850 font-extrabold font-mono text-xs">
                                  {item.rentPrice !== null ? `${formatCurrency(item.rentPrice)}` : '-'}
                                </td>

                                {/* 6. วันที่ Stacked */}
                                <td className="py-4 px-4 text-left">
                                  <div className="space-y-1 font-medium text-[10px] text-gray-500">
                                    <div className="flex items-center">
                                      <span className="w-10 text-gray-400">สร้าง :</span>
                                      <span className="font-mono text-gray-700">{formatDateTime(item.postDate)}</span>
                                    </div>
                                    <div className="flex items-center">
                                      <span className="w-10 text-gray-400">แก้ไข :</span>
                                      <span className="font-mono text-gray-700">{formatDateTime(item.editDate)}</span>
                                    </div>
                                    <div className="flex items-center">
                                      <span className="w-10 text-gray-400">บันทึก :</span>
                                      <span className="font-mono text-gray-700">{formatDateTime(item.saveDate)}</span>
                                    </div>
                                  </div>
                                </td>

                                {/* 7. สร้างโดย */}
                                <td className="py-4 px-4 text-gray-600 text-left">
                                  {item.createdBy && item.createdBy !== '-' ? (
                                    <div className="flex items-center space-x-1.5">
                                      <div className="w-5 h-5 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-[9px] font-extrabold uppercase shrink-0">
                                        {item.createdBy.charAt(0)}
                                      </div>
                                      <span className="text-[11px] font-bold text-gray-700 truncate max-w-[90px]">{item.createdBy}</span>
                                    </div>
                                  ) : (
                                    <span className="text-gray-400">-</span>
                                  )}
                                </td>

                                {/* 8. จำนวนวิว */}
                                <td className="py-4 px-3 text-center text-gray-500 font-mono text-xs">
                                  <span>{item.views}</span>
                                </td>

                                {/* 9. ปักหมุด (YES / NO) */}
                                <td className="py-4 px-3 text-center">
                                  <button
                                    onClick={() => handleTogglePin(item.id)}
                                    className={`px-2 py-0.5 rounded text-[10px] font-extrabold cursor-pointer border transition-colors ${
                                      item.pinned 
                                        ? 'bg-emerald-50 text-emerald-600 border-emerald-250 hover:bg-emerald-100' 
                                        : 'bg-red-50 text-red-650 border-red-250 hover:bg-red-100'
                                    }`}
                                  >
                                    {item.pinned ? 'YES' : 'NO'}
                                  </button>
                                </td>

                                {/* 10. Status */}
                                <td className="py-4 px-3 text-center">
                                  <button
                                    onClick={() => handleToggleStatus(item.id)}
                                    className="flex flex-col items-center justify-center mx-auto cursor-pointer focus:outline-none"
                                  >
                                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${
                                      item.status === 'online'
                                        ? 'bg-emerald-50 text-emerald-600 border-emerald-250'
                                        : item.status === 'offline'
                                        ? 'bg-gray-100 text-gray-500 border-gray-250'
                                        : item.status === 'soldRent'
                                        ? 'bg-blue-50 text-blue-600 border-blue-250'
                                        : item.status === 'reject'
                                        ? 'bg-red-50 text-red-650 border-red-250'
                                        : 'bg-amber-50 text-amber-600 border-amber-250'
                                    }`}>
                                      {item.status === 'online' ? 'ON' : item.status === 'offline' ? 'OFF' : item.status === 'soldRent' ? 'SOLD' : item.status === 'reject' ? 'REJ' : 'DRAFT'}
                                    </span>
                                    {item.status === 'online' && (
                                      <span className="text-[10.5px] text-emerald-600 font-extrabold mt-0.5 select-none">ว่าง</span>
                                    )}
                                  </button>
                                </td>

                                {/* 11. Action */}
                                <td className="py-4 px-4 text-center">
                                  <div className="flex items-center justify-center space-x-1.5">
                                    <button
                                      onClick={() => handleViewItem(item)}
                                      className="p-1 text-blue-500 hover:bg-blue-50 rounded transition-colors cursor-pointer"
                                      title="ดูรายละเอียด"
                                    >
                                      <Eye className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => handleEditItem(item)}
                                      className="p-1 text-amber-600 hover:bg-amber-50 rounded transition-colors cursor-pointer"
                                      title="แก้ไขประกาศ"
                                    >
                                      <Pencil className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => {
                                        window.open(`/listings/${item.id}`, '_blank');
                                      }}
                                      className="p-1 text-gray-500 hover:bg-gray-100 rounded transition-colors cursor-pointer"
                                      title="เปิดลิงก์"
                                    >
                                      <ExternalLink className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteItem(item.id)}
                                      className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors cursor-pointer"
                                      title="ลบประกาศ"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Bottom Pagination Bar */}
                  {totalPages > 1 && (
                    <div className="bg-gray-50 border-t border-gray-100 px-4 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 select-none">
                      <div className="text-xs font-semibold text-gray-500">
                        แสดงหน้า {currentPage} จากทั้งหมด {totalPages} หน้า
                      </div>
                      {renderPagination('md')}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Standard overview dashboard content */}
                {/* Title & Breadcrumbs Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-3">
                  <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-800">
                    {tAdmin.dashboardTitle}
                  </h1>
                  
                  {/* Breadcrumbs */}
                  <div className="flex items-center space-x-2 text-xs font-semibold text-gray-500">
                    <a href="/" className="hover:text-[#CF7536] transition-colors">{tAdmin.breadcrumbsHome}</a>
                    <span className="text-gray-300">/</span>
                    <span className="text-gray-400 font-medium">{tAdmin.breadcrumbsOverview}</span>
                  </div>
                </div>

                {/* A. FOUR STAT CARDS GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
                  {/* Card 1: Total Listings (Orange/Amber) */}
                  <motion.div 
                    whileHover={{ y: -4, shadow: '0 12px 20px rgba(0,0,0,0.08)' }}
                    className="bg-[#F1A22E] rounded-xl text-white p-5 relative overflow-hidden shadow-md flex justify-between items-center cursor-pointer transition-shadow"
                  >
                    <div className="z-10">
                      <span className="text-4xl font-extrabold tracking-tight">108</span>
                      <p className="text-xs font-semibold uppercase tracking-wider opacity-90 mt-1">{tAdmin.totalListings}</p>
                    </div>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-20">
                      {/* Grid Icon overlay */}
                      <LayoutDashboard className="w-16 h-16 transform rotate-6" />
                    </div>
                  </motion.div>

                  {/* Card 2: Online Listings (Green) */}
                  <motion.div 
                    whileHover={{ y: -4, shadow: '0 12px 20px rgba(0,0,0,0.08)' }}
                    className="bg-[#28C76F] rounded-xl text-white p-5 relative overflow-hidden shadow-md flex justify-between items-center cursor-pointer transition-shadow"
                  >
                    <div className="z-10">
                      <span className="text-4xl font-extrabold tracking-tight">99</span>
                      <p className="text-xs font-semibold uppercase tracking-wider opacity-90 mt-1">{tAdmin.onlineListings}</p>
                    </div>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-20">
                      {/* Globe Icon overlay */}
                      <Globe className="w-16 h-16 transform -rotate-12" />
                    </div>
                  </motion.div>

                  {/* Card 3: Sold/Rented Listings (Blue) */}
                  <motion.div 
                    whileHover={{ y: -4, shadow: '0 12px 20px rgba(0,0,0,0.08)' }}
                    className="bg-[#0088FF] rounded-xl text-white p-5 relative overflow-hidden shadow-md flex justify-between items-center cursor-pointer transition-shadow"
                  >
                    <div className="z-10">
                      <span className="text-4xl font-extrabold tracking-tight">3</span>
                      <p className="text-xs font-semibold uppercase tracking-wider opacity-90 mt-1">{tAdmin.soldRentedListings}</p>
                    </div>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-20">
                      {/* Check Icon overlay */}
                      <Check className="w-16 h-16 stroke-[3]" />
                    </div>
                  </motion.div>

                  {/* Card 4: Offline Listings (Red) */}
                  <motion.div 
                    whileHover={{ y: -4, shadow: '0 12px 20px rgba(0,0,0,0.08)' }}
                    className="bg-[#EA5455] rounded-xl text-white p-5 relative overflow-hidden shadow-md flex justify-between items-center cursor-pointer transition-shadow"
                  >
                    <div className="z-10">
                      <span className="text-4xl font-extrabold tracking-tight">9</span>
                      <p className="text-xs font-semibold uppercase tracking-wider opacity-90 mt-1">{tAdmin.offlineListings}</p>
                    </div>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-20">
                      {/* Minus Icon overlay */}
                      <div className="w-16 h-16 rounded-full border-4 border-white/80 flex items-center justify-center">
                        <div className="w-8 h-1 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* B. SECOND ROW: REQUEST LINK & MEMBER SUMMARY (2 columns on large screen) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  
                  {/* CARD: Request Link */}
                  <div className="bg-white rounded-2xl border border-gray-200/70 p-6 shadow-sm flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2 font-sans tracking-tight">
                        {tAdmin.requestLinkTitle}
                      </h3>
                      <p className="text-xs text-gray-400 font-medium mb-6 leading-relaxed">
                        {tAdmin.requestLinkDesc}
                      </p>
                      
                      {/* Input field with Copy Button */}
                      <div className="flex items-center space-x-2 bg-gray-50 border border-gray-200 p-1 rounded-xl mb-6">
                        <input
                          type="text"
                          readOnly
                          value={linkToCopy}
                          className="flex-1 bg-transparent px-3 py-2 text-xs font-medium text-gray-600 focus:outline-none select-all"
                        />
                        
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={handleCopyLink}
                          className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all duration-300 flex items-center space-x-1.5 cursor-pointer shadow-sm ${
                            copied 
                              ? 'bg-emerald-500 text-white' 
                              : 'bg-[#0088FF] hover:bg-[#0077EE] text-white'
                          }`}
                        >
                          {copied ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>{tAdmin.copiedButton}</span>
                            </>
                          ) : (
                            <span>{tAdmin.copyButton}</span>
                          )}
                        </motion.button>
                      </div>
                    </div>

                    {/* Social media sharing shortcuts */}
                    <div>
                      <div className="flex items-center space-x-3.5">
                        {/* Line icon (styled green) */}
                        <a 
                          href={`https://line.me/R/msg/text/?${encodeURIComponent(linkToCopy)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-full bg-[#06C755] hover:bg-[#05b04b] text-white flex items-center justify-center shadow-sm hover:scale-110 transition-transform duration-200"
                          title="Share to Line"
                        >
                          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                            <path d="M24 10.3c0-4.8-5.4-8.8-12-8.8s-12 4-12 8.8c0 4.3 4.3 8 10.1 8.7.4.1.9.3 1 .6l.4 2.5c0 .3.2.5.4.5a.7.7 0 00.3-.1c.3-.2 4.4-2.8 6-4.7 3.7-1.8 5.8-4.5 5.8-7.5zm-15.6 3h-1.6c-.3 0-.6-.3-.6-.6v-4.8c0-.3.3-.6.6-.6h1.6c.3 0 .6.3.6.6v4.8c0 .3-.3.6-.6.6zm3.9-.6c0 .3-.3.6-.6.6h-2.1c-.3 0-.6-.3-.6-.6V8.1c0-.3.3-.6.6-.6s.6.3.6.6v4.2h1.5c.3 0 .6.3.6.6zm2.2.6h-1.6c-.3 0-.6-.3-.6-.6v-4.8c0-.3.3-.6.6-.6s.6.3.6.6v4.8c0 .3-.3.6-.6.6zm4.8 0h-1.6c-.3 0-.6-.3-.6-.6v-2l-1.4 2.1a.6.6 0 01-.5.3h-.1a.6.6 0 01-.5-.6V8.1c0-.3.3-.6.6-.6s.6.3.6.6v2l1.4-2.1a.6.6 0 01.5-.3h.1a.6.6 0 01.5.6v4.8c0 .3-.3.6-.6.6z" />
                          </svg>
                        </a>

                        {/* Facebook icon (styled blue) */}
                        <a 
                          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(linkToCopy)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-full bg-[#1877F2] hover:bg-[#166fe5] text-white flex items-center justify-center shadow-sm hover:scale-110 transition-transform duration-200"
                          title="Share to Facebook"
                        >
                          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                            <path d="M9 8H7v3h2v9h3v-9h2.7l.3-3H12V6.5c0-.8.2-1 1-1h1.7V2H12c-2.7 0-3 1.7-3 3.5V8z" />
                          </svg>
                        </a>

                        {/* X (formerly Twitter) icon (styled black) */}
                        <a 
                          href={`https://x.com/intent/tweet?url=${encodeURIComponent(linkToCopy)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-full bg-black hover:bg-gray-800 text-white flex items-center justify-center shadow-sm hover:scale-110 transition-transform duration-200"
                          title="Share to X"
                        >
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M18.2 2.4h3.3L14.3 11l8.5 11.3h-6.7L10.9 15l-6 7.3H1.6l7.7-8.8L1.2 2.4H8l4.7 6.2 5.5-6.2zm-1.2 17.5h1.8L7.1 4.7H5.2l11.8 15.2z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* CARD: Member Summary */}
                  <div className="bg-white rounded-2xl border border-gray-200/70 p-6 shadow-sm flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-6 font-sans tracking-tight">
                        {tAdmin.memberSummaryTitle}
                      </h3>
                      
                      <div className="space-y-4">
                        {/* Total members */}
                        <div className="flex items-center justify-between py-1.5">
                          <span className="text-sm font-semibold text-[#28C76F]">{tAdmin.totalMembers}</span>
                          <span className="text-lg font-bold text-gray-700">22</span>
                        </div>
                        
                        {/* Divider line */}
                        <div className="h-[1px] bg-gray-100 w-full"></div>
                        
                        {/* New members this month */}
                        <div className="flex items-center justify-between py-1.5">
                          <span className="text-sm font-semibold text-[#F1A22E]">{tAdmin.newMembersMonth}</span>
                          <span className="text-lg font-bold text-gray-700">1</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Empty slot placeholder for beautiful balance */}
                    <div className="h-4"></div>
                  </div>
                </div>

                {/* C. THIRD ROW: WHAT'S NEW NEWS FEED (Full width) */}
                <div className="bg-white rounded-2xl border border-gray-200/70 p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 font-sans tracking-tight flex items-center space-x-2">
                    <span>{tAdmin.whatsNewTitle}</span>
                  </h3>
                  
                  {/* Badges Container */}
                  <div className="flex flex-wrap items-center gap-2.5 mb-6">
                    <span className="bg-[#7367F0]/10 text-[#7367F0] text-xs font-bold px-3 py-1 rounded-md flex items-center space-x-1">
                      <Tag className="w-3.5 h-3.5" />
                      <span>v.18.11.2025</span>
                    </span>
                    
                    <span className="bg-[#0088FF]/10 text-[#0088FF] text-xs font-bold px-3 py-1 rounded-md flex items-center space-x-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>18 พ.ย. 2568</span>
                    </span>
                  </div>
                  
                  {/* Detailed News Item */}
                  <div className="space-y-4 text-sm leading-relaxed text-gray-600">
                    <h4 className="text-base font-bold text-gray-800 leading-snug">
                      {tAdmin.newsTitle}
                    </h4>
                    
                    <ul className="list-disc pl-5 space-y-1 text-gray-700 font-semibold text-xs md:text-sm">
                      <li>{tAdmin.newsSubtitle1}</li>
                      <li>{tAdmin.newsSubtitle2}</li>
                    </ul>
                    
                    <p className="text-xs md:text-sm text-gray-500 text-justify pt-1 leading-relaxed">
                      {tAdmin.newsDescription}
                    </p>
                    
                    <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 mt-4 space-y-2 text-xs md:text-sm font-semibold text-gray-700">
                      <div className="flex items-start">
                        <span className="text-[#CF7536] w-20 shrink-0">Date/Time:</span>
                        <span className="text-gray-600">{tAdmin.newsDate}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-[#CF7536] w-20 shrink-0">Location:</span>
                        <span className="text-gray-600">{tAdmin.newsVenue}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </AdminShell>
    );
}
