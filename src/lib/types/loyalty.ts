// src/lib/types/loyalty.ts

export type PointActionType =
  | "REPORT_OBSTACLE"
  | "RECORD_ROUTE"
  | "REVIEW_PLACE"
  | "COMMUNITY_POST"
  | "HELP_VERIFY"
  | "BACKGROUND_RECORD";

export interface PointBonusData {
  hasDescription?: boolean;
  descriptionLength?: number;
  distance?: number;
}

export interface UserLevel {
  level: number;
  name: string; // เช่น Newcomer, Explorer
  minPoints: number;
  maxPoints: number;
}

export interface PointTransaction {
  id: string;
  userId: number;
  action: PointActionType;
  points: number;
  timestamp: string; // ISO String
  description?: string;
}

export interface UserLoyaltyStats {
  totalPoints: number;
  currentLevel: number;
  dailyPoints: {
    [key in PointActionType]?: number; // เก็บแต้มที่ทำไปแล้วในวันนี้แยกตามประเภท
  };
  dailyActionCounts: {
    [key in PointActionType]?: number; // เก็บจำนวนครั้งที่ทำไปแล้วในวันนี้
  };
}

// เลเวลตาม SRS (สมมติช่วงคะแนนสำหรับการสาธิต)
export const LEVEL_MILESTONES: UserLevel[] = [
  { level: 1, name: "Newcomer", minPoints: 0, maxPoints: 100 },
  { level: 2, name: "Explorer", minPoints: 101, maxPoints: 500 },
  { level: 3, name: "Navigator", minPoints: 501, maxPoints: 1500 },
  { level: 4, name: "Pathfinder", minPoints: 1501, maxPoints: 3000 },
  { level: 5, name: "Trailblazer", minPoints: 3001, maxPoints: 6000 },
  { level: 6, name: "Guardian", minPoints: 6001, maxPoints: 10000 },
  { level: 7, name: "Hero", minPoints: 10001, maxPoints: 20000 },
  { level: 8, name: "Legend", minPoints: 20001, maxPoints: 999999 },
];
