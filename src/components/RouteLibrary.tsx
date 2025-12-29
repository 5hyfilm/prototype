// src/components/RouteLibrary.tsx
import { Map, Plus, Route as RouteIcon } from "lucide-react";
import { sampleRoutes } from "@/data/routes";
import { useRouter } from "next/navigation";
import RouteCard from "./RouteCard";
import { useLanguage } from "../../contexts/LanguageContext";

export function RouteLibrary() {
  const { t } = useLanguage();
  const router = useRouter();

  // ✅ ใช้ลิสต์เดียว เรียงจากล่าสุด
  const myRoutes = sampleRoutes.slice(0, 6);

  if (myRoutes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 bg-blue-50 text-blue-400 rounded-full flex items-center justify-center mb-3">
          <RouteIcon size={32} />
        </div>
        <h3 className="font-bold text-gray-800 mb-1">
          ยังไม่มีเส้นทางที่บันทึก
        </h3>
        <p className="text-gray-500 text-sm mb-5 max-w-[200px]">
          เริ่มบันทึกการเดินทางของคุณเพื่อช่วยให้ชุมชนของเราเติบโต
        </p>
        <button
          onClick={() => router.push("/map")}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-md hover:bg-blue-700 active:scale-95 transition-all flex items-center gap-2"
        >
          <Plus size={18} />
          บันทึกเส้นทางใหม่
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Grid Layout 2 Columns (เพื่อให้เท่ากับ Post) */}
      <div className="grid grid-cols-2 gap-3">
        {myRoutes.map((route) => (
          <RouteCard key={route.id} route={route} compact />
        ))}
      </div>

      {/* ถ้ามีเยอะ ให้มีปุ่ม Load More */}
      <div className="pt-4 pb-8 text-center">
        <p className="text-xs text-gray-400">
          แสดงทั้งหมด {myRoutes.length} รายการ
        </p>
      </div>
    </div>
  );
}
