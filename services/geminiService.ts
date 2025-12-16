import { GoogleGenAI, Type, Schema } from "@google/genai";
import { WorkoutPlan } from '../types';

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const WORKOUT_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "A punchy, aggressive title for the workout." },
    durationMinutes: { type: Type.INTEGER, description: "Estimated total duration." },
    intensity: { type: Type.STRING, enum: ['Low', 'Medium', 'High', 'Brutal'] },
    exercises: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          sets: { type: Type.INTEGER },
          reps: { type: Type.STRING },
          notes: { type: Type.STRING, description: "Brief, direct cue on form or tempo." }
        },
        required: ["name", "sets", "reps", "notes"]
      }
    }
  },
  required: ["title", "durationMinutes", "intensity", "exercises"]
};

export const generateWorkout = async (
  goal: string,
  time: string,
  equipment: string
): Promise<WorkoutPlan> => {
  try {
    const prompt = `
      Create a workout plan.
      Goal: ${goal}
      Time available: ${time}
      Equipment: ${equipment}
      
      Tone: Aggressive, direct, elite coach. No fluff.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: WORKOUT_SCHEMA,
        systemInstruction: "You are Momentum, an elite strength and conditioning AI. Your goal is maximum efficiency. Do not waste words."
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as WorkoutPlan;
    }
    throw new Error("No data returned");
  } catch (error) {
    console.error("Gemini Workout Generation Error:", error);
    throw error;
  }
};

export const askCoach = async (question: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: question,
      config: {
        systemInstruction: "You are Momentum. Answer in under 50 words. Be bold, slightly arrogant but helpful, and extremely direct. Use the user's data context if implied."
      }
    });
    return response.text || "System offline. Try again.";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "Connection severed.";
  }
};