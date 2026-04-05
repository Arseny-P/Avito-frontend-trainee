// services/hooks/useOllama.ts
import { useMutation } from '@tanstack/react-query';
import { askOllama } from '../ollama/askOllama'; // Импортируем функцию из шага 1

export const useAskOllama = () => {
  return useMutation({
    mutationFn: (prompt: string) => askOllama(prompt),
    
    onError: (error) => {
      console.error("Ошибка генерации:", error.message);
    }
  });
};