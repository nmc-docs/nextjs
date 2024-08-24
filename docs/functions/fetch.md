---
sidebar_position: 6
---

# fetch()

## Giới thiệu

:::info

- NextJS cung cấp cho ta fetch() API được mở rộng từ [Web fetch() API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) để cho phép ta gọi như liệu, thực hiện caching, revalidating,... bên trong [server component](../rendering#server-component)

:::

- Cú pháp:

```ts
fetch(url, options);
```

:::note

- Vì được mở rộng từ [Web fetch() API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) nên có có các options từ nó và một số options do NextJS cung cấp thêm để hỗ trợ việc caching và revalidating.

:::

- Cấu hình thêm do NextJS cung cấp:

### `options.cache`

- Chỉ định xem NextJS có nên caching dữ liệu vừa fetch được hay không.

```ts
fetch(`https://...`, { cache: "force-cache" | "no-store" });
```

| cache value     | Mô tả                                                                                                                                                                                                                                    |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `"force-cache"` | NextJS sẽ tìm dữ liệu trong cache khớp với dữ liệu đang cần fetch:<br />+ Nếu tìm thấy và dữ liệu còn mới, nó sẽ trả về từ cache<br />+ Nếu không tìm thấy hoặc dữ liệu đã cũ, NextJS sẽ fetch dữ liệu mới, cập nhật vào cache và trả về |
| `"no-store"`    | NextJS sẽ luôn tìm nạp dữ liệu mới từ server và không lưu vào cache.                                                                                                                                                                     |

:::note

- Từ NextJS version 15 trở đi, giá trị `"no-store"` là giá trị mặc định.
- Từ NextJS version 14 trở về trước, giá trị mặc định là `"force-cache"`.

:::

### `options.next.revalidate`

- Cấu hình này thiết lập thời gian sống của cache.

```ts
fetch(`https://...`, { next: { revalidate: false | 0 | number } });
```

| revalidate value      | Mô tả                                                                                                                                                                             |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `false`               | Dữ liệu cũ trong cache sẽ tồn tại vĩnh viễn và không bao giờ được cập nhật cho đến khi ta cập nhật dữ liệu mới vào cache thủ công thông qua hàm[revalidateTag()](./revalidateTag) |
| `0`                   | Ngăn không cho caching dữ liệu                                                                                                                                                    |
| `number` (in seconds) | Thiết lập thời gian sống của dữ liệu trong cache. Sau mỗi khoảng thời gian này, NextJS sẽ tự động re-fetch để cập nhật dữ liệu mới và lưu vào cache.                              |

:::tip

- Ta không cần thiết lập cấu hình `cache` nếu `next.revalidate` được set giá trị vì:
  - `next.revalidate = 0` tương đương với `cache = "no-store"`
  - `next.revalidate = number` thì tự động `cache = "force-cache"`
- Sẽ xảy ra conflict nếu ta thiết lập như sau: `{ revalidate: 3600, cache: 'no-store' }`

:::

:::caution

- Khi thiết lập `cache: "force-cache"` thì **PHẢI** thiết lập `next.revalidate` là một **number** vì nếu không thiết lập là một **number** thì nó sẽ có giá trị mặc định là `false`, mà có giá trị `false` sẽ dẫn đến dữ liệu cũ trong cache sẽ tồn tại vĩnh viễn và không bao giờ được cập nhật cho đến khi ta cập nhật dữ liệu mới vào cache thủ công thông qua hàm [revalidateTag()](./revalidateTag)

:::

### `options.next.tags`

- Thiết lập tags cho cache, nó thường kết hợp sử dụng hàm [revalidateTag()](./revalidateTag) để làm mới dữ liệu trong cache.

```ts
fetch(`https://...`, { next: { tags: ["collection"] } });
```

## Ví dụ

```ts
export default async function Page() {
  // This request should be cached until manually invalidated.
  // Similar to `getStaticProps`.
  // `force-cache` is the default and can be omitted.
  const staticData = await fetch(`https://...`, { cache: "force-cache" });

  // This request should be refetched on every request.
  // Similar to `getServerSideProps`.
  const dynamicData = await fetch(`https://...`, { cache: "no-store" });

  // This request should be cached with a lifetime of 10 seconds.
  // Similar to `getStaticProps` with the `revalidate` option.
  const revalidatedData = await fetch(`https://...`, {
    next: { revalidate: 10 },
  });

  return <div>...</div>;
}
```
