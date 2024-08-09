import { useContext } from "react"
import { AuthContext } from "../handles/AuthProvider"
import HomePage from "./HomePage";
import UserHomePage from "./UserHomePage";

const UserOrHomeRouter = () => {

    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);

  return (
    <>
        {isAuthenticated ? (
            <UserHomePage />
        ): (
            <HomePage />
        )}
    </>
  )
}

export default UserOrHomeRouter
