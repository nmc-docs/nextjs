---
sidebar_position: 2
---

# Sử dụng SVG Component

- Bước 1: Cài đặt package:

```bash
npm install -D @svgr/webpack
```

- Bước 2: Vào file **next.config.js**:

```js title="next.config.js"
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: fileLoaderRule.issuer,
      resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
      use: ["@svgr/webpack"],
    });

    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};
module.exports = nextConfig;
```

- Bước 3: Tạo file **svgr.d.ts** ở cấp độ root của project:

```ts title="svgr.d.ts"
declare module "*.svg" {
  import { FC, SVGProps } from "react";

  const content: FC<SVGProps<SVGElement>>;
  export default content;
}
```

- Bước 4: Trong file **tsconfig.json**, thêm `svgr.d.ts` vào mảng `include`:

```json title="tsconfig.json"
{
  "include": [
    "svgr.d.ts",
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts"
  ]
  // ...other config
}
```

- Bước 5: Sử dụng SVG như một component:

```ts title="src/assets/icons/index.ts"
import GoogleIcon from "./google-icon.svg";

export { GoogleIcon };
```

```tsx title="src/app/page.tsx"
"use client";
import { GoogleIcon } from "src/assets/icons";

const HomePage = () => {
  return (
    <>
      <GoogleIcon className="size-14 text-blue-600" />
    </>
  );
};

export default HomePage;
```

:::note

- Để có thể custom **width** , **height** , **color** của một SVG Component, ta phải xóa thuộc tính **width** , **height** trong file `.svg` và thuộc tính `fill`,... phải có giá trị là `"currentColor"`

:::
