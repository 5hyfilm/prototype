// src/components/PlaceImageGallery.tsx
"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";

interface PlaceImageGalleryProps {
  images?: string[];
}

export function PlaceImageGallery({ images = [] }: PlaceImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // ✅ เช็ค: ถ้าไม่มีรูป ให้แสดงกรอบสีเทา (Placeholder) ทันที
  // เพิ่ม min-h-[300px] และ bg-gray-200 ให้เห็นชัดๆ
  if (!images || images.length === 0) {
    return (
      <div className="w-full min-h-[300px] bg-gray-200 rounded-xl border-2 border-dashed border-gray-400 flex flex-col items-center justify-center text-gray-500">
        <ImageIcon size={64} className="mb-3 opacity-40" />
        <p className="text-lg font-semibold">พื้นที่สำหรับรูปภาพ</p>
        <p className="text-sm text-gray-400">ยังไม่มีรูปภาพในขณะนี้</p>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="space-y-3">
      {/* ส่วนแสดงภาพหลัก */}
      <div className="relative w-full min-h-[300px] md:h-[400px] bg-black rounded-xl overflow-hidden group">
        <img
          src={images[currentIndex]}
          alt={`View ${currentIndex + 1}`}
          className="w-full h-full object-contain md:object-cover"
        />

        {/* ปุ่มลูกศร (แสดงเมื่อมีมากกว่า 1 รูป) */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all z-10"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all z-10"
            >
              <ChevronRight size={24} />
            </button>
            <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
              {currentIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails (ภาพเล็กด้านล่าง) */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto py-2">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 ${
                index === currentIndex
                  ? "border-blue-500 opacity-100"
                  : "border-transparent opacity-60"
              }`}
            >
              <img
                src={img}
                alt={`Thumb ${index}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
