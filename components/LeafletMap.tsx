"use client";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";

type Props = {
  lat: number;
    lng: number;
    loc?: string;
};

const LeafletMap = ({ lat, lng }: Props) => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = L.map(mapRef.current).setView([lat, lng], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    L.marker([lat, lng]).addTo(map).bindPopup("Our Location").openPopup();

    return () => {
      map.remove();
    };
  }, [lat, lng]);

  return (
    <div
      ref={mapRef}
      className="h-full w-full rounded-md"
    />
  );
};

export default LeafletMap;
