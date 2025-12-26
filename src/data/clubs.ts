// src/data/clubs.ts

export const mockClubLeaderboard = {
  weekly: [
    {
      rank: 1,
      name: "Tendou Souji",
      avatar: "/image/profile/profile.jpg",
      distance: 45.2,
      points: 1250,
    },
    { rank: 2, name: "Arata Kagami", avatar: "", distance: 38.5, points: 980 },
    {
      rank: 3,
      name: "Hiyori Kusakabe",
      avatar: "",
      distance: 32.1,
      points: 850,
    },
    {
      rank: 4,
      name: "Daisuke Kazama",
      avatar: "",
      distance: 28.4,
      points: 720,
    },
    {
      rank: 5,
      name: "Tsurugi Kamishiro",
      avatar: "",
      distance: 25.0,
      points: 650,
    },
  ],
  monthly: [
    {
      rank: 1,
      name: "Tendou Souji",
      avatar: "/image/profile/profile.jpg",
      distance: 180.5,
      points: 5400,
    },
    {
      rank: 2,
      name: "Hiyori Kusakabe",
      avatar: "",
      distance: 150.2,
      points: 4200,
    },
    {
      rank: 3,
      name: "Arata Kagami",
      avatar: "",
      distance: 145.8,
      points: 3800,
    },
  ],
};

export const mockClubEvents = [
  {
    id: 101,
    title: "Exclusive: สวนเบญจกิติ Night Run",
    date: "2025-11-10T18:00:00",
    location: "สวนเบญจกิติ",
    attendees: 15,
    isPrivate: true,
    description:
      "กิจกรรมวิ่งยามเย็นเฉพาะสมาชิกคลับ Wheelchair Travelers TH เท่านั้น",
  },
  {
    id: 102,
    title: "Zoom Meeting: วางแผนทริปหน้าหนาว",
    date: "2025-11-15T20:00:00",
    location: "Online (Zoom)",
    attendees: 8,
    isPrivate: true,
    description: "ประชุมออนไลน์เพื่อโหวตสถานที่ท่องเที่ยวสำหรับทริปสิ้นปี",
  },
];

export const mockClubMembers = [
  { id: 1, name: "Tendou Souji", role: "Admin", joinedAt: "2025-01-01" },
  { id: 2, name: "Arata Kagami", role: "Member", joinedAt: "2025-01-05" },
  { id: 3, name: "Hiyori Kusakabe", role: "Member", joinedAt: "2025-02-10" },
  // ... more members
];
