import React, {useEffect, useState} from "react";
import {MovieApi} from "../../../api/MovieApi";
import {Movie} from "../../../model/Movie";
import {
    Autocomplete,
    Box,
    Button,
    Card,
    CardMedia,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {MovieForm} from "../MovieForm/MovieForm";
import {MovieTag} from "../../../model/MovieTag";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

const NoCoverImage = require('../../../assets/NoCover.PNG');

interface MovieEditProps {
    movieId: number;
    onSave: () => void;
    onCancel: () => void;
    onTagAdded?: () => void;
}

export const MovieEdit = (props: MovieEditProps) => {
    const [movie, setMovie] = useState<Movie>();
    const [selectedTag, setSelectedTag] = useState<MovieTag | string | null>(null);
    const [availableTags, setAvailableTags] = useState<MovieTag[]>([]);
    const [coverUrl, setCoverUrl] = useState<string | null>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    useEffect(() => {
        getMovie(props.movieId);
        fetchTags();
    }, []);

    useEffect(() => {
        if (movie) {
            fetchCover();
        }
    }, [movie?.movieId]);

    const getMovie = (movieId: number) => {
        MovieApi.getMovieById(movieId)
            .then((movie) => setMovie(movie))
            .catch((error: Error) => console.log(error))
    }

    const fetchTags = async () => {
        try {
            const tags = await MovieApi.getTags();
            setAvailableTags(tags);
        } catch (error) {
            console.error("Error fetching tags:", error);
        }
    };

    const fetchCover = async () => {
        if (!movie) return;
        try {
            const url = await MovieApi.getMovieCover(movie.movieId);
            setCoverUrl(url);
        } catch (error) {
            console.error("Error fetching cover:", error);
            setCoverUrl(null);
        }
    };

    const handleCoverChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!movie || !event.target.files?.[0]) return;
        try {
            await MovieApi.setMovieCover(movie.movieId, event.target.files[0]);
            await fetchCover();
        } catch (error) {
            console.error("Error setting cover:", error);
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
            props.onTagAdded?.();
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
                        <Stack direction="row" spacing={2} alignItems="flex-start">
                            <Card sx={{width: 200, position: 'relative'}}>
                                {coverUrl ? (
                                    <CardMedia
                                        component="img"
                                        height="300"
                                        image={coverUrl}
                                        alt="Movie cover"
                                    />
                                ) : (
                                    <CardMedia
                                        component="img"
                                        height="300"
                                        image={NoCoverImage}
                                        alt="No cover"
                                    />
                                )}
                                <IconButton
                                    sx={{
                                        position: 'absolute',
                                        bottom: 8,
                                        right: 8,
                                        bgcolor: 'background.paper',
                                        '&:hover': {
                                            bgcolor: 'grey.200'
                                        }
                                    }}
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <PhotoCameraIcon/>
                                </IconButton>
                                <input
                                    type="file"
                                    accept="image/*"
                                    style={{display: 'none'}}
                                    ref={fileInputRef}
                                    onChange={handleCoverChange}
                                />
                            </Card>
                            <Box sx={{flex: 1}}>
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
                            </Box>
                        </Stack>
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