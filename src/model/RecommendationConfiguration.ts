export interface RecommendationConfiguration {
    configurationId: number;
    genreNames: string[];
    userId: number;
}

export interface UpdateRecommendationConfiguration {
    limitToGenres: string[];
}