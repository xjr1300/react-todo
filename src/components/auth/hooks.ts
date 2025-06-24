import { signUp } from '@/api';
import { useMutation } from '@tanstack/react-query';

export const useSignUp = () => {
  return useMutation({
    mutationFn: signUp,
  });
};
