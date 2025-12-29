// src/app/admin/locations/page.tsx

"use client";

import { useState, useEffect, ChangeEvent } from "react";
import {
  Search,
  Plus,
  Edit,
  ChevronDown,
  Download,
  MapPin,
  ArrowUp,
  ArrowDown,
  Map as MapIcon,
} from "lucide-react";
import { accessibleLocations } from "@/data/locations";
import type { Location } from "@/lib/types/location";
import Link from "next/link";
import { useRouter } from "next/navigation";

// ✅ 1. แก้ไข Type ให้ครอบคลุมทุกหมวดหมู่ที่มีในระบบ
type CategoryType =
  | "Shopping Mall"
  | "Public Transport"
  | "Park"
  | "Restaurant"
  | "Hotel" // เพิ่ม
  | "Cafe" // เพิ่ม
  | "Hospital" // เพิ่ม
  | "Restroom" // เพิ่ม
  | "Other" // เพิ่ม
  | "all";

type AccessibilityType = "high" | "medium" | "low" | "all";
type SortField = "name" | "category" | "accessibility";
type SortDirection = "asc" | "desc";

export default function AdminLocations() {
  const router = useRouter();
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<CategoryType>("all");
  const [accessibilityFilter, setAccessibilityFilter] =
    useState<AccessibilityType>("all");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [locationToDelete, setLocationToDelete] = useState<Location | null>(
    null
  );

  // โหลดข้อมูลสถานที่
  useEffect(() => {
    setTimeout(() => {
      setLocations(accessibleLocations);
      setLoading(false);
    }, 1000);
  }, []);

  // ฟังก์ชันค้นหาและกรองข้อมูล
  const filteredLocations = locations.filter((location) => {
    // ค้นหาตามชื่อ
    const matchesSearch =
      location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.description.toLowerCase().includes(searchTerm.toLowerCase());

    // กรองตามหมวดหมู่
    const matchesCategory =
      categoryFilter === "all" || location.category === categoryFilter;

    // กรองตามระดับการเข้าถึง
    const matchesAccessibility =
      accessibilityFilter === "all" ||
      location.accessibility === accessibilityFilter;

    return matchesSearch && matchesCategory && matchesAccessibility;
  });

  const handleViewOnMap = (location: Location) => {
    router.push(
      `/map?lat=${location.position[0]}&lng=${
        location.position[1]
      }&name=${encodeURIComponent(location.name)}`
    );
  };

  // ฟังก์ชันเรียงลำดับ
  const sortedLocations = [...filteredLocations].sort((a, b) => {
    let compareA: string | number, compareB: string | number;

    switch (sortField) {
      case "name":
        compareA = a.name.toLowerCase();
        compareB = b.name.toLowerCase();
        break;
      case "category":
        compareA = a.category.toLowerCase();
        compareB = b.category.toLowerCase();
        break;
      case "accessibility":
        const accessibilityRank: { [key: string]: number } = {
          high: 3,
          medium: 2,
          low: 1,
        };
        compareA = accessibilityRank[a.accessibility] || 0;
        compareB = accessibilityRank[b.accessibility] || 0;
        break;
      default:
        compareA = a.name.toLowerCase();
        compareB = b.name.toLowerCase();
    }

    if (sortDirection === "asc") {
      return compareA > compareB ? 1 : -1;
    } else {
      return compareA < compareB ? 1 : -1;
    }
  });

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const deleteLocation = () => {
    if (locationToDelete) {
      setLocations(locations.filter((loc) => loc.id !== locationToDelete.id));
      setShowDeleteModal(false);
      setLocationToDelete(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">จัดการสถานที่</h1>
        <Link
          href="/admin/locations/add"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus size={18} className="mr-2" /> เพิ่มสถานที่ใหม่
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="ค้นหาสถานที่..."
            value={searchTerm}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setCategoryFilter(e.target.value as CategoryType)
              }
              className="pl-4 pr-8 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              {/* ✅ 2. เพิ่มตัวเลือกใน Dropdown ให้ครบ */}
              <option value="all">ทุกหมวดหมู่</option>
              <option value="Shopping Mall">ห้างสรรพสินค้า</option>
              <option value="Public Transport">ระบบขนส่งสาธารณะ</option>
              <option value="Park">สวนสาธารณะ</option>
              <option value="Restaurant">ร้านอาหาร</option>
              <option value="Hotel">โรงแรม</option>
              <option value="Cafe">คาเฟ่</option>
              <option value="Hospital">โรงพยาบาล</option>
              <option value="Restroom">ห้องน้ำ</option>
              <option value="Other">อื่นๆ</option>
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
          </div>

          <div className="relative">
            <select
              value={accessibilityFilter}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setAccessibilityFilter(e.target.value as AccessibilityType)
              }
              className="pl-4 pr-8 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              <option value="all">ทุกระดับการเข้าถึง</option>
              <option value="high">เข้าถึงได้ง่าย</option>
              <option value="medium">เข้าถึงได้ปานกลาง</option>
              <option value="low">เข้าถึงได้ยาก</option>
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
          </div>

          <button className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50">
            <Download size={18} />
            <span>ส่งออก</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <button
                  onClick={() => handleSort("name")}
                  className="flex items-center"
                >
                  ชื่อสถานที่
                  {sortField === "name" &&
                    (sortDirection === "asc" ? (
                      <ArrowUp size={14} className="ml-1" />
                    ) : (
                      <ArrowDown size={14} className="ml-1" />
                    ))}
                </button>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <button
                  onClick={() => handleSort("category")}
                  className="flex items-center"
                >
                  หมวดหมู่
                  {sortField === "category" &&
                    (sortDirection === "asc" ? (
                      <ArrowUp size={14} className="ml-1" />
                    ) : (
                      <ArrowDown size={14} className="ml-1" />
                    ))}
                </button>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <button
                  onClick={() => handleSort("accessibility")}
                  className="flex items-center"
                >
                  ระดับการเข้าถึง
                  {sortField === "accessibility" &&
                    (sortDirection === "asc" ? (
                      <ArrowUp size={14} className="ml-1" />
                    ) : (
                      <ArrowDown size={14} className="ml-1" />
                    ))}
                </button>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ตำแหน่ง
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                การจัดการ
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedLocations.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  ไม่พบข้อมูลสถานที่
                </td>
              </tr>
            ) : (
              sortedLocations.map((location) => (
                <tr key={location.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {location.name}
                    </div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">
                      {location.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {/* ✅ TypeScript ไม่แจ้ง error แล้ว เพราะ location.category อยู่ใน CategoryType */}
                    {getCategoryName(location.category)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getAccessibilityBadgeColor(
                        location.accessibility
                      )}`}
                    >
                      {getAccessibilityName(location.accessibility)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-1 text-red-500" />
                      {`${location.position[0].toFixed(
                        4
                      )}, ${location.position[1].toFixed(4)}`}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/locations/edit/${location.id}`}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-100"
                      >
                        <Edit size={18} />
                      </Link>
                      <button
                        onClick={() => handleViewOnMap(location)}
                        className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-100"
                        title="ดูสถานที่บนแผนที่"
                      >
                        <MapIcon size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              ยืนยันการลบสถานที่
            </h3>
            <p className="text-gray-600 mb-6">
              คุณต้องการลบสถานที่ &quot;{locationToDelete?.name}&quot;
              ใช่หรือไม่? การกระทำนี้ไม่สามารถย้อนกลับได้
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                ยกเลิก
              </button>
              <button
                onClick={deleteLocation}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                ยืนยันการลบ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ✅ 3. แก้ไขฟังก์ชันให้รองรับ string หรือ CategoryType ที่ขยายแล้ว
function getCategoryName(category: string): string {
  switch (category) {
    case "Shopping Mall":
      return "ห้างสรรพสินค้า";
    case "Public Transport":
      return "ระบบขนส่งสาธารณะ";
    case "Park":
      return "สวนสาธารณะ";
    case "Restaurant":
      return "ร้านอาหาร";
    case "Hotel":
      return "โรงแรม";
    case "Cafe":
      return "คาเฟ่";
    case "Hospital":
      return "โรงพยาบาล";
    case "Restroom":
      return "ห้องน้ำ";
    case "Other":
      return "อื่นๆ";
    default:
      return category;
  }
}

function getAccessibilityName(
  accessibility: "high" | "medium" | "low"
): string {
  switch (accessibility) {
    case "high":
      return "เข้าถึงได้ง่าย";
    case "medium":
      return "เข้าถึงได้ปานกลาง";
    case "low":
      return "เข้าถึงได้ยาก";
    default:
      return accessibility;
  }
}

function getAccessibilityBadgeColor(
  accessibility: "high" | "medium" | "low"
): string {
  switch (accessibility) {
    case "high":
      return "bg-green-100 text-green-800";
    case "medium":
      return "bg-yellow-100 text-yellow-800";
    case "low":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}
