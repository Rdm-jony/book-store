import { createBrowserRouter } from "react-router-dom";
import AllBook from "../Categories/AllBook/AllBook";
import BookCardDetails from "../Categories/BookCard/BookCardDetails";
import CategoryBook from "../CategoryBook/CategoryBook";
import AddBook from "../Dashboard/AddBook/AddBook";
import AllUser from "../Dashboard/AllUser/AllUser";
import ErrorPage from "../ErrorPage/ErrorPage";
import Home from "../Home/Home/Home";
import CategoryLayout from "../Layout/CategoryLayout";
import DashBboard from "../Layout/DashBboard";
import Main from "../Layout/Main";
import SignIn from "../LogIn/signIn";
import SignUp from "../LogIn/signUp";
import AdminRoutes from "./AdminRoutes";


export const router = createBrowserRouter([
    {
        path: "/",
        errorElement:<ErrorPage></ErrorPage>,
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/categories",
                element: <CategoryLayout></CategoryLayout>,
                children: [
                    {
                        path: "/categories",
                        element: <AllBook></AllBook>
                    },
                    {
                        path: "/categories/:category",
                        loader: ({ params }) => fetch(`${process.env.REACT_APP_URL}/categoryBook/${params.category}`),
                        element: <CategoryBook></CategoryBook>
                    },
                    
                ]
            },
            {
                path: "/allBook/:id",
                element: <BookCardDetails></BookCardDetails>,
                loader: ({ params }) => fetch(`${process.env.REACT_APP_URL}/allBook/${params.id}`)
            },
            {
                path: "signIn",
                element: <SignIn></SignIn>
            },
            {
                path: "signUp",
                element: <SignUp></SignUp>
            }
        ]
    },
    {
        path: "/dashboard",
        element: <AdminRoutes> <DashBboard></DashBboard></AdminRoutes>,
        children: [
            {
                path: "/dashboard",
                element: <AddBook></AddBook>
            },
            {
                path: "/dashboard/allUsers",
                element: <AllUser></AllUser>
            }
        ]
    }
])