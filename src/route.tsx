import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import { Login } from "./pages/NotAuthPages/LoginPage";
import { Register } from "./pages/NotAuthPages/RegisterPage";
import { ClassList } from "./pages/AuthPages/ClassList";
import { ActivityList } from "./pages/AuthPages/ActivityList";
import { ActivityPage } from "./pages/AuthPages/UpdateActivity";
import { NewActivityPage } from "./pages/AuthPages/NewActivityPage";
import { CustomLayout } from "./components/Layout/Layout";
import { SendActivityList } from "./pages/AuthPages/SendActivityList";

export const MyRoutes = () => {
  const { user } = useAuthContext();

  return (
    <>
      {user ? (
        <CustomLayout>
          <Routes>
            <Route path="/" element={<ClassList />} />
            <Route path="/class/:id" element={<ActivityList />} />
            <Route path="/activity/:id" element={<ActivityPage />} />
            <Route path="/activity/new" element={<NewActivityPage />} />
            <Route path="/sendactivity/:id" element={<SendActivityList />} />
            <Route path="*" element={<Navigate to="/" replace={true} />} />
          </Routes>
        </CustomLayout>
      ) : (
        <Routes>
          <Route path="/auth/login" element={<Login />}></Route>
          <Route path="/auth/register" element={<Register />}></Route>
          <Route
            path="*"
            element={<Navigate to="/auth/login" replace={true} />}
          />
        </Routes>
      )}
    </>
  );
};
