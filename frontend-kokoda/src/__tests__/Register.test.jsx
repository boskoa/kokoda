import configureStore from "redux-mock-store";
import { beforeEach } from "vitest";
import { defaultStore } from "./stores";

const mockStore = configureStore([]);

describe("Testing Register component", () => {
  let store;
  beforeEach(() => {
    store = mockStore(defaultStore);
  });
});
