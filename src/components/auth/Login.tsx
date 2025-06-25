import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Form,
} from '../ui';
import { cn } from '@/lib/utils';
import { AppName, InputField, Link, PasswordField } from '../common';
import { AlertMessage } from '../features/AlertMessage';
import { type LoginData, LoginSchema } from '@/types';
import type { ApiError } from '@/api';
import { useLogin } from './hooks';

const Login = ({ className, ...props }: React.ComponentProps<'div'>) => {
  const form = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { mutate, isPending, isSuccess, isError, error } = useLogin();
  const navigate = useNavigate();

  const onSubmit = (values: LoginData) => {
    console.log('Login values:', values);
    mutate(values);
  };

  if (isSuccess) {
    toast.success('サインアップに成功しました。', { id: 'login-success' });
    void navigate('/dashboard');
  }

  if (isError) {
    const apiError = error as ApiError;
    console.error(apiError);
  }

  return (
    <div className={cn('flex flex-col gap-6 w-md', className)} {...props}>
      <Card>
        <CardHeader>
          <AppName />
          <CardTitle>ログイン</CardTitle>
          <CardDescription>
            Eメールアドレスとパスワードを入力してください。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="flex flex-col gap-3"
              onSubmit={(event) => void form.handleSubmit(onSubmit)(event)}
            >
              <InputField
                type="email"
                name="email"
                label="Eメールアドレス"
                required
                placeholder="Eメールアドレスを入力"
              />
              <PasswordField label="パスワード" name="password" />
              <Button className="w-full" type="submit" disabled={isPending}>
                {isPending ? '処理中...' : 'ログイン'}
              </Button>
              {isError && (
                <AlertMessage
                  title="ログインに失敗しました。"
                  apiError={error}
                />
              )}
              <p className="text-sm">
                登録していない場合は、
                <Link to="/auth/sign-up">サインアップ</Link>
                してください。
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
