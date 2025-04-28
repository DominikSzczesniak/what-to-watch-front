import {useEffect, useState} from "react";
import {MovieApi} from "../../../api/MovieApi";
import {Movie} from "../../../model/Movie";
import {
    Autocomplete,
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {MovieForm} from "../MovieForm/MovieForm";
import {MovieTag} from "../../../model/MovieTag";

interface MovieEditProps {
    movieId: number;
    onSave: () => void;
    onCancel: () => void;
}

export const MovieEdit = (props: MovieEditProps) => {
    const [movie, setMovie] = useState<Movie>();
    const [selectedTag, setSelectedTag] = useState<MovieTag | string | null>(null);
    const [availableTags, setAvailableTags] = useState<MovieTag[]>([]);

    useEffect(() => {
        getMovie(props.movieId);
        fetchTags();
    }, [movie]);

    const getMovie = (movieId: number) => {
        MovieApi.getMovieById(movieId)
            .then((movie) => setMovie(movie))
            .catch((error: Error) => console.log(error))
    }

    const fetchTags = async () => {
        try {
            const userTags = await MovieApi.getTags();
            setAvailableTags(userTags);
        } catch (error) {
            console.error("Error fetching tags:", error);
        }
    };

    const handleAddTag = async (tag: MovieTag | string) => {
        if (!movie) return;
        try {
            if (typeof tag === 'string') {
                await MovieApi.addTagToMovie(movie.movieId, tag);
            } else {
                await MovieApi.addTagToMovie(movie.movieId, undefined, tag.tagId);
            }
            await fetchTags();
            getMovie(movie.movieId);
            setSelectedTag(null);
        } catch (error) {
            console.error("Error adding tag:", error);
        }
    };

    const handleDeleteTag = async (tagId: string) => {
        if (!movie) return;
        try {
            await MovieApi.deleteTagFromMovie(movie.movieId, tagId);
            await fetchTags();
            getMovie(movie.movieId);
        } catch (error) {
            console.error("Error deleting tag:", error);
        }
    };

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
        <Dialog open={true} onClose={props.onCancel} fullWidth maxWidth="md">
            <DialogTitle>Edit Movie</DialogTitle>
            <DialogContent>
                {movie && (
                    <>
                        <MovieForm movie={movie} onMovieChange={setMovie}/>
                        <Box sx={{mt: 2}}>
                            <Typography variant="subtitle1">Tags</Typography>
                            <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2}}>
                                {movie.tags?.map((tag) => (
                                    <Chip
                                        key={tag.tagId}
                                        label={tag.tagLabel}
                                        onDelete={() => handleDeleteTag(tag.tagId)}
                                    />
                                ))}
                            </Box>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Autocomplete
                                    freeSolo
                                    value={selectedTag}
                                    onChange={(event, newValue) => setSelectedTag(newValue)}
                                    options={availableTags}
                                    getOptionLabel={(option) => typeof option === 'string' ? option : option.tagLabel}
                                    sx={{width: '100%'}}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Add Tag"
                                            variant="outlined"
                                            fullWidth
                                        />
                                    )}
                                    slotProps={{
                                        listbox: {
                                            style: {
                                                maxHeight: '200px',
                                                width: '100%',
                                            }
                                        }
                                    }}
                                />
                                <Button
                                    variant="contained"
                                    onClick={() => selectedTag && handleAddTag(selectedTag)}
                                    disabled={!selectedTag}
                                    sx={{minWidth: '100px'}}
                                >
                                    Add
                                </Button>
                            </Stack>
                        </Box>
                    </>
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