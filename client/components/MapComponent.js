"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// --- FIX: Use CDN URLs for default Leaflet icons ---
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function MapComponent({ lat, lon, risk, neighbors = [] }) {
  return (
    <MapContainer
      center={[lat, lon]}
      zoom={13}
      scrollWheelZoom
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      <Marker position={[lat, lon]}>
        <Popup>
          আপনার ক্ষেত্র - ঝুঁকি: {risk ? risk.level : "লোড হচ্ছে..."}
        </Popup>
      </Marker>

      {neighbors.map((n) => (
        <CircleMarker
          key={n.id}
          center={[n.lat, n.lon]}
          pathOptions={{ color: n.color, fillColor: n.color }}
          radius={10}
        >
          <Popup>
            <div className="text-sm">
              ফসল: {n.crop} <br />
              ঝুঁকি: {n.risk} <br />
              সর্বশেষ আপডেট: {n.lastUpdate}
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
