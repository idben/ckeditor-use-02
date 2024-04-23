# 在 Nextjs 專案中使用 CKeditor

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## 建立 uplaod 圖檔用的 API
1. API 檔案: pages/api/uplaod
2. 測試用表單 /upload
3. 用了 multer 做為處理檔案上傳用
4. 與 next-connect 做為處理在 next 中的 API 的 router 使用

## 安裝與建立 CKeditor 元件
1. 安裝在 React 中使用 CKeditor 的核心 @ckeditor/ckeditor5-react
2. 安裝預設配置好的 CKeditor 設定 @ckeditor/ckeditor5-build-classic
3. 建立 CKeditor 元件，components/Myeditor
4. 建立使用 Myeditor 的頁面，/editor
4. 參考[說明頁面](https://ckeditor.com/docs/ckeditor5/latest/installation/integrations/react.html)

## 將 CKeditor 與 upload API 連接
1. 修改成 editor 可以使用的 API: /api/upload2
2. API 的 JSON 回應，一定要有 url 這項，editor 才能正確的接應與使用
2. editor 元件中建立上傳的處理器 MyUploadAdapter，並設成 CKeditor 的 plugin
3. 處理器當中用 fetch 去 call /api/upload2

## 加上 API 與 DB 的使用
1. 使用 lowdb，資料放在 /data/db.json
2. .get /api/article 會抓取路由參數 id，將單一文章內容回傳
3. .get /api/aritcles 會抓取所有文章內容回傳
4. 文章呈現相關組件在 /pages/article 中
5. 只要將 api 中的內容改成讀取不同的資料庫，就可以切換資料庫的使用
6. 看完要記得按星星給回饋一下啊⋯⋯