import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {useState} from "react";

export interface AddMovieModalProps {
    onCancel: () => void;
    onSubmit: (title: string) => void;
}

export const AddMovieModal = ({onCancel, onSubmit}: AddMovieModalProps) => {
    const [title, setTitle] = useState("");
    return (
        <Dialog fullWidth open={true} onClose={onCancel}>
            <DialogTitle>Dodaj film</DialogTitle>
            <form onSubmit={(e) => {
                e.preventDefault();
                onSubmit(title);
            }}>
                <DialogContent>
                    <TextField
                        fullWidth
                        size="small"
                        type="text"
                        label="Title"
                        margin="dense"
                        onChange={e => setTitle(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCancel} color="secondary">
                        Cancel
                    </Button>
                    <Button type="submit" color="primary" variant="contained">
                        Submit
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}