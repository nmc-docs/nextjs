"use strict";(self.webpackChunknextjs=self.webpackChunknextjs||[]).push([[783],{2537:(n,e,t)=>{t.r(e),t.d(e,{assets:()=>a,contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>c,toc:()=>l});var r=t(4848),s=t(8453);const o={sidebar_position:4},i="Dynamic Route",c={id:"routing/dynamic-route",title:"Dynamic Route",description:"- Ta t\u1ea1o dynamic route b\u1eb1ng c\xe1ch t\u1ea1o folder bao b\u1ecdc b\u1edfi d\u1ea5u ngo\u1eb7c vu\xf4ng: [folderName]",source:"@site/docs/routing/dynamic-route.md",sourceDirName:"routing",slug:"/routing/dynamic-route",permalink:"/nextjs/routing/dynamic-route",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"Route groups",permalink:"/nextjs/routing/route-groups"},next:{title:"Loading UI",permalink:"/nextjs/routing/loading-ui"}},a={},l=[{value:"C\xe1ch l\u1ea5y params trong server component v\xe0 client component",id:"c\xe1ch-l\u1ea5y-params-trong-server-component-v\xe0-client-component",level:2}];function d(n){const e={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",img:"img",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...n.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.header,{children:(0,r.jsx)(e.h1,{id:"dynamic-route",children:"Dynamic Route"})}),"\n",(0,r.jsx)(e.admonition,{type:"info",children:(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["Ta t\u1ea1o dynamic route b\u1eb1ng c\xe1ch t\u1ea1o folder bao b\u1ecdc b\u1edfi d\u1ea5u ngo\u1eb7c vu\xf4ng: ",(0,r.jsx)(e.strong,{children:"[folderName]"})]}),"\n"]})}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["V\xed d\u1ee5, m\u1ed9t blog c\xf3 th\u1ec3 bao g\u1ed3m route sau \u0111\xe2y: ",(0,r.jsx)(e.strong,{children:"app/blog/[slug]/page.js"}),". Trong \u0111\xf3, ",(0,r.jsx)(e.strong,{children:"[slug]"})," l\xe0 dynamic segment cho c\xe1c b\xe0i vi\u1ebft c\u1ee7a blog"]}),"\n"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-tsx",metastring:'title="app/blog/[slug]/page.tsx"',children:"export default function Page({ params }: { params: { slug: string } }) {\n  return <div>My Post: {params.slug}</div>;\n}\n"})}),"\n",(0,r.jsx)(e.p,{children:(0,r.jsx)(e.img,{alt:"1724165264643",src:t(3594).A+"",width:"782",height:"216"})}),"\n",(0,r.jsx)(e.p,{children:(0,r.jsx)(e.img,{alt:"1724430279477",src:t(5232).A+"",width:"811",height:"228"})}),"\n",(0,r.jsx)(e.h2,{id:"c\xe1ch-l\u1ea5y-params-trong-server-component-v\xe0-client-component",children:"C\xe1ch l\u1ea5y params trong server component v\xe0 client component"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["\u0110\u1ed1i v\u1edbi m\u1ed7i ",(0,r.jsx)(e.a,{href:"../rendering#server-component",children:"server component"}),", n\xf3 nh\u1eadn m\u1ed9t props t\xean ",(0,r.jsx)(e.strong,{children:"params"})," ch\u1ee9a t\u1ea5t c\u1ea3 c\xe1c params c\u1ee7a route:"]}),"\n"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-ts",metastring:'title="app/blog/[slug]/page.tsx"',children:"export default function Page({ params }: { params: { slug: string } }) {\n  return <div>My Post: {params.slug}</div>;\n}\n"})}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["\u0110\u1ed1i v\u1edbi ",(0,r.jsx)(e.a,{href:"../rendering#client-component",children:"client component"}),", \u0111\u1ec3 l\u1ea5y params, ta s\u1eed d\u1ee5ng hook ",(0,r.jsx)(e.a,{href:"../functions/useParams",children:"useParams()"})]}),"\n"]})]})}function u(n={}){const{wrapper:e}={...(0,s.R)(),...n.components};return e?(0,r.jsx)(e,{...n,children:(0,r.jsx)(d,{...n})}):d(n)}},3594:(n,e,t)=>{t.d(e,{A:()=>r});const r=t.p+"assets/images/1724165264643-e01aaf56af393d53c93ea51cb8b2aaaa.png"},5232:(n,e,t)=>{t.d(e,{A:()=>r});const r=t.p+"assets/images/1724430279477-c4c13042e7b47db1f482cec95dc5cbd7.png"},8453:(n,e,t)=>{t.d(e,{R:()=>i,x:()=>c});var r=t(6540);const s={},o=r.createContext(s);function i(n){const e=r.useContext(o);return r.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function c(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(s):n.components||s:i(n.components),r.createElement(o.Provider,{value:e},n.children)}}}]);