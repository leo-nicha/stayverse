'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminShell } from '../AdminShell';
import { Plus, Trash2, Search, BookOpen } from 'lucide-react';
import { useTranslation } from '@/context/LanguageContext';

interface EducationItem {
  id: string;
  nameTh: string;
  nameEn: string;
  type: 'School' | 'University' | 'International School';
}

export default function SetEducationPage() {
  const router = useRouter();
  const { language } = useTranslation();

  const [institutions, setInstitutions] = useState<EducationItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [nameTh, setNameTh] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [type, setType] = useState<EducationItem['type']>('School');

  const initialEdu: EducationItem[] = [
    { id: '1', nameTh: 'จุฬาลงกรณ์มหาวิทยาลัย', nameEn: 'Chulalongkorn University', type: 'University' },
    { id: '2', nameTh: 'มหาวิทยาลัยธรรมศาสตร์', nameEn: 'Thammasat University', type: 'University' },
    { id: '3', nameTh: 'โรงเรียนเตรียมอุดมศึกษา', nameEn: 'Triam Udom Suksa School', type: 'School' },
    { id: '4', nameTh: 'โรงเรียนนานาชาติร่วมฤดี', nameEn: 'Ruamrudee International School', type: 'International School' },
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('stayverse_set_education');
      if (stored) {
        setInstitutions(JSON.parse(stored));
      } else {
        localStorage.setItem('stayverse_set_education', JSON.stringify(initialEdu));
        setInstitutions(initialEdu);
      }
    }
  }, []);

  const handleAddEdu = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameTh || !nameEn) {
      alert('กรุณากรอกชื่อสถาบันศึกษา (TH/EN)');
      return;
    }
    const newEdu: EducationItem = {
      id: Date.now().toString(),
      nameTh,
      nameEn,
      type
    };
    const updated = [...institutions, newEdu];
    setInstitutions(updated);
    localStorage.setItem('stayverse_set_education', JSON.stringify(updated));
    
    setNameTh('');
    setNameEn('');
    setType('School');
  };

  const handleDeleteEdu = (id: string) => {
    if (confirm(language === 'th' ? 'คุณแน่ใจหรือไม่ว่าต้องการลบสถาบันนี้?' : 'Are you sure you want to delete this institution?')) {
      const updated = institutions.filter(i => i.id !== id);
      setInstitutions(updated);
      localStorage.setItem('stayverse_set_education', JSON.stringify(updated));
    }
  };

  const isTh = language === 'th';
  const filteredEdu = institutions.filter(i => 
    i.nameTh.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminShell activeItem="set_education">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 mb-6 border-b border-gray-200/80">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-gray-800 tracking-tight flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-[#CF7536]" />
            <span>{isTh ? 'โรงเรียนและมหาวิทยาลัย > แก้ไข' : 'Education > Edit'}</span>
          </h1>
        </div>
        <div className="text-xs font-semibold text-gray-400 mt-2 sm:mt-0 flex items-center space-x-1.5 select-none">
          <span className="hover:text-[#CF7536] cursor-pointer" onClick={() => router.push('/admin')}>Home</span>
          <span>/</span>
          <span className="hover:text-[#CF7536] cursor-pointer" onClick={() => router.push('/admin/set_education')}>{isTh ? 'โรงเรียนและมหาวิทยาลัย' : 'Education'}</span>
          <span>/</span>
          <span className="text-gray-655">{isTh ? 'แก้ไข' : 'Edit'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl">
        <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm overflow-hidden h-fit">
          <div className="border-b border-gray-100 bg-gray-50/50 px-5 py-3">
            <h2 className="text-xs font-bold text-gray-700">{isTh ? 'เพิ่มสถานศึกษา' : 'Add Institution'}</h2>
          </div>
          <form onSubmit={handleAddEdu} className="p-5 space-y-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-500">{isTh ? 'ชื่อสถาบัน [TH]' : 'Institution Name [TH]'}</label>
              <input 
                type="text" 
                value={nameTh} 
                onChange={(e) => setNameTh(e.target.value)} 
                className="w-full text-xs bg-white border border-gray-200 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#CF7536]"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-500">{isTh ? 'ชื่อสถาบัน [EN]' : 'Institution Name [EN]'}</label>
              <input 
                type="text" 
                value={nameEn} 
                onChange={(e) => setNameEn(e.target.value)} 
                className="w-full text-xs bg-white border border-gray-200 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#CF7536]"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-500">{isTh ? 'ประเภท' : 'Type'}</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full text-xs bg-white border border-gray-200 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#CF7536]"
              >
                <option value="School">{isTh ? 'โรงเรียนทั่วไป' : 'School'}</option>
                <option value="International School">{isTh ? 'โรงเรียนนานาชาติ' : 'International School'}</option>
                <option value="University">{isTh ? 'มหาวิทยาลัย' : 'University'}</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-[#6F42C1] hover:bg-[#5A32A3] text-white flex items-center justify-center gap-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer mt-2"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isTh ? 'เพิ่มสถานศึกษา' : 'Add Institution'}</span>
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200/80 shadow-sm overflow-hidden flex flex-col">
          <div className="border-b border-gray-100 bg-gray-50/50 px-5 py-3 flex items-center justify-between">
            <h2 className="text-xs font-bold text-gray-700">{isTh ? 'รายชื่อสถานศึกษา' : 'Institutions List'}</h2>
            <div className="relative">
              <input
                type="text"
                placeholder={isTh ? 'ค้นหา...' : 'Search...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-7 pr-3 py-1.5 text-[11px] bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#CF7536] w-40"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 font-bold border-b border-gray-150">
                  <th className="py-2.5 px-4">{isTh ? 'ชื่อสถานศึกษา' : 'Institution Name'}</th>
                  <th className="py-2.5 px-4">{isTh ? 'ประเภท' : 'Type'}</th>
                  <th className="py-2.5 px-4 text-center">{isTh ? 'จัดการ' : 'Action'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredEdu.length > 0 ? (
                  filteredEdu.map((edu) => (
                    <tr key={edu.id} className="hover:bg-gray-50/40 text-gray-700">
                      <td className="py-3 px-4">
                        <div className="font-semibold">{isTh ? edu.nameTh : edu.nameEn}</div>
                        <div className="text-[10px] text-gray-400">{isTh ? edu.nameEn : edu.nameTh}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          edu.type === 'University' ? 'bg-[#E0F2FE] text-[#0369A1]' :
                          edu.type === 'International School' ? 'bg-[#F3E8FF] text-[#6B21A8]' : 'bg-[#F0FDF4] text-[#166534]'
                        }`}>
                          {edu.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => handleDeleteEdu(edu.id)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="py-8 text-center text-gray-450 font-medium">
                      {isTh ? 'ไม่พบข้อมูลสถานศึกษา' : 'No institutions found'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
