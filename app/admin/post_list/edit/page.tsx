'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminShell } from '../../AdminShell';
import { ArrowLeft, Plus } from 'lucide-react';
import { useTranslation } from '@/context/LanguageContext';

export default function EditPostPage() {
  const router = useRouter();
  const { language } = useTranslation();
  const isTh = language === 'th';
  
  const [buildingType, setBuildingType] = useState("คอนโด");

  return (
    <AdminShell activeItem="allListings">
      <div className="bg-[#f8f9fc] min-h-screen pb-12">
        {/* Header */}
        <div className="flex items-center px-6 py-4 bg-white border-b border-gray-100">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 bg-[#6F42C1] hover:bg-[#5A32A3] text-white px-4 py-1.5 rounded-md text-[13px] font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            กลับ
          </button>
        </div>

        <div className="p-6">
          {/* Tabs */}
          <div className="flex space-x-6 border-b border-gray-200 mb-6 px-4 overflow-x-auto whitespace-nowrap">
            <button 
              onClick={() => document.getElementById('owner-info')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-[#0088ff] border-b-2 border-[#0088ff] pb-3 text-[14px] font-medium"
            >
              ข้อมูลของเจ้าของทรัพย์
            </button>
            <button 
              onClick={() => document.getElementById('property-info')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-gray-500 hover:text-gray-700 pb-3 text-[14px] font-medium"
            >
              ข้อมูลทรัพย์
            </button>
            <button 
              onClick={() => document.getElementById('buyer-info')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-gray-500 hover:text-gray-700 pb-3 text-[14px] font-medium"
            >
              ข้อมูลผู้ซื้อ/เช่า
            </button>
            <button 
              onClick={() => document.getElementById('time-info')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-gray-500 hover:text-gray-700 pb-3 text-[14px] font-medium"
            >
              ข้อมูลเวลา
            </button>
          </div>

          <form className="bg-white rounded-md shadow-sm border border-gray-200">
            {/* Basic Info Section */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center border-b border-gray-100 pb-4">
                <label className="text-[13px] font-medium text-gray-700 md:col-span-1">Tel/Email สมาชิก/ผู้โพส</label>
                <div className="md:col-span-3 space-y-1">
                  <input type="text" placeholder="Tel/Email ของผู้โพส (ต้องเป็นสมาชิกเท่านั้น)" className="w-full md:w-1/2 border border-gray-300 px-3 py-2 rounded text-[13px] focus:outline-none focus:border-[#0088ff]" />
                  <p className="text-[12px] text-red-500">*หากค้นหาแล้วไม่พบ ระบบจะสร้างบัญชีให้ทันที</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center border-b border-gray-100 pb-4">
                <label className="text-[13px] font-medium text-gray-700 md:col-span-1">Ref No.</label>
                <div className="md:col-span-3">
                  <input type="text" placeholder="รหัสทรัพย์" disabled className="w-full md:w-1/2 bg-gray-50 border border-gray-300 px-3 py-2 rounded text-[13px] text-gray-500 cursor-not-allowed" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <label className="text-[13px] font-medium text-gray-700 md:col-span-1">ผู้โพส</label>
                <div className="md:col-span-3">
                  <select className="w-full md:w-1/2 border border-gray-300 px-3 py-2 rounded text-[13px] focus:outline-none focus:border-[#0088ff] bg-white">
                    <option>admin</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Owner Information Section */}
            <div id="owner-info" className="bg-[#0088ff] text-white px-6 py-2.5 text-[14px] font-medium scroll-mt-24">
              ข้อมูลของเจ้าของทรัพย์
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <label className="text-[13px] font-medium text-gray-700 md:col-span-1">ชื่อผู้ฝาก</label>
                <div className="md:col-span-3">
                  <select className="w-full md:w-1/2 border border-gray-300 px-3 py-2 rounded text-[13px] focus:outline-none focus:border-[#0088ff] bg-white">
                    <option>เจ้าของ</option>
                  </select>
                </div>
              </div>

              {[
                { id: 'name', label: 'Name', placeholder: 'Name' },
                { id: 'tel', label: 'Tel', placeholder: 'Tel' },
                { id: 'email', label: 'Email', placeholder: 'Email' },
                { id: 'line', label: 'Line ID', placeholder: 'Line ID' },
                { id: 'whatsapp', label: 'WhatsApp ID', placeholder: 'WhatsApp ID' },
                { id: 'wechat', label: 'WeChat ID', placeholder: 'WeChat ID' },
                { id: 'kakao', label: 'KakaoTalk ID', placeholder: 'KakaoTalk ID' },
                { id: 'fb', label: 'Facebook url', placeholder: 'Facebook url' },
                { id: 'yt', label: 'Youtube url', placeholder: 'Youtube url' },
                { id: 'x', label: 'X url', placeholder: 'X url' },
              ].map((field) => (
                <div key={field.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                  <label className="text-[13px] font-medium text-gray-700 md:col-span-1">{field.label}</label>
                  <div className="md:col-span-3">
                    <input type="text" placeholder={field.placeholder} className="w-full md:w-1/2 border border-gray-300 px-3 py-2 rounded text-[13px] focus:outline-none focus:border-[#0088ff]" />
                  </div>
                </div>
              ))}

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                <label className="text-[13px] font-medium text-gray-700 md:col-span-1 pt-2">รายละเอียดอื่นๆ</label>
                <div className="md:col-span-3">
                  <textarea rows={4} placeholder="รายละเอียดอื่นๆ" className="w-full md:w-1/2 border border-gray-300 px-3 py-2 rounded text-[13px] focus:outline-none focus:border-[#0088ff]"></textarea>
                </div>
              </div>

              <div className="mt-8 border-t border-gray-200 pt-6">
                <label className="text-[13px] font-medium text-gray-700 block mb-4">แนบไฟล์เพิ่มเติม</label>
                <table className="w-full border-collapse border border-gray-200 text-[13px]">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">หัวข้อ</th>
                      <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">ไฟล์</th>
                      <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">วันที่สร้าง / By</th>
                      <th className="border border-gray-200 px-4 py-2 w-16 text-center"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2"></td>
                      <td className="border border-gray-200 px-4 py-2"></td>
                      <td className="border border-gray-200 px-4 py-2"></td>
                      <td className="border border-gray-200 px-4 py-2 text-center">
                        <button className="bg-[#2ecc71] hover:bg-[#27ae60] text-white p-1.5 rounded transition-colors">
                          <Plus className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Responsible Contact Section */}
            <div className="bg-[#0088ff] text-white px-6 py-2.5 text-[14px] font-medium">
              ข้อมูลติดต่อผู้รับผิดชอบ
            </div>
            
            <div className="p-6 space-y-4">
              {[
                { id: 'r_name', label: 'Name', placeholder: 'Name', warning: '', defaultValue: 'Hongcharoendee' },
                { id: 'r_tel', label: 'Tel', placeholder: 'Tel', warning: '*ถ้าไม่มีการกรอก ระบบจะแสดงผลตามข้อมูลผู้ติดต่อ ข้อมูลที่แสดงคือ 0924549499', defaultValue: '0969066598' },
                { id: 'r_tel_1', label: 'Tel (สำรอง 1)', placeholder: 'Tel', warning: '*ถ้าไม่มีการกรอก ระบบจะแสดงผลตามข้อมูลผู้ติดต่อ ข้อมูลที่แสดงคือ', defaultValue: '0969066598' },
                { id: 'r_tel_2', label: 'Tel (สำรอง 2)', placeholder: 'Tel', warning: '*ถ้าไม่มีการกรอก ระบบจะแสดงผลตามข้อมูลผู้ติดต่อ ข้อมูลที่แสดงคือ', defaultValue: '' },
                { id: 'r_email', label: 'Email', placeholder: 'Email', warning: '*ถ้าไม่มีการกรอก ระบบจะแสดงผลตามข้อมูลผู้ติดต่อ ข้อมูลที่แสดงคือ kirk.bu@gmail.com', defaultValue: 'hongcharoendee@gmail.com' },
                { id: 'r_line', label: 'Line ID', placeholder: 'Line ID', warning: '*ถ้าไม่มีการกรอก ระบบจะแสดงผลตามข้อมูลผู้ติดต่อ ข้อมูลที่แสดงคือ @Propholic', defaultValue: 'agatejk' },
                { id: 'r_whatsapp', label: 'WhatsApp ID', placeholder: 'WhatsApp ID', warning: '*ถ้าไม่มีการกรอก ระบบจะแสดงผลตามข้อมูลผู้ติดต่อ ข้อมูลที่แสดงคือ', defaultValue: '' },
                { id: 'r_wechat', label: 'WeChat ID', placeholder: 'WeChat ID', warning: '*ถ้าไม่มีการกรอก ระบบจะแสดงผลตามข้อมูลผู้ติดต่อ ข้อมูลที่แสดงคือ', defaultValue: '' },
                { id: 'r_kakao', label: 'KakaoTalk ID', placeholder: 'KakaoTalk ID', warning: '*ถ้าไม่มีการกรอก ระบบจะแสดงผลตามข้อมูลผู้ติดต่อ ข้อมูลที่แสดงคือ', defaultValue: '' },
              ].map((field) => (
                <div key={field.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                  <label className="text-[13px] font-medium text-gray-700 md:col-span-1 pt-2">{field.label}</label>
                  <div className="md:col-span-3 space-y-1">
                    <input type="text" placeholder={field.placeholder} defaultValue={field.defaultValue} className="w-full md:w-1/2 border border-gray-300 px-3 py-2 rounded text-[13px] focus:outline-none focus:border-[#0088ff]" />
                    {field.warning && (
                      <p className="text-[12px] text-red-500">{field.warning}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Property Info Section */}
            <div id="property-info" className="bg-[#0088ff] text-white px-6 py-2.5 text-[14px] font-medium scroll-mt-24">
              ข้อมูลทรัพย์
            </div>
            
            <div className="p-6 space-y-4 pb-0">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <label className="text-[13px] font-medium text-gray-700 md:col-span-1">Building type</label>
                <div className="md:col-span-3">
                  <select 
                    value={buildingType}
                    onChange={(e) => setBuildingType(e.target.value)}
                    className="w-full md:w-1/2 border border-gray-300 px-3 py-2 rounded text-[13px] focus:outline-none focus:border-[#0088ff] bg-white"
                  >
                    <option value="" disabled hidden>ประเภทอสังหา</option>
                    <option value="คอนโด">คอนโด</option>
                    <option value="บ้าน">บ้าน</option>
                    <option value="ที่ดิน">ที่ดิน</option>
                    <option value="ตึกแถว อาคารพาณิชย์">ตึกแถว อาคารพาณิชย์</option>
                    <option value="สำนักงาน">สำนักงาน</option>
                    <option value="ทาวน์เฮ้าส์/ทาวน์โฮม">ทาวน์เฮ้าส์/ทาวน์โฮม</option>
                    <option value="โฮมออฟฟิศ">โฮมออฟฟิศ</option>
                    <option value="พื้นที่ขายของ">พื้นที่ขายของ</option>
                    <option value="โชว์รูม">โชว์รูม</option>
                    <option value="กิจการ โรงแรม หอพัก">กิจการ โรงแรม หอพัก</option>
                    <option value="โรงงาน โกดัง คลังสินค้า">โรงงาน โกดัง คลังสินค้า</option>
                    <option value="รีสอร์ต">รีสอร์ต</option>
                    <option value="วิลล่า">วิลล่า</option>
                    <option value="ซาวน่า">ซาวน่า</option>
                    <option value="ร้านอาหาร">ร้านอาหาร</option>
                    <option value="อพาร์ตเมนต์">อพาร์ตเมนต์</option>
                    <option value="บ้านแฝด">บ้านแฝด</option>
                    <option value="Co-Working Space">Co-Working Space</option>
                  </select>
                </div>
              </div>
              
              {buildingType !== "" && (
                <div className="space-y-4 pt-4 border-t border-gray-100">
                  
                  {/* 1. Basic Info & Pricing */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    <label className="text-[13px] font-medium text-gray-700 md:col-span-1">โครงการ</label>
                    <div className="md:col-span-3">
                      <select className="w-full md:w-1/2 border border-gray-300 px-3 py-2 rounded text-[13px] focus:outline-none focus:border-[#0088ff] bg-white">
                        <option>ไม่ทราบชื่อโครงการ</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    <label className="text-[13px] font-medium text-gray-700 md:col-span-1">ทำเล</label>
                    <div className="md:col-span-3">
                      <select className="w-full md:w-1/2 border border-gray-300 px-3 py-2 rounded text-[13px] focus:outline-none focus:border-[#0088ff] bg-white">
                        <option>ชลบุรี พัทยา บางแสน บางละมุง สัตหีบ</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                    <label className="text-[13px] font-medium text-gray-700 md:col-span-1 pt-2">Latitude</label>
                    <div className="md:col-span-3">
                      <input type="text" placeholder="Latitude (เช่น 13.7392)" className="w-full md:w-1/2 border border-gray-300 px-3 py-2 rounded text-[13px] focus:outline-none focus:border-[#0088ff]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start border-b border-gray-100 pb-4">
                    <label className="text-[13px] font-medium text-gray-700 md:col-span-1 pt-2">Longitude</label>
                    <div className="md:col-span-3 space-y-1">
                      <input type="text" placeholder="Longitude (เช่น 100.5778)" className="w-full md:w-1/2 border border-gray-300 px-3 py-2 rounded text-[13px] focus:outline-none focus:border-[#0088ff]" />
                      <p className="text-[12px] text-[#0088ff]">
                        กรุณากรอกพิกัด Latitude และ Longitude ที่แท้จริง (ตัวเลขเท่านั้น) เช่น 13.7392, 100.5778
                        <br/>
                        สามารถหาพิกัดได้จาก Google Maps โดยคลิกขวาที่ตำแหน่งแล้วเลือก "พิกัด" หรือค้นหาใน Google "latitude longitude ชื่อสถานที่"
                      </p>
                      <p className="text-[12px] text-red-500">
                        * หากกรอก Latitude และ Longitude ระบบจะใช้ค่าที่กรอกแสดงผลในหน้ารายละเอียดประกาศในส่วนดูแผนที่
                      </p>
                    </div>
                  </div>

                  {/* Post Type */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                    <label className="text-[13px] font-medium text-gray-700 md:col-span-1 pt-2">ประเภทโพส</label>
                    <div className="md:col-span-3 space-y-2 pt-2">
                      <label className="flex items-center gap-2 text-[13px] text-gray-700">
                        <input type="radio" name="post_type" className="text-[#6F42C1] focus:ring-[#6F42C1]" defaultChecked />
                        ขาย
                      </label>
                      <label className="flex items-center gap-2 text-[13px] text-gray-700">
                        <input type="radio" name="post_type" className="text-[#6F42C1] focus:ring-[#6F42C1]" />
                        เช่า
                      </label>
                      <label className="flex items-center gap-2 text-[13px] text-gray-700">
                        <input type="radio" name="post_type" className="text-[#6F42C1] focus:ring-[#6F42C1]" />
                        ขายดาวน์
                      </label>
                      <label className="flex items-center gap-2 text-[13px] text-gray-700">
                        <input type="radio" name="post_type" className="text-[#6F42C1] focus:ring-[#6F42C1]" />
                        ขายและเช่า
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    <label className="text-[13px] font-medium text-gray-700 md:col-span-1">ราคาเดิม</label>
                    <div className="md:col-span-3">
                      <input type="text" placeholder="ราคาเดิม" className="w-full md:w-1/4 border border-gray-300 px-3 py-2 rounded text-[13px] focus:outline-none focus:border-[#0088ff]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center border-b border-gray-100 pb-4">
                    <label className="text-[13px] font-medium text-gray-700 md:col-span-1">ราคาขาย</label>
                    <div className="md:col-span-3">
                      <input type="text" placeholder="ราคาขาย" defaultValue="7,950,000" className="w-full md:w-1/4 border border-gray-300 px-3 py-2 rounded text-[13px] focus:outline-none focus:border-[#0088ff]" />
                    </div>
                  </div>

                  {/* Room Details */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    <label className="text-[13px] font-medium text-gray-700 md:col-span-1">รหัสห้อง</label>
                    <div className="md:col-span-3">
                      <input type="text" placeholder="รหัสห้อง" className="w-full md:w-1/4 border border-gray-300 px-3 py-2 rounded text-[13px] focus:outline-none focus:border-[#0088ff]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                    <label className="text-[13px] font-medium text-gray-700 md:col-span-1 pt-2">บ้านเลขที่</label>
                    <div className="md:col-span-3 space-y-1">
                      <input type="text" placeholder="บ้านเลขที่" className="w-full md:w-1/4 border border-gray-300 px-3 py-2 rounded text-[13px] focus:outline-none focus:border-[#0088ff]" />
                      <p className="text-[12px] text-gray-500">ตัวอย่าง: 123, ABC123, 123/ABC, A1B2C3</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    <label className="text-[13px] font-medium text-gray-700 md:col-span-1">จำนวนห้องนอน</label>
                    <div className="md:col-span-3">
                      <select className="w-full md:w-1/4 border border-gray-300 px-3 py-2 rounded text-[13px] focus:outline-none focus:border-[#0088ff] bg-white">
                        <option>2 ห้องนอน</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    <label className="text-[13px] font-medium text-gray-700 md:col-span-1">จำนวนห้องเอนกประสงค์</label>
                    <div className="md:col-span-3">
                      <select className="w-full md:w-1/4 border border-gray-300 px-3 py-2 rounded text-[13px] focus:outline-none focus:border-[#0088ff] bg-white">
                        <option>ไม่มี</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    <label className="text-[13px] font-medium text-gray-700 md:col-span-1">จำนวนห้องน้ำ</label>
                    <div className="md:col-span-3">
                      <select className="w-full md:w-1/4 border border-gray-300 px-3 py-2 rounded text-[13px] focus:outline-none focus:border-[#0088ff] bg-white">
                        <option>2 ห้องน้ำ</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    <label className="text-[13px] font-medium text-gray-700 md:col-span-1">เลขตึก</label>
                    <div className="md:col-span-3">
                      <input type="text" placeholder="เลขตึก" className="w-full md:w-1/4 border border-gray-300 px-3 py-2 rounded text-[13px] focus:outline-none focus:border-[#0088ff]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    <label className="text-[13px] font-medium text-gray-700 md:col-span-1">ทิศ</label>
                    <div className="md:col-span-3">
                      <select className="w-full md:w-1/4 border border-gray-300 px-3 py-2 rounded text-[13px] focus:outline-none focus:border-[#0088ff] bg-white">
                        <option>ไม่ระบุทิศ</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    <label className="text-[13px] font-medium text-gray-700 md:col-span-1">ชั้นที่</label>
                    <div className="md:col-span-3">
                      <select className="w-full md:w-1/4 border border-gray-300 px-3 py-2 rounded text-[13px] focus:outline-none focus:border-[#0088ff] bg-white">
                        <option>17</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    <label className="text-[13px] font-medium text-gray-700 md:col-span-1">พื้นที่ ตร.ม.</label>
                    <div className="md:col-span-3">
                      <input type="text" placeholder="พื้นที่" defaultValue="106.00" className="w-full md:w-1/6 border border-gray-300 px-3 py-2 rounded text-[13px] focus:outline-none focus:border-[#0088ff]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start border-b border-gray-100 pb-4">
                    <label className="text-[13px] font-medium text-gray-700 md:col-span-1 pt-2">ลักษณะพิเศษอื่นๆ</label>
                    <div className="md:col-span-3 space-y-2 pt-2">
                      <label className="flex items-center gap-2 text-[13px] text-gray-700">
                        <input type="checkbox" className="rounded text-[#6F42C1] focus:ring-[#6F42C1]" />
                        Duplex
                      </label>
                      <label className="flex items-center gap-2 text-[13px] text-gray-700">
                        <input type="checkbox" className="rounded text-[#6F42C1] focus:ring-[#6F42C1]" />
                        Penthouse
                      </label>
                    </div>
                  </div>
                  
                  {/* TEXT FIELDS */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    <label className="text-[13px] font-medium text-gray-700 md:col-span-1">ชื่อประกาศ [TH]</label>
                    <div className="md:col-span-3">
                      <input type="text" placeholder="ชื่อประกาศ [TH]" defaultValue="Stunning Sea View Corner Unit | For Sale at La Royale Condominium" className="w-full md:w-3/4 border border-gray-300 px-3 py-2 rounded text-[13px] focus:outline-none focus:border-[#0088ff]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    <label className="text-[13px] font-medium text-gray-700 md:col-span-1">ชื่อประกาศ [EN]</label>
                    <div className="md:col-span-3 flex gap-2 w-full md:w-3/4">
                      <input type="text" placeholder="ชื่อประกาศ [EN]" className="w-full border border-gray-300 px-3 py-2 rounded text-[13px] focus:outline-none focus:border-[#0088ff]" />
                      <button type="button" className="bg-[#6F42C1] hover:bg-[#5A32A3] text-white px-4 py-2 rounded text-[13px] transition-colors">แปล</button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                    <label className="text-[13px] font-medium text-gray-700 md:col-span-1 pt-2">รายละเอียดห้อง [TH]</label>
                    <div className="md:col-span-3">
                      <textarea rows={10} placeholder="รายละเอียดห้อง [ถ้ามี]" defaultValue={`🔥 Hot Price: 7,950,000 Baht (Transfer fees 50/50)\n🏠 Ownership: Foreign Name Quota\nProperty Details:\n✅ 106 sq.m. of generous living space\n✅ 2 Bedrooms / 2 Bathrooms / Large Living Area\n✅ Excellent, move-in ready condition\n✅ Fully furnished with tasteful decor\n✅ Premium Corner Unit, Stunning Sea Views, and complete bedroom privacy (no neighboring walls!)\n📍 Location: Na Jomtien\n📍 Location map: https://maps.app.goo.gl/...\n☎️ More information: 096.906.6598`} className="w-full md:w-3/4 border border-gray-300 px-3 py-2 rounded text-[13px] focus:outline-none focus:border-[#0088ff]"></textarea>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start border-b border-gray-100 pb-4">
                    <label className="text-[13px] font-medium text-gray-700 md:col-span-1 pt-2">รายละเอียดห้อง (ถ้ามี) [EN]</label>
                    <div className="md:col-span-3 flex gap-2 w-full md:w-3/4">
                      <textarea rows={4} placeholder="รายละเอียดห้อง [ถ้ามี] [EN]" className="w-full border border-gray-300 px-3 py-2 rounded text-[13px] focus:outline-none focus:border-[#0088ff]"></textarea>
                      <button type="button" className="bg-[#6F42C1] hover:bg-[#5A32A3] text-white px-4 py-2 rounded text-[13px] h-fit transition-colors">แปล</button>
                    </div>
                  </div>

                  {/* PHOTOS */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start border-b border-gray-100 pb-4">
                    <label className="text-[13px] font-medium text-gray-700 md:col-span-1 pt-2">All photo</label>
                    <div className="md:col-span-3 space-y-4">
                      <div className="flex gap-2">
                        <button type="button" className="bg-[#2ecc71] hover:bg-[#27ae60] text-white px-4 py-2 rounded text-[13px] transition-colors">เพิ่มรูปภาพ...</button>
                        <button type="button" className="bg-[#58d68d] hover:bg-[#45b39d] text-white px-4 py-2 rounded text-[13px] transition-colors">เรียงลำดับใหม่</button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <div className="w-24 h-16 bg-gray-200"></div>
                        <div className="w-24 h-16 bg-gray-200"></div>
                        <div className="w-24 h-16 bg-gray-200"></div>
                        <div className="w-24 h-16 bg-gray-200"></div>
                        <div className="w-24 h-16 bg-gray-200"></div>
                        <div className="w-24 h-16 bg-gray-200"></div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center border-b border-gray-100 pb-4">
                    <label className="text-[13px] font-medium text-gray-700 md:col-span-1">แปลนห้อง/บ้าน</label>
                    <div className="md:col-span-3 flex gap-2">
                      <button type="button" className="bg-[#2ecc71] hover:bg-[#27ae60] text-white px-4 py-2 rounded text-[13px] transition-colors">เพิ่มรูปภาพ...</button>
                      <button type="button" className="bg-[#58d68d] hover:bg-[#45b39d] text-white px-4 py-2 rounded text-[13px] transition-colors">เรียงลำดับใหม่</button>
                    </div>
                  </div>

                  {/* TAGS & CHECKBOXES */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start border-b border-gray-100 pb-4">
                    <label className="text-[13px] font-medium text-gray-700 md:col-span-1 pt-2">Tag</label>
                    <div className="md:col-span-3 space-y-1">
                      <input type="text" className="w-full md:w-1/3 border border-gray-300 px-3 py-2 rounded text-[13px] focus:outline-none focus:border-[#0088ff]" />
                      <p className="text-[12px] text-red-500">* เพิ่มแท็กเพื่อจัดหมวดหมู่ข้อมูลได้โดยกด <span className="underline cursor-pointer">เพิ่มแท็ก</span></p>
                    </div>
                  </div>

                  {/* จุดเด่นทรัพย์ */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start border-b border-gray-100 pb-4">
                    <label className="text-[13px] font-medium text-gray-700 md:col-span-1 pt-2">จุดเด่นทรัพย์</label>
                    <div className="md:col-span-3">
                      <div className="text-[13px] font-medium mb-3">จุดเด่นทรัพย์</div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-3">
                        {['โควต้าต่างชาติ', 'จดทะเบียนบริษัทได้', 'ทรัพย์ NPA', 'ทรัพย์มือ 1', 'ผ่อนตรงเจ้าของ', 'เลี้ยงสัตว์ได้', 'ประกัน 1 เดือน'].map(item => (
                          <label key={item} className="flex items-center gap-2 text-[13px] text-gray-700">
                            <input type="checkbox" defaultChecked={item === 'โควต้าต่างชาติ'} className="rounded text-[#6F42C1] focus:ring-[#6F42C1] border-gray-300" />
                            {item}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* สิ่งอำนวยความสะดวก */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start border-b border-gray-100 pb-4">
                    <label className="text-[13px] font-medium text-gray-700 md:col-span-1 pt-2"></label>
                    <div className="md:col-span-3">
                      <div className="text-[13px] font-medium mb-3">สิ่งอำนวยความสะดวก</div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-3">
                        {['เครื่องครัว', 'ตู้เย็น', 'เครื่องปรับอากาศ', 'เตียงนอน', 'เครื่องซักผ้า', 'เครื่องทำน้ำอุ่น', 'ทีวี', 'เครื่องอบผ้า', 'Wi-Fi'].map(item => (
                          <label key={item} className="flex items-center gap-2 text-[13px] text-gray-700">
                            <input type="checkbox" className="rounded text-[#6F42C1] focus:ring-[#6F42C1] border-gray-300" />
                            {item}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ส่วนกลาง */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start border-b border-gray-100 pb-4">
                    <label className="text-[13px] font-medium text-gray-700 md:col-span-1 pt-2"></label>
                    <div className="md:col-span-3">
                      <div className="text-[13px] font-medium mb-3">ส่วนกลาง</div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-3">
                        {[
                          'ระบบรักษาความปลอดภัย', 'บาร์บีคิว', 'ที่จอดรถ', 'คาราโอเกะ', 'สนามเด็กเล่น', 'สนามเทนนิส', 
                          'ขอบแฮงเอาท์', 'ชอบออกกำลังกาย', 'สนามแบดมินตัน', 'โต๊ะสนุ๊ก', 'ฟิตเนส', 'ห้องหนังสือ',
                          'ซาวน่า', 'สระเด็ก', 'EV Charger', 'ลิฟต์ส่วนตัว', 'สนามบาส', 'คลับเฮ้าส์',
                          'ห้องประชุม', 'ร้านสะดวกซื้อ', 'สระว่ายน้ำ', 'สวนขนาดย่อม', 'Co-working space', 'Low-Rise'
                        ].map(item => (
                          <label key={item} className="flex items-center gap-2 text-[13px] text-gray-700">
                            <input type="checkbox" className="rounded text-[#6F42C1] focus:ring-[#6F42C1] border-gray-300" />
                            {item}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* สถานที่ใกล้เคียง */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start border-b border-gray-100 pb-4">
                    <label className="text-[13px] font-medium text-gray-700 md:col-span-1 pt-2"></label>
                    <div className="md:col-span-3">
                      <div className="text-[13px] font-medium mb-3">สถานที่ใกล้เคียง</div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-3">
                        {['ใกล้สวนสาธารณะ', 'ใกล้รถไฟฟ้า', 'ใกล้โรงพยาบาล', 'ใกล้ห้าง', 'ใกล้ตลาด', 'ใกล้สนามบิน', 'ใกล้ทางด่วน', 'ใกล้สถานศึกษา', 'ใกล้ป้ายรถเมล์'].map(item => (
                          <label key={item} className="flex items-center gap-2 text-[13px] text-gray-700">
                            <input type="checkbox" className="rounded text-[#6F42C1] focus:ring-[#6F42C1] border-gray-300" />
                            {item}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* วิวและสถานที่ */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start border-b border-gray-100 pb-4">
                    <label className="text-[13px] font-medium text-gray-700 md:col-span-1 pt-2"></label>
                    <div className="md:col-span-3">
                      <div className="text-[13px] font-medium mb-3">วิวและสถานที่</div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-3">
                        {['วิวแม่น้ำ', 'วิวทะเล', 'วิวโรแมนติก', 'วิวตึกสูง', 'วิวภูเขา', 'วิวทะเลสาบ', 'วิวสวน'].map(item => (
                          <label key={item} className="flex items-center gap-2 text-[13px] text-gray-700">
                            <input type="checkbox" className="rounded text-[#6F42C1] focus:ring-[#6F42C1] border-gray-300" />
                            {item}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* LINKS */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    <label className="text-[13px] font-medium text-gray-700 md:col-span-1">Embed link (เช่น matterport) [ถ้ามี]</label>
                    <div className="md:col-span-3">
                      <input type="text" placeholder="Embed link (เช่น matterport) [ถ้ามี]" className="w-full md:w-1/2 border border-gray-300 px-3 py-2 rounded text-[13px] focus:outline-none focus:border-[#0088ff]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                    <label className="text-[13px] font-medium text-gray-700 md:col-span-1 pt-2">Youtube ID [ถ้ามี]</label>
                    <div className="md:col-span-3 space-y-1">
                      <input type="text" placeholder="Youtube ID [ถ้ามี]" className="w-full md:w-1/4 border border-gray-300 px-3 py-2 rounded text-[13px] focus:outline-none focus:border-[#0088ff]" />
                      <p className="text-[12px] text-red-500">* ถ้าใส่ url youtube ระบบจะแปลงเป็น code ให้โดยอัตโนมัติหลังจากบันทึกข้อมูลเรียบร้อย</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center border-b border-gray-100 pb-4">
                    <label className="text-[13px] font-medium text-gray-700 md:col-span-1">Tiktok url</label>
                    <div className="md:col-span-3">
                      <input type="text" placeholder="Tiktok url" className="w-full md:w-1/2 border border-gray-300 px-3 py-2 rounded text-[13px] focus:outline-none focus:border-[#0088ff]" />
                    </div>
                  </div>

                  {/* HOT DEAL */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center border-b border-gray-100 pb-4">
                    <label className="text-[13px] font-medium text-gray-700 md:col-span-1">ปักหมุด [Hot Deal]</label>
                    <div className="md:col-span-3 space-y-2 pt-2">
                      <label className="flex items-center gap-2 text-[13px] text-[#2ecc71]">
                        <input type="radio" name="hot_deal" className="text-[#6F42C1] focus:ring-[#6F42C1]" />
                        Yes
                      </label>
                      <label className="flex items-center gap-2 text-[13px] text-[#6F42C1]">
                        <input type="radio" name="hot_deal" className="text-[#6F42C1] focus:ring-[#6F42C1]" defaultChecked />
                        No
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    <label className="text-[13px] font-medium text-gray-700 md:col-span-1">วันเริ่มปักหมุด</label>
                    <div className="md:col-span-3 flex items-center gap-2">
                      <input type="date" className="border border-gray-300 px-3 py-2 rounded text-[13px] focus:outline-none focus:border-[#0088ff]" />
                      <button type="button" className="bg-[#e74c3c] text-white px-2 py-1 text-[11px] rounded">ลบ</button>
                      <span className="text-[12px] text-gray-700">*ลบเป็นค่าว่าง ถ้าต้องการแสดงตลอดเวลา</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center border-b border-gray-100 pb-4">
                    <label className="text-[13px] font-medium text-gray-700 md:col-span-1">วันสิ้นสุดปักหมุด</label>
                    <div className="md:col-span-3 flex items-center gap-2">
                      <input type="date" className="border border-gray-300 px-3 py-2 rounded text-[13px] focus:outline-none focus:border-[#0088ff]" />
                      <button type="button" className="bg-[#e74c3c] text-white px-2 py-1 text-[11px] rounded">ลบ</button>
                      <span className="text-[12px] text-gray-700">*ลบเป็นค่าว่าง ถ้าต้องการแสดงตลอดเวลา</span>
                    </div>
                  </div>

                  {/* STATUSES */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center border-b border-gray-100 pb-4">
                    <label className="text-[13px] font-medium text-gray-700 md:col-span-1">สถานะประกาศ</label>
                    <div className="md:col-span-3 space-y-2 pt-2">
                      <label className="flex items-center gap-2 text-[13px] text-[#6F42C1]">
                        <input type="radio" name="listing_status" className="text-[#6F42C1] focus:ring-[#6F42C1]" defaultChecked />
                        ยังว่าง
                      </label>
                      <label className="flex items-center gap-2 text-[13px] text-gray-700">
                        <input type="radio" name="listing_status" className="text-[#6F42C1] focus:ring-[#6F42C1]" />
                        ขายแล้ว/เช่าแล้ว
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                    <label className="text-[13px] font-medium text-gray-700 md:col-span-1 pt-2">สถานะ</label>
                    <div className="md:col-span-3 space-y-2 pt-2">
                      <label className="flex items-center gap-2 text-[13px] text-[#6F42C1] font-medium">
                        <input type="radio" name="sys_status" className="text-[#6F42C1] focus:ring-[#6F42C1]" defaultChecked />
                        ON (แสดงหน้าเว็บไซต์)
                      </label>
                      <label className="flex items-center gap-2 text-[13px] text-gray-500">
                        <input type="radio" name="sys_status" className="text-[#6F42C1] focus:ring-[#6F42C1]" />
                        OFF (ไม่แสดง)
                      </label>
                      <label className="flex items-center gap-2 text-[13px] text-[#f39c12]">
                        <input type="radio" name="sys_status" className="text-[#6F42C1] focus:ring-[#6F42C1]" />
                        Draft (แบบร่าง)
                      </label>
                      <label className="flex items-center gap-2 text-[13px] text-[#e74c3c]">
                        <input type="radio" name="sys_status" className="text-[#6F42C1] focus:ring-[#6F42C1]" />
                        Reject (ไม่ผ่าน ระบุเหตุผล)
                      </label>
                    </div>
                  </div>

                  {/* Reason & Save note */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start pt-4 border-t border-gray-100">
                    <label className="text-[13px] font-medium text-gray-700 md:col-span-1 pt-2">เหตุผล</label>
                    <div className="md:col-span-3">
                      <textarea rows={3} placeholder="ความเห็นเพิ่มเติม" className="w-full md:w-1/2 border border-gray-300 px-3 py-2 rounded text-[13px] focus:outline-none focus:border-[#0088ff]"></textarea>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center border-b border-gray-100 pb-4 pt-4">
                    <label className="text-[13px] font-medium text-gray-700 md:col-span-1">บันทึก</label>
                    <div className="md:col-span-3">
                      <button type="button" className="bg-[#0088ff] hover:bg-[#0077cc] text-white px-4 py-1.5 rounded text-[13px] transition-colors flex items-center gap-1"><Plus className="w-4 h-4"/> เพิ่มบันทึก</button>
                    </div>
                  </div>

                </div>
              )}

            </div>
            
            {/* Buyer/Renter Info Section */}
            <div id="buyer-info" className="bg-[#0088ff] text-white px-6 py-2.5 text-[14px] font-medium mt-4 scroll-mt-24">
              ข้อมูลผู้ซื้อ/เช่า
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <label className="text-[13px] font-medium text-gray-700 md:col-span-1">ประเภทสัญญา</label>
                <div className="md:col-span-3 space-y-2">
                  <label className="flex items-center gap-2 text-[13px] text-gray-700">
                    <input type="radio" name="contract_type" className="text-[#6F42C1] focus:ring-[#6F42C1]" defaultChecked />
                    ขาย
                  </label>
                  <label className="flex items-center gap-2 text-[13px] text-gray-700">
                    <input type="radio" name="contract_type" className="text-[#6F42C1] focus:ring-[#6F42C1]" />
                    เช่า
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <label className="text-[13px] font-medium text-gray-700 md:col-span-1">ผู้ซื้อ/เช่า</label>
                <div className="md:col-span-3">
                  <input type="text" placeholder="ผู้ซื้อ/เช่า" className="w-full md:w-1/2 border border-gray-300 px-3 py-2 rounded text-[13px] focus:outline-none focus:border-[#0088ff]" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <label className="text-[13px] font-medium text-gray-700 md:col-span-1">โทรศัพท์</label>
                <div className="md:col-span-3">
                  <input type="text" placeholder="โทรศัพท์" className="w-full md:w-1/2 border border-gray-300 px-3 py-2 rounded text-[13px] focus:outline-none focus:border-[#0088ff]" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <label className="text-[13px] font-medium text-gray-700 md:col-span-1">วันที่โอน/เข้าพัก</label>
                <div className="md:col-span-3">
                  <input type="date" className="w-full md:w-1/4 border border-gray-300 px-3 py-2 rounded text-[13px] focus:outline-none focus:border-[#0088ff] text-gray-700" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <label className="text-[13px] font-medium text-gray-700 md:col-span-1">ราคาซื้อ/เช่าได้</label>
                <div className="md:col-span-3">
                  <input type="text" placeholder="ราคาซื้อ/เช่าได้" className="w-full md:w-1/2 border border-gray-300 px-3 py-2 rounded text-[13px] focus:outline-none focus:border-[#0088ff]" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                <label className="text-[13px] font-medium text-gray-700 md:col-span-1 pt-2">รายละเอียดอื่นๆ</label>
                <div className="md:col-span-3">
                  <textarea rows={3} placeholder="รายละเอียดอื่นๆ" className="w-full md:w-1/2 border border-gray-300 px-3 py-2 rounded text-[13px] focus:outline-none focus:border-[#0088ff]"></textarea>
                </div>
              </div>

              <div className="mt-8 border-t border-gray-200 pt-6">
                <label className="text-[13px] font-medium text-gray-700 block mb-4">แนบไฟล์เพิ่มเติม</label>
                <table className="w-full border-collapse border border-gray-200 text-[13px]">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">หัวข้อ</th>
                      <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">ไฟล์</th>
                      <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">วันที่สร้าง / By</th>
                      <th className="border border-gray-200 px-4 py-2 w-16 text-center"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2"></td>
                      <td className="border border-gray-200 px-4 py-2"></td>
                      <td className="border border-gray-200 px-4 py-2"></td>
                      <td className="border border-gray-200 px-4 py-2 text-center">
                        <button className="bg-[#2ecc71] hover:bg-[#27ae60] text-white p-1.5 rounded transition-colors">
                          <Plus className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Time Info Section */}
            <div id="time-info" className="bg-[#0088ff] text-white px-6 py-2.5 text-[14px] font-medium mt-4 scroll-mt-24">
              ข้อมูลเวลา
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <label className="text-[13px] font-medium text-gray-700 md:col-span-1">วันที่สร้าง</label>
                <div className="md:col-span-3 text-[13px] text-gray-700">
                  2026-05-20 12:57:59
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <label className="text-[13px] font-medium text-gray-700 md:col-span-1">วันที่แก้ไขล่าสุด</label>
                <div className="md:col-span-3 text-[13px] text-gray-700">
                  2026-05-20 14:30:31
                </div>
              </div>
            </div>
            
            {/* Footer Buttons */}
            <div className="bg-white border-t border-gray-200 px-6 py-4 flex gap-3 rounded-b-md sticky bottom-0 z-10 shadow-sm">
              <button className="bg-[#6F42C1] hover:bg-[#5A32A3] text-white px-6 py-2 rounded text-[13px] font-medium transition-colors">
                Update
              </button>
              <button type="reset" className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2 rounded text-[13px] font-medium transition-colors">
                Reset
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </AdminShell>
  );
}
