# react-todo

## プロジェクトの作成

次を実行して、`React + TypeScript`テンプレートを選択します。

```sh
npm create vite@latest
cd <project-dir>
```

次を実行して、Tailwind CSSをプロジェクトに追加します。

```sh
npm install tailwindcss @tailwindcss/vite
```

`src/index.css`ファイルを次で置き換えます。

```css
@import "tailwindcss";
```

`tsconfig.json`ファイルを次で置き換えます。

```json
{
  "files": [],
  "references": [
    {
      "path": "./tsconfig.app.json"
    },
    {
      "path": "./tsconfig.node.json"
    }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

`tsconfig.app.json`ファイルを次で置き換えます。

```json
{
  "compilerOptions": {
    // ...
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }
    // ...
  }
}
```

次を実行して、nodeの型定義をインストールします。

```sh
npm install -D @types/node
```

`vite.config.ts`ファイルを次で置き換えます。

```ts
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

次を実行して、shadcnをインストールします。

```sh
npx shadcn@latest init
```

`components.json`を構成するために、いくつかの質問に回答します。

```text
Which color would you like to use as base color? › Neutral
```

shadcnのボタンコンポーネントをインストールする場合、次を実行します。

```sh
npx shadcn@latest add button
```

```ts
import { Button } from "@/components/ui/button"

function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button>Click me</Button>
    </div>
  )
}

export default App
```

## React + TypeScript + Vite

このテンプレートは、HMRといくつかのESLintルールを使用して、Reactを機能させる最低限の準備を提供しています。

> HMR: ページをリロードせずにアプリ内のモジュールを更新する技術

現在、2つの公式なプラグインが利用できます。

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react)は、Fast Refreshに[Babel](https://babeljs.io/)を使用します。
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc)は、Fast Refreshに[SWC](https://swc.rs/)を使用します。

### ESLint設定の拡張

もしプロダクションアプリケーションを開発している場合、型認識リントルールを有効にするために、設定を更新することを推奨します。

```js
// eslint.config.js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

React特有のリントルール用に、 [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x)と [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom)をインストールできます。

```sh
npm install --save-dev eslint-plugin-react-x eslint-plugin-react-dom
```

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

## shadcnのカスタマイズ

例えば、`a`要素のテキストの色を設定する場合、`src/index.css`に次を追加します。

```css
@theme {
  --color-link: #1e88e5;
}
```

```tsx
<p>
  登録していない場合は、
  <Link className="text-link" to=".">サインアップ</Link>
  してください。
</p>
```

## コンポーネントの拡張

プリミティブなコンポーネントを拡張したコンポーネントは、`/src/components/atoms`に配置します。

```tsx
import type React from 'react';
import { FormLabel as ShadcnLabel } from '../ui';
import { cn } from '@/lib/utils';

type Props = React.ComponentProps<typeof ShadcnLabel> & {
  required?: boolean;
};

export const FormLabel = ({
  children,
  className,
  required,
  ...props
}: Props) => {
  const clsName = required ? cn('gap-0.5', className) : className;

  return (
    <ShadcnLabel className={clsName} {...props}>
      {children}
      {required && <span className="pt-0.5">*</span>}
    </ShadcnLabel>
  );
};
```
