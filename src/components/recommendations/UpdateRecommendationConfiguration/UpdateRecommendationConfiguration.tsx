import {Box, Button, Checkbox, FormControlLabel, FormGroup, Paper, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {RecommendationApi} from "../../../api/RecommendationApi";

const MOVIE_GENRES = [
    "ACTION",
    "ADVENTURE",
    "ANIMATION",
    "COMEDY",
    "CRIME",
    "DOCUMENTARY",
    "DRAMA",
    "FAMILY",
    "FANTASY",
    "HISTORY",
    "HORROR",
    "MUSIC",
    "MYSTERY",
    "ROMANCE",
    "SCIENCE_FICTION",
    "TV_MOVIE",
    "THRILLER",
    "WAR",
    "WESTERN"
];

export const UpdateRecommendationConfiguration = () => {
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [hasConfig, setHasConfig] = useState<boolean>(false);

    useEffect(() => {
        fetchConfiguration();
    }, []);

    const fetchConfiguration = async () => {
        try {
            const config = await RecommendationApi.getConfiguration();
            if (config) {
                setSelectedGenres(config.genreNames || []);
                setHasConfig(true);
            } else {
                setHasConfig(false);
            }
        } catch (error) {
            console.error("Error fetching configuration:", error);
            setHasConfig(false);
        }
    };

    const handleGenreChange = (genre: string) => {
        setSelectedGenres(prev =>
            prev.includes(genre)
                ? prev.filter(g => g !== genre)
                : [...prev, genre]
        );
    };

    const handleSave = async () => {
        try {
            if (hasConfig) {
                await RecommendationApi.updateConfiguration({limitToGenres: selectedGenres});
            } else {
                await RecommendationApi.createConfiguration({limitToGenres: selectedGenres});
            }
            await fetchConfiguration();
        } catch (error) {
            console.error("Error saving configuration:", error);
        }
    };

    return (
        <Box sx={{maxWidth: 800, mx: 'auto', mt: 4}}>
            <Paper elevation={3} sx={{p: 3}}>
                <Typography variant="h5" gutterBottom>
                    Recommendation Configuration
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Select genres you want to include in recommendations:
                </Typography>
                <FormGroup>
                    {MOVIE_GENRES.map(genre => (
                        <FormControlLabel
                            key={genre}
                            control={
                                <Checkbox
                                    checked={selectedGenres.includes(genre)}
                                    onChange={() => handleGenreChange(genre)}
                                />
                            }
                            label={genre.replace('_', ' ')}
                        />
                    ))}
                </FormGroup>
                <Box sx={{mt: 2, display: 'flex', justifyContent: 'flex-end'}}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSave}
                    >
                        Save Configuration
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};