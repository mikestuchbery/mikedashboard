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

export const LANDSCAPE_COLLECTION = [
  {
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop",
    title: "Mountain Peaks",
    location: "Alps"
  },
  {
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2000&auto=format&fit=crop",
    title: "Sunlit Forest",
    location: "Pacific Northwest"
  },
  {
    url: "https://images.unsplash.com/photo-1505118380757-91f5f45d8de4?q=80&w=2000&auto=format&fit=crop",
    title: "Tropical Shore",
    location: "Maldives"
  },
  {
    url: "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?q=80&w=2000&auto=format&fit=crop",
    title: "Golden Desert",
    location: "Sahara"
  },
  {
    url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2000&auto=format&fit=crop",
    title: "Misty Valley",
    location: "Highlands"
  }
];
