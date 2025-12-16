export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  notes: string;
}

export interface WorkoutPlan {
  title: string;
  durationMinutes: number;
  exercises: Exercise[];
  intensity: 'Low' | 'Medium' | 'High' | 'Brutal';
}

export interface UserStats {
  streak: number;
  caloriesBurned: number;
  workoutsCompleted: number;
  currentWeight: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export type AppView = 'dashboard' | 'lab' | 'subscription';