---
sidebar_position: 2
---

# usePathname()

- Hook **usePathname()** dùng để điều lấy pathname và nó được sử dụng ở [client component](../rendering#client-component).

```ts
"use client";

import { usePathname } from "next/navigation";

export default function ExampleClientComponent() {
  const pathname = usePathname();
  return <p>Current pathname: {pathname}</p>;
}
```

| URL                 | Return value          |
| ------------------- | --------------------- |
| `/`                 | `'/'`                 |
| `/dashboard`        | `'/dashboard'`        |
| `/dashboard?v=2`    | `'/dashboard'`        |
| `/blog/hello-world` | `'/blog/hello-world'` |
