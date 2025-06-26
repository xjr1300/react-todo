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
import { cn } from '@/lib/utils';
import { createElement, useState } from 'react';
import { FormLabel } from './FormLabel';

interface PasswordFieldProps {
  name?: string;
  id?: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  description?: string;
  autoComplete?: React.HTMLInputAutoCompleteAttribute;
}

export const PasswordField = ({
  label = 'パスワード',
  name = 'password',
  id,
  required = true,
  placeholder = 'パスワードを入力',
  description,
  autoComplete = 'current-password',
}: PasswordFieldProps) => {
  const { control, getFieldState } = useFormContext();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const inputId = id ?? crypto.randomUUID();
  const error = getFieldState(name).error;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={inputId} required={required}>
            {label}
          </FormLabel>
          <FormControl>
            {/*
            <Input
              {...field}
              type={passwordVisibility ? 'text' : 'password'}
              autoComplete="on"
              placeholder={placeholder}
              className={cn('pr-2', error && 'border-destructive')}
            />
            */}
            {/* FIXME: The border of the input was not rendered with destructive color */}
            <Box className="relative">
              <Input
                {...field}
                id={inputId}
                type={passwordVisibility ? 'text' : 'password'}
                autoComplete={autoComplete}
                placeholder={placeholder}
                className={cn('pr-2', error && 'border-destructive')}
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
