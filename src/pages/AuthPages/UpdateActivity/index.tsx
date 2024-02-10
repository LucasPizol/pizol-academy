import { UpdateActivityView } from "./UpdateActivityView";
import { UpdateActivityModel } from "./UpdateActivityModel";

export const ActivityPage = () => {
  const methods = UpdateActivityModel();

  return <UpdateActivityView {...methods} />;
};
