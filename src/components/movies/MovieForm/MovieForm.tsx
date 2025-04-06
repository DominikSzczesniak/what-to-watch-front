import {Movie} from "../../../model/Movie";
import {Grid2, TextField} from "@mui/material";

interface MovieFormProps {
    movie: Movie;
    onMovieChange: (movie: Movie) => void;
}

export const MovieForm = ({movie, onMovieChange}: MovieFormProps) => {
    const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        onMovieChange({...movie, title: event.target.value});
    };

    return (
        <Grid2 container rowSpacing={2}>
            <TextField
                fullWidth
                size="medium"
                value={movie.title}
                onChange={onChangeTitle}
                label="Movie title"
                type="text"
                sx={{marginTop: 2}}
            />
        </Grid2>
    )
}