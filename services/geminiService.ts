import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { OptimizationSelections, ChatMessage } from './types';

// IMPORTANT: Do not expose this key publicly. It is assumed that
// process.env.API_KEY is securely managed in the deployment environment.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY is not set in environment variables.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const baseSystemInstruction = `You are the Agentic AI Optimiser, a world-class expert system. Your goal is to help users orchestrate, analyze, and optimize complex AI systems and agents.
Provide clear, expert-level responses. When generating code, use markdown code blocks with the language specified. For diagrams, use mermaidjs syntax inside a markdown code block.
Your response should include:
1.  **System Architecture Diagram:** A high-level diagram (using mermaidjs) showing how the selected components interact.
2.  **Workflow Description:** A detailed, step-by-step explanation of the integrated workflow.
3.  **Curated Code Snippets:** Representative Python code snippets for key parts of the process.
4.  **Usage Examples:** A practical example of how this configuration could be applied to a real-world problem.
5.  **Documentation & Rationale:** Explain the choices, trade-offs, and configuration options.
`;

export const getQuickAnalysis = async (selections: OptimizationSelections): Promise<GenerateContentResponse> => {
  const { tree, func, model, algo } = selections;
  const prompt = `
Generate a quick analysis for the following optimization configuration:
- Tree: ${tree}
- Function: ${func}
- Model: ${model}
- Algorithm: ${algo}

Focus on a high-level overview and the primary synergy between these components. Keep the response concise.
`;

  return await ai.models.generateContent({
    // FIX: Updated model name to 'gemini-flash-lite-latest' as per coding guidelines.
    model: 'gemini-flash-lite-latest',
    contents: prompt,
    config: {
      systemInstruction: baseSystemInstruction,
    }
  });
};

export const getDeepDive = async (selections: OptimizationSelections): Promise<GenerateContentResponse> => {
  const { tree, func, model, algo } = selections;
  const prompt = `
Generate a deep-dive, comprehensive analysis and implementation plan for the following optimization configuration:
- Tree: ${tree}
- Function: ${func}
- Model: ${model}
- Algorithm: ${algo}
`;
  return await ai.models.generateContent({
    model: 'gemini-2.5-pro',
    contents: prompt,
    config: {
      systemInstruction: baseSystemInstruction,
      thinkingConfig: { thinkingBudget: 32768 },
    },
  });
};


export const analyzeImageWithPrompt = async (base64Image: string, mimeType: string, prompt: string): Promise<GenerateContentResponse> => {
    const imagePart = {
        inlineData: {
            data: base64Image,
            mimeType,
        },
    };
    const textPart = { text: prompt };

    return await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [imagePart, textPart] },
    });
};

export const createChat = (): Chat => {
    return ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: 'You are a helpful and friendly AI assistant. Answer questions clearly and concisely.'
        }
    });
};

export const searchWithGrounding = async (query: string, location: { latitude: number; longitude: number } | null): Promise<GenerateContentResponse> => {
    const tools = location ? [{ googleMaps: {} }] : [{ googleSearch: {} }];
    const toolConfig = location ? {
        retrievalConfig: {
            latLng: location
        }
    } : {};

    return await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: query,
        config: {
            tools,
            ...(Object.keys(toolConfig).length > 0 && { toolConfig })
        },
    });
};