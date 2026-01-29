import { Monitor, Layers, Cloud, Zap, Sparkles, LucideIcon } from "lucide-react";

export interface ProjectType {
  id: string;
  icon: LucideIcon;
  label: string;
  color: string;
}

export const getProjectTypes = (t: { web: string; mobile: string; cloud: string; consulting: string; other: string }): ProjectType[] => [
  { id: "web", icon: Monitor, label: t.web, color: "red" },
  { id: "mobile", icon: Layers, label: t.mobile, color: "green" },
  { id: "cloud", icon: Cloud, label: t.cloud, color: "blue" },
  { id: "consulting", icon: Zap, label: t.consulting, color: "green" },
  { id: "other", icon: Sparkles, label: t.other, color: "red" },
];
