import { supabase } from "./supabaseClient";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MealLogPage from "./main/Meals/meals";

function App() {
  return (
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/meal-log" element={<MealLogPage />} />
      </Routes>
    </Router>
  );
}

export default App;