import React from "react";
import Login from "./components/Login";
import "./index.css";
import ReactDOM, { createRoot } from "react-dom/client";
import routes from "./routes"
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { UserProvider } from "./components/UserContext";
import SearchSandwiches from "./components/SearchSandwiches";
import SearchByRestaurant from "./components/SearchByRestaurant";
import RestaurantList from "./components/RestaurantList";
import SandwichProfile from "./components/SandwichProfile";
import UserProfile from "./components/UserProfile";
import App from "./components/App";
import 'bootstrap/dist/css/bootstrap.min.css';
// import "./components/Modal/Modal.css"


const router = createBrowserRouter(routes)
const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
// root.render(<RouterProvider router={router} />)
root.render(
    <React.StrictMode>
        <UserProvider >
            <RouterProvider router={router}>
                <Login />
                {/* <SearchSandwiches />
                <SearchByRestaurant />
                <RestaurantList />
                <SandwichProfile />
                <UserProfile /> */}
            </RouterProvider>
        </UserProvider>
    </React.StrictMode>
)
