import {useEffect, useState} from "react";
import {Table, TableBody, TableContainer} from "@mui/material";
import {MovieApi} from "../../../api/MovieApi";
import {Movie} from "../../../model/Movie";
import {AddFirstElementIcon} from "../../common/AddFirstElementIcon/AddFirstElementIcon";
import {MovieListElement} from "../MovieListElement/MovieListElement";

export const MovieList = () => {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        getMovies();
    }, []);

    const getMovies = () => {
        MovieApi.fetchMovies()
            .then((response) => {
                setMovies(response.movies);
            })
            .catch((error: Error) => {
                console.error("Error fetching movies:", error);
                setMovies([]);
            });
    }

    const renderLoaded = () => {
        console.log(movies)
        if (movies.length === 0) {
            return (
                <AddFirstElementIcon label="Brak filmów" text="Dodaj swój pierwszy film"/>
            )
        }
        return renderList();
    };

    const renderList = () => (
        <TableContainer>
            <Table>
                <TableBody>
                    {movies && movies.map && movies.map((movie: Movie) => (
                        <MovieListElement
                            key={movie.id}
                            movie={movie}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

    return (
        renderLoaded()
    );
};