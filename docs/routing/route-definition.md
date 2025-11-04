---
sidebar_position: 1
---

# Định nghĩa route

:::info

- NextJS sử dụng bộ định tuyến (route) dựa trên hệ thống thư mục.
- Để tạo route, ta tạo thư mục với tên route trong thư mục **app**.
- Sau đó, tại mỗi thư mục route, ta tạo file tên: **page.tsx** để định nghĩa nội dung cho route.

:::

![1724134265077](image/route-definition/1724134265077.png)

![1724134284440](image/route-definition/1724134284440.png)

:::note

- Ở ảnh bên trên, URL `/dashboard/analytics` sẽ không truy cập được vì trong thư mục đó không có file **page.tsx**. Folder này sẽ thường được sử dụng để lưu trữ các components, stylesheets, images,...

:::

## Private folders

:::info

- Thư mục private có thể được tạo bằng cách thêm `_` trước tên folder, ví dụ: `_folderName`
- Điều này sẽ báo cho NextJS biết thư mục đó không được định tuyến, ta có thể tạo các thư mục chứa utils, component,...

:::

![1762262591481](image/route-definition/1762262591481.png)
