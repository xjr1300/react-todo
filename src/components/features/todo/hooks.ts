import { useMutation } from '@tanstack/react-query';
import { createTodo } from '@/api';

export const useCreateTodo = () => {
  return useMutation({
    mutationFn: createTodo,
  });
};
