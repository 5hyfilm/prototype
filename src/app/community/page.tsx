// src/app/community/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Plus,
  MapPin,
  Users,
  ChevronRight,
  Pencil, // เพิ่มไอคอน Pencil
} from "lucide-react";
import { CategoryTabs } from "@/components/CategoryTabs";
import { PostCard } from "@/components/PostCard";
import { samplePosts } from "@/data/community";
import { useLanguage } from "../../../contexts/LanguageContext";

// --- Mock Data ---

// Events ตาม SRS (Meetups, Workshops, Volunteer)
const mockEvents = [
  {
    id: 1,
    title: "Bangkok Wheelchair Meetup #1",
    date: "2025-10-15T09:00:00",
    location: "Benjakitti Forest Park",
    type: "Meetup",
    attendees: 24,
    image: "/api/placeholder/400/200",
  },
  {
    id: 2,
    title: "Inclusive Design Workshop",
    date: "2025-10-20T13:30:00",
    location: "BACC Art Center",
    type: "Workshop",
    attendees: 50,
    image: "/api/placeholder/400/200",
  },
];

// Clubs ตาม SRS (Interest-based groups)
const mockClubs = [
  {
    id: 1,
    name: "Wheelchair Travelers TH",
    description: "กลุ่มคนชอบเที่ยว แลกเปลี่ยนเส้นทางทั่วไทย",
    members: 1250,
    // image: "/image/community/club1.jpg" // ใส่ path รูปจริงถ้ามี
  },
  {
    id: 2,
    name: "Tech & Gadgets for All",
    description: "รีวิวอุปกรณ์และเทคโนโลยีช่วยเหลือ",
    members: 890,
    // image: "/image/community/club2.jpg"
  },
];

export default function CommunityPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"feed" | "events" | "clubs">(
    "feed"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter Logic สำหรับ Feed
  const filteredPosts = samplePosts.filter(
    (post) =>
      (selectedCategory === "All" || post.category === selectedCategory) &&
      (post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.username.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCreateAction = () => {
    if (activeTab === "clubs") {
      router.push("/community/create-club");
    } else {
      router.push("/add-post");
    }
  };

  // Helper สำหรับข้อความบนปุ่ม
  const getButtonLabel = () => {
    if (activeTab === "clubs") return "สร้างคลับ";
    return t("community.create.post") || "สร้างโพสต์";
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 text-gray-800">
      {/* === Header & Search === */}
      <div className="bg-white sticky top-0 z-20 shadow-sm px-4 pt-4 pb-2">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder={t("community.search.placeholder") || "ค้นหา..."}
              className="w-full bg-gray-100 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* ✅ เปลี่ยนปุ่มเป็นแบบมีข้อความ (Text Button) */}
          <button
            onClick={handleCreateAction}
            className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-700 transition-all text-sm font-bold flex items-center gap-2 whitespace-nowrap active:scale-95"
          >
            {activeTab === "clubs" ? <Plus size={18} /> : <Pencil size={16} />}
            <span>{getButtonLabel()}</span>
          </button>
        </div>

        {/* === Tabs Navigation === */}
        <div className="flex justify-between border-b border-gray-100">
          <button
            onClick={() => setActiveTab("feed")}
            className={`flex-1 pb-3 text-sm font-semibold relative ${
              activeTab === "feed" ? "text-blue-600" : "text-gray-500"
            }`}
          >
            {t("community.tab.feed") || "ฟีด"}
            {activeTab === "feed" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("events")}
            className={`flex-1 pb-3 text-sm font-semibold relative ${
              activeTab === "events" ? "text-blue-600" : "text-gray-500"
            }`}
          >
            {t("community.tab.events") || "กิจกรรม"}
            {activeTab === "events" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("clubs")}
            className={`flex-1 pb-3 text-sm font-semibold relative ${
              activeTab === "clubs" ? "text-blue-600" : "text-gray-500"
            }`}
          >
            {t("community.tab.clubs") || "คลับ"}
            {activeTab === "clubs" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />
            )}
          </button>
        </div>
      </div>

      {/* === Content Area === */}
      <div className="p-4">
        {/* Tab 1: Feed */}
        {activeTab === "feed" && (
          <div className="space-y-4">
            <CategoryTabs onSelect={setSelectedCategory} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPosts.map((post) => (
                <PostCard key={post.id} {...post} />
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <p>{t("community.no.posts") || "ไม่พบโพสต์ที่ค้นหา"}</p>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Events */}
        {activeTab === "events" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-bold text-lg">
                {t("community.events.upcoming") || "กิจกรรมเร็วๆ นี้"}
              </h2>
              <button className="text-blue-600 text-sm font-medium">
                {t("common.see_all") || "ดูทั้งหมด"}
              </button>
            </div>

            {mockEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col"
              >
                <div className="h-32 bg-gray-200 relative">
                  {/* Event Type Badge */}
                  <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-md text-xs font-bold text-blue-800">
                    {event.type}
                  </div>
                </div>
                <div className="p-3">
                  <div className="flex gap-3">
                    {/* Date Block */}
                    <div className="flex flex-col items-center bg-blue-50 px-2 py-1 rounded text-blue-700 min-w-[50px] h-fit">
                      <span className="text-xs font-bold uppercase">
                        {new Date(event.date).toLocaleString("default", {
                          month: "short",
                        })}
                      </span>
                      <span className="text-xl font-bold">
                        {new Date(event.date).getDate()}
                      </span>
                    </div>
                    {/* Info */}
                    <div>
                      <h3 className="font-bold text-gray-900 line-clamp-1">
                        {event.title}
                      </h3>
                      <div className="flex items-center text-gray-500 text-xs mt-1">
                        <MapPin size={12} className="mr-1" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-gray-500 text-xs mt-1">
                        <Users size={12} className="mr-1" />
                        {event.attendees}{" "}
                        {t("community.events.going") || "คนเข้าร่วม"}
                      </div>
                    </div>
                  </div>
                  <button className="w-full mt-2 py-1.5 rounded-lg border border-blue-600 text-blue-600 text-sm font-medium hover:bg-blue-50 transition-colors">
                    {t("community.events.rsvp") || "สนใจเข้าร่วม"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Clubs (Updated Click Logic) */}
        {activeTab === "clubs" && (
          <div className="space-y-4">
            <div className="bg-blue-600 rounded-xl p-4 text-white mb-4">
              <h3 className="font-bold text-lg mb-1">
                {t("community.clubs.banner.title") || "หาเพื่อนร่วมทาง"}
              </h3>
              <p className="text-blue-100 text-sm mb-3">
                {t("community.clubs.banner.desc") ||
                  "เข้าร่วมกลุ่มตามความสนใจเพื่อแลกเปลี่ยนประสบการณ์"}
              </p>

              {/* ปุ่มสร้างคลับใน Banner (เสริม) */}
              <div className="flex gap-2">
                <button
                  onClick={() => router.push("/community/create-club")}
                  className="bg-white text-blue-600 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm flex items-center gap-1"
                >
                  <Plus size={16} /> สร้างคลับ
                </button>
              </div>
            </div>

            <h2 className="font-bold text-lg mb-2">
              {t("community.clubs.recommended") || "แนะนำสำหรับคุณ"}
            </h2>

            {mockClubs.map((club) => (
              <div
                key={club.id}
                onClick={() => router.push(`/community/clubs/${club.id}`)}
                className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-all active:scale-[0.98]"
              >
                <div className="w-14 h-14 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                  {/* Placeholder Image */}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{club.name}</h3>
                  <p className="text-xs text-gray-500 line-clamp-1">
                    {club.description}
                  </p>
                  <p className="text-xs text-blue-600 mt-1 font-medium">
                    {club.members.toLocaleString()} Members
                  </p>
                </div>
                <div className="bg-gray-100 p-2 rounded-full text-gray-600">
                  <ChevronRight size={20} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
