---
sidebar_position: 5
---

# Loading UI

:::info

- Trong Next.js, "Loading UI" hay giao diện tải dữ liệu là một thành phần giao diện người dùng được hiển thị trong thời gian chờ khi dữ liệu đang được tải hoặc xử lý. Đây là một phần quan trọng trong trải nghiệm người dùng để giảm cảm giác chờ đợi, bằng cách hiển thị một biểu tượng, hoạt ảnh hoặc một đoạn văn bản nào đó báo hiệu rằng hệ thống đang trong quá trình xử lý.
- Ví dụ khi ta điều hướng sang 1 page là [server component](../rendering#server-component) mà nó đang thực hiện việc gọi API lấy dữ liệu. Lúc này, Loading UI sẽ hiển thị giúp trải nghiệm người dùng tốt hơn.
- Chú ý rằng khi điều hướng sang 1 page là [client component](../rendering#client-component) thì Loading UI sẽ không được hiển thị do về bản chất, client component sẽ render phần tử html trên trình duyệt.
- Ta có thể tạo Loading UI bằng cách tạo file tên: **loading.tsx** bên trong thư mục route.

:::

![1724167294772](image/loading-ui/1724167294772.png)

```tsx title="loading.tsx"
export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return <LoadingSkeleton />;
}
```

## Nested Loading UI

- Ta có thể tạo nested Loading UI cho các nested route. Với mỗi nested route, nó sẽ lấy Loading UI đầu tiên mà nó tìm thấy từ trong ra ngoài.

![1724168384848](image/loading-ui/1724168384848.png)

:::note

- Trong ảnh trên, route **/products/[id]** sẽ lấy Loading UI ở file số 1
- Route **/products** và **/products/clothes** sẽ lấy Loading UI ở file số 2

:::

## `<Suspense />`

:::info

- `<Suspense>` giúp hiển thị loading UI trong khi một phần component đang load dữ liệu hoặc tải code.

:::

### Ví dụ sử dụng ở Server Component

📁 `app/page.tsx`

```tsx
import { Suspense } from "react";
import User from "./user";

export default function Page() {
  return (
    <div>
      <h1>Home Page</h1>

      <Suspense fallback={<p>Loading user...</p>}>
        <User />
      </Suspense>
    </div>
  );
}
```

📁 `app/user.tsx`

```tsx
async function getUser() {
  await new Promise((r) => setTimeout(r, 2000));
  return { name: "Minh Chi" };
}

export default async function User() {
  const data = await getUser();
  return <div>User: {data.name}</div>;
}
```

✅ Khi load page:

- `<h1>Home Page</h1>` hiển thị ngay
- `<User />` chưa có data → Suspense hiển thị `Loading user...`
- Sau 2s → user render

### Ví dụ sử dụng ở Client Component (dynamic import)

```tsx
"use client";
import { Suspense, lazy } from "react";

const Chart = lazy(() => import("./Chart"));

export default function Page() {
  return (
    <Suspense fallback={<p>Loading chart...</p>}>
      <Chart />
    </Suspense>
  );
}
```

:::note

❌ Khi nào không cần `Suspense`?

- Dữ liệu fetch ở **client** (e.g. SWR, React Query) → dùng state/UI loading
- fetch API trong server mà không cần fallback

:::
