import {Movie} from "../model/Movie";
import {MovieTag} from "../model/MovieTag";

export const MovieApi = {
    fetchMovies: async (tags?: string[]) => {
            const tagsParam = tags?.length ? `&tags=${tags.join(',')}` : '';
            const response = await fetch(`http://localhost:8080/api/movies?page=${1}&moviesPerPage=${10}${tagsParam}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            return await response.json();
    },

    fetchWatchedMovies: async () => {
            const response = await fetch(`http://localhost:8080/api/movies/watched?page=${1}&moviesPerPage=${10}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            return await response.json();
    },

    moveMovieToWatchedList: async (movieId: number) => {
            await fetch(`http://localhost:8080/api/movies/${movieId}/watched`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
    },

    addMovie: async (movie: { title: string }) => {
            const response = await fetch('http://localhost:8080/api/movies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(movie),
            });
            return await response.json();
    },

    deleteMovie: async (movieId: number) => {
            await fetch(`http://localhost:8080/api/movies/${movieId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
    },

    getMovieById: async (movieId: number) => {
            const response = await fetch(`http://localhost:8080/api/movies/${movieId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            return await response.json();
    },

    update: async (movie: Movie) => {
            await fetch(`http://localhost:8080/api/movies/${movie.movieId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({movieTitle: movie.title})
            });
    },

    getTags: async (): Promise<MovieTag[]> => {
            const response = await fetch('http://localhost:8080/api/movies/tags', {
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            return await response.json();
    },

    addTagToMovie: async (movieId: number, tagLabel?: string, tagId?: string): Promise<string> => {
            const response = await fetch(`http://localhost:8080/api/movies/${movieId}/tags${tagId ? `?tagId=${tagId}` : ''}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: tagLabel ? JSON.stringify({tagLabel}) : undefined,
            });
            return await response.json();
    },

    deleteTagFromMovie: async (movieId: number, tagId: string): Promise<void> => {
            await fetch(`http://localhost:8080/api/movies/${movieId}/tags/${tagId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
    },

    getMovieCover: async (movieId: number): Promise<string> => {
            const response = await fetch(`http://localhost:8080/api/movies/${movieId}/cover`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            const blob = await response.blob();
            return URL.createObjectURL(blob);
    },

    setMovieCover: async (movieId: number, image: File): Promise<void> => {
            const formData = new FormData();
            formData.append('image', image);

            await fetch(`http://localhost:8080/api/movies/${movieId}/cover`, {
                method: 'PUT',
                credentials: 'include',
                body: formData,
            });
    }
};