import { useAuthStore } from '@/stores/auth';
import { Navigate } from 'react-router';

export const DashboardPage = () => {
  const user = useAuthStore((state) => state.user);

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
