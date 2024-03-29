import { Spinner } from "react-activity";

export const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Spinner color="#1677ff" size={45} />
    </div>
  );
};
