import { Routes, Route } from 'react-router';
import { Button } from './components/ui/button';

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
        <Route path="sign-up" element={<div>サインアップページ</div>} />
        <Route path="login" element={<div>ログインページ</div>} />
        <Route path="logout" element={<div>ログアウトページ</div>} />
      </Route>
    </Routes>
  );
};

export default App;
