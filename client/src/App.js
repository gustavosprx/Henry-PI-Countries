import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CardDetails from "./components/CardDetail/CardDetail";
import EntryPage from "./components/Entry/EntryPage";
import ActivityForm from "./components/ActivityForm/ActivityForm"
import Home from "./components/Home/Home";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<EntryPage />} />
          <Route path="/countries" element={<Home />} />
          <Route path="/countries/:id" element={<CardDetails />} />
          <Route path="/activity" element={<ActivityForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;