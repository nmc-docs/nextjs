---
sidebar_position: 2
---

# Font

:::info

- `next/font` cung cấp cho ta việc sử dụng font chữ trong NextJS một cách tối ưu.

:::

## Sử dụng font của Google

- NextJS tích hợp sẵn một số font của Google cho ta dùng, dưới đây là cách sử dụng
- Ở file root layout:

```tsx title="app/layout.tsx"
import { Inter } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
```

| Google Font options | Value                                                             | Description                                                                                                                                                                                                                              |
| ------------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `subsets`           | `['latin']`                                                       | Hỗ trợ hiển thị các ký tự latin, tiếng việt,...                                                                                                                                                                                          |
| `weight`            | `['100', '200', '300', '400', '500', '600', '700', '800', '900']` | Import các font weight muốn sử dụng trong dự án                                                                                                                                                                                          |
| `style`             | `['normal', 'italic']`                                            | Import các kiểu chữ (bình thường, nghiêng) muốn sử dụng trong dự án                                                                                                                                                                      |
| `display`           | `'auto'`, `'block'`, `'swap'`, `'fallback'`,`'optional'`          | Chỉ định font display, giá trị mặc định là `'swap'`                                                                                                                                                                                      |
| `variable`          | string                                                            | Một chuỗi là tên của biến trong CSS được gán với tên font.<br />Ví dụ: `variable: "--font-roboto-mono"` thì nó sẽ tự động thêm biến CSS Global này. Lúc đó ở các file **.css**, ta có thể sử dụng `font-family: var(--font-roboto-mono)` |

:::note

- Một số font của Google sẽ bắt buộc ta phải khai báo một hoặc nhiều cấu hình bên trên.

:::

## Sử dụng nhiều font

- Sau đây, ta sẽ tạo 2 font và sử dụng chúng với TailwindCSS, trong đó:
  - Font "Inter" sẽ là font chính và được sử dụng nhiều
  - Font "Roboto Mono" là font phụ, được sử dụng ở một số đoạn text nhất định.

```tsx title="app/layout.tsx"
import { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import { PropsWithChildren } from "react";

import "src/themes/global.css";
import "react-toastify/dist/ReactToastify.css";
import AppProvider from "src/components/providers/AppProvider";

export const metadata: Metadata = {
  title: "My app",
  description: "Welcome to my Nextjs app",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
});

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${roboto_mono.variable}`}
    >
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
};

export default RootLayout;
```

```tsx title="tailwind.config.ts"
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
        roboto_mono: ["var(--font-roboto-mono)"],
      },
    },
  },
  plugins: [],
};
```

- Giờ ta sử dụng class utilities trong TailwindCSS để chỉ định font cho text:

```tsx title="app/page.tsx"
"use client";

const HomePage = () => {
  return (
    <div className="relative h-48 w-[600px]">
      <p className="text-2xl">Nguyễn Minh Chí</p>
      <p className="font-roboto_mono text-2xl">Nguyễn Minh Chí</p>
    </div>
  );
};

export default HomePage;
```

:::note

- Khi custom font trong file **tailwind.config.ts**, `sans` là từ khóa đặc biệt chỉ định font chính trong ứng dụng. Nó tự động áp dụng font này cho toàn bộ text trong app, do đó, ta không cần phải chỉ định cụ thể tên font khi style như ở trên, các font phụ thì mới cần chỉ định tên font.

:::

## Local font

:::info

- `"next/font/local"` giúp ta sử dụng những local font (các file **.ttf**, **.woff2** bên trong dự án chúng ta), thay vì import từ thư viện. Thích hợp khi không có font nào từ thư viện mà ta muốn sử dụng, hoặc có sự tùy chỉnh.

:::

```ts title="src/assets/font/index.ts"
import localFont from "next/font/local";

const roboto = localFont({
  src: [
    {
      path: "./Roboto-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Roboto-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./Roboto-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./Roboto-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
});
```

```tsx title="app/layout.tsx"
import roboto from "src/assets/font";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.className}>
      <body>{children}</body>
    </html>
  );
}
```
