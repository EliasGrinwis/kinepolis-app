import axios, {AxiosResponse} from "axios";

const apiUrl =
  "https://kinepolisweb-programmation.kinepolis.com/api/Programmation/BE/NL/WWW/Cinema/KinepolisBelgium";

export default class MovieApi {
  static async getMovies(): Promise<AxiosResponse<any>> {
    const response = await axios.get(apiUrl);

    // get only unique movie titles
    const unqiueMovies = response.data.films.filter(
      (film: any, index: number, self: any) => {
        return index === self.findIndex((t: any) => t.title === film.title);
      }
    );

    const activeMovies = unqiueMovies.filter(
      (movie: any) => movie?.censor?.isActive
    );

    const moviesWithTrailers = activeMovies.filter(
      (movie: any) => movie?.trailers?.length > 0
    );

    return moviesWithTrailers;
  }

  static async getCustomerRatingFromMovie(movieId: string, CID: string) {
    const response = await axios.get(
      "https://kinepolis.be/nl/selligent/action/get-customer-score?id=" +
        movieId +
        "&cid=" +
        CID
    );

    return response.data;
  }
}
