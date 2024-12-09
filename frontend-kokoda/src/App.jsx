import { Suspense, lazy, useEffect, useState } from "react";
import HomePage from "./components/HomePage";
import { ThemeProvider } from "styled-components";
import { dark, light } from "./themes";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Test from "./components/Test";
import ViewPort from "./components/ViewPort";
import Intro from "./components/Intro";
import { useDispatch } from "react-redux";
import { getAllChats } from "./features/chats/chatsSlice";
import { getAllContacts } from "./features/contacts/contactsSlice";

const Contacts = lazy(() => import("./components/HomePage/Contacts"));
const Chats = lazy(() => import("./components/HomePage/Chats"));
const Chat = lazy(() => import("./components/Chat.jsx"));

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
    dispatch(getAllChats({ offset: 0, limit: 20 }));
    dispatch(getAllContacts({ offset: 0, limit: 20 }));
  }, []);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");

    // Event listener for WebSocket connection open
    socket.addEventListener("open", () => {
      console.log("Connected to WebSocket server.");
    });

    // Event listener for incoming messages
    socket.addEventListener("message", (event) => {
      console.log("MESSAGE RECEIVED");
    });

    // Function to send messages
    function sendMessage() {
      socket.send("IT'S ALIVE");
      console.log("IT'S ALIVE");
    }

    sendMessage();
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
      ],
    },
    {
      path: "test",
      element: <Test />,
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
