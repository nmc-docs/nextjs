---
sidebar_position: 1
---

# Sử dụng biến môi trường

- **Bước 1**: Cài đặt thư viện để validate biến môi trường:

```bash
npm install @t3-oss/env-nextjs zod
```

- **Bước 2**: Tạo file cấu hình biến môi trường:

```ts title="src/config/env.config.ts"
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NEXTAUTH_SECRET: z.string().min(1),
    NEXTAUTH_URL: z.string().url(),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_API_URL: z.string().url(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
});
```

:::note

- Ta chia ra 2 loại gồm biến môi trường chỉ truy cập được ở server, và biến môi trường truy cập được cả ở client và server (bắt đầu bằng prefix **NEXT_PUBLIC**)
- Lưu ý rằng ta phải destructure tất biến môi trường client vào `experimental__runtimeEnv`

:::

:::caution

- Nếu trong file **next.config.ts**, ta chỉ định `output: standalone`, thì ta thêm như sau:

```ts title="next.config.ts"
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Add the packages in transpilePackages
  transpilePackages: ["@t3-oss/env-nextjs", "@t3-oss/env-core"],
};

export default nextConfig;
```

:::

- Cuối cùng, ta có thể sử dụng biến môi trường như sau:

```ts title="some-api-endpoint.ts"
import { env } from "~/env"; // On server

export const GET = async () => {
  // do fancy ai stuff
  const magic = await fetch("...", {
    headers: { Authorization: env.OPEN_AI_API_KEY },
  });
  // ...
};
```

```tsx title="some-component.tsx"
import { env } from "~/env"; // On client - same import!

export const SomeComponent = () => {
  return (
    <SomeProvider publishableKey={env.PUBLIC_PUBLISHABLE_KEY}>
      {/* ... */}
    </SomeProvider>
  );
};
```
