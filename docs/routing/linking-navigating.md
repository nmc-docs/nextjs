---
sidebar_position: 7
---

# Điều hướng trong NextJS

## Sử dụng component Link

- Component `<Link />` là một component được mở trong từ thẻ `<a />` để điều hướng sang một URL khác ở client side.
- Ví dụ:

```tsx
import Link from "next/link";

export default function Page() {
  return <Link href="/dashboard">Dashboard</Link>;
}
```

- Thuộc tính href cũng có thể nhận object nếu ta muốn navigate kèm theo query:

```tsx
// Navigate to /about?name=test
<Link
  href={{
    pathname: "/about",
    query: { name: "test" },
  }}
>
  About
</Link>
```

- Component `<Link />` cũng nhận thuộc tính **replace** có giá trị `true` hoặc `false`. Nếu là `true`, khi điều hướng sang một URL mới, ta không thể quay trở lại URL cũ bằng nút back trên trình duyệt được. Giá trị mặc định là `false`.

```ts
import Link from "next/link";

export default function Page() {
  return (
    <Link href="/dashboard" replace>
      Dashboard
    </Link>
  );
}
```

## Sử dụng hook useRouter()

- Một cách khác để điều hướng là sử dụng hook [useRouter()](../functions/useRouter) và nó chỉ áp dụng cho [client component](../rendering#client-component).

## Sử dụng hàm redirect()

- Đối với [server component](../rendering#server-component), để điều hướng, ta sử dụng hàm [redirect()](../functions/redirect).
