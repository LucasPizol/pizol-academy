import { UserAttributes } from "../User/UserAttributes";

export interface ClassHasUserAttributes {
  classId: number;
  id: number;
  role: "owner" | "teacher" | "student";
  user: UserAttributes;
  userId: number;
}
