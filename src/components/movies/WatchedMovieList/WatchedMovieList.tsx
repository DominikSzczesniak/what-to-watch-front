import { WatchedMovie } from "../../../model/WatchedMovie";
import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { MovieApi } from "../../../api/MovieApi";
import { AddFirstElementIcon } from '../../common/AddFirstElementIcon/AddFirstElementIcon';

export const WatchedMoviesList = () => {
  const [movies, setMovies] = useState<WatchedMovie[]>([]);

  useEffect(() => {
    fetchWatchedMovies();
  }, []);

  const fetchWatchedMovies = async () => {
    try {
      const response = await MovieApi.fetchWatchedMovies();
      setMovies(response.movies);
    } catch (error) {
      console.error("Error fetching watched movies:", error);
      setMovies([]);
    }
  };

  return (
    <Stack spacing={2} alignItems="center">
      <Box maxWidth={1000} width="100%" display="flex" justifyContent="center">
        {movies.length === 0 ? (
          <Stack spacing={2} alignItems="center">
            <AddFirstElementIcon label="No watched movies in the catalog"/>
          </Stack>
        ) : (
          <TableContainer>
            <Table>
              <TableBody>
                {movies.map((movie: WatchedMovie) => (
                  <TableRow key={movie.movieId}>
                    <TableCell>{movie.title}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Stack>
  );
}