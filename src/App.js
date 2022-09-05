import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [state, setState] = useState({ filter: "" });
  const [movies, setMovies] = useState([]);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const makeRequest = async () => {
    const { data } = await axios.get(`/api/v1/searcher/${state.filter}`);
    // console.log(data);
    setMovies(data);
  };
  useEffect(() => {
    if (state.filter !== "") {
      makeRequest();
    } else {
      setMovies([]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <div className="flex items-center justify-center bg-gray-900 w-screen h-screen">
      <form className="w-1/2 text-center">
        <h2 className="mb-5 text-slate-300 text-4xl uppercase">Movie's searcher</h2>
        <div className="flex items-center justify-between px-2 border border-gray-800 w-4/5 mx-auto">
          <input
            type="text"
            name="filter"
            onChange={(e) => handleChange(e)}
            className="w-full h-10 bg-transparent rounded-md outline-none text-sky-500"
            placeholder="Movie's name"
          />
          <span className="material-symbols-outlined text-slate-300">close</span>
        </div>
        <div className="flex items-center justify-center flex-col bg-gray-800 w-4/5 mx-auto h-60 rounded-b">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <button
                key={movie._id.$oid}
                className="mb-6 w-full h-10 text-slate-400 bg-sky-900 hover:bg-sky-800 hover:text-slate-50 duration-300"
              >
                {movie.title}
              </button>
            ))
          ) : (
            <p className="text-red-300">There isn't match</p>
          )}
        </div>
      </form>
    </div>
  );
}

export default App;
