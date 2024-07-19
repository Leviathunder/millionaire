import { useRouter } from "next/router";
import { Inter } from "next/font/google";

import styles from "@/styles/modules/Main.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Start() {
  const router = useRouter();

  return (
    <>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={`${styles.polygon}`}/>
        <div className={`${styles.container}`}>
          <div className={`${styles.thumb_containter}`}>
            <div className={`${styles.thumbs_up}`} />
          </div>
          <div className={`${styles.content_container}`}>
            <div className={`${styles.content_sub_container}`}>
              <h1>Who wants to be a millionaire?</h1>
            </div>
            <div className={`${styles.content_sub_container}`}>
              <button
                className={`${styles.btn}`}
                onClick={() => router.push('game')}
              >
                Start
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
