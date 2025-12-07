import React from "react";

export default function MovieDetails({ movie, onBack }) {
  return (
    <div className="card">
      {movie.poster ? <img src={`http://localhost:5000/${movie.poster}`} className="card-img-top" alt={movie.title} style={{height:400, objectFit:'cover'}} /> : null}
      <div className="card-body">
        <h3>{movie.title}</h3>
        <p><strong>Genre:</strong> {movie.genre}</p>
        <p><strong>Release Year:</strong> {movie.releaseYear}</p>
        <p>{movie.description}</p>
        <button className="btn btn-secondary" onClick={onBack}>Back</button>
      </div>
    </div>
  );
}
