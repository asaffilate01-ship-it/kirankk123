import {
  BrainCircuit,
  Cloud,
  CreditCard,
  Layers3,
  MonitorSmartphone,
  ShieldCheck,
  ShoppingBag,
  Users,
  UtensilsCrossed,
  Store,
  CalendarDays,
  GraduationCap,
  Building2,
  type LucideIcon,
} from "lucide-react";

export const services: [LucideIcon, string, string][] = [
  [BrainCircuit, "AI & automation", "Practical AI, intelligent assistants and automation designed around business needs."],
  [Layers3, "Software & SaaS", "Custom platforms, portals, dashboards and workflows built for secure growth."],
  [MonitorSmartphone, "Web & mobile apps", "Responsive web applications and mobile experiences for customers and teams."],
  [ShoppingBag, "Websites & ecommerce", "Corporate websites, online stores, bookings and digital customer journeys."],
  [CreditCard, "EPOS & payments", "Connected selling, ordering and payment experiences for modern businesses."],
  [Cloud, "Cloud & integrations", "Cloud systems, APIs, databases and integrations that keep information moving."],
  [ShieldCheck, "Security & compliance", "Security-minded design, permissions, auditability and data protection support."],
  [Users, "Support & improvement", "Ongoing maintenance, monitoring, optimisation and product development."],
];

export const groups: [string, string[]][] = [
  ["AI & automation", ["AI strategy and readiness", "Business process automation", "AI assistants and copilots", "Knowledge and document intelligence", "Data analysis and forecasting", "Responsible AI support"]],
  ["Software & platforms", ["Custom business software", "SaaS platform development", "Customer and staff portals", "Workflow and case management", "Dashboards and reporting", "System modernisation"]],
  ["Web & mobile", ["Corporate and service websites", "Ecommerce experiences", "Web applications", "iOS and Android apps", "Progressive web apps", "Accessible responsive design"]],
  ["Commerce & operations", ["EPOS solutions", "Online ordering", "Bookings and reservations", "Payment integrations", "Customer loyalty journeys", "Multi-location operations"]],
  ["Cloud & data", ["Cloud architecture", "Secure databases", "API development", "Third-party integrations", "Data migration", "Monitoring and resilience"]],
  ["Ongoing services", ["Product discovery", "UI and UX design", "Testing and quality assurance", "Maintenance and support", "Security improvement", "Continuous development"]],
];

export const industries: [LucideIcon, string, string, string][] = [
  [UtensilsCrossed, "Hospitality & food", "Connected operations", "EPOS, ordering, kitchen workflows, loyalty and multi-location reporting."],
  [Store, "Retail & ecommerce", "Unified commerce", "Websites, checkout, stock, fulfilment and customer experiences."],
  [CalendarDays, "Events & venues", "Bookings and marketplaces", "Discovery, availability, booking, vendor tools and communication."],
  [GraduationCap, "Education & training", "Learning technology", "Learning portals, course delivery, assessment and administration."],
  [Building2, "Property & construction", "Project technology", "Planning, documents, approvals, inspections and project workflows."],
  [ShieldCheck, "Professional services", "Secure client services", "Onboarding, document collection, workflows and reporting."],
];

export const faqs: [string, string][] = [
  ["Can you improve an existing system?", "Yes. We can assess and improve an existing website, app or operational system without rebuilding everything unnecessarily."],
  ["Can you build the website, app and backend together?", "Yes. We can deliver the customer experience, administration tools, cloud services and integrations as one connected project."],
  ["Can AI work with our current software?", "Often, yes. AI can be added through secure integrations while existing systems remain in place."],
  ["Can you connect EPOS, ordering and payments?", "Where providers offer suitable access, we can connect ordering, payments, operational workflows and reporting."],
  ["What happens after launch?", "We can provide monitoring, maintenance, support and a roadmap of measured improvements."],
];

export const legal: Record<string, [string, string]> = {
  privacy: ["Privacy notice", "We use information submitted through this website to respond to enquiries and provide our services. We do not sell personal information. You may request access, correction or deletion by emailing hello@itechlounge.co.uk."],
  terms: ["Website terms", "This website provides general information about iTechLounge. Project scope, fees, responsibilities and third-party services are confirmed through separate written agreements."],
  cookies: ["Cookie notice", "This website uses essential browser storage to remember your preferences. Optional analytics or marketing technologies should remain disabled until consent is provided."],
};
