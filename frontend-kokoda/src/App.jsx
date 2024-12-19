import { Suspense, lazy, useEffect, useState } from "react";
import HomePage from "./components/HomePage";
import { ThemeProvider } from "styled-components";
import { dark, light } from "./themes";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Test from "./components/Test";
import ViewPort from "./components/ViewPort";
import Intro from "./components/Intro";
import Chats from "./components/HomePage/Chats";
import { useDispatch } from "react-redux";
import { getAllChats } from "./features/chats/chatsSlice";
import { getAllContacts } from "./features/contacts/contactsSlice";
import { alreadyLogged } from "./features/login/loginSlice";
import ComponentLoader from "./components/ComponentLoader";

const Contacts = lazy(() => import("./components/HomePage/Contacts"));
const Chat = lazy(() => import("./components/Chat/index.jsx"));
const Authentication = lazy(() => import("./components/Authentication"));
const Login = lazy(() => import("./components/Authentication/Login"));
const Register = lazy(() => import("./components/Authentication/Register"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <ViewPort />,
    children: [
      {
        index: true,
        element: <Intro />,
      },
      {
        path: "",
        element: <HomePage />,
        children: [
          {
            path: "chats",
            element: <Chats />,
          },
          {
            path: "chats/:id",
            element: (
              <Suspense fallback={<ComponentLoader />}>
                <Chat />
              </Suspense>
            ),
          },
          {
            path: "contacts",
            element: (
              <Suspense fallback={<ComponentLoader />}>
                <Contacts />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "authentication",
        element: (
          <Suspense fallback={<ComponentLoader />}>
            <Authentication />
          </Suspense>
        ),
        children: [
          {
            path: "login",
            element: (
              <Suspense>
                <Login />
              </Suspense>
            ),
          },
          {
            path: "register",
            element: (
              <Suspense>
                <Register />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "test",
    element: <Test />,
  },
  {
    path: "*",
    element: <Navigate to="/chats" />,
  },
]);

function App() {
  const [theme, setTheme] = useState("dark");
  const dispatch = useDispatch();

  useEffect(() => {
    const root = document.getElementById("root");
    root.style.backgroundColor = (
      theme === "dark" ? dark : light
    ).main.containerBg;
  }, [theme]);

  useEffect(() => {
    // Fix later
    dispatch(
      getAllChats({
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0ZXN0IiwiaWF0IjoxNzMzMDA3NTc2fQ.y8vfgSOqsPf1TxBn1SxjFkjKMSW3BsNOJdXdZDd28l0",
        offset: 0,
        limit: 20,
      }),
    );
    dispatch(getAllContacts({ offset: 0, limit: 20 }));
  }, []);

  const loggedUser = window.localStorage.getItem("loggedKokoda");
  if (loggedUser) dispatch(alreadyLogged(JSON.parse(loggedUser)));

  return (
    <>
      <ThemeProvider theme={theme === "dark" ? dark : light}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
