import { UpdateRecommendationConfiguration } from "../model/RecommendationConfiguration";
import { RecommendedMovies } from "../model/RecommendedMovieList";

export const RecommendationApi = {
  getConfiguration: async () => {
    const response = await fetch('https://java-application-latest-jijw.onrender.com/api/recommendations/configuration', {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    return await response.json();
  },

  updateConfiguration: async (configuration: UpdateRecommendationConfiguration) => {
    await fetch('https://java-application-latest-jijw.onrender.com/api/users/recommendations/configuration', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ limitToGenres: configuration.limitToGenres }),
    });
  },

  createConfiguration: async (configuration: UpdateRecommendationConfiguration) => {
    const response = await fetch('https://java-application-latest-jijw.onrender.com/api/users/recommendations/configuration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ limitToGenres: configuration.limitToGenres })
    });
    return await response.json();
  },

  getLatestRecommendedMovies: async (): Promise<RecommendedMovies> => {
    const response = await fetch('https://java-application-latest-jijw.onrender.com/api/recommendations/latest', {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    return await response.json();
  }
};