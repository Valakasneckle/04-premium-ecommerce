import { Category } from "@/types";

export interface CategoryItem {
  id: Category;
  label: string;
  description: string;
}

export const categories: CategoryItem[] = [
  {
    id: "smart-speakers",
    label: "Smart Speakers",
    description: "Room-filling audio and voice control for every space.",
  },
  {
    id: "headphones",
    label: "Headphones",
    description: "Premium wireless audio for work, travel, and focus.",
  },
  {
    id: "keyboards",
    label: "Keyboards",
    description: "Mechanical precision for creators and professionals.",
  },
  {
    id: "smartwatches",
    label: "Smart Watches",
    description: "Health tracking and connectivity on your wrist.",
  },
  {
    id: "monitors",
    label: "Monitors",
    description: "4K displays built for productivity and creative work.",
  },
  {
    id: "docking-stations",
    label: "Docking Stations",
    description: "One-cable setups for a cleaner workspace.",
  },
  {
    id: "cameras",
    label: "Cameras",
    description: "Studio-quality video for streaming and meetings.",
  },
  {
    id: "accessories",
    label: "Accessories",
    description: "Ergonomic essentials that complete your setup.",
  },
];
