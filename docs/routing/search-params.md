---
sidebar_position: 8
---

# Lấy giá trị search params

## Đối với Server component

- Trong mỗi [server component](../rendering#server-component), nó nhận một props tên là **searchParams** chứa tât cả các search params của page:

```tsx title="app/shop/page.tsx"
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { page = "1", sort = "asc", query = "" } = await searchParams;

  return (
    <div>
      <h1>Product Listing</h1>
      <p>Search query: {query}</p>
      <p>Current page: {page}</p>
      <p>Sort order: {sort}</p>
    </div>
  );
}
```

## Đối với client component

- Để lấy giá trị search params trong [client component](../rendering#client-component), ta sử dụng hook [useSearchParams()](../functions/useSearchParams)
