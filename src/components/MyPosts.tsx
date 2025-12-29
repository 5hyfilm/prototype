// src/components/MyPosts.tsx
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { myPosts } from "@/data/userPosts";
import { Plus, Image as ImageIcon } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { PostCard } from "./PostCard";

export function MyPosts() {
  const { t } = useLanguage();
  const router = useRouter();
  const [posts] = useState([...myPosts].reverse()); // เอาล่าสุดขึ้นก่อน

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mb-3">
          <ImageIcon size={32} />
        </div>
        <h3 className="font-bold text-gray-800 mb-1">ยังไม่มีโพสต์</h3>
        <p className="text-gray-500 text-sm mb-5">
          แชร์เรื่องราวหรือประสบการณ์ของคุณให้เพื่อนๆ รู้
        </p>
        <button
          onClick={() => router.push("/add-post")}
          className="bg-white text-gray-700 border border-gray-300 px-6 py-2.5 rounded-full font-bold text-sm hover:bg-gray-50 active:scale-95 transition-all flex items-center gap-2"
        >
          <Plus size={18} />
          สร้างโพสต์แรก
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Grid Layout 2 Columns */}
      <div className="grid grid-cols-2 gap-3">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            // ✅ แก้ไขตรงนี้: เปลี่ยนจาก post.image เป็น post.imageUrl
            imageUrl={
              post.imageUrl || "/image/community/community_1/community_1_0.jpg"
            }
            title={post.title}
            username="Me"
            userAvatar="/image/profile/profile.jpg"
            likes={post.likes}
            comments={post.comments}
          />
        ))}
      </div>
      <div className="pt-4 pb-8 text-center">
        <p className="text-xs text-gray-400">
          แสดงทั้งหมด {posts.length} รายการ
        </p>
      </div>
    </div>
  );
}
