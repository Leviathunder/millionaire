import { useRouter } from "next/router";
import { Inter } from "next/font/google";
import { useSearchParams } from 'next/navigation'

import styles from "@/styles/modules/Main.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Result() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const paramScore = searchParams.get('score') ?? 0;

  const formattedScore = new Intl.NumberFormat(
    'ja-JP',
    {
      style: 'currency',
      currency: 'JPY',
      currencyDisplay: "code"
    }
  )
    .format(Number(paramScore))
    .replace("JPY", "")
    .trim();

  return (
    <>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={`${styles.container}`}>
          <div className={`${styles.thumb_containter}`}>
            <div className={`${styles.thumbs_up}`} />
          </div>
          <div className={`${styles.content_container}`}>
            <div className={`${styles.content_sub_container}`}>
              <h3 className={`${styles.sub_title}`}>Total score:</h3>
              <h1 className={`${styles.title}`}>{`$${formattedScore} earned`}</h1>
            </div>
            <div className={`${styles.content_sub_container}`}>
              <button
                className={`${styles.btn}`}
                onClick={() => router.push('game')}
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
