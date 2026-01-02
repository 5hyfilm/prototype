// src/components/Map.tsx

"use client";

import { useEffect, useState, useCallback } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
  Polyline,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster"; // ✅ Import Clustering
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Crosshair, Search, X, Route, EyeOff, Plus } from "lucide-react";
// Import Router hooks สำหรับจัดการ URL และ Mode
import { useRouter, useSearchParams } from "next/navigation";
import { useLanguage } from "../../contexts/LanguageContext";
import { LocationMarker } from "./LocationMarker";
import { ObstacleMarker } from "./ObstacleMarker";
import { sampleObstacles } from "@/data/obstacles";
import { accessibleLocations } from "@/data/locations";
import { NearbyAccessibleLocations } from "./NearbyAccessibleLocations";
import { locationService } from "@/services/locationService";
import { Location } from "@/lib/types/location";
import { sampleRoutes } from "@/data/routes";
import { TRANSPORT_MODES } from "@/data/transportModes";

// --- Icons Definition ---

// Fix Leaflet icon issue in Next.js
const icon = L.icon({
  iconUrl: "/image/gps.png",
  iconSize: [41, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Marker สำหรับผลการค้นหา
const searchResultIcon = L.icon({
  iconUrl: "/image/search-pin.svg",
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35],
});

// Marker จุดเริ่มต้นการบันทึก
const recordingStartIcon = L.divIcon({
  className: "recording-start-marker",
  html: `<div style="width: 14px; height: 14px; background-color: #ef4444; border-radius: 50%; border: 3px solid white;"></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

// Marker จุดปัจจุบันของการบันทึก (มี Animation Pulse)
const recordingCurrentIcon = L.divIcon({
  className: "recording-current-marker",
  html: `<div style="width: 18px; height: 18px; background-color: #ef4444; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.5), 0 0 0 4px rgba(239, 68, 68, 0.3); animation: pulse 1.5s infinite;"></div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

// [GOOSEWAY] Blue Plus Icon สำหรับโหมด Add Location
const bluePlusIcon = L.divIcon({
  className: "blue-plus-marker",
  html: `
    <div style="
      background-color: #2563eb; 
      width: 32px; 
      height: 32px; 
      border-radius: 50%; 
      border: 3px solid white; 
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3); 
      display: flex; 
      align-items: center; 
      justify-content: center;
      animation: bounce-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      cursor: pointer;
    ">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    </div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -20],
});

// --- ✅ Custom Cluster Icon (Option 1: Blue Theme) ---
// ฟังก์ชันสร้าง Icon วงกลมสีน้ำเงินพร้อมตัวเลขข้างใน
const createClusterCustomIcon = function (cluster: any) {
  const count = cluster.getChildCount();
  // ปรับขนาดวงกลมตามจำนวน (เล็ก/กลาง/ใหญ่)
  let size = 40;
  if (count > 10) size = 50;
  if (count > 50) size = 60;

  return L.divIcon({
    html: `
      <div style="
        background-color: #2563eb; 
        width: ${size}px; 
        height: ${size}px; 
        border-radius: 50%; 
        color: white; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        font-weight: bold; 
        font-family: sans-serif; 
        font-size: 16px;
        border: 3px solid white; 
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
      ">
        ${count}
      </div>
    `,
    className: "custom-marker-cluster",
    iconSize: L.point(size, size, true),
  });
};

// --- Types ---

interface MapProps {
  routePath?: [number, number][];
  searchQuery?: string;
  recordedPath?: [number, number][];
  isRecording?: boolean;
  transportMode?: string;
  category?: string;
}

interface ScannedPOI {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: string;
}

// --- Sub-components ---

function LocationButton() {
  const { t } = useLanguage();
  const map = useMap();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    map
      .locate()
      .on("locationfound", function (e) {
        map.flyTo(e.latlng, map.getZoom());
        setLoading(false);
      })
      .on("locationerror", function (e) {
        console.log("Location error:", e);
        setLoading(false);
      });
  };

  return (
    <button
      onClick={handleClick}
      title={t("map.locate.current.location")}
      className={`absolute right-4 top-20 z-[1000] bg-white p-3 rounded-full shadow-lg
        ${loading ? "animate-pulse" : ""}`}
      disabled={loading}
    >
      <Crosshair size={24} className="text-blue-600" />
    </button>
  );
}

function InitialLocationFinder() {
  const map = useMap();
  const [initialLocationSet, setInitialLocationSet] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const urlParams = new URLSearchParams(window.location.search);
    const lat = urlParams.get("lat");
    const lng = urlParams.get("lng");
    const name = urlParams.get("name");

    if (lat && lng) {
      const position = L.latLng(parseFloat(lat), parseFloat(lng));
      map.setView(position, 16);

      if (name) {
        L.marker(position, { icon: searchResultIcon })
          .addTo(map)
          .bindPopup(name)
          .openPopup();
      }

      setInitialLocationSet(true);
      return;
    }

    if (!initialLocationSet) {
      map
        .locate({ setView: true, maxZoom: 16 })
        .on("locationfound", function (e) {
          console.log("Current location found:", e.latlng);
          setInitialLocationSet(true);
        })
        .on("locationerror", function (e) {
          console.log("Location error:", e);
          setInitialLocationSet(true);
        });
    }
  }, [map, initialLocationSet]);

  return null;
}

function CurrentLocationMarker() {
  const { t } = useLanguage();
  const [position, setPosition] = useState<L.LatLng | null>(null);

  useMapEvents({
    locationfound(e) {
      setPosition(e.latlng);
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={icon}>
      <Popup>{t("map.current.location")}</Popup>
    </Marker>
  );
}

// [GOOSEWAY] Component จัดการโหมด Add Location
// ทำหน้าที่สแกนหา POI และแสดง UI สำหรับการเพิ่มสถานที่
const AddLocationManager = () => {
  const map = useMap();
  const router = useRouter(); // ใช้ Router เพื่อจัดการการเปลี่ยนหน้า
  const searchParams = useSearchParams(); // ใช้ SearchParams เพื่อดักจับ URL changes
  const [scannedPOIs, setScannedPOIs] = useState<ScannedPOI[]>([]);
  const [modeActive, setModeActive] = useState(false);

  // 1. ตรวจสอบ URL Param: ?mode=add_location
  useEffect(() => {
    const mode = searchParams.get("mode");
    if (mode === "add_location") {
      setModeActive(true);
      console.log("📍 Add Location Mode: ACTIVATED");
    } else {
      setModeActive(false);
      setScannedPOIs([]); // เคลียร์หมุดเมื่อออกจากโหมด
      console.log("📍 Add Location Mode: DEACTIVATED");
    }
  }, [searchParams]);

  // ฟังก์ชันสร้าง Mock Data (กรณี API ใช้งานไม่ได้)
  const generateMockPOIs = (center: L.LatLng): ScannedPOI[] => {
    const mocks = [
      { name: "ร้านกาแฟตัวอย่าง (Mock)", type: "cafe" },
      { name: "อาคารสำนักงาน (Mock)", type: "office" },
      { name: "ร้านสะดวกซื้อ (Mock)", type: "convenience" },
      { name: "สวนสาธารณะ (Mock)", type: "park" },
      { name: "ป้ายรถเมล์ (Mock)", type: "transport" },
    ];

    return mocks.map((m, i) => ({
      id: `mock-${Date.now()}-${i}`,
      name: m.name,
      type: m.type,
      lat: center.lat + (Math.random() - 0.5) * 0.003,
      lng: center.lng + (Math.random() - 0.5) * 0.003,
    }));
  };

  // 2. ฟังก์ชันสแกนหา POI
  const scanArea = useCallback(async () => {
    if (!modeActive) return;

    const bounds = map.getBounds();
    const center = map.getCenter();

    try {
      const viewbox = `${bounds.getWest()},${bounds.getNorth()},${bounds.getEast()},${bounds.getSouth()}`;

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=amenity&viewbox=${viewbox}&bounded=1&limit=10&addressdetails=1`
      );

      const data = await response.json();
      let newPois: ScannedPOI[] = [];

      if (data && data.length > 0) {
        newPois = data.map((item: any) => ({
          id: item.place_id,
          name: item.display_name.split(",")[0],
          lat: parseFloat(item.lat),
          lng: parseFloat(item.lon),
          type: item.type,
        }));
      } else {
        console.warn("⚠️ API returned empty, using mock data");
        newPois = generateMockPOIs(center);
      }

      setScannedPOIs((prev) => {
        const uniqueNew = newPois.filter(
          (p) => !prev.some((existing) => existing.id === p.id)
        );
        return [...prev, ...uniqueNew];
      });
    } catch (error) {
      console.error("❌ Scan failed, forcing mock data:", error);
      const mocks = generateMockPOIs(center);
      setScannedPOIs((prev) => [...prev, ...mocks]);
    }
  }, [map, modeActive]);

  // 3. Auto Scan เมื่อหยุดเลื่อนแผนที่
  useMapEvents({
    moveend: () => {
      if (modeActive) scanArea();
    },
  });

  // Scan ครั้งแรกเมื่อเข้าโหมด
  useEffect(() => {
    if (modeActive) {
      scanArea();
    }
  }, [modeActive, scanArea]);

  if (!modeActive) return null;

  return (
    <>
      {/* Banner บอกสถานะ พร้อมปุ่มปิด (X) */}
      <div className="absolute top-24 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white pl-4 pr-1.5 py-1.5 rounded-full shadow-lg z-[1000] flex items-center gap-3 w-max max-w-[90%] pointer-events-auto">
        <div className="flex items-center gap-2">
          <Plus size={16} className="text-white shrink-0" />
          <span className="text-sm font-medium truncate">
            เลือกสถานที่เพื่อเพิ่มข้อมูล
          </span>
        </div>

        {/* ปุ่มปิด: กดแล้วกลับไปหน้า Map ปกติ */}
        <button
          onClick={() => {
            router.push("/map");
          }}
          className="bg-white/20 hover:bg-white/40 text-white rounded-full p-1 transition-all flex items-center justify-center shrink-0"
        >
          <X size={16} />
        </button>
      </div>

      {/* Render หมุดฟ้า (+) */}
      {scannedPOIs.map((poi) => (
        <Marker key={poi.id} position={[poi.lat, poi.lng]} icon={bluePlusIcon}>
          <Popup>
            <div className="text-center p-2 min-w-[200px]">
              <p className="text-xs text-gray-500 mb-1 font-semibold uppercase tracking-wide">
                {poi.type}
              </p>
              <h3 className="font-bold text-lg mb-3 text-gray-800 leading-tight">
                {poi.name}
              </h3>

              <button
                onClick={() => {
                  // ส่งข้อมูลไปหน้าแบบฟอร์ม User (/add-location)
                  window.location.href = `/add-location?lat=${poi.lat}&lng=${
                    poi.lng
                  }&name=${encodeURIComponent(poi.name)}`;
                }}
                className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Plus size={16} />
                เพิ่มสถานที่นี้
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

// Component ควบคุมการเลื่อนแผนที่ (เช่น เมื่อค้นหาเจอ)
const MapController = ({
  searchPos,
}: {
  searchPos: [number, number] | null;
}) => {
  const map = useMap();
  useEffect(() => {
    if (searchPos) {
      map.flyTo(searchPos as L.LatLngExpression, 16);
    }
  }, [map, searchPos]);
  return null;
};

// --- Main Component ---

export function Map({
  routePath = [],
  searchQuery,
  recordedPath = [],
  isRecording = false,
  transportMode = "manual_wheelchair", // ค่า Default
}: MapProps) {
  const { t } = useLanguage();
  const defaultPosition = L.latLng(13.7466, 100.5347); // Siam area
  const [position, setPosition] = useState(() => defaultPosition);
  const [activeRoutes, setActiveRoutes] = useState(() =>
    sampleRoutes.map((route) => ({
      id: route.id,
      accessibility: "high",
      color: "#22c55e",
      path: route.path,
      name: route.title,
      description: route.description,
    }))
  );

  const [searchValue, setSearchValue] = useState("");
  const [showNearbyPanel, setShowNearbyPanel] = useState(false);
  const [searchPosition, setSearchPosition] = useState<[number, number] | null>(
    null
  );
  const [showRoutes, setShowRoutes] = useState(true);

  const toggleRoutesVisibility = useCallback(() => {
    setShowRoutes((prev) => !prev);
  }, []);

  // Effect: เมื่อมีการเลือกเส้นทาง (เช่น จากหน้า Saved Routes)
  useEffect(() => {
    if (routePath.length > 0) {
      const newPosition = L.latLng(routePath[0][0], routePath[0][1]);
      setPosition(newPosition);
      setActiveRoutes([
        {
          id: 999,
          accessibility: "high",
          color: "#22c55e",
          path: routePath,
          name: t("map.selected.route"),
          description: t("map.selected.route.description"),
        },
      ]);
    }
  }, [routePath, t]);

  // Effect: จัดการเส้นทางที่กำลังบันทึก (Recording Path)
  useEffect(() => {
    if (recordedPath.length > 0 && isRecording) {
      // 1. หาข้อมูลสีตามประเภทพาหนะ
      const modeData = TRANSPORT_MODES.find((m) => m.id === transportMode);
      const strokeColor = modeData ? modeData.color : "#ef4444";

      // 2. สร้างเส้นทางชั่วคราว
      const recordingRoute = {
        id: 9999,
        accessibility: "high",
        color: strokeColor,
        path: recordedPath,
        name: t("map.recording.route") || "กำลังบันทึกเส้นทาง",
        description: t("map.recording.in.progress") || "กำลังบันทึกเส้นทาง",
      };

      // 3. อัปเดต State
      setActiveRoutes((prevRoutes) => {
        const filteredRoutes = prevRoutes.filter((route) => route.id !== 9999);
        return [...filteredRoutes, recordingRoute];
      });
    }
  }, [recordedPath, isRecording, transportMode, t]);

  // Effect: จัดการ Search Query จาก Parent
  useEffect(() => {
    if (searchQuery) {
      setSearchValue(searchQuery);
      handleSearch(searchQuery);
    }
  }, [searchQuery]);

  const handleSearch = useCallback(async (query: string) => {
    if (!query) {
      setSearchPosition(null);
      setShowNearbyPanel(false);
      return;
    }

    try {
      const results = await locationService.searchLocations(query);
      if (results.length > 0) {
        setSearchPosition(results[0].position);
        setShowNearbyPanel(true);
      }
    } catch (error) {
      console.error("Error searching locations:", error);
    }
  }, []);

  const handleSelectNearbyLocation = (location: Location) => {
    setShowNearbyPanel(false);
    if (location.position) {
      setSearchPosition(location.position);
    }
  };

  return (
    <div className="relative w-full h-full">
      {/* Panel แสดงสถานที่ใกล้เคียง (ถ้ามีการ Search) */}
      {searchPosition && (
        <NearbyAccessibleLocations
          searchPosition={searchPosition}
          onSelect={handleSelectNearbyLocation}
          onClose={() => setShowNearbyPanel(false)}
          isOpen={showNearbyPanel}
        />
      )}

      <MapContainer
        center={position}
        zoom={16}
        className="w-full h-full"
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
        />

        {/* --- Managers & Controllers --- */}
        <InitialLocationFinder />
        <MapController searchPos={searchPosition} />
        {/* [GOOSEWAY] AddLocationManager ถูกเรียกใช้ที่นี่ */}
        <AddLocationManager />

        {/* --- Layers --- */}

        {/* Routes Lines */}
        {showRoutes &&
          activeRoutes.map((route) => (
            <Polyline
              key={route.id}
              positions={route.path as L.LatLngExpression[]}
              pathOptions={{
                color: route.color,
                weight: 6,
                opacity: 0.8,
                dashArray: route.id === 9999 ? "10, 5" : undefined,
              }}
            ></Polyline>
          ))}

        {/* Recording Start/Current Markers */}
        {isRecording && recordedPath.length > 0 && (
          <>
            <Marker
              position={recordedPath[0] as L.LatLngExpression}
              icon={recordingStartIcon}
            >
              <Popup>
                {t("map.recording.start") || "จุดเริ่มต้นการบันทึก"}
              </Popup>
            </Marker>
            <Marker
              position={
                recordedPath[recordedPath.length - 1] as L.LatLngExpression
              }
              icon={recordingCurrentIcon}
            >
              <Popup>{t("map.recording.current") || "ตำแหน่งปัจจุบัน"}</Popup>
            </Marker>
          </>
        )}

        {/* Toggle Routes Button */}
        {activeRoutes.length > 0 && (
          <div className="absolute top-36 right-4 z-[1000]">
            <button
              onClick={toggleRoutesVisibility}
              className="bg-white p-3 rounded-full shadow-lg"
              title={showRoutes ? "ซ่อนเส้นทาง" : "แสดงเส้นทาง"}
            >
              {showRoutes ? (
                <Route className="h-6 w-6 text-blue-600" />
              ) : (
                <EyeOff className="h-6 w-6 text-blue-600" />
              )}
            </button>
          </div>
        )}

        {/* ✅ WRAPPED IN CLUSTER GROUP */}
        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createClusterCustomIcon}
          maxClusterRadius={40} // ระยะห่างในการรวมกลุ่ม
          spiderfyOnMaxZoom={true} // แตกตัวเมื่อซูมสุด
        >
          {/* Static Data Markers */}
          {accessibleLocations.map((location) => (
            <LocationMarker key={location.id} location={location} />
          ))}

          {sampleObstacles.map((obstacle) => (
            <ObstacleMarker key={obstacle.id} obstacle={obstacle} />
          ))}
        </MarkerClusterGroup>

        {/* Search Result Marker */}
        {searchPosition && (
          <Marker
            position={searchPosition as L.LatLngExpression}
            icon={searchResultIcon}
          >
            <Popup>{t("map.search.result") || "ผลการค้นหา"}</Popup>
          </Marker>
        )}

        <CurrentLocationMarker />
        <LocationButton />
      </MapContainer>
    </div>
  );
}
