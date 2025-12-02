const API_URL = "http://localhost:5000/tweets";

// GET ALL
export const fetchTweetsAPI = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch tweets");
  return res.json();
};

// ADD
export const addTweetAPI = async (data) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...data,
      profile: data.profile || "https://i.pravatar.cc/50",
    }),
  });

  if (!res.ok) throw new Error("Failed to add tweet");
  return res.json();
};

// UPDATE
export const updateTweetAPI = async (id, data) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update tweet");
  return res.json();
};

// DELETE
export const deleteTweetAPI = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete tweet");
  return id;
};
