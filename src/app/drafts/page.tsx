// src/app/profile/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Settings,
  Edit2,
  FileText, // ใช้ไอคอน FileText สื่อถึงเอกสาร/แบบร่าง
  ChevronRight,
} from "lucide-react";
import { WheelchairInfo } from "@/components/WheelchairInfo";
import { RouteLibrary } from "@/components/RouteLibrary";
import { MyPosts } from "@/components/MyPosts";
import { useLanguage } from "../../../contexts/LanguageContext";

export default function ProfilePage() {
  const { t } = useLanguage();
  const router = useRouter();

  // State เก็บจำนวน Draft ที่ค้างอยู่
  const [draftCount, setDraftCount] = useState(0);

  // ตรวจสอบ LocalStorage เพื่อดูว่ามี Draft กี่อัน
  useEffect(() => {
    // ใช้ Key ใหม่ที่เป็น Array (ตามที่คุยกันในระบบจัดการ Draft)
    const savedDrafts = localStorage.getItem("obstacle_report_drafts");
    if (savedDrafts) {
      try {
        const parsed = JSON.parse(savedDrafts);
        if (Array.isArray(parsed)) {
          setDraftCount(parsed.length);
        }
      } catch (e) {
        console.error("Error checking drafts", e);
      }
    }
  }, []);

  const handleEditProfile = () => {
    router.push("/profile/edit");
  };

  const handleViewDrafts = () => {
    router.push("/drafts"); // ลิงก์ไปหน้าจัดการ Draft รวม
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 text-gray-500">
      {/* Profile Header */}
      <div className="bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-gray-600">
            {t("nav.profile")}
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden border-2 border-white shadow-sm">
            <img
              src="/image/profile/profile.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900">Tendou Souji</h2>
            <p className="text-blue-600 text-sm font-medium">Active Explorer</p>
            <div className="flex gap-4 mt-3">
              <div className="text-center">
                <span className="block text-sm font-bold text-gray-900">
                  15
                </span>
                <span className="text-xs text-gray-500">
                  {t("profile.routes")}
                </span>
              </div>
              <div className="text-center">
                <span className="block text-sm font-bold text-gray-900">5</span>
                <span className="text-xs text-gray-500">โพสต์</span>
              </div>
              <div className="text-center">
                <span className="block text-sm font-bold text-gray-900">
                  243
                </span>
                <span className="text-xs text-gray-500">
                  {t("profile.following")}
                </span>
              </div>
              <div className="text-center">
                <span className="block text-sm font-bold text-gray-900">
                  512
                </span>
                <span className="text-xs text-gray-500">
                  {t("profile.followers")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-5">
          <button
            onClick={handleEditProfile}
            className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Edit2 size={16} />
            {t("profile.edit")}
          </button>
          <button
            onClick={() => router.push("/settings")}
            className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors text-gray-600"
          >
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-4">
        {/* ✅ เมนู "แบบร่างที่บันทึกไว้" (แสดงตลอด หรือเฉพาะตอนมี Draft ก็ได้ ในที่นี้แสดงตลอดเพื่อให้ User รู้ว่ามีฟีเจอร์นี้) */}
        <div
          onClick={handleViewDrafts}
          className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between cursor-pointer border border-gray-100 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                draftCount > 0
                  ? "bg-orange-100 text-orange-600"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              <FileText size={20} />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 text-sm">
                {t("drafts.title") || "แบบร่างที่บันทึกไว้"}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {draftCount > 0
                  ? `คุณมีรายการค้างอยู่ ${draftCount} รายการ`
                  : "ไม่มีรายการค้าง"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {draftCount > 0 && (
              <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                {draftCount}
              </span>
            )}
            <ChevronRight size={20} className="text-gray-300" />
          </div>
        </div>

        {/* Wheelchair Information */}
        <WheelchairInfo />

        {/* MyPosts */}
        <MyPosts />

        {/* Route Library */}
        <RouteLibrary />
      </div>
    </div>
  );
}
