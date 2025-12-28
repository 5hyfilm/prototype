// src/app/user/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ChevronLeft,
  MapPin,
  Calendar,
  MessageCircle,
  Award,
  Share2,
  MoreHorizontal,
} from "lucide-react";
import { samplePosts } from "@/data/community";
import { sampleUsers } from "@/data/users";
import { PostCard } from "@/components/PostCard";
import { useLanguage } from "../../../../contexts/LanguageContext"; // ✅ ปรับ import path ให้สั้นลง (ถ้า path เดิมผิด)

// Interface สำหรับข้อมูล User ที่จะแสดงในหน้านี้
interface UserProfile {
  name: string;
  username: string;
  avatar: string;
  bio: string;
  joinDate: string;
  level: number;
  levelName: string;
  stats: {
    posts: number;
    likes: number;
    impact: number;
  };
}

export default function PublicProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { t } = useLanguage();

  const userId = params?.id as string;
  const decodedId = userId ? decodeURIComponent(userId) : "";

  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    // 1. หา User จาก sampleUsers
    const systemUser = sampleUsers.find(
      (u) => u.id.toString() === userId || u.name === decodedId
    );

    // 2. หาจาก samplePosts
    const communityUserPost = samplePosts.find((p) => p.username === decodedId);

    // สร้าง Profile จำลอง
    const profileData: UserProfile = {
      name: systemUser ? systemUser.name : decodedId,
      username: decodedId,
      // ✅ แก้จุดที่ 1: เปลี่ยน .userAvatar เป็น .authorAvatar ให้ตรงกับ Interface Post
      avatar:
        systemUser?.profile_image || communityUserPost?.authorAvatar || "",
      bio: "Accessibility Advocate & City Explorer ♿ | ชอบรีวิวทางลาดและร้านกาแฟ",
      joinDate: systemUser
        ? new Date(systemUser.created_at).toLocaleDateString("th-TH", {
            year: "numeric",
            month: "long",
          })
        : "มกราคม 2567",
      level: 5,
      levelName: "Community Explorer",
      stats: {
        posts: 0,
        likes: 0,
        impact: 1250,
      },
    };

    setUser(profileData);
    setLoading(false);
  }, [userId, decodedId]);

  // Filter โพสต์ของ User นี้
  const userPosts = samplePosts.filter((post) => post.username === decodedId);
  const totalLikes = userPosts.reduce((sum, post) => sum + post.likes, 0);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!user) return <div className="p-8 text-center">User not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white sticky top-0 z-30 shadow-sm px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="font-bold text-lg text-gray-800 truncate max-w-[200px]">
          {user.username}
        </h1>
        <button className="p-2 -mr-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
          <MoreHorizontal size={24} />
        </button>
      </div>

      {/* Profile Info */}
      <div className="bg-white pb-6 pt-2 mb-3">
        <div className="px-4">
          <div className="flex items-start gap-4 mb-4">
            {/* Avatar */}
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gray-200 border-2 border-white shadow-md overflow-hidden">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-bold">
                    {user.name[0]?.toUpperCase()}
                  </div>
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 bg-yellow-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                {user.level}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 pt-1">
              <h2 className="text-xl font-bold text-gray-900 leading-tight">
                {user.name}
              </h2>
              <div className="flex items-center gap-1.5 mt-1 text-sm text-blue-600 font-medium">
                <Award size={14} />
                {user.levelName}
              </div>
              <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                {user.bio}
              </p>
            </div>
          </div>

          {/* Date & Location (Mock) */}
          <div className="flex items-center gap-4 text-xs text-gray-500 mb-5 px-1">
            <div className="flex items-center gap-1">
              <MapPin size={14} />
              Bangkok, Thailand
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              เข้าร่วมเมื่อ {user.joinDate}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gray-50 rounded-lg p-2.5 text-center border border-gray-100">
              <div className="font-bold text-lg text-gray-800">
                {userPosts.length}
              </div>
              <div className="text-xs text-gray-500">โพสต์</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-2.5 text-center border border-gray-100">
              <div className="font-bold text-lg text-gray-800">
                {totalLikes}
              </div>
              <div className="text-xs text-gray-500">ถูกใจ</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-2.5 text-center border border-gray-100">
              <div className="font-bold text-lg text-blue-600">
                {user.stats.impact}
              </div>
              <div className="text-xs text-gray-500">Impact XP</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-5">
            <button className="flex-1 bg-blue-600 text-white py-2 rounded-full text-sm font-bold shadow-sm hover:bg-blue-700 active:scale-[0.98] transition-all">
              ติดตาม
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-bold hover:bg-gray-200 transition-colors">
              <MessageCircle size={18} />
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-bold hover:bg-gray-200 transition-colors">
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="px-4 mb-4">
        <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
          <span className="bg-blue-600 w-1 h-5 rounded-full block"></span>
          โพสต์ล่าสุด ({userPosts.length})
        </h3>

        {userPosts.length > 0 ? (
          <div className="space-y-4">
            {userPosts.map((post) => (
              // ✅ แก้จุดที่ 2: Map authorAvatar จาก data ไปใส่ userAvatar ของ Component
              <PostCard
                key={post.id}
                {...post}
                userAvatar={post.authorAvatar}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-white rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-400 text-sm">ยังไม่มีรายการโพสต์</p>
          </div>
        )}
      </div>
    </div>
  );
}
