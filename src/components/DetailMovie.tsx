import {useLocation} from "react-router-dom";
import ReactHlsPlayer from "@ducanh2912/react-hls-player";
import {useEffect, useState} from "react";

export default function DetailMovie() {
  const location = useLocation();
  const movie = location.state.movie;
  const [playing, setPlaying] = useState(false);
  const [trailerLoaded, setTrailerLoaded] = useState(false); // Track if the trailer URL is loaded

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.state.movie]);

  console.log(movie);

  useEffect(() => {
    if (movie.trailers && movie.trailers.length > 0) {
      // Check if the trailer URL is loaded
      setTrailerLoaded(true);
    }
  }, [movie.trailers]);

  function formatDate(inputDate: any) {
    const date = new Date(inputDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  return (
    <div className="bg-primary min-h-screen">
      <div className="custom-container px-32 mx-auto py-8 lg:py-20 relative">
        <div className="relative">
          {trailerLoaded ? (
            <div
              className={`w-full overflow-hidden rounded-3xl shadow-2xl shadow-purple-500 duration-300 ease-in-out ${
                playing ? "lg:scale-110" : ""
              }`}>
              <ReactHlsPlayer
                src={movie?.trailers[0]?.url}
                autoPlay={false}
                controls={true}
                width="100%"
                onPlay={() => {
                  setPlaying(true);
                }}
                onPause={() => {
                  setPlaying(false);
                }}
                onEnded={() => {
                  setPlaying(false);
                }}
              />
            </div>
          ) : (
            <div>
              <p>No trailer available</p>
            </div>
          )}
          {/* Overlay with absolute positioning */}
          {!playing && (
            <div
              className={`hide-small-screen absolute left-20 bottom-[-72px] rounded-3xl w-2/5 blurtest p-4 h-36 flex items-center drop-shadow-[0_35px_35px_rgba(0,0,0,0.35)] ${
                playing
                  ? "opacity-0 duration-300 ease-in-out"
                  : "opacity-100 duration-500 ease-in-out"
              }`}>
              <p className="text-white text-3xl text-center font-bold">
                {movie.title}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="custom-container px-32 mx-auto py-8 lg:py-16 grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div className="order-2 lg:order-1">
          {movie.images.find(
            (image: any) => image.mediaType === "Poster Graphic"
          ) && (
            <img
              src={
                "https://cdn.kinepolis.be/images/" +
                movie.images.find(
                  (image: any) => image.mediaType === "Backdrop"
                ).url
              }
              alt={movie.title}
              className="lg:h-[650px] hidden lg:block w-full rounded-3xl object-cover shadow-2xl shadow-teal-400"
            />
          )}
        </div>
        <div className="order-1 lg:order-2">
          <p className="text-white text-2xl font-bold">{movie.title}</p>
          <p className="text-lg text-secondary max-w-xl py-4">
            {movie.synopsis}
          </p>

          <div className="py-8">
            <div className="border-b-2 border-purple-400 border-opacity-10"></div>
          </div>

          <div className="grid grid-cols-2">
            <div>
              <p className="text-secondary text-md">Release</p>
              <p className="text-[#C3C8D4] text-xl">
                {formatDate(movie.releaseDate)}
              </p>
            </div>

            <div>
              <p className="text-secondary text-md">Duur</p>
              <p className="text-[#C3C8D4] text-xl">{movie.duration}</p>
            </div>

            <div className="py-4">
              <p className="text-secondary text-md">Genres</p>
              {movie.genres.map((genre: any, index: number) => (
                <div key={index}>
                  <p className=" text-[#C3C8D4] text-xl">{genre.name}</p>
                </div>
              ))}
            </div>

            <div className="py-4">
              <p className="text-secondary text-md">Land</p>
              <p className="text-[#C3C8D4] text-xl">
                {movie.countryOfOrigin.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
