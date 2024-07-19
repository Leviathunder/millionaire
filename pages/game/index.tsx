import clsx from 'clsx';
import { QuestionType } from '@/types';
import { useRouter } from 'next/router';
import { Inter } from 'next/font/google';
import { loadQuestions } from '@/lib/load-questions';
import { useCallback, useEffect, useMemo, useState } from 'react';

import styles from "@/styles/modules/Game.module.css";

export async function getStaticProps() {
  const props = await loadQuestions();

  return { props }
};

type GameProps = {
  scores: number[];
  questions: QuestionType[];
}

const pathname = "/result";
const answerArr = [ "A", "B", "C", "D" ];
const inter = Inter({ subsets: ["latin"] });

export default function Game({ scores, questions }: GameProps) {
  const router = useRouter();

  const [answer, setAnswer] = useState<string>('');
  const [currIndex, setIndex] = useState<number>(0);
  const [isLowRes, setIsLowRes] = useState<boolean>(false);
  const [showScore, setShowScore] = useState<boolean>(false);

  const currQestion = useMemo(() => questions[currIndex], [currIndex, questions]);
  const isLastQestion = useMemo(() => currIndex + 1 === questions.length, [currIndex, questions.length]);
  const isCorrectAnswer = useMemo(() => answer === currQestion.correctAnswer, [answer, currQestion.correctAnswer]);

  useEffect(() => {

    (async () => {
      if (!answer) return;

      await delay(2000);

      if (isLastQestion && isCorrectAnswer) {
        router.push({
          pathname,
          query: { score: scores.at(currIndex)}
        });
      } else if (!isLastQestion && isCorrectAnswer) {
        setIndex((prev) => prev + 1);
      } else if (!isCorrectAnswer) {
        router.push({
          pathname,
          query: { score: currIndex ? scores.at(currIndex - 1) : currIndex}
        });
      }

      setAnswer('');
    })();

  }, [answer]);

  useEffect(() => {
    setIsLowRes(window.innerWidth < 1300);

    const handleResize = () => {
      if (window.innerWidth > 1300) {
        setIsLowRes(false);
      }

      if (window.innerWidth < 1300) {
        setIsLowRes(true);
      }
    };

    window.addEventListener('resize', handleResize, true);

    return () => {
      window.removeEventListener('resize', handleResize, true)
    };
  }, []);

  return (
    <>
      <main className={`${styles.main} ${inter.className}`}>
        {
          isLowRes && (
            <div
              onClick={() => setShowScore(p => !p)}
              className={clsx(
                styles.menu,
                showScore ? styles.menu_open : styles.menu_close
              )}
            />
          )
        }
        <div className={`${styles.question_container}`}>
          <h1 className={`${styles.question_titile}`}>
            {currQestion.description}
          </h1>
          <div className={`${styles.question_answers}`}>
            {currQestion.answers.map(({ id, description }, i) => (
              <div
                key={id}
                className={clsx(
                  styles.answer_wrapper,
                  id === answer && isCorrectAnswer && styles.correct,
                  id === answer && !isCorrectAnswer && styles.incorrect,
                )}
              >
                <button
                  onClick={() => setAnswer(id)}
                  className={`${styles.answer}`}
                  disabled={Boolean(answer && id !== answer)}
                >
                    {`${answerArr[i]} ${description}`}
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className={clsx(
            styles.score_container,
            showScore ? styles.open : styles.close
          )}
        >
              {scores.map((score, i) => (
                <div
                  key={`score-${score}`}
                  className={clsx(
                    styles.score_item_core,
                    currIndex > i && styles.score_item_disabled,
                    currIndex === i  && styles.score_item_active,
                  )}
                >
                  {`$ ${score}`}
                </div>
              ))}
        </div>
      </main>
    </>
  );
};

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
