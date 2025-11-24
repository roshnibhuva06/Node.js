const API_URL = "http://localhost:5000/api/tweets";

// GET All
export const fetchTweetsAPI = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("GET failed");
  return res.json(); 
};

// CREATE
export const addTweetAPI = async (data) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("POST failed");
  return res.json();
};

// UPDATE
export const updateTweetAPI = async (id, data) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("PUT failed");
  return res.json();
};

// DELETE
export const deleteTweetAPI = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("DELETE failed");
  return id;
};
