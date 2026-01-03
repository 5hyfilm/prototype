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
// --- [เพิ่มใหม่] Imports ---
import { PreRecordingModal } from "@/components/PreRecordingModal";
import { TRANSPORT_MODES } from "@/data/transportModes";

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

  const CATEGORIES = [
    { id: "Restaurant", label: "ร้านอาหาร", icon: "🍳" },
    { id: "Cafe", label: "คาเฟ่", icon: "☕" },
    { id: "Hotel", label: "ที่พัก", icon: "🛏️" },
    { id: "Shopping Mall", label: "ห้างฯ", icon: "🛍️" },
    { id: "Hospital", label: "โรงพยาบาล", icon: "🏥" },
    { id: "Restroom", label: "ห้องน้ำ", icon: "🚻" },
    { id: "Park", label: "สวนสาธารณะ", icon: "🌳" },
    { id: "Public Transport", label: "ขนส่ง", icon: "🚆" },
  ];

  // --- [Spotlight Advertising System] ---
  const [showSpotlight, setShowSpotlight] = useState(false);
  const [hasShownSpotlight, setHasShownSpotlight] = useState(false);

  // --- [Recording State] ---
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showRecordingModal, setShowRecordingModal] = useState(false);
  const [modalMode, setModalMode] = useState<"stop" | "cancel">("stop");
  const [recordedPath, setRecordedPath] = useState<[number, number][]>([]);
  const [recordingInterval, setRecordingInterval] =
    useState<NodeJS.Timeout | null>(null);

  // --- [เพิ่มใหม่] State สำหรับ Pre-recording Setup ---
  const [showPreRecordingModal, setShowPreRecordingModal] = useState(false);
  const [selectedTransportMode, setSelectedTransportMode] =
    useState("manual_wheelchair"); // Default

  // Effect เปิด Spotlight
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasShownSpotlight) {
        setShowSpotlight(true);
        setHasShownSpotlight(true);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [hasShownSpotlight]);

  // Cleanup interval
  useEffect(() => {
    return () => {
      if (recordingInterval) clearInterval(recordingInterval);
    };
  }, [recordingInterval]);

  // Timer logic
  useEffect(() => {
    if (isRecording && !isPaused) {
      const interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
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
      setTimeout(() => setShowSearchNotification(false), 3000);
    }
  };

  const handleCategorySelect = (id: string) => {
    if (selectedCategory === id && id !== "all") {
      setSelectedCategory("all");
    } else {
      setSelectedCategory(id);
    }
  };

  // --- [GOOSEWAY UPDATE] Logic ใหม่สำหรับการเริ่มบันทึก ---

  // 1. ฟังก์ชันเปิด Modal เตรียมพร้อม (ยังไม่เริ่มอัด)
  const openRecordingSetup = useCallback(() => {
    setShowPreRecordingModal(true);
  }, []);

  // 2. ฟังก์ชันเริ่มบันทึกจริง (กด Start จาก Modal)
  const startActualRecording = useCallback(() => {
    setShowPreRecordingModal(false); // ปิด Modal
    setIsRecording(true); // เริ่มบันทึก
    setIsPaused(false);
    setRecordingTime(0);
    setRecordedPath([]);
  }, []);

  const pauseRecording = useCallback(() => {
    setIsPaused(true);
  }, []);

  const resumeRecording = useCallback(() => {
    setIsPaused(false);
  }, []);

  const confirmStopRecording = useCallback(() => {
    setModalMode("stop");
    setShowRecordingModal(true);
  }, []);

  // ฟังก์ชันหยุดบันทึกและเซฟ
  const stopRecording = useCallback(() => {
    if (recordedPath.length > 0) {
      let distance = 0;
      // ... (คำนวณ distance เหมือนเดิม) ...
      if (typeof window !== "undefined") {
        for (let i = 1; i < recordedPath.length; i++) {
          const lat1 = (recordedPath[i - 1][0] * Math.PI) / 180;
          const lat2 = (recordedPath[i][0] * Math.PI) / 180;
          const lon1 = (recordedPath[i - 1][1] * Math.PI) / 180;
          const lon2 = (recordedPath[i][1] * Math.PI) / 180;
          const R = 6371e3;
          const dLat = lat2 - lat1;
          const dLon = lon2 - lon1;
          const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1) *
              Math.cos(lat2) *
              Math.sin(dLon / 2) *
              Math.sin(dLon / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          distance += R * c;
        }
      }

      const routeData = {
        path: recordedPath,
        startTime: Date.now() - recordingTime * 1000,
        endTime: Date.now(),
        distance: distance,
        transportMode: selectedTransportMode, // **เพิ่ม: บันทึกประเภทพาหนะไปด้วย**
      };

      if (typeof window !== "undefined") {
        localStorage.setItem("recordedRouteData", JSON.stringify(routeData));
      }

      setIsRecording(false);
      setIsPaused(false);
      setShowRecordingModal(false);
      router.push("/save-route");
    } else {
      if (typeof window !== "undefined") {
        alert(t("route.recording.no.data") || "ไม่มีข้อมูลเส้นทางที่บันทึก");
      }
      setIsRecording(false);
      setIsPaused(false);
      setShowRecordingModal(false);
    }
  }, [recordedPath, recordingTime, router, t, selectedTransportMode]);

  const discardRecording = useCallback(() => {
    setIsRecording(false);
    setIsPaused(false);
    setRecordingTime(0);
    setRecordedPath([]);
    setShowRecordingModal(false);
    console.log("Recording discarded");
  }, []);

  const handleCloseRecording = useCallback(() => {
    setModalMode("cancel");
    setShowRecordingModal(true);
  }, []);

  const handleCancelStopModal = useCallback(() => {
    setShowRecordingModal(false);
  }, []);

  // Listen for ActionMenu event
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleStartEvent = () => {
        openRecordingSetup(); // เปลี่ยนจาก startRecording เป็น openRecordingSetup
      };

      window.addEventListener("start-route-recording", handleStartEvent);
      return () => {
        window.removeEventListener("start-route-recording", handleStartEvent);
      };
    }
  }, [openRecordingSetup]);

  return (
    <div className="h-[calc(100vh-64px)] relative">
      {/* ... (Search Bar & Categories code remains same) ... */}
      <div className="absolute top-4 left-4 right-4 z-[1000] flex flex-col gap-3 pointer-events-none">
        <div className="pointer-events-auto shadow-sm">
          <MapSearchBar onSearch={handleSearch} />
        </div>
        <div
          className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide pointer-events-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all shadow-md border ${
                selectedCategory === cat.id
                  ? "bg-blue-600 text-white border-blue-600 scale-105"
                  : "bg-white text-gray-700 border-gray-100 hover:bg-gray-50"
              }`}
            >
              <span className="text-lg">{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {showSearchNotification && (
        <div className="absolute top-36 left-4 right-4 bg-blue-50 border border-blue-200 rounded-lg p-3 z-[1000] flex items-center shadow-md animate-fade-in">
          <Info className="text-blue-500 mr-2 flex-shrink-0" size={20} />
          <p className="text-sm text-blue-700">
            {t("map.showing.accessible.locations.nearby")}
          </p>
        </div>
      )}

      {/* --- [เพิ่มใหม่] Modal เลือกประเภท --- */}
      <PreRecordingModal
        isOpen={showPreRecordingModal}
        onClose={() => setShowPreRecordingModal(false)}
        onStart={startActualRecording}
        selectedMode={selectedTransportMode}
        onModeSelect={setSelectedTransportMode}
      />

      {/* --- Recording UI --- */}
      <RecordingIndicator
        isRecording={isRecording}
        isPaused={isPaused}
        recordingTime={recordingTime}
        onPause={pauseRecording}
        onResume={resumeRecording}
        onStop={confirmStopRecording}
        onClose={handleCloseRecording}
      />

      <RecordingControlModal
        isOpen={showRecordingModal}
        onStop={stopRecording}
        onCancel={handleCancelStopModal}
        onDiscard={discardRecording}
        mode={modalMode}
      />

      <SponsoredSpotlight
        isOpen={showSpotlight}
        onClose={() => setShowSpotlight(false)}
        locations={sponsoredLocations}
      />

      <div className="w-full h-full">
        <Map
          searchQuery={searchQuery}
          category={selectedCategory}
          recordedPath={isRecording ? recordedPath : []}
          isRecording={isRecording}
          // --- [สำคัญ] ส่ง transportMode ไปที่ Map เพื่อเปลี่ยนสีเส้น ---
          transportMode={selectedTransportMode}
        />
      </div>
    </div>
  );
}
