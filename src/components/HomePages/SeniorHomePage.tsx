import React, { useEffect } from "react";
import { ScheduleComponent, Inject, Day } from "@syncfusion/ej2-react-schedule";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";

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
            bindingData: data.scheduleData,
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

  const editorTemplate = (
    props:
      | {
          EventType: any;
          startTime: any;
          StartTime: any;
          endTime: any;
          EndTime: any;
        }
      | undefined
  ) => {
    return props !== undefined ? (
      <table className="custom-event-editor" style={{ width: "100%" }}>
        <tbody>
          <tr>
            <td className="e-textlabel">Title</td>
            <td colSpan={4}>
              <input
                id="Summary"
                className="e-field e-input"
                type="text"
                name="Subject"
                style={{ width: "100%" }}
              />
            </td>
          </tr>
          <tr>
            <td className="e-textlabel">From</td>
            <td colSpan={4}>
              <DateTimePickerComponent
                format="dd/MM/yy hh:mm a"
                id="StartTime"
                data-name="StartTime"
                value={new Date(props.startTime || props.StartTime)}
                className="e-field"
              ></DateTimePickerComponent>
            </td>
          </tr>
          <tr>
            <td className="e-textlabel">To</td>
            <td colSpan={4}>
              <DateTimePickerComponent
                format="dd/MM/yy hh:mm a"
                id="EndTime"
                data-name="EndTime"
                value={new Date(props.endTime || props.EndTime)}
                className="e-field"
              ></DateTimePickerComponent>
            </td>
          </tr>
          <tr>
            <td className="e-textlabel">Reason</td>
            <td colSpan={4}>
              <textarea
                id="Description"
                className="e-field e-input"
                name="Description"
                rows={3}
                cols={50}
                style={{
                  width: "100%",
                  height: "60px !important",
                  resize: "vertical",
                }}
              ></textarea>
            </td>
          </tr>
        </tbody>
      </table>
    ) : (
      <div></div>
    );
  };

  return (
    <ScheduleComponent
      width="100%"
      views={["Day"]}
      editorTemplate={editorTemplate}
      actionComplete={onactionComplete}
      eventSettings={{ dataSource: userScheduleData.bindingData }}
    >
      <Inject services={[Day]} />
    </ScheduleComponent>
  );
}
