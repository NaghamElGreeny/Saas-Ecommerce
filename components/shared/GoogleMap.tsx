import { GoogleMap, Marker } from "@react-google-maps/api";
import {  useState, useCallback } from "react";
import { useGoogleMapsLoader } from "@/utils/useGoogleMapsLoader";

const containerStyle = {
  width: "100%",
  height: "300px",
  borderRadius: "10px",
};

const defaultCenter = {
  lat: 31.2001,
  lng: 29.9187,
};

type Props = {
  onLocationSelect: (coords: { lat: number; lng: number }, address: string) => void;
};

const GoogleMapSelector = ({ onLocationSelect }: Props) => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  const { isLoaded } = useGoogleMapsLoader(); // <-- استخدام الـ hook المشترك

  const handleMapClick = useCallback(
    (e: google.maps.MapMouseEvent) => {
      if (!e.latLng) return;

      const coords = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };
      setLocation(coords);

      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: coords }, (results, status) => {
        if (status === "OK" && results?.[0]) {
          onLocationSelect(coords, results[0].formatted_address);
        } else {
          onLocationSelect(coords, "");
        }
      });
    },
    [onLocationSelect]
  );

  if (!isLoaded) return <div className="bg-gray-100 p-4 text-center">Loading map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={location || defaultCenter}
      zoom={location ? 15 : 6}
      onClick={handleMapClick}
      options={{
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      }}
    >
      {location && <Marker position={location} />}
    </GoogleMap>
  );
};

export default GoogleMapSelector;
