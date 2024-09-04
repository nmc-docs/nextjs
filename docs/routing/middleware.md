---
sidebar_position: 10
---

# Middleware

## Middleware để làm gì?

:::info

- Trong NextJS, Middleware sẽ được thực hiện trước khi vào một route. Ở đây ta có thể điều chỉnh response như redirect, rewriting, thay đổi request/response headers.
- Middleware sẽ được chỉ định đối với những route mà nó match (ta tự định nghĩa).
- Một số use case mà áp dụng middleware:

  - Xác thực và phân quyền: Ta có thể sử dụng middleware để kiểm tra xem user có được truy cập vào một private route hay một route mà được phân quyền hay không. Nếu không ta có thể redirect về trang đăng nhập,...
  - Phát hiện bot: Bảo vệ route bằng cách bảo vệ và chặn các bot xâm nhập trái phép vào trang web.

:::

:::note

- Một số lưu ý với middleware:
  - Middleware không nên xử lý các tác vụ nặng hoặc tiêu tốn nhiều tài nguyên, vì middleware sẽ được chạy mỗi khi ta đi đến một route.
  - Middleware có thể thực hiện các thao tác server-side nhưng ta không nên thực hiện các thao tác trực tiếp với database.

:::

## Tạo middleware

:::info

- Ta tạo file **middleware.ts** ở cấp cao nhất bên trong thư mục src (cùng cấp với thư mục **app**)
- Ở trong file này, ta `export function middleware`, hàm này nhận 1 tham số có kiểu [NextRequest](../functions/next-request) chứa thông tin request. Ở trong hàm này ta có thể sử dụng [NextResponse](../functions/next-response) để hỗ trợ việc điều hướng.

:::

```ts title="src/middleware.ts"
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL("/home", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/about/:path*",
};
```

- Ở ví dụ trên, ta tạo middleware chỉ áp dụng đối với các route **"/about/\*"**, khi user vào route này thì sẽ bị redirect về route **"/home"**

## Matching Paths

:::info

- Mặc định, middleware sẽ áp dụng cho tất cả các route trong app, do đó, ta cần cấu hình `matcher` để chỉ áp dụng middleware đối với một số route cụ thể.
- Để tạo matcher, ta `export` một `config` ở file **middleware.ts**

:::

```ts title="src/middleware.ts"
export const config = {
  matcher: "/about/:path*",
};
```

- Ta có thể chỉ định một hoặc nhiều path:

```ts title="src/middleware.ts"
export const config = {
  matcher: ["/about/:path*", "/dashboard/:path*"],
};
```

- `matcher` cũng có hỗ trợ regex:

```ts title="src/middleware.ts"
export const config = {
  matcher: [
    /*
     * Áp dụng middleware cho tất cả các route ngoại trừ những route bắt đầu bằng:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
```

:::note

- Một số lưu ý khi thiết lập `matcher`:
  - **PHẢI** bắt đầu bằng `/`
  - Có thể bao gồm parameter như `/about/:path` sẽ khớp với các route `/about/a`, `/about/b` nhưng sẽ không khớp với route `/about/a/c`
  - Có thể có modifiers ở parameter: `/about/:path*`, nó sẽ match với route `/about/a/b/c` vì trong regex, `*` khớp 0 hoặc nhiều lần, `?` khớp 0 hoặc 1 lần, `+` khớp 1 hoặc nhiều lần.

:::

## Một số ví dụ về middleware

- Điều hướng có điều kiện:

```ts title="src/middleware.ts"
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/about")) {
    return NextResponse.rewrite(new URL("/about-2", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.rewrite(new URL("/dashboard/user", request.url));
  }
}
```

- Thao tác với cookies:

```ts title="src/middleware.ts"
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Assume a "Cookie:nextjs=fast" header to be present on the incoming request
  // Getting cookies from the request using the `RequestCookies` API
  let cookie = request.cookies.get("nextjs");
  console.log(cookie); // => { name: 'nextjs', value: 'fast', Path: '/' }
  const allCookies = request.cookies.getAll();
  console.log(allCookies); // => [{ name: 'nextjs', value: 'fast' }]

  request.cookies.has("nextjs"); // => true
  request.cookies.delete("nextjs");
  request.cookies.has("nextjs"); // => false

  // Setting cookies on the response using the `ResponseCookies` API
  const response = NextResponse.next();
  response.cookies.set("vercel", "fast");
  response.cookies.set({
    name: "vercel",
    value: "fast",
    path: "/",
  });
  cookie = response.cookies.get("vercel");
  console.log(cookie); // => { name: 'vercel', value: 'fast', Path: '/' }
  // The outgoing response will have a `Set-Cookie:vercel=fast;path=/` header.

  return response;
}
```

- Thao tác với headers:

```ts title="src/middleware.ts"
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Clone the request headers and set a new header `x-hello-from-middleware1`
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-hello-from-middleware1", "hello");

  // You can also set request headers in NextResponse.next
  const response = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  });

  // Set a new response header `x-hello-from-middleware2`
  response.headers.set("x-hello-from-middleware2", "hello");
  return response;
}
```

- Xử lý CORS khi gọi đến các API:

```ts title="src/middleware.ts"
import { NextRequest, NextResponse } from "next/server";

const allowedOrigins = ["https://acme.com", "https://my-app.org"];

const corsOptions = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export function middleware(request: NextRequest) {
  // Check the origin from the request
  const origin = request.headers.get("origin") ?? "";
  const isAllowedOrigin = allowedOrigins.includes(origin);

  // Handle preflighted requests
  const isPreflight = request.method === "OPTIONS";

  if (isPreflight) {
    const preflightHeaders = {
      ...(isAllowedOrigin && { "Access-Control-Allow-Origin": origin }),
      ...corsOptions,
    };
    return NextResponse.json({}, { headers: preflightHeaders });
  }

  // Handle simple requests
  const response = NextResponse.next();

  if (isAllowedOrigin) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }

  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

export const config = {
  matcher: "/api/:path*",
};
```
