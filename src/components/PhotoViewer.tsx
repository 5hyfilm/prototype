// Path: src/components/PhotoViewer.tsx
"use client";

import { useState, useEffect } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Grid as GridIcon,
  Camera,
} from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

interface PhotoViewerProps {
  images: { url: string; caption?: string; timestamp?: string }[];
  onClose: () => void;
  title?: string;
  onAddPhoto?: () => void; // ✨ เพิ่ม Prop สำหรับฟังก์ชันเพิ่มรูป
}

export function PhotoViewer({
  images,
  onClose,
  title,
  onAddPhoto,
}: PhotoViewerProps) {
  const { t } = useLanguage();
  const [viewMode, setViewMode] = useState<"grid" | "single">("grid");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleSelectImage = (index: number) => {
    setCurrentIndex(index);
    setViewMode("single");
  };

  // ----- 📱 RENDER: GRID VIEW (หน้ารวมรูป) -----
  if (viewMode === "grid") {
    return (
      <div className="fixed inset-0 z-50 flex flex-col bg-white animate-in fade-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white sticky top-0 z-10 shadow-sm">
          <div className="flex flex-col">
            <h3 className="font-semibold text-lg text-gray-900 leading-tight">
              {title || t("common.photos") || "รูปภาพ"}
            </h3>
            <span className="text-xs text-gray-500">
              {images.length} {t("common.items") || "รูปภาพ"}
            </span>
          </div>

          <div className="flex items-center gap-1">
            {/* 📸 ปุ่ม Add Photo (Grid View) */}
            <button
              onClick={onAddPhoto}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors flex items-center gap-2"
              title="เพิ่มรูปภาพ"
            >
              <Camera size={20} />
              {/* <span className="text-sm font-medium hidden sm:inline">เพิ่มรูป</span> */}
            </button>

            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Grid Content */}
        <div className="flex-1 overflow-y-auto p-1 bg-white">
          <div className="grid grid-cols-3 gap-1 auto-rows-[1fr]">
            {images.map((img, index) => (
              <div
                key={index}
                onClick={() => handleSelectImage(index)}
                className="relative aspect-square cursor-pointer overflow-hidden bg-gray-100 active:opacity-80 transition-opacity"
              >
                <img
                  src={img.url}
                  alt={img.caption || `Photo ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors" />
              </div>
            ))}
          </div>
          {images.length === 0 && (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <GridIcon size={48} className="mb-2 opacity-20" />
              <p>ไม่มีรูปภาพ</p>
              {/* ปุ่มเพิ่มรูปกรณีไม่มีรูปเลย */}
              <button
                onClick={onAddPhoto}
                className="mt-4 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors flex items-center gap-2"
              >
                <Camera size={16} />
                เพิ่มรูปภาพแรก
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ----- 🖼️ RENDER: SINGLE VIEW (ดูรูปเดี่ยว) -----
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black animate-in fade-in duration-200">
      {/* 👆 TOP BAR: Header Controls */}
      <div className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-black/80 via-black/40 to-transparent px-4 py-4 flex items-center justify-between">
        {/* Left: Back to Grid */}
        <button
          onClick={() => setViewMode("grid")}
          className="p-2 -ml-2 text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-all flex items-center gap-1"
        >
          <ChevronLeft size={28} />
          <span className="sr-only">Back</span>
        </button>

        {/* Center: Title & Counter */}
        <div className="flex flex-col items-center pointer-events-none">
          <span className="text-white font-semibold text-sm drop-shadow-md">
            {title || "รูปภาพ"}
          </span>
          <span className="text-white/80 text-[10px] tracking-wide font-medium drop-shadow-md">
            {currentIndex + 1} / {images.length}
          </span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1 -mr-2">
          {/* 📸 ปุ่ม Add Photo (Single View) */}
          <button
            onClick={onAddPhoto}
            className="p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-all"
            title="เพิ่มรูปภาพ"
          >
            <Camera size={24} />
          </button>

          <button
            onClick={onClose}
            className="p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-all"
          >
            <X size={28} />
          </button>
        </div>
      </div>

      {/* Main Image */}
      <div className="relative w-full h-full flex items-center justify-center pb-20 pt-16">
        {images[currentIndex] && (
          <img
            src={images[currentIndex].url}
            alt={images[currentIndex].caption}
            className="max-w-full max-h-full object-contain p-2 drop-shadow-2xl"
          />
        )}
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white hover:bg-black/20 rounded-full transition-all z-20"
          >
            <ChevronLeft size={36} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white hover:bg-black/20 rounded-full transition-all z-20"
          >
            <ChevronRight size={36} />
          </button>
        </>
      )}

      {/* 👇 BOTTOM BAR: Caption */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-white z-30 pt-10 pb-6">
        <div className="max-w-screen-md mx-auto px-6 flex flex-col items-center text-center">
          {images[currentIndex]?.caption ? (
            <p className="text-sm md:text-base font-medium leading-relaxed text-white/95">
              {images[currentIndex].caption}
            </p>
          ) : (
            <p className="text-sm italic text-white/40">ไม่มีคำอธิบาย</p>
          )}
          {images[currentIndex]?.timestamp && (
            <p className="text-[10px] md:text-xs text-white/60 mt-2 font-light">
              {new Date(images[currentIndex].timestamp!).toLocaleDateString(
                "th-TH",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
