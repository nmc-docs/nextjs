---
sidebar_position: 2
---

# Server Actions

## Giới thiệu về Server Actions

:::info

- Trong Next.js, "Server Actions" (các hành động trên máy chủ) là một tính năng giúp ta có thể thực hiện các tác vụ trực tiếp trên máy chủ từ các thành phần giao diện (React components). Điều này giúp ta tránh việc phải tạo API endpoints riêng biệt và sau đó gọi chúng từ client, thay vào đó, ta có thể gọi trực tiếp các hàm xử lý phía server từ phía client.
- Các điểm chính của Server Actions trong Next.js:
  - **Thực thi trên máy chủ** : Các hành động này được thực thi trên máy chủ, điều này giúp bảo mật và giảm bớt công việc trên client. Các hành động có thể bao gồm việc gọi API từ máy chủ, tương tác với cơ sở dữ liệu, hoặc thực hiện các tính toán nặng mà không cần phải tải về client.
  - **Truyền tham số từ client** : Ta có thể truyền dữ liệu từ client đến server thông qua Server Actions. Dữ liệu này sau đó có thể được xử lý trên server mà không cần phải thực hiện vòng lặp qua lại giữa client-server nhiều lần.
  - **Không cần API Routes** : Một trong những lợi ích chính của Server Actions là ta không cần phải tạo các API Routes riêng biệt để xử lý các tác vụ trên máy chủ. ta chỉ cần định nghĩa các hành động trực tiếp trong thành phần React và gọi chúng khi cần.
  - **Dễ dàng quản lý** : Server Actions giúp ta quản lý mã nguồn dễ dàng hơn bằng cách giữ tất cả logic liên quan đến một thành phần React trong cùng một nơi, thay vì phải chia tách giữa mã nguồn trên client và server.

:::

## Tạo server actions

- Để tạo 1 server actions, ta tạo file và thêm `"use server"` ở đầu file, ví dụ:

```ts title="app/actions.ts"
"use server";

import { redirect } from "next/navigation";

export async function createUser() {
  const res = await fetch("https://...");
  const json = await res.json();

  if (!res.ok) {
    return { message: "Please enter a valid email" };
  }

  redirect("/dashboard");
}
```

- Sau đó, ta có thể sử dụng hàm server actions này ở trong [client component](../rendering#client-component) hoặc [server component](../rendering#server-component):

```tsx title="app/create-user/page.tsx"
"use client";

import { createUser } from "./actions";
import { useState } from "react";

export default function CreateUserPage() {
  return (
    <>
      <button onClick={createUser}>Create User</button>
    </>
  );
}
```
