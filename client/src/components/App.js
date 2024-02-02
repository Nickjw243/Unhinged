import { UserProvider } from "./UserContext";
import Login from "./Login";

function App() {
    return (
        <UserProvider>
            <Login />
        </UserProvider>
    )
}

export default App