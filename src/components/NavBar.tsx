// src/components/NavBar.tsx
"use client";

import { Map, Store, Globe, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ActionMenu from "./ActionMenu";
import { useLanguage } from "../../contexts/LanguageContext";

export default function NavBar() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path);

  return (
    <nav
      className="fixed bottom-0 w-full bg-white border-t border-gray-200"
      style={{ zIndex: 1000 }}
    >
      <div className="flex justify-around items-center py-2 relative">
        {/* 1. Map (Core Feature) */}
        <Link
          href="/map"
          className={`flex flex-col items-center px-3 py-1 ${
            isActive("/map") ? "text-blue-600" : "text-gray-600"
          }`}
        >
          <Map size={24} />
          <span className="text-xs mt-1">{t("nav.map")}</span>
        </Link>

        {/* 2. Community (Social/Feed) - ย้ายมาตรงนี้ */}
        <Link
          href="/community"
          className={`flex flex-col items-center px-3 py-1 ${
            isActive("/community") ? "text-blue-600" : "text-gray-600"
          }`}
        >
          <Globe size={24} />
          <span className="text-xs mt-1">{t("nav.community")}</span>
        </Link>

        {/* 3. Action Menu (Center) */}
        <div className="relative -mt-8" style={{ zIndex: 1001 }}>
          <ActionMenu />
        </div>

        {/* 4. Marketplace (Rewards/Shop) - ย้ายมาทางขวาคู่กับ Profile */}
        <Link
          href="/marketplace"
          className={`flex flex-col items-center px-3 py-1 ${
            isActive("/marketplace") ? "text-blue-600" : "text-gray-600"
          }`}
        >
          <Store size={24} />
          <span className="text-[10px] mt-1 font-medium">Marketplace</span>
        </Link>

        {/* 5. Profile (User Settings) */}
        <Link
          href="/profile"
          className={`flex flex-col items-center px-3 py-1 ${
            isActive("/profile") ? "text-blue-600" : "text-gray-600"
          }`}
        >
          <User size={24} />
          <span className="text-xs mt-1">{t("nav.profile")}</span>
        </Link>
      </div>
    </nav>
  );
}
