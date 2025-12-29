// src/components/MarketplaceItemCard.tsx
"use client";

import { Star } from "lucide-react";
import Image from "next/image";

export interface MarketplaceItem {
  id: string;
  title: string;
  category: "lifestyle" | "travel" | "health";
  points: number;
  originalPrice?: number;
  image: string;
  merchantName: string;
  rating: number;
}

interface MarketplaceItemCardProps {
  item: MarketplaceItem;
  onRedeem: (item: MarketplaceItem) => void;
}

export function MarketplaceItemCard({
  item,
  onRedeem,
}: MarketplaceItemCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
      <div className="relative h-32 w-full">
        <div className="absolute inset-0 bg-gray-100 animate-pulse" />
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
          // ใน code จริงต้อง handle error กรณีรูปโหลดไม่ได้
        />
        <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded-full text-[10px] font-bold text-orange-500 flex items-center gap-1 shadow-sm">
          <Star size={10} fill="currentColor" />
          {item.rating}
        </div>
      </div>

      <div className="p-3 flex flex-col flex-1">
        <div className="text-[10px] uppercase tracking-wide text-gray-400 mb-1 font-medium">
          {item.merchantName}
        </div>
        <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 mb-2 leading-tight">
          {item.title}
        </h3>

        <div className="mt-auto flex justify-between items-end border-t border-gray-50 pt-2">
          <div className="text-xs text-gray-400">
            {item.originalPrice && (
              <span className="line-through decoration-gray-300">
                ฿{item.originalPrice}
              </span>
            )}
          </div>
          <button
            onClick={() => onRedeem(item)}
            className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-[10px] px-3 py-1.5 rounded-full font-medium transition-all shadow-sm"
          >
            ใช้ {item.points} แต้ม
          </button>
        </div>
      </div>
    </div>
  );
}
