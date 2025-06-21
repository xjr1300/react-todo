import { Routes, Route } from 'react-router';
import { Button } from './components/ui/button';
import CenteredLayout from './layouts/CenteredLayout';

const App = () => {
  return (
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
        <Route
          path="sign-up"
          element={<CenteredLayout>サインアップページ</CenteredLayout>}
        />
        <Route
          path="login"
          element={<CenteredLayout>ログインページ</CenteredLayout>}
        />
        <Route
          path="logout"
          element={<CenteredLayout>ログアウトページ</CenteredLayout>}
        />
      </Route>
    </Routes>
  );
};

export default App;
