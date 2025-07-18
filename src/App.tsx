import { Routes, Route } from 'react-router';
import { Button } from './components/ui';
import { CenteredLayout } from './components/layouts';
import {
  CreateTodoPage,
  DashboardPage,
  LoginPage,
  SignUpPage,
} from './components/pages';
import { Toaster } from './components/ui';
import { useAuthStore } from './stores/auth';

const App = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <>
      <Routes>
        <Route
          index
          element={
            <div className="flex min-h-svh flex-col items-center justify-center">
              <Button>Click me</Button>
            </div>
          }
        />
        <Route path="auth">
          <Route path="sign-up" element={<SignUpPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route
            path="logout"
            element={<CenteredLayout>ログアウトページ</CenteredLayout>}
          />
        </Route>
        <Route path="todos" element={<DashboardPage user={user} />} />
        <Route path="todos/create" element={<CreateTodoPage />} />
      </Routes>
      <Toaster position="bottom-right" closeButton />
    </>
  );
};

export default App;
