import { GoogleGenAI, Type } from "@google/genai";
import { ImprovementSuggestion, BridgeStats } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const generateImprovement = async (
  currentStats: BridgeStats,
  repoContext: string,
  availableRepos?: string[]
): Promise<ImprovementSuggestion> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `
      You are the Solaris-CET Intelligence Bridge Agent. 
      Current Bridge Stats: ${JSON.stringify(currentStats)}
      Repository Context: ${repoContext}
      ${availableRepos ? `Available Repositories to improve: ${availableRepos.join(", ")}` : ""}
      
      Your goal is to improve the bridge between AI and high intelligence across the user's entire GitHub ecosystem.
      Suggest a specific improvement in design, marketing, code, or security.
      If you suggest an improvement for a specific repository from the available list, specify it in the 'repo' field.
      Return a JSON object matching the ImprovementSuggestion interface.
    `,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          category: { type: Type.STRING },
          repo: {
            type: Type.OBJECT,
            properties: {
              owner: { type: Type.STRING },
              name: { type: Type.STRING },
            },
            required: ["owner", "name"],
          },
          codeChanges: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                path: { type: Type.STRING },
                content: { type: Type.STRING },
              },
            },
          },
          status: { type: Type.STRING },
        },
        required: ["id", "title", "description", "category", "status"],
      },
    },
  });

  return JSON.parse(response.text || "{}");
};

export const analyzeActivity = async (activityData: any): Promise<string> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze this web activity data and provide a brief strategic insight for the Solaris-CET project: ${JSON.stringify(activityData)}`,
  });
  return response.text || "No insights available.";
};
