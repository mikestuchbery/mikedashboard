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
    artist: "Johannes Vermeer"
  },
  {
    url: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?q=80&w=2000&auto=format&fit=crop",
    title: "Self-Portrait",
    artist: "Vincent van Gogh"
  },
  {
    url: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=2000&auto=format&fit=crop",
    title: "The Great Wave",
    artist: "Katsushika Hokusai"
  },
  {
    url: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=2000&auto=format&fit=crop",
    title: "Mona Lisa",
    artist: "Leonardo da Vinci"
  }
];

export const SOMAFM_CHANNELS = [
  { name: "Groove Salad", id: "groovesalad", url: "https://somafm.com/groovesalad130.mp3" },
  { name: "Deep Space One", id: "deepspaceone", url: "https://somafm.com/deepspaceone130.mp3" },
  { name: "Drone Zone", id: "dronezone", url: "https://somafm.com/dronezone130.mp3" },
  { name: "Lush", id: "lush", url: "https://somafm.com/lush130.mp3" }
];
