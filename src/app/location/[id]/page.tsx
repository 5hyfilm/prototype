// src/app/location/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, MapPin, Star } from "lucide-react";
import { accessibleLocations } from "@/data/locations";
import { getReviewsByLocationId, getAverageRating } from "@/data/reviews";
import { ReviewList } from "@/components/ReviewList";
import { useLanguage } from "../../../../contexts/LanguageContext";
// 👇 Import Component
import { PlaceImageGallery } from "@/components/PlaceImageGallery";

export default function LocationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { t } = useLanguage();
  const locationId = params?.id ? parseInt(params.id as string) : 0;

  const [location, setLocation] = useState(
    accessibleLocations.find((loc) => loc.id === locationId)
  );
  const [averageRating, setAverageRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  useEffect(() => {
    if (locationId) {
      const foundLocation = accessibleLocations.find(
        (loc) => loc.id === locationId
      );
      setLocation(foundLocation);

      const reviews = getReviewsByLocationId(locationId);
      const writtenReviews = reviews.filter(
        (review) => review.comment && review.comment.trim().length > 0
      );
      setReviewCount(writtenReviews.length);
      setAverageRating(getAverageRating(locationId));
    }
  }, [locationId]);

  const handleBack = () => {
    router.back();
  };

  if (!location) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">สถานที่ไม่พบ</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4">
          <div className="h-16 flex items-center gap-3">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="font-medium line-clamp-1">{location.name}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* 👇 ส่วนแสดง Gallery: ส่ง Array ว่าง [] เพื่อให้แสดงกรอบ Placeholder */}
        <div className="mb-6">
          <PlaceImageGallery images={[]} />
        </div>

        {/* Location Info */}
        <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
          <h2 className="text-xl font-semibold">{location.name}</h2>
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
            <MapPin size={16} />
            <span>{location.category}</span>
          </div>

          <div className="flex items-center gap-1 mt-2">
            <Star className="text-yellow-400 fill-yellow-400" size={18} />
            <span className="font-medium">{averageRating.toFixed(1)}</span>
            <span className="text-gray-500 text-sm">
              ({reviewCount} {t("reviews.written.count") || "รีวิวแบบข้อความ"})
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {location.features.map((feature, index) => (
              <span
                key={index}
                className="text-sm px-3 py-1 bg-blue-50 text-blue-700 rounded-full"
              >
                {feature}
              </span>
            ))}
          </div>

          <p className="mt-4 text-gray-700">{location.description}</p>
        </div>

        {/* Location Details */}
        <div className="bg-white rounded-lg shadow-sm mb-6 p-4">
          <h3 className="font-medium text-lg mb-4">
            {t("location.about") || "เกี่ยวกับสถานที่"}
          </h3>
          <p className="text-gray-700 mb-4">{location.description}</p>

          <div className="pt-4 border-t border-gray-100">
            <h4 className="font-medium mb-2">
              {t("location.contact") || "ข้อมูลติดต่อ"}
            </h4>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <span className="font-medium text-gray-900">
                  {t("location.phone") || "โทรศัพท์"}:
                </span>{" "}
                02-XXX-XXXX
              </p>
              <p>
                <span className="font-medium text-gray-900">
                  {t("location.website") || "เว็บไซต์"}:
                </span>{" "}
                www.example.com
              </p>
              <p>
                <span className="font-medium text-gray-900">
                  {t("location.hours") || "เวลาเปิด-ปิด"}:
                </span>{" "}
                10:00 - 22:00
              </p>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mb-6">
          <h3 className="font-medium text-lg mb-4">
            {t("reviews.written.title") || "รีวิวแบบข้อความ"} ({reviewCount})
          </h3>
          <ReviewList locationId={locationId} showWrittenOnly={true} />
        </div>
      </div>
    </div>
  );
}
