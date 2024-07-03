import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className='bg-gray-300 flex justify-between'>
            <Link to='/'>Fitness Go</Link>
            <div className='flex justify-items-end'>
                <Link to='/meal-log'>Meal Log</Link>
            </div>
        </div>
    );
};

export default Navbar;