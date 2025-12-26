// src/components/SponsoredSpotlight.tsx
"use client";

import { useState } from "react";
import { SlideUpPanel } from "./SlideUpPanel";
import { SponsoredLocation } from "@/lib/types/location";
import { MapPin, Star, Ticket, ChevronRight, ChevronUp, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface SponsoredSpotlightProps {
  isOpen: boolean; // ตัวแปรควบคุมการเปิดใช้งานฟีเจอร์นี้
  onClose: () => void; // ฟังก์ชันปิดถาวร (ถ้าต้องการ)
  locations: SponsoredLocation[];
}

export function SponsoredSpotlight({
  isOpen,
  onClose,
  locations,
}: SponsoredSpotlightProps) {
  const router = useRouter();
  // เริ่มต้นเป็น true = เปิดขึ้นมาโชว์ก่อนเลย
  const [isExpanded, setIsExpanded] = useState(true);

  if (!locations.length || !isOpen) return null;

  return (
    <>
      {/* 1. ส่วน Panel ใหญ่ (แสดงเมื่อ isExpanded = true) */}
      <SlideUpPanel
        isOpen={isExpanded}
        onClose={() => setIsExpanded(false)} // เมื่อกดปิด หรือปัดลง ให้แค่ "ย่อลง" (setExpanded = false)
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                Spotlight Deals
              </h2>
              <p className="text-sm text-gray-500">สิทธิพิเศษแนะนำใกล้คุณ 🌟</p>
            </div>
            {/* ปุ่มปิดของ SlideUpPanel จะทำงานเป็นปุ่มย่อ */}
          </div>

          <div className="space-y-4 pb-20">
            {locations.map((location) => (
              <div
                key={location.id}
                className="bg-white border border-blue-100 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer relative"
                onClick={() => router.push(`/location/${location.id}`)}
              >
                <div className="absolute top-0 right-0 bg-gradient-to-l from-blue-600 to-blue-500 text-white text-[10px] px-2 py-0.5 rounded-bl-lg font-medium shadow-sm z-10">
                  Sponsored
                </div>

                <div className="p-4 pt-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-900 text-base">
                        {location.name}
                      </h3>
                      <div className="flex items-center text-gray-500 text-xs mt-0.5">
                        <MapPin className="w-3 h-3 mr-1" />
                        <span>0.8 km away</span>
                        <span className="mx-1">•</span>
                        <span className="text-blue-600">
                          {location.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 bg-blue-50 rounded-lg p-3 border border-blue-100 flex gap-3 items-center">
                    <div className="bg-white p-1.5 rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0 shadow-sm text-blue-600">
                      <Ticket className="w-5 h-5" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="font-bold text-blue-900 text-sm truncate">
                        {location.promotion.title}
                      </p>
                      <p className="text-xs text-blue-600 mt-0.5 line-clamp-1">
                        {location.promotion.description}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SlideUpPanel>

      {/* 2. ส่วน Mini Bar (แสดงเมื่อ isExpanded = false) */}
      {/* ตำแหน่ง absolute bottom-4 จะลอยอยู่เหนือ Nav Bar พอดี */}
      {!isExpanded && (
        <div className="absolute bottom-4 left-4 right-4 z-[1000] animate-in slide-in-from-bottom-4 duration-300 fade-in">
          <div
            className="bg-white rounded-xl shadow-xl p-3 flex items-center justify-between cursor-pointer border border-blue-100 hover:bg-gray-50 transition-colors"
            onClick={() => setIsExpanded(true)} // กดที่แถบเพื่อขยายกลับ
          >
            <div className="flex items-center gap-3 overflow-hidden">
              {/* ไอคอนเด่นๆ */}
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 p-2 rounded-lg text-white shadow-sm flex-shrink-0">
                <Star className="w-5 h-5 fill-white" />
              </div>
              {/* ข้อความย่อ */}
              <div className="min-w-0">
                <p className="font-bold text-gray-900 text-sm truncate">
                  Spotlight Deals
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {locations.length} สิทธิพิเศษรอคุณอยู่
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 pl-2 border-l border-gray-100 ml-2">
              <button
                className="p-1.5 bg-blue-50 rounded-full text-blue-600 hover:bg-blue-100 transition-colors"
                aria-label="Expand"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              {/* ปุ่มกากบาทเล็กๆ เผื่ออยากปิดถาวร */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // หยุดไม่ให้ event คลิกทะลุไปขยาย
                  onClose(); // สั่งปิดถาวร (เรียกจาก parent)
                }}
                className="p-1.5 hover:bg-red-50 hover:text-red-500 rounded-full text-gray-400 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
