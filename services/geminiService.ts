
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async suggestDetails(productName: string) {
    if (!productName || productName.length < 3) return null;
    
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Предложи краткие технические характеристики и стандартную упаковку/единицы измерения для товара: "${productName}". Ответь на русском языке.`,
        config: {
          temperature: 0.7,
          maxOutputTokens: 150,
        }
      });
      return response.text;
    } catch (error) {
      console.error("Gemini suggestion error:", error);
      return null;
    }
  }
}

export const geminiService = new GeminiService();
