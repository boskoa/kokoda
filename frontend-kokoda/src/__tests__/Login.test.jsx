import configureStore from "redux-mock-store";
import { beforeEach, describe, expect, test } from "vitest";
import userEvent from "@testing-library/user-event";
import { screen, render } from "@testing-library/react";
import TestProvider from "./TestProvider";
import { defaultStore } from "./stores";
import Login from "../components/Authentication/Login";

const mockStore = configureStore([]);

describe("Testing Register component", () => {
  let store;
  beforeEach(() => {
    store = mockStore(defaultStore);
  });

  test("Renders register button", () => {
    render(
      <TestProvider store={store}>
        <Login />
      </TestProvider>,
    );

    const registerButton = screen.getByText("Not registered?");
    expect(registerButton).toBeInTheDocument();
  });

  test("Renders username input", () => {
    render(
      <TestProvider store={store}>
        <Login />
      </TestProvider>,
    );

    const usernameInput = screen.getByRole("textbox", {
      placeholder: "username",
    });
    expect(usernameInput).toBeInTheDocument();
  });

  test("Username input can be entered", async () => {
    const user = userEvent.setup();

    render(
      <TestProvider store={store}>
        <Login />
      </TestProvider>,
    );

    const usernameInput = screen.getByRole("textbox", {
      placeholder: "username",
    });
    expect(usernameInput).toBeInTheDocument();
    await user.click(usernameInput);
    await user.type(usernameInput, "tester");
    expect(usernameInput).toHaveValue("tester");
  });

  test("Password input can be entered", async () => {
    const user = userEvent.setup();

    render(
      <TestProvider store={store}>
        <Login />
      </TestProvider>,
    );

    const passwordInput = screen.getByRole("textbox", {
      placeholder: "password",
    });
    const passwordError = screen.getByTestId("password-error");
    expect(passwordInput).toBeInTheDocument();
    expect(passwordError).toBeInTheDocument();
    expect(passwordError).toHaveTextContent("");
    await user.click(passwordInput);
    await user.type(passwordInput, "tester");
    expect(passwordInput).toHaveValue("tester");
  });
});
