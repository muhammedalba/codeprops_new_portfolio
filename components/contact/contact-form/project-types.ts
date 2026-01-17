import { Monitor, Layers, Cloud, Zap, Sparkles } from "lucide-react";

export const getProjectTypes = (t: any) => [
  { id: "web", icon: Monitor, label: t.web, color: "red" },
  { id: "mobile", icon: Layers, label: t.mobile, color: "green" },
  { id: "cloud", icon: Cloud, label: t.cloud, color: "blue" },
  { id: "consulting", icon: Zap, label: t.consulting, color: "green" },
  { id: "other", icon: Sparkles, label: t.other, color: "red" },
];
