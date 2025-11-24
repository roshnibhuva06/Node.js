import "./App.css";
import LeftSidebar from "./Components/Leftside";
import RightSidebar from "./Components/Rightside";
import Home from "./Components/Home";

function App() {
  return (
    <div className="layout">
      <LeftSidebar />
      <main className="feed">
        <Home />
      </main>
      <RightSidebar />
    </div>
  );
}

export default App;
