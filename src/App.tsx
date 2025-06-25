import { Routes, Route } from 'react-router';
import { Button } from './components/ui';
import { CenteredLayout } from './layouts';
import { CreateTodoPage, DashboardPage, LoginPage, SignUpPage } from './pages';
import { Toaster } from './components/ui';

const App = () => {
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
        <Route path="todos" element={<DashboardPage />} />
        <Route path="todos/create" element={<CreateTodoPage />} />
      </Routes>
      <Toaster position="bottom-right" closeButton />
    </>
  );
};

export default App;
