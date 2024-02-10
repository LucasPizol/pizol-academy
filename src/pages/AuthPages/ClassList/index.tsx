import { ClassesModel } from "./ClassesModel";
import { ClassesView } from "./ClassesView";

export const ClassList = () => {
  const methods = ClassesModel();

  return <ClassesView {...methods} />;
};
