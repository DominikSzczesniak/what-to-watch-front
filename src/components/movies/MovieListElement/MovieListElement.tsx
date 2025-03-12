import {TableCell, TableRow} from "@mui/material";
import {Movie} from "../../../model/Movie";

export interface MovieListElementProps {
    movie: Movie;
}

export const MovieListElement = ({movie}: MovieListElementProps) => {
    return (
        <TableRow
            hover
            sx={{cursor: 'pointer'}}
            onClick={() => null}>
            <TableCell>
                {`${movie.title}`}
            </TableCell>
            <TableCell align="right" padding="none">
            </TableCell>
        </TableRow>
    );
};