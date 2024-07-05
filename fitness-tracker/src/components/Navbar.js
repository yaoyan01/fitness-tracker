import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";


const Navbar = () => {
    const handleLogout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            // The session will be automatically set to null by the onAuthStateChange listener
        } catch (error) {
            console.error('Error logging out:', error.message);
        }

    };

    return (
        <div className='bg-gray-300 flex justify-between'>
            <Link to='/'>Fitness Go</Link>
            <div className='flex justify-center'>
                <Link to='/meal-log'>Meal Log</Link>
                <Link to='/food'>Food</Link>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default Navbar;