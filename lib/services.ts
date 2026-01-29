import { Icons } from "@/components/ui/icons";

export const serviceSlugs = [
  'web',
  'custom',
  'ecommerce',
  'cloud',
  'performance'
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

export const serviceIcons = {
  web: Icons.globe,
  custom: Icons.code,
  ecommerce: Icons.smartphone,
  cloud: Icons.cpu,
  performance: Icons.check,
};

export const isValidServiceSlug = (slug: string): slug is ServiceSlug => {
  return serviceSlugs.includes(slug as ServiceSlug);
};
