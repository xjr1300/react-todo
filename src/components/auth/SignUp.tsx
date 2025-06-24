import React from 'react';
import { useNavigate } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
} from '../ui';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { type SignUpData, SignUpSchema } from '@/types';
import { Link, FormLabel, AppName } from '../atoms';
import { useSignUp } from './hooks';
import { type ApiError } from '@/api';
import { AlertMessage } from '../features/AlertMessage';
import { PasswordInput } from '../atoms/PasswordInput';

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
    toast.success('サインアップに成功しました。');
    void navigate('/auth/login');
  }

  if (isError) {
    const apiError = error as ApiError;
    console.error(apiError.messages);
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
              <FormField
                control={form.control}
                name="familyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>苗字</FormLabel>
                    <FormControl>
                      <Input placeholder="苗字を入力" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="givenName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>名前</FormLabel>
                    <FormControl>
                      <Input placeholder="名前を入力" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Eメールアドレス</FormLabel>
                    <FormControl>
                      <Input placeholder="Eメールアドレスを入力" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <PasswordInput label="パスワード" name="password" />
              <PasswordInput label="確認用パスワード" name="confirmPassword" />
              <div className="flex justify-end">
                <Button className="w-full" type="submit" disabled={isPending}>
                  {isPending ? '処理中...' : 'サインアップ'}
                </Button>
              </div>
              {isError && (
                <AlertMessage
                  title="サインアップに失敗しました"
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
