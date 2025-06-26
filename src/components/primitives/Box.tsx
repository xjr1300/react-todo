import { cn } from '@/lib/utils';
import React from 'react';

type BoxProps = React.HTMLAttributes<HTMLDivElement>;

export const Box = ({
  ref,
  className,
  ...props
}: BoxProps & { ref?: React.RefObject<HTMLDivElement | null> }) => (
  <div className={cn(className)} ref={ref} {...props} />
);
