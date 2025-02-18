import Image from "next/image";
import styles from "@/styles/page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.ctas}>
          <Link className={styles.primary} href="/article">
            <Image
              className={styles.logo}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            進入文章列表
          </Link>
        </div>
      </main>
    </div>
  );
}
