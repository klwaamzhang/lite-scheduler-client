import React from "react";
import SchedulerAppBar from "./components/Appbar";
import AuthDialog from "./components/AuthPageComponents/AuthDialog";
import AccountPageDialog from "./components/AccountPageComponents/AccountPageDialog";
import RegularHomePage from "./components/HomePages/RegularHomePage";
import StudentHomePage from "./components/HomePages/StudentHomePage";
import SeniorHomePage from "./components/HomePages/SeniorHomePage";
import UnregisteredHomePage from "./components/HomePages/UnregisteredHomePage";
import { useSelector } from "react-redux";
import { RootState } from "./reducers";

export default function App() {
  const userData = useSelector((state: RootState) => state.app.userData);

  return (
    <div>
      <AccountPageDialog />
      <AuthDialog />
      <SchedulerAppBar />
      {(() => {
        switch (userData.accountType) {
          case "Regular":
            return <RegularHomePage />;
          case "Student":
            return <StudentHomePage />;
          case "Senior":
            return <SeniorHomePage />;
          default:
            return <UnregisteredHomePage />;
        }
      })()}
    </div>
  );
}
