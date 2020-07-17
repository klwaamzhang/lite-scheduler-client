import React, { useEffect } from "react";
import {
  ScheduleComponent,
  Inject,
  Day,
  Week,
  Month,
} from "@syncfusion/ej2-react-schedule";
import { createElement } from "@syncfusion/ej2-base";
import { DropDownList } from "@syncfusion/ej2-dropdowns";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";

type RegularHomePageProps = {
  timetable?: boolean;
};

export default function RegularHomePage(props: RegularHomePageProps) {
  const userData = useSelector((state: RootState) => state.app.userData);
  const [userScheduleData, setUserScheduleData] = React.useState<{
    userId: string;
    bindingData: any[];
    isTimetable: boolean;
  }>({
    userId: userData._id,
    bindingData: [],
    isTimetable: props.timetable || false,
  });

  console.log("data: " + JSON.stringify(userScheduleData));

  // Attach sendEmail dropdown to schedule editor page
  const onPopupOpen = (args: any) => {
    if (args.type === "Editor") {
      if (!args.element.querySelector(".custom-field-row")) {
        let row = createElement("div", { className: "custom-field-row" });
        let formElement = args.element.querySelector(".e-schedule-form");

        formElement.firstChild.insertBefore(
          row,
          formElement.firstChild.children[6]
        );

        let container = createElement("div", {
          className: "custom-field-container",
        });
        let inputEle = createElement("input", {
          className: "e-field",
          attrs: { name: "SendEmailTime" },
        });

        console.log("onPopupOpen: " + args);

        container.appendChild(inputEle);
        row.appendChild(container);

        let sendEmailDL = new DropDownList({
          dataSource: [
            { text: "None", value: 0 },
            { text: "Before 5 minutes", value: 5 },
            { text: "Before 10 minutes", value: 10 },
            { text: "Before 20 minutes", value: 20 },
          ],
          fields: { text: "text", value: "value" },
          value: 0,
          floatLabelType: "Always",
          placeholder: "Send Email Notification",
        });
        sendEmailDL.appendTo(inputEle);
        inputEle.setAttribute("name", "SendEmailTime");
      }
    }
  };

  // retrive user info when user id changes
  useEffect(() => {
    retrieveUserData();
  }, [userScheduleData.userId]);

  const retrieveUserData = () => {
    console.log(userData._id);
    const res = fetch("http://localhost:8555/retrieveUserData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: userData._id }),
    });
    res
      .then((data) => data.json())
      .then((data: any) => {
        console.log(data);
        if (data.msg !== 0 || data.msg !== -1) {
          setUserScheduleData({
            ...userScheduleData,
            bindingData: props.timetable
              ? data.timetableData
                ? data.timetableData
                : []
              : data.scheduleData
              ? data.scheduleData
              : [],
          });
        } else {
          alert(data.msg);
        }
      });
  };

  const saveUserData = () => {
    const res = fetch("http://localhost:8555/storeUserData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userScheduleData),
    });
    res
      .then((res) => res.json())
      .then((data: any) => {
        alert(data.msg);
      });
  };

  // when the following actions completed, save user data to the database
  const onactionComplete = (args: any) => {
    if (
      args.requestType === "eventCreated" ||
      args.requestType === "eventChanged" ||
      args.requestType === "eventRemoved"
    ) {
      saveUserData();
    }
  };

  return (
    <ScheduleComponent
      popupOpen={onPopupOpen}
      eventSettings={{ dataSource: userScheduleData.bindingData }}
      actionComplete={onactionComplete}
      views={["Day", "Week", "Month"]}
    >
      <Inject services={[Day, Week, Month]} />
    </ScheduleComponent>
  );
}
