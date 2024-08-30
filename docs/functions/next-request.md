---
sidebar_position: 8
---

# NextRequest

## Property

| NextRequest properties     | Return type                                                                                | Description                                                                                                    |
| -------------------------- | ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| `req.method`               | string                                                                                     | Tên HTTP Methods được gửi đến                                                                                  |
| `req.url`                  | string                                                                                     | Trả về toàn bộ URL của request gửi đến<br />Ví dụ: **"http://localhost:3001/api/user?name=Chi&age=20"**        |
| `req.headers`              | [Headers](https://nmc-docs.github.io/javascript/built-in-object/headers)                   | Trả về đối tượng chứa các thông tin trong header của request                                                   |
| `req.cookies`              | RequestCookies                                                                             | Trả về đối tượng chứa thông tin của cookies                                                                    |
| `req.nextUrl.href`         | string                                                                                     | Giống `req.url`                                                                                                |
| `req.nextUrl.hostname`     | string                                                                                     | Tên host của URL                                                                                               |
| `req.nextUrl.pathname`     | string                                                                                     | Trả về pathname của URL<br />Ví dụ: **"/api/user"**                                                            |
| `req.nextUrl.search`       | string                                                                                     | Trả về chuỗi query trong endpoint<br />Ví dụ: **"?name=Chi&age=20"**                                           |
| `req.nextUrl.searchParams` | [URLSearchParams](https://nmc-docs.github.io/javascript/built-in-object/url-search-params) | Trả về object là một[URLSearchParams](https://nmc-docs.github.io/javascript/built-in-object/url-search-params) |

## Method

| NextRequest methods | Return type          | Description                                                                                    |
| ------------------- | -------------------- | ---------------------------------------------------------------------------------------------- |
| `req.json()`        | Promise `<any>`      | Trả về một Promise chứa thông tin về dữ liệu body.                                             |
| `req.formData()`    | Promise `<FormData>` | Trả về một Promise chứa thông tin về các trường trong form khi dữ liệu gửi lên ở dạng FormData |
