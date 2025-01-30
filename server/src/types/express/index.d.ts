// to make the file a module and avoid the TypeScript error
export type { Room, Progress, Challenge, Account };

declare global {
  namespace Express {
    export interface Request {
      /* ************************************************************************* */
      // Add your custom properties here, for example:
      //
      // user?: { ... }
      /* ************************************************************************* */
    }
  }
}

type Room = {
  id: number;
  boss: string;
  img_url: string;
};

type Progress = {
  id: number;
  challenge_id: number;
  user_id: number;
};

type Challenge = {
  id: number;
  title: string;
  user_id: number;
};

type Account = {
  id: number;
  username: string;
  email: string;
  hashed_password: string;
  firstTeacher: string;
  secondTeacher: string;
};
