import {useEffect, useState} from "react";
import {MovieApi} from "../../../api/MovieApi";
import {Movie} from "../../../model/Movie";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {MovieForm} from "../MovieForm/MovieForm";

interface MovieEditProps {
    movieId: number;
    onSave: () => void;
    onCancel: () => void;
}

export const MovieEdit = (props: MovieEditProps) => {
    const [movie, setMovie] = useState<Movie>();

    useEffect(() => {
        getMovie(props.movieId);
    }, []);

    const getMovie = (movieId: number) => {
        MovieApi.getMovieById(movieId)
            .then((movie) => setMovie(movie))
            .catch((error: Error) => console.log(error))
    }

    const changeMovie = () => {
        if (movie) {
            MovieApi.update(movie)
                .then(() => {
                    props.onSave();
                })
                .catch((error) => console.log(error))
        }
    }
    return (
        <Dialog open={true} onClose={props.onCancel} fullWidth>
            <DialogTitle>Edit Movie</DialogTitle>
            <DialogContent>
                {movie && (
                    <MovieForm movie={movie} onMovieChange={setMovie}/>
                )}
            </DialogContent>

            <DialogActions>
                <Button variant="outlined" onClick={props.onCancel}>
                    Cancel
                </Button>
                <Button variant="contained" onClick={changeMovie}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}