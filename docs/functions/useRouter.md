---
sidebar_position: 1
---

# useRouter()

- Hook **useRouter()** dùng để điều hướng ở [client component](../rendering#client-component).

```ts
"use client";

import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <button type="button" onClick={() => router.push("/dashboard")}>
      Dashboard
    </button>
  );
}
```

| Method                                              | Description                                                                                   |
| --------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `router.push(href: string, { scroll: boolean })`    | Điều hướng sang URL mới                                                                       |
| `router.replace(href: string, { scroll: boolean })` | Điều hướng sang URL mới và không quay được lại trang trước đó                                 |
| `router.refresh()`                                  | Làm mới trang hiện tại, tạo request mới đến server, re-fetch data, re-render server component |
| `router.back()`                                     | Quay trở lại URL trước đó                                                                     |
