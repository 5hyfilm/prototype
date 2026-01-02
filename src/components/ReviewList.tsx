// src/components/ReviewList.tsx
import React, { useState } from "react";
import {
  ThumbsUp,
  Star,
  Filter,
  ChevronDown,
  ChevronUp,
  MapPin,
} from "lucide-react"; // เพิ่ม MapPin หรือไอคอนอื่นๆ ถ้าต้องการ
import { getReviewsByLocationId } from "@/data/reviews";
import { useLanguage } from "../../contexts/LanguageContext";

interface ReviewListProps {
  locationId: number;
  showWrittenOnly?: boolean;
}

type SortOption = "latest" | "highest" | "lowest" | "mostLiked";

export function ReviewList({
  locationId,
  showWrittenOnly = false,
}: ReviewListProps) {
  const { t } = useLanguage();
  const [sortBy, setSortBy] = useState<SortOption>("latest");
  const [showSortOptions, setShowSortOptions] = useState(false);

  const allReviews = getReviewsByLocationId(locationId);

  const reviews = showWrittenOnly
    ? allReviews.filter(
        (review) => review.comment && review.comment.trim().length > 0
      )
    : allReviews;

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case "latest":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "highest":
        return b.rating - a.rating;
      case "lowest":
        return a.rating - b.rating;
      case "mostLiked":
        return b.likes - a.likes;
      default:
        return 0;
    }
  });

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={`${
              star <= Math.round(rating)
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
        {/* เอาตัวเลขออกตรงนี้ เพื่อความสะอาดตา หรือจะคงไว้ก็ได้ */}
      </div>
    );
  };

  const getSortLabel = (option: SortOption): string => {
    switch (option) {
      case "latest":
        return t("reviews.sort.latest") || "ล่าสุด";
      case "highest":
        return t("reviews.sort.highest") || "คะแนนสูงสุด";
      case "lowest":
        return t("reviews.sort.lowest") || "คะแนนต่ำสุด";
      case "mostLiked":
        return t("reviews.sort.most.liked") || "ถูกใจมากที่สุด";
      default:
        return "";
    }
  };

  // Helper สำหรับ Google Icon (ใช้ Text สีแทนรูปภาพชั่วคราว)
  const GoogleBadge = () => (
    <div className="flex items-center gap-1 bg-white border border-gray-200 shadow-sm px-2 py-0.5 rounded text-[10px] font-medium text-gray-600">
      {/* จำลองโลโก้ G หลากสี */}
      <span className="font-bold">
        <span className="text-blue-500">G</span>
        <span className="text-red-500">o</span>
        <span className="text-yellow-500">o</span>
        <span className="text-blue-500">g</span>
        <span className="text-green-500">l</span>
        <span className="text-red-500">e</span>
      </span>
      <span>Maps</span>
    </div>
  );

  if (reviews.length === 0) {
    return (
      <div className="p-6 text-center bg-gray-50 rounded-lg">
        <p className="text-gray-500">{t("reviews.none") || "ยังไม่มีรีวิว"}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-lg">
            {t("reviews.title") || "รีวิวจากผู้ใช้"}{" "}
            <span className="text-gray-500 text-sm">({reviews.length})</span>
          </h3>

          {/* Sort dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSortOptions(!showSortOptions)}
              className="flex items-center gap-1 text-sm text-gray-600 px-3 py-1 rounded-full border hover:bg-gray-50"
            >
              <Filter size={14} />
              <span>{getSortLabel(sortBy)}</span>
              {showSortOptions ? (
                <ChevronUp size={14} />
              ) : (
                <ChevronDown size={14} />
              )}
            </button>
            {/* ... Dropdown content (เหมือนเดิม) ... */}
            {showSortOptions && (
              <div className="absolute right-0 top-full mt-1 bg-white shadow-md rounded-md z-10 w-40 py-1 border">
                {(
                  ["latest", "highest", "lowest", "mostLiked"] as SortOption[]
                ).map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSortBy(option);
                      setShowSortOptions(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                      sortBy === option
                        ? "font-medium text-blue-600 bg-blue-50"
                        : "text-gray-700"
                    }`}
                  >
                    {getSortLabel(option)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="divide-y">
        {sortedReviews.map((review) => (
          <div
            key={review.id}
            className="p-4 hover:bg-gray-50/50 transition-colors"
          >
            {/* User info and rating */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 shrink-0 border border-gray-100">
                  <img
                    src={review.profileImage || "/api/placeholder/40/40"}
                    alt={review.username}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm text-gray-900">
                      {review.username}
                    </p>
                    {/* ✅ แสดง Badge ถ้ามาจาก Google */}
                    {review.source === "Google" && <GoogleBadge />}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    {renderStars(review.rating)}
                    <span className="text-xs text-gray-400">•</span>
                    <p className="text-xs text-gray-500">
                      {new Date(review.date).toLocaleDateString("th-TH")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Review content */}
            <p className="text-gray-700 my-2 text-sm leading-relaxed whitespace-pre-line">
              {review.comment}
            </p>

            {/* Like button (ซ่อนถ้ามาจาก Google เพราะเราอาจจะไม่รู้จำนวน Like หรือกดไม่ได้) */}
            {review.source !== "Google" && (
              <div className="flex items-center gap-1 text-gray-500 mt-2">
                <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                  <ThumbsUp size={14} />
                  <span className="text-xs font-medium">ถูกใจ</span>
                </button>
                {review.likes > 0 && (
                  <span className="text-xs text-gray-400">
                    • {review.likes}
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
