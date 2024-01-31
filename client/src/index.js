import React from "react";
import Login from "./components/Login";
import "./index.css";
import ReactDOM, { createRoot } from "react-dom/client";
import routes from "./routes"
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { UserProvider } from "./components/UserContext";

const router = createBrowserRouter(routes)
const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<RouterProvider router={router} />)
// root.render(
//     <React.StrictMode>
//         <UserProvider router={router}>
//             <Login />
//         </UserProvider>;
//     </React.StrictMode>
// )
