import { supabase } from "./supabaseClient";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MealLogPage from "./main/Meals/meals";
import { useState, useEffect } from "react";
import LoginPage from "./components/Login";
import SignUpPage from "./components/Signup";
import CreateMealPage from "./main/Meals/createMeal";

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };

    fetchSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <Router>
      {session ? (
        <>
          <Navbar />
          <Routes>
            <Route path="/meal-log" element={<MealLogPage />} />
            <Route path="/meal-log/create" element={<CreateMealPage />} />
            <Route path="/food/create" element={<MealLogPage />} />
            <Route path="/food/:foodId" element={<MealLogPage />} />
            <Route path="*" element={<Navigate to="/meal-log" />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;