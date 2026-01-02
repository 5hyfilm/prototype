// src/app/add-location/page.tsx

"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, MapPin, Camera, Save, Info } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "../../../contexts/LanguageContext";

// Component ย่อยสำหรับอ่าน SearchParams (ต้องหุ้มด้วย Suspense ใน Next.js)
function AddLocationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLanguage(); // ถ้ามีการใช้ Context ภาษา

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "Restaurant", // Default
    accessibility: "medium",
    description: "",
    lat: "",
    lng: "",
    // Checkbox ง่ายๆ สำหรับ User ทั่วไป
    hasRamp: false,
    hasParking: false,
    hasRestroom: false,
    hasElevator: false,
  });

  // Magic Fill: ดึงค่าจาก URL มาใส่ฟอร์ม ✨
  useEffect(() => {
    const nameParam = searchParams.get("name");
    const latParam = searchParams.get("lat");
    const lngParam = searchParams.get("lng");

    if (nameParam || latParam || lngParam) {
      setFormData((prev) => ({
        ...prev,
        name: nameParam || "",
        lat: latParam || "",
        lng: lngParam || "",
      }));
    }
  }, [searchParams]);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // จำลองการบันทึก (Simulate API Call)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("User submitted location:", formData);

    // บันทึกเสร็จแล้วกลับไปหน้า Map หรือหน้าขอบคุณ
    // อาจจะส่ง Parameter ไปบอกหน้า Map ให้แสดง Toast Success
    router.push("/map?action=location_added");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header แบบ Mobile App */}
      <div className="bg-white px-4 py-4 shadow-sm sticky top-0 z-10 flex items-center gap-3">
        <Link
          href="/map"
          className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full"
        >
          <ChevronLeft size={24} />
        </Link>
        <h1 className="text-lg font-bold text-gray-800">เพิ่มสถานที่ใหม่</h1>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        {/* 1. ส่วนแสดงสถานที่ที่เลือกมา (Read-only) */}
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start gap-3">
          <div className="bg-blue-100 p-2 rounded-full text-blue-600 mt-1">
            <MapPin size={20} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-blue-800 uppercase tracking-wide mb-1">
              คุณกำลังเพิ่มข้อมูลให้กับ
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-transparent font-bold text-lg text-gray-900 border-b border-blue-200 focus:border-blue-500 focus:outline-none px-0 py-1"
              placeholder="ชื่อสถานที่..."
            />
            <p className="text-xs text-blue-600 mt-1 flex items-center gap-1">
              พิกัด: {formData.lat ? parseFloat(formData.lat).toFixed(5) : "-"},{" "}
              {formData.lng ? parseFloat(formData.lng).toFixed(5) : "-"}
            </p>
          </div>
        </div>

        {/* 2. หมวดหมู่ */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            หมวดหมู่
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="Restaurant">🍳 ร้านอาหาร</option>
            <option value="Cafe">☕ คาเฟ่</option>
            <option value="Shopping Mall">🛍️ ห้างสรรพสินค้า</option>
            <option value="Park">🌳 สวนสาธารณะ</option>
            <option value="Hospital">🏥 โรงพยาบาล</option>
            <option value="Other">❓ อื่นๆ</option>
          </select>
        </div>

        {/* 3. ระดับการเข้าถึง (Accessibility Level) */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            ระดับการเข้าถึงของวีลแชร์
          </label>
          <div className="grid grid-cols-3 gap-3">
            <label
              className={`cursor-pointer border-2 rounded-lg p-3 flex flex-col items-center gap-2 transition-all ${
                formData.accessibility === "high"
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 hover:border-green-200"
              }`}
            >
              <input
                type="radio"
                name="accessibility"
                value="high"
                checked={formData.accessibility === "high"}
                onChange={handleChange}
                className="sr-only"
              />
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                👍
              </div>
              <span className="text-xs font-bold text-gray-700">ง่ายมาก</span>
            </label>

            <label
              className={`cursor-pointer border-2 rounded-lg p-3 flex flex-col items-center gap-2 transition-all ${
                formData.accessibility === "medium"
                  ? "border-yellow-500 bg-yellow-50"
                  : "border-gray-200 hover:border-yellow-200"
              }`}
            >
              <input
                type="radio"
                name="accessibility"
                value="medium"
                checked={formData.accessibility === "medium"}
                onChange={handleChange}
                className="sr-only"
              />
              <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                😐
              </div>
              <span className="text-xs font-bold text-gray-700">ปานกลาง</span>
            </label>

            <label
              className={`cursor-pointer border-2 rounded-lg p-3 flex flex-col items-center gap-2 transition-all ${
                formData.accessibility === "low"
                  ? "border-red-500 bg-red-50"
                  : "border-gray-200 hover:border-red-200"
              }`}
            >
              <input
                type="radio"
                name="accessibility"
                value="low"
                checked={formData.accessibility === "low"}
                onChange={handleChange}
                className="sr-only"
              />
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                ⚠️
              </div>
              <span className="text-xs font-bold text-gray-700">
                ยาก/ไม่ได้
              </span>
            </label>
          </div>
        </div>

        {/* 4. สิ่งอำนวยความสะดวก (Checklist) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            สิ่งอำนวยความสะดวกที่มี
          </label>
          <div className="space-y-2">
            {[
              { key: "hasRamp", label: "ทางลาด (Ramp)" },
              {
                key: "hasParking",
                label: "ที่จอดรถคนพิการ (Priority Parking)",
              },
              {
                key: "hasRestroom",
                label: "ห้องน้ำคนพิการ (Accessible Toilet)",
              },
              { key: "hasElevator", label: "ลิฟต์ (Elevator)" },
            ].map((item) => (
              <label
                key={item.key}
                className="flex items-center p-3 bg-white border border-gray-200 rounded-lg active:bg-gray-50"
              >
                <input
                  type="checkbox"
                  name={item.key}
                  checked={(formData as any)[item.key]}
                  onChange={handleChange}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-3 text-gray-700">{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 5. รายละเอียดเพิ่มเติม */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            รายละเอียดเพิ่มเติม
          </label>
          <textarea
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            placeholder="เช่น ทางเข้าอยู่ด้านหลัง, ลิฟต์กว้างมาก..."
            className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* 6. รูปภาพ (Mock UI) */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 bg-white cursor-pointer hover:bg-gray-50">
          <Camera size={32} className="mb-2 text-gray-400" />
          <span className="text-sm font-medium">แตะเพื่อเพิ่มรูปภาพ</span>
          <span className="text-xs text-gray-400 mt-1">
            (ถ้ามีจะดีมากครับ 📸)
          </span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg flex items-center justify-center gap-2 sticky bottom-4 transition-transform active:scale-95 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          }`}
        >
          {loading ? (
            "กำลังบันทึก..."
          ) : (
            <>
              <Save size={20} />
              บันทึกข้อมูล
            </>
          )}
        </button>
      </form>
    </div>
  );
}

// Main Page Component
export default function AddLocationPage() {
  return (
    <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
      <AddLocationContent />
    </Suspense>
  );
}
