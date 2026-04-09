import { useMutation } from "@tanstack/react-query";
import { askOllama } from "@/services/ollama/askOllama";

export const useAskOllama = () => {
  return useMutation({
    mutationFn: ({
      prompt,
      signal,
    }: {
      prompt: string;
      signal?: AbortSignal;
    }) => askOllama(prompt, signal),

    onError: (error) => {
      console.error("Ошибка генерации:", error.message);
    },
  });
};
