import type { PropsWithChildren } from 'react';

export const CenteredLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      {children}
    </div>
  );
};
