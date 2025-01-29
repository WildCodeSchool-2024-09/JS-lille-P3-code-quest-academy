export type Account = {
  id: number;
  username: string;
  email: string;
  hashed_password: string;
  is_admin: boolean;
  firstTeacher: string;
  secondTeacher: string;
};
