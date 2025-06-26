import React from 'react';
import { Link as RouterLink } from 'react-router';
import { cn } from '@/lib/utils';

type Props = React.ComponentProps<typeof RouterLink>;

export const Link = ({ children, className, ...props }: Props) => {
  return (
    <RouterLink className={cn('text-link', className)} {...props}>
      {children}
    </RouterLink>
  );
};
