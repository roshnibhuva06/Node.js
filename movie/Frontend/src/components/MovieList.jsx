import React, { useEffect, useState, useContext } from "react";
import { ApiContext } from "../App";

export default function MovieList({ onEdit, onView }) {
  const { base } = useContext(ApiContext);
  const [movies, setMovies] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchMovies = async (query) => {
    setLoading(true);
    try {
      const url = new URL(`${base}/movies`);
      if (query) url.searchParams.set("q", query);
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.movies || []);
    } catch (err) {
      alert("Failed to fetch movies");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMovies(); }, []);

  const doSearch = (e) => {
    e.preventDefault();
    fetchMovies(q);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this movie?")) return;
    try {
      const res = await fetch(`${base}/movies/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Delete failed");
      setMovies((prev) => prev.filter(m => m._id !== id));
      alert("Deleted");
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div>
      <form className="row g-2 mb-3" onSubmit={doSearch}>
        <div className="col-auto">
          <input className="form-control" placeholder="Search by title..." value={q} onChange={e => setQ(e.target.value)} />
        </div>
        <div className="col-auto">
          <button className="btn btn-secondary" type="submit">Search</button>
          <button className="btn btn-outline-secondary ms-2" type="button" onClick={() => { setQ(""); fetchMovies(); }}>Reset</button>
        </div>
      </form>

      {loading ? (<p>Loading...</p>) : (
        <div className="row">
          {movies.length === 0 && <p>No movies found.</p>}
          {movies.map(movie => (
            <div className="col-md-4 mb-3" key={movie._id}>
              <div className="card h-100">
                {movie.poster ? (
                  <img src={`http://localhost:5000/${movie.poster}`} className="card-img-top" alt={movie.title} style={{height:200, objectFit:'cover'}} />
                ) : (
                  <div className="bg-secondary text-white d-flex align-items-center justify-content-center" style={{height:200}}>No image</div>
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{movie.title}</h5>
                  <p className="card-text text-truncate">{movie.description}</p>
                  <div className="mt-auto d-flex justify-content-between">
                    <div>
                      <button className="btn btn-sm btn-outline-primary me-2" onClick={() => onView(movie)}>View</button>
                      <button className="btn btn-sm btn-outline-secondary" onClick={() => onEdit(movie)}>Edit</button>
                    </div>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(movie._id)}>Delete</button>
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
