// src/app/community/create-club/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Camera } from "lucide-react";

export default function CreateClubPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    isPrivate: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate API Call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitting(false);
    // Redirect to the new club (mock ID 1)
    router.push("/community/clubs/1");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 text-gray-800">
      {/* Header */}
      <div className="bg-white sticky top-0 z-20 shadow-sm px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold">สร้างคลับใหม่</h1>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        {/* Cover Image Upload */}
        <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center justify-center border-2 border-dashed border-gray-300 min-h-[160px]">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3">
            <Camera size={28} />
          </div>
          <p className="text-sm font-medium text-blue-600">อัปโหลดรูปปกคลับ</p>
          <p className="text-xs text-gray-400 mt-1">แนะนำขนาด 1200 x 400 px</p>
        </div>

        {/* Basic Info */}
        <div className="bg-white p-4 rounded-xl shadow-sm space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1">
              ชื่อคลับ <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="เช่น Wheelchair Travelers TH"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1">หมวดหมู่</label>
            <select
              className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              <option value="">เลือกหมวดหมู่...</option>
              <option value="travel">ท่องเที่ยว</option>
              <option value="tech">เทคโนโลยี & อุปกรณ์</option>
              <option value="health">สุขภาพ</option>
              <option value="hobby">งานอดิเรก</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold mb-1">
              เกี่ยวกับคลับ
            </label>
            <textarea
              rows={4}
              className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="อธิบายจุดประสงค์ของคลับ กิจกรรมที่จะทำร่วมกัน..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm">คลับส่วนตัว (Private Club)</h3>
              <p className="text-xs text-gray-500">
                เฉพาะสมาชิกเท่านั้นที่เห็นโพสต์และกิจกรรม
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={formData.isPrivate}
                onChange={(e) =>
                  setFormData({ ...formData, isPrivate: e.target.checked })
                }
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting || !formData.name}
          className={`w-full py-3 rounded-full font-bold text-white shadow-lg transition-all ${
            submitting || !formData.name
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 active:scale-95"
          }`}
        >
          {submitting ? "กำลังสร้าง..." : "สร้างคลับ"}
        </button>
      </form>
    </div>
  );
}
