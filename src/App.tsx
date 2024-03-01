import { RouterProvider } from "react-router";
import { router } from "./routers/routrers";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import './style.css';

export const App = () => {
  
  return <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
}
