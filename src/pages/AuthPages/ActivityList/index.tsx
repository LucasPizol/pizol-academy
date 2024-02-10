import { ActivityListModel } from "./ActivityListModel";
import { ActivityListView } from "./ActivityListView";

export const ActivityList = () => {
  const methods = ActivityListModel();

  return <ActivityListView {...methods} />;
};
