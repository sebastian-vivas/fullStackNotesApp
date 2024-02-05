import { Route, Routes } from "react-router-dom";
import Create from "./components/Create";
import Notes from "./components/Notes";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Notes />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </div>
  );
};

export default App;
