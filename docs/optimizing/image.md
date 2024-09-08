---
sidebar_position: 1
---

# Image

:::info

- NextJS cung cấp cho ta component `<Image />` để hiển thị cũng như tối ưu cho ảnh.

:::

```ts title="app/page.tsx"
import Image from "next/image";

export default function Page() {
  return (
    <Image
      src="/profile.png"
      width={500}
      height={500}
      alt="Picture of the author"
    />
  );
}
```

## Props

| Thuộc tính    | Kiểu dữ liệu        | Status   | Mô tả                                                                                                                                                                                                                                                                                                                                                                           |
| ------------- | ------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src`         | string              | Required | URL đến ảnh                                                                                                                                                                                                                                                                                                                                                                     |
| `width`       | integer (px)        | Required | Chiều rộng của ảnh                                                                                                                                                                                                                                                                                                                                                              |
| `heigth`      | integer (px)        | Required | Chiều cao của ảnh                                                                                                                                                                                                                                                                                                                                                               |
| `alt`         | string              | Required | Đoạn text mô tả bức ảnh nếu xảy ra lỗi khi hiển thị                                                                                                                                                                                                                                                                                                                             |
| `fill`        | boolean             | Optional | - Nếu có giá trị `true`, chiều rộng và chiều cao của ảnh sẽ được lấp đầy không gian của phần tử cha, thích hợp khi ảnh không được chỉ định rõ `width` hoặc `height`<br />- Phần tử cha phải có `position: "relative"`, `position: "fixed"`, hoặc `position: "absolute"`<br />- Nên kết hợp dùng với `object-fit: "contain"` hoặc `object-fit: "cover"` để ảnh không bị bóp méo. |
| `quality`     | integer (1-100)     | Optional | Một giá trị nguyên có giá trị từ 1-100 để chỉ định chất lượng ảnh. Giá trị mặc định là 75.                                                                                                                                                                                                                                                                                      |
| `placeholder` | `"empty"`, `"blur"` | Optional | Chỉ định kiểu hiển thị khi ảnh đang load                                                                                                                                                                                                                                                                                                                                        |
| `style`       | Object              | Optional | Style CSS cho ảnh                                                                                                                                                                                                                                                                                                                                                               |
