import React from "react";
import { render, findByTestId, fireEvent } from "@testing-library/react";
import Appbar from "../components/Appbar";
import { AppProvider } from "../context/AppContext";
import Accountpage from "../components/AccountPageComponents/AccountPage";

// describe("<Appbar />", () => {
//   // unit test 6
//   test("renders User Account button to the Appbar compoment if signed in", async () => {
//     const value = { isSignedin: true };
//     const { getByText } = render(
//       <AppProvider value={value}>
//         <Appbar />
//       </AppProvider>
//     );
//     const accountBtnElement = await getByText(/User Account/i);

//     expect(accountBtnElement).toBeInTheDocument();
//   });

//   // unit test 7
//   test("click User Account button to open up user account page if signed in", async () => {
//     const isSignedin = { isSignedin: true };
//     const userData = {
//       userData: {
//         _id: 12345,
//         emailAddress: "test@gmail.com",
//         userName: "testUserName",
//         password: "password",
//         accountType: "Regular",
//       },
//     };
//     const { getByText } = render(
//       <AppProvider value={isSignedin}>
//         <Appbar />
//       </AppProvider>
//     );
//     const { getByTestId } = render(
//       <AppProvider value={userData}>
//         <Accountpage />
//       </AppProvider>
//     );
//     const accountBtnElement = await getByText(/User Account/i);
//     const accountForm = await getByTestId("account-form");

//     fireEvent.click(accountBtnElement);

//     expect(accountForm).toBeInTheDocument();
//   });
// });

// describe("<AccountPage />", () => {
//   // unit test 8
//   test("Show Regular Type if user type is Regular in account page", async () => {
//     const userData = {
//       userData: {
//         _id: 12345,
//         emailAddress: "testRegular@gmail.com",
//         userName: "testRegularUser",
//         password: "password",
//         accountType: "Regular",
//       },
//     };

//     const { getByText } = render(
//       <AppProvider value={userData}>
//         <Accountpage />
//       </AppProvider>
//     );
//     const regularType = await getByText(/Regular/i);

//     expect(regularType).toBeInTheDocument();
//   });

//   // unit test 9
//   test("Show Senior Type if user type is Senior in account page", async () => {
//     const userData = {
//       userData: {
//         _id: 12345,
//         emailAddress: "testSenior@gmail.com",
//         userName: "testSeniorUser",
//         password: "password",
//         accountType: "Senior",
//       },
//     };

//     const { getByText } = render(
//       <AppProvider value={userData}>
//         <Accountpage />
//       </AppProvider>
//     );
//     const seniorType = await getByText(/Senior/i);

//     expect(seniorType).toBeInTheDocument();
//   });

//   // unit test 10
//   test("Show Student Type if user type is Student in account page", async () => {
//     const userData = {
//       userData: {
//         _id: 12345,
//         emailAddress: "testStudent@gmail.com",
//         userName: "testStudentUser",
//         password: "password",
//         accountType: "Student",
//       },
//     };

//     const { getByText } = render(
//       <AppProvider value={userData}>
//         <Accountpage />
//       </AppProvider>
//     );
//     const studentType = await getByText(/Student/i);

//     expect(studentType).toBeInTheDocument();
//   });
// });
