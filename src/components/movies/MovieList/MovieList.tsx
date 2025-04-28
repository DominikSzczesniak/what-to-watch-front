import {useEffect, useState} from "react";
import {Box, Stack, Table, TableBody, TableContainer} from "@mui/material";
import {MovieApi} from "../../../api/MovieApi";
import {Movie} from "../../../model/Movie";
import {MovieTag} from "../../../model/MovieTag";
import {AddFirstElementIcon} from "../../common/AddFirstElementIcon/AddFirstElementIcon";
import {MovieListElement} from "../MovieListElement/MovieListElement";
import {AddMovieButton} from "../AddMovieButton/AddMovieButton";
import {AddMovieModal} from "../AddMovieModal/AddMovieModal";
import {TagFilter} from "../../common/TagFilter/TagFilter";

export const MovieList = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [open, setOpen] = useState(false);
    const [availableTags, setAvailableTags] = useState<MovieTag[]>([]);
    const [selectedTags, setSelectedTags] = useState<MovieTag[]>([]);

    useEffect(() => {
        getMovies();
        fetchTags();
    }, [selectedTags]);

    const fetchTags = async () => {
        try {
            const tags = await MovieApi.getTags();
            setAvailableTags(tags);
        } catch (error) {
            console.error("Error fetching tags:", error);
        }
    };

    const handleTagAdded = () => {
        fetchTags();
    };

    const getMovies = () => {
        const tagIds = selectedTags.map(tag => tag.tagId);
        MovieApi.fetchMovies(tagIds)
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

    const renderContent = () => (
        <Stack spacing={2} alignItems="center">
            <Box maxWidth={1000} width="100%" display="flex" flexDirection="column" gap={2}>
                <TagFilter
                    availableTags={availableTags}
                    selectedTags={selectedTags}
                    onTagsChange={setSelectedTags}
                />
                {movies.length === 0 ? (
                    <Stack spacing={2} alignItems="center">
                        <AddFirstElementIcon label="No movies found" text="Add a new movie"/>
                        <AddMovieButton onClick={handleClickAddMovieButton}/>
                    </Stack>
                ) : (
                    <>
                        <TableContainer>
                            <Table>
                                <TableBody>
                                    {movies.map((movie: Movie) => (
                                        <MovieListElement
                                            key={movie.movieId}
                                            movie={movie}
                                            getMovies={getMovies}
                                            onTagAdded={handleTagAdded}
                                        />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <AddMovieButton onClick={handleClickAddMovieButton}/>
                    </>
                )}
            </Box>
        </Stack>
    );

    return (
        <>
            {renderContent()}
            {open && (
                <AddMovieModal
                    onCancel={handleClose}
                    onSubmit={handleAddMovie}
                />
            )}
        </>
    );
};