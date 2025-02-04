// to make the file a module and avoid the TypeScript error
import type { JwtPayload } from "jsonwebtoken";

declare global {
  export type MyPayload = JwtPayload & { sub: string; isAdmin: boolean };

  namespace Express {
    export interface Request {
      /* ************************************************************************* */
      // Add your custom properties here, for example:
      //
      // user?: { ... }
      auth: MyPayload;
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
  is_admin: boolean;
  hashed_password: string;
  firstTeacher: string;
  secondTeacher: string;
};
