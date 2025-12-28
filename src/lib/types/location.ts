// src/lib/types/location.ts

export interface LocationFeature {
  name: string;
  isLiked: boolean | null;
  votes: {
    like: number;
    dislike: number;
    notSure: number;
  };
  description: string;
  images: {
    url: string;
    caption?: string;
  }[];
}

export interface BookingOption {
  provider: "Agoda" | "Trip.com" | "Booking.com" | string;
  url: string;
}

export interface Location {
  id: number;
  name: string;
  image?: string;
  bookingLinks?: BookingOption[];
  position: [number, number];
  // [GOOSEWAY UPDATE] เพิ่มหมวดหมู่ให้ครบถ้วนตามแบบ Google Maps
  category:
    | "Shopping Mall"
    | "Public Transport"
    | "Park"
    | "Restaurant"
    | "Hotel"
    | "Cafe"
    | "Hospital"
    | "Restroom"
    | "Other";
  accessibility: "high" | "medium" | "low";
  features: string[];
  description: string;
  accessibilityScores: {
    parking: LocationFeature; // Disabled parking
    entrance: LocationFeature; // Main entrance accessibility
    ramp: LocationFeature; // Ramps and slopes
    pathway: LocationFeature; // Internal pathways
    elevator: LocationFeature; // Elevator access
    restroom: LocationFeature; // Accessible restrooms
    seating: LocationFeature; // Rest areas and seating
    staffAssistance: LocationFeature; // Staff support and assistance
    etc: LocationFeature;
  };
}

export const ACCESSIBILITY_FEATURES = [
  "parking",
  "entrance",
  "ramp",
  "pathway",
  "elevator",
  "restroom",
  "seating",
  "staffAssistance",
  "etc",
] as const;

export type AccessibilityFeature = (typeof ACCESSIBILITY_FEATURES)[number];

// เพิ่มเติม interface สำหรับสถานที่พร้อมระยะทาง (ใช้สำหรับการแสดงสถานที่ใกล้เคียง)
export interface LocationWithDistance extends Location {
  distance: number;
}

// --- ส่วนที่เพิ่มใหม่สำหรับระบบ Spotlight Advertising ---

export interface Promotion {
  title: string; // หัวข้อโปรโมชั่น เช่น "จอดรถฟรี 4 ชม."
  description: string; // รายละเอียด เช่น "เพียงแสดงแอป GOOSEWAY"
  promoCode?: string; // โค้ดส่วนลด (ถ้ามี)
  validUntil: string; // วันหมดอายุโปรโมชั่น
  bannerUrl?: string; // รูป Banner โฆษณา
}

// Interface สำหรับสถานที่ที่เป็น Sponsor (ขยายมาจาก Location เดิม)
export interface SponsoredLocation extends Location {
  isSponsored: boolean;
  promotion: Promotion;
  partnerTier: "Gold" | "Silver" | "Bronze"; // เผื่อไว้จัดอันดับการแสดงผลในอนาคต
}
