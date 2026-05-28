'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AdminShell } from '../../admin/AdminShell';
import { Eye } from 'lucide-react';

// Mock data based on the user's reference image
const mockClients = [
  {
    id: '1',
    image: null,
    channel: 'Admin',
    phone: '0867894985',
    name: 'Thithiphol Chokkanapitak',
    email: 'Thithiphol.c@danielnson.com',
    createdAt: '2025-01-14 14:22:25',
    updatedAt: '2025-01-14 14:30:35',
    status: 'ON',
  },
  {
    id: '2',
    image: null,
    channel: 'Admin',
    phone: '0830687438',
    name: 'โอเค ไทย',
    email: 'ok.thaiprop@outlook.com',
    createdAt: '2024-12-11 14:46:24',
    updatedAt: '-',
    status: 'ON',
  },
  {
    id: '3',
    image: null,
    channel: 'Admin',
    phone: '0864756039',
    name: 'Kantavit Tansakul',
    email: 'ktansakul97@gmail.com',
    createdAt: '2024-11-14 17:56:31',
    updatedAt: '2024-11-14 17:58:23',
    status: 'ON',
  },
  {
    id: '4',
    image: null,
    channel: 'Admin',
    phone: '0814659999',
    name: 'ปณิธาน ชิน',
    email: 'pranithanc@gmail.com',
    createdAt: '2024-09-07 11:55:24',
    updatedAt: '2024-09-07 11:55:42',
    status: 'ON',
  },
  {
    id: '5',
    image: null,
    channel: 'Admin',
    phone: '0917844951',
    name: 'จิระเดช',
    email: '1109don@gmail.com',
    createdAt: '2024-08-21 08:48:23',
    updatedAt: '2024-08-21 08:48:39',
    status: 'ON',
  },
  {
    id: '6',
    image: 'logo.png', // Just indicating it has an image in the mock
    channel: 'Admin',
    phone: '0655919451',
    name: 'พันธสัญญา โชติธนพุทธิพงษ์',
    email: 'everwealth9@gmail.com',
    createdAt: '2024-07-30 11:28:47',
    updatedAt: '2024-07-30 11:32:47',
    status: 'ON',
  },
];

export default function TenantClientPage() {
  const router = useRouter();

  return (
    <AdminShell activeItem="client" role="tenant">
      <div className="min-h-screen bg-[#f8f9fc] font-sans">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 py-4 bg-white border-b border-gray-100">
          <h1 className="text-xl font-bold text-gray-800 tracking-tight">
            ผู้ซื้อ / ผู้เช่า
          </h1>
          <div className="text-[13px] text-gray-400 mt-2 sm:mt-0 flex items-center space-x-2 select-none">
            <span className="hover:text-[#6F42C1] cursor-pointer transition-colors" onClick={() => router.push('/tenant/my_properties')}>Home</span>
            <span>/</span>
            <span className="text-[#6F42C1]">ผู้ซื้อ / ผู้เช่า</span>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Table Container */}
          <div className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px] text-gray-700">
              <thead className="bg-[#fcfdfd] border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <tr>
                  <th className="py-4 px-4 font-bold text-center w-20">รูปภาพ</th>
                  <th className="py-4 px-4 font-bold">ช่องทางการสมัคร</th>
                  <th className="py-4 px-4 font-bold">โทรศัพท์</th>
                  <th className="py-4 px-4 font-bold">ชื่อ</th>
                  <th className="py-4 px-4 font-bold">อีเมล</th>
                  <th className="py-4 px-4 font-bold">วันที่สร้าง</th>
                  <th className="py-4 px-4 font-bold">วันที่แก้ไขล่าสุด</th>
                  <th className="py-4 px-4 font-bold text-center">STATUS</th>
                  <th className="py-4 px-4 font-bold text-center w-32">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mockClients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50/50 transition-colors">
                    {/* Image Column */}
                    <td className="py-3 px-4 flex justify-center">
                      <div className="w-12 h-12 bg-gray-100 border border-gray-200 rounded text-[10px] text-gray-400 flex items-center justify-center overflow-hidden shrink-0">
                        {client.image ? (
                           <div className="w-full h-full bg-[#0B1A30] flex items-center justify-center">
                             <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center">
                               <div className="w-2 h-2 bg-blue-400 rounded-full" />
                             </div>
                           </div>
                        ) : (
                          'No Img'
                        )}
                      </div>
                    </td>
                    
                    {/* Channel Column */}
                    <td className="py-4 px-4 whitespace-nowrap text-gray-800 font-medium">
                      {client.channel}
                    </td>

                    {/* Phone Column */}
                    <td className="py-4 px-4 whitespace-nowrap text-gray-800 font-medium">
                      {client.phone}
                    </td>

                    {/* Name Column */}
                    <td className="py-4 px-4 text-gray-800 font-medium whitespace-nowrap">
                      {client.name}
                    </td>

                    {/* Email Column */}
                    <td className="py-4 px-4 text-gray-500 whitespace-nowrap">
                      {client.email}
                    </td>

                    {/* CreatedAt Column */}
                    <td className="py-4 px-4 text-gray-500 whitespace-nowrap">
                      {client.createdAt}
                    </td>

                    {/* UpdatedAt Column */}
                    <td className="py-4 px-4 text-gray-500 whitespace-nowrap">
                      {client.updatedAt}
                    </td>

                    {/* Status Column */}
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      {client.status === 'ON' ? (
                        <span className="inline-flex items-center justify-center px-2 py-1 bg-[#E8F8F0] border border-[#A7F3D0] text-[#047857] text-[11px] font-bold rounded-sm">
                          ON
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center px-2 py-1 bg-[#FEF2F2] border border-[#FECACA] text-[#B91C1C] text-[11px] font-bold rounded-sm text-center leading-tight">
                          Wait<br/>activate
                        </span>
                      )}
                    </td>

                    {/* Action Column */}
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center">
                        <div className="relative group flex flex-col items-center">
                          <button onClick={() => router.push(`/tenant/client/${client.id}`)} className="text-gray-400 hover:text-[#CF7536] transition-colors cursor-pointer p-1">
                            <Eye className="w-[18px] h-[18px]" />
                          </button>
                          <div className="absolute bottom-full mb-1 hidden group-hover:block px-2 py-1 bg-gray-800 text-white text-[10px] font-medium rounded whitespace-nowrap shadow-sm z-10 pointer-events-none">
                            View
                          </div>
                        </div>
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
