export interface WatchTransform {
  posX: number;
  posY: number;
  posZ: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  scale: number;
  lightIntensity: number;
}

export interface ChapterData {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  headline: string;
  description: string;
  theme: "dark" | "light";
  bgColor: string;
  transform: WatchTransform;
  mobileTransform: WatchTransform;
  annotations?: Array<{
    id: string;
    label: string;
    detail: string;
    x: number; // percentage
    y: number; // percentage
  }>;
}
