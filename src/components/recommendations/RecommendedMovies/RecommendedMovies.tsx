import { Box, Card, CardContent, Chip, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { RecommendationApi } from "../../../api/RecommendationApi";
import { RecommendedMovies } from "../../../model/RecommendedMovieList";

export const RecommendedMovieList = () => {
  const [recommendedMovies, setRecommendedMovies] = useState<RecommendedMovies | null>(null);

  useEffect(() => {
    fetchRecommendedMovies();
  }, []);

  const fetchRecommendedMovies = async () => {
    try {
      const movies = await RecommendationApi.getLatestRecommendedMovies();
      setRecommendedMovies(movies);
    } catch (error) {
      console.error("Error fetching recommended movies:", error);
    }
  };

  if (!recommendedMovies) {
    return null;
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Recommended Movies
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Generated on: {new Date(recommendedMovies.creationDate).toLocaleString()}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Valid until: {new Date(recommendedMovies.endInterval).toLocaleString()}
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {recommendedMovies.movieInfos.map((movie, index) => (
            <Card key={index}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {movie.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {movie.overview}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {movie.genresNames.map((genre, genreIndex) => (
                    <Chip
                      key={genreIndex}
                      label={genre.replace('_', ' ')}
                      size="small"
                    />
                  ))}
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  Source: {movie.externalApi}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};