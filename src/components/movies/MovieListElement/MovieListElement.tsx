import {TableCell, TableRow} from "@mui/material";
import {Movie} from "../../../model/Movie";
import {useState} from "react";
import {MovieEdit} from "../MovieEdit/MovieEdit";

export interface MovieListElementProps {
    movie: Movie;
    getMovies: () => void;
}

export const MovieListElement = ({movie, getMovies}: MovieListElementProps) => {
    const [openEdit, setOpenEdit] = useState(false);

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
                />
            )}

            <TableRow hover sx={{cursor: 'pointer'}} onClick={() => setOpenEdit(true)}>
                <TableCell>
                    {`${movie.title}`}
                </TableCell>
            </TableRow>
        </>
    );
};