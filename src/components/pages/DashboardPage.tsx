import { Navigate } from 'react-router';
import type { User } from '@/types';

interface Props {
  user: User | null | undefined;
}

export const DashboardPage = ({ user }: Props) => {
  if (user === null) {
    return <Navigate to="/auth/login" replace />;
  }

  if (user === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>ダッシュボード</h1>
      <p>{user.familyName}</p>
    </>
  );
};
