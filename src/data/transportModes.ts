// src/data/transportModes.ts
import { Accessibility, Zap, Bike, Footprints } from "lucide-react";

export const TRANSPORT_MODES = [
  {
    id: "manual_wheelchair",
    label: "Manual Wheelchair",
    icon: Accessibility,
    color: "#15803d", // ✅ แก้ไขเป็นสีเขียวเข้ม (Green)
    borderColor: "border-green-600",
    bgColor: "bg-green-50",
  },
  {
    id: "electric_wheelchair",
    label: "Electric Wheelchair",
    icon: Zap,
    color: "#3e3bf6ff", // ✅ แก้ไขเป็นสีน้ำเงิน (Blue)
    borderColor: "border-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    id: "bicycle",
    label: "Bicycle",
    icon: Bike,
    color: "#ec4899", // ✅ แก้ไขเป็นสีชมพู (Pink)
    borderColor: "border-pink-500",
    bgColor: "bg-pink-50",
  },
  {
    id: "walk",
    label: "Walk",
    icon: Footprints,
    color: "#f59e0b", // ✅ แก้ไขเป็นสีส้ม/เหลือง (Amber/Orange)
    borderColor: "border-amber-500",
    bgColor: "bg-amber-50",
  },
];
