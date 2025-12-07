import React, { useState, useContext } from "react";
import { ApiContext } from "../App";

export default function EditMovie({ movie, onDone }) {
  const { base } = useContext(ApiContext);
  const [form, setForm] = useState({
    title: movie.title || "",
    description: movie.description || "",
    genre: movie.genre || "",
    releaseYear: movie.releaseYear || ""
  });
  const [poster, setPoster] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("description", form.description);
    fd.append("genre", form.genre);
    fd.append("releaseYear", form.releaseYear);
    if (poster) fd.append("poster", poster);

    setSubmitting(true);
    try {
      const res = await fetch(`${base}/movies/${movie._id}`, { method: "PUT", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");
      alert("Updated");
      onDone();
    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={submit}>
      <div className="mb-3">
        <label className="form-label">Title *</label>
        <input className="form-control" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea className="form-control" rows="3" value={form.description} onChange={e => setForm({...form, description: e.target.value})}></textarea>
      </div>
      <div className="mb-3">
        <label className="form-label">Genre</label>
        <input className="form-control" value={form.genre} onChange={e => setForm({...form, genre: e.target.value})} />
      </div>
      <div className="mb-3">
        <label className="form-label">Release Year</label>
        <input className="form-control" value={form.releaseYear} onChange={e => setForm({...form, releaseYear: e.target.value})} />
      </div>
      <div className="mb-3">
        <label className="form-label">Replace Poster</label>
        <input type="file" accept="image/*" className="form-control" onChange={e => setPoster(e.target.files[0])} />
        {movie.poster && <img src={`http://localhost:5000/${movie.poster}`} alt="poster" style={{height:120, marginTop:8}} />}
      </div>

      <div>
        <button className="btn btn-primary" disabled={submitting} type="submit">Save</button>
        <button type="button" className="btn btn-link" onClick={onDone}>Cancel</button>
      </div>
    </form>
  );
}
