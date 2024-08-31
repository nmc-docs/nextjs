---
sidebar_position: 11
---

# headers()

:::info

- Hàm `headers()` mà NextJS cung cấp cho phép ta truy cập vào headers từ các HTTP Request được gửi đến ở bên trong [Server Component](../rendering#server-component).
- Hàm này trả về một đối tượng [Headers](https://nmc-docs.github.io/javascript/built-in-object/headers), nó có tất cả thuộc tính, phương thức từ lớp [Headers ](https://nmc-docs.github.io/javascript/built-in-object/headers)ngoại trừ việc **set**, **delete** vì hàm này chỉ cho phép đọc header.

:::

```tsx
import { headers } from "next/headers";

export default function Page() {
  const headersList = headers();
  const referer = headersList.get("referer");

  return <div>Referer: {referer}</div>;
}
```

```tsx
import { Suspense } from "react";
import { headers } from "next/headers";

async function User() {
  const authorization = headers().get("authorization");
  const res = await fetch("...", {
    headers: { authorization }, // Forward the authorization header
  });
  const user = await res.json();

  return <h1>{user.name}</h1>;
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <User />
    </Suspense>
  );
}
```
