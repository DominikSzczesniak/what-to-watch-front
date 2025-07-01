import { MovieTag } from "./MovieTag";

export interface Movie {
  movieId: number;
  title: string;
  tags?: MovieTag[];
}