export interface Service {
  id: number;
  title: string;
  description: string;
  icon: any; // Lucide icon component type
}

export interface Stat {
  id: number;
  value: string;
  label: string;
}

export interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  image: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
