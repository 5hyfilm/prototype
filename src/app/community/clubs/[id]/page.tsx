// src/app/community/clubs/[id]/page.tsx
"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft,
  Share2,
  Users,
  MapPin,
  Calendar,
  Trophy,
  Lock,
  Plus,
  Settings,
  UserMinus,
  LogOut,
} from "lucide-react";
import { PostCard } from "@/components/PostCard";
import { samplePosts } from "@/data/community";
import {
  mockClubLeaderboard,
  mockClubEvents,
  mockClubMembers,
} from "@/data/clubs"; // Import mock data
import { useLanguage } from "../../../../../contexts/LanguageContext";

// ✅ 1. สร้าง Type Alias สำหรับ Tabs เพื่อความชัดเจนและ Type Safety
type ClubTab = "feed" | "events" | "leaderboard" | "members";

export default function ClubDetailPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const params = useParams();

  // State
  // ✅ 2. ใช้ Type Alias ที่สร้างไว้
  const [activeTab, setActiveTab] = useState<ClubTab>("feed");
  const [isJoined, setIsJoined] = useState(true); // สมมติว่า Join แล้วเพื่อโชว์ฟีเจอร์ภายใน
  const [isAdmin] = useState(true); // สมมติว่าเป็น Admin เพื่อโชว์ปุ่มจัดการ
  const [leaderboardPeriod, setLeaderboardPeriod] = useState<
    "weekly" | "monthly"
  >("weekly");

  // Mock Data for this club
  const clubData = {
    id: params.id,
    name: "Wheelchair Travelers TH",
    description: "กลุ่มคนชอบเที่ยว แลกเปลี่ยนเส้นทางทั่วไทย",
    members: 1250,
    location: "Thailand",
    isPrivate: true,
  };

  // Filter posts (In real app, filter by clubId)
  const clubPosts = samplePosts.slice(0, 5);

  const handleLeaveClub = () => {
    if (confirm("คุณแน่ใจหรือไม่ที่จะออกจากคลับนี้?")) {
      setIsJoined(false);
      // Logic to leave club API
    }
  };

  // ✅ 3. สร้าง Array ของ Tabs พร้อมระบุ Type ให้ถูกต้อง
  const tabs: { id: ClubTab; label: string }[] = [
    { id: "feed", label: "Feed" },
    { id: "events", label: "Events" },
    { id: "leaderboard", label: "Ranking" },
    { id: "members", label: "Members" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20 text-gray-800">
      {/* === Header Image & Info === */}
      <div className="relative bg-white pb-2">
        <div className="h-40 bg-gradient-to-r from-blue-600 to-indigo-600 relative">
          <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center text-white">
            <button
              onClick={() => router.back()}
              className="bg-black/20 p-2 rounded-full backdrop-blur-sm"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex gap-2">
              {/* Admin Settings Button */}
              {isAdmin && (
                <button className="bg-black/20 p-2 rounded-full backdrop-blur-sm">
                  <Settings size={20} />
                </button>
              )}
              <button className="bg-black/20 p-2 rounded-full backdrop-blur-sm">
                <Share2 size={20} />
              </button>
              {isJoined && (
                <button
                  onClick={handleLeaveClub}
                  className="bg-red-500/80 p-2 rounded-full backdrop-blur-sm text-white"
                  title="Leave Club"
                >
                  <LogOut size={20} />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="px-4 -mt-10 relative">
          <div className="w-20 h-20 rounded-xl bg-white p-1 shadow-md">
            <div className="w-full h-full bg-gray-200 rounded-lg overflow-hidden">
              {/* Club Logo Placeholder */}
              <img
                src="/image/gps.png"
                className="w-full h-full object-cover opacity-80"
              />
            </div>
          </div>

          <div className="mt-3">
            <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              {clubData.name}
              {clubData.isPrivate && (
                <Lock size={16} className="text-gray-400" />
              )}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
              <span className="flex items-center gap-1">
                <Users size={14} /> {clubData.members.toLocaleString()}
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={14} /> {clubData.location}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-2">{clubData.description}</p>
          </div>

          {/* Join/Invite Buttons */}
          <div className="flex gap-3 mt-4">
            {isJoined ? (
              <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg font-bold text-sm border border-gray-200">
                ✓ {t("community.club.joined") || "สมาชิกแล้ว"}
              </button>
            ) : (
              <button
                onClick={() => setIsJoined(true)}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-bold text-sm shadow-md hover:bg-blue-700"
              >
                {t("community.club.join") || "ขอเข้าร่วมกลุ่ม"}
              </button>
            )}
            <button className="px-6 py-2 bg-blue-50 text-blue-600 rounded-lg font-bold text-sm border border-blue-100">
              {t("community.club.invite") || "เชิญเพื่อน"}
            </button>
          </div>
        </div>
      </div>

      {/* === Tabs === */}
      <div className="bg-white mt-2 border-b border-gray-100 sticky top-0 z-10">
        <div className="flex justify-between px-2">
          {/* ✅ 4. ใช้ตัวแปร tabs ในการ map แทน array ที่เขียนสด */}
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)} // ✅ ไม่ต้องใช้ as any แล้ว
              className={`flex-1 py-3 text-sm font-semibold relative ${
                activeTab === tab.id ? "text-blue-600" : "text-gray-500"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-blue-600 rounded-t-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* === Tab Content === */}
      <div className="p-4">
        {/* --- FEED TAB --- */}
        {activeTab === "feed" && (
          <div className="space-y-4">
            {/* Create Post Box */}
            {isJoined && (
              <div
                className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex gap-3 items-center cursor-pointer"
                onClick={() => router.push("/add-post")}
              >
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1 bg-gray-50 rounded-full px-4 py-2 text-sm text-gray-500">
                  เขียนอะไรบางอย่างถึงคลับ...
                </div>
                <div className="p-2 text-blue-600">
                  <Share2 size={20} />
                </div>
              </div>
            )}

            {/* Posts List */}
            <div className="grid gap-4">
              {clubPosts.map((post) => (
                <PostCard key={post.id} {...post} />
              ))}
            </div>
          </div>
        )}

        {/* --- EVENTS TAB (Private Events) --- */}
        {activeTab === "events" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-gray-900">กิจกรรมเฉพาะสมาชิก</h3>
              {isAdmin && (
                <button className="text-blue-600 text-sm font-bold flex items-center gap-1">
                  <Plus size={16} /> สร้างกิจกรรม
                </button>
              )}
            </div>

            {mockClubEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <div className="h-2 bg-blue-600"></div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md uppercase tracking-wide">
                      {new Date(event.date).toLocaleDateString("th-TH", {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    {event.isPrivate && (
                      <span className="flex items-center gap-1 text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                        <Lock size={10} /> Private
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-lg mb-1">{event.title}</h4>
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />{" "}
                      {new Date(event.date).toLocaleTimeString("th-TH", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={12} /> {event.location}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    {event.description}
                  </p>
                  <button className="w-full py-2 bg-blue-600 text-white rounded-lg text-sm font-bold">
                    เข้าร่วม ({event.attendees})
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- LEADERBOARD TAB --- */}
        {activeTab === "leaderboard" && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl p-4 text-white shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <Trophy size={20} /> Club Leaderboard
                  </h3>
                  <p className="text-white/80 text-sm">
                    จัดอันดับสมาชิกยอดเยี่ยม
                  </p>
                </div>
                <div className="bg-white/20 p-1 rounded-lg flex text-xs font-bold">
                  <button
                    onClick={() => setLeaderboardPeriod("weekly")}
                    className={`px-3 py-1 rounded-md transition-all ${
                      leaderboardPeriod === "weekly"
                        ? "bg-white text-orange-500"
                        : "text-white"
                    }`}
                  >
                    Weekly
                  </button>
                  <button
                    onClick={() => setLeaderboardPeriod("monthly")}
                    className={`px-3 py-1 rounded-md transition-all ${
                      leaderboardPeriod === "monthly"
                        ? "bg-white text-orange-500"
                        : "text-white"
                    }`}
                  >
                    Monthly
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {mockClubLeaderboard[leaderboardPeriod].map((user, index) => (
                <div
                  key={index}
                  className={`flex items-center p-4 border-b border-gray-50 last:border-0 ${
                    index < 3 ? "bg-yellow-50/30" : ""
                  }`}
                >
                  <div
                    className={`w-8 h-8 flex items-center justify-center font-black text-lg ${
                      index === 0
                        ? "text-yellow-500"
                        : index === 1
                        ? "text-gray-400"
                        : index === 2
                        ? "text-orange-400"
                        : "text-gray-600"
                    }`}
                  >
                    {user.rank}
                  </div>
                  <div className="w-10 h-10 bg-gray-200 rounded-full mx-3 overflow-hidden">
                    {user.avatar && (
                      <img
                        src={user.avatar}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-sm">
                      {user.name}
                    </h4>
                    <p className="text-xs text-gray-500">{user.distance} km</p>
                  </div>
                  <div className="text-right">
                    <span className="block font-bold text-blue-600">
                      {user.points}
                    </span>
                    <span className="text-[10px] text-gray-400">pts</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- MEMBERS TAB (Admin) --- */}
        {activeTab === "members" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-gray-900">
                สมาชิกทั้งหมด ({clubData.members})
              </h3>
              {isAdmin && (
                <button className="text-blue-600 text-xs font-bold bg-blue-50 px-3 py-1.5 rounded-full">
                  จัดการคำขอ (2)
                </button>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              {mockClubMembers.map((member) => (
                <div
                  key={member.id}
                  className="p-3 flex items-center justify-between border-b border-gray-50 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-900">
                        {member.name}
                      </h4>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full ${
                          member.role === "Admin"
                            ? "bg-purple-100 text-purple-600"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {member.role}
                      </span>
                    </div>
                  </div>
                  {isAdmin && member.role !== "Admin" && (
                    <div className="flex gap-2">
                      <button
                        className="p-2 text-gray-400 hover:bg-gray-100 rounded-full"
                        title="Remove"
                      >
                        <UserMinus size={18} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
