import { useDispatch } from "react-redux";
import { deleteTweet } from "../Features/tweetSlice";

export default function TweetList({ tweets = [], startEdit }) {
  const dispatch = useDispatch();

  return (
    <div style={{ background: "#eef6ff", padding: "20px", borderRadius: "12px", marginTop: "20px" }}>
      
      {tweets.length === 0 && (
        <p style={{ textAlign: "center", color: "gray" }}>No tweets yet...</p>
      )}

      {tweets.map((t) => (
        <div
          key={t.id}
          style={{
            background: "white",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "12px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.08)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img
              src={t.profile || "https://i.pravatar.cc/50"}
              alt="profile"
              style={{
                width: "45px",
                height: "45px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <strong>@{t.username}</strong>
          </div>

          <p style={{ marginTop: "10px" }}>{t.tweet}</p>

          <small style={{ color: "gray" }}>
            {t.createdAt ? new Date(t.createdAt).toLocaleString() : "No date"}
          </small>

          <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
            <button
              onClick={() => startEdit(t)}
              style={{
                background: "#007bff",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: "8px",
              }}
            >
              ✏️ Edit
            </button>

            <button
              onClick={() => dispatch(deleteTweet(t.id))}
              style={{
                background: "#dc3545",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: "8px",
              }}
            >
              🗑 Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
