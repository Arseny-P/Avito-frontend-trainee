// services/ollama/api.ts
import axios from 'axios';
import { OLLAMA_API_URL, OLLAMA_MODEL } from "./options";

export const askOllama = async (prompt: string, signal?: AbortSignal): Promise<string> => {
  try {
    const response = await axios.post(OLLAMA_API_URL, {
      model: OLLAMA_MODEL,
      messages: [
        { 
          role: "user", 
          content: prompt 
        }
      ],
      stream: false,
      options: {
        temperature: 0.5
      }
    }, {
      signal
    });

    if(!response.data?.message?.content){
        throw new Error("Нет ответа");
    }
    return response.data.message.content;
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || error.message;
    console.error("Ollama Axios Error:", errorMessage);
    throw new Error(errorMessage);
  }
};