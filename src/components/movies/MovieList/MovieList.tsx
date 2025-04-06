import {useEffect, useState} from "react";
import {Box, Stack, Table, TableBody, TableContainer} from "@mui/material";
import {MovieApi} from "../../../api/MovieApi";
import {Movie} from "../../../model/Movie";
import {AddFirstElementIcon} from "../../common/AddFirstElementIcon/AddFirstElementIcon";
import {MovieListElement} from "../MovieListElement/MovieListElement";
import {AddMovieButton} from "../AddMovieButton/AddMovieButton";
import {AddMovieModal} from "../AddMovieModal/AddMovieModal";

export const MovieList = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [open, setOpen] = useState(false);

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

    const handleClickAddMovieButton = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddMovie = async (title: string) => {
        try {
            await MovieApi.addMovie({title});
            handleClose();
            getMovies();
        } catch (error) {
            console.error("Error adding movie:", error);
        }
    };

    const renderLoaded = () => {
        console.log(movies)
        if (movies.length === 0) {
            return (
                <Stack spacing={2} alignItems="center">
                    <AddFirstElementIcon label="Brak filmów" text="Dodaj swój pierwszy film"/>
                    <AddMovieButton onClick={handleClickAddMovieButton}/>
                </Stack>
            )
        }
        return renderList();
    };

    const renderList = () => (
        <Stack spacing={2} alignItems="center">
            <Box maxWidth={1000} width="100%" display="flex" justifyContent="center">
                <TableContainer>
                    <Table>
                        <TableBody>
                            {movies && movies.map && movies.map((movie: Movie) => (
                                <MovieListElement
                                    key={movie.movieId}
                                    movie={movie}
                                    getMovies={getMovies}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <AddMovieButton onClick={handleClickAddMovieButton}/>
        </Stack>
    );

    return (
        <>
            {renderLoaded()}

            {open && (
                <AddMovieModal
                    onCancel={handleClose}
                    onSubmit={handleAddMovie}
                />
            )}
        </>
    );
};