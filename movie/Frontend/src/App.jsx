import React, { useState } from "react";
import MovieList from "./components/MovieList";
import AddMovie from "./components/AddMovie";
import EditMovie from "./components/EditMovie";
import MovieDetails from "./components/MovieDetails";

const API_BASE = "http://localhost:5000/api";

export const ApiContext = React.createContext({ base: API_BASE });

export default function App() {
  const [page, setPage] = useState("list");
  const [editingMovie, setEditingMovie] = useState(null);
  const [viewingMovie, setViewingMovie] = useState(null);

  return (
    <ApiContext.Provider value={{ base: API_BASE }}>
      <div className="container py-4">
        <header className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3">Movie Management</h1>
          <div>
            <button className="btn btn-primary me-2" onClick={() => { setPage("add"); setEditingMovie(null); }}>+ Add Movie</button>
            <button className="btn btn-outline-secondary" onClick={() => setPage("list")}>Movie List</button>
          </div>
        </header>

        <main>
          {page === "list" && (
            <MovieList
              onEdit={(m) => { setEditingMovie(m); setPage("edit"); }}
              onView={(m) => { setViewingMovie(m); setPage("details"); }}
            />
          )}

          {page === "add" && <AddMovie onDone={() => setPage("list")} />}
          {page === "edit" && editingMovie && <EditMovie movie={editingMovie} onDone={() => setPage("list")} />}
          {page === "details" && viewingMovie && <MovieDetails movie={viewingMovie} onBack={() => setPage("list")} />}
        </main>
      </div>
    </ApiContext.Provider>
  );
}
