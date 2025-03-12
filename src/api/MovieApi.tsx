export const MovieApi = {
    fetchMovies: async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/movies?page=${1}&moviesPerPage=${10}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            return await response.json();
        } catch (error) {
            console.error('Error during fetching movie:', error);
        }
    }
};