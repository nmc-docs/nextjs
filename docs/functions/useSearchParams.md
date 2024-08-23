---
sidebar_position: 4
---

# useSearchParams()

- Hook **useSearchParams()** dùng để lấy giá trị query trên URL và được sử dụng ở [client component](../rendering#client-component).
- Hook này trả về một phiên bản read-only của [URLSearchParams](https://nmc-docs.github.io/javascript/built-in-object/url-search-params), nó có tất cả các phương thức ngoại trừ các phương thức làm thay đổi như `append()`, `delete()`,...

```ts
"use client";

import { useSearchParams } from "next/navigation";

export default function SearchBar() {
  const searchParams = useSearchParams();

  const search = searchParams.get("search");

  // URL -> `/dashboard?search=my-project`
  // `search` -> 'my-project'
  return <>Search: {search}</>;
}
```

## Ví dụ về update search params

```ts
"use client";

export default function ExampleClientComponent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <>
      <p>Sort By</p>

      {/* using useRouter */}
      <button
        onClick={() => {
          // <pathname>?sort=asc
          router.push(pathname + "?" + createQueryString("sort", "asc"));
        }}
      >
        ASC
      </button>

      {/* using <Link> */}
      <Link
        href={
          // <pathname>?sort=desc
          pathname + "?" + createQueryString("sort", "desc")
        }
      >
        DESC
      </Link>
    </>
  );
}
```
