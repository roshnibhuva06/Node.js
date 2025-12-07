import React, { useState, useContext } from "react";
import { ApiContext } from "../App";

export default function AddMovie({ onDone }) {
  const { base } = useContext(ApiContext);
  const [form, setForm] = useState({ title: "", description: "", genre: "", releaseYear: "" });
  const [poster, setPoster] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    if (!form.title.trim()) { alert("Title required"); return false;}
    if (form.releaseYear && isNaN(Number(form.releaseYear))) { alert("Release year must be a number"); return false;}
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("description", form.description);
    fd.append("genre", form.genre);
    fd.append("releaseYear", form.releaseYear);
    if (poster) fd.append("poster", poster);

    setSubmitting(true);
    try {
      const res = await fetch(`${base}/movies`, { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Add failed");
      alert("Movie added");
      onDone();
    } catch (err) {
      console.error(err);
      alert("Failed to add movie: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
        <label className="form-label">Poster Image (jpg, png)</label>
        <input type="file" accept="image/*" className="form-control" onChange={e => setPoster(e.target.files[0])} />
      </div>

      <div>
        <button className="btn btn-primary" disabled={submitting} type="submit">Add Movie</button>
        <button type="button" className="btn btn-link" onClick={onDone}>Cancel</button>
      </div>
    </form>
  );
}
