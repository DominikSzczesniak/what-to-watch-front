import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/common/Layout/Layout";
import { MovieList } from "./components/movies/MovieList/MovieList";
import { Redirects } from "./Redirects";
import { UserRegister } from "./components/users/UserRegister";
import { UserLogin } from "./components/users/UserLogin";
import { WatchedMoviesList } from "./components/movies/WatchedMovieList/WatchedMovieList";
import {
  UpdateRecommendationConfiguration
} from "./components/recommendations/UpdateRecommendationConfiguration/UpdateRecommendationConfiguration";
import { RecommendedMovieList } from "./components/recommendations/RecommendedMovies/RecommendedMovies";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      { path: "/", element: <Redirects/> },
      { path: "/login", element: <UserLogin/> },
      { path: "/register", element: <UserRegister/> },
      { path: "/main", element: <MovieList/> },
      { path: "/watched", element: <WatchedMoviesList/> },
      { path: "/configuration", element: <UpdateRecommendationConfiguration/> },
      { path: "/recommended", element: <RecommendedMovieList/> },
    ],
  },
]);