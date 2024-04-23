import Head from "next/head";
import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <>
      <Head>
        <title>首頁</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container">
        <ul>
          <li>
            <Link href="/upload">測試 Multer 上傳功能</Link>
          </li>
          <li>
          <Link href="/editor">我的編輯器</Link>
          </li>
        </ul>
      </main>
    </>
  );
}
