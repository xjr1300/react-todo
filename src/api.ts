import axios, { type AxiosRequestConfig, AxiosError } from 'axios';
import * as z from 'zod/v4';
import {
  userFromUserData,
  type UserData,
  UserSchema,
  type SignUpData,
  type User,
  type LoginData,
  type TokenPairData,
  TokenPairSchema,
  tokenPairFromTokenPairData,
  type TokenPair,
} from './types';

const BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string) || 'http://localhost:8000';
const API_TIMEOUT = 10000; // 10 seconds

// axiosインスタンスを作成
const client = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // リクエストにクッキーを付与
  timeout: API_TIMEOUT, // タイムアウト設定
  headers: {
    'Content-Type': 'application/json', // デフォルトのContent-Type
  },
});

// レスポンスインターセプターを設定
client.interceptors.response.use(
  // リクエストに成功した場合は、そのままレスポンスを返す。
  (response) => response,
  // リクエストに失敗した場合の処理
  async (error: AxiosError) => {
    // オリジナルのリクエストを取得して、リトライフラグを設定
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      // レスポンスステータスが401 Unauthorizedで、リトライしていない場合のみ、トークンをリフレッシュして再度リクエストを試行
      originalRequest._retry = true;
      try {
        // `client`を使用せず、直接axiosを使用してリフレッシュトークンのエンドポイントにリクエストを送信
        const response = await axios.post(
          '/users/refresh-tokens',
          {},
          { withCredentials: true }
        );
        if (response.status === 200) {
          // リフレッシュトークンが成功した場合、リクエストを再試行
          return await client(originalRequest);
        }
      } catch (refreshError) {
        // リフレッシュトークンの更新に失敗は、ApiErrorを生成してスロー
        throw apiErrorFromUnknown(refreshError);
      }
    } else {
      // レスポンスステータスが401 Unauthorized以外のエラーは、ApiErrorを生成してスロー
      throw apiErrorFromUnknown(error);
    }
  }
);

const ApiErrorSchema = z.object({
  messages: z.array(z.string()),
});

export class ApiError extends Error {
  public messages: string[];

  constructor(messages: string[]) {
    super();
    this.messages = messages;
  }
}

const apiErrorFromUnknown = (error: unknown): ApiError => {
  if (error instanceof AxiosError) {
    if (error.response) {
      const errorData = ApiErrorSchema.safeParse(error.response.data);
      if (errorData.success) {
        return new ApiError(errorData.data.messages);
      }
    }
    return new ApiError(
      error.message ? [error.message] : ['An unexpected error occurred']
    );
  }
  return new ApiError(['An unexpected error occurred']);
};

export const signUp = async (data: SignUpData): Promise<User> => {
  const response = await client.post<UserData>('/users/sign-up', data);
  const userData = UserSchema.parse(response.data);
  return userFromUserData(userData);
};

export const login = async (data: LoginData): Promise<TokenPair> => {
  const response = await client.post<TokenPairData>('/users/login', data);
  const tokenPairData = TokenPairSchema.parse(response.data);
  return tokenPairFromTokenPairData(tokenPairData);
};
export interface ErrorMessage {
  key: string;
  message: string;
}

export const errorMessagesFromApiError = (error: unknown): ErrorMessage[] => {
  const apiError = ApiErrorSchema.safeParse(error);
  if (!apiError.success) {
    // console.error('Failed to parse ApiError:', apiError.error);
    return [];
  }
  return apiError.data.messages.map((message) => {
    return {
      key: crypto.randomUUID(),
      message: message,
    };
  });
};
