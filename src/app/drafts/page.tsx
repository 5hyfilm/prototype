// src/app/drafts/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  Trash2,
  Edit,
  FileText,
  MapPin,
  Clock,
} from "lucide-react";
import { useLanguage } from "../../../contexts/LanguageContext";
import { ObstacleCategory, OBSTACLE_CATEGORIES } from "@/lib/types/obstacle";

// Key เดียวกับที่จะใช้ในหน้า Report
const DRAFTS_KEY = "obstacle_report_drafts";

interface DraftItem {
  id: string;
  category: ObstacleCategory | "";
  description: string;
  location: [number, number];
  updatedAt: number;
  // ข้อมูลอื่นๆ...
}

export default function DraftsPage() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [drafts, setDrafts] = useState<DraftItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDrafts();
  }, []);

  const loadDrafts = () => {
    try {
      const savedDrafts = localStorage.getItem(DRAFTS_KEY);
      if (savedDrafts) {
        // เรียงลำดับจากใหม่ไปเก่า
        const parsed = JSON.parse(savedDrafts) as DraftItem[];
        setDrafts(parsed.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    } catch (e) {
      console.error("Failed to load drafts", e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(t("common.confirm.delete") || "ยืนยันการลบแบบร่างนี้?")) {
      const newDrafts = drafts.filter((d) => d.id !== id);
      setDrafts(newDrafts);
      localStorage.setItem(DRAFTS_KEY, JSON.stringify(newDrafts));
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/report-obstacle?id=${id}`);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString(
      language === "th" ? "th-TH" : "en-US",
      {
        dateStyle: "medium",
        timeStyle: "short",
      }
    );
  };

  const getCategoryLabel = (category: string) => {
    if (!category) return t("common.unknown") || "ไม่ระบุหมวดหมู่";
    const catData = OBSTACLE_CATEGORIES[category as ObstacleCategory];
    return catData ? catData.label : category;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h1 className="font-medium text-lg">
                {t("drafts.title") || "แบบร่างของฉัน"}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {loading ? (
          <div className="text-center py-10 text-gray-500">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            Loading...
          </div>
        ) : drafts.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>{t("drafts.empty") || "ไม่มีแบบร่างที่บันทึกไว้"}</p>
            <button
              onClick={() => router.push("/report-obstacle")}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t("obstacle.create.new") || "สร้างรายงานใหม่"}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {drafts.map((draft) => (
              <div
                key={draft.id}
                onClick={() => handleEdit(draft.id)}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 active:scale-[0.99] transition-all cursor-pointer hover:border-blue-300 relative group"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-medium">
                      {getCategoryLabel(draft.category)}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock size={12} />
                      {formatDate(draft.updatedAt)}
                    </span>
                  </div>
                  <button
                    onClick={(e) => handleDelete(draft.id, e)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">
                  {draft.description ||
                    t("common.no.description") ||
                    "ไม่มีรายละเอียด"}
                </h3>

                <div className="flex items-center text-sm text-gray-500 gap-4 mt-2">
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    <span>
                      {draft.location[0] !== 0
                        ? `${draft.location[0].toFixed(
                            4
                          )}, ${draft.location[1].toFixed(4)}`
                        : t("location.not.selected") || "ยังไม่ระบุพิกัด"}
                    </span>
                  </div>
                </div>

                <div className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
                  <span className="text-blue-600 text-sm font-medium flex items-center gap-1">
                    {t("common.edit") || "แก้ไข"} <Edit size={14} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
