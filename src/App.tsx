import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import DetailMovie from "./components/DetailMovie";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import {useAuth0} from "@auth0/auth0-react";
import Loading from "./components/loading/Loading";

function App() {
  const {isLoading} = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies/detail/:id" element={<DetailMovie />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
