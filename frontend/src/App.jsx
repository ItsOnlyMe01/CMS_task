import HomePage from "./pages/HomePage";
import SigninChoice from "./components/SigninChoice";
import { Route, Routes } from "react-router-dom";
import ComplaintForm from "./components/ComplaintForm";
import ComplaintTable from "./components/ComplaintTable";

function App() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <Routes>
        <Route path="/" element={<SigninChoice />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/complaintTable" element={<ComplaintTable />} />
        <Route path="/ComplaintForm" element={<ComplaintForm />} />
      </Routes>
    </div>
  );
}

export default App;
