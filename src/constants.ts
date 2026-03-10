export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

export interface Quote {
  text: string;
  author: string;
  context: string;
}

export type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

export const CLASSIC_ART_COLLECTION = [
  {
    url: "https://images.unsplash.com/photo-1576016770956-debb63d9df05?q=80&w=2000&auto=format&fit=crop",
    title: "The Milkmaid",
    artist: "Johannes Vermeer (Rijksmuseum)"
  },
  {
    url: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=2000&auto=format&fit=crop",
    title: "Self-Portrait with Bandaged Ear",
    artist: "Vincent van Gogh (Courtauld Gallery)"
  },
  {
    url: "https://images.unsplash.com/photo-1580136608260-42d1c470186d?q=80&w=2000&auto=format&fit=crop",
    title: "The Great Wave off Kanagawa",
    artist: "Katsushika Hokusai (Metropolitan Museum of Art)"
  },
  {
    url: "https://images.unsplash.com/photo-1578301978018-3005759f48f7?q=80&w=2000&auto=format&fit=crop",
    title: "Mona Lisa",
    artist: "Leonardo da Vinci (Louvre Museum)"
  },
  {
    url: "https://images.unsplash.com/photo-1577083282163-518344bf7475?q=80&w=2000&auto=format&fit=crop",
    title: "The Starry Night",
    artist: "Vincent van Gogh (MoMA)"
  },
  {
    url: "https://images.unsplash.com/photo-1584728423935-95730d065f31?q=80&w=2000&auto=format&fit=crop",
    title: "A Sunday Afternoon on the Island of La Grande Jatte",
    artist: "Georges Seurat (Art Institute of Chicago)"
  }
];

export const SOMAFM_CHANNELS = [
  { name: "Groove Salad", id: "groovesalad", url: "https://ice6.somafm.com/groovesalad-128-mp3" },
  { name: "Deep Space One", id: "deepspaceone", url: "https://ice6.somafm.com/deepspaceone-128-mp3" },
  { name: "Drone Zone", id: "dronezone", url: "https://ice6.somafm.com/dronezone-128-mp3" },
  { name: "Lush", id: "lush", url: "https://ice6.somafm.com/lush-128-mp3" }
];
