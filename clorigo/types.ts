import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
}

export interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Stat {
  count: string;
  label: string;
  icon: LucideIcon;
}

export interface ContactInfo {
  type: string;
  content: string[];
  icon: LucideIcon;
}
