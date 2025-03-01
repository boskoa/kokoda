const { Provider } = require("react-redux");
const { BrowserRouter } = require("react-router-dom");

function TestProvider({ store, children }) {
  return (
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );
}

export default TestProvider;
