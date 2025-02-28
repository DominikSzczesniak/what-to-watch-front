import Redirects from "./Redirects";
import {createBrowserRouter} from "react-router-dom";
import {Layout} from "./components/common/Layout";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {path: "/", element: <Redirects/>},
        ],
    },
]);