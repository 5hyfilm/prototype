// src/app/report-obstacle/page.tsx
"use client";

import { useState, useEffect, useMemo, Suspense } from "react"; // เพิ่ม Suspense
import {
  Camera,
  ChevronLeft,
  X,
  MapPin,
  Crosshair,
  Send,
  Save,
  AlertCircle,
  FileText, // เพิ่ม icon
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation"; // เพิ่ม useSearchParams
import type { ObstacleCategory, ObstacleType } from "@/lib/types/obstacle";
import { OBSTACLE_CATEGORIES } from "@/lib/types/obstacle";
import { useLanguage } from "../../../contexts/LanguageContext";
import dynamic from "next/dynamic";

// เปลี่ยน Key เป็น drafts (plural)
const DRAFTS_KEY = "obstacle_report_drafts";

// Interface สำหรับ Draft
interface DraftItem {
  id: string;
  category: ObstacleCategory | "";
  type: ObstacleType | "";
  description: string;
  location: [number, number];
  updatedAt: number;
}

// Dynamic Imports (คงเดิม)
const MapPicker = dynamic(() => import("../../components/MapPicker"), {
  ssr: false,
  loading: () => (
    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  ),
});

const SimpleLocationMap = dynamic(
  () => import("../../components/SimpleLocationMap"),
  {
    ssr: false,
    loading: () => (
      <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    ),
  }
);

// สร้าง Component เนื้อหาหลักแยกออกมาเพื่อห่อด้วย Suspense
function ReportObstacleContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t, language } = useLanguage();

  // State
  const [draftId, setDraftId] = useState<string | null>(null); // เก็บ ID ของ Draft ปัจจุบัน
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    category: "" as ObstacleCategory | "",
    type: "" as ObstacleType | "",
    description: "",
    location: [0, 0] as [number, number],
  });

  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [showMapPicker, setShowMapPicker] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [draftStatus, setDraftStatus] = useState<"idle" | "saving" | "saved">(
    "idle"
  );

  const isFormValid = useMemo(() => {
    return (
      formData.category !== "" &&
      formData.type !== "" &&
      formData.description.trim() !== "" &&
      formData.location[0] !== 0 &&
      formData.location[1] !== 0
    );
  }, [formData]);

  // --- 1. Load Draft Logic (ทำงานเมื่อมี ?id=...) ---
  useEffect(() => {
    const idFromUrl = searchParams.get("id");

    if (idFromUrl) {
      // โหลด Draft เฉพาะที่มี ID ตรงกัน
      const allDrafts = localStorage.getItem(DRAFTS_KEY);
      if (allDrafts) {
        const parsedDrafts = JSON.parse(allDrafts) as DraftItem[];
        const targetDraft = parsedDrafts.find((d) => d.id === idFromUrl);

        if (targetDraft) {
          setDraftId(targetDraft.id);
          setFormData({
            category: targetDraft.category,
            type: targetDraft.type,
            description: targetDraft.description,
            location: targetDraft.location,
          });
          console.log("Loaded draft:", targetDraft.id);
        } else {
          // ถ้าไม่เจอ ID (อาจถูกลบไปแล้ว) ให้เคลียร์ URL
          router.replace("/report-obstacle");
        }
      }
    } else {
      // ถ้าไม่มี ID ให้หาตำแหน่งปัจจุบัน (เคสสร้างใหม่)
      if (formData.location[0] === 0) {
        getCurrentLocation();
      }
    }
  }, [searchParams]);

  // --- 2. Auto-Save Logic (Optional: Save to Array if Draft ID exists) ---
  // SRS เน้น "จัดการ Draft" ซึ่งมักหมายถึงการกด Save เอง หรือ Auto-save ลง ID เดิม
  // เพื่อความปลอดภัยของข้อมูล เราจะ Auto-save ก็ต่อเมื่อ "มี ID แล้ว" (เคยกด Save มาก่อน)
  useEffect(() => {
    if (!draftId) return; // ถ้ายังไม่เคย Save เป็น Draft จะไม่ Auto-save ลง Storage (ป้องกันขยะ)

    const timer = setTimeout(() => {
      saveDraftToStorage(draftId);
    }, 1500); // Debounce

    return () => clearTimeout(timer);
  }, [formData, draftId]);

  // ฟังก์ชันบันทึกลง LocalStorage (Array)
  const saveDraftToStorage = (id: string) => {
    setDraftStatus("saving");
    try {
      const allDraftsStr = localStorage.getItem(DRAFTS_KEY);
      let allDrafts: DraftItem[] = allDraftsStr ? JSON.parse(allDraftsStr) : [];

      const draftData: DraftItem = {
        id: id,
        ...formData,
        updatedAt: Date.now(),
      };

      // หา Index เดิม
      const index = allDrafts.findIndex((d) => d.id === id);
      if (index >= 0) {
        allDrafts[index] = draftData; // Update
      } else {
        allDrafts.push(draftData); // Insert (เผื่อเคสแปลกๆ)
      }

      localStorage.setItem(DRAFTS_KEY, JSON.stringify(allDrafts));
      setDraftStatus("saved");

      // Reset status after 2s
      setTimeout(() => setDraftStatus("idle"), 2000);
    } catch (e) {
      console.error("Save draft error", e);
      setDraftStatus("idle");
    }
  };

  // --- 3. Manual Save Draft Button ---
  const handleSaveDraft = () => {
    // ถ้ามี ID อยู่แล้ว ให้ใช้ ID เดิม
    // ถ้ายังไม่มี ให้สร้าง ID ใหม่ (UUID)
    let targetId = draftId;

    if (!targetId) {
      targetId = crypto.randomUUID(); // สร้าง ID ใหม่
      setDraftId(targetId);

      // เพิ่มลง Array ครั้งแรก
      const allDraftsStr = localStorage.getItem(DRAFTS_KEY);
      let allDrafts: DraftItem[] = allDraftsStr ? JSON.parse(allDraftsStr) : [];

      const newDraft: DraftItem = {
        id: targetId,
        ...formData,
        updatedAt: Date.now(),
      };

      allDrafts.push(newDraft);
      localStorage.setItem(DRAFTS_KEY, JSON.stringify(allDrafts));

      // Update URL โดยไม่ Reload
      window.history.replaceState(null, "", `/report-obstacle?id=${targetId}`);
    } else {
      // ถ้ามี ID แล้ว ก็แค่ Force Save
      saveDraftToStorage(targetId);
    }

    setDraftStatus("saved");
    alert(t("common.draft_saved") || "บันทึกแบบร่างเรียบร้อยแล้ว");
  };

  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    setLocationError(null);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            location: [position.coords.latitude, position.coords.longitude],
          }));
          setIsGettingLocation(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocationError(
            t("location.error.message") || "ไม่สามารถรับตำแหน่งปัจจุบันได้"
          );
          setIsGettingLocation(false);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
      );
    } else {
      setLocationError(t("location.not.supported") || "ไม่รองรับ GPS");
      setIsGettingLocation(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setSubmitting(true);

    try {
      console.log("Form submitted:", { ...formData, images: selectedImages });
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // ✅ ลบ Draft ออกจาก Array เมื่อส่งสำเร็จ
      if (draftId) {
        const allDraftsStr = localStorage.getItem(DRAFTS_KEY);
        if (allDraftsStr) {
          const allDrafts = JSON.parse(allDraftsStr) as DraftItem[];
          const newDrafts = allDrafts.filter((d) => d.id !== draftId);
          localStorage.setItem(DRAFTS_KEY, JSON.stringify(newDrafts));
        }
      }

      router.back();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
    }
  };

  // Helper functions (คงเดิม)
  const handleLocationSelect = (position: [number, number]) => {
    setFormData((prev) => ({ ...prev, location: position }));
    setShowMapPicker(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setSelectedImages([...selectedImages, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  // Auto-set type 'other' (คงเดิม)
  useEffect(() => {
    if (formData.category === "other_obstacles") {
      setFormData((prev) => ({ ...prev, type: "other" as ObstacleType }));
    }
  }, [formData.category]);

  const renderCategoryOption = (
    value: string,
    data: { icon: string; label: string }
  ) => {
    return language === "th"
      ? `${data.icon} ${data.label}`
      : `${data.icon} ${value
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16 text-gray-600">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="font-medium">{t("obstacle.report.title")}</h1>
                <div className="text-xs text-gray-400 flex items-center gap-1">
                  {draftStatus === "saving" && (
                    <span>{t("common.saving") || "กำลังบันทึก..."}</span>
                  )}
                  {draftStatus === "saved" && (
                    <span>{t("common.saved") || "บันทึกแล้ว"}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* ปุ่ม View Drafts */}
              <button
                onClick={() => router.push("/drafts")}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-full hidden sm:block"
                title={t("drafts.view") || "ดูแบบร่างทั้งหมด"}
              >
                <FileText size={20} />
              </button>

              {/* ปุ่ม Save Draft */}
              <button
                onClick={handleSaveDraft}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
                title={t("common.save_draft") || "บันทึกร่าง"}
              >
                <Save
                  size={20}
                  className={draftStatus === "saved" ? "text-green-500" : ""}
                />
              </button>

              {/* ปุ่ม Submit */}
              <button
                onClick={handleSubmit}
                disabled={submitting || !isFormValid}
                className={`px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 transition-all ${
                  submitting || !isFormValid
                    ? "opacity-50"
                    : "hover:bg-blue-700"
                }`}
              >
                {submitting ? (
                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span className="hidden sm:inline">
                  {t("obstacle.report.submit") || "ส่ง"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <form className="space-y-6">
          {/* ส่วนแผนที่ (คงเดิม) */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="font-medium flex items-center gap-2">
                <MapPin size={20} />
                {t("obstacle.location") || "ตำแหน่งอุปสรรค"}
              </h2>
            </div>
            <div className="p-4 space-y-4">
              {formData.location[0] !== 0 &&
                formData.location[1] !== 0 &&
                !showMapPicker && (
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative">
                    <SimpleLocationMap
                      position={formData.location}
                      onPositionChange={(newPosition) =>
                        setFormData((prev) => ({
                          ...prev,
                          location: newPosition,
                        }))
                      }
                    />
                    <div className="absolute bottom-2 right-2 bg-white px-3 py-1 rounded-lg shadow-md z-[400] text-xs font-mono">
                      {formData.location[0].toFixed(5)},{" "}
                      {formData.location[1].toFixed(5)}
                    </div>
                  </div>
                )}

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={getCurrentLocation}
                  className="w-full px-4 py-2 flex items-center justify-center gap-2 border rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  disabled={isGettingLocation}
                >
                  <Crosshair size={18} className="text-white" />
                  <span>
                    {isGettingLocation
                      ? t("location.getting") || "กำลังรับตำแหน่ง..."
                      : t("location.use.current") || "ใช้ตำแหน่งปัจจุบัน"}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowMapPicker(true)}
                  className="w-full px-4 py-2 flex items-center justify-center gap-2 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <MapPin size={18} />
                  <span>{t("location.select.on.map") || "เลือกบนแผนที่"}</span>
                </button>
              </div>

              {locationError && (
                <div className="text-red-500 text-sm p-2 bg-red-50 rounded-lg flex items-center gap-2">
                  <AlertCircle size={16} />
                  {locationError}
                </div>
              )}
            </div>
          </div>

          {/* ส่วนรูปภาพ (คงเดิม) */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="font-medium flex items-center gap-2">
                <Camera size={20} />
                {t("obstacle.photos.add")}
              </h2>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-3 gap-2 mb-4">
                {selectedImages.map((image, index) => (
                  <div key={index} className="relative aspect-square">
                    <img
                      src={image}
                      alt={`Selected ${index}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
              <label className="block">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all">
                  <Camera className="mx-auto w-8 h-8 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    {t("obstacle.photos.click.to.add")}
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* ส่วนรายละเอียด (คงเดิม) */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="font-medium">{t("obstacle.report.details")}</h2>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("obstacle.report.category")}
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      category: e.target.value as ObstacleCategory,
                      type:
                        e.target.value === "other_obstacles"
                          ? ("other" as ObstacleType)
                          : "",
                    });
                  }}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                >
                  <option value="">{t("ui.select.category")}</option>
                  {Object.entries(OBSTACLE_CATEGORIES).map(([value, data]) => (
                    <option key={value} value={value}>
                      {renderCategoryOption(value, data)}
                    </option>
                  ))}
                </select>
              </div>

              {formData.category && formData.category !== "other_obstacles" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("obstacle.report.type")}
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        type: e.target.value as ObstacleType,
                      })
                    }
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  >
                    <option value="">{t("ui.select.type")}</option>
                    {OBSTACLE_CATEGORIES[
                      formData.category as ObstacleCategory
                    ].types.map(({ value, label }) => (
                      <option key={value} value={value}>
                        {language === "th" ? label : value}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("common.description")}
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  rows={4}
                  placeholder={t("obstacle.description.placeholder")}
                  required
                />
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Map Picker Modal (คงเดิม) */}
      {showMapPicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-medium">{t("location.select.on.map")}</h3>
              <button
                onClick={() => setShowMapPicker(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={20} />
              </button>
            </div>
            <div className="h-96 w-full relative">
              <MapPicker
                initialPosition={formData.location}
                onSelectPosition={handleLocationSelect}
              />
            </div>
            <div className="p-4 bg-gray-50 flex justify-between rounded-b-lg">
              <button
                type="button"
                onClick={() => setShowMapPicker(false)}
                className="px-4 py-2 border rounded-lg"
              >
                {t("common.cancel")}
              </button>
              <button
                type="button"
                onClick={() => setShowMapPicker(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                {t("common.confirm")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Main Page Component wrapped in Suspense for useSearchParams
export default function ReportObstaclePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <ReportObstacleContent />
    </Suspense>
  );
}
