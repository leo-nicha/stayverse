'use client';

import React, { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { AdminShell } from '../../../admin/AdminShell';
import { Download, ChevronDown } from 'lucide-react';

function PropertyDetailsContent({ id }: { id: string }) {
  const router = useRouter();

  // Mock data for equity calculation
  const accumulated = 800000;
  const total = 3600000;
  const totalMonths = 36;
  const monthlyPayment = total / totalMonths;
  const currentMonth = Math.floor(accumulated / monthlyPayment);
  const monthPercentage = Math.round((currentMonth / totalMonths) * 100);
  const blocks = Array.from({ length: totalMonths }, (_, i) => i < currentMonth);

  const thaiMonths = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
  const installments = Array.from({ length: currentMonth + 1 }, (_, i) => {
    let mIdx = 5 - i;
    let yIdx = 2569;
    while (mIdx < 0) {
      mIdx += 12;
      yIdx -= 1;
    }
    return {
      installment: i + 1,
      monthStr: `${thaiMonths[mIdx]} ${yIdx}`,
      amount: monthlyPayment,
      status: i === 0 ? 'รอดำเนินการ' : 'ชำระแล้ว'
    };
  });

  return (
    <AdminShell activeItem="my_properties" role="tenant">
      <div className="min-h-screen bg-[#f8f9fc]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 py-4 bg-white border-b border-gray-100">
          <h1 className="text-xl font-bold text-gray-800 tracking-tight">
            โครงการของฉัน
          </h1>
          <div className="text-[13px] text-gray-400 mt-2 sm:mt-0 flex items-center space-x-2 select-none">
            <span className="hover:text-[#6F42C1] cursor-pointer transition-colors" onClick={() => router.push('/tenant/my_properties')}>Home</span>
            <span>/</span>
            <span className="text-[#6F42C1]">โครงการของฉัน</span>
          </div>
        </div>

        <div className="p-6 space-y-6">
          
          {/* 1. Contract & Property Summary */}
          <div className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm">
            <div className="px-5 py-3 border-b border-gray-200">
              <h2 className="text-[15px] font-bold text-gray-800">
                สรุปข้อมูลสัญญาและทรัพย์
              </h2>
            </div>
            <div className="p-5 flex flex-col md:flex-row gap-6">
              {/* Image */}
              <div className="w-full md:w-64 h-36 rounded-md overflow-hidden shrink-0 border border-gray-200">
                <img 
                  src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop" 
                  alt="Property" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Details */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Column 1 */}
                <div className="space-y-3">
                  <div>
                    <div className="font-bold text-gray-800 text-[15px]">สเตย์เวิร์ส สุขุมวิท 23</div>
                    <div className="text-[#0088FF] text-xs mt-1 cursor-pointer hover:underline">รายละเอียดโครงการ</div>
                  </div>
                </div>

                {/* Column 2 */}
                <div className="space-y-1">
                  <div className="font-bold text-gray-800 text-[15px]">ชื่อผู้ซื้อ/เช่า</div>
                  <div className="text-gray-600 text-[13px]">นายสมชาย มีเงินดี</div>
                </div>

                {/* Column 3 */}
                <div className="space-y-2">
                  <div className="font-bold text-gray-800 text-[15px]">Badge</div>
                  <div className="text-gray-600 text-[13px]">ป้ายสถานะ: เช่าซื้อ</div>
                  <div className="inline-block bg-[#2E8B57] text-white text-[11px] font-bold px-3 py-1 rounded-full">
                    เช่าซื้อ
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            
            {/* Left Column: Tracker & Documents */}
            <div className="xl:col-span-1 space-y-6">
              
              {/* Tracker */}
              <div className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm h-fit">
                <div className="px-5 py-3 border-b border-gray-200">
                  <h2 className="text-[15px] font-bold text-gray-800">
                    แผงควบคุมและติดตามมูลค่าสะสม
                  </h2>
                </div>
                <div className="p-6 flex flex-col gap-4">
                  <div className="flex justify-between items-end">
                    <div className="text-[15px] font-bold text-gray-900">ความคืบหน้าจำนวนงวด</div>
                    <div className="text-[15px] text-gray-700">{currentMonth}/{totalMonths} เดือน ({monthPercentage}%)</div>
                  </div>
                  <div className="flex gap-[3px] w-full h-7">
                    {blocks.map((isFilled, idx) => (
                      <div 
                        key={idx} 
                        className={`flex-1 rounded-sm border ${isFilled ? 'bg-[#0088FF] border-[#0088FF]' : 'bg-[#E5F2FF] border-[#B3D9FF]'}`}
                      ></div>
                    ))}
                  </div>
                  <div className="text-gray-600 text-[13px] mt-1 text-center">
                    ยอดสะสม {accumulated.toLocaleString()} / ราคาเต็ม {total.toLocaleString()} บาท
                  </div>
                </div>
              </div>

              {/* Document Hub */}
              <div className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm h-fit">
                <div className="px-4 py-3 border-b border-gray-200">
                  <h2 className="text-[14px] font-bold text-gray-800">
                    ศูนย์รวมเอกสารสัญญาและรายการชำระเงิน
                  </h2>
                </div>
                <div className="p-4 space-y-6">
                  <h3 className="font-bold text-[14px] text-gray-800">เอกสารหลัก</h3>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-[13px] text-gray-800">สัญญาเช่าซื้อ</div>
                    <button className="bg-[#2A3F54] hover:bg-[#1E2E3E] text-white text-[12px] px-4 py-1.5 rounded flex items-center gap-2 transition-colors">
                      <Download className="w-3.5 h-3.5" />
                      ดาวน์โหลด
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-[13px] text-gray-800">ใบยินยอม PDPA</div>
                    <button className="bg-[#2A3F54] hover:bg-[#1E2E3E] text-white text-[12px] px-4 py-1.5 rounded flex items-center gap-2 transition-colors">
                      <Download className="w-3.5 h-3.5" />
                      ดาวน์โหลด
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Statement Hub */}
            <div className="xl:col-span-2 bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm flex flex-col h-full">
              <div className="px-4 py-3 border-b border-gray-200 shrink-0">
                <h3 className="text-[14px] font-bold text-gray-800">
                  รายการเดินบัญชีและใบเสร็จ
                </h3>
              </div>
              <div className="overflow-x-auto overflow-y-auto flex-1">
                <table className="w-full text-left text-[12px]">
                  <thead className="sticky top-0 z-10">
                    <tr className="bg-gray-50 border-b border-gray-200 text-gray-700">
                      <th className="py-2.5 px-3 font-bold border-r border-gray-200 text-center">งวดที่</th>
                      <th className="py-2.5 px-3 font-bold border-r border-gray-200 text-center">ประจำเดือน</th>
                      <th className="py-2.5 px-3 font-bold border-r border-gray-200 text-center">ยอดชำระ</th>
                      <th className="py-2.5 px-3 font-bold border-r border-gray-200 text-center">สถานะ</th>
                      <th className="py-2.5 px-3 font-bold border-r border-gray-200 text-center">ใบเสร็จ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {installments.map((inst) => (
                      <tr key={inst.installment} className="border-b border-gray-200 hover:bg-gray-50/50 transition-colors">
                        <td className="py-2.5 px-3 border-r border-gray-200 text-center text-gray-800">{inst.installment}</td>
                        <td className="py-2.5 px-3 border-r border-gray-200 text-center text-gray-800">{inst.monthStr}</td>
                        <td className="py-2.5 px-3 border-r border-gray-200 text-center text-gray-800">{inst.amount.toLocaleString()}</td>
                        <td className="py-2.5 px-3 border-r border-gray-200 text-center">
                          {inst.status === 'รอดำเนินการ' ? (
                            <span className="bg-[#FDE68A] text-[#B45309] px-2 py-0.5 rounded text-[11px] font-medium">รอดำเนินการ</span>
                          ) : (
                            <span className="bg-[#D1FAE5] text-[#047857] px-2 py-0.5 rounded text-[11px] font-medium border border-[#A7F3D0]">ชำระแล้ว</span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 border-r border-gray-200 text-center text-gray-500">
                          <button className="hover:text-gray-800"><Download className="w-4 h-4 mx-auto" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </div>
      </div>
    </AdminShell>
  );
}

export default function TenantPropertyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-[#f4f7f9] text-gray-800">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#CF7536]"></div>
      </div>
    }>
      <PropertyDetailsContent id={resolvedParams.id} />
    </Suspense>
  );
}
