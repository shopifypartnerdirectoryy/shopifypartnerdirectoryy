export const SERVICE_GROUPS = [
  { name: "Marketing and sales", services: ["SEO", "Paid media", "Email & SMS marketing", "Conversion rate optimization", "Analytics & tracking"] },
  { name: "Store setup and management", services: ["Store setup", "Store migration"] },
  { name: "Development and troubleshooting", services: ["Custom apps", "Headless commerce", "Troubleshooting"] },
  { name: "Visual content and branding", services: ["Custom theme design", "Theme customization"] },
] as const;

export function directoryFilterUrl(key: "service" | "country", value: string) {
  return `/?${key}=${encodeURIComponent(value)}#experts`;
}