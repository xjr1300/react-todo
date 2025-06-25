import { signUp, login } from '@/api';
import { useMutation } from '@tanstack/react-query';

export const useSignUp = () => {
  return useMutation({
    mutationFn: signUp,
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};
