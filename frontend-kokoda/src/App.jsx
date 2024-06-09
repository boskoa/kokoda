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
    dispatch(getAllChats());
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
          path: "home",
          element: <HomePage />,
          children: [
            {
              index: true,
              element: (
                <Suspense>
                  <Chats />
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
          path: "chat/:id",
          element: (
            <Suspense>
              <Chat />
            </Suspense>
          ),
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
