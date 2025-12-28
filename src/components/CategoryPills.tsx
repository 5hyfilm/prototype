"use client";

import React from "react";

// กำหนดหมวดหมู่ (Icon + Label + ID)
const CATEGORIES = [
  { id: "all", label: "ทั้งหมด", icon: "🔍" },
  { id: "restaurant", label: "ร้านอาหาร", icon: "🍽️" },
  { id: "cafe", label: "กาแฟ", icon: "☕" },
  { id: "hotel", label: "ที่พัก", icon: "🏨" },
  { id: "restroom", label: "ห้องน้ำ", icon: "🚻" }, // สำคัญมากสำหรับชาว GOOSEWAY
  { id: "parking", label: "ที่จอดรถ", icon: "🅿️" },
  { id: "mall", label: "ห้างสรรพสินค้า", icon: "🛍️" },
  { id: "park", label: "สวนสาธารณะ", icon: "🌳" },
];

interface CategoryPillsProps {
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
}

export default function CategoryPills({
  selectedCategory,
  onSelectCategory,
}: CategoryPillsProps) {
  return (
    <div className="w-full overflow-x-auto pb-2 scrollbar-hide pt-2 px-4">
      <div className="flex gap-3 whitespace-nowrap">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all shadow-sm border
              ${
                selectedCategory === cat.id
                  ? "bg-blue-600 text-white border-blue-600 shadow-md transform scale-105" // Active State
                  : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300" // Inactive State
              }
            `}
          >
            <span className="text-base">{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
