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
  FormLabel,
  FormMessage,
  Input,
} from '../ui';
import { z } from 'zod';
import { Link } from '../atoms/Link';
import type React from 'react';
import { cn } from '@/lib/utils';

const FormSchema = z.object({
  username: z.string().min(1, {
    message: 'ユーザー名を入力してください。',
  }),
  password: z.string().min(8, {
    message: 'パスワードは8文字以上で入力してください。',
  }),
});

const Login = ({ className, ...props }: React.ComponentProps<'div'>) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <h2 className="text-3xl font-extrabold mb-3">Todo管理アプリ</h2>
          <CardTitle>ログイン</CardTitle>
          <CardDescription>
            ログインするために、Eメールアドレスとパスワードを入力してください。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ユーザー名</FormLabel>
                    <FormControl>
                      <Input placeholder="ユーザー名を入力" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>パスワード</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="パスワードを入力"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button className="w-full" type="submit">
                  ログイン
                </Button>
              </div>
              <p className="text-sm">
                登録していない場合は、
                <Link to=".">サインアップ</Link>
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
