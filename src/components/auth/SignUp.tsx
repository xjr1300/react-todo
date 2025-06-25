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
import { type SignUpData, SignUpSchema } from '@/types';
import { type ApiError } from '@/api';
import { useSignUp } from './hooks';

const SignUp = ({ className, ...props }: React.ComponentProps<'div'>) => {
  const form = useForm<SignUpData>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      givenName: '',
      familyName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const { mutate, isPending, isSuccess, isError, error } = useSignUp();
  const navigate = useNavigate();

  const onSubmit = (values: SignUpData) => {
    mutate(values);
  };

  if (isSuccess) {
    toast.success('サインアップに成功しました。', { id: 'sign-up-success' });
    void navigate('/auth/login');
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
          <CardTitle>サインアップ</CardTitle>
          <CardDescription>次の項目を入力してください。</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="flex flex-col gap-3"
              onSubmit={(event) => void form.handleSubmit(onSubmit)(event)}
            >
              <InputField
                type="text"
                name="familyName"
                label="苗字"
                required
                placeholder="苗字を入力"
              />
              <InputField
                type="text"
                name="givenName"
                label="名前"
                required
                placeholder="名前を入力"
              />
              <InputField
                type="email"
                name="email"
                label="Eメールアドレス"
                required
                placeholder="Eメールアドレスを入力"
              />
              <PasswordField label="パスワード" name="password" />
              <PasswordField label="確認用パスワード" name="confirmPassword" />
              <Button className="w-full" type="submit" disabled={isPending}>
                {isPending ? '処理中...' : 'サインアップ'}
              </Button>
              {isError && (
                <AlertMessage
                  title="サインアップに失敗しました。"
                  apiError={error}
                />
              )}
              <p className="text-sm">
                登録済みの場合は、
                <Link to="/auth/login">ログイン</Link>
                してください。
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
