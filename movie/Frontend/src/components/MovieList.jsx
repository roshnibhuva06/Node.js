import React, { useEffect, useState, useContext } from "react";
import { ApiContext } from "../App";

export default function MovieList({ onEdit, onView }) {
  const { base } = useContext(ApiContext);
  const [movies, setMovies] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchMovies = async (query = "") => {
    setLoading(true);
    try {
      const url = new URL(`${base}/movies`);
      if (query.trim()) url.searchParams.set("q", query);

      const res = await fetch(url);
      const data = await res.json();

      setMovies(Array.isArray(data.movies) ? data.movies : []);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch movies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const doSearch = (e) => {
    e.preventDefault();
    fetchMovies(q);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this movie?")) return;

    try {
      const res = await fetch(`${base}/movies/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setMovies((prev) => prev.filter((m) => m._id !== id));
      alert("Movie deleted");
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="container">
      {/* SEARCH */}
      <form className="row g-2 mb-4" onSubmit={doSearch}>
        <div className="col-md-6">
          <input
            className="form-control"
            placeholder="Search by title..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <button className="search-button me-2" type="submit">
            Search
          </button>
          <button
            className="reset-button"
            type="button"
            onClick={() => {
              setQ("");
              fetchMovies();
            }}
          >
            Reset
          </button>
        </div>
      </form>

      {/* MOVIE LIST */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="row">
          {movies.length === 0 && <p>No movies found.</p>}

          {movies.map((movie) => (
            <div className="col-md-4 mb-4" key={movie._id}>
              {/* ✅ 1 row = 3 movies */}
              <div className="card h-100 shadow-sm">
                {movie.poster ? (
                  <img
                    src={`http://localhost:5000/${movie.poster}`}
                    className="card-img-top"
                    alt={movie.title}
                    style={{ height: 220, objectFit: "cover" }}
                  />
                ) : (
                  <div
                    className="bg-secondary text-white d-flex align-items-center justify-content-center"
                    style={{ height: 220 }}
                  >
                    No image
                  </div>
                )}

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{movie.title}</h5>
                  <p className="card-text text-truncate">
                    {movie.description}
                  </p>

                  <div className="mt-auto d-flex justify-content-between">
                    <div>
                      <button
                        className="view-button me-2"
                        onClick={() => onView(movie)}
                      >
                        View
                      </button>
                      <button
                        className="edit-button"
                        onClick={() => onEdit(movie)}
                      >
                        Edit
                      </button>
                    </div>

                    <button
                      className="delete-button"
                      onClick={() => handleDelete(movie._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
