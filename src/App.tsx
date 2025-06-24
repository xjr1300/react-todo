import { Routes, Route } from 'react-router';
import { Button } from './components/ui';
import { CenteredLayout } from './layouts';
import { LoginPage, SignUpPage } from './pages';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
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
      </Routes>
    </>
  );
};

export default App;
