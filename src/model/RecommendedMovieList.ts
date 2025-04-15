export interface MovieInfo {
    title: string;
    overview: string;
    genresNames: string[];
    externalId: number;
    externalApi: string;
}

export interface RecommendedMovies {
    movieInfos: MovieInfo[];
    creationDate: string;
    endInterval: string;
}