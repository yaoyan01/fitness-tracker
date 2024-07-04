import { supabase } from "./supabaseClient";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MealLogPage from "./main/Meals/meals";
import { useState, useEffect } from "react";
import LoginPage from "./components/Login";

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);


  return (
    <Router>
      {session ? (
        <>
          <Navbar />
          <Routes>
            <Route path="/meal-log" element={<MealLogPage />} />
            <Route path="/" element={<Navigate to="/meal-log" />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;