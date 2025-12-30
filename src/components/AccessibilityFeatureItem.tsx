// Path: src/components/AccessibilityFeatureItem.tsx
"use client";

import { useState } from "react";
import { ThumbsUp, ThumbsDown, Image } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { PhotoViewer } from "./PhotoViewer";
import {
  isWithinLast24Hours,
  getAccessibilityFeatureTranslationKey,
} from "../../utils/locationUtils";

interface AccessibilityFeatureItemProps {
  title: string;
  feature: {
    votes: {
      like: number;
      dislike: number;
    };
    isLiked: boolean | null;
    images: { url: string; caption?: string; timestamp?: string }[];
  };
  timeFilter: "all" | "recent";
}

export const AccessibilityFeatureItem = ({
  title,
  feature,
  timeFilter,
}: AccessibilityFeatureItemProps) => {
  const { t } = useLanguage();
  const [showPhotos, setShowPhotos] = useState(false);

  // หาคีย์การแปลสำหรับชื่อคุณสมบัติ
  const translationKey = getAccessibilityFeatureTranslationKey(title);

  // Filter votes based on timeFilter
  const filteredVotes = {
    like:
      timeFilter === "recent"
        ? Math.floor(feature.votes.like * 0.3)
        : feature.votes.like,
    dislike:
      timeFilter === "recent"
        ? Math.floor(feature.votes.dislike * 0.3)
        : feature.votes.dislike,
  };

  // Filter images based on timeFilter
  const filteredImages =
    timeFilter === "recent"
      ? feature.images.filter(
          (img) => !img.timestamp || isWithinLast24Hours(img.timestamp)
        )
      : feature.images;

  // Determine which count is highest
  const { like, dislike } = filteredVotes;
  const maxCount = Math.max(like, dislike);
  const isLikeHighest = like === maxCount && like > 0;
  const isDislikeHighest = dislike === maxCount && dislike > 0;

  return (
    <div className="border rounded-lg overflow-hidden bg-white p-4 shadow-sm">
      {/* ส่วนหัวข้อ (Title) แยกออกมาด้านบน */}
      <div className="mb-3">
        <label className="text-base font-medium text-gray-900">
          {t(translationKey)}
        </label>
      </div>

      {/* Action Row: โหวตด้านซ้าย - รูปภาพด้านขวา */}
      <div className="flex items-center justify-between">
        {/* 👈 ฝั่งซ้าย: ปุ่มโหวต (Like/Dislike) */}
        <div className="flex rounded-lg overflow-hidden border border-gray-200 shadow-sm">
          <div
            className={`px-4 py-1.5 flex items-center gap-1 transition-colors ${
              isLikeHighest
                ? "bg-green-100 text-green-700"
                : "bg-white text-gray-500"
            }`}
          >
            <ThumbsUp className="w-4 h-4" />
            <span className="text-xs font-medium">{like}</span>
          </div>
          <div
            className={`px-4 py-1.5 border-l border-gray-200 flex items-center gap-1 transition-colors ${
              isDislikeHighest
                ? "bg-red-100 text-red-700"
                : "bg-white text-gray-500"
            }`}
          >
            <ThumbsDown className="w-4 h-4" />
            <span className="text-xs font-medium">{dislike}</span>
          </div>
        </div>

        {/* 👉 ฝั่งขวา: ปุ่มดูรูปภาพ (แสดงเฉพาะเมื่อมีรูป) */}
        {filteredImages.length > 0 && (
          <button
            onClick={() => setShowPhotos(true)}
            className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-full transition-all active:scale-95"
          >
            <Image className="w-4 h-4" />
            <span>
              {t("location.view.photos", { count: filteredImages.length }) ||
                `ดูรูป (${filteredImages.length})`}
            </span>
          </button>
        )}
      </div>

      {showPhotos && (
        <PhotoViewer
          images={filteredImages}
          onClose={() => setShowPhotos(false)}
          title={t(translationKey)}
        />
      )}
    </div>
  );
};
