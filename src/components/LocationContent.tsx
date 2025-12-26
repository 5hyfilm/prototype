// Path: src/components/LocationContent.tsx
"use client";

import { useState, useEffect } from "react";
import { Star, Clock, MapPin, Image as ImageIcon } from "lucide-react"; // 👈 เพิ่ม ImageIcon
import { useLanguage } from "../../contexts/LanguageContext";
import { AccessibilityFeatureItem } from "./AccessibilityFeatureItem";
import { hasRecentData, getCategoryIcon } from "../../utils/locationUtils";
import { ReviewModal } from "./ReviewModal";
import type { Location } from "@/lib/types/location";

interface LocationContentProps {
  location: Location;
}

export function LocationContent({ location }: LocationContentProps) {
  const { t } = useLanguage();
  const [timeFilter, setTimeFilter] = useState<"all" | "recent">("recent");
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [hasAnyRecentData, setHasAnyRecentData] = useState(false);

  // ... (useEffect และ logic เดิมคงไว้เหมือนเดิม) ...
  // Check if any feature has recent data when component mounts
  const accessibilityFeatures = [
    "parking",
    "entrance",
    "ramp",
    "pathway",
    "elevator",
    "restroom",
    "seating",
    "staffAssistance",
    "etc",
  ] as const;

  useEffect(() => {
    const checkForRecentData = () => {
      for (const key of accessibilityFeatures) {
        if (hasRecentData(location.accessibilityScores[key])) {
          return true;
        }
      }
      return false;
    };

    const anyRecentData = checkForRecentData();
    setHasAnyRecentData(anyRecentData);

    if (!anyRecentData) {
      setTimeFilter("all");
    }
  }, [location]);

  const handleReviewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = `/review/${location.id}`;
  };

  const handleViewReviews = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsReviewModalOpen(true);
  };

  const translateCategory = (category: string) => {
    const categoryMap: Record<string, string> = {
      "Shopping Mall": "accessibility.place.shopping.mall",
      "Public Transport": "accessibility.place.transport.hub",
      Park: "accessibility.place.park",
    };
    return t(categoryMap[category] || "accessibility.place.other");
  };

  return (
    <div className="space-y-4">
      {/* 🖼️ Location Cover Image (Placeholder Area) */}
      {/* ตีกรอบ h-48 และใส่ bg-gray-200 เสมอ ไม่ว่าจะมีรูปหรือไม่ */}
      <div className="relative w-full h-48 rounded-xl overflow-hidden shadow-sm mb-4 bg-gray-200 flex items-center justify-center border border-gray-100">
        {location.image ? (
          <img
            src={location.image}
            alt={location.name}
            className="w-full h-full object-cover"
          />
        ) : (
          // ⚠️ กรณีไม่มีรูปภาพ: แสดง icon และข้อความ placeholder
          <div className="flex flex-col items-center text-gray-400">
            <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
            <span className="text-xs font-medium text-gray-500">
              {t("common.no.image") || "No Image Available"}
            </span>
          </div>
        )}

        {/* Badge ระดับการเข้าถึง (แสดงทับกรอบเสมอ) */}
        <div
          className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white shadow-md backdrop-blur-sm
          ${
            location.accessibility === "high"
              ? "bg-green-500/90"
              : location.accessibility === "medium"
              ? "bg-yellow-500/90"
              : "bg-red-500/90"
          }`}
        >
          {location.accessibility === "high"
            ? t("accessibility.high") || "High"
            : location.accessibility === "medium"
            ? t("accessibility.medium") || "Medium"
            : t("accessibility.low") || "Low"}
        </div>
      </div>

      {/* Location Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg text-blue-600 shrink-0">
            {getCategoryIcon(location.category)}
          </div>
          <div>
            <h3 className="font-bold text-xl text-gray-900 leading-tight">
              {location.name}
            </h3>
            <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
              {translateCategory(location.category)}
            </p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
        <p className="text-sm text-gray-600 leading-relaxed">
          {location.description}
        </p>
      </div>

      {/* Time Filter and View Reviews Button */}
      <div className="flex justify-between items-center pt-1 border-t border-gray-100 mt-2">
        <button
          onClick={handleViewReviews}
          className="text-blue-600 text-sm flex items-center gap-1 hover:underline font-medium"
        >
          <Star className="w-4 h-4" />
          <span>{t("common.view.written.reviews") || "See Reviews"}</span>
        </button>

        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setTimeFilter("recent")}
            className={`px-3 py-1 text-xs rounded-md flex items-center gap-1 transition-all ${
              timeFilter === "recent"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            } ${!hasAnyRecentData ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={!hasAnyRecentData}
          >
            <Clock className="w-3 h-3" />
            <span>{t("location.filter.recent") || "Recent (24h)"}</span>
          </button>
          <button
            onClick={() => setTimeFilter("all")}
            className={`px-3 py-1 text-xs rounded-md transition-all ${
              timeFilter === "all"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <span>{t("location.filter.all") || "All Time"}</span>
          </button>
        </div>
      </div>

      {/* Accessibility Features List */}
      <div className="space-y-3 pt-2">
        {accessibilityFeatures.map((key) => (
          <AccessibilityFeatureItem
            key={key}
            title={location.accessibilityScores[key].name}
            feature={location.accessibilityScores[key]}
            timeFilter={timeFilter}
          />
        ))}
      </div>

      {/* Write Review Button */}
      <div className="pt-2 sticky bottom-0 bg-white pb-2 border-t border-gray-100 mt-4">
        <button
          onClick={handleReviewClick}
          className="w-full bg-blue-600 text-white px-4 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 active:scale-[0.98] transition-all shadow-md shadow-blue-200"
        >
          <Star className="w-5 h-5 fill-current" />
          <span className="font-semibold">
            {t("common.write.review") || "Write a Review"}
          </span>
        </button>
      </div>

      <ReviewModal
        locationId={location.id}
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
      />
    </div>
  );
}
