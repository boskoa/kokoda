import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { dark } from "../themes";

function TestProvider({ store, children }) {
  return (
    <ThemeProvider theme={dark}>
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default TestProvider;
