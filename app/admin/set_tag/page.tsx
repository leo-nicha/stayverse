'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminShell } from '../AdminShell';
import { Plus, X, Tag, Save, RotateCcw } from 'lucide-react';
import { useTranslation } from '@/context/LanguageContext';

export default function SetTagPage() {
  const router = useRouter();
  const { language } = useTranslation();

  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  const defaultTags = [
    'Sea View', 'Corner Unit', 'Pool Villa', 'Urgent Sale',
    'Tropical', 'Garden', 'Near BTS', 'Near MRT',
    'Luxury', 'Penthouse', 'Pet Friendly', 'High Rise'
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('stayverse_set_tags');
      if (stored) {
        setTags(JSON.parse(stored));
      } else {
        localStorage.setItem('stayverse_set_tags', JSON.stringify(defaultTags));
        setTags(defaultTags);
      }
    }
  }, []);

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanTag = newTag.trim();
    if (!cleanTag) return;
    if (tags.includes(cleanTag)) {
      alert(language === 'th' ? 'มีแท็กนี้อยู่แล้ว' : 'Tag already exists');
      return;
    }
    setTags([...tags, cleanTag]);
    setNewTag('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleReset = () => {
    setTags(defaultTags);
  };

  const handleUpdate = () => {
    localStorage.setItem('stayverse_set_tags', JSON.stringify(tags));
    alert(language === 'th' ? 'บันทึกแท็กเรียบร้อยแล้ว' : 'Tags updated successfully');
  };

  const isTh = language === 'th';

  return (
    <AdminShell activeItem="set_tag">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 mb-6 border-b border-gray-200/80">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-gray-800 tracking-tight flex items-center gap-2">
            <Tag className="w-6 h-6 text-[#CF7536]" />
            <span>{isTh ? 'แท็ก > แก้ไข' : 'Tags > Edit'}</span>
          </h1>
        </div>
        <div className="text-xs font-semibold text-gray-400 mt-2 sm:mt-0 flex items-center space-x-1.5 select-none">
          <span className="hover:text-[#CF7536] cursor-pointer" onClick={() => router.push('/admin')}>Home</span>
          <span>/</span>
          <span className="hover:text-[#CF7536] cursor-pointer" onClick={() => router.push('/admin/set_tag')}>{isTh ? 'แท็ก' : 'Tags'}</span>
          <span>/</span>
          <span className="text-gray-655">{isTh ? 'แก้ไข' : 'Edit'}</span>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm overflow-hidden max-w-4xl">
        <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
          <h2 className="text-sm font-bold text-gray-700">{isTh ? 'จัดการป้ายแท็กคีย์เวิร์ดของอสังหาริมทรัพย์' : 'Manage Property Keyword Tags'}</h2>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          {/* Tag Input Form */}
          <form onSubmit={handleAddTag} className="flex gap-2 max-w-md">
            <input
              type="text"
              placeholder={isTh ? 'พิมพ์แท็กใหม่ที่นี่...' : 'Type new tag here...'}
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              className="flex-1 text-sm bg-white border border-gray-200 rounded-lg p-2.5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#CF7536] transition-all"
            />
            <button
              type="submit"
              className="bg-[#6F42C1] hover:bg-[#5A32A3] text-white flex items-center gap-1 px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-sm hover:shadow"
            >
              <Plus className="w-4 h-4" />
              <span>{isTh ? 'เพิ่ม' : 'Add'}</span>
            </button>
          </form>

          {/* Tags Pills Container */}
          <div className="border border-gray-100 bg-gray-50/30 rounded-xl p-6 min-h-[150px]">
            <div className="flex flex-wrap gap-2.5">
              {tags.length > 0 ? (
                tags.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center gap-1.5 bg-[#CF7536]/10 text-[#CF7536] font-semibold text-xs py-1.5 px-3.5 rounded-full border border-[#CF7536]/20 shadow-sm transition-all hover:bg-[#CF7536]/20"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="text-gray-400 hover:text-red-500 rounded-full transition-colors cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-gray-400 text-xs font-medium w-full text-center py-8">
                  {isTh ? 'ไม่มีแท็กในระบบ คลิกเพิ่มด้านบน' : 'No tags found. Add some above.'}
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6 flex items-center gap-3">
            <button
              type="button"
              onClick={handleUpdate}
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
        </div>
      </div>
    </AdminShell>
  );
}
