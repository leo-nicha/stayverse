'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AdminShell } from '../../AdminShell';
import { ArrowLeft } from 'lucide-react';
import { Member } from '../index/page';

function EditMemberForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idParam = searchParams.get('ids');

  // Member lists and active item state
  const [members, setMembers] = useState<Member[]>([]);
  const [targetMember, setTargetMember] = useState<Member | null>(null);

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
  const [failedLoginCount, setFailedLoginCount] = useState(0);
  const [createdDate, setCreatedDate] = useState('-');
  const [updatedDate, setUpdatedDate] = useState('-');
  const [lastLoginDate, setLastLoginDate] = useState('-');
  const [avatarOption, setAvatarOption] = useState<'none' | 'everwealth'>('none');

  // Load members from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('stayverse_members');
      if (stored) {
        const parsed: Member[] = JSON.parse(stored);
        setMembers(parsed);
        
        // Find specific member
        const found = parsed.find(m => m.id === idParam);
        if (found) {
          setTargetMember(found);
          setFacebookId(found.fbId || '');
          setPhone(found.phone || '');
          setEmail(found.email || '');
          setPassword(found.password || '••••••••');
          setName(found.name || '');
          setLineId(found.lineId || '');
          setStatus(found.status === 'ON' ? 'ON' : 'OFF');
          setIp(found.ip || '');
          setCookies(found.cookies || '');
          setActivateCode(found.activateCode || '');
          setFailedLoginCount(found.failedLoginCount || 0);
          setCreatedDate(found.createdDate || '-');
          setUpdatedDate(found.updatedDate || '-');
          setLastLoginDate(found.lastLoginDate || '-');
          setAvatarOption(found.avatar === 'everwealth' ? 'everwealth' : 'none');
        }
      }
    }
  }, [idParam]);

  const handleResetPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    setPassword('');
    alert('กรุณากรอกรหัสผ่านใหม่ลงในช่องรหัสผ่าน');
  };

  const handleResetForm = () => {
    if (targetMember) {
      setFacebookId(targetMember.fbId || '');
      setPhone(targetMember.phone || '');
      setEmail(targetMember.email || '');
      setPassword(targetMember.password || '••••••••');
      setName(targetMember.name || '');
      setLineId(targetMember.lineId || '');
      setStatus(targetMember.status === 'ON' ? 'ON' : 'OFF');
      setIp(targetMember.ip || '');
      setCookies(targetMember.cookies || '');
      setActivateCode(targetMember.activateCode || '');
      setFailedLoginCount(targetMember.failedLoginCount || 0);
      setAvatarOption(targetMember.avatar === 'everwealth' ? 'everwealth' : 'none');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!idParam) {
      alert('ไม่พบ ID ของสมาชิก');
      return;
    }

    if (!phone || !email || !name) {
      alert('กรุณากรอกข้อมูลที่จำเป็น: โทรศัพท์, อีเมล, และ ชื่อ');
      return;
    }

    // Format update date
    const formatDate = (date: Date) => {
      const pad = (num: number) => String(num).padStart(2, '0');
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    };
    const nowStr = formatDate(new Date());

    const updatedMembers = members.map(m => {
      if (m.id === idParam) {
        return {
          ...m,
          phone,
          name,
          email,
          password: password === '••••••••' ? m.password : password,
          fbId: facebookId,
          lineId,
          ip,
          cookies,
          activateCode,
          status: status === 'ON' ? 'ON' : 'OFF',
          updatedDate: nowStr,
          failedLoginCount: Number(failedLoginCount),
          avatar: avatarOption === 'everwealth' ? 'everwealth' : undefined
        };
      }
      return m;
    });

    localStorage.setItem('stayverse_members', JSON.stringify(updatedMembers));
    alert('บันทึกการแก้ไขสมาชิกเรียบร้อยแล้ว');
    router.push('/admin/members/index');
  };

  if (!targetMember) {
    return (
      <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm p-8 text-center text-gray-500 font-medium">
        ไม่พบข้อมูลสมาชิก ID: &quot;{idParam}&quot; หรือกำลังดาวน์โหลดข้อมูล...
      </div>
    );
  }

  return (
    <>
      {/* Page Title & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 mb-6 border-b border-gray-200/60">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">สมาชิก</h1>
        </div>
        <div className="text-xs font-semibold text-gray-400 mt-2 sm:mt-0 flex items-center space-x-1.5 select-none">
          <span className="hover:text-[#CF7536] cursor-pointer" onClick={() => router.push('/admin')}>Home</span>
          <span>/</span>
          <span className="hover:text-[#CF7536] cursor-pointer" onClick={() => router.push('/admin/members/index')}>สมาชิก</span>
          <span>/</span>
          <span className="text-gray-600">แก้ไข</span>
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

      {/* Main Form */}
      <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm p-6 md:p-8 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* ID */}
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4 select-none">
            <label className="text-sm font-bold text-gray-500">ID</label>
            <div className="col-span-3 text-sm text-gray-700 font-bold font-mono">
              {idParam}
            </div>
          </div>

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
              {avatarOption === 'everwealth' && (
                <div className="w-10 h-10 bg-[#061E38] rounded border border-gray-200 overflow-hidden p-0.5 shadow-inner">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-white">
                    <rect width="100" height="100" fill="#04182E" />
                    <path 
                      d="M 30,50 C 15,35 15,65 30,50 C 45,35 55,35 70,50 C 85,65 85,35 70,50 C 55,65 45,65 30,50 Z" 
                      fill="none" 
                      stroke="#E2E8F0" 
                      strokeWidth="8"
                    />
                  </svg>
                </div>
              )}
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

          {/* โทรศัพท์ */}
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

          {/* อีเมล */}
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

          {/* รหัสผ่าน + Reset link */}
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
            <label className="text-sm font-bold text-gray-700">รหัสผ่าน</label>
            <div className="col-span-3 space-y-1.5">
              <input
                type="password"
                placeholder="รหัสผ่าน"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-sm bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#6F42C1]"
              />
              <div>
                <button
                  onClick={handleResetPassword}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  * Reset password
                </button>
              </div>
            </div>
          </div>

          {/* ชื่อ */}
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

          {/* วันที่สร้าง */}
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
            <label className="text-sm font-bold text-gray-500">วันที่สร้าง</label>
            <div className="col-span-3 text-sm text-gray-600 font-semibold font-mono bg-gray-50/50 border border-gray-100/50 rounded-lg p-2.5 select-none">
              {createdDate}
            </div>
          </div>

          {/* วันที่แก้ไขล่าสุด */}
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
            <label className="text-sm font-bold text-gray-500">วันที่แก้ไขล่าสุด</label>
            <div className="col-span-3 text-sm text-gray-600 font-semibold font-mono bg-gray-50/50 border border-gray-100/50 rounded-lg p-2.5 select-none">
              {updatedDate}
            </div>
          </div>

          {/* วันที่เข้าระบบล่าสุด */}
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
            <label className="text-sm font-bold text-gray-500">วันที่เข้าระบบล่าสุด</label>
            <div className="col-span-3 text-sm text-gray-600 font-semibold font-mono bg-gray-50/50 border border-gray-100/50 rounded-lg p-2.5 select-none">
              {lastLoginDate}
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

          {/* Failed Login Count */}
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
            <label className="text-sm font-bold text-gray-700">จำนวนครั้งที่ Login ผิด</label>
            <div className="col-span-3">
              <input
                type="number"
                min="0"
                value={failedLoginCount}
                onChange={(e) => setFailedLoginCount(Math.max(0, parseInt(e.target.value) || 0))}
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
              Update
            </button>
            <button
              type="button"
              onClick={handleResetForm}
              className="bg-white border border-gray-200 text-gray-650 hover:bg-gray-50 text-sm font-semibold px-6 py-2.5 rounded-lg shadow-sm transition-all duration-200 cursor-pointer"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default function EditMemberPage() {
  return (
    <AdminShell activeItem="members">
      <Suspense fallback={
        <div className="flex items-center justify-center p-12 bg-white border border-gray-250 rounded-xl">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#6F42C1]"></div>
        </div>
      }>
        <EditMemberForm />
      </Suspense>
    </AdminShell>
  );
}
