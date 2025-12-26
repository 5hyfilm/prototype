// src/app/community/clubs/[id]/page.tsx
"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Users, MapPin, Share2, MoreHorizontal } from "lucide-react";
import { PostCard } from "@/components/PostCard";
import { samplePosts } from "@/data/community";
import { useLanguage } from "../../../../../contexts/LanguageContext";

export default function ClubDetailPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const params = useParams();
  const [isJoined, setIsJoined] = useState(false);

  // Mock Club Data (ในใช้งานจริงจะ fetch ตาม params.id)
  const clubData = {
    id: params.id,
    name: "Wheelchair Travelers TH",
    description:
      "กลุ่มสำหรับคนชอบเที่ยว แลกเปลี่ยนเส้นทางที่รถเข็นไปได้จริงทั่วไทย แชร์จุดเช็คอิน ร้านอาหาร และที่พัก accessible เพื่อสังคมการท่องเที่ยวที่เท่าเทียม",
    members: 1250,
    postsCount: 154,
    location: "Thailand",
    // coverImage: "/api/placeholder/800/400"
  };

  // Mock Posts สำหรับ Club นี้โดยเฉพาะ
  const clubPosts = samplePosts.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* === Header Image Area === */}
      <div className="relative h-48 bg-blue-600">
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10">
          <button
            onClick={() => router.back()}
            className="bg-black/20 p-2 rounded-full text-white backdrop-blur-sm hover:bg-black/30 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex gap-2">
            <button className="bg-black/20 p-2 rounded-full text-white backdrop-blur-sm hover:bg-black/30 transition-colors">
              <Share2 size={20} />
            </button>
            <button className="bg-black/20 p-2 rounded-full text-white backdrop-blur-sm hover:bg-black/30 transition-colors">
              <MoreHorizontal size={20} />
            </button>
          </div>
        </div>

        {/* Cover Overlay & Info */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-4 left-4 text-white z-10 pr-4">
          <h1 className="text-2xl font-bold mb-1 shadow-sm">{clubData.name}</h1>
          <div className="flex items-center gap-3 text-sm opacity-90 font-medium">
            <span className="flex items-center gap-1">
              <Users size={14} /> {clubData.members.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={14} /> {clubData.location}
            </span>
          </div>
        </div>
      </div>

      {/* === Action Bar === */}
      <div className="bg-white p-4 flex gap-3 border-b border-gray-100 shadow-sm rounded-b-xl mb-3">
        <button
          onClick={() => setIsJoined(!isJoined)}
          className={`flex-1 py-2.5 rounded-lg font-bold text-sm transition-all ${
            isJoined
              ? "bg-gray-100 text-gray-600 border border-gray-200"
              : "bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:shadow-lg"
          }`}
        >
          {isJoined
            ? t("community.club.joined") || "✓ เข้าร่วมแล้ว"
            : t("community.club.join") || "เข้าร่วมกลุ่ม"}
        </button>
        <button className="px-6 py-2.5 bg-blue-50 text-blue-600 rounded-lg font-bold text-sm border border-blue-100">
          {t("community.club.invite") || "เชิญเพื่อน"}
        </button>
      </div>

      {/* === Description === */}
      <div className="bg-white p-4 mb-3 shadow-sm">
        <h2 className="font-bold text-gray-900 mb-2 text-base">
          เกี่ยวกับกลุ่ม
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          {clubData.description}
        </p>
      </div>

      {/* === Club Feed === */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-gray-900 text-base">
            ฟีดกิจกรรมในกลุ่ม
          </h2>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {clubData.postsCount} โพสต์
          </span>
        </div>

        <div className="grid gap-4">
          {clubPosts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
}
