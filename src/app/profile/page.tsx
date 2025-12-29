// src/app/profile/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Settings,
  Edit2,
  FileText,
  ChevronRight,
  Trophy,
  Star,
  TrendingUp,
  Map, // เพิ่มไอคอน Map
  MessageSquare, // เพิ่มไอคอน Message
} from "lucide-react";
import { WheelchairInfo } from "@/components/WheelchairInfo";
import { RouteLibrary } from "@/components/RouteLibrary";
import { MyPosts } from "@/components/MyPosts";
import { useLanguage } from "../../../contexts/LanguageContext";
import { useLoyalty } from "@/contexts/LoyaltyContext";

export default function ProfilePage() {
  const { t } = useLanguage();
  const router = useRouter();

  // ✅ 1. เพิ่ม State สำหรับจัดการ Tab (default เป็น 'posts')
  const [activeTab, setActiveTab] = useState<"posts" | "routes">("posts");

  const { stats, currentLevelInfo, nextLevelInfo } = useLoyalty();

  const [draftCount, setDraftCount] = useState(0);

  useEffect(() => {
    const DRAFTS_KEY = "obstacle_report_drafts";
    const savedDrafts = localStorage.getItem(DRAFTS_KEY);
    if (!savedDrafts || JSON.parse(savedDrafts).length === 0) {
      const mockDrafts = [
        {
          id: "mock_1",
          category: "ramp",
          type: "steep",
          description: "ทางลาดชันเกินไป",
          location: [13.7563, 100.5018],
          updatedAt: Date.now(),
        },
      ];
      localStorage.setItem(DRAFTS_KEY, JSON.stringify(mockDrafts));
      setDraftCount(mockDrafts.length);
    } else {
      try {
        const parsed = JSON.parse(savedDrafts);
        if (Array.isArray(parsed)) setDraftCount(parsed.length);
      } catch {
        // ✅ แก้ไข: ลบ (e) ออก เพราะไม่ได้ใช้งาน (Optional Catch Binding)
      }
    }
  }, []);

  const handleEditProfile = () => router.push("/profile/edit");
  const handleViewDrafts = () => router.push("/drafts");

  const calculateProgress = () => {
    if (!nextLevelInfo) return 100;
    const range = nextLevelInfo.minPoints - currentLevelInfo.minPoints;
    const progress = stats.totalPoints - currentLevelInfo.minPoints;
    return Math.min(100, Math.max(0, (progress / range) * 100));
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Profile Header */}
      <div className="bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-gray-800">
            {t("nav.profile")}
          </h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Avatar & Level Badge */}
          <div className="relative shrink-0">
            <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden border-2 border-white shadow-md">
              <img
                src="/image/profile/profile.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-yellow-500 text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center border-2 border-white shadow-sm z-10">
              {stats.currentLevel}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-extrabold text-gray-900 truncate">
              Tendou Souji
            </h2>

            {/* Level Name */}
            <div className="flex items-center gap-2 mb-2">
              <Trophy size={16} className="text-yellow-600" />
              <span className="text-blue-700 text-sm font-bold">
                {currentLevelInfo.name}
              </span>
            </div>

            {/* XP Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-1">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${calculateProgress()}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs font-bold text-gray-600">
              <span>{stats.totalPoints.toLocaleString()} XP</span>
              <span>
                {nextLevelInfo
                  ? `${nextLevelInfo.minPoints.toLocaleString()} XP`
                  : "MAX"}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleEditProfile}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-sm text-sm"
          >
            <Edit2 size={16} />
            {t("profile.edit")}
          </button>
          <button
            onClick={() => router.push("/settings")}
            className="w-11 h-11 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 active:bg-gray-300 transition-colors text-gray-700 border border-gray-200"
          >
            <Settings size={22} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-5">
        {/* Loyalty Widget */}
        <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 rounded-2xl p-5 shadow-lg relative overflow-hidden ring-1 ring-blue-800/20">
          <div className="absolute right-0 top-0 opacity-10 transform translate-x-4 -translate-y-4">
            <Star size={120} className="text-white" />
          </div>
          <div className="relative z-10 flex justify-between items-end">
            <div>
              <p className="!text-white text-sm font-bold mb-1 flex items-center gap-1 shadow-sm">
                <Star size={14} className="text-yellow-300 fill-yellow-300" />
                คะแนนสะสม (Points)
              </p>
              <h3 className="!text-white text-4xl font-black tracking-tight drop-shadow-md">
                {stats.totalPoints.toLocaleString()}
              </h3>
            </div>
            <div className="text-right">
              <p className="!text-white text-xs font-bold mb-1.5 shadow-sm">
                ภารกิจวันนี้
              </p>
              <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-lg text-sm font-bold border border-white/40 flex items-center gap-1 shadow-sm !text-white">
                <TrendingUp size={14} className="text-green-300" />+
                {Object.values(stats.dailyPoints).reduce(
                  (a, b) => a + (b || 0),
                  0
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Drafts Button */}
        <div
          onClick={handleViewDrafts}
          className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between cursor-pointer border border-gray-200 hover:bg-gray-50 hover:border-blue-300 transition-all active:scale-[0.99]"
        >
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 border ${
                draftCount > 0
                  ? "bg-orange-50 border-orange-100 text-orange-600"
                  : "bg-gray-50 border-gray-100 text-gray-400"
              }`}
            >
              <FileText size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-base">
                {t("drafts.title") || "แบบร่างที่บันทึกไว้"}
              </h3>
              <p className="text-sm text-gray-500 mt-0.5 font-medium">
                {draftCount > 0
                  ? `มีรายการค้าง ${draftCount} รายการ`
                  : "ไม่มีรายการค้าง"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {draftCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full min-w-[24px] text-center shadow-sm">
                {draftCount}
              </span>
            )}
            <ChevronRight size={20} className="text-gray-400" />
          </div>
        </div>

        <div className="space-y-5">
          <WheelchairInfo />

          {/* ✅ 2. UI แบบ Slide/Tab Switcher */}
          <div className="bg-gray-100 p-1 rounded-xl flex gap-1">
            <button
              onClick={() => setActiveTab("posts")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 ${
                activeTab === "posts"
                  ? "bg-white text-blue-700 shadow-sm scale-[1.02]"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
              }`}
            >
              <MessageSquare size={16} />
              โพสต์ของฉัน
            </button>
            <button
              onClick={() => setActiveTab("routes")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 ${
                activeTab === "routes"
                  ? "bg-white text-blue-700 shadow-sm scale-[1.02]"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
              }`}
            >
              <Map size={16} />
              คลังเส้นทาง
            </button>
          </div>

          {/* ✅ 3. Conditional Rendering แสดงผลตาม Tab ที่เลือก */}
          <div className="transition-all duration-300 ease-in-out">
            {activeTab === "posts" ? (
              <div className="animate-fade-in">
                <MyPosts />
              </div>
            ) : (
              <div className="animate-fade-in">
                <RouteLibrary />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
