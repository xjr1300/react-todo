import type { PropsWithChildren } from 'react';

const CenteredLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      {children}
    </div>
  );
};

export default CenteredLayout;
