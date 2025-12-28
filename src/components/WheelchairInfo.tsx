"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Edit2,
  Armchair,
  Ruler,
  Save,
  X,
  Weight,
} from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

interface WheelchairDetails {
  isFoldable: boolean;
  width: string;
  length: string;
  weight: string;
  foldedWidth?: string;
  foldedLength?: string;
  foldedHeight?: string;
  additionalNeeds: string[];
  notes?: string;
}

export function WheelchairInfo() {
  const { t, language } = useLanguage();

  // ✅ UI State: ควบคุมการย่อ/ขยาย และโหมดแก้ไข
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // ✅ Data State: ข้อมูลรถเข็น
  const [wheelchairInfo, setWheelchairInfo] = useState<WheelchairDetails>({
    isFoldable: true,
    width: "65",
    length: "107",
    weight: "15",
    foldedWidth: "30",
    foldedLength: "80",
    foldedHeight: "75",
    additionalNeeds: [
      t("wheelchair.needs.ramp"),
      t("wheelchair.needs.doorways"),
    ],
    notes:
      "ต้องการความช่วยเหลือเล็กน้อยเวลาขึ้นทางลาดชัน และต้องการที่จอดรถใกล้ทางเข้า",
  });

  // Logic การแปลภาษาสำหรับ Notes
  const noteTranslations = {
    en: {
      title: "Additional Notes",
      placeholder: "Record special needs or additional information...",
      empty: "No additional notes",
    },
    th: {
      title: "บันทึกเพิ่มเติม",
      placeholder: "บันทึกความต้องการพิเศษหรือข้อมูลเพิ่มเติม...",
      empty: "ไม่มีบันทึกเพิ่มเติม",
    },
  };

  const currentLang = language as keyof typeof noteTranslations;
  const translations = noteTranslations[currentLang] || noteTranslations.en;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    // Logic บันทึกลง Database จะอยู่ที่นี่
  };

  // Helper สำหรับเปิดโหมดแก้ไข (บังคับกางออกด้วย)
  const handleStartEdit = (e: React.MouseEvent) => {
    e.stopPropagation(); // ป้องกันการ trigger toggle ของ Header
    setIsOpen(true);
    setIsEditing(true);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300">
      {/* 1. Header Section (ส่วนหัวที่คลิกได้เพื่อย่อ/ขยาย) */}
      <div
        onClick={() => !isEditing && setIsOpen(!isOpen)}
        className={`p-4 flex items-center justify-between cursor-pointer transition-colors ${
          isOpen || isEditing
            ? "bg-white border-b border-gray-100"
            : "hover:bg-gray-50"
        } ${isEditing ? "cursor-default" : ""}`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              isOpen || isEditing
                ? "bg-blue-100 text-blue-600"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            <Armchair size={20} />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-base">
              {t("wheelchair.info.title")}
            </h3>

            {/* Show Summary text when collapsed */}
            {!isOpen && !isEditing && (
              <p className="text-xs text-gray-500 flex items-center gap-2 mt-0.5">
                <span
                  className={`font-semibold ${
                    wheelchairInfo.isFoldable
                      ? "text-green-600"
                      : "text-gray-600"
                  }`}
                >
                  {wheelchairInfo.isFoldable
                    ? t("wheelchair.is.foldable")
                    : t("wheelchair.not.foldable")}
                </span>
                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                <span>
                  กว้าง {wheelchairInfo.width} {t("common.cm")}
                </span>
              </p>
            )}
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2">
          {!isEditing ? (
            <>
              <button
                onClick={handleStartEdit}
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all"
                aria-label={t("wheelchair.edit.info")}
              >
                <Edit2 size={18} />
              </button>
              <div className="text-gray-300">|</div>
              <button className="text-gray-400 hover:text-gray-600">
                {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
            </>
          ) : (
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
              Editing
            </span>
          )}
        </div>
      </div>

      {/* 2. Content Section (Form OR Display) */}
      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
          isOpen || isEditing
            ? "max-h-[800px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-4 bg-gray-50/50">
          {isEditing ? (
            /* ---------------- FORM MODE ---------------- */
            <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
              {/* Foldable Status */}
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  {t("wheelchair.foldable.question")}
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      checked={wheelchairInfo.isFoldable}
                      onChange={() =>
                        setWheelchairInfo((prev) => ({
                          ...prev,
                          isFoldable: true,
                        }))
                      }
                      className="mr-2 text-blue-600 focus:ring-blue-500"
                    />
                    {t("common.yes")}
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      checked={!wheelchairInfo.isFoldable}
                      onChange={() =>
                        setWheelchairInfo((prev) => ({
                          ...prev,
                          isFoldable: false,
                        }))
                      }
                      className="mr-2 text-blue-600 focus:ring-blue-500"
                    />
                    {t("common.no")}
                  </label>
                </div>
              </div>

              {/* Normal Dimensions Input */}
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <Ruler size={16} className="text-blue-500" />{" "}
                  {t("wheelchair.regular.dimensions")}
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      {t("wheelchair.width.label")}
                    </label>
                    <input
                      type="number"
                      value={wheelchairInfo.width}
                      onChange={(e) =>
                        setWheelchairInfo((prev) => ({
                          ...prev,
                          width: e.target.value,
                        }))
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      {t("wheelchair.length.label")}
                    </label>
                    <input
                      type="number"
                      value={wheelchairInfo.length}
                      onChange={(e) =>
                        setWheelchairInfo((prev) => ({
                          ...prev,
                          length: e.target.value,
                        }))
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      {t("wheelchair.weight.label")}
                    </label>
                    <input
                      type="number"
                      value={wheelchairInfo.weight}
                      onChange={(e) =>
                        setWheelchairInfo((prev) => ({
                          ...prev,
                          weight: e.target.value,
                        }))
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Folded Dimensions Input */}
              {wheelchairInfo.isFoldable && (
                <div className="bg-white p-3 rounded-lg border border-gray-200 border-dashed">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    {t("wheelchair.folded.dimensions")}
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        {t("wheelchair.width.label")}
                      </label>
                      <input
                        type="number"
                        value={wheelchairInfo.foldedWidth}
                        onChange={(e) =>
                          setWheelchairInfo((prev) => ({
                            ...prev,
                            foldedWidth: e.target.value,
                          }))
                        }
                        className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        {t("wheelchair.length.label")}
                      </label>
                      <input
                        type="number"
                        value={wheelchairInfo.foldedLength}
                        onChange={(e) =>
                          setWheelchairInfo((prev) => ({
                            ...prev,
                            foldedLength: e.target.value,
                          }))
                        }
                        className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        {t("wheelchair.height.label")}
                      </label>
                      <input
                        type="number"
                        value={wheelchairInfo.foldedHeight}
                        onChange={(e) =>
                          setWheelchairInfo((prev) => ({
                            ...prev,
                            foldedHeight: e.target.value,
                          }))
                        }
                        className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Notes Input */}
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  {translations.title}
                </label>
                <textarea
                  value={wheelchairInfo.notes}
                  onChange={(e) =>
                    setWheelchairInfo((prev) => ({
                      ...prev,
                      notes: e.target.value,
                    }))
                  }
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:border-blue-500 outline-none resize-none"
                  placeholder={translations.placeholder}
                />
              </div>

              {/* Form Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 py-2.5 px-4 bg-gray-100 text-gray-700 rounded-lg font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                >
                  <X size={18} /> {t("common.cancel")}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Save size={18} /> {t("common.save.changes")}
                </button>
              </div>
            </form>
          ) : (
            /* ---------------- DISPLAY MODE ---------------- */
            <div className="space-y-3 animate-fade-in">
              {/* Type & Status */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                  <span className="text-xs text-gray-400 font-bold uppercase block mb-1">
                    {t("wheelchair.foldable.status")}
                  </span>
                  <span
                    className={`text-sm font-bold ${
                      wheelchairInfo.isFoldable
                        ? "text-green-600"
                        : "text-gray-600"
                    }`}
                  >
                    {wheelchairInfo.isFoldable
                      ? t("wheelchair.is.foldable")
                      : t("wheelchair.not.foldable")}
                  </span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                  <span className="text-xs text-gray-400 font-bold uppercase block mb-1">
                    {t("wheelchair.weight")}
                  </span>
                  <span className="text-sm font-bold text-gray-700 flex items-center gap-1">
                    <Weight size={14} /> {wheelchairInfo.weight}{" "}
                    {t("common.kg")}
                  </span>
                </div>
              </div>

              {/* Dimensions Table */}
              <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-50">
                  <Ruler size={14} className="text-blue-500" />
                  <span className="text-xs font-bold text-gray-400 uppercase">
                    {t("wheelchair.regular.dimensions")}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <div className="text-center w-1/3 border-r border-gray-100">
                    <span className="block text-gray-400 text-[10px]">
                      {t("wheelchair.width")}
                    </span>
                    <span className="font-bold text-gray-700">
                      {wheelchairInfo.width}
                    </span>{" "}
                    <span className="text-[10px]">{t("common.cm")}</span>
                  </div>
                  <div className="text-center w-1/3 border-r border-gray-100">
                    <span className="block text-gray-400 text-[10px]">
                      {t("wheelchair.length")}
                    </span>
                    <span className="font-bold text-gray-700">
                      {wheelchairInfo.length}
                    </span>{" "}
                    <span className="text-[10px]">{t("common.cm")}</span>
                  </div>
                  {/* Mock Height (ถ้าไม่มีใน data ก็เว้นไว้) */}
                  <div className="text-center w-1/3">
                    <span className="block text-gray-400 text-[10px]">สูง</span>
                    <span className="font-bold text-gray-700">-</span>
                  </div>
                </div>
              </div>

              {/* Folded Dimensions (Optional) */}
              {wheelchairInfo.isFoldable && (
                <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm opacity-80">
                  <span className="text-xs font-bold text-gray-400 uppercase block mb-2">
                    {t("wheelchair.folded.dimensions")}
                  </span>
                  <div className="flex gap-4 text-xs text-gray-600">
                    <span>
                      กว้าง: <b>{wheelchairInfo.foldedWidth}</b>
                    </span>
                    <span>
                      ยาว: <b>{wheelchairInfo.foldedLength}</b>
                    </span>
                    <span>
                      สูง: <b>{wheelchairInfo.foldedHeight}</b>
                    </span>
                  </div>
                </div>
              )}

              {/* Notes Display */}
              <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-100">
                <p className="text-xs font-bold text-blue-600 mb-1">
                  {translations.title}
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {wheelchairInfo.notes || translations.empty}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
