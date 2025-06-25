import { useMutation } from '@tanstack/react-query';
import { signUp, login } from '@/api';

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
