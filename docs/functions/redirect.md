---
sidebar_position: 5
---

# redirect()

## Giới thiệu

:::info

- Hàm **redirect()** được sử dụng điều hướng ở [Server Component](../rendering#server-component), [Server Actions](../data-fetching/server-actions) hoặc [Route Handlers](../routing/route-handlers).
- Cú pháp:

```ts
redirect(path, type);
```

| Parameter | Type                                                          | Description            |
| --------- | ------------------------------------------------------------- | ---------------------- |
| `path`    | `string`                                                      | URL cần điều hướng đến |
| `type`    | `'replace'` (default) or `'push'` (default in Server Actions) | Loại redirect          |

:::

## Ví dụ

### Server Component

```ts title="app/team/[id]/page.js"
import { redirect } from "next/navigation";

async function fetchTeam(id) {
  const res = await fetch("https://...");
  if (!res.ok) return undefined;
  return res.json();
}

export default async function Profile({ params }) {
  const team = await fetchTeam(params.id);
  if (!team) {
    redirect("/login");
  }

  // ...
}
```

### Client component

- Ta có thể sử dụng **redirect()** ở trong [server actions](../data-fetching/server-actions) và gọi [server actions](../data-fetching/server-actions) ở bên trong [client component](../rendering#client-component).

```ts title="app/client-redirect.tsx"
"use client";

import { navigate } from "./actions";

export function ClientRedirect() {
  return (
    <form action={navigate}>
      <input type="text" name="id" />
      <button>Submit</button>
    </form>
  );
}
```

```ts title="app/actions.ts"
"use server";

import { redirect } from "next/navigation";

export async function navigate(data: FormData) {
  redirect(`/posts/${data.get("id")}`);
}
```
