'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminShell } from '../AdminShell';
import { Mail, Save, RotateCcw } from 'lucide-react';
import { useTranslation } from '@/context/LanguageContext';

interface EmailTemplate {
  subjectTh: string;
  subjectEn: string;
  bodyTh: string;
  bodyEn: string;
}

export default function SetMailPage() {
  const router = useRouter();
  const { language } = useTranslation();

  const [activeTemplate, setActiveTemplate] = useState<'welcome' | 'reset' | 'enquiry'>('welcome');

  const [templates, setTemplates] = useState<Record<'welcome' | 'reset' | 'enquiry', EmailTemplate>>({
    welcome: {
      subjectTh: 'ยินดีต้อนรับสู่ Stayverse!',
      subjectEn: 'Welcome to Stayverse!',
      bodyTh: '<p>สวัสดีคุณ {{name}},</p><p>ขอบคุณสำหรับการลงทะเบียนบัญชีผู้ใช้กับเรา รหัสเปิดใช้งานของคุณคือ <strong>{{code}}</strong></p>',
      bodyEn: '<p>Hello {{name}},</p><p>Thank you for registering an account with us. Your activation code is <strong>{{code}}</strong></p>'
    },
    reset: {
      subjectTh: 'รีเซ็ตรหัสผ่านบัญชีของคุณ',
      subjectEn: 'Reset Your Account Password',
      bodyTh: '<p>สวัสดีคุณ {{name}},</p><p>เราได้รับคำขอรีเซ็ตรหัสผ่านของคุณ กรุณาคลิกลิงก์ด้านล่างเพื่อดำเนินการ:<br><a href="{{link}}">คลิกเพื่อรีเซ็ตรหัสผ่าน</a></p>',
      bodyEn: '<p>Hello {{name}},</p><p>We received a request to reset your password. Please click the link below to proceed:<br><a href="{{link}}">Click to reset password</a></p>'
    },
    enquiry: {
      subjectTh: 'มีผู้ส่งข้อความสนใจทรัพย์ {{refNo}} ของคุณ',
      subjectEn: 'New enquiry received for listing {{refNo}}',
      bodyTh: '<p>คุณมีผู้สนใจติดต่อ: <strong>{{clientName}}</strong><br>เบอร์โทร: {{clientPhone}}<br>ข้อความ: {{clientMessage}}</p>',
      bodyEn: '<p>You have a new client contact: <strong>{{clientName}}</strong><br>Phone: {{clientPhone}}<br>Message: {{clientMessage}}</p>'
    }
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('stayverse_set_mails');
      if (stored) {
        try {
          setTemplates(JSON.parse(stored));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('stayverse_set_mails', JSON.stringify(templates));
    alert(language === 'th' ? 'บันทึกการตั้งค่าเทมเพลตอีเมลเรียบร้อยแล้ว' : 'Email templates updated successfully');
  };

  const handleReset = () => {
    const fresh = {
      welcome: {
        subjectTh: 'ยินดีต้อนรับสู่ Stayverse!',
        subjectEn: 'Welcome to Stayverse!',
        bodyTh: '<p>สวัสดีคุณ {{name}},</p><p>ขอบคุณสำหรับการลงทะเบียนบัญชีผู้ใช้กับเรา รหัสเปิดใช้งานของคุณคือ <strong>{{code}}</strong></p>',
        bodyEn: '<p>Hello {{name}},</p><p>Thank you for registering an account with us. Your activation code is <strong>{{code}}</strong></p>'
      },
      reset: {
        subjectTh: 'รีเซ็ตรหัสผ่านบัญชีของคุณ',
        subjectEn: 'Reset Your Account Password',
        bodyTh: '<p>สวัสดีคุณ {{name}},</p><p>เราได้รับคำขอรีเซ็ตรหัสผ่านของคุณ กรุณาคลิกลิงก์ด้านล่างเพื่อดำเนินการ:<br><a href="{{link}}">คลิกเพื่อรีเซ็ตรหัสผ่าน</a></p>',
        bodyEn: '<p>Hello {{name}},</p><p>We received a request to reset your password. Please click the link below to proceed:<br><a href="{{link}}">Click to reset password</a></p>'
      },
      enquiry: {
        subjectTh: 'มีผู้ส่งข้อความสนใจทรัพย์ {{refNo}} ของคุณ',
        subjectEn: 'New enquiry received for listing {{refNo}}',
        bodyTh: '<p>คุณมีผู้สนใจติดต่อ: <strong>{{clientName}}</strong><br>เบอร์โทร: {{clientPhone}}<br>ข้อความ: {{clientMessage}}</p>',
        bodyEn: '<p>You have a new client contact: <strong>{{clientName}}</strong><br>Phone: {{clientPhone}}<br>Message: {{clientMessage}}</p>'
      }
    };
    setTemplates(fresh);
  };

  const isTh = language === 'th';

  return (
    <AdminShell activeItem="set_mail">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 mb-6 border-b border-gray-200/80">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-gray-800 tracking-tight flex items-center gap-2">
            <Mail className="w-6 h-6 text-[#CF7536]" />
            <span>{isTh ? 'Mail Template > แก้ไข' : 'Mail Template > Edit'}</span>
          </h1>
        </div>
        <div className="text-xs font-semibold text-gray-400 mt-2 sm:mt-0 flex items-center space-x-1.5 select-none">
          <span className="hover:text-[#CF7536] cursor-pointer" onClick={() => router.push('/admin')}>Home</span>
          <span>/</span>
          <span className="hover:text-[#CF7536] cursor-pointer" onClick={() => router.push('/admin/set_mail')}>Mail Template</span>
          <span>/</span>
          <span className="text-gray-655">{isTh ? 'แก้ไข' : 'Edit'}</span>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm overflow-hidden max-w-5xl">
        <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-sm font-bold text-gray-700">{isTh ? 'ปรับแต่งอีเมลที่ส่งออกจากระบบอัตโนมัติ' : 'System Email Notification Customizer'}</h2>
          
          <select
            value={activeTemplate}
            onChange={(e) => setActiveTemplate(e.target.value as any)}
            className="text-xs bg-white border border-gray-200 rounded-lg p-1.5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#CF7536] min-w-[180px]"
          >
            <option value="welcome">{isTh ? 'ยินดีต้อนรับ (Welcome Email)' : 'Welcome Email'}</option>
            <option value="reset">{isTh ? 'ลืมรหัสผ่าน (Reset Password)' : 'Reset Password'}</option>
            <option value="enquiry">{isTh ? 'ติดต่อสอบถามทรัพย์ (Enquiry)' : 'Listing Enquiry'}</option>
          </select>
        </div>

        <form onSubmit={handleUpdate} className="p-6 md:p-8 space-y-6">
          <div className="bg-orange-50/40 border border-orange-100 rounded-xl p-4 text-[11px] text-orange-800 font-medium">
            <strong>{isTh ? 'ตัวแปรที่ใช้ได้สำหรับข้อความนี้:' : 'Available Placeholders:'}</strong>
            <span className="block mt-1">
              {activeTemplate === 'welcome' && '{{name}} = Customer Name, {{code}} = Activation Code'}
              {activeTemplate === 'reset' && '{{name}} = Customer Name, {{link}} = Password Reset URL'}
              {activeTemplate === 'enquiry' && '{{name}} = Owner Name, {{refNo}} = Property Ref, {{clientName}} = Client Name, {{clientPhone}} = Client Phone, {{clientMessage}} = Message'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* THAI LANG */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-[#CF7536] uppercase tracking-wider">ภาษาไทย [TH]</h3>
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 block">{isTh ? 'หัวเรื่อง' : 'Subject'}</label>
                <input
                  type="text"
                  value={templates[activeTemplate].subjectTh}
                  onChange={(e) => {
                    const next = { ...templates };
                    next[activeTemplate].subjectTh = e.target.value;
                    setTemplates(next);
                  }}
                  className="w-full text-sm bg-white border border-gray-200 rounded-lg p-2.5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#CF7536] transition-all"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 block">{isTh ? 'เนื้อหาร่างจดหมาย (HTML)' : 'Body Markup (HTML)'}</label>
                <textarea
                  value={templates[activeTemplate].bodyTh}
                  onChange={(e) => {
                    const next = { ...templates };
                    next[activeTemplate].bodyTh = e.target.value;
                    setTemplates(next);
                  }}
                  rows={8}
                  className="w-full text-xs font-mono bg-white border border-gray-200 rounded-lg p-2.5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#CF7536] transition-all"
                  required
                />
              </div>
            </div>

            {/* ENGLISH LANG */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-[#CF7536] uppercase tracking-wider">English [EN]</h3>
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 block">Subject</label>
                <input
                  type="text"
                  value={templates[activeTemplate].subjectEn}
                  onChange={(e) => {
                    const next = { ...templates };
                    next[activeTemplate].subjectEn = e.target.value;
                    setTemplates(next);
                  }}
                  className="w-full text-sm bg-white border border-gray-200 rounded-lg p-2.5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#CF7536] transition-all"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 block">Body Markup (HTML)</label>
                <textarea
                  value={templates[activeTemplate].bodyEn}
                  onChange={(e) => {
                    const next = { ...templates };
                    next[activeTemplate].bodyEn = e.target.value;
                    setTemplates(next);
                  }}
                  rows={8}
                  className="w-full text-xs font-mono bg-white border border-gray-200 rounded-lg p-2.5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#CF7536] transition-all"
                  required
                />
              </div>
            </div>

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
