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
import { SERVER_URL } from "../../environment/env";
import axios from "axios";

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

  // Retrieve user info from server when enter in the page
  useEffect(() => {
    retrieveUserData();
  }, []);

  const retrieveUserData = () => {
    console.log(userData._id);
    axios
      .post(SERVER_URL + "/retrieveUserData", { userId: userData._id })
      .then((res: any) => {
        console.log(res.data);
        if (res.data.msg === "Data Retrieved Successful") {
          setUserScheduleData({
            ...userScheduleData,
            bindingData: props.timetable
              ? res.data.timetableData
                ? res.data.timetableData
                : []
              : res.data.scheduleData
              ? res.data.scheduleData
              : [],
          });
        } else {
          alert(res.data.msg);
        }
      });
  };

  const saveUserData = () => {
    axios
      .post(SERVER_URL + "/storeUserData", userScheduleData)
      .then((res: any) => {
        alert(res.data.msg);
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

  if (userData.accountType === "Senior") document.body.style.zoom = "150%";

  return (
    <ScheduleComponent
      popupOpen={onPopupOpen}
      eventSettings={{ dataSource: userScheduleData.bindingData }}
      actionComplete={onactionComplete}
      views={
        userData.accountType !== "Senior" ? ["Day", "Week", "Month"] : ["Day"]
      }
    >
      <Inject
        services={
          userData.accountType !== "Senior" ? [Day, Week, Month] : [Day]
        }
      />
    </ScheduleComponent>
  );
}
