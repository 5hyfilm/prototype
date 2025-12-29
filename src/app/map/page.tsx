// src/app/map/page.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { MapSearchBar } from "@/components/MapSearchBar";
import { useLanguage } from "../../../contexts/LanguageContext";
import { Info } from "lucide-react";
import { RecordingIndicator } from "@/components/RecordingIndicator";
import { RecordingControlModal } from "@/components/RecordingControlModal";
import { useRouter } from "next/navigation";
import { SponsoredSpotlight } from "@/components/SponsoredSpotlight";
import { sponsoredLocations } from "@/data/sponsored";

const Map = dynamic(() => import("@/components/Map").then((mod) => mod.Map), {
  ssr: false,
});

export default function MapPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchNotification, setShowSearchNotification] = useState(false);

  // --- [GOOSEWAY UPDATE] State สำหรับ Category Filter ---
  const [selectedCategory, setSelectedCategory] = useState("all");

  // ข้อมูลหมวดหมู่สำหรับแสดงผล (Icon + Label)
  const CATEGORIES = [
    { id: "all", label: t("common.all") || "ทั้งหมด", icon: "🌏" },
    { id: "Restaurant", label: "ร้านอาหาร", icon: "🍳" },
    { id: "Cafe", label: "คาเฟ่", icon: "☕" },
    { id: "Hotel", label: "ที่พัก", icon: "🛏️" },
    { id: "Shopping Mall", label: "ห้างฯ", icon: "🛍️" },
    { id: "Hospital", label: "โรงพยาบาล", icon: "🏥" },
    { id: "Restroom", label: "ห้องน้ำ", icon: "🚻" },
    { id: "Park", label: "สวนสาธารณะ", icon: "🌳" },
    { id: "Public Transport", label: "ขนส่ง", icon: "🚆" },
  ];

  // --- [เพิ่มใหม่] State สำหรับ Spotlight Advertising System ---
  const [showSpotlight, setShowSpotlight] = useState(false);
  const [hasShownSpotlight, setHasShownSpotlight] = useState(false);

  // Recording state
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showRecordingModal, setShowRecordingModal] = useState(false);
  const [modalMode, setModalMode] = useState<"stop" | "cancel">("stop");
  const [recordedPath, setRecordedPath] = useState<[number, number][]>([]);
  const [recordingInterval, setRecordingInterval] =
    useState<NodeJS.Timeout | null>(null);

  // --- [เพิ่มใหม่] Effect สำหรับเปิด Spotlight อัตโนมัติเมื่อเข้าหน้า Map ---
  useEffect(() => {
    // หน่วงเวลา 1.5 วินาที เพื่อให้ผู้ใช้เห็นแผนที่ก่อน แล้วค่อยเด้งโฆษณา
    const timer = setTimeout(() => {
      if (!hasShownSpotlight) {
        setShowSpotlight(true);
        setHasShownSpotlight(true); // ป้องกันไม่ให้เด้งซ้ำในการใช้งานครั้งนี้ (Optional)
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [hasShownSpotlight]);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (recordingInterval) {
        clearInterval(recordingInterval);
      }
    };
  }, [recordingInterval]);

  // Timer logic for recording
  useEffect(() => {
    if (isRecording && !isPaused) {
      const interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);

        // Simulate getting current location and adding to path
        if (typeof window !== "undefined" && navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setRecordedPath((prev) => [...prev, [latitude, longitude]]);
            },
            (error) => console.error("Error getting location:", error)
          );
        }
      }, 1000);

      setRecordingInterval(interval);
      return () => clearInterval(interval);
    } else if (recordingInterval) {
      clearInterval(recordingInterval);
      setRecordingInterval(null);
    }
  }, [isRecording, isPaused]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setShowSearchNotification(true);
      setTimeout(() => {
        setShowSearchNotification(false);
      }, 3000);
    }
  };

  // --- [GOOSEWAY UPDATE] Handle Category Click ---
  const handleCategorySelect = (id: string) => {
    if (selectedCategory === id && id !== "all") {
      setSelectedCategory("all"); // กดซ้ำเพื่อยกเลิก
    } else {
      setSelectedCategory(id);
    }
  };

  // Record route controls
  const startRecording = useCallback(() => {
    setIsRecording(true);
    setIsPaused(false);
    setRecordingTime(0);
    setRecordedPath([]);
  }, []);

  const pauseRecording = useCallback(() => {
    // ไม่แสดง Modal สำหรับ Pause - ทำงานทันที
    setIsPaused(true);
  }, []);

  const resumeRecording = useCallback(() => {
    setIsPaused(false);
  }, []);

  // แสดง Modal ยืนยันการหยุดบันทึก
  const confirmStopRecording = useCallback(() => {
    setModalMode("stop");
    setShowRecordingModal(true);
  }, []);

  // ฟังก์ชันสำหรับบันทึกเส้นทางและไปยังหน้าบันทึกข้อมูล
  const stopRecording = useCallback(() => {
    // บันทึกข้อมูลเส้นทางลง localStorage เพื่อส่งต่อไปหน้าถัดไป
    if (recordedPath.length > 0) {
      // คำนวณระยะทางอย่างง่าย
      let distance = 0;
      if (typeof window !== "undefined") {
        for (let i = 1; i < recordedPath.length; i++) {
          // ใช้ Haversine formula สำหรับคำนวณระยะทางบนพื้นผิวโลก
          const lat1 = (recordedPath[i - 1][0] * Math.PI) / 180;
          const lat2 = (recordedPath[i][0] * Math.PI) / 180;
          const lon1 = (recordedPath[i - 1][1] * Math.PI) / 180;
          const lon2 = (recordedPath[i][1] * Math.PI) / 180;

          const R = 6371e3; // รัศมีของโลกในหน่วยเมตร
          const dLat = lat2 - lat1;
          const dLon = lon2 - lon1;

          const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1) *
              Math.cos(lat2) *
              Math.sin(dLon / 2) *
              Math.sin(dLon / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          const d = R * c;

          distance += d;
        }
      }

      const routeData = {
        path: recordedPath,
        startTime: Date.now() - recordingTime * 1000, // คำนวณเวลาเริ่มต้นย้อนกลับ
        endTime: Date.now(),
        distance: distance,
      };

      if (typeof window !== "undefined") {
        localStorage.setItem("recordedRouteData", JSON.stringify(routeData));
      }

      setIsRecording(false);
      setIsPaused(false);
      setShowRecordingModal(false);

      // ไปยังหน้าบันทึกข้อมูลเส้นทาง
      router.push("/save-route");
    } else {
      // ถ้าไม่มีข้อมูลเส้นทาง
      if (typeof window !== "undefined") {
        alert(t("route.recording.no.data") || "ไม่มีข้อมูลเส้นทางที่บันทึก");
      }
      setIsRecording(false);
      setIsPaused(false);
      setShowRecordingModal(false);
    }
  }, [recordedPath, recordingTime, router, t]);

  // ฟังก์ชันสำหรับยกเลิกการบันทึกเส้นทาง (ไม่บันทึกข้อมูล)
  const discardRecording = useCallback(() => {
    // ล้างข้อมูลและหยุดการบันทึก แต่ไม่ไปหน้าบันทึกข้อมูล
    setIsRecording(false);
    setIsPaused(false);
    setRecordingTime(0);
    setRecordedPath([]);
    setShowRecordingModal(false);

    // อาจจะเพิ่มการแจ้งเตือนที่นี่ถ้าต้องการ
    console.log("Recording discarded");
  }, []);

  // การจัดการกับการปิดไม่ว่าจะเป็นจากปุ่ม X หรือบริเวณอื่น
  const handleCloseRecording = useCallback(() => {
    // กรณีปิดการบันทึก ให้แสดง Modal ยืนยัน
    setModalMode("cancel");
    setShowRecordingModal(true);
  }, []);

  // กรณีกดยกเลิก Modal ยืนยันการหยุดบันทึก
  const handleCancelStopModal = useCallback(() => {
    setShowRecordingModal(false);
  }, []);

  // This function is called from the ActionMenu component
  useEffect(() => {
    // Listen for custom event from ActionMenu for recording
    if (typeof window !== "undefined") {
      const handleStartRecording = () => {
        startRecording();
      };

      window.addEventListener("start-route-recording", handleStartRecording);

      return () => {
        window.removeEventListener(
          "start-route-recording",
          handleStartRecording
        );
      };
    }
  }, [startRecording]);

  return (
    <div className="h-[calc(100vh-64px)] relative">
      {/* --- [GOOSEWAY UPDATE] Search Bar & Categories Wrapper --- */}
      <div className="absolute top-4 left-4 right-4 z-[1000] flex flex-col gap-3 pointer-events-none">
        {/* 1. Search Bar */}
        <div className="pointer-events-auto shadow-sm">
          <MapSearchBar onSearch={handleSearch} />
        </div>

        {/* 2. Category Pills (Horizontal Scroll) */}
        <div
          className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide pointer-events-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              className={`
                 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all shadow-md border
                 ${
                   selectedCategory === cat.id
                     ? "bg-blue-600 text-white border-blue-600 scale-105" // Active State
                     : "bg-white text-gray-700 border-gray-100 hover:bg-gray-50" // Inactive State
                 }
               `}
            >
              <span className="text-lg">{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Notification (ปรับตำแหน่งลงมาเป็น top-36 เพื่อหลบปุ่มหมวดหมู่) */}
      {showSearchNotification && (
        <div className="absolute top-36 left-4 right-4 bg-blue-50 border border-blue-200 rounded-lg p-3 z-[1000] flex items-center shadow-md animate-fade-in">
          <Info className="text-blue-500 mr-2 flex-shrink-0" size={20} />
          <p className="text-sm text-blue-700">
            {t("map.showing.accessible.locations.nearby")}
          </p>
        </div>
      )}

      {/* Recording Indicator แบบปรับปรุงแล้ว */}
      <RecordingIndicator
        isRecording={isRecording}
        isPaused={isPaused}
        recordingTime={recordingTime}
        onPause={pauseRecording}
        onResume={resumeRecording}
        onStop={confirmStopRecording}
        onClose={handleCloseRecording}
      />

      {/* Recording Control Modal แก้ไขให้มี onDiscard */}
      <RecordingControlModal
        isOpen={showRecordingModal}
        onStop={stopRecording}
        onCancel={handleCancelStopModal}
        onDiscard={discardRecording} // เพิ่ม prop onDiscard
        mode={modalMode}
      />

      {/* --- [เพิ่มใหม่] Sponsored Spotlight Panel --- */}
      <SponsoredSpotlight
        isOpen={showSpotlight}
        onClose={() => setShowSpotlight(false)}
        locations={sponsoredLocations}
      />
      {/* ------------------------------------------- */}

      {/* Map Component */}
      <div className="w-full h-full">
        <Map
          searchQuery={searchQuery}
          // @ts-expect-error: กรุณาอัปเดต Map.tsx ให้รับ prop 'category' เพิ่มเติม
          category={selectedCategory}
          recordedPath={isRecording ? recordedPath : []}
          isRecording={isRecording}
        />
      </div>
    </div>
  );
}
