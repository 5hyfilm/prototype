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

export interface Location {
  id: number;
  name: string;
  image?: string;
  position: [number, number];
  category: "Shopping Mall" | "Public Transport" | "Park" | "Restaurant";
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
