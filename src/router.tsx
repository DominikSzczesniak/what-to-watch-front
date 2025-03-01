import {createBrowserRouter} from "react-router-dom";
import {Layout} from "./components/common/Layout";
import {UserGeneral} from "./components/users/UserGeneral";
import {MovieMain} from "./components/movies/MovieMain";
import {Redirects} from "./Redirects";
import {UserRegister} from "./components/users/UserRegister";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {path: "/", element: <Redirects/>},
            {path: "/login", element: <UserGeneral/>},
            {path: "/register", element: <UserRegister/>},
            {path: "/main", element: <MovieMain/>}
        ],
    },
]);