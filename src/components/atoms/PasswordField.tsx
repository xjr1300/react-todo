import { EyeOffIcon, EyeIcon } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { Box } from './Box';
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createElement, useState } from 'react';
import { FormLabel } from './FormLabel';

interface PasswordFieldProps {
  label?: string;
  name?: string;
  required?: boolean;
  placeholder?: string;
  description?: string;
}

export const PasswordField = ({
  label = 'パスワード',
  name = 'password',
  required = true,
  placeholder = 'パスワードを入力',
  description,
}: PasswordFieldProps) => {
  const { control, getFieldState } = useFormContext();
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel required={required}>{label}</FormLabel>
          <FormControl>
            <Box className="relative">
              <Input
                {...field}
                type={passwordVisibility ? 'text' : 'password'}
                autoComplete="on"
                placeholder={placeholder}
                className={`pr-12 ${
                  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                  getFieldState(name).error && 'border-destructive'
                }`}
              />
              <Box
                className="absolute inset-y-0 right-0 flex cursor-pointer items-center p-3 text-muted-foreground"
                onClick={() => {
                  setPasswordVisibility(!passwordVisibility);
                }}
              >
                {createElement(passwordVisibility ? EyeOffIcon : EyeIcon, {
                  className: 'h-6 w-6',
                })}
              </Box>
            </Box>
          </FormControl>
          <FormMessage />
          {description && <FormDescription>{description}</FormDescription>}
        </FormItem>
      )}
    />
  );
};
