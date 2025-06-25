import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
  Input,
} from '../ui';
import { FormLabel } from './FormLabel';

interface InputFieldProps {
  type: React.HTMLInputTypeAttribute;
  name: string;
  id?: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  description?: string;
}

export const InputField = ({
  type,
  name,
  id,
  label,
  required = false,
  placeholder,
  description,
}: InputFieldProps) => {
  const { control } = useFormContext();
  const inputId = id ?? crypto.randomUUID();

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
            <Input
              type={type}
              id={inputId}
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
