// src/contexts/LoyaltyContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  UserLoyaltyStats,
  PointActionType,
  PointTransaction,
  LEVEL_MILESTONES,
  UserLevel,
  PointBonusData, // [UPDATED] อย่าลืม import ตัวนี้เข้ามานะครับ
} from "@/lib/types/loyalty";

interface LoyaltyContextType {
  stats: UserLoyaltyStats;
  transactions: PointTransaction[];
  currentLevelInfo: UserLevel;
  nextLevelInfo: UserLevel | null;
  // [UPDATED] เปลี่ยน any เป็น PointBonusData
  earnPoints: (action: PointActionType, bonusData?: PointBonusData) => void;
  isLoading: boolean;
}

const LoyaltyContext = createContext<LoyaltyContextType | undefined>(undefined);

const initialStats: UserLoyaltyStats = {
  totalPoints: 1250,
  currentLevel: 3,
  dailyPoints: {},
  dailyActionCounts: {},
};

export function LoyaltyProvider({ children }: { children: ReactNode }) {
  const [stats, setStats] = useState<UserLoyaltyStats>(initialStats);
  const [transactions, setTransactions] = useState<PointTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getLevelInfo = (points: number) => {
    return (
      LEVEL_MILESTONES.find(
        (l) => points >= l.minPoints && points <= l.maxPoints
      ) || LEVEL_MILESTONES[0]
    );
  };

  const getNextLevelInfo = (currentLevel: number) => {
    return LEVEL_MILESTONES.find((l) => l.level === currentLevel + 1) || null;
  };

  const checkDailyCap = (action: PointActionType, currentCount: number) => {
    const limits: Record<PointActionType, number> = {
      REPORT_OBSTACLE: 5,
      RECORD_ROUTE: 5,
      REVIEW_PLACE: 5,
      COMMUNITY_POST: 5,
      HELP_VERIFY: 10,
      BACKGROUND_RECORD: 1,
    };
    return currentCount < (limits[action] || 99);
  };

  // [UPDATED] เปลี่ยน any เป็น PointBonusData และเพิ่ม Type Guard
  const calculatePoints = (
    action: PointActionType,
    data?: PointBonusData
  ): number => {
    let points = 0;
    switch (action) {
      case "REPORT_OBSTACLE":
        points = 5; // รูปถ่าย
        if (data?.hasDescription) points += 2;
        // ใช้ || 0 เพื่อกันค่า undefined
        if ((data?.descriptionLength || 0) >= 200) points += 2;
        break;
      case "RECORD_ROUTE":
        points = 7; // พื้นฐาน
        // ใช้ || 0 เพื่อกันค่า undefined
        if ((data?.distance || 0) > 10) points += 5;
        break;
      case "REVIEW_PLACE":
        points = 5;
        break;
      case "COMMUNITY_POST":
        points = 4;
        break;
      case "HELP_VERIFY":
        points = 2;
        break;
      default:
        points = 1;
    }
    return points;
  };

  // [UPDATED] เปลี่ยน any เป็น PointBonusData
  const earnPoints = (action: PointActionType, bonusData?: PointBonusData) => {
    setIsLoading(true);

    setTimeout(() => {
      const currentActionCount = stats.dailyActionCounts[action] || 0;

      if (!checkDailyCap(action, currentActionCount)) {
        console.log("Daily limit reached for", action);
        setIsLoading(false);
        return;
      }

      const pointsEarned = calculatePoints(action, bonusData);

      setStats((prev) => {
        const newTotal = prev.totalPoints + pointsEarned;
        const newLevelInfo = getLevelInfo(newTotal);

        return {
          ...prev,
          totalPoints: newTotal,
          currentLevel: newLevelInfo.level,
          dailyActionCounts: {
            ...prev.dailyActionCounts,
            [action]: currentActionCount + 1,
          },
          dailyPoints: {
            ...prev.dailyPoints,
            [action]: (prev.dailyPoints[action] || 0) + pointsEarned,
          },
        };
      });

      const newTx: PointTransaction = {
        id: Date.now().toString(),
        userId: 1,
        action,
        points: pointsEarned,
        timestamp: new Date().toISOString(),
        description: `ได้รับแต้มจากการ ${action}`,
      };
      setTransactions((prev) => [newTx, ...prev]);

      setIsLoading(false);
    }, 300);
  };

  const currentLevelInfo = getLevelInfo(stats.totalPoints);
  const nextLevelInfo = getNextLevelInfo(currentLevelInfo.level);

  return (
    <LoyaltyContext.Provider
      value={{
        stats,
        transactions,
        currentLevelInfo,
        nextLevelInfo,
        earnPoints,
        isLoading,
      }}
    >
      {children}
    </LoyaltyContext.Provider>
  );
}

export const useLoyalty = () => {
  const context = useContext(LoyaltyContext);
  if (context === undefined) {
    throw new Error("useLoyalty must be used within a LoyaltyProvider");
  }
  return context;
};
