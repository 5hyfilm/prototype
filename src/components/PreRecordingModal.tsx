// src/components/PreRecordingModal.tsx
"use client";

import React, { useState } from "react";
import { X, ChevronDown, ChevronLeft } from "lucide-react";
import { TRANSPORT_MODES } from "@/data/transportModes";

interface PreRecordingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: () => void;
  selectedMode: string;
  onModeSelect: (modeId: string) => void;
}

export function PreRecordingModal({
  isOpen,
  onClose,
  onStart,
  selectedMode,
  onModeSelect,
}: PreRecordingModalProps) {
  // State สำหรับสลับหน้า (false = หน้าพร้อมเริ่ม, true = หน้าเลือกประเภท)
  const [isSelecting, setIsSelecting] = useState(false);

  if (!isOpen) return null;

  // ข้อมูลของโหมดปัจจุบัน
  const currentMode =
    TRANSPORT_MODES.find((m) => m.id === selectedMode) || TRANSPORT_MODES[0];
  const CurrentIcon = currentMode.icon;

  // ฟังก์ชันเมื่อกดเลือกโหมดใหม่
  const handleSelect = (modeId: string) => {
    onModeSelect(modeId);
    setIsSelecting(false); // ปิดหน้าเลือก กลับไปหน้าพร้อมเริ่ม
  };

  return (
    <div className="fixed inset-0 z-[1002] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden animate-slide-up flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="relative p-4 border-b border-gray-100 flex justify-center items-center flex-shrink-0">
          <h3 className="text-lg font-bold text-gray-800">
            {isSelecting ? "Select Transport Mode" : "Record Route"}
          </h3>

          {/* ปุ่มปิด (แสดงเฉพาะหน้าหลัก) */}
          {!isSelecting && (
            <button
              onClick={onClose}
              className="absolute right-4 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X size={20} />
            </button>
          )}

          {/* ปุ่มย้อนกลับ (แสดงเฉพาะหน้าเลือก) */}
          {isSelecting && (
            <button
              onClick={() => setIsSelecting(false)}
              className="absolute left-4 text-gray-500 hover:text-gray-800 flex items-center text-sm font-medium"
            >
              <ChevronLeft size={20} className="mr-1" /> Back
            </button>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto">
          {!isSelecting ? (
            // --- VIEW 1: หน้าเตรียมพร้อม (แสดงไอคอนเดียว) ---
            <div className="flex flex-col items-center justify-center py-4">
              <p className="text-gray-500 text-sm mb-6">
                Tap the icon to change vehicle
              </p>

              <button
                onClick={() => setIsSelecting(true)}
                className="group relative transition-transform hover:scale-105 active:scale-95 focus:outline-none"
              >
                {/* วงกลมไอคอนหลัก */}
                <div
                  className={`w-32 h-32 rounded-full flex items-center justify-center border-4 shadow-xl mb-4 ${currentMode.bgColor} ${currentMode.borderColor}`}
                >
                  <CurrentIcon size={64} style={{ color: currentMode.color }} />
                </div>

                {/* ปุ่มลูกศรเล็กๆ แสดงว่ากดเปลี่ยนได้ */}
                <div className="absolute bottom-6 right-1 bg-white rounded-full p-2 shadow-md border border-gray-100 group-hover:bg-gray-50">
                  <ChevronDown size={20} className="text-gray-600" />
                </div>
              </button>

              <h2 className="text-2xl font-bold text-gray-800 mb-1">
                {currentMode.label}
              </h2>
              <div
                className="h-1 w-16 rounded-full mt-2"
                style={{ backgroundColor: currentMode.color }}
              />
            </div>
          ) : (
            // --- VIEW 2: หน้าเลือกประเภท (Grid) ---
            <div className="grid grid-cols-2 gap-3 animate-fade-in">
              {TRANSPORT_MODES.map((mode) => {
                const isSelected = selectedMode === mode.id;
                const Icon = mode.icon;

                return (
                  <button
                    key={mode.id}
                    onClick={() => handleSelect(mode.id)}
                    className={`
                      relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 h-32
                      ${
                        isSelected
                          ? `${mode.borderColor} ${mode.bgColor} shadow-sm ring-1 ring-offset-1 ring-${mode.color}`
                          : "border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50 text-gray-400"
                      }
                    `}
                  >
                    <Icon
                      size={36}
                      className={`mb-2 ${isSelected ? "" : "text-gray-400"}`}
                      style={{ color: isSelected ? mode.color : undefined }}
                    />
                    <span
                      className={`text-sm font-semibold ${
                        isSelected ? "text-gray-900" : "text-gray-500"
                      }`}
                    >
                      {mode.label}
                    </span>

                    {/* Checkmark indicator */}
                    {isSelected && (
                      <div
                        className="absolute top-2 right-2 w-3 h-3 rounded-full"
                        style={{ backgroundColor: mode.color }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer - ปุ่ม Start (แสดงเฉพาะหน้าหลัก) */}
        {!isSelecting && (
          <div className="p-4 bg-gray-50 border-t border-gray-100 flex-shrink-0">
            <button
              onClick={onStart}
              className="w-full py-4 px-4 rounded-xl text-white font-bold text-lg shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
              style={{
                backgroundColor: currentMode.color,
                boxShadow: `0 8px 20px -4px ${currentMode.color}66`, // เงาสีตามปุ่ม
              }}
            >
              Start Recording
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
