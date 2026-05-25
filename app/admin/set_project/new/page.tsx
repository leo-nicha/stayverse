'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AdminShell } from '../../AdminShell';
import { useTranslation } from '@/context/LanguageContext';
import { Trash2, Plus, ArrowLeft } from 'lucide-react';

interface ProjectItem {
  id: string;
  image: string;
  nameTh: string;
  nameEn: string;
  type: string;
  constructionStatus: string;
  sortOrder: number;
  status: 'ON' | 'OFF';
  area?: string;
  developer?: string;
  units?: string;
  areaSize?: string;
  floors?: string;
  details?: string;
  detailsThHtml?: string;
  detailsEnHtml?: string;
  facilities?: string[];
  stations?: { name: string; distance: string }[];
  stores?: { name: string; distance: string }[];
  schools?: { name: string; distance: string }[];
  hospitals?: { name: string; distance: string }[];
  youtubeIds?: string[];
  googleMapUrl?: string;
  latitude?: string;
  longitude?: string;
  metaTitleTh?: string;
  metaTitleEn?: string;
  metaKeywordTh?: string;
  metaKeywordEn?: string;
  metaDescTh?: string;
  metaDescEn?: string;
  seoBottomThHtml?: string;
  seoBottomEnHtml?: string;
  featured?: 'ON' | 'OFF';
}

function NewProjectFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { language } = useTranslation();
  const isTh = language === 'th';
  const editingId = searchParams.get('id');

  // Master lists
  const [projects, setProjects] = useState<ProjectItem[]>([]);

  // Form states
  const [area, setArea] = useState('');
  const [projectType, setProjectType] = useState('');
  const [constructionStatus, setConstructionStatus] = useState('โครงการพร้อมอยู่');
  const [nameTh, setNameTh] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [developer, setDeveloper] = useState('');
  const [units, setUnits] = useState('');
  const [areaSize, setAreaSize] = useState('');
  const [floors, setFloors] = useState('');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=150&auto=format&fit=crop&q=60');
  const [details, setDetails] = useState('');
  
  // Rich text mockup content states
  const [detailsThHtml, setDetailsThHtml] = useState('');
  const [detailsEnHtml, setDetailsEnHtml] = useState('');

  // Facilities Checklist
  const facilityOptions1 = [
    'Low-Rise', 'จอดรถใต้ดิน', 'Co-working space', 'ระบบรักษาความปลอดภัย', 
    'สนามบาส', 'โต๊ะสนุก', 'ที่จอดรถ', 'ห้องประชุม', 
    'สวนแสงอาทิตย์', 'ห้องหนังสือ', 'สนามเด็กเล่น', 'สระว่ายน้ำ', 'สระเด็ก'
  ];
  const facilityOptions2 = [
    'ลิฟต์ส่วนตัว', 'สระน้ำลอยฟ้า', 'EV Charger', 'สนามแบดมินตัน', 
    'คลับเฮาส์', 'ฟิตเนส / ยิม', 'สวนหย่อม/สวนป่า', 'คาราโอเกะ', 
    'ร้านสะดวกซื้อ', 'ซาวน่า', 'สนามเทนนิส'
  ];
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);

  // Dynamic rows lists
  const [stations, setStations] = useState<{ name: string; distance: string }[]>([{ name: '', distance: '' }]);
  const [stores, setStores] = useState<{ name: string; distance: string }[]>([{ name: '', distance: '' }]);
  const [schools, setSchools] = useState<{ name: string; distance: string }[]>([{ name: '', distance: '' }]);
  const [hospitals, setHospitals] = useState<{ name: string; distance: string }[]>([{ name: '', distance: '' }]);
  const [youtubeIds, setYoutubeIds] = useState<string[]>(['']);

  // Map & Location URLs
  const [googleMapUrl, setGoogleMapUrl] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  // SEO & Meta tags
  const [metaTitleTh, setMetaTitleTh] = useState('รวมประกาศ #post_type# คอนโด #project_name_th# #project_name_en# ราคาถูก');
  const [metaTitleEn, setMetaTitleEn] = useState('Meta Title EN [SEO]');
  const [metaKeywordTh, setMetaKeywordTh] = useState('ประกาศ #post_type# #คอนโด# #ชื่อโครงการ_th# #ชื่อโครงการ_en#,คอนโดใหม่,คอนโดพร้อมอยู่,ขายใบจองคอนโด,ขายดาวน์คอนโด');
  const [metaKeywordEn, setMetaKeywordEn] = useState('Meta Keyword EN SEO [200 ตัวอักษร]');
  const [metaDescTh, setMetaDescTh] = useState('ค้นหาประกาศ #post_type# คอนโด #project_name_th# #project_name_en# ใกล้มหาวิทยาลัย ราคาถูก มีให้เลือกมากมาย <rent>เริ่มต้น #start_rent# บ/เดือน</rent> <sale>ราคาขายเริ่มต้น #start_sale# บาท</sale>');
  const [metaDescEn, setMetaDescEn] = useState('Meta description EN SEO [200 ตัวอักษร]');
  const [seoBottomThHtml, setSeoBottomThHtml] = useState(
    `<h3>ประกาศ #post_type#คอนโด #project_name_th# #project_name_en# ใกล้มหาวิทยาลัย ราคาถูก</h3>\n` +
    `<p>คอนโด#project_name_th# #project_name_en# <strong><dev>พัฒนาโดย #project_developer#</dev></strong> <unit>โดยมีทั้งหมด #project_total_unit#ยูนิต</unit> <unit> สูงทั้งหมด #project_total_floor# ชั้น</unit> <area> บนพื้นที่ #project_area_size#</area> <rent> ค่าเช่าเริ่มต้น #start_rent# บาท/เดือน</rent> <sale>ราคาขายเริ่มต้น #start_sale# บาท</sale> มีห้องให้เลือกหลายรูปแบบ ทั้งห้องสตูดิโอ คอนโด 1 ห้องนอน หรือ 2 ห้องนอน หรือแบบอื่นๆ ห้องสวยเก๋ ห้องแต่งแต่งสวยงาม เครื่องใช้ไฟฟ้าครบ พร้อมเข้าอยู่ <university>โครงการอยู่ใกล้กับมหาวิทยาลัย อาทิ #university_list#</university></p>\n` +
    `<p>หากคุณมีความสนใจซื้อ <strong><strong >ซื้อ , </strong>#post_type#<strong>คอนโดราคาถูก คุ้มค่า</strong> สามารถติดต่อได้ที่ <strong>www.propholicshop.com</strong>`
  );
  const [seoBottomEnHtml, setSeoBottomEnHtml] = useState('ข้อความ SEO EN ด้านล่างเพจ [HTML]');

  // Sorting and status toggles
  const [sortOrder, setSortOrder] = useState('999');
  const [featured, setFeatured] = useState<'ON' | 'OFF'>('OFF');
  const [status, setStatus] = useState<'ON' | 'OFF'>('OFF');

  // Load project lists and fill fields if editing
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('stayverse_set_projects');
      if (stored) {
        try {
          const parsed = JSON.parse(stored) as ProjectItem[];
          setProjects(parsed);

          if (editingId) {
            const project = parsed.find((p) => p.id === editingId);
            if (project) {
              setArea(project.area ?? '');
              setProjectType(project.type ?? '');
              setConstructionStatus(project.constructionStatus ?? 'โครงการพร้อมอยู่');
              setNameTh(project.nameTh ?? '');
              setNameEn(project.nameEn ?? '');
              setDeveloper(project.developer ?? '');
              setUnits(project.units ?? '');
              setAreaSize(project.areaSize ?? '');
              setFloors(project.floors ?? '');
              setImage(project.image ?? '');
              setDetails(project.details ?? '');
              setDetailsThHtml(project.detailsThHtml ?? '');
              setDetailsEnHtml(project.detailsEnHtml ?? '');
              setSelectedFacilities(project.facilities ?? []);
              setStations(project.stations && project.stations.length > 0 ? project.stations : [{ name: '', distance: '' }]);
              setStores(project.stores && project.stores.length > 0 ? project.stores : [{ name: '', distance: '' }]);
              setSchools(project.schools && project.schools.length > 0 ? project.schools : [{ name: '', distance: '' }]);
              setHospitals(project.hospitals && project.hospitals.length > 0 ? project.hospitals : [{ name: '', distance: '' }]);
              setYoutubeIds(project.youtubeIds && project.youtubeIds.length > 0 ? project.youtubeIds : ['']);
              setGoogleMapUrl(project.googleMapUrl ?? '');
              setLatitude(project.latitude ?? '');
              setLongitude(project.longitude ?? '');
              setMetaTitleTh(project.metaTitleTh ?? 'รวมประกาศ #post_type# คอนโด #project_name_th# #project_name_en# ราคาถูก');
              setMetaTitleEn(project.metaTitleEn ?? 'Meta Title EN [SEO]');
              setMetaKeywordTh(project.metaKeywordTh ?? 'ประกาศ #post_type# #คอนโด# #ชื่อโครงการ_th# #ชื่อโครงการ_en#,คอนโดใหม่,คอนโดพร้อมอยู่,ขายใบจองคอนโด,ขายดาวน์คอนโด');
              setMetaKeywordEn(project.metaKeywordEn ?? 'Meta Keyword EN SEO [200 ตัวอักษร]');
              setMetaDescTh(project.metaDescTh ?? 'ค้นหาประกาศ #post_type# คอนโด #project_name_th# #project_name_en# ใกล้มหาวิทยาลัย ราคาถูก มีให้เลือกมากมาย <rent>เริ่มต้น #start_rent# บ/เดือน</rent> <sale>ราคาขายเริ่มต้น #start_sale# บาท</sale>');
              setMetaDescEn(project.metaDescEn ?? 'Meta description EN SEO [200 ตัวอักษร]');
              setSeoBottomThHtml(project.seoBottomThHtml ?? '');
              setSeoBottomEnHtml(project.seoBottomEnHtml ?? 'ข้อความ SEO EN ด้านล่างเพจ [HTML]');
              setSortOrder(String(project.sortOrder ?? 999));
              setFeatured(project.featured ?? 'OFF');
              setStatus(project.status ?? 'OFF');
            }
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, [editingId]);

  // Translate name TH to EN mockup
  const handleTranslateName = () => {
    if (!nameTh) {
      alert(isTh ? 'กรุณากรอกชื่อโครงการภาษาไทยก่อน' : 'Please enter the Thai name first');
      return;
    }
    // Simple mock translation behavior
    const cleaned = nameTh.replace(/คอนโด/g, 'Condo').replace(/บ้าน/g, 'House').replace(/และ/g, 'and');
    setNameEn(cleaned + ' Project');
  };

  // Facility Checklist toggle
  const handleToggleFacility = (facility: string) => {
    if (selectedFacilities.includes(facility)) {
      setSelectedFacilities(selectedFacilities.filter((item) => item !== facility));
    } else {
      setSelectedFacilities([...selectedFacilities, facility]);
    }
  };

  // Dynamic row additions/removals
  const addRow = (list: any[], setList: Function) => {
    setList([...list, { name: '', distance: '' }]);
  };
  const removeRow = (list: any[], setList: Function, index: number) => {
    if (list.length === 1) return;
    setList(list.filter((_, idx) => idx !== index));
  };
  const updateRow = (list: any[], setList: Function, index: number, field: string, val: string) => {
    const updated = list.map((item, idx) => {
      if (idx === index) {
        return { ...item, [field]: val };
      }
      return item;
    });
    setList(updated);
  };

  // Youtube ID additions/removals
  const addYoutubeId = () => setYoutubeIds([...youtubeIds, '']);
  const removeYoutubeId = (idx: number) => {
    if (youtubeIds.length === 1) return;
    setYoutubeIds(youtubeIds.filter((_, i) => i !== idx));
  };
  const updateYoutubeId = (idx: number, val: string) => {
    setYoutubeIds(youtubeIds.map((item, i) => (i === idx ? val : item)));
  };

  // Reset form
  const handleReset = () => {
    setArea('');
    setProjectType('');
    setConstructionStatus('โครงการพร้อมอยู่');
    setNameTh('');
    setNameEn('');
    setDeveloper('');
    setUnits('');
    setAreaSize('');
    setFloors('');
    setImage('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=150&auto=format&fit=crop&q=60');
    setDetails('');
    setDetailsThHtml('');
    setDetailsEnHtml('');
    setSelectedFacilities([]);
    setStations([{ name: '', distance: '' }]);
    setStores([{ name: '', distance: '' }]);
    setSchools([{ name: '', distance: '' }]);
    setHospitals([{ name: '', distance: '' }]);
    setYoutubeIds(['']);
    setGoogleMapUrl('');
    setLatitude('');
    setLongitude('');
    setMetaTitleTh('รวมประกาศ #post_type# คอนโด #project_name_th# #project_name_en# ราคาถูก');
    setMetaTitleEn('Meta Title EN [SEO]');
    setMetaKeywordTh('ประกาศ #post_type# #คอนโด# #ชื่อโครงการ_th# #ชื่อโครงการ_en#,คอนโดใหม่,คอนโดพร้อมอยู่,ขายใบจองคอนโด,ขายดาวน์คอนโด');
    setMetaKeywordEn('Meta Keyword EN SEO [200 ตัวอักษร]');
    setMetaDescTh('ค้นหาประกาศ #post_type# คอนโด #project_name_th# #project_name_en# ใกล้มหาวิทยาลัย ราคาถูก มีให้เลือกมากมาย <rent>เริ่มต้น #start_rent# บ/เดือน</rent> <sale>ราคาขายเริ่มต้น #start_sale# บาท</sale>');
    setMetaDescEn('Meta description EN SEO [200 ตัวอักษร]');
    setSeoBottomThHtml(
      `<h3>ประกาศ #post_type#คอนโด #project_name_th# #project_name_en# ใกล้มหาวิทยาลัย ราคาถูก</h3>\n` +
      `<p>คอนโด#project_name_th# #project_name_en# <strong><dev>พัฒนาโดย #project_developer#</dev></strong> <unit>โดยมีทั้งหมด #project_total_unit#ยูนิต</unit> <unit> สูงทั้งหมด #project_total_floor# ชั้น</unit> <area> บนพื้นที่ #project_area_size#</area> <rent> ค่าเช่าเริ่มต้น #start_rent# บาท/เดือน</rent> <sale>ราคาขายเริ่มต้น #start_sale# บาท</sale> มีห้องให้เลือกหลายรูปแบบ ทั้งห้องสตูดิโอ คอนโด 1 ห้องนอน หรือ 2 ห้องนอน หรือแบบอื่นๆ ห้องสวยเก๋ ห้องแต่งแต่งสวยงาม เครื่องใช้ไฟฟ้าครบ พร้อมเข้าอยู่ <university>โครงการอยู่ใกล้กับมหาวิทยาลัย อาทิ #university_list#</university></p>\n` +
      `<p>หากคุณมีความสนใจซื้อ <strong><strong >ซื้อ , </strong>#post_type#<strong>คอนโดราคาถูก คุ้มค่า</strong> สามารถติดต่อได้ที่ <strong>www.propholicshop.com</strong>`
    );
    setSeoBottomEnHtml('ข้อความ SEO EN ด้านล่างเพจ [HTML]');
    setSortOrder('999');
    setFeatured('OFF');
    setStatus('OFF');
  };

  // Form submit (Add / Update)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameTh || !nameEn) {
      alert(isTh ? 'กรุณากรอกชื่อโครงการให้ครบถ้วน' : 'Please fill in the project names');
      return;
    }

    const sortNum = parseInt(sortOrder, 10) || 999;

    const data: ProjectItem = {
      id: editingId || String(Math.floor(Math.random() * 9000) + 1000),
      image,
      nameTh,
      nameEn,
      type: projectType || 'Condo',
      constructionStatus,
      sortOrder: sortNum,
      status,
      area,
      developer,
      units,
      areaSize,
      floors,
      details,
      detailsThHtml,
      detailsEnHtml,
      facilities: selectedFacilities,
      stations: stations.filter((s) => s.name),
      stores: stores.filter((s) => s.name),
      schools: schools.filter((s) => s.name),
      hospitals: hospitals.filter((s) => s.name),
      youtubeIds: youtubeIds.filter((y) => y),
      googleMapUrl,
      latitude,
      longitude,
      metaTitleTh,
      metaTitleEn,
      metaKeywordTh,
      metaKeywordEn,
      metaDescTh,
      metaDescEn,
      seoBottomThHtml,
      seoBottomEnHtml,
      featured,
    };

    let updatedProjectsList: ProjectItem[] = [];

    if (editingId) {
      updatedProjectsList = projects.map((p) => (p.id === editingId ? data : p));
    } else {
      updatedProjectsList = [...projects, data];
    }

    localStorage.setItem('stayverse_set_projects', JSON.stringify(updatedProjectsList));
    alert(
      editingId
        ? (isTh ? 'แก้ไขข้อมูลโครงการสำเร็จ' : 'Project details updated successfully')
        : (isTh ? 'เพิ่มโครงการสำเร็จ' : 'New project added successfully')
    );
    router.push('/admin/set_project');
  };

  // Mock Toolbar for Rich Text Editor
  const EditorToolbar = () => (
    <div className="bg-[#F8F9FA] border border-gray-200 border-b-0 p-1.5 flex flex-wrap gap-1 items-center select-none text-[10px] text-gray-600">
      <button type="button" className="px-1.5 py-0.5 border border-gray-300 rounded hover:bg-gray-100 font-mono">HTML</button>
      <div className="w-[1px] h-3 bg-gray-300 mx-1"></div>
      <button type="button" className="px-1 py-0.5 font-bold hover:bg-gray-200 rounded">B</button>
      <button type="button" className="px-1 py-0.5 italic hover:bg-gray-200 rounded">I</button>
      <button type="button" className="px-1 py-0.5 underline hover:bg-gray-200 rounded">U</button>
      <button type="button" className="px-1 py-0.5 line-through hover:bg-gray-200 rounded">S</button>
      <div className="w-[1px] h-3 bg-gray-300 mx-1"></div>
      <span className="text-gray-400">Font:</span>
      <select className="border border-gray-300 rounded text-[9px] px-1 bg-white"><option>Sarabun</option></select>
      <span className="text-gray-400 ml-1">Size:</span>
      <select className="border border-gray-300 rounded text-[9px] px-1 bg-white"><option>12px</option></select>
      <div className="w-[1px] h-3 bg-gray-300 mx-1"></div>
      <button type="button" className="px-1.5 py-0.5 hover:bg-gray-200 rounded">🎨 Color</button>
      <button type="button" className="px-1.5 py-0.5 hover:bg-gray-200 rounded">🖼️ Image</button>
      <button type="button" className="px-1.5 py-0.5 hover:bg-gray-200 rounded">🔗 Link</button>
    </div>
  );

  return (
    <AdminShell activeItem="set_project">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-row justify-between items-center pb-5 mb-5 border-b border-gray-200/60 select-none">
        <h1 className="text-xl font-bold text-gray-800 flex items-center">
          {editingId ? (isTh ? 'โครงการ > แก้ไข' : 'Projects > Edit') : (isTh ? 'โครงการ > เพิ่ม' : 'Projects > Add')}
        </h1>
        <div className="text-xs text-[#0088FF] flex items-center space-x-1.5">
          <span className="hover:underline cursor-pointer" onClick={() => router.push('/admin')}>Home</span>
          <span className="text-gray-400">/</span>
          <span className="hover:underline cursor-pointer" onClick={() => router.push('/admin/set_project')}>{isTh ? 'โครงการ' : 'Projects'}</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-500">{editingId ? (isTh ? 'แก้ไข' : 'Edit') : (isTh ? 'เพิ่ม' : 'Add')}</span>
        </div>
      </div>

      {/* Back Button Container */}
      <div className="mb-4">
        <button
          type="button"
          onClick={() => router.push('/admin/set_project')}
          className="bg-[#5B21B6] hover:bg-[#4C1D95] text-white px-4 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>กลับ</span>
        </button>
      </div>

      {/* Main Card Container */}
      <div className="bg-white border border-gray-200 rounded-md shadow-sm max-w-7xl overflow-hidden mb-6 text-xs text-gray-850">
        <form onSubmit={handleSubmit} className="divide-y divide-gray-150">
          
          {/* 1. พื้นที่ */}
          <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            <div className="md:col-span-1 font-bold text-gray-700">พื้นที่</div>
            <div className="md:col-span-4">
              <select
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full md:w-1/3 bg-white border border-gray-300 rounded p-2 text-gray-750 focus:outline-none focus:ring-1 focus:ring-[#5B21B6]"
              >
                <option value="">{isTh ? 'พื้นที่' : 'Area'}</option>
                <option value="Sukhumvit">Sukhumvit</option>
                <option value="Sathorn">Sathorn</option>
                <option value="Ekkamai">Ekkamai</option>
                <option value="Pattaya">Pattaya</option>
                <option value="Rama 9">Rama 9</option>
              </select>
            </div>
          </div>

          {/* 2. ประเภทโครงการ */}
          <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            <div className="md:col-span-1 font-bold text-gray-700">ประเภทโครงการ</div>
            <div className="md:col-span-4">
              <select
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="w-full md:w-1/3 bg-white border border-gray-300 rounded p-2 text-gray-750 focus:outline-none focus:ring-1 focus:ring-[#5B21B6]"
              >
                <option value="">{isTh ? 'ประเภทโครงการ' : 'Project Type'}</option>
                <option value="Condo">Condo</option>
                <option value="Home">Home</option>
                <option value="Townhome">Townhome</option>
              </select>
            </div>
          </div>

          {/* 3. สถานะก่อสร้างของโครงการ */}
          <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
            <div className="md:col-span-1 font-bold text-gray-700 pt-1">สถานะก่อสร้างของโครงการ</div>
            <div className="md:col-span-4 space-y-2 mt-1">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="constructionStatus"
                  checked={constructionStatus === 'โครงการพร้อมอยู่'}
                  onChange={() => setConstructionStatus('โครงการพร้อมอยู่')}
                  className="w-3.5 h-3.5 text-[#5B21B6] focus:ring-[#5B21B6]"
                />
                <span className="font-semibold text-gray-700">โครงการพร้อมอยู่</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="constructionStatus"
                  checked={constructionStatus === 'โครงการใหม่'}
                  onChange={() => setConstructionStatus('โครงการใหม่')}
                  className="w-3.5 h-3.5 text-[#5B21B6] focus:ring-[#5B21B6]"
                />
                <span className="font-semibold text-gray-700">โครงการใหม่</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="constructionStatus"
                  checked={constructionStatus === 'โครงการขายดาวน์'}
                  onChange={() => setConstructionStatus('โครงการขายดาวน์')}
                  className="w-3.5 h-3.5 text-[#5B21B6] focus:ring-[#5B21B6]"
                />
                <span className="font-semibold text-gray-700">โครงการขายดาวน์</span>
              </label>
            </div>
          </div>

          {/* 4. ชื่อโครงการ [TH] */}
          <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            <div className="md:col-span-1 font-bold text-gray-700">ชื่อโครงการ [TH]</div>
            <div className="md:col-span-4">
              <input
                type="text"
                value={nameTh}
                onChange={(e) => setNameTh(e.target.value)}
                placeholder="ชื่อโครงการ [TH]"
                className="w-full md:w-2/3 bg-white border border-gray-300 rounded p-2 text-gray-750 focus:outline-none focus:ring-1 focus:ring-[#5B21B6]"
                required
              />
            </div>
          </div>

          {/* 5. ชื่อโครงการ [EN] */}
          <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            <div className="md:col-span-1 font-bold text-gray-700">ชื่อโครงการ [EN]</div>
            <div className="md:col-span-4 flex gap-2 items-center">
              <input
                type="text"
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                placeholder="ชื่อโครงการ [EN]"
                className="w-full md:w-2/3 bg-white border border-gray-300 rounded p-2 text-gray-750 focus:outline-none focus:ring-1 focus:ring-[#5B21B6]"
                required
              />
              <button
                type="button"
                onClick={handleTranslateName}
                className="bg-[#5B21B6] hover:bg-[#4C1D95] text-white px-3 py-2 rounded font-semibold cursor-pointer transition-colors shadow-sm text-xs"
              >
                แปล
              </button>
            </div>
          </div>

          {/* 6. ชื่อผู้พัฒนา */}
          <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            <div className="md:col-span-1 font-bold text-gray-700">ชื่อผู้พัฒนา</div>
            <div className="md:col-span-4">
              <input
                type="text"
                value={developer}
                onChange={(e) => setDeveloper(e.target.value)}
                placeholder="ชื่อผู้พัฒนา"
                className="w-full md:w-2/3 bg-white border border-gray-300 rounded p-2 text-gray-750 focus:outline-none focus:ring-1 focus:ring-[#5B21B6]"
              />
            </div>
          </div>

          {/* 7. จำนวนยูนิต */}
          <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            <div className="md:col-span-1 font-bold text-gray-700">จำนวนยูนิต</div>
            <div className="md:col-span-4">
              <input
                type="text"
                value={units}
                onChange={(e) => setUnits(e.target.value)}
                placeholder="จำนวน Unit"
                className="w-full md:w-1/4 bg-white border border-gray-300 rounded p-2 text-gray-750 focus:outline-none focus:ring-1 focus:ring-[#5B21B6]"
              />
            </div>
          </div>

          {/* 8. ขนาดพื้นที่โครงการ */}
          <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            <div className="md:col-span-1 font-bold text-gray-700">ขนาดพื้นที่โครงการ</div>
            <div className="md:col-span-4">
              <input
                type="text"
                value={areaSize}
                onChange={(e) => setAreaSize(e.target.value)}
                placeholder="เช่น 15-3-100"
                className="w-full md:w-1/4 bg-white border border-gray-300 rounded p-2 text-gray-750 focus:outline-none focus:ring-1 focus:ring-[#5B21B6]"
              />
            </div>
          </div>

          {/* 9. จำนวนชั้นทั้งหมด */}
          <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            <div className="md:col-span-1 font-bold text-gray-700">จำนวนชั้นทั้งหมด</div>
            <div className="md:col-span-4">
              <input
                type="text"
                value={floors}
                onChange={(e) => setFloors(e.target.value)}
                placeholder="เช่น 20"
                className="w-full md:w-1/4 bg-white border border-gray-300 rounded p-2 text-gray-750 focus:outline-none focus:ring-1 focus:ring-[#5B21B6]"
              />
            </div>
          </div>

          {/* 10. รูปโครงการ */}
          <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            <div className="md:col-span-1 font-bold text-gray-700">รูปโครงการ</div>
            <div className="md:col-span-4 flex items-center gap-2">
              <input
                type="text"
                readOnly
                placeholder="Choose file"
                className="bg-gray-55/40 border border-gray-300 rounded p-2 text-gray-500 w-full md:w-2/3 cursor-not-allowed text-[11px]"
              />
              <button
                type="button"
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 border border-gray-400 px-3 py-2 rounded font-semibold text-xs cursor-pointer shadow-sm"
              >
                Browse
              </button>
            </div>
          </div>

          {/* 11. All photo */}
          <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            <div className="md:col-span-1 font-bold text-gray-700">All photo</div>
            <div className="md:col-span-4 flex gap-2">
              <button
                type="button"
                className="bg-[#28A745] hover:bg-[#218838] text-white px-3 py-1.5 rounded font-semibold cursor-pointer shadow-sm text-xs"
              >
                เพิ่มรูปภาพ...
              </button>
              <button
                type="button"
                className="bg-[#D1E7DD] hover:bg-[#C1D7CD] text-[#0F5132] px-3 py-1.5 rounded border border-[#BADBCC] font-semibold cursor-pointer text-xs"
              >
                ดึงรูปจากเว็บไซต์
              </button>
            </div>
          </div>

          {/* 12. รายละเอียดโครงการ */}
          <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
            <div className="md:col-span-1 font-bold text-gray-700 pt-1">รายละเอียดโครงการ</div>
            <div className="md:col-span-4">
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="รายละเอียดโครงการ"
                rows={5}
                className="w-full border border-gray-300 rounded p-2.5 text-gray-750 focus:outline-none focus:ring-1 focus:ring-[#5B21B6] resize-y"
              />
            </div>
          </div>

          {/* 13. รายละเอียดโครงการ [HTML][TH] */}
          <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
            <div className="md:col-span-1 font-bold text-gray-700 pt-1">รายละเอียดโครงการ [HTML][TH]</div>
            <div className="md:col-span-4">
              <EditorToolbar />
              <textarea
                value={detailsThHtml}
                onChange={(e) => setDetailsThHtml(e.target.value)}
                placeholder="รายละเอียดโครงการ [HTML][TH]"
                rows={6}
                className="w-full font-mono border border-gray-200 rounded-b p-2.5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#5B21B6] resize-y bg-white"
              />
            </div>
          </div>

          {/* 14. รายละเอียดโครงการ [HTML][EN] */}
          <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
            <div className="md:col-span-1 font-bold text-gray-700 pt-1">รายละเอียดโครงการ [HTML][EN]</div>
            <div className="md:col-span-4">
              <EditorToolbar />
              <textarea
                value={detailsEnHtml}
                onChange={(e) => setDetailsEnHtml(e.target.value)}
                placeholder="รายละเอียดโครงการ [HTML][EN]"
                rows={6}
                className="w-full font-mono border border-gray-200 rounded-b p-2.5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#5B21B6] resize-y bg-white"
              />
            </div>
          </div>

          {/* 15. สิ่งอำนวยความสะดวกโครงการ */}
          <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
            <div className="md:col-span-1 font-bold text-gray-700 pt-1">สิ่งอำนวยความสะดวกโครงการ</div>
            <div className="md:col-span-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Column 1 */}
              <div className="space-y-2">
                {facilityOptions1.map((opt) => (
                  <label key={opt} className="flex items-center space-x-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={selectedFacilities.includes(opt)}
                      onChange={() => handleToggleFacility(opt)}
                      className="w-3.5 h-3.5 border-gray-300 rounded text-[#5B21B6] focus:ring-[#5B21B6]"
                    />
                    <span className="text-gray-700">{opt}</span>
                  </label>
                ))}
              </div>
              {/* Column 2 */}
              <div className="space-y-2">
                {facilityOptions2.map((opt) => (
                  <label key={opt} className="flex items-center space-x-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={selectedFacilities.includes(opt)}
                      onChange={() => handleToggleFacility(opt)}
                      className="w-3.5 h-3.5 border-gray-300 rounded text-[#5B21B6] focus:ring-[#5B21B6]"
                    />
                    <span className="text-gray-700">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* 16. ใกล้สถานีรถไฟฟ้า */}
          <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
            <div className="md:col-span-1 font-bold text-gray-700 pt-1">ใกล้สถานีรถไฟฟ้า</div>
            <div className="md:col-span-4 space-y-3">
              {stations.map((row, idx) => (
                <div key={idx} className="flex flex-wrap items-center gap-2">
                  <select
                    value={row.name}
                    onChange={(e) => updateRow(stations, setStations, idx, 'name', e.target.value)}
                    className="bg-white border border-gray-300 rounded p-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#5B21B6]"
                  >
                    <option value="">สถานีรถไฟฟ้า</option>
                    <option value="BTS Ari">BTS Ari</option>
                    <option value="BTS Siam">BTS Siam</option>
                    <option value="MRT Sukhumvit">MRT Sukhumvit</option>
                    <option value="MRT Rama 9">MRT Rama 9</option>
                  </select>
                  <input
                    type="text"
                    value={row.distance}
                    onChange={(e) => updateRow(stations, setStations, idx, 'distance', e.target.value)}
                    placeholder="ระยะห่าง (กม.)"
                    className="bg-white border border-gray-300 rounded p-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#5B21B6] w-28"
                  />
                  {stations.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRow(stations, setStations, idx)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addRow(stations, setStations)}
                className="bg-[#28A745] hover:bg-[#218838] text-white p-2 rounded-full cursor-pointer flex items-center justify-center shadow-sm w-7 h-7"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 17. ใกล้สรรพสินค้า */}
          <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
            <div className="md:col-span-1 font-bold text-gray-700 pt-1">ใกล้สรรพสินค้า</div>
            <div className="md:col-span-4 space-y-3">
              {stores.map((row, idx) => (
                <div key={idx} className="flex flex-wrap items-center gap-2">
                  <select
                    value={row.name}
                    onChange={(e) => updateRow(stores, setStores, idx, 'name', e.target.value)}
                    className="bg-white border border-gray-300 rounded p-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#5B21B6]"
                  >
                    <option value="">ห้างสรรพสินค้า</option>
                    <option value="Central World">Central World</option>
                    <option value="Siam Paragon">Siam Paragon</option>
                    <option value="Emporium">Emporium</option>
                    <option value="Terminal 21">Terminal 21</option>
                  </select>
                  <input
                    type="text"
                    value={row.distance}
                    onChange={(e) => updateRow(stores, setStores, idx, 'distance', e.target.value)}
                    placeholder="ระยะห่าง (กม.)"
                    className="bg-white border border-gray-300 rounded p-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#5B21B6] w-28"
                  />
                  {stores.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRow(stores, setStores, idx)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addRow(stores, setStores)}
                className="bg-[#28A745] hover:bg-[#218838] text-white p-2 rounded-full cursor-pointer flex items-center justify-center shadow-sm w-7 h-7"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 18. โรงเรียนและมหาวิทยาลัย */}
          <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
            <div className="md:col-span-1 font-bold text-gray-700 pt-1">โรงเรียนและมหาวิทยาลัย</div>
            <div className="md:col-span-4 space-y-3">
              {schools.map((row, idx) => (
                <div key={idx} className="flex flex-wrap items-center gap-2">
                  <select
                    value={row.name}
                    onChange={(e) => updateRow(schools, setSchools, idx, 'name', e.target.value)}
                    className="bg-white border border-gray-300 rounded p-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#5B21B6]"
                  >
                    <option value="">โรงเรียนและมหาวิทยาลัย</option>
                    <option value="Chulalongkorn University">Chulalongkorn University</option>
                    <option value="Mahidol University">Mahidol University</option>
                    <option value="Kasetsart University">Kasetsart University</option>
                    <option value="Rangsit University">Rangsit University</option>
                  </select>
                  <input
                    type="text"
                    value={row.distance}
                    onChange={(e) => updateRow(schools, setSchools, idx, 'distance', e.target.value)}
                    placeholder="ระยะห่าง (กม.)"
                    className="bg-white border border-gray-300 rounded p-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#5B21B6] w-28"
                  />
                  {schools.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRow(schools, setSchools, idx)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addRow(schools, setSchools)}
                className="bg-[#28A745] hover:bg-[#218838] text-white p-2 rounded-full cursor-pointer flex items-center justify-center shadow-sm w-7 h-7"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 19. โรงพยาบาล */}
          <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
            <div className="md:col-span-1 font-bold text-gray-700 pt-1">โรงพยาบาล</div>
            <div className="md:col-span-4 space-y-3">
              {hospitals.map((row, idx) => (
                <div key={idx} className="flex flex-wrap items-center gap-2">
                  <select
                    value={row.name}
                    onChange={(e) => updateRow(hospitals, setHospitals, idx, 'name', e.target.value)}
                    className="bg-white border border-gray-300 rounded p-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#5B21B6]"
                  >
                    <option value="">โรงพยาบาล</option>
                    <option value="Bumrungrad Hospital">Bumrungrad Hospital</option>
                    <option value="Samitivej Hospital">Samitivej Hospital</option>
                    <option value="Siriraj Hospital">Siriraj Hospital</option>
                    <option value="Bangkok Hospital">Bangkok Hospital</option>
                  </select>
                  <input
                    type="text"
                    value={row.distance}
                    onChange={(e) => updateRow(hospitals, setHospitals, idx, 'distance', e.target.value)}
                    placeholder="ระยะห่าง (กม.)"
                    className="bg-white border border-gray-300 rounded p-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#5B21B6] w-28"
                  />
                  {hospitals.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRow(hospitals, setHospitals, idx)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addRow(hospitals, setHospitals)}
                className="bg-[#28A745] hover:bg-[#218838] text-white p-2 rounded-full cursor-pointer flex items-center justify-center shadow-sm w-7 h-7"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 20. Youtube ID */}
          <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
            <div className="md:col-span-1 font-bold text-gray-700 pt-1">Youtube ID [สำหรับ]</div>
            <div className="md:col-span-4 space-y-3">
              {youtubeIds.map((yId, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={yId}
                    onChange={(e) => updateYoutubeId(idx, e.target.value)}
                    placeholder="Youtube ID"
                    className="bg-white border border-gray-300 rounded p-2 text-gray-750 focus:outline-none focus:ring-1 focus:ring-[#5B21B6] w-2/3"
                  />
                  {youtubeIds.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeYoutubeId(idx)}
                      className="p-2 text-red-500 hover:bg-red-55 rounded transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addYoutubeId}
                className="bg-[#28A745] hover:bg-[#218838] text-white p-2 rounded-full cursor-pointer flex items-center justify-center shadow-sm w-7 h-7"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 21. Google map share URL */}
          <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            <div className="md:col-span-1 font-bold text-gray-700">Google map share URL</div>
            <div className="md:col-span-4">
              <input
                type="text"
                value={googleMapUrl}
                onChange={(e) => setGoogleMapUrl(e.target.value)}
                placeholder="ตัวอย่าง : https://goo.gl/maps/d1amYZuwMu8QRxcaA"
                className="w-full md:w-3/4 bg-white border border-gray-300 rounded p-2 text-gray-750 focus:outline-none focus:ring-1 focus:ring-[#5B21B6]"
              />
            </div>
          </div>

          {/* 22. Latitude */}
          <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            <div className="md:col-span-1 font-bold text-gray-700">Latitude</div>
            <div className="md:col-span-4">
              <input
                type="text"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                placeholder="Latitude"
                className="w-full md:w-1/3 bg-white border border-gray-300 rounded p-2 text-gray-750 focus:outline-none focus:ring-1 focus:ring-[#5B21B6]"
              />
            </div>
          </div>

          {/* 23. Longitude */}
          <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            <div className="md:col-span-1 font-bold text-gray-700">Longitude</div>
            <div className="md:col-span-4">
              <input
                type="text"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                placeholder="Longitude"
                className="w-full md:w-1/3 bg-white border border-gray-300 rounded p-2 text-gray-750 focus:outline-none focus:ring-1 focus:ring-[#5B21B6]"
              />
            </div>
          </div>

          {/* 24. Meta Title SEO */}
          <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
            <div className="md:col-span-1 font-bold text-gray-700 pt-1">Meta Title SEO [70 ตัวอักษร]</div>
            <div className="md:col-span-4 space-y-1.5">
              <input
                type="text"
                value={metaTitleTh}
                onChange={(e) => setMetaTitleTh(e.target.value)}
                className="w-full md:w-3/4 bg-white border border-gray-300 rounded p-2 text-gray-750 focus:outline-none focus:ring-1 focus:ring-[#5B21B6]"
              />
              <p className="text-[10px] text-gray-400 font-medium">Ex : รวมประกาศคอนโดขาย ให้เช่า ย่านรังสิต ใกล้มหาวิทยาลัยรังสิต</p>
            </div>
          </div>

          {/* 25. Meta Title EN SEO */}
          <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
            <div className="md:col-span-1 font-bold text-gray-700 pt-1">Meta Title EN SEO [70 ตัวอักษร]</div>
            <div className="md:col-span-4 space-y-1.5">
              <input
                type="text"
                value={metaTitleEn}
                onChange={(e) => setMetaTitleEn(e.target.value)}
                className="w-full md:w-3/4 bg-white border border-gray-300 rounded p-2 text-gray-750 focus:outline-none focus:ring-1 focus:ring-[#5B21B6]"
              />
              <p className="text-[10px] text-gray-400 font-medium">Ex : Including announcements of condos for sale and rent in the Rangsit area, near Rangsit University.</p>
            </div>
          </div>

          {/* 26. Meta Keyword SEO */}
          <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
            <div className="md:col-span-1 font-bold text-gray-700 pt-1">Meta Keyword SEO [200 ตัวอักษร]</div>
            <div className="md:col-span-4 space-y-1.5">
              <textarea
                value={metaKeywordTh}
                onChange={(e) => setMetaKeywordTh(e.target.value)}
                rows={3}
                className="w-full md:w-3/4 bg-white border border-gray-300 rounded p-2 text-gray-750 focus:outline-none focus:ring-1 focus:ring-[#5B21B6]"
              />
              <p className="text-[10px] text-gray-400 font-medium">Ex : ประกาศขาย, ให้เช่า ,คอนโด, บ้าน, ที่ดิน, ใกล้มหาวิทยาลัยรังสิต, คอนโดใหม่, คอนโดมือสอง, บ้านมือสอง, บ้านใหม่, โครงการใหม่, ขายใบจองคอนโด, ขายดาวน์คอนโด</p>
            </div>
          </div>

          {/* 27. Meta Keyword EN SEO */}
          <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
            <div className="md:col-span-1 font-bold text-gray-700 pt-1">Meta Keyword EN SEO [200 ตัวอักษร]</div>
            <div className="md:col-span-4 space-y-1.5">
              <textarea
                value={metaKeywordEn}
                onChange={(e) => setMetaKeywordEn(e.target.value)}
                rows={3}
                className="w-full md:w-3/4 bg-white border border-gray-300 rounded p-2 text-gray-750 focus:outline-none focus:ring-1 focus:ring-[#5B21B6]"
              />
              <p className="text-[10px] text-gray-400 font-medium">Ex : For sale, for rent, condos, houses, land, near Rangsit University, new condos, second-hand condos, second-hand houses, new projects, selling condo reservations, selling condo down payments.</p>
            </div>
          </div>

          {/* 28. Meta description SEO */}
          <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
            <div className="md:col-span-1 font-bold text-gray-700 pt-1">Meta description SEO [200 ตัวอักษร]</div>
            <div className="md:col-span-4 space-y-1.5">
              <textarea
                value={metaDescTh}
                onChange={(e) => setMetaDescTh(e.target.value)}
                rows={3}
                className="w-full md:w-3/4 bg-white border border-gray-300 rounded p-2 text-gray-750 focus:outline-none focus:ring-1 focus:ring-[#5B21B6]"
              />
              <p className="text-[10px] text-gray-400 font-medium">Ex : ค้นหาประกาศเช่า คอนโด บ้าน ที่ดิน ใกล้มหาวิทยาลัยรังสิต ราคาถูก มีให้เลือกมากมายหลากหลายทำเล ข้อมูลครบครันเดี่ยว</p>
            </div>
          </div>

          {/* 29. Meta description EN SEO */}
          <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
            <div className="md:col-span-1 font-bold text-gray-700 pt-1">Meta description EN SEO [200 ตัวอักษร]</div>
            <div className="md:col-span-4 space-y-1.5">
              <textarea
                value={metaDescEn}
                onChange={(e) => setMetaDescEn(e.target.value)}
                rows={3}
                className="w-full md:w-3/4 bg-white border border-gray-300 rounded p-2 text-gray-750 focus:outline-none focus:ring-1 focus:ring-[#5B21B6]"
              />
              <p className="text-[10px] text-gray-400 font-medium">Ex : Search for announcements for sale, rent, condos, houses, land near Rangsit University, cheap prices, many condos to choose from. Complete information in one place</p>
            </div>
          </div>

          {/* 30. SEO Bottom HTML */}
          <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
            <div className="md:col-span-1 font-bold text-gray-700 pt-1">ข้อความ SEO ด้านล่างเพจ [HTML]</div>
            <div className="md:col-span-4">
              <textarea
                value={seoBottomThHtml}
                onChange={(e) => setSeoBottomThHtml(e.target.value)}
                rows={6}
                className="w-full font-mono border border-gray-300 rounded p-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#5B21B6] bg-white resize-y"
              />
            </div>
          </div>

          {/* 31. SEO Bottom EN HTML */}
          <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
            <div className="md:col-span-1 font-bold text-gray-700 pt-1">ข้อความ SEO EN ด้านล่างเพจ [HTML]</div>
            <div className="md:col-span-4">
              <textarea
                value={seoBottomEnHtml}
                onChange={(e) => setSeoBottomEnHtml(e.target.value)}
                rows={4}
                className="w-full font-mono border border-gray-300 rounded p-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#5B21B6] bg-white resize-y"
              />
            </div>
          </div>

          {/* 32. เรียงลำดับ */}
          <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            <div className="md:col-span-1 font-bold text-gray-700">เรียงลำดับ</div>
            <div className="md:col-span-4">
              <input
                type="text"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                placeholder="เรียงลำดับ"
                className="w-full md:w-1/4 bg-white border border-gray-300 rounded p-2 text-gray-750 focus:outline-none focus:ring-1 focus:ring-[#5B21B6]"
              />
            </div>
          </div>

          {/* 33. Featured */}
          <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            <div className="md:col-span-1 font-bold text-gray-700">Featured</div>
            <div className="md:col-span-4 flex items-center space-x-4">
              <label className="flex items-center space-x-1.5 cursor-pointer select-none">
                <input
                  type="radio"
                  name="featured"
                  checked={featured === 'ON'}
                  onChange={() => setFeatured('ON')}
                  className="w-3.5 h-3.5 text-[#5B21B6] focus:ring-[#5B21B6]"
                />
                <span className="font-bold text-green-600">ON</span>
              </label>

              <label className="flex items-center space-x-1.5 cursor-pointer select-none">
                <input
                  type="radio"
                  name="featured"
                  checked={featured === 'OFF'}
                  onChange={() => setFeatured('OFF')}
                  className="w-3.5 h-3.5 text-[#5B21B6] focus:ring-[#5B21B6]"
                />
                <span className="font-bold text-red-500">OFF</span>
              </label>
            </div>
          </div>

          {/* 34. Status */}
          <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            <div className="md:col-span-1 font-bold text-gray-700">Status</div>
            <div className="md:col-span-4 flex items-center space-x-4">
              <label className="flex items-center space-x-1.5 cursor-pointer select-none">
                <input
                  type="radio"
                  name="status"
                  checked={status === 'ON'}
                  onChange={() => setStatus('ON')}
                  className="w-3.5 h-3.5 text-[#5B21B6] focus:ring-[#5B21B6]"
                />
                <span className="font-bold text-green-600">ON</span>
              </label>

              <label className="flex items-center space-x-1.5 cursor-pointer select-none">
                <input
                  type="radio"
                  name="status"
                  checked={status === 'OFF'}
                  onChange={() => setStatus('OFF')}
                  className="w-3.5 h-3.5 text-[#5B21B6] focus:ring-[#5B21B6]"
                />
                <span className="font-bold text-red-500">OFF</span>
              </label>
            </div>
          </div>

          {/* Action Row */}
          <div className="bg-[#F8F9FA] p-4 md:p-6 flex items-center gap-2">
            <button
              type="submit"
              className="bg-[#5B21B6] hover:bg-[#4C1D95] text-white px-4 py-2 rounded text-xs font-semibold cursor-pointer shadow-sm hover:shadow transition-colors"
            >
              {editingId ? (isTh ? 'บันทึก' : 'Save Changes') : 'Add new'}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-4 py-2 rounded text-xs font-semibold cursor-pointer transition-colors"
            >
              reset
            </button>
          </div>

        </form>
      </div>
    </AdminShell>
  );
}

export default function NewProjectFormPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-800">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#CF7536]"></div>
      </div>
    }>
      <NewProjectFormContent />
    </Suspense>
  );
}
