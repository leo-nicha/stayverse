'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminShell } from '../AdminShell';
import { ShieldCheck, Save, RotateCcw } from 'lucide-react';
import { useTranslation } from '@/context/LanguageContext';

interface RolePermission {
  role: string;
  viewListings: boolean;
  editListings: boolean;
  manageMembers: boolean;
  systemSettings: boolean;
}

export default function SetPermissionPage() {
  const router = useRouter();
  const { language } = useTranslation();

  const [permissions, setPermissions] = useState<RolePermission[]>([]);

  const defaultPermissions: RolePermission[] = [
    { role: 'Super Admin', viewListings: true, editListings: true, manageMembers: true, systemSettings: true },
    { role: 'Editor / Staff', viewListings: true, editListings: true, manageMembers: false, systemSettings: false },
    { role: 'Agent', viewListings: true, editListings: false, manageMembers: false, systemSettings: false }
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('stayverse_set_permissions');
      if (stored) {
        setPermissions(JSON.parse(stored));
      } else {
        localStorage.setItem('stayverse_set_permissions', JSON.stringify(defaultPermissions));
        setPermissions(defaultPermissions);
      }
    }
  }, []);

  const handleCheckboxChange = (roleIndex: number, field: keyof Omit<RolePermission, 'role'>) => {
    const updated = [...permissions];
    updated[roleIndex][field] = !updated[roleIndex][field];
    setPermissions(updated);
  };

  const handleReset = () => {
    setPermissions(JSON.parse(JSON.stringify(defaultPermissions)));
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('stayverse_set_permissions', JSON.stringify(permissions));
    alert(language === 'th' ? 'บันทึกข้อมูลสิทธิ์เรียบร้อยแล้ว' : 'Permissions saved successfully');
  };

  const isTh = language === 'th';

  return (
    <AdminShell activeItem="set_permission">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 mb-6 border-b border-gray-200/80">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-gray-800 tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#CF7536]" />
            <span>{isTh ? 'กำหนดสิทธิ์ > แก้ไข' : 'Permissions > Edit'}</span>
          </h1>
        </div>
        <div className="text-xs font-semibold text-gray-400 mt-2 sm:mt-0 flex items-center space-x-1.5 select-none">
          <span className="hover:text-[#CF7536] cursor-pointer" onClick={() => router.push('/admin')}>Home</span>
          <span>/</span>
          <span className="hover:text-[#CF7536] cursor-pointer" onClick={() => router.push('/admin/set_permission')}>{isTh ? 'กำหนดสิทธิ์' : 'Permissions'}</span>
          <span>/</span>
          <span className="text-gray-655">{isTh ? 'แก้ไข' : 'Edit'}</span>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm overflow-hidden max-w-5xl">
        <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
          <h2 className="text-sm font-bold text-gray-700">{isTh ? 'ตารางกำหนดสิทธิ์การใช้งานของแต่ละกลุ่มผู้ใช้' : 'Role-based Access Control (RBAC) Matrix'}</h2>
        </div>

        <form onSubmit={handleUpdate} className="p-6 md:p-8 space-y-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-600 font-bold border-b border-gray-200">
                  <th className="py-3 px-4">{isTh ? 'บทบาท / กลุ่มผู้ใช้งาน' : 'User Role / Group'}</th>
                  <th className="py-3 px-4 text-center">{isTh ? 'ดูประกาศ' : 'View Listings'}</th>
                  <th className="py-3 px-4 text-center">{isTh ? 'จัดการประกาศ' : 'Manage Listings'}</th>
                  <th className="py-3 px-4 text-center">{isTh ? 'จัดการสมาชิก' : 'Manage Members'}</th>
                  <th className="py-3 px-4 text-center">{isTh ? 'จัดการตั้งค่าระบบ' : 'System Settings'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {permissions.map((p, idx) => (
                  <tr key={p.role} className="hover:bg-gray-50/30 text-gray-700">
                    <td className="py-4 px-4 font-bold text-gray-800">{p.role}</td>
                    
                    <td className="py-4 px-4 text-center">
                      <input 
                        type="checkbox" 
                        checked={p.viewListings} 
                        onChange={() => handleCheckboxChange(idx, 'viewListings')}
                        className="w-4 h-4 text-[#6F42C1] rounded border-gray-300 focus:ring-[#6F42C1] cursor-pointer"
                      />
                    </td>
                    
                    <td className="py-4 px-4 text-center">
                      <input 
                        type="checkbox" 
                        checked={p.editListings} 
                        onChange={() => handleCheckboxChange(idx, 'editListings')}
                        className="w-4 h-4 text-[#6F42C1] rounded border-gray-300 focus:ring-[#6F42C1] cursor-pointer"
                      />
                    </td>
                    
                    <td className="py-4 px-4 text-center">
                      <input 
                        type="checkbox" 
                        checked={p.manageMembers} 
                        disabled={p.role === 'Super Admin'} // Protect Super Admin defaults
                        onChange={() => handleCheckboxChange(idx, 'manageMembers')}
                        className="w-4 h-4 text-[#6F42C1] rounded border-gray-300 focus:ring-[#6F42C1] disabled:opacity-40 cursor-pointer"
                      />
                    </td>
                    
                    <td className="py-4 px-4 text-center">
                      <input 
                        type="checkbox" 
                        checked={p.systemSettings} 
                        disabled={p.role === 'Super Admin'} // Protect Super Admin defaults
                        onChange={() => handleCheckboxChange(idx, 'systemSettings')}
                        className="w-4 h-4 text-[#6F42C1] rounded border-gray-300 focus:ring-[#6F42C1] disabled:opacity-40 cursor-pointer"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t border-gray-100 pt-6 flex items-center gap-3">
            <button
              type="submit"
              className="bg-[#6F42C1] hover:bg-[#5A32A3] text-white flex items-center gap-1.5 px-6 py-2.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer shadow-sm hover:shadow"
            >
              <Save className="w-4 h-4" />
              <span>Update</span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200 flex items-center gap-1.5 px-6 py-2.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>
        </form>
      </div>
    </AdminShell>
  );
}
