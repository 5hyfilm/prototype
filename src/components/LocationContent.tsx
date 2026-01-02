// Path: src/components/LocationContent.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Star,
  Clock,
  Image as ImageIcon,
  ExternalLink,
  Ticket,
  LayoutList,
  Plane,
  MessageSquare, // เพิ่มไอคอนสำหรับ Tab Reviews
} from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { AccessibilityFeatureItem } from "./AccessibilityFeatureItem";
import { hasRecentData, getCategoryIcon } from "../../utils/locationUtils";
import { ReviewModal } from "./ReviewModal";
// 👇 Import ReviewList เข้ามาใช้งานใน Tab ใหม่
import { ReviewList } from "./ReviewList";
import type { Location } from "@/lib/types/location";

interface LocationContentProps {
  location: Location;
}

// 👇 เพิ่ม 'reviews' เข้าไปใน TabType
type TabType = "overview" | "reviews" | "booking";

export function LocationContent({ location }: LocationContentProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [timeFilter, setTimeFilter] = useState<"all" | "recent">("recent");
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [hasAnyRecentData, setHasAnyRecentData] = useState(false);

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
    if (!anyRecentData) setTimeFilter("all");
  }, [location]);

  const hasBooking = location.bookingLinks && location.bookingLinks.length > 0;

  const handleReviewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // ถ้าจะเขียนรีวิว อาจจะยังใช้ Modal หรือไปหน้าเขียนรีวิว
    // ในที่นี้ถ้ากดเขียนรีวิว ให้เปิด Modal เหมือนเดิม หรือจะนำทางไปหน้าอื่นก็ได้
    // window.location.href = `/review/${location.id}`; // แบบเดิม
    setIsReviewModalOpen(true); // เปิด Modal เขียนรีวิว
  };

  // 👇 ปรับให้กดแล้วย้ายไป Tab Reviews แทน
  const handleViewReviews = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveTab("reviews");
  };

  const translateCategory = (category: string) => {
    const categoryMap: Record<string, string> = {
      "Shopping Mall": "accessibility.place.shopping.mall",
      "Public Transport": "accessibility.place.transport.hub",
      Park: "accessibility.place.park",
      Hotel: "accessibility.place.hotel",
    };
    return t(categoryMap[category] || "accessibility.place.other");
  };

  const getProviderStyle = (provider: string) => {
    switch (provider.toLowerCase()) {
      case "agoda":
        return "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white border-none";
      case "trip.com":
        return "bg-blue-600 text-white border-blue-700";
      case "booking.com":
        return "bg-[#003580] text-white border-[#003580]";
      default:
        return "bg-white border-gray-200 text-gray-800 hover:bg-gray-50 border";
    }
  };

  return (
    <div className="flex flex-col min-h-full pb-6">
      {/* 🖼️ ส่วนหัว (แสดงตลอดเหมือนเดิม) */}
      <div className="space-y-4 mb-4">
        <div className="relative w-full h-48 rounded-xl overflow-hidden shadow-sm bg-gray-200 flex items-center justify-center border border-gray-100 shrink-0">
          {location.image ? (
            <img
              src={location.image}
              alt={location.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center text-gray-400">
              <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
              <span className="text-xs font-medium text-gray-500">
                {t("common.no.image") || "No Image"}
              </span>
            </div>
          )}
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

        <div className="flex items-center gap-3 px-1">
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

      {/* 🟢 TABS NAVIGATION (ปรับปรุงใหม่) */}
      <div className="flex border-b border-gray-200 mb-4 sticky top-0 bg-white z-10 -mx-4 px-4 pt-2">
        <button
          onClick={() => setActiveTab("overview")}
          className={`flex-1 pb-3 text-sm font-semibold border-b-2 transition-colors flex items-center justify-center gap-2
            ${
              activeTab === "overview"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
        >
          <LayoutList className="w-4 h-4" />
          {t("location.tab.overview") || "Overview"}
        </button>

        {/* 👇 เพิ่ม Tab Reviews */}
        <button
          onClick={() => setActiveTab("reviews")}
          className={`flex-1 pb-3 text-sm font-semibold border-b-2 transition-colors flex items-center justify-center gap-2
            ${
              activeTab === "reviews"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
        >
          <MessageSquare className="w-4 h-4" />
          {t("reviews.written.title") || "Reviews"}
        </button>

        {hasBooking && (
          <button
            onClick={() => setActiveTab("booking")}
            className={`flex-1 pb-3 text-sm font-semibold border-b-2 transition-colors flex items-center justify-center gap-2
              ${
                activeTab === "booking"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
          >
            <Ticket className="w-4 h-4" />
            {t("location.tab.booking") || "Booking"}
          </button>
        )}
      </div>

      {/* 🟡 CONTENT AREA */}

      {/* 1. Tab Overview (เหลือแค่ Facility และ Description) */}
      {activeTab === "overview" && (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
            <p className="text-sm text-gray-600 leading-relaxed">
              {location.description}
            </p>
          </div>

          <div className="flex justify-between items-center pt-2">
            {/* 👇 ปุ่มนี้กดแล้วจะย้ายไป Tab Reviews */}
            <button
              onClick={handleViewReviews}
              className="text-blue-600 text-sm flex items-center gap-1 hover:underline font-medium"
            >
              <Star className="w-4 h-4" />
              <span>
                {t("common.view.written.reviews") || "See all reviews"}
              </span>
            </button>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setTimeFilter("recent")}
                className={`px-3 py-1 text-xs rounded-md flex items-center gap-1 transition-all ${
                  timeFilter === "recent"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-500"
                } ${!hasAnyRecentData ? "opacity-50" : ""}`}
                disabled={!hasAnyRecentData}
              >
                <Clock className="w-3 h-3" />
                <span>Recent</span>
              </button>
              <button
                onClick={() => setTimeFilter("all")}
                className={`px-3 py-1 text-xs rounded-md transition-all ${
                  timeFilter === "all"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-500"
                }`}
              >
                <span>All Time</span>
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {accessibilityFeatures.map((key) => (
              <AccessibilityFeatureItem
                key={key}
                title={location.accessibilityScores[key].name}
                feature={location.accessibilityScores[key]}
                timeFilter={timeFilter}
              />
            ))}
          </div>

          {/* ปุ่มเขียนรีวิวอาจจะยังคงไว้ในหน้าแรก เพื่อความสะดวก */}
          <button
            onClick={handleReviewClick}
            className="w-full bg-white border-2 border-blue-600 text-blue-600 px-4 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-50 font-semibold mt-4"
          >
            <Star className="w-5 h-5" />
            <span>{t("common.write.review") || "Write a Review"}</span>
          </button>
        </div>
      )}

      {/* 2. Tab Reviews (มาใหม่ ✨) */}
      {activeTab === "reviews" && (
        <div className="space-y-4 animate-in fade-in duration-300">
          {/* แสดงปุ่มเขียนรีวิวด้วยเพื่อให้ User ไม่ต้องกลับไปหน้า Overview */}
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-bold text-gray-900">
              {t("reviews.written.title") || "Written Reviews"}
            </h4>
            <button
              onClick={handleReviewClick}
              className="text-sm text-blue-600 font-medium hover:underline"
            >
              + {t("common.write.review") || "Write"}
            </button>
          </div>

          {/* เรียกใช้ ReviewList ตรงๆ */}
          <ReviewList locationId={location.id} showWrittenOnly={true} />
        </div>
      )}

      {/* 3. Tab Booking (เหมือนเดิม) */}
      {activeTab === "booking" && hasBooking && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 text-center space-y-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm text-blue-600">
              <Plane className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-lg text-gray-900">
              {t("location.booking.title") || "Plan your trip"}
            </h4>
            <p className="text-sm text-gray-600">
              {t("location.booking.desc") ||
                "Select a partner to book hotels or services nearby."}
            </p>
          </div>

          <div className="space-y-3">
            {location.bookingLinks?.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`block group relative overflow-hidden rounded-xl shadow-sm transition-all hover:scale-[1.01] active:scale-[0.98] border ${getProviderStyle(
                  link.provider
                )}`}
              >
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Ticket className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-medium opacity-90">Book via</p>
                      <h3 className="text-lg font-bold">{link.provider}</h3>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 opacity-80" />
                </div>
              </a>
            ))}
          </div>

          <div className="text-center pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400">
              *We may earn a commission from bookings made through these links.
            </p>
          </div>
        </div>
      )}

      <ReviewModal
        locationId={location.id}
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
      />
    </div>
  );
}
