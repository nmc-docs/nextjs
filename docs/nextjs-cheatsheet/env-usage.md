---
sidebar_position: 1
---

# Sử dụng biến môi trường

- **Bước 1:** Tạo file `.env`
- **Bước 2**: Vào file: `next.config.js`

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    API_URL: process.env.API_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    SECRET_KEY: process.env.SECRET_KEY,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  },
};
module.exports = nextConfig;
```

- Bước 3: Sử dụng biến môi trường ở bất kỳ đâu (client + server side):

```tsx title="app/page.tsx"
"use client";

const HomePage = () => {
  return (
    <>
      <p>{process.env.GOOGLE_CLIENT_ID}</p>
    </>
  );
};

export default HomePage;
```
