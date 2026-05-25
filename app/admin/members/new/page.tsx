'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminShell } from '../../AdminShell';
import { ArrowLeft } from 'lucide-react';
import { Member } from '../index/page';

export default function NewMemberPage() {
  const router = useRouter();
  
  // Auto timestamp strings
  const [createdTimestamp, setCreatedTimestamp] = useState('');
  
  // Form States
  const [facebookId, setFacebookId] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lineId, setLineId] = useState('');
  const [status, setStatus] = useState<'ON' | 'OFF'>('OFF');
  const [ip, setIp] = useState('');
  const [cookies, setCookies] = useState('');
  const [activateCode, setActivateCode] = useState('');
  const [avatarOption, setAvatarOption] = useState<'none' | 'everwealth'>('none');

  // Format current date as YYYY-MM-DD HH:mm:ss
  useEffect(() => {
    const formatDate = (date: Date) => {
      const pad = (num: number) => String(num).padStart(2, '0');
      const yyyy = date.getFullYear();
      const mm = pad(date.getMonth() + 1);
      const dd = pad(date.getDate());
      const hh = pad(date.getHours());
      const min = pad(date.getMinutes());
      const ss = pad(date.getSeconds());
      return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
    };
    
    setCreatedTimestamp(formatDate(new Date()));
  }, []);

  const handleReset = () => {
    setFacebookId('');
    setPhone('');
    setEmail('');
    setPassword('');
    setName('');
    setLineId('');
    setStatus('OFF');
    setIp('');
    setCookies('');
    setActivateCode('');
    setAvatarOption('none');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!phone || !email || !name) {
      alert('กรุณากรอกข้อมูลที่จำเป็น: โทรศัพท์, อีเมล, และ ชื่อ');
      return;
    }

    // Load, append and save to localStorage
    const stored = localStorage.getItem('stayverse_members');
    let currentMembers: Member[] = [];
    if (stored) {
      currentMembers = JSON.parse(stored);
    }

    // Find max ID to auto-increment
    const ids = currentMembers.map(m => parseInt(m.id)).filter(id => !isNaN(id));
    const nextId = ids.length > 0 ? (Math.max(...ids) + 1).toString() : '29';

    const newMember: Member = {
      id: nextId,
      registerChannel: 'Admin',
      phone,
      name,
      email,
      password,
      fbId: facebookId,
      lineId,
      ip: ip || '127.0.0.1',
      cookies: cookies || 'Cookies',
      activateCode: activateCode || 'Activate Code',
      status: status === 'ON' ? 'ON' : 'OFF',
      createdDate: createdTimestamp,
      updatedDate: createdTimestamp,
      lastLoginDate: '-',
      failedLoginCount: 0,
      avatar: avatarOption === 'everwealth' ? 'everwealth' : undefined
    };

    const updatedList = [newMember, ...currentMembers];
    localStorage.setItem('stayverse_members', JSON.stringify(updatedList));

    alert('เพิ่มสมาชิกใหม่เรียบร้อยแล้ว');
    router.push('/admin/members/index');
  };

  return (
    <AdminShell activeItem="members">
      {/* Page Title & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 mb-6 border-b border-gray-200/60">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">สมาชิก &gt; เพิ่ม</h1>
        </div>
        <div className="text-xs font-semibold text-gray-400 mt-2 sm:mt-0 flex items-center space-x-1.5 select-none">
          <span className="hover:text-[#CF7536] cursor-pointer" onClick={() => router.push('/admin')}>Home</span>
          <span>/</span>
          <span className="hover:text-[#CF7536] cursor-pointer" onClick={() => router.push('/admin/members/index')}>สมาชิก</span>
          <span>/</span>
          <span className="text-gray-600">เพิ่ม</span>
        </div>
      </div>

      {/* Toolbar Back Button */}
      <div className="mb-6">
        <button
          onClick={() => router.push('/admin/members/index')}
          className="bg-[#6F42C1] hover:bg-[#5A32A3] text-white flex items-center gap-1.5 px-4.5 py-2 rounded-md text-sm font-semibold transition-all duration-200 cursor-pointer shadow-sm hover:shadow"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>กลับ</span>
        </button>
      </div>

      {/* Main Registration Form */}
      <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm p-6 md:p-8 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* รูปภาพ (Avatar Upload Option) */}
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
            <label className="text-sm font-bold text-gray-700">รูปภาพ</label>
            <div className="col-span-3 flex items-center gap-4">
              <select
                value={avatarOption}
                onChange={(e) => setAvatarOption(e.target.value as any)}
                className="text-sm bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#6F42C1] min-w-[200px]"
              >
                <option value="none">ไม่มีรูปภาพ (No Image)</option>
                <option value="everwealth">Everwealth Realty Logo</option>
              </select>
              <div className="text-xs text-gray-400 font-medium">
                (จำลองการเลือกอัปโหลดรูปภาพประจำตัวของสมาชิก)
              </div>
            </div>
          </div>

          {/* Facebook ID */}
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
            <label className="text-sm font-bold text-gray-700">Facebook ID</label>
            <div className="col-span-3">
              <input
                type="text"
                placeholder="Facebook ID"
                value={facebookId}
                onChange={(e) => setFacebookId(e.target.value)}
                className="w-full text-sm bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#6F42C1]"
              />
            </div>
          </div>

          {/* โทรศัพท์ (Phone) */}
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
            <label className="text-sm font-bold text-gray-700 flex items-center gap-1">
              โทรศัพท์ <span className="text-red-500">*</span>
            </label>
            <div className="col-span-3">
              <input
                type="text"
                placeholder="โทรศัพท์"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full text-sm bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#6F42C1]"
              />
            </div>
          </div>

          {/* อีเมล (Email) */}
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
            <label className="text-sm font-bold text-gray-700 flex items-center gap-1">
              อีเมล <span className="text-red-500">*</span>
            </label>
            <div className="col-span-3">
              <input
                type="email"
                placeholder="อีเมล"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full text-sm bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#6F42C1]"
              />
            </div>
          </div>

          {/* รหัสผ่าน (Password) */}
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
            <label className="text-sm font-bold text-gray-700">รหัสผ่าน</label>
            <div className="col-span-3">
              <input
                type="password"
                placeholder="รหัสผ่าน"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-sm bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#6F42C1]"
              />
            </div>
          </div>

          {/* ชื่อ (Name) */}
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
            <label className="text-sm font-bold text-gray-700 flex items-center gap-1">
              ชื่อ <span className="text-red-500">*</span>
            </label>
            <div className="col-span-3">
              <input
                type="text"
                placeholder="ชื่อ"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full text-sm bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#6F42C1]"
              />
            </div>
          </div>

          {/* Line ID */}
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
            <label className="text-sm font-bold text-gray-700">Line ID</label>
            <div className="col-span-3">
              <input
                type="text"
                placeholder="Line ID"
                value={lineId}
                onChange={(e) => setLineId(e.target.value)}
                className="w-full text-sm bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#6F42C1]"
              />
            </div>
          </div>

          {/* วันที่สร้าง (Created Date) */}
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
            <label className="text-sm font-bold text-gray-500">วันที่สร้าง</label>
            <div className="col-span-3 text-sm text-gray-600 font-semibold font-mono bg-gray-50/50 border border-gray-100/50 rounded-lg p-2.5 select-none">
              {createdTimestamp || 'Loading current timestamp...'}
            </div>
          </div>

          {/* วันที่แก้ไขล่าสุด (Updated Date) */}
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
            <label className="text-sm font-bold text-gray-500">วันที่แก้ไขล่าสุด</label>
            <div className="col-span-3 text-sm text-gray-600 font-semibold font-mono bg-gray-50/50 border border-gray-100/50 rounded-lg p-2.5 select-none">
              {createdTimestamp || 'Loading current timestamp...'}
            </div>
          </div>

          {/* สถานะ (Status ON/OFF Radios) */}
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4 select-none">
            <label className="text-sm font-bold text-gray-700">สถานะ</label>
            <div className="col-span-3 flex items-center space-x-6">
              <label className="flex items-center space-x-2 cursor-pointer font-bold text-xs text-green-600">
                <input
                  type="radio"
                  name="status"
                  value="ON"
                  checked={status === 'ON'}
                  onChange={() => setStatus('ON')}
                  className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500 cursor-pointer"
                />
                <span>ON</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer font-bold text-xs text-red-600">
                <input
                  type="radio"
                  name="status"
                  value="OFF"
                  checked={status === 'OFF'}
                  onChange={() => setStatus('OFF')}
                  className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500 cursor-pointer"
                />
                <span>OFF</span>
              </label>
            </div>
          </div>

          {/* IP */}
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
            <label className="text-sm font-bold text-gray-700">IP</label>
            <div className="col-span-3">
              <input
                type="text"
                placeholder="IP"
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                className="w-full text-sm bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#6F42C1]"
              />
            </div>
          </div>

          {/* Cookies */}
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
            <label className="text-sm font-bold text-gray-700">Cookies</label>
            <div className="col-span-3">
              <input
                type="text"
                placeholder="Cookies"
                value={cookies}
                onChange={(e) => setCookies(e.target.value)}
                className="w-full text-sm bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#6F42C1]"
              />
            </div>
          </div>

          {/* Activate Code */}
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
            <label className="text-sm font-bold text-gray-700">Activate Code</label>
            <div className="col-span-3">
              <input
                type="text"
                placeholder="Activate Code"
                value={activateCode}
                onChange={(e) => setActivateCode(e.target.value)}
                className="w-full text-sm bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#6F42C1]"
              />
            </div>
          </div>

          {/* Bottom Actions Form Buttons */}
          <div className="pt-6 border-t border-gray-150 flex items-center gap-3">
            <button
              type="submit"
              className="bg-[#6F42C1] hover:bg-[#5A32A3] text-white text-sm font-semibold px-6 py-2.5 rounded-lg shadow-sm transition-all duration-200 cursor-pointer"
            >
              Add new
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-white border border-gray-200 text-gray-650 hover:bg-gray-50 text-sm font-semibold px-6 py-2.5 rounded-lg shadow-sm transition-all duration-200 cursor-pointer"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </AdminShell>
  );
}
