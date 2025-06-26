import type React from 'react';
import { FormLabel as ShadcnLabel } from '../ui';
import { cn } from '@/lib/utils';

type Props = React.ComponentProps<typeof ShadcnLabel> & {
  required?: boolean;
};

export const FormLabel = ({
  children,
  className,
  required,
  ...props
}: Props) => {
  const clsName = required ? cn('gap-0.5', className) : className;

  return (
    <ShadcnLabel className={clsName} {...props}>
      {children}
      {required && <span className="pt-0.5">*</span>}
    </ShadcnLabel>
  );
};
