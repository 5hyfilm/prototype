// src/app/community/components/PostCard.tsx
"use client";

import { Heart, MessageCircle, Share2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../contexts/LanguageContext";

interface PostCardProps {
  id: number;
  imageUrl: string;
  title: string;
  username: string;
  likes: number;
  comments: number;
  userAvatar?: string;
}

export function PostCard({
  id,
  imageUrl,
  title,
  username,
  likes: initialLikes,
  comments,
  userAvatar,
}: PostCardProps) {
  const { t } = useLanguage();
  const router = useRouter();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Share functionality
    // TODO: Implement actual share functionality
  };

  const handleProfileClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // ลิงก์ไปหน้า Public Profile ของ User นั้น (ใช้ username เป็น id ชั่วคราว)
    router.push(`/user/${username}`);
  };

  return (
    <div
      className="bg-white rounded-xl overflow-hidden shadow-sm cursor-pointer transition-transform hover:scale-[0.98]"
      onClick={() => router.push(`/community/${id}`)}
      aria-label={t("community.post.view.details")}
    >
      <div className="aspect-square bg-gray-100 relative">
        <img
          src={imageUrl}
          alt={t("community.post.image.alt", { username })}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-3">
        {/* ✅ แก้ไข: เพิ่ม onClick และ Style ให้กดไปหน้า Profile ได้ */}
        <div
          className="flex items-center gap-2 mb-2 cursor-pointer hover:bg-gray-50 p-1 -ml-1 rounded-lg transition-colors w-fit"
          onClick={handleProfileClick}
        >
          <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden border border-gray-100">
            {userAvatar ? (
              <img
                src={userAvatar}
                alt={t("community.user.avatar", { username })}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold">
                {username[0].toUpperCase()}
              </div>
            )}
          </div>
          <span className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
            {username}
          </span>
        </div>

        <p className="text-sm line-clamp-2 mb-2 text-gray-800">{title}</p>

        <div className="flex items-center gap-4">
          <button
            onClick={handleLike}
            className="flex items-center gap-1 group"
            aria-label={t("community.post.like")}
          >
            <Heart
              size={18}
              className={`transition-colors ${
                liked
                  ? "fill-red-500 text-red-500"
                  : "text-gray-400 group-hover:text-red-500"
              }`}
            />
            <span className="text-xs text-gray-500 group-hover:text-gray-700">
              {likes}
            </span>
          </button>
          <button
            className="flex items-center gap-1 group"
            onClick={(e) => e.stopPropagation()}
            aria-label={t("community.post.comments")}
          >
            <MessageCircle
              size={18}
              className="text-gray-400 group-hover:text-blue-500 transition-colors"
            />
            <span className="text-xs text-gray-500 group-hover:text-gray-700">
              {comments}
            </span>
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-1 group"
            aria-label={t("community.post.share")}
          >
            <Share2
              size={18}
              className="text-gray-400 group-hover:text-green-500 transition-colors"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
