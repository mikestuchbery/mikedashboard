export type TaskStatus = 'daily' | 'in-progress' | 'blocked' | 'completed';

export interface Task {
  id: string;
  text: string;
  status: TaskStatus;
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
    url: "https://images.unsplash.com/photo-1576016770956-debb63d9df05?auto=format&fit=crop&q=80&w=2000",
    title: "The Milkmaid",
    artist: "Johannes Vermeer (Rijksmuseum)"
  },
  {
    url: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=2000",
    title: "Self-Portrait with Bandaged Ear",
    artist: "Vincent van Gogh (Courtauld Gallery)"
  },
  {
    url: "https://images.unsplash.com/photo-1580136608260-42d1c470186d?auto=format&fit=crop&q=80&w=2000",
    title: "The Great Wave off Kanagawa",
    artist: "Katsushika Hokusai (Metropolitan Museum of Art)"
  },
  {
    url: "https://images.unsplash.com/photo-1578301978018-3005759f48f7?auto=format&fit=crop&q=80&w=2000",
    title: "Mona Lisa",
    artist: "Leonardo da Vinci (Louvre Museum)"
  }
];

export const SOMAFM_CHANNELS = [
  { name: "Groove Salad", id: "groovesalad", url: "https://ice6.somafm.com/groovesalad-128-mp3" },
  { name: "Deep Space One", id: "deepspaceone", url: "https://ice6.somafm.com/deepspaceone-128-mp3" },
  { name: "Drone Zone", id: "dronezone", url: "https://ice6.somafm.com/dronezone-128-mp3" },
  { name: "Lush", id: "lush", url: "https://ice6.somafm.com/lush-128-mp3" }
];
