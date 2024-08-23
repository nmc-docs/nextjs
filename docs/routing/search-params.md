---
sidebar_position: 8
---

# Lấy giá trị search params

## Đối với Server component

- Trong mỗi [server component](../rendering#server-component), nó nhận một props tên là **searchParams** chứa tât cả các search params của page:

```tsx
export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return <h1>My Page</h1>;
}
```

## Đối với client component

- Để lấy giá trị search params trong [client component](../rendering#client-component), ta sử dụng hook [useSearchParams()](../functions/useSearchParams)
