// src/app/community/events/[id]/page.tsx
"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  Share2,
  CheckCircle,
  UserPlus,
} from "lucide-react";
import { useLanguage } from "../../../../../contexts/LanguageContext";

// --- Mock Data สำหรับหน้า Detail ---
// ในของจริง ข้อมูลนี้จะถูกดึงมาจาก API ตาม eventId
const mockEventDetails: Record<string, any> = {
  "1": {
    id: 1,
    title: "Bangkok Wheelchair Meetup #1",
    description:
      "ชวนเพื่อนๆ ชาววีลแชร์มาพบปะพูดคุย แลกเปลี่ยนประสบการณ์การเดินทางในกรุงเทพฯ พร้อมร่วมสำรวจเส้นทางใหม่ๆ ในสวนเบญจกิติ เฟสใหม่ที่เพิ่งปรับปรุง เส้นทางสะดวก มีทางลาดและห้องน้ำคนพิการครบครัน",
    date: "2025-10-15",
    time: "09:00 - 12:00",
    location: "Benjakitti Forest Park (ลานกิจกรรมโซน A)",
    organizer: "Wheelchair Travelers TH",
    attendees: 24,
    maxAttendees: 50,
    price: "Free",
    image: "/api/placeholder/400/200", // เปลี่ยนเป็นรูปจริง
    agenda: [
      { time: "09:00", activity: "ลงทะเบียนและรับของที่ระลึก" },
      { time: "09:30", activity: "กิจกรรม Ice Breaking แนะนำตัว" },
      { time: "10:30", activity: "สำรวจเส้นทางรอบสวน (ระยะทาง 2km)" },
      { time: "11:30", activity: "สรุปกิจกรรมและถ่ายรูปหมู่" },
    ],
  },
  "2": {
    id: 2,
    title: "Inclusive Design Workshop",
    description:
      "เวิร์กชอปการออกแบบเพื่อทุกคน เรียนรู้หลักการ Universal Design เบื้องต้นและการประยุกต์ใช้จริง วิทยากรผู้เชี่ยวชาญด้านสถาปัตยกรรมเพื่อคนทั้งมวล",
    date: "2025-10-20",
    time: "13:30 - 16:30",
    location: "BACC Art Center",
    organizer: "Gooseway Academy",
    attendees: 50,
    maxAttendees: 60,
    price: "Free",
    image: "/api/placeholder/400/200",
    agenda: [
      { time: "13:30", activity: "ลงทะเบียน" },
      { time: "14:00", activity: "บรรยายหัวข้อ Universal Design" },
      { time: "15:00", activity: "Workshop แบ่งกลุ่มระดมสมอง" },
      { time: "16:00", activity: "นำเสนอผลงาน" },
    ],
  },
};

export default function EventDetailPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const params = useParams();

  // แปลง id เป็น string ให้ชัวร์ เพื่อดึงข้อมูลจาก Mock
  const eventId = Array.isArray(params.id) ? params.id[0] : params.id;
  const event = mockEventDetails[eventId as string];

  // State จำลองสถานะการเข้าร่วม (ในของจริงจะเช็คจาก Database)
  const [isJoined, setIsJoined] = useState(false);

  // กรณีหา Event ไม่เจอ (เช่น id ผิด)
  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 text-center">
        <p className="text-gray-500 mb-4 font-medium">
          ไม่พบข้อมูลกิจกรรมที่คุณค้นหา
        </p>
        <button
          onClick={() => router.back()}
          className="text-blue-600 font-bold hover:underline bg-blue-50 px-4 py-2 rounded-full"
        >
          กลับไปหน้าหลัก
        </button>
      </div>
    );
  }

  const handleRSVP = () => {
    if (isJoined) {
      if (confirm("ต้องการยกเลิกการเข้าร่วมกิจกรรมนี้?")) {
        setIsJoined(false);
      }
    } else {
      setIsJoined(true);
      // alert("ลงชื่อเข้าร่วมสำเร็จ!"); // สามารถเปิด comment เพื่อเทสได้
    }
  };

  return (
    // 🛠️ 1. pb-32: เว้นที่ด้านล่างเยอะๆ เพื่อไม่ให้ Content โดนปุ่มบัง
    <div className="min-h-screen bg-gray-50 pb-32">
      {/* === 1. Header Image === */}
      <div className="relative h-56 md:h-64 bg-gray-300">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback ถ้าโหลดรูปไม่ได้
            e.currentTarget.src =
              "https://placehold.co/600x400/e2e8f0/1e293b?text=Event+Image";
          }}
        />
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 bg-white/40 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/60 transition-all shadow-sm z-10"
        >
          <ArrowLeft size={24} className="drop-shadow-md" />
        </button>

        {/* Overlay Gradient เพื่อให้อ่าน Text ง่ายขึ้น (ถ้ามี text บนรูป) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
      </div>

      {/* === Content Container === */}
      <div className="px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-xl shadow-lg p-5 space-y-6 border border-gray-100">
          {/* === 2. Title & Info === */}
          <div>
            <div className="flex justify-between items-start">
              <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-md mb-2 inline-block">
                {event.price === "Free" ? "เข้าร่วมฟรี" : event.price}
              </span>
              <button className="text-gray-400 hover:text-gray-600 bg-gray-50 p-1.5 rounded-full transition-colors">
                <Share2 size={20} />
              </button>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 leading-tight">
              {event.title}
            </h1>
            <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
              จัดโดย{" "}
              <span className="text-blue-600 font-semibold">
                {event.organizer}
              </span>
            </p>
          </div>

          <div className="border-t border-b border-gray-100 py-4 space-y-4">
            {/* Date Time */}
            <div className="flex gap-4 items-start">
              <div className="bg-blue-50 w-10 h-10 rounded-lg flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                <Calendar size={20} />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">
                  {new Date(event.date).toLocaleDateString("th-TH", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                  <Clock size={14} /> {event.time}
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="flex gap-4 items-start">
              <div className="bg-orange-50 w-10 h-10 rounded-lg flex items-center justify-center text-orange-600 shrink-0 mt-0.5">
                <MapPin size={20} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-900 text-sm">
                  {event.location}
                </p>
                <button
                  onClick={() => router.push("/map")} // เชื่อมไปหน้าแผนที่หลัก
                  className="text-xs text-blue-600 font-bold hover:underline mt-1 flex items-center gap-1"
                >
                  ดูบนแผนที่ <ArrowLeft size={10} className="rotate-180" />
                </button>
              </div>
            </div>
          </div>

          {/* === 3. Attendees Status === */}
          <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-3">
            <div className="flex -space-x-2 overflow-hidden pl-1">
              {/* Mock User Avatars */}
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white bg-gray-300"
                />
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-500">
                +{event.attendees - 3}
              </div>
            </div>
            <div className="text-sm">
              <span className="font-bold text-gray-900">
                {event.attendees} คน
              </span>
              <span className="text-gray-500">
                {" "}
                กำลังจะไป (รับ {event.maxAttendees})
              </span>
            </div>
          </div>

          {/* === 4. Description === */}
          <div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">รายละเอียด</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              {event.description}
            </p>
          </div>

          {/* === 5. Agenda (Timeline) === */}
          {event.agenda && (
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-3">กำหนดการ</h3>
              <div className="relative border-l-2 border-blue-100 ml-3 space-y-6 pl-6 py-1">
                {event.agenda.map((item: any, index: number) => (
                  <div key={index} className="relative">
                    {/* Dot */}
                    <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow-sm ring-2 ring-blue-50" />

                    <span className="text-blue-600 font-bold text-xs bg-blue-50 px-2 py-0.5 rounded-md inline-block mb-1">
                      {item.time}
                    </span>
                    <p className="text-gray-700 text-sm font-medium">
                      {item.activity}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* === 6. Bottom Sticky RSVP Bar (Fixed) === */}
      {/* 🛠️ 2. z-[1100]: ค่าสูงกว่า NavBar (z-1000) ทำให้ลอยทับแน่นอน */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] z-[1100]">
        <div className="max-w-md mx-auto flex gap-4 items-center">
          {/* Info text */}
          <div className="hidden sm:block flex-1">
            <p className="text-xs text-gray-500">สนใจเข้าร่วม?</p>
            <p className="font-bold text-sm text-gray-900">
              {event.price === "Free" ? "ไม่มีค่าใช้จ่าย" : event.price}
            </p>
          </div>

          {/* RSVP Button */}
          <button
            onClick={handleRSVP}
            className={`flex-1 py-3 px-6 rounded-full font-bold text-base shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 ${
              isJoined
                ? "bg-green-50 text-green-700 border-2 border-green-200 hover:bg-green-100"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isJoined ? (
              <>
                <CheckCircle size={20} /> ลงชื่อเรียบร้อย
              </>
            ) : (
              <>
                <UserPlus size={20} /> ลงชื่อเข้าร่วม
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
