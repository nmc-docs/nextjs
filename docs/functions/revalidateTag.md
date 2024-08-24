---
sidebar_position: 7
---

# revalidateTag()

## Giới thiệu

:::info

- Hàm **revalidateTag()** giúp làm mới dữ liệu được lưu trong cache ngay lập tức theo tag của cache.
- Hàm **revalidateTag()** thường được sử dụng ở bên trong [Route Handlers](../routing/route-handlers) hoặc [Server Actions](../data-fetching/server-actions).

```ts
revalidateTag(tag: string): void;
```

:::

## Ví dụ

### Server Actions:

```ts title"app/actions.ts"
"use server";

import { revalidateTag } from "next/cache";

export default async function submit() {
  await addPost();
  revalidateTag("posts");
}
```

### Route Handlers:

```ts title="app/api/revalidate/route.ts"
import type { NextRequest } from "next/server";
import { revalidateTag } from "next/cache";

export async function GET(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get("tag");
  revalidateTag(tag);
  return Response.json({ revalidated: true, now: Date.now() });
}
```
