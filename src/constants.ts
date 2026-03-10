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
    url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2000&auto=format&fit=crop",
    title: "The Milkmaid",
    artist: "Johannes Vermeer (Rijksmuseum)"
  },
  {
    url: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?q=80&w=2000&auto=format&fit=crop",
    title: "Self-Portrait",
    artist: "Vincent van Gogh (Courtauld Gallery)"
  },
  {
    url: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=2000&auto=format&fit=crop",
    title: "The Great Wave",
    artist: "Katsushika Hokusai (Met)"
  },
  {
    url: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=2000&auto=format&fit=crop",
    title: "Mona Lisa",
    artist: "Leonardo da Vinci (Louvre)"
  },
  {
    url: "https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?q=80&w=2000&auto=format&fit=crop",
    title: "Starry Night",
    artist: "Vincent van Gogh (MoMA)"
  }
];

export const SOMAFM_CHANNELS = [
  { name: "Groove Salad", id: "groovesalad", url: "https://ice6.somafm.com/groovesalad-128-mp3" },
  { name: "Deep Space One", id: "deepspaceone", url: "https://ice6.somafm.com/deepspaceone-128-mp3" },
  { name: "Drone Zone", id: "dronezone", url: "https://ice6.somafm.com/dronezone-128-mp3" },
  { name: "Lush", id: "lush", url: "https://ice6.somafm.com/lush-128-mp3" }
];
