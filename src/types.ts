import * as z from 'zod/v4';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Tokyo');

export const SignUpSchema = z
  .object({
    familyName: z
      .string()
      .trim()
      .min(1, {
        message: '苗字を入力してください。',
      })
      .max(100, {
        message: '苗字は100文字以内で入力してください。',
      }),
    givenName: z
      .string()
      .trim()
      .min(1, {
        message: '名前を入力してください。',
      })
      .max(100, {
        message: '名前は100文字以内で入力してください。',
      }),
    email: z.email({
      message: '有効なメールアドレスを入力してください。',
    }),
    password: z.string().trim().min(8, {
      message: 'パスワードは8文字以上で入力してください。',
    }),
    confirmPassword: z.string().trim().min(8, {
      message: '確認用パスワードは8文字以上で入力してください。',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'パスワードと確認用パスワードが一致しません。',
  });

export type SignUpData = z.infer<typeof SignUpSchema>;

export const RoleSchema = z.object({
  code: z.number().int(),
  name: z.string().trim(),
  description: z.string().trim().optional(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export type RoleData = z.infer<typeof RoleSchema>;

export interface Role {
  code: number;
  name: string;
  description?: string;
  createdAt: Dayjs;
  updatedAt: Dayjs;
}

export const roleFromRoleData = (data: RoleData): Role => {
  return {
    code: data.code,
    name: data.name,
    description: data.description,
    createdAt: dayjs(data.createdAt),
    updatedAt: dayjs(data.updatedAt),
  };
};

export const UserSchema = z.object({
  id: z.uuid(),
  familyName: z.string().trim(),
  givenName: z.string().trim(),
  email: z.email(),
  role: RoleSchema,
  active: z.boolean(),
  lastLoginAt: z.iso.datetime().nullable(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export type UserData = z.infer<typeof UserSchema>;

export interface User {
  id: string;
  familyName: string;
  givenName: string;
  email: string;
  role: Role;
  active: boolean;
  lastLoginAt?: Dayjs;
  createdAt: Dayjs;
  updatedAt: Dayjs;
}

export const userFromUserData = (data: UserData): User => {
  return {
    id: data.id,
    familyName: data.familyName,
    givenName: data.givenName,
    email: data.email,
    role: roleFromRoleData(data.role),
    active: data.active,
    lastLoginAt: data.lastLoginAt ? dayjs(data.lastLoginAt) : undefined,
    createdAt: dayjs(data.createdAt),
    updatedAt: dayjs(data.updatedAt),
  };
};

export const LoginSchema = z.object({
  email: z.email({
    message: '有効なメールアドレスを入力してください。',
  }),
  password: z.string().trim().min(8, {
    message: 'パスワードは8文字以上で入力してください。',
  }),
});

export type LoginData = z.infer<typeof LoginSchema>;

export const TokenPairSchema = z.object({
  accessToken: z.string().trim(),
  accessExpiredAt: z.iso.datetime(),
  refreshToken: z.string().trim(),
  refreshExpiredAt: z.iso.datetime(),
});

export type TokenPairData = z.infer<typeof TokenPairSchema>;

export interface TokenPair {
  accessToken: string;
  accessExpiredAt?: Dayjs;
  refreshToken: string;
  refreshExpiredAt?: Dayjs;
}

export const tokenPairFromTokenPairData = (data: TokenPairData): TokenPair => {
  return {
    accessToken: data.accessToken,
    accessExpiredAt: dayjs(data.accessExpiredAt),
    refreshToken: data.refreshToken,
    refreshExpiredAt: dayjs(data.refreshExpiredAt),
  };
};
