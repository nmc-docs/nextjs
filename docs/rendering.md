---
sidebar_position: 3
---

# Server Component và Client Component

## Server Component

- Server Components là các React components được render trên server thay vì trên client. Điều này có nghĩa là các thành phần này được tạo ra và xử lý trước khi trang được gửi về trình duyệt. Dữ liệu được lấy trực tiếp từ cơ sở dữ liệu hoặc các API ngay tại server, và kết quả render là một HTML tĩnh, giảm thiểu JavaScript gửi về client, giúp tăng tốc độ tải trang.
- Ta có thể thực hiện việc gọi API bên trong server component, xem ví dụ bên dưới.
- Lợi ích của server component:
  - **Hiệu suất cao hơn:** Vì render diễn ra trên server, chỉ HTML cần thiết được gửi tới client, giảm lượng JavaScript cần xử lý.
  - **SEO tốt hơn:** Các trang được render sẵn (SSR) với nội dung đầy đủ, giúp các công cụ tìm kiếm có thể dễ dàng thu thập dữ liệu.
  - **Bảo mật:** Server Components cho phép bạn giữ dữ liệu và logic nhạy cảm trên server, chẳng hạn như token và khóa API, mà không có nguy cơ bị lộ ra cho client.
- Trong NextJS, khi ta tạo một **page.tsx** cho một route, mặc định nó là server component.
- Ví dụ:

```tsx
export default async function PostsPage() {
  const posts = await getPosts();
  return <Posts posts={posts} />;
}
```

## Client component

- **Client Component** trong Next.js là những thành phần (components) được render và xử lý hoàn toàn trên trình duyệt của người dùng (client-side). Điều này khác với **Server Components** , vốn được render trên server trước khi gửi kết quả HTML tĩnh về trình duyệt.
- Đặc điểm của Client component:
  - **Render trên Client-side:** Client Components được tải và thực thi trên trình duyệt. Điều này cho phép bạn sử dụng các tính năng của React như `useState`, `useEffect`, hoặc các hooks khác, vốn yêu cầu sự tương tác với môi trường client.
  - **Sử dụng JavaScript Client-side:** Vì chúng được render trên client, Client Components bao gồm JavaScript cần thiết để hoạt động. Điều này có thể ảnh hưởng đến hiệu suất nếu lượng JavaScript quá lớn hoặc nếu người dùng có kết nối mạng chậm.
  - **Tương tác với người dùng:** Client Components rất hữu ích cho các thành phần của ứng dụng cần tương tác với người dùng, chẳng hạn như các form, dropdown menus, modals, và các thành phần tương tác khác.
- Để tạo một client component trong NextJS, ta thêm **"use client"** ở đầu file hoặc component.
- Ví dụ:

```tsx
// app/page.tsx
"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
}
```
