import {UpdateRecommendationConfiguration} from "../model/RecommendationConfiguration";
import {RecommendedMovies} from "../model/RecommendedMovieList";

export const RecommendationApi = {
    getConfiguration: async () => {
        try {
            const response = await fetch('http://localhost:8080/api/recommendations/configuration', {
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            return await response.json();
        } catch (error) {
            console.error('Error during fetching recommendation configuration:', error);
            throw error;
        }
    },

    updateConfiguration: async (configuration: UpdateRecommendationConfiguration) => {
        try {
            await fetch('http://localhost:8080/api/users/recommendations/configuration', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({limitToGenres: configuration.limitToGenres}),
            });
        } catch (error) {
            console.error('Error during updating recommendation configuration:', error);
            throw error;
        }
    },

    createConfiguration: async (configuration: UpdateRecommendationConfiguration) => {
        try {
            const response = await fetch('http://localhost:8080/api/users/recommendations/configuration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({limitToGenres: configuration.limitToGenres})
            });
            return await response.json();
        } catch (error) {
            console.error('Error during creating recommendation configuration:', error);
            throw error;
        }
    },

    getLatestRecommendedMovies: async (): Promise<RecommendedMovies> => {
        try {
            const response = await fetch('http://localhost:8080/api/recommendations/latest', {
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            return await response.json();
        } catch (error) {
            console.error('Error during fetching recommended movies:', error);
            throw error;
        }
    }
};