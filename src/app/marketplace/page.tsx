// src/app/marketplace/page.tsx
"use client";

import { useState } from "react";
import { Ticket, Search, Filter, Coins, Store, X } from "lucide-react";
import {
  MarketplaceItemCard,
  MarketplaceItem,
} from "@/components/MarketplaceItemCard";
import { ComingSoonPopup } from "@/components/ComingSoonPopup";

// Mock Data (เหมือนเดิม)
const mockItems: MarketplaceItem[] = [
  {
    id: "1",
    title: "ส่วนลด 100 บาท Starbucks (สาขา Accessible)",
    category: "lifestyle",
    points: 800,
    originalPrice: 100,
    merchantName: "Starbucks",
    rating: 4.8,
    image: "/api/placeholder/400/320",
  },
  {
    id: "2",
    title: "Voucher นั่งรถแท็กซี่คนพิการฟรี 1 เที่ยว",
    category: "travel",
    points: 1500,
    originalPrice: 350,
    merchantName: "Cabb Taxi",
    rating: 4.9,
    image: "/api/placeholder/400/320",
  },
  {
    id: "3",
    title: "เช่าวีลแชร์ไฟฟ้า รุ่น Lite 1 วัน",
    category: "health",
    points: 2500,
    originalPrice: 1000,
    merchantName: "GooseWay Rental",
    rating: 5.0,
    image: "/api/placeholder/400/320",
  },
  {
    id: "4",
    title: "ส่วนลดโรงแรม Hop Inn (ห้อง Accessible)",
    category: "travel",
    points: 1200,
    originalPrice: 300,
    merchantName: "Hop Inn",
    rating: 4.5,
    image: "/api/placeholder/400/320",
  },
];

export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState<
    "all" | "lifestyle" | "travel" | "health"
  >("all");
  const [searchQuery, setSearchQuery] = useState(""); // State สำหรับคำค้นหา
  const [showPopup, setShowPopup] = useState(false);
  const userPoints = 3450;

  // Logic การกรอง: เช็คทั้ง Category และ Search Query
  const filteredItems = mockItems.filter((item) => {
    const matchesCategory = activeTab === "all" || item.category === activeTab;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.merchantName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-24 text-gray-800">
      {/* --- Header Section --- */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-b-[2rem] shadow-lg relative overflow-hidden">
        <div className="absolute -top-10 -right-10 p-4 opacity-10 rotate-12">
          <Store size={180} />
        </div>

        <div className="relative z-10 mt-2">
          <h1 className="text-2xl font-bold mb-1 tracking-tight">
            Marketplace
          </h1>
          <p className="text-blue-100 text-sm mb-6 opacity-90">
            แลกสิทธิพิเศษเพื่อการเดินทางของคุณ
          </p>

          <div className="flex items-center justify-between bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <div>
              <p className="text-xs text-blue-100 mb-1">แต้มสะสมของคุณ</p>
              <div className="flex items-baseline gap-1">
                <Coins
                  size={20}
                  className="text-yellow-400"
                  fill="currentColor"
                />
                <span className="text-3xl font-bold">
                  {userPoints.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="h-10 w-px bg-white/20 mx-2"></div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowPopup(true)}
                className="flex flex-col items-center justify-center w-16 h-16 bg-white rounded-xl text-blue-600 shadow-sm active:scale-95 transition-all"
              >
                <Ticket size={20} className="mb-1" />
                <span className="text-[10px] font-bold">คูปอง</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Search Bar Section (NEW) --- */}
      <div className="px-4 -mt-6 relative z-20 mb-2">
        <div className="bg-white rounded-xl shadow-md flex items-center p-2 border border-gray-100">
          <Search size={20} className="text-gray-400 ml-2 mr-3" />
          <input
            type="text"
            placeholder="ค้นหาร้านค้า, ส่วนลด..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 py-2"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="p-1 rounded-full hover:bg-gray-100 text-gray-400"
            >
              <X size={16} />
            </button>
          )}
          <div className="w-px h-6 bg-gray-200 mx-2"></div>
          <button className="p-2 rounded-lg hover:bg-gray-50 text-gray-500">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* --- Categories --- */}
      <div className="px-4 py-4 sticky top-0 bg-gray-50/95 backdrop-blur-sm z-10 overflow-x-auto no-scrollbar">
        <div className="flex gap-2 whitespace-nowrap">
          {[
            { id: "all", label: "ทั้งหมด" },
            { id: "lifestyle", label: "☕ กิน/ดื่ม" },
            { id: "travel", label: "🏨 ท่องเที่ยว" },
            { id: "health", label: "⚕️ สุขภาพ" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* --- Items Grid --- */}
      <div className="px-4 grid grid-cols-2 gap-4 pb-4">
        {filteredItems.map((item) => (
          <MarketplaceItemCard
            key={item.id}
            item={item}
            onRedeem={() => setShowPopup(true)}
          />
        ))}
      </div>

      {/* --- Empty State (เมื่อค้นหาไม่เจอ) --- */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12 flex flex-col items-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
            <Search className="text-gray-400" size={24} />
          </div>
          <p className="text-gray-500 font-medium">ไม่พบรายการที่ค้นหา</p>
          <p className="text-gray-400 text-xs mt-1">
            ลองเปลี่ยนคำค้นหา หรือเลือกหมวดหมู่อื่นดูนะ
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveTab("all");
            }}
            className="mt-4 text-blue-600 text-sm font-medium hover:underline"
          >
            ล้างการค้นหาทั้งหมด
          </button>
        </div>
      )}

      <ComingSoonPopup isOpen={showPopup} onClose={() => setShowPopup(false)} />
    </div>
  );
}
