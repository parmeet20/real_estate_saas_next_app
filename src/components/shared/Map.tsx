/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Pin from "./Pin";

interface Item {
  id: string;
  latitude: number;
  longitude: number;
  image: string;
  title: string;
  bedrooms: string;
  price: number;
}

interface Props {
  items: Item[];
}
const Map: React.FC<Props> = ({ items }) => {
  const position: [number, number] = [60.1695, 24.9354];

  return (
    <MapContainer
      center={position}
      zoom={13}
      className="w-full h-[300px] rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {items.map((item) => (
        <Pin item={item} key={item.id}></Pin>
      ))}
    </MapContainer>
  );
};

export default Map;
