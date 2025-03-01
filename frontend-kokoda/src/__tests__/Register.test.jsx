import configureStore from "redux-mock-store";
import { beforeEach, describe, expect, test } from "vitest";
import userEvent from "@testing-library/user-event";
import { screen, render } from "@testing-library/react";
import TestProvider from "./TestProvider";
import { defaultStore } from "./stores";
import Register from "../components/Authentication/Register";

const mockStore = configureStore([]);

describe("Testing Register component", () => {
  let store;
  beforeEach(() => {
    store = mockStore(defaultStore);
  });

  test("Renders login button", () => {
    render(
      <TestProvider store={store}>
        <Register />
      </TestProvider>,
    );

    const loginButton = screen.getByText("Already registered?");
    expect(loginButton).toBeInTheDocument();
  });

  test("Renders name input", () => {
    render(
      <TestProvider store={store}>
        <Register />
      </TestProvider>,
    );

    const nameInput = screen.queryAllByPlaceholderText("name")[0];
    expect(nameInput).toBeInTheDocument();
  });

  test("Name input can be entered", async () => {
    const user = userEvent.setup();

    render(
      <TestProvider store={store}>
        <Register />
      </TestProvider>,
    );

    const nameInput = screen.queryAllByPlaceholderText("name")[0];
    expect(nameInput).toBeInTheDocument();
    await user.click(nameInput);
    await user.type(nameInput, "tester");
    expect(nameInput).toHaveValue("tester");
  });

  test("Password input can be entered", async () => {
    const user = userEvent.setup();

    render(
      <TestProvider store={store}>
        <Register />
      </TestProvider>,
    );

    const passwordInput = screen.queryAllByPlaceholderText("password")[0];
    const passwordError = screen.getByTestId("password-error");
    expect(passwordInput).toBeInTheDocument();
    expect(passwordError).toBeInTheDocument();
    expect(passwordError).toHaveTextContent("");
    await user.click(passwordInput);
    await user.type(passwordInput, "tester");
    expect(passwordInput).toHaveValue("tester");
  });
});
