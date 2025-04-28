import {IconButton, TableCell, TableRow, Tooltip} from "@mui/material";
import {Movie} from "../../../model/Movie";
import {useState} from "react";
import {MovieEdit} from "../MovieEdit/MovieEdit";
import RestoreIcon from '@mui/icons-material/Restore';
import DeleteIcon from '@mui/icons-material/Delete';
import {MovieApi} from "../../../api/MovieApi";

export interface MovieListElementProps {
    movie: Movie;
    getMovies: () => void;
    onTagAdded: () => void;
}

export const MovieListElement = ({movie, getMovies, onTagAdded}: MovieListElementProps) => {
    const [openEdit, setOpenEdit] = useState(false);

    const handleMarkAsWatched = async () => {
        try {
            await MovieApi.moveMovieToWatchedList(movie.movieId);
            getMovies();
        } catch (error) {
            console.error("Error marking movie as watched:", error);
        }
    };

    const handleDelete = async () => {
        try {
            await MovieApi.deleteMovie(movie.movieId);
            getMovies();
        } catch (error) {
            console.error("Error deleting movie:", error);
        }
    };

    return (
        <>
            {openEdit && (
                <MovieEdit
                    movieId={movie.movieId}
                    onSave={() => {
                        setOpenEdit(false);
                        getMovies();
                    }}
                    onCancel={() => setOpenEdit(false)}
                    onTagAdded={onTagAdded}
                />
            )}

            <TableRow hover>
                <TableCell onClick={() => setOpenEdit(true)} sx={{cursor: 'pointer'}}>
                    {`${movie.title}`}
                </TableCell>
                <TableCell align="right">
                    <Tooltip title="Mark as watched" arrow>
                        <IconButton onClick={handleMarkAsWatched} color="primary">
                            <RestoreIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete movie" arrow>
                        <IconButton onClick={handleDelete} color="primary">
                            <DeleteIcon/>
                        </IconButton>
                    </Tooltip>
                </TableCell>
            </TableRow>
        </>
    );
};