import { SendActivityListModel } from "./SendActivityListModel";
import { SendActivityListView } from "./SendActivityListView";

export const SendActivityList = () => {
  const methods = SendActivityListModel();

  return <SendActivityListView {...methods} />;
};
