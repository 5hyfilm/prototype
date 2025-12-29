// src/app/profile/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Settings, Edit2, FileText, Trophy, Map, Grid } from "lucide-react";
import { WheelchairInfo } from "@/components/WheelchairInfo";
import { RouteLibrary } from "@/components/RouteLibrary";
import { MyPosts } from "@/components/MyPosts";
import { useLanguage } from "../../../contexts/LanguageContext";
import { useLoyalty } from "@/contexts/LoyaltyContext";

export default function ProfilePage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"posts" | "routes">("posts");
  const { stats, currentLevelInfo, nextLevelInfo } = useLoyalty();
  const [draftCount, setDraftCount] = useState(0);

  // เช็คจำนวน Drafts ที่ค้างอยู่
  useEffect(() => {
    const DRAFTS_KEY = "obstacle_report_drafts";
    const savedDrafts = localStorage.getItem(DRAFTS_KEY);
    if (savedDrafts) {
      try {
        const parsed = JSON.parse(savedDrafts);
        if (Array.isArray(parsed)) setDraftCount(parsed.length);
      } catch {}
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
    <div className="min-h-screen bg-white pb-20">
      {/* 1. Header Area */}
      <div className="bg-white px-4 pt-4 pb-2">
        {/* Top Bar: Title + Actions Group */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-black text-gray-800 tracking-tight">
            {t("nav.profile")}
          </h1>

          <div className="flex items-center gap-2">
            {/* ✅ ปุ่ม Drafts (ย้ายมาตรงนี้) */}
            <button
              onClick={handleViewDrafts}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all relative border border-gray-100"
              aria-label="Drafts"
            >
              <FileText size={20} />
              {/* Notification Dot */}
              {draftCount > 0 && (
                <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
              )}
            </button>

            {/* ปุ่ม Settings */}
            <button
              onClick={() => router.push("/settings")}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 transition-all border border-gray-100"
            >
              <Settings size={20} />
            </button>
          </div>
        </div>

        {/* Profile Info Section */}
        <div className="flex items-center gap-5 mb-6">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden border-[3px] border-white shadow-lg">
              <img
                src="/image/profile/profile.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center border-2 border-white shadow-md z-10">
              {stats.currentLevel}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-extrabold text-gray-900 truncate mb-1">
              Tendou Souji
            </h2>

            {/* Level Badge */}
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-md border border-blue-100 flex items-center gap-1.5 w-fit">
                <Trophy size={12} className="text-blue-600 fill-blue-600" />
                {currentLevelInfo.name}
              </span>
            </div>

            {/* XP Bar */}
            <div className="w-full bg-gray-100 rounded-full h-1.5 mb-1 overflow-hidden">
              <div
                className="bg-blue-600 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${calculateProgress()}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-[10px] font-bold text-gray-400">
              <span>{stats.totalPoints.toLocaleString()} XP</span>
              <span>
                {nextLevelInfo
                  ? `${nextLevelInfo.minPoints.toLocaleString()}`
                  : "MAX"}
              </span>
            </div>
          </div>
        </div>

        {/* ✅ ปุ่ม Edit Profile (เต็มความกว้าง + เด่นชัด) */}
        <button
          onClick={handleEditProfile}
          className="w-full py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm flex items-center justify-center gap-2 mb-4"
        >
          <Edit2 size={16} />
          {t("profile.edit")}
        </button>

        {/* Wheelchair Info */}
        <div className="mb-2">
          <WheelchairInfo />
        </div>
      </div>

      {/* 2. Sticky Slide Tabs */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm mt-2">
        <div className="flex">
          <button
            onClick={() => setActiveTab("posts")}
            className={`flex-1 py-3 text-sm font-bold relative transition-colors ${
              activeTab === "posts"
                ? "text-blue-600"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Grid size={18} />
              <span>โพสต์ของฉัน</span>
            </div>
            {/* Sliding Indicator Line */}
            {activeTab === "posts" && (
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-600 animate-fade-in" />
            )}
          </button>

          <button
            onClick={() => setActiveTab("routes")}
            className={`flex-1 py-3 text-sm font-bold relative transition-colors ${
              activeTab === "routes"
                ? "text-blue-600"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Map size={18} />
              <span>เส้นทางของฉัน</span>
            </div>
            {/* Sliding Indicator Line */}
            {activeTab === "routes" && (
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-600 animate-fade-in" />
            )}
          </button>
        </div>
      </div>

      {/* 3. Content Area */}
      <div className="p-1 min-h-[300px] bg-gray-50">
        <div className="animate-fade-in p-2">
          {activeTab === "posts" ? <MyPosts /> : <RouteLibrary />}
        </div>
      </div>
    </div>
  );
}
