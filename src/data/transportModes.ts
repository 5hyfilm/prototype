// src/data/transportModes.ts
import { Accessibility, Zap, Bike, Footprints } from "lucide-react";

export const TRANSPORT_MODES = [
  {
    id: "manual_wheelchair",
    label: "Manual Wheelchair",
    icon: Accessibility,
    color: "#3b82f6", // สีฟ้า (Blue)
    borderColor: "border-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    id: "electric_wheelchair",
    label: "Electric Wheelchair",
    icon: Zap,
    color: "#22c55e", // สีเขียว (Green)
    borderColor: "border-green-500",
    bgColor: "bg-green-50",
  },
  {
    id: "bicycle",
    label: "Bicycle",
    icon: Bike,
    color: "#f97316", // สีส้ม (Orange)
    borderColor: "border-orange-500",
    bgColor: "bg-orange-50",
  },
  {
    id: "walk",
    label: "Walk",
    icon: Footprints,
    color: "#a855f7", // สีม่วง (Purple)
    borderColor: "border-purple-500",
    bgColor: "bg-purple-50",
  },
];
