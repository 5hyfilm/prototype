// src/app/community/page.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Plus,
  MapPin,
  Users,
  ChevronRight,
  Pencil,
  Check,
  UserPlus,
  Ticket,
  Calendar,
  X,
} from "lucide-react";
import { CategoryTabs } from "@/components/CategoryTabs";
import { PostCard } from "@/components/PostCard";
import { samplePosts } from "@/data/community";
import { useLanguage } from "../../../contexts/LanguageContext";

// --- Mock Data ---

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
  {
    id: 3,
    title: "Accessible Tourism Talk",
    date: "2025-11-05T10:00:00",
    location: "Online (Zoom)",
    type: "Online",
    attendees: 120,
    image: "/api/placeholder/400/200",
  },
];

const mockClubs = [
  {
    id: 1,
    name: "Wheelchair Travelers TH",
    description: "กลุ่มคนชอบเที่ยว แลกเปลี่ยนเส้นทางทั่วไทย",
    members: 1250,
    isJoined: true,
  },
  {
    id: 2,
    name: "Tech & Gadgets for All",
    description: "รีวิวอุปกรณ์และเทคโนโลยีช่วยเหลือ",
    members: 890,
    isJoined: false,
  },
  {
    id: 3,
    name: "Accessible Cafes BKK",
    description: "รวมคาเฟ่และร้านอาหารที่มีทางลาด",
    members: 450,
    isJoined: false,
  },
  {
    id: 4,
    name: "Pet Lovers Club",
    description: "คนรักสัตว์เลี้ยงและสัตว์ช่วยเหลือ",
    members: 300,
    isJoined: true,
  },
  {
    id: 5,
    name: "Para Sports Thailand",
    description: "รวมพลคนรักกีฬาวีลแชร์และพาราลิมปิก",
    members: 620,
    isJoined: false,
  },
];

export default function CommunityPage() {
  const { t } = useLanguage();
  const router = useRouter();

  // Tabs State
  const [activeTab, setActiveTab] = useState<"feed" | "events" | "clubs">(
    "feed"
  );

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Events State
  // ✅ [UPDATE] เพิ่ม ID 1 เข้าไปเป็น Default เพื่อให้เห็นตัวอย่างกิจกรรมที่เข้าร่วม
  const [joinedEvents, setJoinedEvents] = useState<number[]>([1]);
  const [eventFilter, setEventFilter] = useState<"all" | "my">("all");

  // --- Filter Logic ---

  // 1. Feed Logic
  const filteredPosts = samplePosts.filter(
    (post) =>
      (selectedCategory === "All" || post.category === selectedCategory) &&
      (post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.username.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // 2. Events Logic
  const displayedEvents = mockEvents.filter((event) => {
    if (eventFilter === "my") return joinedEvents.includes(event.id);
    return true;
  });

  // 3. Clubs Logic
  const myClubs = mockClubs.filter((c) => c.isJoined);

  // Search Results for Overlay
  const searchResults = mockClubs.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // --- Handlers ---

  const handleCreateAction = () => {
    if (activeTab === "clubs") {
      router.push("/community/create-club");
    } else {
      router.push("/add-post");
    }
  };

  const handleRSVP = (eventId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (joinedEvents.includes(eventId)) {
      if (confirm("คุณต้องการยกเลิกการเข้าร่วมกิจกรรมนี้หรือไม่?")) {
        setJoinedEvents((prev) => prev.filter((id) => id !== eventId));
      }
    } else {
      setJoinedEvents((prev) => [...prev, eventId]);
    }
  };

  const getButtonLabel = () => {
    if (activeTab === "clubs") return "สร้างคลับ";
    return t("community.create.post") || "สร้างโพสต์";
  };

  // Click outside to close search overlay
  const searchRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        // Optional: setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-20 text-gray-800">
      {/* === Header & Search === */}
      <div className="bg-white sticky top-0 z-20 shadow-sm px-4 pt-4 pb-2">
        <div className="flex items-center gap-3 mb-3">
          {/* Search Bar Container */}
          <div className="flex-1 relative" ref={searchRef}>
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder={
                activeTab === "clubs"
                  ? "ค้นหาคลับใหม่ๆ..."
                  : t("community.search.placeholder") || "ค้นหา..."
              }
              className="w-full bg-gray-100 rounded-full pl-10 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
            />

            {(searchQuery || isSearchFocused) && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  if (activeTab === "clubs") setIsSearchFocused(false);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={14} />
              </button>
            )}

            {/* Full Screen Search Overlay */}
            {activeTab === "clubs" && isSearchFocused && (
              <div className="fixed top-[68px] left-0 right-0 bottom-0 bg-white z-50 border-t border-gray-100 overflow-y-auto animate-in fade-in slide-in-from-bottom-2 duration-200">
                <div className="p-4 space-y-2 pb-24">
                  <h3 className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
                    {searchQuery
                      ? `ผลการค้นหา (${searchResults.length})`
                      : "แนะนำสำหรับคุณ"}
                  </h3>

                  {searchResults.length > 0 ? (
                    searchResults.map((club) => (
                      <div
                        key={club.id}
                        onClick={() => {
                          router.push(`/community/clubs/${club.id}`);
                          setIsSearchFocused(false);
                        }}
                        className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors border-b border-gray-50 last:border-0"
                      >
                        <div
                          className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-lg ${
                            club.isJoined
                              ? "bg-gray-200 text-gray-600"
                              : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          {club.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-base text-gray-900 truncate">
                            {club.name}
                          </h4>
                          <p className="text-sm text-gray-500 truncate">
                            {club.members.toLocaleString()} สมาชิก •{" "}
                            {club.description}
                          </p>
                        </div>
                        {club.isJoined ? (
                          <span className="text-xs bg-gray-100 text-gray-500 px-3 py-1.5 rounded-full whitespace-nowrap font-medium">
                            สมาชิกแล้ว
                          </span>
                        ) : (
                          <span className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-full whitespace-nowrap shadow-sm font-medium">
                            + เข้าร่วม
                          </span>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                      <div className="bg-gray-100 p-4 rounded-full mb-3">
                        <Search size={32} className="text-gray-400" />
                      </div>
                      <p>ไม่พบคลับที่ค้นหา</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

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
              <h2 className="font-bold text-lg flex items-center gap-2">
                {eventFilter === "all" ? "กิจกรรมเร็วๆ นี้" : "กิจกรรมของฉัน"}
                {eventFilter === "my" && (
                  <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">
                    {joinedEvents.length}
                  </span>
                )}
              </h2>

              <div className="bg-gray-100 p-1 rounded-lg flex text-xs font-bold">
                <button
                  onClick={() => setEventFilter("all")}
                  className={`px-3 py-1.5 rounded-md flex items-center gap-1 transition-all ${
                    eventFilter === "all"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Calendar size={14} /> Explore
                </button>
                <button
                  onClick={() => setEventFilter("my")}
                  className={`px-3 py-1.5 rounded-md flex items-center gap-1 transition-all ${
                    eventFilter === "my"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Ticket size={14} /> My Events
                </button>
              </div>
            </div>

            {displayedEvents.length > 0 ? (
              displayedEvents.map((event) => {
                const isJoined = joinedEvents.includes(event.id);
                return (
                  <div
                    key={event.id}
                    onClick={() => router.push(`/community/events/${event.id}`)}
                    className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col cursor-pointer hover:shadow-md transition-all active:scale-[0.99]"
                  >
                    <div className="h-32 bg-gray-200 relative">
                      <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-md text-xs font-bold text-blue-800 backdrop-blur-sm">
                        {event.type}
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="flex gap-3">
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
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 line-clamp-1">
                            {event.title}
                          </h3>
                          <div className="flex items-center text-gray-500 text-xs mt-1">
                            <MapPin size={12} className="mr-1" />
                            {event.location}
                          </div>
                          <div className="flex items-center text-gray-500 text-xs mt-1">
                            <Users size={12} className="mr-1" />
                            {event.attendees} คนเข้าร่วม
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={(e) => handleRSVP(event.id, e)}
                        className={`w-full mt-3 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors ${
                          isJoined
                            ? "bg-green-50 border border-green-200 text-green-700 hover:bg-green-100"
                            : "bg-blue-600 border border-transparent text-white hover:bg-blue-700 shadow-sm"
                        }`}
                      >
                        {isJoined ? (
                          <>
                            <Check size={16} /> ลงทะเบียนแล้ว
                          </>
                        ) : (
                          <>
                            <UserPlus size={16} /> สนใจเข้าร่วม
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-400">
                  {eventFilter === "my" ? (
                    <Ticket size={32} />
                  ) : (
                    <Calendar size={32} />
                  )}
                </div>
                <h3 className="text-gray-900 font-bold">
                  {eventFilter === "my"
                    ? "ยังไม่มีกิจกรรมที่เข้าร่วม"
                    : "ไม่พบกิจกรรม"}
                </h3>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Clubs */}
        {activeTab === "clubs" && (
          <div className="space-y-4">
            <div className="bg-blue-600 rounded-xl p-4 text-white mb-4 shadow-md">
              <h3 className="font-bold text-lg mb-1">หาเพื่อนร่วมทาง</h3>
              <p className="text-blue-100 text-sm mb-3">
                เข้าร่วมกลุ่มตามความสนใจเพื่อแลกเปลี่ยนประสบการณ์
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => router.push("/community/create-club")}
                  className="bg-white text-blue-600 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm flex items-center gap-1 hover:bg-blue-50 transition-colors"
                >
                  <Plus size={16} /> สร้างคลับ
                </button>
              </div>
            </div>

            <h2 className="font-bold text-lg mb-2 text-gray-900">คลับของฉัน</h2>

            {myClubs.length > 0 ? (
              myClubs.map((club) => (
                <div
                  key={club.id}
                  onClick={() => router.push(`/community/clubs/${club.id}`)}
                  className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-all active:scale-[0.98] mb-3"
                >
                  <div className="w-14 h-14 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden"></div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{club.name}</h3>
                    <p className="text-xs text-gray-500 line-clamp-1">
                      {club.description}
                    </p>
                  </div>
                  <div className="bg-gray-100 p-2 rounded-full text-gray-600">
                    <ChevronRight size={20} />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 bg-white rounded-xl border border-dashed border-gray-300">
                <p className="text-gray-500 mb-2">
                  คุณยังไม่ได้เข้าร่วมคลับใดๆ
                </p>
                <p className="text-xs text-blue-600">
                  ลองค้นหาคลับที่น่าสนใจที่แถบค้นหาด้านบน
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
