// src/app/admin/locations/edit/[id]/page.tsx
"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, MapPin, Upload, X, MessageCircle } from "lucide-react";
import Link from "next/link";
import { accessibleLocations } from "@/data/locations";
import { AccessibilityDetailsEditor } from "@/components/admin/AccessibilityDetailsEditor";
import { ReviewsManager } from "@/components/admin/ReviewsManager";
import type { LocationFeature } from "@/lib/types/location";

// ✅ แก้ไข 1: ขยาย Type ให้ครอบคลุมทุก Category ที่มีในระบบ
interface LocationFormData {
  name: string;
  category:
    | "Shopping Mall"
    | "Public Transport"
    | "Park"
    | "Restaurant"
    | "Hotel"
    | "Cafe"
    | "Hospital"
    | "Restroom"
    | "Other";
  accessibility: "high" | "medium" | "low";
  description: string;
  position: [number, number];
  features: string[];
  accessibilityScores: {
    [key: string]: LocationFeature;
  };
}

export default function EditLocation() {
  const router = useRouter();
  const params = useParams();
  const locationId = params.id as string;

  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [formData, setFormData] = useState<LocationFormData>({
    name: "",
    category: "Shopping Mall",
    accessibility: "high",
    description: "",
    position: [13.7563, 100.5018], // Bangkok default
    features: ["", ""],
    accessibilityScores: {},
  });
  const [originalImages, setOriginalImages] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [notFound, setNotFound] = useState<boolean>(false);

  const tabs = [
    { name: "ข้อมูลทั่วไป", icon: <MapPin size={18} /> },
    { name: "การเข้าถึงโดยละเอียด", icon: <MapPin size={18} /> },
    { name: "รีวิวและความคิดเห็น", icon: <MessageCircle size={18} /> },
  ];

  // โหลดข้อมูลสถานที่ที่ต้องการแก้ไข
  useEffect(() => {
    const loadLocation = async () => {
      try {
        const locationData = accessibleLocations.find(
          (loc) => loc.id === Number(locationId)
        );

        if (!locationData) {
          setNotFound(true);
          setLoading(false);
          return;
        }

        // ตั้งค่าข้อมูลฟอร์ม
        setFormData({
          name: locationData.name,
          // ✅ ตอนนี้ Type ตรงกันแล้ว TypeScript จะไม่แจ้ง error ตรงนี้
          category: locationData.category as LocationFormData["category"],
          accessibility: locationData.accessibility as
            | "high"
            | "medium"
            | "low",
          description: locationData.description,
          position: locationData.position,
          features: [...locationData.features, ""],
          accessibilityScores: locationData.accessibilityScores,
        });

        const mockImages = Object.values(locationData.accessibilityScores)
          .flatMap((score) => score.images)
          .map((img) => img.url)
          .slice(0, 5);

        setOriginalImages(mockImages);
        setPreviewImages(mockImages);

        setLoading(false);
      } catch (error) {
        console.error("Error loading location data:", error);
        setLoading(false);
      }
    };

    loadLocation();
  }, [locationId]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePositionChange = (index: number, value: string) => {
    const newPosition: [number, number] = [...formData.position];
    newPosition[index] = parseFloat(value);
    setFormData({ ...formData, position: newPosition });
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const newPreviewImages = files.map((file) => URL.createObjectURL(file));
    setPreviewImages([...originalImages, ...newPreviewImages]);
    setNewImages([...newImages, ...files]);
  };

  const removeOriginalImage = (index: number) => {
    const newOriginalImages = [...originalImages];
    newOriginalImages.splice(index, 1);
    setOriginalImages(newOriginalImages);
    setPreviewImages([
      ...newOriginalImages,
      ...newImages.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const removeNewImage = (index: number) => {
    const newImageArray = [...newImages];
    newImageArray.splice(index, 1);
    setNewImages(newImageArray);
    setPreviewImages([
      ...originalImages,
      ...newImageArray.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const handleUpdateAccessibilityFeature = (
    key: string,
    feature: LocationFeature
  ) => {
    setFormData({
      ...formData,
      accessibilityScores: {
        ...formData.accessibilityScores,
        [key]: feature,
      },
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);

    try {
      const filteredFeatures = formData.features.filter(
        (feature) => feature.trim() !== ""
      );

      console.log("Saving updated location:", {
        ...formData,
        features: filteredFeatures,
        originalImages,
        newImages: newImages.length,
      });

      await new Promise<void>((resolve) => setTimeout(resolve, 1500));
      router.push("/admin/locations");
    } catch (error) {
      console.error("Error saving location:", error);
      setSaving(false);
    }
  };

  const openLocationOnMap = () => {
    const [latitude, longitude] = formData.position;
    router.push(
      `/map?lat=${latitude}&lng=${longitude}&name=${encodeURIComponent(
        formData.name
      )}`
    );
  };

  if (notFound && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
          <p className="text-gray-600 mb-6">
            ไม่พบข้อมูลสถานที่ที่ต้องการแก้ไข
          </p>
          <Link
            href="/admin/locations"
            className="bg-blue-600 text-white px-4 py-2 rounded-md inline-flex items-center"
          >
            <ChevronLeft size={16} className="mr-2" />
            กลับไปหน้ารายการสถานที่
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4 mx-auto"></div>
          <p className="text-gray-600">กำลังโหลดข้อมูล...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/admin/locations" className="mr-4">
            <ChevronLeft size={24} className="text-gray-500" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">
            แก้ไขสถานที่: {formData.name}
          </h1>
        </div>

        <button
          type="button"
          onClick={openLocationOnMap}
          className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          <MapPin size={16} className="mr-2" />
          ดูบนแผนที่
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="border-b">
          <nav className="flex overflow-x-auto">
            {tabs.map((tab, index) => (
              <button
                key={tab.name}
                onClick={() => setTabIndex(index)}
                className={`px-4 py-3 flex items-center space-x-2 ${
                  tabIndex === index
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.icon}
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className={tabIndex === 0 ? "block" : "hidden"}>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    ชื่อสถานที่ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="ป้อนชื่อสถานที่"
                  />
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    หมวดหมู่ <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {/* ✅ แก้ไข 2: เพิ่มตัวเลือกให้ครบตาม Type */}
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
                </div>
              </div>

              <div>
                <label
                  htmlFor="accessibility"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  ระดับการเข้าถึง <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="accessibility"
                      value="high"
                      checked={formData.accessibility === "high"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span className="flex items-center">
                      <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                      เข้าถึงได้ง่าย
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="accessibility"
                      value="medium"
                      checked={formData.accessibility === "medium"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span className="flex items-center">
                      <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                      เข้าถึงได้ปานกลาง
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="accessibility"
                      value="low"
                      checked={formData.accessibility === "low"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span className="flex items-center">
                      <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                      เข้าถึงได้ยาก
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  รายละเอียด <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="ข้อมูลเกี่ยวกับสถานที่นี้"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ตำแหน่ง (ละติจูด, ลองจิจูด){" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="number"
                      value={formData.position[0]}
                      onChange={(e) => handlePositionChange(0, e.target.value)}
                      step="0.0001"
                      placeholder="ละติจูด (เช่น 13.7563)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      value={formData.position[1]}
                      onChange={(e) => handlePositionChange(1, e.target.value)}
                      step="0.0001"
                      placeholder="ลองจิจูด (เช่น 100.5018)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={tabIndex === 1 ? "block" : "hidden"}>
            <AccessibilityDetailsEditor
              features={formData.accessibilityScores}
              onUpdate={handleUpdateAccessibilityFeature}
            />
          </div>

          <div className={tabIndex === 2 ? "block" : "hidden"}>
            <ReviewsManager locationId={Number(locationId)} />
          </div>

          <div className={tabIndex === 4 ? "block" : "hidden"}>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                รูปภาพสถานที่
              </label>

              {previewImages.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                  {originalImages.map((src, index) => (
                    <div
                      key={`original-${index}`}
                      className="relative aspect-square"
                    >
                      <img
                        src={src}
                        alt={`รูปที่ ${index + 1}`}
                        className="w-full h-full object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => removeOriginalImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}

                  {newImages.map((file, index) => (
                    <div
                      key={`new-${index}`}
                      className="relative aspect-square"
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`รูปใหม่ที่ ${index + 1}`}
                        className="w-full h-full object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => removeNewImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <X size={16} />
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 bg-green-500 text-white text-xs py-1 px-2 text-center">
                        รูปใหม่
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:border-blue-500">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  id="imageUpload"
                />
                <label htmlFor="imageUpload" className="cursor-pointer">
                  <Upload size={32} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">
                    คลิกเพื่ออัปโหลดรูปภาพใหม่ หรือลากและวางไฟล์ที่นี่
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG, GIF สูงสุด 5 MB
                  </p>
                </label>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-4 border-t pt-6">
            <Link
              href="/admin/locations"
              className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              ยกเลิก
            </Link>
            <button
              type="submit"
              disabled={saving}
              className={`px-6 py-2 bg-blue-600 text-white rounded-md ${
                saving ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"
              }`}
            >
              {saving ? "กำลังบันทึก..." : "บันทึกการเปลี่ยนแปลง"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
