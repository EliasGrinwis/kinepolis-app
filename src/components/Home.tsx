import {Icon} from "@iconify/react";
import {Tabs} from "flowbite-react";
import {useEffect, useState} from "react";
import MovieApi from "../apis/MovieApi";
import {useNavigate} from "react-router-dom";
import Skeleton from "./loading/Skeleton";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const result: any = await MovieApi.getMovies();
        setMovies(result);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, []);

  const navigateToDetailPage = (movie: any) => {
    navigate(`/movies/detail/${movie.id}`, {state: {movie}});
  };

  const filteredMovies = movies.filter((movie: any) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-primary">
      <div className="custom-container px-32 mx-auto py-24">
        <h1 className="text-7xl text-white font-semibold mb-3">Kinepolis</h1>
        <p className="text-md text-secondary max-w-xl mb-5">
          Kinepolis is een Belgische bioscoopketen met 58 bioscopen in Europa.
        </p>

        <div className="relative">
          <Icon
            className="absolute top-1/2 left-4 transform -translate-y-1/2 text-secondary"
            icon="mynaui:search"
            width="24"
            height="24"
          />
          <input
            className="bg-[#101727] border-2 border-[#20283e] p-4 pl-12 max-w-xl w-full placeholder-[#3e475e] rounded-xl text-secondary focus:border-[#7c6ef5] focus:outline-none"
            type="text"
            placeholder="Zoek films"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Tabs
          aria-label="Tabs with icons"
          className="max-w-xl mt-8 text-[#7c6ef5]">
          <Tabs.Item active title="ALLE FILMS"></Tabs.Item>
          <Tabs.Item title="VANDAAG"></Tabs.Item>
          <Tabs.Item title="VERWACHT"></Tabs.Item>
        </Tabs>

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            Array.from({length: 8}).map((_, index) => <Skeleton key={index} />)
          ) : filteredMovies.length === 0 ? (
            <div className="col-span-full text-center">
              <div className="w-full">
                <h3 className="text-gray-400 text-2xl font-bold">
                  Geen films gevonden
                </h3>
                <p className="text-secondary text-md font-bold">
                  Sorry, er zijn geen films beschikbaar die aan uw zoekcriteria
                  voldoen.
                </p>
              </div>
            </div>
          ) : (
            filteredMovies?.map((movie: any, index: number) => (
              <div key={index} className="bg-primary rounded-xl relative">
                <div className="overflow-hidden rounded-lg h-[85%]">
                  <div
                    className="h-full"
                    onClick={() => navigateToDetailPage(movie)}>
                    {movie.images &&
                    movie.images.length > 0 &&
                    movie.images.find(
                      (image: any) => image.mediaType === "Poster Graphic"
                    ) ? (
                      <img
                        src={
                          "https://cdn.kinepolis.be/images" +
                          movie.images.find(
                            (image: any) => image.mediaType === "Poster Graphic"
                          ).url
                        }
                        alt="image"
                        className="h-full w-full object-cover cursor-pointer hover:scale-105 transition-transform duration-500 ease-in-out"></img>
                    ) : (
                      <div className="h-full w-full flex justify-center items-center text-white">
                        No Poster Available
                      </div>
                    )}
                  </div>
                  <div className="bg-black bg-opacity-80 absolute top-0 left-0 flex items-center gap-1 m-2 p-1 rounded-lg">
                    <Icon
                      className="text-yellow-500"
                      icon="mynaui:star"
                      width="24"
                      height="24"
                    />
                    <p className="text-yellow-500">8.7</p>
                  </div>
                </div>
                <h3 className="text-white font-semibold mt-2">{movie.title}</h3>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
