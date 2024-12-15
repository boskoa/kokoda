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
import { useDispatch } from "react-redux";
import { getAllChats } from "./features/chats/chatsSlice";
import { getAllContacts } from "./features/contacts/contactsSlice";
import useWebSocket from "react-use-websocket";

const Contacts = lazy(() => import("./components/HomePage/Contacts"));
const Chats = lazy(() => import("./components/HomePage/Chats"));
const Chat = lazy(() => import("./components/Chat/index.jsx"));
const Login = lazy(() => import("./components/Login"));

const WS_URL = "ws://127.0.0.1:3003/websockets";

function App() {
  const [theme, setTheme] = useState("dark");
  const dispatch = useDispatch();

  const { sendMessage, readyState } = useWebSocket(WS_URL, {
    onOpen: () => {
      console.log("WebSocket connection established.");
    },
    retryOnError: true,
    shouldReconnect: () => true,
  });

  useEffect(() => {
    const root = document.getElementById("root");
    root.style.backgroundColor = (
      theme === "dark" ? dark : light
    ).main.containerBg;
  }, [theme]);

  useEffect(() => {
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
              element: (
                <Suspense>
                  <Chats />
                </Suspense>
              ),
            },
            {
              path: "chats/:id",
              element: (
                <Suspense>
                  <Chat />
                </Suspense>
              ),
            },
            {
              path: "contacts",
              element: (
                <Suspense>
                  <Contacts />
                </Suspense>
              ),
            },
          ],
        },
        {
          path: "login",
          element: (
            <Suspense fallback={<p>Loading</p>}>
              <Login />
            </Suspense>
          ),
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

  return (
    <>
      <ThemeProvider theme={theme === "dark" ? dark : light}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
