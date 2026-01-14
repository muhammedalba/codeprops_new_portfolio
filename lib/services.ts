import { 
  Globe2, 
  Code2, 
  Smartphone, 
  Cpu, 
  Check, 
  LucideIcon 
} from "lucide-react";

export const serviceSlugs = [
  'web',
  'custom',
  'ecommerce',
  'cloud',
  'performance'
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

export const serviceIcons: Record<ServiceSlug, LucideIcon> = {
  web: Globe2,
  custom: Code2,
  ecommerce: Smartphone,
  cloud: Cpu,
  performance: Check,
};

export const isValidServiceSlug = (slug: string): slug is ServiceSlug => {
  return serviceSlugs.includes(slug as ServiceSlug);
};
