// src/data/sponsored.ts

import { SponsoredLocation } from "@/lib/types/location";
import { accessibleLocations } from "./locations";

// ดึงข้อมูลสถานที่จริงจาก locations.ts มาทำเป็น Sponsored Location
export const sponsoredLocations: SponsoredLocation[] = [
  {
    ...accessibleLocations.find((l) => l.name === "CentralWorld")!,
    isSponsored: true,
    partnerTier: "Gold",
    promotion: {
      title: "Free Parking 4 Hours",
      description:
        "สิทธิพิเศษสำหรับผู้ใช้วีลแชร์ เพียงแสดงแอป GOOSEWAY ที่จุดประชาสัมพันธ์",
      validUntil: "2025-12-31",
      bannerUrl: "/image/promotion/central-promo.jpg",
    },
  },
  {
    ...accessibleLocations.find((l) => l.name === "IconSiam")!,
    isSponsored: true,
    partnerTier: "Silver",
    promotion: {
      title: "ส่วนลด 10% โซน SookSiam",
      description: "รับส่วนลดค่าอาหาร 10% เมื่อมียอดใช้จ่ายครบ 500 บาท",
      promoCode: "SOOK10",
      validUntil: "2025-06-30",
    },
  },
  {
    ...accessibleLocations.find((l) => l.name === "Siam Paragon")!,
    isSponsored: true,
    partnerTier: "Silver",
    promotion: {
      title: "บริการผู้ช่วยช้อปปิ้งฟรี",
      description:
        "บริการ Personal Shopper สำหรับผู้ใช้วีลแชร์ จองล่วงหน้า 1 ชม.",
      validUntil: "2025-12-31",
    },
  },
];
