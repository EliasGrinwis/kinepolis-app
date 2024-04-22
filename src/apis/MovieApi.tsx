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

  static async getCustomerRatingFromMovie() {
    const options = {
      method: "POST",
      url: "https://http-cors-proxy.p.rapidapi.com/",
      headers: {
        "content-type": "application/json",
        Origin: "www.example.com",
        "X-Requested-With": "www.example.com",
        "X-RapidAPI-Key": "f8a890e360msha24ae61383669cdp1b3bcajsn3ca7832cc1ce",
        "X-RapidAPI-Host": "http-cors-proxy.p.rapidapi.com",
      },
      data: {
        url: "https://kinepolis.be/nl/selligent/action/get-customer-score?id=HO00010145&cid=31193",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
}
