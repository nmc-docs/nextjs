---
sidebar_position: 3
---

# useParams()

:::info

- Hook **useParams()** được sử dụng trong [client component](../rendering#client-component) để lấy giá trị dynamic params từ [dynamic route](../routing/dynamic-route)

:::

- Ví dụ:

```ts title="app/shop/[tag]/[item]/page.tsx"
"use client";

import { useParams } from "next/navigation";

export default function ExampleClientComponent() {
  const params = useParams<{ tag: string; item: string }>();

  // Route -> /shop/[tag]/[item]
  // URL -> /shop/shoes/nike-air-max-97
  // `params` -> { tag: 'shoes', item: 'nike-air-max-97' }
  console.log(params);

  return "...";
}
```

![1724430639504](image/useParams/1724430639504.png)
