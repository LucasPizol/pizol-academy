import { AbilitiesAttributes } from "../Abilities/AbilitiesAttributes";
import { SendActivityAttributes } from "../SendActivity/SendActivityAttributes";
import { UserAttributes } from "../User/UserAttributes";

export interface ActivityCreationAttributes {
  title: string;
  resume?: string;
  objectives: string;
  total_time: number;
  recurses: string;
  guide: string;
  abilities: AbilitiesAttributes[];
}

export interface ActivityAttributes extends ActivityCreationAttributes {
  id: number;
  user: UserAttributes;
  sendActivity: SendActivityAttributes[];
  abilities: AbilitiesAttributes[];
  pdf_file_url: string;
  classId: number;
  userId: number;
  isActive: boolean;
  ownerName: string;
}
