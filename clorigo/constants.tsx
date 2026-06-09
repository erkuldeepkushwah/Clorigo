import { 
  Code, 
  Smartphone, 
  Palette, 
  BarChart, 
  ShoppingCart, 
  ShieldCheck, 
  BrainCircuit, 
  Bot, 
  Sparkles,
  Briefcase,
  Smile,
  Award,
  Clock,
  MapPin,
  Mail,
  Phone
} from 'lucide-react';
import { NavItem, Service, Stat, ContactInfo } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'HOME', href: '#home' },
  { label: 'ABOUT', href: '#about' },
  { label: 'SERVICES', href: '#services' },
  { label: 'CAREER', href: '#career' },
  { label: 'CONNECT', href: '#contact' },
];

export const SERVICES: Service[] = [
  {
    title: 'Web Development',
    description: 'Robust and scalable web applications tailored to your business needs using React, Node.js, and more.',
    icon: Code,
  },
  {
    title: 'Mobile App Dev',
    description: 'Native and Cross-platform mobile solutions for iOS and Android that engage users on the go.',
    icon: Smartphone,
  },
  {
    title: 'UI/UX Design',
    description: 'Intuitive and visually stunning interfaces that provide seamless user experiences across all devices.',
    icon: Palette,
  },
  {
    title: 'Digital Marketing',
    description: 'Data-driven SEO, SEM, and social media strategies to boost your online presence and ROI.',
    icon: BarChart,
  },
  {
    title: 'E-Commerce',
    description: 'Custom online store development with secure payment gateways and inventory management.',
    icon: ShoppingCart,
  },
  {
    title: 'Cyber Security',
    description: 'Protect your digital assets with our advanced security audits and implementation services.',
    icon: ShieldCheck,
  },
  {
    title: 'Machine Learning',
    description: 'Advanced algorithms that enable systems to learn from data, identify patterns, and make intelligent decisions.',
    icon: BrainCircuit,
  },
  {
    title: 'Agentic AI',
    description: 'Autonomous AI agents capable of planning, reasoning, and executing complex workflows with minimal supervision.',
    icon: Bot,
  },
  {
    title: 'Generative AI',
    description: 'State-of-the-art models for creating original content, code, and designs to accelerate innovation.',
    icon: Sparkles,
  },
];

export const STATS: Stat[] = [
  { count: '500+', label: 'Projects Done', icon: Briefcase },
  { count: '98%', label: 'Client Satisfaction', icon: Smile },
  { count: '10+', label: 'Years Experience', icon: Clock },
  { count: '25+', label: 'Winning Awards', icon: Award },
];

export const CONTACT_INFO: ContactInfo[] = [
  {
    type: 'Our Location',
    content: ['123 Tech Park, Innovation Street, Indore, MP, India'],
    icon: MapPin,
  },
  {
    type: 'Email Us',
    content: ['clorigoindia@gmail.com'],
    icon: Mail,
  },
  {
    type: 'Call Us',
    content: ['+91 70008 19632'],
    icon: Phone,
  },
];