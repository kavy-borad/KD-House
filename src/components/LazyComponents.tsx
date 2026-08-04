import { lazy } from "react";

// Lazy load heavy sections of the Home page
export const TechStackSection = lazy(() => import("./Home/TechStackSection"));
export const ServicesSection = lazy(() => import("./Home/ServicesSection"));
export const WhyChooseUsSection = lazy(
  () => import("./Home/WhyChooseUsSection"),
);
