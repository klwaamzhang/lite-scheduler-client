import React, { useEffect } from "react";
import { ScheduleComponent, Inject, Day } from "@syncfusion/ej2-react-schedule";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { SERVER_URL } from "../../environment/env";
import axios from "axios";

export default function SeniorHomePage() {
  const userData = useSelector((state: RootState) => state.app.userData);
  const [userScheduleData, setUserScheduleData] = React.useState<{
    userId: string;
    bindingData: any[];
  }>({
    userId: userData._id,
    bindingData: [],
  });

  useEffect(() => {
    retrieveUserData();
  }, [userScheduleData.userId]);

  const retrieveUserData = () => {
    console.log(userData._id);

    axios
      .post(SERVER_URL + "/retrieveUserData", { userId: userData._id })
      .then((res: any) => {
        console.log(res.data);
        if (res.data.msg !== 0 || res.data.msg !== -1) {
          setUserScheduleData({
            ...userScheduleData,
            bindingData: res.data.scheduleData,
          });
        } else {
          alert(res.data.msg);
        }
      });

    // const res = fetch(SERVER_URL + "/retrieveUserData", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ userId: userData._id }),
    // });
    // res
    //   .then((data) => data.json())
    //   .then((data: any) => {
    //     console.log(data);
    //     if (data.msg !== 0 || data.msg !== -1) {
    //       setUserScheduleData({
    //         ...userScheduleData,
    //         bindingData: data.scheduleData,
    //       });
    //     } else {
    //       alert(data.msg);
    //     }
    //   });
  };

  const saveUserData = () => {
    axios
      .post(SERVER_URL + "/storeUserData", userScheduleData)
      .then((res: any) => {
        alert(res.data.msg);
      });

    // const res = fetch(SERVER_URL + "/storeUserData", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(userScheduleData),
    // });
    // res
    //   .then((res) => res.json())
    //   .then((data: any) => {
    //     alert(data.msg);
    //   });
  };

  const onactionComplete = (args: any) => {
    if (
      args.requestType === "eventCreated" ||
      args.requestType === "eventChanged" ||
      args.requestType === "eventRemoved"
    ) {
      saveUserData();
    }
  };

  document.body.style.zoom = "150%";

  return (
    <ScheduleComponent
      width="100%"
      views={["Day"]}
      actionComplete={onactionComplete}
      eventSettings={{ dataSource: userScheduleData.bindingData }}
    >
      <Inject services={[Day]} />
    </ScheduleComponent>
  );
}