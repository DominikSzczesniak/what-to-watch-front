import {Movie} from "../model/Movie";
import {MovieTag} from "../model/MovieTag";

export const MovieApi = {
    fetchMovies: async (tags?: string[]) => {
        try {
            const tagsParam = tags?.length ? `&tags=${tags.join(',')}` : '';
            const response = await fetch(`http://localhost:8080/api/movies?page=${1}&moviesPerPage=${10}${tagsParam}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            return await response.json();
        } catch (error) {
            console.error('Error during fetching movies:', error);
        }
    },
    fetchWatchedMovies: async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/movies/watched?page=${1}&moviesPerPage=${10}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            return await response.json();
        } catch (error) {
            console.error('Error during fetching watched movies:', error);
            throw error;
        }
    },
    moveMovieToWatchedList: async (movieId: number) => {
        try {
            await fetch(`http://localhost:8080/api/movies/${movieId}/watched`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
        } catch (error) {
            console.error('Error during moving movie to watched list:', error);
            throw error;
        }
    },
    addMovie: async (movie: { title: string }) => {
        try {
            const response = await fetch('http://localhost:8080/api/movies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(movie),
            });
            return await response.json();
        } catch (error) {
            console.error('Error during adding movie:', error);
        }
    },
    deleteMovie: async (movieId: number) => {
        try {
            await fetch(`http://localhost:8080/api/movies/${movieId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
        } catch (error) {
            console.error('Error during deleting movie:', error);
            throw error;
        }
    },
    getMovieById: async (movieId: number) => {
        try {
            const response = await fetch(`http://localhost:8080/api/movies/${movieId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            return await response.json();
        } catch (error) {
            console.error('Error during fetching movie:', error);
        }
    },

    update: async (movie: Movie) => {
        try {
            await fetch(`http://localhost:8080/api/movies/${movie.movieId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({movieTitle: movie.title})
            });
        } catch (error) {
            console.error('Error during updating movie:', error);
        }
    },

    getTags: async (): Promise<MovieTag[]> => {
        try {
            const response = await fetch('http://localhost:8080/api/movies/tags', {
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            return await response.json();
        } catch (error) {
            console.error('Error during fetching tags:', error);
            throw error;
        }
    },

    addTagToMovie: async (movieId: number, tagLabel?: string, tagId?: string): Promise<string> => {
        try {
            const response = await fetch(`http://localhost:8080/api/movies/${movieId}/tags${tagId ? `?tagId=${tagId}` : ''}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: tagLabel ? JSON.stringify({tagLabel}) : undefined,
            });
            return await response.json();
        } catch (error) {
            console.error('Error during adding tag to movie:', error);
            throw error;
        }
    },

    deleteTagFromMovie: async (movieId: number, tagId: string): Promise<void> => {
        try {
            await fetch(`http://localhost:8080/api/movies/${movieId}/tags/${tagId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
        } catch (error) {
            console.error('Error during deleting tag from movie:', error);
            throw error;
        }
    },
    getMovieCover: async (movieId: number): Promise<string> => {
        try {
            const response = await fetch(`http://localhost:8080/api/movies/${movieId}/cover`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            const blob = await response.blob();
            return URL.createObjectURL(blob);
        } catch (error) {
            console.error('Error during fetching movie cover:', error);
            throw error;
        }
    },

    setMovieCover: async (movieId: number, image: File): Promise<void> => {
        try {
            const formData = new FormData();
            formData.append('image', image);

            await fetch(`http://localhost:8080/api/movies/${movieId}/cover`, {
                method: 'PUT',
                credentials: 'include',
                body: formData,
            });
        } catch (error) {
            console.error('Error during setting movie cover:', error);
            throw error;
        }
    }
};