// src/app/profile/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Settings,
  Edit2,
  FileEdit, // 👈 เพิ่มไอคอนสำหรับ Draft
  ChevronRight, // 👈 เพิ่มไอคอนลูกศร
  AlertCircle, // 👈 เพิ่มไอคอนแจ้งเตือน
} from "lucide-react";
import { WheelchairInfo } from "@/components/WheelchairInfo";
import { RouteLibrary } from "@/components/RouteLibrary";
import { MyPosts } from "@/components/MyPosts";
import { useLanguage } from "../../../contexts/LanguageContext";

export default function ProfilePage() {
  const { t } = useLanguage();
  const router = useRouter();

  // State สำหรับเช็คว่ามี Draft ค้างอยู่หรือไม่
  const [hasObstacleDraft, setHasObstacleDraft] = useState(false);

  // ตรวจสอบ LocalStorage เมื่อโหลดหน้าเว็บ
  useEffect(() => {
    const draft = localStorage.getItem("obstacle_report_draft");
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        // เช็คคร่าวๆ ว่ามีข้อมูลจริงไหม
        if (
          parsed.category ||
          parsed.description ||
          parsed.location?.[0] !== 0
        ) {
          setHasObstacleDraft(true);
        }
      } catch (e) {
        console.error("Error checking draft", e);
      }
    }
  }, []);

  const handleEditProfile = () => {
    router.push("/profile/edit");
  };

  const handleContinueDraft = () => {
    router.push("/report-obstacle");
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
            onClick={() => router.push("/settings")} // ใช้ router.push แทน window.location เพื่อความลื่นไหลใน Next.js
            className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors text-gray-600"
          >
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-4">
        {/* 🔥 DRAFT ALERT SECTION (แสดงเมื่อมี Draft เท่านั้น) */}
        {hasObstacleDraft && (
          <div
            onClick={handleContinueDraft}
            className="bg-orange-50 border border-orange-100 rounded-xl p-4 flex items-center justify-between cursor-pointer active:scale-[0.99] transition-transform shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0">
                <FileEdit size={20} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                  แบบร่างรายงานอุปสรรค
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                </h3>
                <p className="text-xs text-orange-600 font-medium mt-0.5">
                  คุณมีรายการที่ยังเขียนไม่เสร็จ คลิกเพื่อทำต่อ
                </p>
              </div>
            </div>
            <ChevronRight size={20} className="text-orange-300" />
          </div>
        )}

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
