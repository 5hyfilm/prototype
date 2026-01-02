// src/data/reviews.ts

export interface Review {
  id: number;
  locationId: number;
  userId: number;
  username: string;
  date: string;
  rating: number;
  comment: string;
  likes: number;
  profileImage?: string;
  source?: "Gooseway" | "Google"; // ✅ เพิ่ม Field นี้เพื่อระบุที่มา
}

// รีวิวตัวอย่างสำหรับสถานที่ต่างๆ
export const sampleReviews: Review[] = [
  // --- รีวิวจากระบบ Gooseway (เดิม) ---
  {
    id: 1,
    locationId: 1,
    userId: 1,
    username: "สมชาย ใจดี",
    date: "2023-12-15",
    rating: 4.5,
    comment:
      "ที่นี่สะดวกมาก มีทางลาดสำหรับรถเข็นเกือบทุกจุด พนักงานให้ความช่วยเหลือดี ห้องน้ำสำหรับผู้พิการมีเพียงพอและสะอาด",
    likes: 12,
    profileImage: "/api/placeholder/48/48",
    source: "Gooseway",
  },
  {
    id: 2,
    locationId: 1,
    userId: 2,
    username: "มานี รักดี",
    date: "2023-11-28",
    rating: 3.5,
    comment:
      "ทางเข้าหลักสะดวกดี ลิฟต์กว้างพอสำหรับรถเข็น แต่ห้องน้ำสำหรับคนพิการมีน้อยไปหน่อย ต้องรอคิวนาน",
    likes: 5,
    profileImage: "/api/placeholder/48/48",
    source: "Gooseway",
  },

  // --- ✨ Mockup รีวิวจาก Google Maps (เพิ่มใหม่) ---
  {
    id: 101,
    locationId: 1,
    userId: 991,
    username: "Michael B. (Google Local Guide)",
    date: "2023-12-20",
    rating: 5.0,
    comment:
      "(Translated by Google) Wheelchair accessible entrance is on the west side. Very convenient. \n(Original) ทางเข้าสำหรับรถเข็นอยู่ฝั่งตะวันตก สะดวกมากครับ",
    likes: 0,
    profileImage: "https://lh3.googleusercontent.com/a/default-user", // รูปสมมติของ Google
    source: "Google",
  },
  {
    id: 102,
    locationId: 1,
    userId: 992,
    username: "Sarah Conner",
    date: "2023-10-10",
    rating: 4.0,
    comment: "Good mall, huge parking space for disabled.",
    likes: 2,
    profileImage: "https://lh3.googleusercontent.com/a/default-user",
    source: "Google",
  },

  // (ข้อมูลเดิมอื่นๆ...)
  {
    id: 3,
    locationId: 2,
    userId: 3,
    username: "วิชัย สะอาด",
    date: "2023-10-05",
    rating: 5.0,
    comment:
      "ประทับใจมากกับสิ่งอำนวยความสะดวกสำหรับผู้ใช้รถเข็น ลิฟต์กว้างขวาง ทางลาดได้มาตรฐาน พนักงานให้ความช่วยเหลือดีเยี่ยม",
    likes: 24,
    profileImage: "/api/placeholder/48/48",
    source: "Gooseway",
  },
  // เพิ่ม Mock Google ให้ที่อื่นด้วยก็ได้
  {
    id: 103,
    locationId: 2,
    userId: 993,
    username: "Traveller Joe",
    date: "2023-11-11",
    rating: 3.0,
    comment: "Lifts are too slow during weekends.",
    likes: 1,
    source: "Google",
  },
];

// ฟังก์ชั่นสำหรับดึงรีวิวตามรหัสสถานที่
export function getReviewsByLocationId(locationId: number): Review[] {
  return sampleReviews.filter((review) => review.locationId === locationId);
}

// ฟังก์ชั่นสำหรับคำนวณคะแนนเฉลี่ยของสถานที่
export function getAverageRating(locationId: number): number {
  const reviews = getReviewsByLocationId(locationId);
  if (reviews.length === 0) return 0;

  const sum = reviews.reduce((total, review) => total + review.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}
