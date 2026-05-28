'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AdminShell } from '../AdminShell';
import { Search, RefreshCcw, Edit, Trash2, FolderOpen, User, Phone, Mail } from 'lucide-react';

interface InterestedItem {
  id: string;
  type: string;
  title: string;
  propertyCode: string;
  imageUrl?: string;
  notFound?: boolean;
  want: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  createdDate: string;
  editedDate: string;
  status: 'New' | 'Read';
}

const mockInterested: InterestedItem[] = [
  {
    id: '1',
    type: 'Default',
    title: 'S47 Sukhumvit ห้อง Duplex 1 นอน 1 น้ำ 1 ห้อง Powder ขนาด 61...',
    propertyCode: 'รหัสประกาศ: 88',
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300&h=200&fit=crop',
    want: 'ซื้อ',
    contactName: 'YY YY',
    contactPhone: '0945545445',
    contactEmail: 'waitingww87@gmail.com',
    createdDate: '25/04/2026 11:10',
    editedDate: '01/01/1970 07:00',
    status: 'New'
  },
  {
    id: '2',
    type: 'Default',
    title: 'ไม่พบประกาศ (ID: 0)',
    propertyCode: 'รหัสประกาศ: 0',
    notFound: true,
    want: '',
    contactName: 'พันธสัญญา โชติธนพุทธิพงษ์',
    contactPhone: '0655919451',
    contactEmail: 'everwealthy9@gmail.com',
    createdDate: '30/07/2024 11:26',
    editedDate: '01/01/1970 07:00',
    status: 'New'
  },
  {
    id: '3',
    type: 'Default',
    title: 'For Rent The Reserve Sukhumvit 61 ( BTS Ekkamai )',
    propertyCode: 'รหัสประกาศ: 12',
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=300&h=200&fit=crop',
    want: '',
    contactName: 'Mike',
    contactPhone: '0856781555',
    contactEmail: 'dot60@mail4.uk',
    createdDate: '28/06/2024 11:26',
    editedDate: '01/01/1970 07:00',
    status: 'New'
  },
  {
    id: '4',
    type: 'Default',
    title: 'ขายดาวน์ Culture Chula 2นอน1น้ำ ชั้น17 56ตรม. ราคา 11.32MB',
    propertyCode: 'รหัสประกาศ: 10',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=300&h=200&fit=crop',
    want: '',
    contactName: 'เคริก บุณยโยธิน',
    contactPhone: '0816493759',
    contactEmail: 'kirk.bu@gmail.com',
    createdDate: '27/09/2023 13:12',
    editedDate: '01/01/1970 07:00',
    status: 'Read'
  }
];

export default function InterestedListPage() {
  const router = useRouter();

  return (
    <AdminShell activeItem="interested">
      <div className="bg-[#f8f9fc] min-h-screen pb-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 py-4 bg-white border-b border-gray-100">
          <h1 className="text-xl font-bold text-gray-800 tracking-tight">
            ผู้สนใจ
          </h1>
          <div className="text-[13px] text-[#0088ff] mt-2 sm:mt-0 flex items-center space-x-2 select-none">
            <span className="hover:underline cursor-pointer transition-colors" onClick={() => router.push('/admin')}>Home</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-500">ผู้สนใจ</span>
          </div>
        </div>

        <div className="p-6">
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            {/* Top Toolbar */}
            <div className="p-4 border-b border-gray-200 flex flex-col lg:flex-row justify-end items-start lg:items-center gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <select className="border border-gray-300 px-3 py-1.5 rounded text-[13px] focus:outline-none focus:border-[#6F42C1] bg-white text-gray-700 w-28">
                  <option>Type</option>
                </select>
                <select className="border border-gray-300 px-3 py-1.5 rounded text-[13px] focus:outline-none focus:border-[#6F42C1] bg-white text-gray-700 w-28">
                  <option>Status</option>
                  <option>New</option>
                  <option>Read</option>
                </select>
                <input 
                  type="text" 
                  placeholder="คำค้นหา" 
                  className="border border-gray-300 px-3 py-1.5 rounded text-[13px] focus:outline-none focus:border-[#6F42C1] w-48"
                />
                <button className="bg-[#6F42C1] hover:bg-[#5A32A3] text-white px-4 py-1.5 rounded flex items-center gap-2 text-[13px] font-medium transition-colors">
                  <Search className="w-4 h-4" />
                  Search
                </button>
                <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-1.5 rounded flex items-center gap-2 text-[13px] font-medium transition-colors">
                  <RefreshCcw className="w-3.5 h-3.5" />
                  Reset
                </button>
              </div>
            </div>

            {/* Results Count & Pagination top */}
            <div className="px-5 py-3 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
              <span className="text-[13px] text-gray-700 font-medium">
                ค้นพบ <span className="font-bold">5</span> รายการ
              </span>
              <div className="flex items-center gap-1 text-[12px] border border-gray-200 rounded overflow-hidden">
                <span className="px-3 py-1.5 text-gray-400 bg-white border-r border-gray-200">« First</span>
                <span className="px-3 py-1.5 text-[#0088ff] bg-blue-50 font-medium border-r border-gray-200">1</span>
                <span className="px-3 py-1.5 text-gray-600 hover:bg-gray-50 bg-white cursor-pointer transition-colors">Last »</span>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px]">
                <thead>
                  <tr className="border-b border-gray-200 bg-white">
                    <th className="py-3 px-4 w-12 text-center">
                      <input type="checkbox" className="rounded border-gray-300 text-[#6F42C1] focus:ring-[#6F42C1]" />
                    </th>
                    <th className="py-3 px-4 font-bold text-gray-700 w-24">ประเภท</th>
                    <th className="py-3 px-4 font-bold text-gray-700 w-[350px]">ชื่อประกาศ</th>
                    <th className="py-3 px-4 font-bold text-gray-700 text-center w-24">ต้องการ</th>
                    <th className="py-3 px-4 font-bold text-gray-700 w-64">ข้อมูลติดต่อ</th>
                    <th className="py-3 px-4 font-bold text-gray-700 text-center w-36">วันที่สร้าง</th>
                    <th className="py-3 px-4 font-bold text-gray-700 text-center w-36">วันที่แก้ไขล่าสุด</th>
                    <th className="py-3 px-4 font-bold text-gray-700 text-center w-24">Status</th>
                    <th className="py-3 px-4 font-bold text-gray-700 text-center w-32">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {mockInterested.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="py-4 px-4 text-center align-top pt-8">
                        <input type="checkbox" className="rounded border-gray-300 text-[#6F42C1] focus:ring-[#6F42C1]" />
                      </td>
                      <td className="py-4 px-4 align-top text-gray-700 pt-8">
                        {item.type}
                      </td>
                      <td className="py-4 px-4 align-top">
                        <div className="flex gap-4">
                          {item.imageUrl ? (
                            <img src={item.imageUrl} alt="Property" className="w-32 h-20 object-cover rounded shadow-sm border border-gray-200" />
                          ) : (
                            <div className="w-32 h-20 rounded hidden md:block"></div>
                          )}
                          <div>
                            {item.notFound ? (
                              <div className="text-red-500 font-medium mb-1 hover:underline cursor-pointer">{item.title}</div>
                            ) : (
                              <div className="text-[#0088FF] font-medium mb-1 hover:underline cursor-pointer">{item.title}</div>
                            )}
                            <div className="text-xs text-gray-500">{item.propertyCode}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 align-top text-center pt-8">
                        {item.want ? (
                          <span className="bg-[#2ecc71] text-white text-[11px] font-bold px-2 py-0.5 rounded">{item.want}</span>
                        ) : (
                          <span className="bg-[#2ecc71] w-4 h-4 rounded inline-block"></span>
                        )}
                      </td>
                      <td className="py-4 px-4 align-top text-gray-700 text-xs space-y-1 pt-6">
                        <div className="flex items-center gap-2">
                          <User className="w-3.5 h-3.5 text-gray-500" />
                          <span className="font-medium text-gray-800">{item.contactName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-gray-500" />
                          <span className="text-[#0088FF] hover:underline cursor-pointer">{item.contactPhone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-gray-500" />
                          <span className="text-[#0088FF] hover:underline cursor-pointer">{item.contactEmail}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 align-top text-center text-gray-500 text-xs pt-8">
                        {item.createdDate}
                      </td>
                      <td className="py-4 px-4 align-top text-center text-gray-500 text-xs pt-8">
                        {item.editedDate}
                      </td>
                      <td className="py-4 px-4 align-top text-center pt-8">
                        <span className={`text-[12px] font-bold ${item.status === 'New' ? 'text-red-500' : 'text-[#2ecc71]'}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 align-top text-center pt-8">
                        <div className="flex items-center justify-center gap-2 text-gray-500">
                          <button className="hover:text-gray-700 transition-colors" title="Folder"><FolderOpen className="w-4 h-4" /></button>
                          <button onClick={() => router.push(`/admin/interested/edit?id=${item.id}`)} className="hover:text-amber-500 transition-colors" title="Edit"><Edit className="w-4 h-4" /></button>
                          <button className="hover:text-red-500 transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bottom Actions and Pagination */}
            <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/50">
              <div className="flex items-center gap-2">
                <button className="bg-[#0088ff] hover:bg-[#0077cc] text-white px-4 py-1.5 rounded text-[13px] font-medium transition-colors">Select all</button>
                <button className="bg-[#0088ff] hover:bg-[#0077cc] text-white px-4 py-1.5 rounded text-[13px] font-medium transition-colors">Delete</button>
                <button className="bg-[#0088ff] hover:bg-[#0077cc] text-white px-4 py-1.5 rounded text-[13px] font-medium transition-colors">Sort</button>
              </div>
              <div className="flex items-center gap-1 text-[12px] border border-gray-200 rounded overflow-hidden bg-white">
                <span className="px-3 py-1.5 text-gray-400 border-r border-gray-200">« First</span>
                <span className="px-3 py-1.5 text-[#0088ff] bg-blue-50 font-medium border-r border-gray-200">1</span>
                <span className="px-3 py-1.5 text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors">Last »</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
