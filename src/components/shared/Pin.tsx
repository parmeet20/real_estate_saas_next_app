"use client";
import { Bed } from "lucide-react";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { FC } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Data {
  id: string;
  latitude: number;
  longitude: number;
  image: string;
  title: string;
  bedrooms: string;
  price: number;
}
const customIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/128/149/149060.png',
  iconSize: [32, 32], // Size of the icon
  iconAnchor: [16, 32], // Anchor position of the icon (where the icon's tip will be positioned)
  popupAnchor: [0, -32] // Anchor position of the popup relative to the icon
});

const Pin: FC<{ item: Data }> = ({ item }) => {
  return (
    <Marker position={[item.latitude, item.longitude]} icon={customIcon}>
      <Popup>
        <div className="popupContainer">
          <CldImage
            src={item.image}
            className="h-[100px] w-full"
            alt={item.title}
            width={100}
            height={100}
          />
          <div className="text-container">
            <Link href={`/properties/${item.id}`}>{item.title}</Link>
            <div className="flex items-center">
              <Bed className="mr-1" />
              {item.bedrooms}
            </div>
            <b>${item.price}</b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default Pin;
