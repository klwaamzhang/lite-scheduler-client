import React, { useEffect } from "react";
import {
  ScheduleComponent,
  Inject,
  Day,
  Week,
  Month,
} from "@syncfusion/ej2-react-schedule";
import { Schedule } from "../../@types";

export default function UnregisteredHomePage() {
  const [scheduleData, setScheduleData] = React.useState<Schedule>([]);

  // Get schedule data from localStorage when the page load
  useEffect(() => {
    const localScheduleData = localStorage.getItem("localScheduleData");
    if (localScheduleData != null) {
      setScheduleData(JSON.parse(localScheduleData));
    }
  }, []);

  const storeScheduleData = () => {
    var jsonData = JSON.stringify(scheduleData);
    localStorage.setItem("localScheduleData", jsonData);
  };

  return (
    <ScheduleComponent
      dataBinding={storeScheduleData}
      eventSettings={{ dataSource: scheduleData }}
      views={["Day", "Week", "Month"]}
    >
      <Inject services={[Day, Week, Month]} />
    </ScheduleComponent>
  );
}
