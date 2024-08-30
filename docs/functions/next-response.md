---
sidebar_position: 9
---

# NextResponse

## Static methods

| NextResponse static method | Description                                                                                                               |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `NextResponse.json()`      | Hàm trả về dữ liệu cho client, có thể đính kèm các thông tin bên trong header                                             |
| `NextResponse.redirect()`  | Điều hướng đến 1 URL mới.                                                                                                 |
| `NextResponse.next()`      | Được sử dụng chủ yếu ở middleware. Ta có thể modify thông tin header và chuyển request đến bộ tiếp nhận phía sau để xử lý |

## Ví dụ

- Ví dụ về `NextResponse.json()`:

```ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.json("Hello, Next.js!", {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
```

- Ví dụ về `NextResponse.redirect()`:

```ts
import { NextResponse } from "next/server";

// Given an incoming request...
const loginUrl = new URL("/login", request.url);
// Add ?from=/incoming-url to the /login URL
loginUrl.searchParams.set("from", request.nextUrl.pathname);
// And redirect to the new URL
return NextResponse.redirect(loginUrl);
```

- Ví dụ về `NextResponse.next()`:

```ts
import { NextResponse } from "next/server";

// Given an incoming request...
const newHeaders = new Headers(request.headers);
// Add a new header
newHeaders.set("x-version", "123");
// And produce a response with the new headers
return NextResponse.next({
  request: {
    // New request headers
    headers: newHeaders,
  },
});
```
