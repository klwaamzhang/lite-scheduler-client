import React from "react";
import SchedulerAppBar from "./components/Appbar";
import AuthDialog from "./components/AuthPages/AuthDialog";
import AccountPageDialog from "./components/AccountPage/AccountPageDialog";
import RegularHomePage from "./components/HomePages/RegularHomePage";
import StudentHomePage from "./components/HomePages/StudentHomePage";
import SeniorHomePage from "./components/HomePages/SeniorHomePage";
import UnregisteredHomePage from "./components/HomePages/UnregisteredHomePage";
import { useSelector } from "react-redux";
import { RootState } from "./reducers";

export default function App() {
  const userData = useSelector((state: RootState) => state.app.userData);

  return (
    <>
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
    </>
  );
}
