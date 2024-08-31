---
sidebar_position: 10
---
# cookies()

:::info

- Hàm `cookies()` mà NextJS cung cấp dùng để đọc thông tin cookies từ các HTTP Request gửi đến.

:::

## `cookies().get(name)`

- Lấy giá trị cookies theo key, nếu không tồn tại, trả về `undefined`:

```tsx
import { cookies } from 'next/headers'
 
export default function Page() {
  const cookieStore = cookies()
  const theme = cookieStore.get('theme')
  return '...'
}
```

## `cookies().getAll()`

- Lấy tất cả các giá trị của cookies:

```ts
import { cookies } from 'next/headers'
 
export default function Page() {
  const cookieStore = cookies()
  return cookieStore.getAll().map((cookie) => (
    <div key={cookie.name}>
      <p>Name: {cookie.name}</p>
      <p>Value: {cookie.value}</p>
    </div>
  ))
}
```

## `cookies().has(name)`

- Kiểm tra xem tên của một cookie có tồn tại hay không. Trả về `true` hoặc `false`

```ts
import { cookies } from 'next/headers'
 
export default function Page() {
  const cookieStore = cookies()
  const hasCookie = cookieStore.has('theme')
  return '...'
}
```

## `cookies().set(name, value, options)`

- Hàm set cookie:

```ts
'use server'
 
import { cookies } from 'next/headers'
 
async function create(data) {
  cookies().set('name', 'lee')
  // or
  cookies().set('name', 'lee', { secure: true })
  // or
  cookies().set({
    name: 'name',
    value: 'lee',
    httpOnly: true,
    path: '/',
  })
}
```

## `cookies().delete(name)`

- Hàm xóa cookie theo key:

```ts
'use server'
 
import { cookies } from 'next/headers'
 
async function delete(data) {
  cookies().delete('name')
}
```

:::caution

- Hàm set, delete cookie này chỉ được dùng ở bên trong [Server Actions](../data-fetching/server-actions) hoặc [Route Handlers](../routing/route-handlers)

:::

:::tip

- Thư viện [cookies-next](https://www.npmjs.com/package/cookies-next) cung cấp cho ta các hàm set, get, delete cookie ở cả client lẫn server side.

:::
