import { NewActivityPageView } from "./NewActivityPageView";
import { NewActivityPageModel } from "./NewActivityPageModel";

export const NewActivityPage = () => {
  const methods = NewActivityPageModel();

  return <NewActivityPageView {...methods} />;
};
