import { ActivityAttributes } from "../Activity/ActivityAttributes";
import { UserAttributes } from "../User/UserAttributes";

export interface SendActivityAttributes {
  id: number
  user: UserAttributes;
  activity: ActivityAttributes;
}
