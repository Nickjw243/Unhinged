import Login from "./components/Login"
import RestaurantList from "./components/RestaurantList"
import SandwichProfile from "./components/SandwichProfile"
import SearchByRestaurant from "./components/SearchByRestaurant"
import SearchSandwiches from "./components/SearchSandwiches"
import SignUp from "./components/SignUp"
import UserProfile from "./components/UserProfile"


const routes = [
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/signup",
        element: <SignUp />
    },
    {
        path: "/sandwiches",
        element: <SearchSandwiches />
    },
    {
        path: "/restaurants",
        element: <SearchByRestaurant />
    },
    {
        path: "/sandwiches/:id",
        element: <SandwichProfile />
    },
    {
        path: "/restaurants/:id",
        element: <RestaurantList />
    },
    {
        path: "/user_profile/:id",
        element: <UserProfile />
    }
]

export default routes