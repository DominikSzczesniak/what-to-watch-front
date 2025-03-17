import {Button} from "@mui/material";

export interface AddMovieButtonProps {
    onClick: () => void;
}

export const AddMovieButton = ({onClick}: AddMovieButtonProps) => {
    return (
        <Button variant="contained" onClick={onClick}>Dodaj film</Button>
    );
}