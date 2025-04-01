---
sidebar_position: 8
---

# SSR, SSG, ISR trong NextJS

:::info

- Trong Next.js, **SSR (Server-Side Rendering)**, **SSG (Static Site Generation)**, và **ISR (Incremental Static Regeneration)** là ba phương pháp chính để render nội dung, mỗi cái có cách hoạt động và mục đích sử dụng khác nhau.

:::

## SSR (Server-Side Rendering)

- **Định nghĩa** : Với SSR, trang được render trên server mỗi khi có yêu cầu (request) từ người dùng. Dữ liệu được lấy và HTML được tạo ra tại thời điểm request, sau đó gửi đến client.
- **Cách hoạt động** : Mỗi lần người dùng truy cập, server sẽ thực hiện lại quá trình fetch dữ liệu và render.
- **Ưu điểm** :
  - Dữ liệu luôn tươi mới (real-time).
  - Tốt cho các trang cần SEO nhưng dữ liệu thay đổi thường xuyên.
- **Nhược điểm** : Tốn tài nguyên server vì phải render lại mỗi request.

* Ví dụ:

```tsx
// app/posts/[id]/page.js
export default async function PostPage({ params }) {
  const res = await fetch(`https://api.example.com/posts/${params.id}`);
  const post = await res.json();

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}
```

- Trong ví dụ này, mỗi khi người dùng truy cập **/posts/1**, server sẽ fetch dữ liệu từ API và render trang.

## SSG (Static Site Generation)

- **Định nghĩa** : Với SSG, trang được render trước tại thời điểm build (thường trong quá trình **next build**). HTML tĩnh được tạo ra và phục vụ cho mọi request sau đó.
- **Cách hoạt động** : Dữ liệu được fetch một lần lúc build, và các trang tĩnh được lưu trữ để phục vụ nhanh chóng.
- **Ưu điểm** :
  - Tốc độ tải trang cực nhanh (do đã có HTML sẵn).
  - Tiết kiệm tài nguyên server.
  - Tốt cho SEO và các trang có nội dung ít thay đổi.
- **Nhược điểm** : Dữ liệu không cập nhật sau khi build, trừ khi build lại toàn bộ.

* Ví dụ:

```tsx
// app/blog/page.js
export default async function BlogPage() {
  const res = await fetch("https://api.example.com/posts", {
    cache: "force-cache", // Đảm bảo dữ liệu được cache (mặc định trong App Router)
  });
  const posts = await res.json();

  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

- Trong App Router, SSG là mặc định khi ta không dùng các tính năng động (như **cookies()** hay **headers()**). Trang này sẽ được render tĩnh lúc build và phục vụ từ CDN.

## ISR (Incremental Static Regeneration)

- **Định nghĩa** : ISR là sự kết hợp giữa SSG và SSR. Trang được render tĩnh lúc build (như SSG), nhưng có thể tự động cập nhật sau một khoảng thời gian nhất định mà không cần build lại toàn bộ site.
- **Cách hoạt động** : Bạn chỉ định một khoảng thời gian (revalidate) để Next.js kiểm tra và tái tạo trang nếu cần.
- **Ưu điểm** :
  - Kết hợp tốc độ của SSG và tính tươi mới của SSR.
  - Giảm tải server so với SSR.
- **Nhược điểm** : Dữ liệu có thể không hoàn toàn real-time (phụ thuộc vào thời gian revalidate).

* Ví dụ:

```tsx
// app/news/page.js
export const revalidate = 60; // Tái tạo trang mỗi 60 giây

export default async function NewsPage() {
  const res = await fetch("https://api.example.com/news");
  const news = await res.json();

  return (
    <div>
      <h1>Latest News</h1>
      <ul>
        {news.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

- Trang này sẽ được render tĩnh lúc build, nhưng sau mỗi 60 giây, Next.js sẽ kiểm tra và cập nhật lại nội dung nếu có request mới. Các request trong khoảng thời gian đó sẽ nhận được phiên bản tĩnh đã cache.

## So sánh sự khác biệt

| Tiêu chí             | SSR                      | SSG                 | ISR                          |
| -------------------- | ------------------------ | ------------------- | ---------------------------- |
| **Thời điểm render** | Tại thời điểm request    | Tại thời điểm build | Tại build + cập nhật định kỳ |
| **Dữ liệu**          | Luôn tươi mới            | Tĩnh sau build      | Tươi mới theo chu kỳ         |
| **Tốc độ**           | Chậm hơn (server render) | Rất nhanh (tĩnh)    | Nhanh + cập nhật linh hoạt   |
| **Tải server**       | Cao                      | Thấp                | Trung bình                   |
| **Use case**         | Trang cá nhân hóa        | Blog, trang tĩnh    | Tin tức, danh mục sản phẩm   |

## Lưu ý với App Router

- Trong App Router, Next.js tự động tối ưu hóa cách render dựa trên cách ta viết code:
  - **SSR** : Dùng **fetch** mà không cache hoặc dùng các API động như **cookies()**.
  - **SSG** : Dùng **fetch** với **cache: "force-cache"** (mặc định).
  - **ISR** : Thêm **export const revalidate = `<seconds>`**.
- Ta không cần dùng **getServerSideProps** hay **getStaticProps** như trong Pages Router nữa.
