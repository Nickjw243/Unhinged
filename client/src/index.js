import React from "react";
import Login from "./components/Login";
import "./index.css";
import ReactDOM from "react-dom/client";
import routes from "./routes"
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import SearchSandwiches from "./components/SearchSandwiches";
// import SearchByRestaurant from "./components/SearchByRestaurant";
// import RestaurantList from "./components/RestaurantList";
// import SandwichProfile from "./components/SandwichProfile";
// import UserProfile from "./components/UserProfile";
// import App from "./components/App";
import 'bootstrap/dist/css/bootstrap.min.css';
// import "./components/Modal/Modal.css"
import store from "./components/store"; 
import { Provider } from "react-redux";


const router = createBrowserRouter(routes)
const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
// root.render(<RouterProvider router={router} />)
root.render(
    <Provider store={store}>
        <RouterProvider router={router}>
            <Login />
            {/* <SearchSandwiches />
            <SearchByRestaurant />
            <RestaurantList />
            <SandwichProfile />
            <UserProfile /> */}
        </RouterProvider>
    </Provider>
)
