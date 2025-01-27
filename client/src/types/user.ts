export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
};

export type AccountProps = {
  id: number;
  username: string;
  email: string;
  password: string;
  teacher_1: string;
  teacher_2: string;
  room_id: number;
  challenge_id: number;
};

export type ProgressProps = {
  id: number;
  user_id: number;
  room_id: number;
  challenge_id: number;
};

export type ChallengeProps = {
  id: number;
  title: string;
  guideline: string;
  hint: string;
  soluce: string;
  type: string;
  question: string;
  rep1: string;
  rep2: string;
  rep3: string;
  rep4: string;
  room_id: number;
};
