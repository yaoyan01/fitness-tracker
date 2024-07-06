import { supabase } from "./supabaseClient";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MealLogPage from "./main/Meals/meals";
import { useState, useEffect } from "react";
import LoginPage from "./components/Login";
import SignUpPage from "./components/Signup";
import CreateMealPage from "./main/Meals/createMeal";

function App() {
  //global states 
  //detecting if the user is logged in 
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  //upon loading in, check if there is a user signed in through supabase
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

  //to prevent page from fully loading in without the session being grabbed 
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      {/* ADD ROUTES FOR THE APP HERE */}
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
      ) :
          (
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