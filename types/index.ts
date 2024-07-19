
export type AnswerType = {
  id: string,
  description: string
};

export type QuestionType = {
  description: string,
  answers: AnswerType[],
  correctAnswer: string,
};
