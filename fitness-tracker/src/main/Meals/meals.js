import { supabase } from "../../supabaseClient"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";



const MealLogPage = () => {
    const [allMeals, setAllMeals] = useState([]);

    const fetchAllMeals = async () => {
        try {
            const { data, error } = await supabase
                .from('meal')
                .select()

            setAllMeals(data)
        } catch (error) {
            console.log('ERROR')
        }

    }

    useEffect(() => { fetchAllMeals() }, [])


    return (<>
        <p>MEAL PAGE</p>
        <Link to='/meal-log/create'>Add Meal</Link>
    </>)
}


export default MealLogPage